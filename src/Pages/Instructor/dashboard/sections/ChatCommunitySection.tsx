import { Send, Note1 } from "iconsax-react"
import {

    SquareArrowOutUpRight,
    Check,
    CheckCheck,
    Paperclip,
    X,
} from "lucide-react";
import {
    useMemo,
    useRef,
    useState,
} from "react";
import {
    useLocation,
    useNavigate,
} from "react-router-dom";

import { chatUsers, type User, type Message } from "./ChatData";
import { HambergerMenu } from "iconsax-react";

import CommunityMobile from "../../Community/CommunityMobile";

/* ================= MAIN ================= */

export default function ChatCommunitySection() {
    const navigate = useNavigate();
    const location = useLocation();

    const initialTab =
        location.pathname.includes("community")
            ? "community"
            : "chat";

    const [tab, setTab] =
        useState<"chat" | "community">(initialTab);

    return (
        <div className="boxStyle flex flex-col h-162.5">

            {/* HEADER */}
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl lg:text-2xl font-semibold mb-5">
                    Chat & Community
                </h3>

                <div className="relative group">
                    <button
                        onClick={() =>
                            navigate(
                                tab === "chat"
                                    ? "/instructor/chat"
                                    : "/instructor/community"
                            )
                        }
                        className="p-2 rounded-lg hover:bg-[#f7f7f7] transition cursor-pointer"
                    >
                        <SquareArrowOutUpRight size={18} />
                    </button>

                    {/* Custom Tooltip */}
                    <span className="hidden sm:block absolute right-0 top-12 whitespace-nowrap  bg-black/50 text-white text-xs px-2 py-1 rounded  opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 
    transition-all duration-200 pointer-events-none z-10 ">
                        Open Full Page
                    </span>
                </div>

            </div>

            {/* TABS WITH SLIDING INDICATOR */}
            <div className="relative flex bg-gray-100 dark:bg-[#1E1E1E] rounded-xl p-1 mb-4 border border-transparent dark:border-[#363636]">

                <div
                    className={`absolute top-1 bottom-1 w-1/2 bg-white dark:bg-[#2A2A2A] rounded-lg shadow dark:shadow-none transition-all duration-300 ${tab === "chat"
                        ? "left-1"
                        : "left-[50%]"
                        }`}
                />

                <button
                    onClick={() => setTab("chat")}
                    className={`relative z-10 flex-1 py-2 text-sm font-medium transition cursor-pointer ${tab === "chat"
                        ? "text-black dark:text-white"
                        : "text-gray-500 dark:text-[#A3A3A3]"
                        }`}
                >
                    Chat
                </button>

                <button
                    onClick={() => setTab("community")}
                    className={`relative z-10 flex-1 py-2 text-sm font-medium transition cursor-pointer ${tab === "community"
                        ? "text-black dark:text-white"
                        : "text-gray-500 dark:text-[#A3A3A3]"
                        }`}
                >
                    Community
                </button>
            </div>

            <div className="flex-1 overflow-scroll scrollbar-hide">
                <div className="h-full flex flex-col items-center justify-center py-10 text-center">
                    <div className="p-4 bg-[#FFF0EF] dark:bg-[#3D2B2A] rounded-full mb-4">
                        <Note1 size={32} color="#EF7A02" />
                    </div>
                    <p className="text-[#626262] dark:text-[#E0E0E0] text-base font-medium">Coming Soon</p>
                    <p className="text-[#989898] dark:text-[#A3A3A3] text-sm mt-1">This feature will appear in a few days.</p>
                </div>
                {false && (
                    tab === "chat" ? (
                        <EnterpriseChat />
                    ) : (
                        // <EnterpriseCommunity />
                        // <CommunityContent />
                        <CommunityMobile />
                    )
                )}
            </div>
        </div>
    );
}

/* ================= CHAT ================= */

