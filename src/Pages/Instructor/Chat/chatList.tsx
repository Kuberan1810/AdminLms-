import type { Chat } from "../Chat/data/chat.types";

interface Props {
  chats: Chat[];
  activeId: string;
  onSelect: (chat: Chat) => void;
}

const ChatList = ({ chats, activeId, onSelect }: Props) => {
  return (
    <div
      className="
         sm:block
        w-full sm:w-[320px] lg:w-[287px]

        p-4
      "
    >
      {/* Search */}
      <input
        className="w-full mb-4 px-4 py-[10px] text-sm border border-[#E5E5E5] rounded-[8px] bg-gray-50 focus:outline-none"
        placeholder="Search conversations..."
      />

      {/* Chat Items */}
      {chats.map((chat, index) => {
        const isActive = activeId === chat.id;

        return (
          <div key={chat.id} className="relative">
            <div
              onClick={() => onSelect(chat)}
              className={`relative flex gap-3 p-3 cursor-pointer rounded-[8px] ${
                isActive ? "bg-[#FFF3E6]" : "hover:bg-white"
              }`}
            >
              {isActive && (
                <span className="absolute left-0 top-0 h-full w-[4px] bg-[#FF7A00] rounded-r-md" />
              )}

              {/* Avatar */}
              {chat.type === "group" && (
                <div className="flex -space-x-2">
                  {chat.members?.slice(0, 4).map((name, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-[#FF7A00] text-white text-xs flex items-center justify-center border-2 border-white"
                    >
                      {name.charAt(0)}
                    </div>
                  ))}

                  {chat.members && chat.members.length > 4 && (
                    <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-700 text-xs flex items-center justify-center border-2 border-white">
                      +{chat.members.length - 4}
                    </div>
                  )}
                </div>
              )}

              {/* Text */}
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {chat.name}
                </p>
                <p className="text-xs text-gray-500">
                  {chat.type === "group" ? "Group" : "Student"}
                </p>

                {isActive && (
                  <span className="inline-block mt-1 text-[10px] px-2 py-[2px] bg-[#FF7A00] text-white rounded-full">
                    2 new
                  </span>
                )}
              </div>
            </div>

            {index !== chats.length - 1 && (
              <div className="ml-[16px] h-[1px] bg-[#E5E5E5]" />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ChatList;
