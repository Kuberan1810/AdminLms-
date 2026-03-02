import { trendingTopics } from "../data/trendingTopic";

const TrendingSection = () => {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4">


      <h3 className="text-lg font-semibold text-gray-900">
        Trending Topics
      </h3>

      <div className="h-px bg-gray-300 my-3" />

      <div className="flex flex-wrap gap-3">
        {trendingTopics.map((topic) => (
          <span
            key={topic}
            className="
              text-sm
              text-gray-800
              border border-gray-300
              px-3 py-2
              rounded-lg
              cursor-pointer
              hover:border-orange-400
              hover:text-orange-500
              transition
            "
          >
            #{topic}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TrendingSection;
