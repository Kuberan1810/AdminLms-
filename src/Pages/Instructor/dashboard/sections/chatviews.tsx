import { useState, useMemo } from "react";
import { Search, ArrowLeft } from "lucide-react";

interface Message {
    text: string;
}

interface User {
    id: number;
    name: string;
    online: boolean;
    unread: number;
    messages: Message[];
}

interface Props {
    chatUsers: User[];
    selectedUser: User | null;
    setSelectedUser: (user: User) => void;
}

export default function ChatSidebar({
    chatUsers,
    selectedUser,
    setSelectedUser,
}: Props) {
    const [search, setSearch] = useState("");
    const [isOpen, setIsOpen] = useState(false); // mobile panel

    /* ================= Filter Users ================= */
    const filteredUsers = useMemo(() => {
        return chatUsers.filter((user) =>
            user.name.toLowerCase().includes(search.toLowerCase())
        );
    }, [chatUsers, search]);

    return (
        <>
            {/* Mobile Open Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="lg:hidden p-2 bg-[#F67300] text-white rounded-md"
            >
                Open Chats
            </button>

            {/* Sidebar */}
            <div
                className={`
          fixed lg:static top-0 left-0 h-full bg-white w-[85%] sm:w-[70%] lg:w-[35%]
          shadow-lg lg:shadow-none z-50 transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="font-semibold text-lg">Chats</h2>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="lg:hidden"
                    >
                        <ArrowLeft size={20} />
                    </button>
                </div>

                {/* Search */}
                <div className="p-3 border-b">
                    <div className="flex items-center bg-gray-100 px-3 py-2 rounded-lg">
                        <Search size={16} className="text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="bg-transparent outline-none text-sm ml-2 w-full"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                {/* User List */}
                <div className="overflow-y-auto h-[calc(100%-120px)] p-2 space-y-2">
                    {filteredUsers.map((user) => {
                        const lastMessage =
                            user.messages?.[user.messages.length - 1]?.text ||
                            "No messages yet";

                        return (
                            <div
                                key={user.id}
                                onClick={() => {
                                    setSelectedUser(user);
                                    setIsOpen(false);
                                }}
                                className={`
                  flex gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200
                  ${selectedUser?.id === user.id
                                        ? "bg-[#F67300] text-white"
                                        : "hover:bg-gray-100"
                                    }
                `}
                            >
                                {/* Avatar + Online */}
                                <div className="relative">
                                    <div className="w-11 h-11 rounded-full bg-gray-300" />
                                    <span
                                        className={`
                      absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white
                      ${user.online ? "bg-green-500" : "bg-gray-400"}
                    `}
                                    />
                                </div>

                                {/* Name + Last Message */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-center">
                                        <p className="font-medium text-sm truncate">
                                            {user.name}
                                        </p>

                                        {/* Unread Badge */}
                                        {user.unread > 0 && (
                                            <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
                                                {user.unread}
                                            </span>
                                        )}
                                    </div>

                                    <p
                                        className={`text-xs truncate ${selectedUser?.id === user.id
                                                ? "text-white/80"
                                                : "text-gray-500"
                                            }`}
                                    >
                                        {lastMessage}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    onClick={() => setIsOpen(false)}
                    className="fixed inset-0 bg-black/30 lg:hidden"
                />
            )}
        </>
    );
}
