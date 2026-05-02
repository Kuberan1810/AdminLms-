import React from 'react';
import {
  ListFilter,
  ChevronDown,
  Check,
  FolderOpen,
  LayoutGrid,
  List
} from 'lucide-react';

interface FilterBarProps {
  contentTypeFilter: string[];
  setContentTypeFilter: React.Dispatch<React.SetStateAction<string[]>>;
  chapterFilter: string[];
  setChapterFilter: React.Dispatch<React.SetStateAction<string[]>>;
  isContentTypeOpen: boolean;
  setIsContentTypeOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isChaptersOpen: boolean;
  setIsChaptersOpen: React.Dispatch<React.SetStateAction<boolean>>;
  viewMode: 'grid' | 'list';
  setViewMode: React.Dispatch<React.SetStateAction<'grid' | 'list'>>;
  chapters: any[];
}

export const FilterBar: React.FC<FilterBarProps> = ({
  contentTypeFilter,
  setContentTypeFilter,
  chapterFilter,
  setChapterFilter,
  isContentTypeOpen,
  setIsContentTypeOpen,
  isChaptersOpen,
  setIsChaptersOpen,
  viewMode,
  setViewMode,
  chapters,
}) => {
  return (
    <div className="flex justify-between items-center mb-8 bg-white dark:bg-[#2D2D2D] p-4 rounded-2xl border border-[#F1F5F9] dark:border-[#3B3B3B]">
      <div className="flex items-center gap-4">
        {/* Content Type Filter */}
        <div className="relative">
          <div
            onClick={(e) => {
              e.stopPropagation();
              setIsContentTypeOpen(!isContentTypeOpen);
              setIsChaptersOpen(false);
            }}
            className="flex items-center gap-2 px-[20px] py-[10px] bg-[#FBFCFD] dark:bg-[#383838] border border-[#E8EDF3] dark:border-[#4A4A4A] rounded-[13px] cursor-pointer select-none min-w-[190px] justify-between"
          >
            <div className="flex items-center gap-2">
              <ListFilter size={16} className="text-[#64748B] dark:text-slate-400" />
              <span className="text-[14px] font-medium text-[#222222] dark:text-slate-200 leading-none font-['Urbanist']">
                Content Type: {contentTypeFilter.includes("All") ? "All" : contentTypeFilter.join(", ")}
              </span>
            </div>
            <ChevronDown size={14} className={`text-[#94A3B8] dark:text-slate-400 transition-transform duration-200 ${isContentTypeOpen ? 'rotate-180' : ''}`} />
          </div>

          {isContentTypeOpen && (
            <div className="absolute top-full left-0 mt-2 bg-white dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 rounded-2xl py-2.5 shadow-xl z-50 animate-in fade-in zoom-in-95 duration-150 font-['Urbanist'] w-[220px]">
              {["All", "Notes", "Assignment", "Tests", "Labs"].map((type) => {
                const isSelected = contentTypeFilter.includes(type);
                return (
                  <div
                    key={type}
                    onClick={(e) => {
                      e.stopPropagation();
                      setContentTypeFilter(prev => {
                        if (type === "All") return ["All"];
                        const withoutAll = prev.filter(t => t !== "All");
                        if (withoutAll.includes(type)) {
                          const next = withoutAll.filter(t => t !== type);
                          return next.length === 0 ? ["All"] : next;
                        } else {
                          return [...withoutAll, type];
                        }
                      });
                    }}
                    className="px-5 py-3 text-[14px] cursor-pointer hover:bg-[#FFF4ED] dark:hover:bg-[#F6810C]/10 transition-colors flex items-center select-none"
                  >
                    <div className="flex items-center gap-3">
                      {isSelected ? (
                        <div className="w-5 h-5 bg-[#F6810C] rounded-[4px] flex items-center justify-center select-none flex-shrink-0 animate-in zoom-in-50 duration-75">
                          <Check size={12} className="text-white" />
                        </div>
                      ) : (
                        <div className="w-5 h-5 border-2 border-[#CBD5E1] dark:border-slate-600 rounded-[4px] select-none flex-shrink-0" />
                      )}
                      <span className="text-[14px] font-medium leading-none text-[#222222] dark:text-white">
                        {type}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Chapters Filter */}
        <div className="relative">
          <div
            onClick={(e) => {
              e.stopPropagation();
              setIsChaptersOpen(!isChaptersOpen);
              setIsContentTypeOpen(false);
            }}
            className="flex items-center gap-2 px-[20px] py-[10px] bg-[#FBFCFD] dark:bg-[#383838] border border-[#E8EDF3] dark:border-[#4A4A4A] rounded-[13px] cursor-pointer select-none min-w-[190px] justify-between"
          >
            <div className="flex items-center gap-2">
              <FolderOpen size={16} className="text-[#64748B] dark:text-slate-400" />
              <span className="text-[14px] font-medium text-[#222222] dark:text-slate-200 leading-none font-['Urbanist']">
                {chapterFilter.includes("All Chapters") ? "All Chapters" : chapterFilter.map(c => {
                  const found = chapters.find(orig => orig.title === c);
                  return found ? `Chapter :0${found.id}` : c;
                }).join(", ")}
              </span>
            </div>
            <ChevronDown size={14} className={`text-[#94A3B8] dark:text-slate-400 transition-transform duration-200 ${isChaptersOpen ? 'rotate-180' : ''}`} />
          </div>

          {isChaptersOpen && (
            <div className="absolute top-full left-0 mt-2 bg-white dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 rounded-2xl py-2.5 shadow-xl z-50 animate-in fade-in zoom-in-95 duration-150 font-['Urbanist'] w-[340px]">
              {["All Chapters", ...chapters.map(c => c.title)].map((chap, idx) => {
                const isSelected = chapterFilter.includes(chap);

                // Format Chapter Name
                let numStr = "01";
                let rawTitle = chap;
                if (chap !== "All Chapters") {
                  const found = chapters.find(c => c.title === chap);
                  const id = found ? found.id : idx;
                  numStr = id < 10 ? `0${id}` : `${id}`;
                  rawTitle = chap.includes(':') ? chap.split(':')[1].trim() : chap;
                }

                return (
                  <div
                    key={chap}
                    onClick={(e) => {
                      e.stopPropagation();
                      setChapterFilter(prev => {
                        if (chap === "All Chapters") return ["All Chapters"];
                        const withoutAll = prev.filter(t => t !== "All Chapters");
                        if (withoutAll.includes(chap)) {
                          const next = withoutAll.filter(t => t !== chap);
                          return next.length === 0 ? ["All Chapters"] : next;
                        } else {
                          return [...withoutAll, chap];
                        }
                      });
                    }}
                    className="px-5 py-3 text-[14px] cursor-pointer hover:bg-[#FFF4ED] dark:hover:bg-[#F6810C]/10 transition-colors flex items-center select-none"
                  >
                    <div className="flex items-center gap-3 w-full">
                      {isSelected ? (
                        <div className="w-5 h-5 bg-[#F6810C] rounded-[4px] flex items-center justify-center select-none flex-shrink-0 animate-in zoom-in-50 duration-75">
                          <Check size={12} className="text-white" />
                        </div>
                      ) : (
                        <div className="w-5 h-5 border-2 border-[#CBD5E1] dark:border-slate-600 rounded-[4px] select-none flex-shrink-0" />
                      )}
                      {chap === "All Chapters" ? (
                        <span className="text-[14px] font-medium leading-none text-[#222222] dark:text-white">
                          All Chapters
                        </span>
                      ) : (
                        <div className="flex items-baseline gap-2 truncate">
                          <span className="text-[14px] font-medium leading-none text-[#222222] dark:text-white">
                            Chapter :{numStr}
                          </span>
                          <span className="text-[10px] font-medium text-[#222222]/60 dark:text-slate-400 truncate max-w-[160px] leading-none">
                            {rawTitle}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center bg-[#F1F5F9] dark:bg-[#252525] p-[4px] rounded-[12px] h-[42px] gap-[8px]">
        <button
          onClick={() => setViewMode('grid')}
          className={`flex items-center justify-center w-[34px] h-[34px] rounded-[10px] cursor-pointer transition-all ${
            viewMode === 'grid' ? 'bg-white dark:bg-[#3D3D3D] text-[#F6810C]' : 'text-[#94A3B8] hover:text-[#64748B]'
          }`}
        >
          <LayoutGrid size={18} />
        </button>
        <button
          onClick={() => setViewMode('list')}
          className={`flex items-center justify-center w-[34px] h-[34px] rounded-[10px] cursor-pointer transition-all ${
            viewMode === 'list' ? 'bg-white dark:bg-[#3D3D3D] text-[#F6810C]' : 'text-[#94A3B8] hover:text-[#64748B]'
          }`}
        >
          <List size={18} />
        </button>
      </div>
    </div>
  );
};
