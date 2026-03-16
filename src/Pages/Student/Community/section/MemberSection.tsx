import { useState } from "react";
import { members } from "../data/members";

const MemberSection = () => {
  const [showAll, setShowAll] = useState(false);

  const onlineCount = members.filter((m) => m.isOnline).length;
  const visibleMembers = showAll ? members : members.slice(0, 6);

  return (
    <div className="bg-white dark:bg-[#2A2A2A]  rounded-2xl border border-[#F2EEF4] dark:border-[#1E293B] p-4 sm:p-5 w-full overflow-hidden">

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-gray-100">
          All Members
        </h3>

        <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
          <span className="w-2 h-2 rounded-full bg-green-500" />
          {onlineCount} Online
        </div>
      </div>

      <div className="h-px bg-gray-200 dark:bg-[#1E293B] m-1" />

      {/* Members List */}
      <div
        className={`
          space-y-3 pr-1
          ${showAll ? "max-h-72 overflow-y-auto scrollbar-hide" : ""}
        `}
      >
        {visibleMembers.map((member, index) => (
          <div
            key={index}
            className="flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-[#1E293B] p-2 rounded-lg transition"
          >
            {/* Avatar */}
            <div className="relative">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-orange-500 text-white flex items-center justify-center text-sm font-medium">
                {member.name[0]}
              </div>

              {member.isOnline && (
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white dark:border-[#0F172A] rounded-full" />
              )}
            </div>

            {/* Name */}
            <span className="text-sm text-gray-800 dark:text-gray-300 truncate">
              {member.name}
            </span>
          </div>
        ))}
      </div>

      {/* View All Button */}
      {!showAll && members.length > 6 && (
        <button
          onClick={() => setShowAll(true)}
          className="text-orange-500 text-sm font-medium hover:underline mt-4 block mx-auto cursor-pointer"
        >
          View All
        </button>
      )}
    </div>
  );
};

export default MemberSection;