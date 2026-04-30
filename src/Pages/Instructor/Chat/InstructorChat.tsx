import { useState, useEffect } from "react";
import InstructorDashboardLayout from "../../../Components/instructor/InstructorDashboardLayout";

import ChatList from "./chatList";
import ChatWindow from "./Chats";
import GroupMembers from "./GroupMembers";

import { useGroupByBatch, useGroupMessages } from "../../../hooks/chat/useGroup";
import { useChatWebSocket } from "../../../hooks/chat/useChatWebSocket";
import { useDMConversations, useDMMessages } from "../../../hooks/chat/useDM";
import { useMyCourses } from "../../../hooks/useMyCourses";
import { useAuth } from "../../../context/AuthContext";

const InstructorChat = () => {
  const { user } = useAuth();
  
  const { data: courses = [], isLoading: coursesLoading } = useMyCourses();
  const { data: dmConversationsData, isLoading: dmLoading } = useDMConversations();
  const [activeTab, setActiveTab] = useState<'groups' | 'dms'>('groups');
  const [selectedChatId, setSelectedChatId] = useState<string | number | null>(null);
  const [showMembers, setShowMembers] = useState(false);
  const [isMobileChatOpen, setIsMobileChatOpen] = useState(false);

  // Map courses to the groups list
  const groupChatList = courses.map((c: any) => ({
    id: `group-${c.id}`,
    name: c.course_name,
    type: "group" as const,
    courseId: c.id,
    batchName: "Batch-A",
  }));

  // Map DMs to the DMs list
  const dms = dmConversationsData || [];
  const dmChatList = dms.map((dm: any) => ({
    id: `dm-${dm.id}`,
    name: dm.other_user_name,
    type: "individual" as const,
    conversationId: dm.id
  }));

  const chatList = activeTab === 'groups' ? groupChatList : dmChatList;

  // Auto select first chat if none selected
  useEffect(() => {
    if (!selectedChatId && chatList.length > 0) {
      setSelectedChatId(chatList[0].id);
    }
  }, [chatList, selectedChatId]);
  // Refreshed component logic

  const selectedChat = chatList.find((c: any) => c.id === selectedChatId) || chatList[0] || null;
  
  // Resolve groupId from the specific course/batch combo
  const { data: groupData } = useGroupByBatch(
      selectedChat?.type === 'group' ? selectedChat.courseId : "", 
      selectedChat?.type === 'group' ? selectedChat.batchName : ""
  );
  
  const groupId = groupData?.id || "";

  // Fetch messages directly using the validated groupId 
  const { data: groupMessagesResponse } = useGroupMessages(
      selectedChat?.type === 'group' ? groupId : ""
  );

  const { data: dmMessagesResponse } = useDMMessages(
      selectedChat?.type === 'individual' ? selectedChat.conversationId : ""
  );

  const messages = selectedChat?.type === 'group' 
     ? (groupMessagesResponse?.data || []) 
     : (dmMessagesResponse?.data || []);

  const activeWsId = selectedChat?.type === 'group' ? groupId : selectedChat?.conversationId;
  const { isConnected, onlineCount, typingUsers } = useChatWebSocket({
      type: selectedChat?.type === 'group' ? 'group' : 'dm',
      id: activeWsId || null
  });


  const groupMembers = [
    { name: "You", online: true, isInstructor: true },
    { name: "Kaviya", online: true },
    { name: "Nila", online: true },
    { name: "Zara", online: false },
    { name: "Ashraf", online: true },
    { name: "Varsha", online: true },
    { name: "Sakthi", online: false },
    { name: "Harish", online: true },
    { name: "Hari Priya", online: false },
  ];

  const openMembers = () => {
    setShowMembers(true);
  };

  return (
    <InstructorDashboardLayout>
      <div className="flex flex-1 bg-white dark:bg-[#1E1E1E] rounded-md mx-3 overflow-hidden">
      <div className="flex w-full h-[calc(100vh-135px)] overflow-hidden">
        
        {/* CHAT LIST */}
        <div
          className={`w-full md:w-[320px] border-r border-gray-200 dark:border-gray-700 flex flex-col
          ${isMobileChatOpen ? "hidden md:block" : "block"}
          `}
        >
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Messages</h2>
            {isConnected && (
              <span className="flex items-center gap-1.5 text-[10px] text-green-500 font-medium animate-in fade-in transition-all">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                Live
              </span>
            )}
          </div>
          {coursesLoading || dmLoading ? (
            <div className="p-4 text-center">Loading chats...</div>
          ) : (
            <ChatList
                chats={chatList as any}
                activeId={String(selectedChat?.id)}
                activeTab={activeTab}
                onTabChange={setActiveTab}
                onSelect={(chat) => {
                setSelectedChatId(chat.id);
                setIsMobileChatOpen(true);
                setShowMembers(false);
                }}
            />
          )}
        </div>

        {/* CHAT WINDOW */}
        <div
          className={`flex-1 h-full ${isMobileChatOpen ? "block" : "hidden md:block"}`}
        >
          {selectedChat ? (
            <ChatWindow
              chat={{
                ...selectedChat,
                id: selectedChat.type === 'group' ? groupId : selectedChat.conversationId, // critical override for mutations
                messages: messages.map((m: any) => ({
                    id: String(m.id),
                    sender: (m.sender.name === user?.name || m.sender.role === "Instructor") ? "me" : "student",
                    name: m.sender.name,
                    role: m.sender.role,
                    text: m.content,
                    time: new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    likes: m.like_count,
                    liked: m.is_liked_by_me,
                    saved: m.is_bookmarked_by_me,
                    replies: []
                }))
              } as any}
              onlineCount={onlineCount}
              typingUsers={typingUsers}
              onViewMembers={openMembers}
              onBack={() => setIsMobileChatOpen(false)}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
                Select a chat to start messaging
            </div>
          )}
        </div>

      </div>
        {/* GROUP MEMBERS */}
        {selectedChat?.type === "group" && showMembers && (
          <GroupMembers
            members={groupMembers}
            onClose={() => setShowMembers(false)}
          />
        )}
      </div>
    </InstructorDashboardLayout>
  );
};

export default InstructorChat;