function EnterpriseChat() {
    const messageRef = useRef<HTMLDivElement | null>(null);

    const [users, setUsers] = useState<User[]>(chatUsers);
    const [selectedId, setSelectedId] = useState(1);
    const [input, setInput] = useState("");
    const [search, setSearch] = useState("");
    const [mobileOpen, setMobileOpen] = useState(false);
    const [collapsed, setCollapsed] = useState(false); // ✅ NEW

    const activeUser =
        users.find((u) => u.id === selectedId) || users[0];

    const filteredUsers = useMemo(
        () =>
            users.filter((u) =>
                u.name.toLowerCase().includes(search.toLowerCase())
            ),
        [users, search]
    );

    const sendMessage = () => {
        if (!input.trim()) return;

        const newMessage: Message = {
            id: Date.now(),
            from: "instructor",
            text: input,
            time: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            }),
            status: "sent",
        };

        setUsers((prev) =>
            prev.map((u) =>
                u.id === selectedId
                    ? {
                        ...u,
                        unread: 0,
                        messages: [...u.messages, newMessage],
                    }
                    : u
            )
        );

        setInput("");
    };

    const handleToggleSidebar = () => {
        setCollapsed((prev) => !prev);
    };

    return (
        <div className="flex h-full bg-white dark:bg-[#2A2A2A] border border-[#F2EEF4] dark:border-[#363636] rounded-xl overflow-hidden">

            {/* ================= SIDEBAR ================= */}
            <div
                className={`fixed lg:static top-0 left-0 h-full 
        ${collapsed ? "lg:w-[90px]" : "lg:w-[50%]"} 
        w-[85%] sm:w-[60%]
        bg-white dark:bg-[#2A2A2A] border-r border-[#F2EEF4] dark:border-[#363636] 
        z-40 transition-all duration-300
        ${mobileOpen
                        ? "translate-x-0"
                        : "-translate-x-full lg:translate-x-0"
                    }`}
            >
                {/* Search + Hamburger */}
                <div className="p-4 border-b border-[#F2EEF4] dark:border-[#363636] flex items-center gap-3">
                    {!collapsed && (
                        <input
                            placeholder="Search..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-gray-100 dark:bg-[#1E1E1E] px-3 py-2 rounded-lg text-sm outline-none"
                        />
                    )}

                    <button
                        onClick={handleToggleSidebar}
                        className="p-2 rounded-lg hover:bg-[#f7f7f7] transition cursor-pointer hidden lg:block"
                        aria-label="Toggle sidebar"
                    >
                        <HambergerMenu size={22}  color="#626262" />
                    </button>
                    <button
                        onClick={() => {

                            setMobileOpen(false);
                        }}
                        className="p-2 rounded-lg hover:bg-[#f7f7f7] transition cursor-pointer  lg:hidden block"
                        aria-label="Toggle sidebar"
                    >
                        <X size={22} color="#626262" />
                    </button>
                </div>

                {/* Users */}
                <div className="overflow-y-auto h-[calc(100%-70px)] p-2 space-y-2">
                    {filteredUsers.map((user) => {
                        const last =
                            user.messages[user.messages.length - 1]?.text;

                        return (
                            <div
                                key={user.id}
                                onClick={() => {
                                    setSelectedId(user.id);
                                    setMobileOpen(false);
                                }}
                                className={`flex gap-3 p-3 rounded-xl cursor-pointer transition ${selectedId === user.id
                                    ? "bg-orange-200 dark:bg-[#3d271d]"
                                    : "hover:bg-gray-100 dark:hover:bg-[#1E1E1E]"
                                    }`}
                            >
                                {/* Avatar */}
                                <div className="relative">
                                    <div className="w-10 h-10 bg-gray-300 rounded-full" />
                                    <span
                                        className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${user.online
                                            ? "bg-green-500"
                                            : "bg-gray-400"
                                            }`}
                                    />
                                </div>

                                {/* Hide text when collapsed */}
                                {!collapsed && (
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between">
                                            <p className="text-sm font-semibold truncate text-[#333]">
                                                {user.name}
                                            </p>

                                            {user.unread > 0 && (
                                                <span className="bg-green-500 text-white flex justify-center items-center text-xs w-5 h-5 rounded-full">
                                                    {user.unread}
                                                </span>
                                            )}
                                        </div>

                                        <p className="text-xs text-[#626262] font-medium truncate">
                                            {last}
                                        </p>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* ================= CHAT AREA ================= */}
            <div className="flex-1 flex flex-col">

                {/* Header */}
                <div className="px-5 py-3 border-b border-[#F2EEF4] dark:border-[#363636] flex justify-between items-center">
                    <div>
                        <p className="text-sm font-semibold">
                            {activeUser.name}
                        </p>
                        <p className="text-xs text-gray-500">
                            {activeUser.role} •{" "}
                            {activeUser.online ? "Online" : "Offline"}
                        </p>
                    </div>

                    <button
                        onClick={() => setMobileOpen(true)}
                        className="lg:hidden text-sm text-orange-500"
                    >
                        Chats
                    </button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-gray-50 dark:bg-[#1E1E1E]">
                    {activeUser.messages.map((m) => (
                        <div
                            key={m.id}
                            className={`max-w-[75%] p-3 rounded-2xl text-sm ${m.from === "instructor"
                                ? "bg-orange-500 text-white ml-auto"
                                : "bg-white dark:bg-[#333333] shadow dark:shadow-none dark:text-white"
                                }`}
                        >
                            <p>{m.text}</p>

                            <div className="flex justify-end items-center gap-1 mt-1 text-xs opacity-70">
                                <span>{m.time}</span>
                                {m.status === "sent" && <Check size={12} />}
                                {m.status === "delivered" && (
                                    <CheckCheck size={12} />
                                )}
                                {m.status === "seen" && (
                                    <CheckCheck
                                        size={12}
                                        className="text-blue-400"
                                    />
                                )}
                            </div>
                        </div>
                    ))}

                    <div ref={messageRef} />
                </div>

                {/* Input */}
                <div className="border-t border-[#F2EEF4] dark:border-[#363636] px-4 py-3 flex gap-2 w-full">
                    <div className="flex  justify-center items-center gap-5 w-full">
                        <div className="cursor-pointer">
                            <Paperclip size={18} className="text-[#626262] dark:text-white" />
                        </div>
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) =>
                                e.key === "Enter" && sendMessage()
                            }
                            placeholder="Type message..."
                            className="flex-1 bg-gray-100 dark:bg-[#1E1E1E] px-4 py-2 rounded-xl text-sm outline-none"
                        />
                    </div>
                    <button
                        onClick={sendMessage}
                        className="bg-orange-500 px-3 py-3 rounded-full text-white cursor-pointer"
                    >
                        <Send size={20}  color="#fff" />
                    </button>
                </div>
            </div>
        </div>
    );
}


/* ================= COMMUNITY ================= */

/*
function EnterpriseCommunity() {
    const [posts, setPosts] = useState([
        "Explain RAG in simple terms.",
    ]);
    const [input, setInput] = useState("");

    const addPost = () => {
        if (!input.trim()) return;
        setPosts([input, ...posts]);
        setInput("");
    };

    return (
        <div className="space-y-4 p-4">
            <div className="border border-[#F2EEF4] p-3 rounded-xl">
                <input
                    value={input}
                    onChange={(e) =>
                        setInput(e.target.value)
                    }
                    placeholder="Share something..."
                    className="w-full outline-none text-sm"
                />
                <div className="flex justify-end mt-2">
                    <button
                        onClick={addPost}
                        className="bg-orange-500 text-white px-4 py-1 rounded-lg"
                    >
                        Post
                    </button>
                </div>
            </div>

            {posts.map((p, i) => (
                <div
                    key={i}
                    className="bg-gray-100 p-3 rounded-xl text-sm"
                >
                    {p}
                </div>
            ))}
        </div>
    );
}
*/
