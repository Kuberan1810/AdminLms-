import React from 'react';
import {
  MoreVertical,
  Pencil,
  FolderInput,
  Share2,
  Trash2,
  Download,
  Plus
} from 'lucide-react';

interface ChapterSectionProps {
  filteredChapters: any[];
  viewMode: 'grid' | 'list';
  openModal: (chapterId: number) => void;
  openMenuFileId: number | null;
  setOpenMenuFileId: React.Dispatch<React.SetStateAction<number | null>>;
  deleteFile: (chapterId: number, fileId: number) => void;
  handleDownload: (e: React.MouseEvent, fileName: string) => void;
}

export const ChapterSection: React.FC<ChapterSectionProps> = ({
  filteredChapters,
  viewMode,
  openModal,
  openMenuFileId,
  setOpenMenuFileId,
  deleteFile,
  handleDownload,
}) => {
  return (
    <div className="space-y-10">
      {filteredChapters.map(chapter => (
        <div key={chapter.id}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1.5 h-8 bg-[#F6810C] rounded-full"></div>
            <h3 className="text-[20px] font-semibold text-[#0B1C30] dark:text-white leading-[28px] font-['Urbanist']">{chapter.title}</h3>
            <span className="px-3 py-1 bg-[#F1F5F9] text-[#64748B] text-[11px] font-bold rounded-lg uppercase tracking-wider">
              {chapter.fileCount} FILES
            </span>
          </div>
          <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" : "flex flex-col gap-4"}>
            {chapter.files.map(file => (
              viewMode === 'grid' ? (
                <div key={file.id} className="bg-white rounded-3xl border border-[#F1F5F9] p-5 transition-all group cursor-pointer">
                  <div className="flex justify-between items-start mb-6 relative">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${file.color}`}>
                      {file.icon}
                    </div>
                    <div className="relative">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenMenuFileId(openMenuFileId === file.id ? null : file.id);
                        }}
                        className="p-1 text-[#CBD5E1] hover:text-[#64748B] cursor-pointer"
                      >
                        <MoreVertical size={20} />
                      </button>
                      {openMenuFileId === file.id && (
                        <div className="absolute top-full right-0 mt-2 bg-white dark:bg-slate-900 border border-[#E2E8F0] dark:border-slate-800 rounded-[16px] p-1.5 shadow-xl z-50 min-w-[195px] animate-in fade-in zoom-in-95 duration-150 select-none">
                          <div className="flex flex-col gap-0.5 font-['Urbanist']">
                            <div className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-[#FFF4ED] dark:hover:bg-[#F6810C]/10 hover:text-[#F6810C] text-[14px] font-medium leading-none text-[#222222] dark:text-slate-200 cursor-pointer transition-all group" onClick={(e) => e.stopPropagation()}>
                              <Pencil size={14} className="text-[#64748B] group-hover:text-[#F6810C] transition-colors" />
                              <span>Edit</span>
                            </div>
                            <div className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-[#FFF4ED] dark:hover:bg-[#F6810C]/10 hover:text-[#F6810C] text-[14px] font-medium leading-none text-[#222222] dark:text-slate-200 cursor-pointer transition-all group" onClick={(e) => e.stopPropagation()}>
                              <FolderInput size={14} className="text-[#64748B] group-hover:text-[#F6810C] transition-colors" />
                              <span>Move to another chapter</span>
                            </div>
                            <div className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-[#FFF4ED] dark:hover:bg-[#F6810C]/10 hover:text-[#F6810C] text-[14px] font-medium leading-none text-[#222222] dark:text-slate-200 cursor-pointer transition-all group" onClick={(e) => e.stopPropagation()}>
                              <Share2 size={14} className="text-[#64748B] group-hover:text-[#F6810C] transition-colors" />
                              <span>Share</span>
                            </div>
                            <div className="h-[1px] bg-[#E2E8F0]/60 dark:bg-slate-800/60 my-1" />
                            <div className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-600 text-[14px] font-medium leading-none text-[#222222] dark:text-slate-200 cursor-pointer transition-all group" onClick={(e) => {
                              e.stopPropagation();
                              deleteFile(chapter.id, file.id);
                            }}>
                              <Trash2 size={14} className="text-[#64748B] group-hover:text-red-500 transition-colors" />
                              <span>Delete</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <h4 className="text-[16px] font-semibold text-[#0B1C30] dark:text-white leading-[24px] font-['Urbanist'] mb-1 truncate">{file.name}</h4>
                  <div className="flex items-center gap-2 mb-6">
                    <b className={`text-[10px] font-bold px-[8px] py-[2px] rounded-[6px] uppercase tracking-[-0.25px] leading-[15px] font-['Urbanist'] ${file.badgeColor || file.color}`} style={(() => {
                      const colStr = file.badgeColor || file.color;
                      const match = colStr.match(/text-\[#([A-Fa-f0-9]+)\]/);
                      return match ? { color: `#${match[1]}` } : {};
                    })()}>
                      {file.category}
                    </b>
                    <small className="text-[12px] text-[#94A3B8] dark:text-slate-400 font-['Urbanist']">{file.size}</small>
                  </div>

                  <div className="pt-5 border-t border-[#F1F5F9] dark:border-[#3B3B3B] flex justify-between items-center">
                    <small className="text-[11px] font-medium text-[#94A3B8] dark:text-slate-400 leading-[14px] font-['Urbanist']">{file.date}</small>
                    <button onClick={(e) => handleDownload(e, file.name)} className="w-8 h-8 rounded-[8px] bg-[#FFF7ED] dark:bg-[#FFF7ED]/10 text-[#F6810C] flex items-center justify-center hover:bg-[#F6810C] hover:text-white transition-colors cursor-pointer">
                      <Download size={14} />
                    </button>
                  </div>
                </div>
              ) : (
                <div key={file.id} className="bg-white dark:bg-slate-900 rounded-2xl border border-[#F1F5F9] dark:border-slate-800 p-4 transition-all hover:border-[#F6810C]/20 flex items-center justify-between cursor-pointer group select-none">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${file.color}`}>
                      {file.icon}
                    </div>
                    <div className="flex flex-col justify-center">
                      <div className="flex items-center gap-2">
                        <h4 className="text-[15px] font-semibold text-[#0B1C30] dark:text-white leading-tight font-['Urbanist'] truncate">{file.name}</h4>
                        <b className={`text-[10px] font-bold px-[8px] py-[2px] rounded-[6px] uppercase tracking-[-0.25px] font-['Urbanist'] ${file.badgeColor || file.color}`} style={(() => {
                          const colStr = file.badgeColor || file.color;
                          const match = colStr.match(/text-\[#([A-Fa-f0-9]+)\]/);
                          return match ? { color: `#${match[1]}` } : {};
                        })()}>
                          {file.category}
                        </b>
                      </div>
                      <span className="text-[11px] font-medium text-[#94A3B8] dark:text-slate-400 font-['Urbanist'] mt-1 leading-none">{file.date}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="flex flex-col items-end gap-1 select-none leading-none">
                      <div onClick={(e) => handleDownload(e, file.name)} className="w-8 h-8 rounded-[8px] bg-[#FFF7ED] dark:bg-[#FFF7ED]/10 text-[#F6810C] flex items-center justify-center hover:bg-[#F6810C] hover:text-white transition-all cursor-pointer">
                        <Download size={14} />
                      </div>
                      <span className="text-[11px] font-semibold text-[#94A3B8] dark:text-slate-400 font-['Urbanist'] mt-0.5">{file.size}</span>
                    </div>
                    <div className="relative">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenMenuFileId(openMenuFileId === file.id ? null : file.id);
                        }}
                        className="p-1 text-[#CBD5E1] hover:text-[#64748B] dark:hover:text-slate-300 cursor-pointer"
                      >
                        <MoreVertical size={20} />
                      </button>
                      {openMenuFileId === file.id && (
                        <div className="absolute top-full right-0 mt-2 bg-white dark:bg-slate-900 border border-[#E2E8F0] dark:border-slate-800 rounded-[16px] p-1.5 shadow-xl z-50 min-w-[195px] animate-in fade-in zoom-in-95 duration-150 select-none">
                          <div className="flex flex-col gap-0.5 font-['Urbanist']">
                            <div className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-[#FFF4ED] dark:hover:bg-[#F6810C]/10 hover:text-[#F6810C] text-[14px] font-medium leading-none text-[#222222] dark:text-slate-200 cursor-pointer transition-all group" onClick={(e) => e.stopPropagation()}>
                              <Pencil size={14} className="text-[#64748B] group-hover:text-[#F6810C] transition-colors" />
                              <span>Edit</span>
                            </div>
                            <div className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-[#FFF4ED] dark:hover:bg-[#F6810C]/10 hover:text-[#F6810C] text-[14px] font-medium leading-none text-[#222222] dark:text-slate-200 cursor-pointer transition-all group" onClick={(e) => e.stopPropagation()}>
                              <FolderInput size={14} className="text-[#64748B] group-hover:text-[#F6810C] transition-colors" />
                              <span>Move to another chapter</span>
                            </div>
                            <div className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-[#FFF4ED] dark:hover:bg-[#F6810C]/10 hover:text-[#F6810C] text-[14px] font-medium leading-none text-[#222222] dark:text-slate-200 cursor-pointer transition-all group" onClick={(e) => e.stopPropagation()}>
                              <Share2 size={14} className="text-[#64748B] group-hover:text-[#F6810C] transition-colors" />
                              <span>Share</span>
                            </div>
                            <div className="h-[1px] bg-[#E2E8F0]/60 dark:bg-slate-800/60 my-1" />
                            <div className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-600 text-[14px] font-medium leading-none text-[#222222] dark:text-slate-200 cursor-pointer transition-all group" onClick={(e) => {
                              e.stopPropagation();
                              deleteFile(chapter.id, file.id);
                            }}>
                              <Trash2 size={14} className="text-[#64748B] group-hover:text-red-500 transition-colors" />
                              <span>Delete</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            ))}

            {/* Add Card */}
            {viewMode === 'grid' ? (
              <div
                onClick={() => openModal(chapter.id)}
                className="bg-white/40 border-2 border-dashed border-[#E2E8F0] rounded-3xl p-5 flex flex-col items-center justify-center min-h-[200px] cursor-pointer hover:bg-white hover:border-[#F6810C]/50 transition-all group select-none"
              >
                <div className="w-12 h-12 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#94A3B8] group-hover:bg-[#FFF4ED] group-hover:text-[#F6810C] group-hover:border-[#F6810C]/20 transition-all mb-4">
                  <Plus size={24} />
                </div>
                <p className="text-[14px] font-medium text-[#64748B] group-hover:text-[#F6810C] transition-all">Add to Chapter {chapter.id}</p>
              </div>
            ) : (
              <div
                onClick={() => openModal(chapter.id)}
                className="bg-white/40 dark:bg-slate-900/40 border-2 border-dashed border-[#E2E8F0] dark:border-slate-800 rounded-2xl p-4 flex items-center justify-center gap-3 cursor-pointer hover:bg-white dark:hover:bg-slate-800 hover:border-[#F6810C]/50 transition-all group select-none min-h-[64px]"
              >
                <Plus size={18} className="text-[#94A3B8] group-hover:text-[#F6810C] transition-all" />
                <p className="text-[14px] font-medium text-[#64748B] group-hover:text-[#F6810C] transition-all">Add to Chapter {chapter.id}</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
