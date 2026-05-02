import { useState, useRef, useEffect } from "react";
import { Search, ListFilter, SlidersHorizontal, ChevronDown, Check } from "lucide-react";

interface Props {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  filterStatus: string;
  setFilterStatus: (val: string) => void;
  sortBy: string;
  setSortBy: (val: string) => void;
}

const InstructorFilters = ({
  searchQuery,
  setSearchQuery,
  filterStatus,
  setFilterStatus,
  sortBy,
  setSortBy,
}: Props) => {
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  const statusRef = useRef<HTMLDivElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (statusRef.current && !statusRef.current.contains(event.target as Node)) {
        setIsStatusOpen(false);
      }
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const statusOptions = ["All", "Active", "Leave", "Pending", "Resigned"];
  const sortOptions = ["Newest", "Oldest", "Name A-Z", "Name Z-A"];

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6 relative z-10">
      {/* Search Input */}
      <div className="relative w-full md:w-[400px]">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#626262]" size={18} />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by name, ID or email..."
          className="w-full pl-11 pr-4 py-3 bg-white dark:bg-[#2A2A2A] border border-[#F2EEF4] dark:border-[#3B3B3B] rounded-[18px] text-sm focus:outline-none focus:ring-1 focus:ring-[#F67300]/50 transition-all"
        />
      </div>

      <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
        {/* Status Filter Dropdown */}
        <div ref={statusRef} className="relative ">
          <button
            onClick={() => setIsStatusOpen(!isStatusOpen)}
            className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-[#2A2A2A] border border-[#F2EEF4] dark:border-[#3B3B3B] rounded-xl text-sm font-semibold text-[#333333] dark:text-white hover:bg-gray-50 dark:hover:bg-[#333] transition-all min-w-[140px] justify-between cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <ListFilter size={18} className="text-[#626262]" />
              <span>{filterStatus === "All" ? "Filter Status" : filterStatus}</span>
            </div>
            <ChevronDown size={16} className={`text-[#626262] transition-transform ${isStatusOpen ? "rotate-180" : ""}`} />
          </button>

          {isStatusOpen && (
            <div className="absolute top-full right-0 mt-2 w-[180px] bg-white dark:bg-[#2A2A2A] border border-[#F2EEF4] dark:border-[#3B3B3B] rounded-xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 z-50 ">
              {statusOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setFilterStatus(option);
                    setIsStatusOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 text-sm flex items-center justify-between hover:bg-gray-50 dark:hover:bg-[#333] transition-colors cursor-pointer"
                >
                  <span className={`${filterStatus === option ? "text-[#F67300] font-bold" : "text-[#333333] dark:text-white font-medium"}`}>
                    {option === "All" ? "All Status" : option}
                  </span>
                  {filterStatus === option && <Check size={16} className="text-[#F67300]" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Sort Dropdown */}
        <div ref={sortRef} className="relative">
          <button
            onClick={() => setIsSortOpen(!isSortOpen)}
            className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-[#2A2A2A] border border-[#F2EEF4] dark:border-[#3B3B3B] rounded-xl text-sm font-semibold text-[#333333] dark:text-white hover:bg-gray-50 dark:hover:bg-[#333] transition-all min-w-[160px] justify-between cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <SlidersHorizontal size={18} className="text-[#626262]" />
              <span>Sort by: <span className="text-[#F67300]">{sortBy}</span></span>
            </div>
            <ChevronDown size={16} className={`text-[#626262] transition-transform ${isSortOpen ? "rotate-180" : ""}`} />
          </button>

          {isSortOpen && (
            <div className="absolute top-full right-0 mt-2 w-[180px] bg-white dark:bg-[#2A2A2A] border border-[#F2EEF4] dark:border-[#3B3B3B] rounded-xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 z-50">
              {sortOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setSortBy(option);
                    setIsSortOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 text-sm flex items-center justify-between hover:bg-gray-50 dark:hover:bg-[#333] transition-colors cursor-pointer"
                >
                  <span className={`${sortBy === option ? "text-[#F67300] font-bold" : "text-[#333333] dark:text-white font-medium"}`}>
                    {option === "Newest" || option === "Oldest" ? `Sort by: ${option}` : option}
                  </span>
                  {sortBy === option && <Check size={16} className="text-[#F67300]" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InstructorFilters;
