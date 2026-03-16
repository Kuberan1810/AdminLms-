import { useState } from "react";
import { members } from "../data/members";

const MemberSection = () => {
  const [showAll, setShowAll] = useState(false);

  const onlineCount = members.filter(m => m.isOnline).length;
  const visibleMembers = showAll ? members : members.slice(0, 6);

  return (
    <div className="bg-white dark:bg-[#2A2A2A] rounded-xl border border-gray-100 dark:border-gray-700 p-4 transition-colors">

      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-gray-900 dark:text-white">
          All Members
        </h3>

        <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
          <span className="w-2 h-2 rounded-full bg-purple-500" />
          {onlineCount} Online
        </div>
      </div>

      <div
        className={`space-y-3 pr-1 ${
          showAll
            ? "max-h-[280px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600"
            : ""
        }`}
      >
        {visibleMembers.map((member, index) => (
          <div key={index} className="flex items-center gap-3">

            {/* Avatar */}
            <div className="relative">
              <div className="w-9 h-9 rounded-full bg-orange-500 text-white flex items-center justify-center text-sm font-medium">
                {member.name[0]}
              </div>

              {member.isOnline && (
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white dark:border-[#2A2A2A] rounded-full" />
              )}
            </div>

            {/* Name */}
            <span className="text-sm text-gray-800 dark:text-gray-200">
              {member.name}
            </span>

          </div>
        ))}
      </div>

      {!showAll && members.length > 6 && (
        <button
          onClick={() => setShowAll(true)}
          className="text-orange-500 text-sm font-medium hover:underline mt-3 block mx-auto"
        >
          View All
        </button>
      )}
    </div>
  );
};

export default MemberSection;