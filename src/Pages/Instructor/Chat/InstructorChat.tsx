import { useState } from "react";
import InstructorDashboardLayout from "../../../Components/instructor/InstructorDashboardLayout";

import ChatList from "./chatList";
import ChatWindow from "./Chats";
import GroupMembers from "./GroupMembers";

import { chats } from "./data/chatData";
import type { Chat } from "./data/chat.types";

const InstructorChat = () => {
  const [selectedChat, setSelectedChat] = useState<Chat>(chats[0]);
  const [showMembers, setShowMembers] = useState(false);
  const [isMobileChatOpen, setIsMobileChatOpen] = useState(false);

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
          className={`w-full md:w-[320px] border-r border-gray-200 dark:border-gray-700
          ${isMobileChatOpen ? "hidden md:block" : "block"}
          `}
        >
          <ChatList
            chats={chats}
            activeId={selectedChat.id}
            onSelect={(chat) => {
              setSelectedChat(chat);
              setIsMobileChatOpen(true);
              setShowMembers(false);
            }}
          />
        </div>

        {/* CHAT WINDOW */}
        <div
          className={`flex-1 h-full ${isMobileChatOpen ? "block" : "hidden md:block"}`}
        >
          <ChatWindow
            chat={selectedChat}
            onViewMembers={openMembers}
            onBack={() => setIsMobileChatOpen(false)}
          />
        </div>
      </div>
        {/* GROUP MEMBERS */}
        {selectedChat.type === "group" && showMembers && (
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