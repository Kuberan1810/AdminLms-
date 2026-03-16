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
        w-full sm:w-[320px] lg:w-[287px]
        h-full
        flex flex-col
        bg-white dark:bg-[#1E1E1E]
        border-r border-gray-200 dark:border-gray-700
        transition-colors
      "
    >
      <div className="p-4">
        <input
          className="
            w-full px-4 py-[10px] text-sm
            border border-gray-200 dark:border-gray-700
            rounded-[8px]
            bg-gray-50 dark:bg-[#2A2A2A]
            text-gray-900 dark:text-gray-200
            placeholder-gray-400
            focus:outline-none
          "
          placeholder="Search conversations..."
        />
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide px-4 pb-4">
        {chats.map((chat, index) => {
          const isActive = activeId === chat.id;

          return (
            <div key={chat.id} className="relative">
              <div
                onClick={() => onSelect(chat)}
                className={`
                  relative flex gap-3 p-3 cursor-pointer rounded-[8px]
                  transition-colors duration-200
                  ${
                    isActive
                      ? "bg-orange-50 dark:bg-[#2F1F12]"
                      : "hover:bg-gray-50 dark:hover:bg-[#2A2A2A]"
                  }
                `}
              >

                {isActive && (
                  <span className="absolute left-0 top-0 h-full w-[4px] bg-orange-500 rounded-r-md" />
                )}

                {chat.type === "group" && (
                  <div className="flex -space-x-2">
                    {chat.members?.slice(0, 4).map((name, i) => (
                      <div
                        key={i}
                        className="
                          w-8 h-8 rounded-full
                          bg-orange-500 text-white text-xs
                          flex items-center justify-center
                          border-2 border-white dark:border-[#1E1E1E]
                        "
                      >
                        {name.charAt(0)}
                      </div>
                    ))}

                    {chat.members && chat.members.length > 4 && (
                      <div
                        className="
                          w-8 h-8 rounded-full
                          bg-gray-200 dark:bg-gray-700
                          text-gray-700 dark:text-gray-200
                          text-xs flex items-center justify-center
                          border-2 border-white dark:border-[#1E1E1E]
                        "
                      >
                        +{chat.members.length - 4}
                      </div>
                    )}
                  </div>
                )}

                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {chat.name}
                  </p>

                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {chat.type === "group" ? "Group" : "Student"}
                  </p>

                  {isActive && (
                    <span className="inline-block mt-1 text-[10px] px-2 py-[2px] bg-orange-500 text-white rounded-full">
                      2 new
                    </span>
                  )}
                </div>
              </div>
              {index !== chats.length - 1 && (
                <div className="ml-[16px] h-[1px] bg-gray-200 dark:bg-gray-700" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChatList;