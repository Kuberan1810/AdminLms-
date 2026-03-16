
import { MessageCircle } from 'lucide-react';
import CourseQACard from './components/CourseQACard';
import AskQuestionModal from './components/AskQuestionModal';
import { useState } from 'react';

type Reply = {
  instructorName: string;
  role: string;
  avatar: string;
  timeAgo: string;
  content: string;
};

type Comment = {
  userName: string;
  role: string;
  avatar: string;
  timeAgo: string;
  content: string;
};

type QAType = {
  id: number;
  studentName: string;
  role: string;
  avatar: string;
  timeAgo: string;
  isPinned?: boolean;
  title: string;
  description: string;
  likes: number;
  comments: number;
  reply?: Reply;
  allComments: Comment[];
  isBookmarked?: boolean;
  privacy: 'public' | 'private';
  file?: string | null;
};

const Chats = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const initialQAData: QAType[] = [
    {
      id: 1,
      studentName: "Tim David",
      role: "Student",
      avatar: "https://i.pravatar.cc/150?u=TimDavid",
      timeAgo: "30 mins ago",
      isPinned: true,
      title: "Supervised vs Unsupervised Learning",
      description:
        "Can you explain the difference between supervised and unsupervised learning?",
      likes: 7,
      comments: 2,
      reply: {
        instructorName: "Radha Krishnan",
        role: "Instructor",
        avatar: "https://i.pravatar.cc/150?u=RadhaKrishnan",
        timeAgo: "10 mins ago",
        content:
          "Great question! Supervised learning uses labeled data where we know the correct output, while unsupervised learning finds patterns in unlabeled data."
      },
      allComments: [],
      privacy: 'public'
    },
    {
      id: 2,
      studentName: "Jayakumar",
      role: "Student",
      avatar: "https://i.pravatar.cc/150?u=Jayakumar",
      timeAgo: "30 mins ago",
      title: "Frontend vs Backend",
      description:
        "What is the difference between frontend and backend development?",
      likes: 56,
      comments: 1,
      reply: {
        instructorName: "Srinivasan",
        role: "Instructor",
        avatar: "https://i.pravatar.cc/150?u=Srinivasan",
        timeAgo: "10 mins ago",
        content:
          "Frontend focuses on UI/UX. Backend handles server, database and APIs."
      },
      allComments: [],
      privacy: 'public'
    },
    {
  id: 3,
  studentName: "Arulkanth",
  role: "Student",
  avatar: "https://i.pravatar.cc/150?u=Arulkanth",
  timeAgo: "25 mins ago",
  title: "What is an API?",
  description:
    "What is an API and why is it important in web development?",
  likes: 72,
  comments: 0,
  reply: {
    instructorName: "Radha Krishnan",
    role: "Instructor",
    avatar: "https://i.pravatar.cc/150?u=RadhaKrishnan",
    timeAgo: "5 mins ago",
    content:
      "An API (Application Programming Interface) allows different software systems to communicate with each other. It enables frontend and backend systems to exchange data efficiently."
  },
  allComments: [],
  privacy: 'public'
},
{
  id: 4,
  studentName: "Arulkanth",
  role: "Student",
  avatar: "https://i.pravatar.cc/150?u=Arulkanth",
  timeAgo: "25 mins ago",
  title: "What is an API?",
  description:
    "What is an API and why is it important in web development?",
  likes: 72,
  comments: 0,
  reply: {
    instructorName: "Radha Krishnan",
    role: "Instructor",
    avatar: "https://i.pravatar.cc/150?u=RadhaKrishnan",
    timeAgo: "5 mins ago",
    content:
      "An API (Application Programming Interface) allows different software systems to communicate with each other. It enables frontend and backend systems to exchange data efficiently."
  },
  allComments: [],
  privacy: 'public'
}];

  const [activeTab, setActiveTab] = useState<'all' | 'my'>('all');
  const [allQAData, setAllQAData] = useState(initialQAData);
  const [myQuestions, setMyQuestions] = useState<any[]>([]);

  const handleQuestionSubmit = (data: {
    title:string;
    question: string;
    privacy: 'private' | 'public';
    file?: File | null;
  }) => {

    const fileURL = data.file ? URL.createObjectURL(data.file) : null;

    const newQuestion = {
      id: Date.now(),
      studentName: "Philip Stanton",
      role: "Student",
      avatar: "https://i.pravatar.cc/150?u=Philip",
      timeAgo: "Just now",
      isPinned: false,
      title: data.title,
      description: data.question,
      file: fileURL,
      likes: 0,
      comments: 0,
      allComments: [],
      reply: undefined,
      isBookmarked: false,
      privacy: data.privacy
    };

    setMyQuestions(prev => [newQuestion, ...prev]);
    setAllQAData(prev => [newQuestion, ...prev]);
  };

  return (
  
      <div className="w-full">

      

        {/* Tabs */}
        <div className="flex gap-12 mb-8">
          <button
            onClick={() => setActiveTab('all')}
          className={`pb-3 text-lg font-medium cursor-pointer  ${
              activeTab === 'all'
                ? 'text-orange-600 border-b-2 border-orange-600'
                : 'text-gray-700 dark:text-gray-300'
            }`}
          >
            All Post
          </button>

          <button
            onClick={() => setActiveTab('my')}
            className={`pb-3 text-lg font-medium cursor-pointer ${
              activeTab === 'my'
                ? 'text-orange-600 border-b-2 border-orange-600'
                : 'text-gray-700 dark:text-gray-300'
            }`}
          >
            My Post
          </button>
        </div>

        {/* Q&A List */}
        <div className="flex flex-col gap-6">
          {(activeTab === 'all' ? allQAData : myQuestions).map((qa) => (
            <CourseQACard key={qa.id} {...qa} />
          ))}

          {activeTab === 'my' && myQuestions.length === 0 && (
            <div className="text-center py-20 text-gray-400 dark:text-gray-500 italic">
              You haven't posted any questions yet.
            </div>
          )}
        </div>

        {/* Floating Button */}
        <button
          onClick={() => setIsModalOpen(true)}
        className="cursor-pointer fixed md:bottom-8  bottom-20 right-8 hover:bg-orange-200 dark:hover:bg-[#4D3B30] bg-orange-100 dark:bg-[#3D2B20] text-[#F67300] dark:text-orange-400 px-6 py-3 rounded-full flex items-center gap-2 shadow-lg hover:shadow-xl"
        >
          <MessageCircle className="w-5 h-5" />
          Chat
        </button>

        {/* Modal */}
        <AskQuestionModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleQuestionSubmit}
        />
      </div>
    
  );
};

export default Chats;
