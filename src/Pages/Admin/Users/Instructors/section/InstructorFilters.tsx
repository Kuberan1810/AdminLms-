import { Search, ListFilter, SlidersHorizontal } from "lucide-react";

const InstructorFilters = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
      <div className="relative w-full md:w-[400px]">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#626262]" size={18} />
        <input
          type="text"
          placeholder="Search by name, ID or email..."
          className="w-full pl-11 pr-4 py-3 bg-white dark:bg-[#2A2A2A] border border-[#F2EEF4] dark:border-[#3B3B3B] rounded-[18px] text-sm focus:outline-none focus:ring-2 focus:ring-[#F67300]/20 transition-all"
        />
      </div>

      <div className="flex items-center gap-3 w-full md:w-auto">
        <button className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-[#2A2A2A] border border-[#F2EEF4] dark:border-[#3B3B3B] rounded-xl text-sm font-semibold text-[#333333] dark:text-white hover:bg-gray-50 dark:hover:bg-[#333] transition-all">
          <ListFilter size={18} className="text-[#626262]" />
          Filter
        </button>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-[#2A2A2A] border border-[#F2EEF4] dark:border-[#3B3B3B] rounded-xl text-sm font-semibold text-[#333333] dark:text-white hover:bg-gray-50 dark:hover:bg-[#333] transition-all">
          <SlidersHorizontal size={18} className="text-[#626262]" />
          Sort by : <span className="text-[#F67300]">Newest</span>
        </button>
      </div>
    </div>
  );
};

export default InstructorFilters;
