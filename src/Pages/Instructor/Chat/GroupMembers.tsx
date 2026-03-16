import { X } from "lucide-react";

interface Props {
  members: {
    name: string;
    online?: boolean;
    isInstructor?: boolean;
  }[];
  onClose: () => void;
}

const GroupMembers = ({ members, onClose }: Props) => {
  return (
    <div
      className="
        hidden sm:flex
        w-full sm:w-[320px] lg:w-[280px]
        border-l border-gray-200 dark:border-gray-700
        bg-white dark:bg-[#1E1E1E]
        p-4
        flex-col
        max-h-screen
        transition-colors
      "
    >
      {/* HEADER */}
      <div className="flex justify-between items-center mb-1">
        <h3 className="font-semibold text-sm text-gray-900 dark:text-white">
          Group Members
        </h3>

        <button
          onClick={onClose}
          className="
            p-2 rounded-md
            hover:bg-gray-100 dark:hover:bg-[#2A2A2A]
            text-gray-500 dark:text-gray-400
          "
        >
          <X size={16} />
        </button>
      </div>

      <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
        {members.length} Members total
      </p>

      {/* SEARCH */}
      <input
        className="
          w-full px-3 py-2 text-sm
          border border-gray-300 dark:border-gray-700
          rounded-md mb-3
          bg-gray-50 dark:bg-[#2A2A2A]
          text-gray-900 dark:text-gray-200
          placeholder-gray-400
          focus:outline-none
        "
        placeholder="Search member..."
      />
      <div className="border-t border-gray-200 dark:border-gray-700 mb-3" />
      <div className="flex-1 overflow-y-auto space-y-3 pr-1">

        {members.map((member) => {
          const initials = member.name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .slice(0, 2);

          return (
            <div
              key={member.name}
              className="
                flex items-center gap-3
                p-1 rounded-md
                hover:bg-gray-100 dark:hover:bg-[#2A2A2A]
                transition
              "
            >
              {/* Avatar */}
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-[#FF7A00] text-white text-xs flex items-center justify-center">
                  {initials}
                </div>

                {member.online && (
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white dark:border-[#1E1E1E]" />
                )}
              </div>

              {/* Name */}
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {member.name}
                </p>

                {member.isInstructor && (
                  <p className="text-xs text-gray-400">
                    You (Instructor)
                  </p>
                )}
              </div>
            </div>
          );
        })}

      </div>
    </div>
  );
};

export default GroupMembers;