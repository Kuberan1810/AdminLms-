import { MessageCircle } from 'lucide-react';
import CourseQACard from './components/CourseQACard';
import { useChatWebSocket } from "../../../hooks/chat/useChatWebSocket";
import AskQuestionModal from './components/AskQuestionModal';
import { useState, useMemo } from 'react';
import { useQAFeed, useCreateQAPost, useDeleteQAPost } from '../../../hooks/chat';
import { useMyCourses } from '../../../hooks/useMyCourses';
import { useAuth } from '../../../context/AuthContext';

const Chat = () => {
  const { user } = useAuth();
  const currentUser = user?.name || "Philip Stanton";
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'my'>('all');

  const { data: courses = [] } = useMyCourses();
  
  // For now, pick the first course/batch to show the chat
  const activeCourse = courses[0];
  const courseId = activeCourse?.id;

  const { isConnected, onlineCount, typingUsers } = useChatWebSocket({
      type: 'qa',
      id: courseId || null
  });

  // 3) New QA fetching hookuses numeric id for chat usually, or course_id string. 
  // Based on useMyCourses, c.id ?? c.course_id. 
  // Let's use activeCourse.id
  const batchName = "Batch-A"; // Placeholder, usually from enrollment data. 
  // In a real app, this might come from the user object or another API.
  // I'll assume "Batch-A" for demonstration if not available.

  const { data: posts = [], isLoading } = useQAFeed(courseId, batchName);
  const sendMessageMutation = useCreateQAPost();
  const deleteMessageMutation = useDeleteQAPost();

  /* ================= DELETE FUNCTION ================= */
  const handleDelete = (id: number) => {
    deleteMessageMutation.mutate({ courseId, batchName, questionId: id });
  };

  /* ================= ADD QUESTION ================= */
  const handleQuestionSubmit = (data: {
    title: string;
    question: string;
    privacy: 'private' | 'public';
    file?: File | null;
  }) => {
    // Note: The /chat API only takes "content". 
    // Title and privacy are NOT in the provided openapi.json ChatPost schema.
    // I will combine title and question into content, or just use question.
    const fullContent = data.title ? `**${data.title}**\n\n${data.question}` : data.question;
    
    sendMessageMutation.mutate({ 
      courseId, 
      batchName, 
      content: fullContent,
      isPrivate: data.privacy === 'private'
    });
    setIsModalOpen(false);
  };

  /* ================= FILTERING & SORTING ================= */
  const filteredPosts = useMemo(() => {
    let result = posts;
    
    // Visibility Filter: Only show public posts, OR private posts that I wrote
    result = result.filter(p => p.visibility === 'public' || (p.author.id === user?.id || p.author.name === currentUser));

    if (activeTab === 'my') {
        result = result.filter(p => p.author.id === user?.id || p.author.name === currentUser);
    }
    
    return [...result].sort((a, b) => (b.is_pinned ? 1 : 0) - (a.is_pinned ? 1 : 0));
  }, [posts, activeTab, user?.id, currentUser]);


  /* ================= INITIAL DATA ================= */


  if (isLoading) {
    return (
        <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
        </div>
    );
  }

  return (
 
      <div className=" py-1 w-full">

        {/* TABS */}
        <div className="flex gap-8 mb-4">
          <button
            onClick={() => setActiveTab('all')}
            className={`pb-2 text-sm md:text-base font-medium transition ${
              activeTab === 'all'
                ? 'text-orange-600 border-b-2 border-orange-600'
                : 'text-gray-600 dark:text-[#989898]'
            }`}
          >
            All Post
          </button>

          <button
            onClick={() => setActiveTab('my')}
            className={`pb-2 text-sm md:text-base font-medium transition ${
              activeTab === 'my'
                ? 'text-orange-600 border-b-2 border-orange-600'
                : 'text-gray-700 dark:text-white'
            }`}
          >
            My Post
          </button>
        </div>

        {/* WS Indicator Row */}
        {isConnected && (
          <div className="flex items-center justify-end px-3 mb-4">
            <span className="text-xs text-green-500 font-medium">
               ● {onlineCount} {onlineCount === 1 ? 'User' : 'Users'} Online
            </span>
          </div>
        )}

        {/* Typing Indicator */}
        {typingUsers && Object.keys(typingUsers).length > 0 && (
          <div className="px-3 mb-2 text-xs text-gray-500 italic text-right">
            {Object.values(typingUsers).join(", ")} {Object.keys(typingUsers).length === 1 ? 'is' : 'are'} typing...
          </div>
        )}

        {/* POSTS */}
        <div className="flex flex-col gap-4">
          {filteredPosts.map((post) => (
            <div key={post.id}>
              <CourseQACard
                id={post.id}
                courseId={courseId}
                batchName={batchName}
                studentName={post.author.name}
                role={post.author.role}
                avatar={""} // Avatar not in API
                timeAgo={new Date(post.created_at).toLocaleString()}
                title={""} // Title not in API, content might contain it
                description={post.content}
                likes={post.like_count}
                comments={post.reply_count}
                isPinned={post.is_pinned}
                isBookmarked={post.is_bookmarked_by_me}
                isLiked={post.is_liked_by_me}
                isPrivate={post.visibility === 'private'}
                replies={post.replies}
                isOwner={post.author.id === user?.id || post.author.name === currentUser}
                onDelete={() => handleDelete(post.id)}
              />
            </div>
          ))}

          {activeTab === 'my' && filteredPosts.length === 0 && (
            <div className="text-center py-16 text-gray-400 italic">
              You haven't posted any messages yet.
            </div>
          )}
          
          {activeTab === 'all' && filteredPosts.length === 0 && (
            <div className="text-center py-16 text-gray-400 italic">
              No messages found in this batch.
            </div>
          )}
        </div>


      {/* Floating Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="cursor-pointer fixed md:bottom-8  bottom-20 right-8 hover:bg-orange-200 bg-orange-100 text-[#F67300] px-6 py-3 rounded-full flex items-center gap-2 shadow-lg hover:shadow-xl"
      >
        <MessageCircle className="w-5 h-5" />
        Chat
      </button>

        {/* MODAL */}
        <AskQuestionModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleQuestionSubmit}
        />
      </div>
   
  );
};

export default Chat;
