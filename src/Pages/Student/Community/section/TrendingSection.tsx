import { trendingTopics } from "../data/trendingTopic";

const TrendingSection = () => {
  return (
    <div className="bg-white dark:bg-[#2A2A2A]  rounded-2xl border border-[#F2EEF4] dark:border-[#1E293B] p-4 sm:p-5 w-full">

      {/* Title */}
      <h3 className="text-base sm:text-lg font-semibold text-[#333] dark:text-gray-100">
        Trending Topics
      </h3>

      <div className="h-px bg-gray-200 dark:bg-[#1E293B] m-1.5" />

      {/* Topics */}
      <div className="flex flex-wrap gap-2 sm:gap-3">

        {trendingTopics.map((topic) => (
          <button
            key={topic}
            className="
              text-xs sm:text-sm
              text-gray-700 dark:text-gray-300
              border border-gray-300 dark:border-[#1E293B]
              px-3 py-1.5
              rounded-full
              whitespace-nowrap
              transition
              hover:border-orange-400
              hover:text-orange-500
              hover:bg-orange-50
              dark:hover:bg-[#1E293B]
              h-fit cursor-pointer
            "
          >
            #{topic}
          </button>
        ))}

      </div>

    </div>
  );
};

export default TrendingSection;