import React from 'react';
import {
  Search,
  Bell,
  Settings,
  ChevronRight,
  Share2,
  Filter,
  LayoutGrid,
  List,
  MoreVertical,
  FileText,
  Download,
  Plus,
  FileCode,
  FolderOpen,
  ChevronDown,
  ListFilter,
  FileQuestion,
  Terminal,
  Cpu,
  X,
  FileUp,
  File as FileIcon
} from 'lucide-react';

const UploadedContent = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedChapter, setSelectedChapter] = React.useState<number | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const [selectedType, setSelectedType] = React.useState("Notes");

  const openModal = (chapterId: number) => {
    setSelectedChapter(chapterId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedChapter(null);
    setIsDropdownOpen(false);
  };
  const chapters = [
    {
      id: 1,
      title: "Chapter 1: Intro to AI",
      fileCount: 4,
      files: [
        {
          id: 1,
          name: "Lec1_Notes.pdf",
          type: "PDF",
          category: "NOTES",
          size: "2.4 MB",
          date: "Uploaded Jan 12, 2026",
          color: "bg-[#FFF4ED] text-[#F6810C]",
          icon: <FileText size={20} />
        },
        {
          id: 2,
          name: "Intro_Assignment_1.docx",
          type: "DOCX",
          category: "ASSIGNMENT",
          size: "450 KB",
          date: "Uploaded Jan 22, 2026",
          color: "bg-[#FAF5FF] text-[#9333EA]",
          icon: <FileIcon size={20} />
        },
        {
          id: 3,
          name: "Weekly_Quiz_1.pdf",
          type: "PDF",
          category: "TESTS",
          size: "1.1 MB",
          date: "Uploaded Jan 28, 2026",
          color: "bg-[#FEF2F2] text-[#DC2626]",
          icon: <FileQuestion size={20} />
        }
      ]
    },
    {
      id: 2,
      title: "Chapter 2: Machine Learning Foundations",
      fileCount: 2,
      files: [
        {
          id: 4,
          name: "ML_Algorithms_.pdf",
          type: "PDF",
          category: "NOTES",
          size: "8.2 MB",
          date: "Uploaded Nov 02, 2023",
          color: "bg-[#FFF4ED] text-[#F6810C]",
          badgeColor: "bg-[#EFF6FF] text-[#2563EB]",
          icon: <Cpu size={20} />
        },
        {
          id: 5,
          name: "Python_Basics_Labs.zip",
          type: "ZIP",
          category: "LABS",
          size: "15.4 MB",
          date: "Uploaded Nov 05, 2023",
          color: "bg-[#F3FAF7] text-[#057A55]",
          icon: <Terminal size={20} />
        }
      ]
    }
  ];

  return (
    <div className="p-8 bg-white dark:bg-slate-900 min-h-screen font-['Urbanist'] transition-colors duration-300">

      {/* ── Breadcrumbs & Uploaded Content Title ── */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <div className="flex items-center gap-2 text-[13px] text-[#94A3B8] mb-2">
            <span className="cursor-pointer hover:underline">Classes</span>
            <ChevronRight size={14} />
            <span className="text-[#F6810C] cursor-pointer hover:underline">AM101-B01</span>
          </div>
          <h2 className="text-[24px] font-medium text-[#222222] dark:text-white leading-[32px] font-['Urbanist']">Uploaded Content</h2>
        </div>
        <button className="flex items-center gap-2 bg-[#F6810C] text-white px-5 py-2.5 rounded-xl text-[14px] font-bold hover:opacity-90 transition-all cursor-pointer">
          <Share2 size={18} />
          Share Library
        </button>
      </div>

      {/* ── Filters ── */}
      <div className="flex justify-between items-center mb-8 bg-white dark:bg-[#2D2D2D] p-4 rounded-2xl border border-[#F1F5F9] dark:border-[#3B3B3B]">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-[20px] py-[10px] bg-[#FBFCFD] dark:bg-[#383838] border border-[#E8EDF3] dark:border-[#4A4A4A] rounded-[13px] cursor-pointer">
            <ListFilter size={16} className="text-[#64748B] dark:text-slate-400" />
            <span className="text-[14px] font-medium text-[#222222] dark:text-slate-200 leading-none font-['Urbanist']">Content Type: All</span>
            <ChevronDown size={14} className="text-[#94A3B8] dark:text-slate-400" />
          </div>
          <div className="flex items-center gap-2 px-[20px] py-[10px] bg-[#FBFCFD] dark:bg-[#383838] border border-[#E8EDF3] dark:border-[#4A4A4A] rounded-[13px] cursor-pointer">
            <FolderOpen size={16} className="text-[#64748B] dark:text-slate-400" />
            <span className="text-[14px] font-medium text-[#222222] dark:text-slate-200 leading-none font-['Urbanist']">All Chapters</span>
            <ChevronDown size={14} className="text-[#94A3B8] dark:text-slate-400" />
          </div>
        </div>
        <div className="flex items-center bg-[#F1F5F9] dark:bg-[#252525] p-[4px] rounded-[12px] h-[42px] gap-[8px]">
          <button className="flex items-center justify-center w-[34px] h-[34px] bg-white dark:bg-[#3D3D3D] rounded-[10px] text-[#F6810C] cursor-pointer">
            <LayoutGrid size={18} />
          </button>
          <button className="flex items-center justify-center w-[34px] h-[34px] text-[#94A3B8] hover:text-[#64748B] dark:hover:text-slate-200 cursor-pointer">
            <List size={18} />
          </button>
        </div>
      </div>

      {/* ── Chapters ── */}
      <div className="space-y-10">
        {chapters.map(chapter => (
          <div key={chapter.id}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1.5 h-8 bg-[#F6810C] rounded-full"></div>
              <h3 className="text-[20px] font-semibold text-[#0B1C30] dark:text-white leading-[28px] font-['Urbanist']">{chapter.title}</h3>
              <span className="px-3 py-1 bg-[#F1F5F9] text-[#64748B] text-[11px] font-bold rounded-lg uppercase tracking-wider">
                {chapter.fileCount} FILES
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {chapter.files.map(file => (
                <div key={file.id} className="bg-white rounded-3xl border border-[#F1F5F9] p-5 transition-all group cursor-pointer">
                  <div className="flex justify-between items-start mb-6">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${file.color}`}>
                      {file.icon}
                    </div>
                    <button className="p-1 text-[#CBD5E1] hover:text-[#64748B] cursor-pointer">
                      <MoreVertical size={20} />
                    </button>
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
                    <button className="w-8 h-8 rounded-[8px] bg-[#FFF7ED] dark:bg-[#FFF7ED]/10 text-[#F6810C] flex items-center justify-center hover:bg-[#F6810C] hover:text-white transition-colors cursor-pointer">
                      <Download size={14} />
                    </button>
                  </div>
                </div>
              ))}

              {/* Add Card */}
              <div
                onClick={() => openModal(chapter.id)}
                className="bg-white/40 border-2 border-dashed border-[#E2E8F0] rounded-3xl p-5 flex flex-col items-center justify-center min-h-[200px] cursor-pointer hover:bg-white hover:border-[#F6810C]/50 transition-all group"
              >
                <div className="w-12 h-12 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#94A3B8] group-hover:bg-[#FFF4ED] group-hover:text-[#F6810C] group-hover:border-[#F6810C]/20 transition-all mb-4">
                  <Plus size={24} />
                </div>
                <p className="text-[14px] font-medium text-[#64748B] group-hover:text-[#F6810C] transition-all">Add to Chapter {chapter.id}</p>
              </div>

              {/* ── Upload Modal ── */}
              {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-white/30 backdrop-blur-[4px] animate-in fade-in duration-200">
                  <div className="bg-white dark:bg-slate-900 w-full max-w-[560px] rounded-[32px] border border-[#F1F5F9] dark:border-slate-800 overflow-hidden animate-in zoom-in-95 duration-200">
                    {/* Modal Header */}
                    <div className="px-8 py-6 flex justify-between items-center border-b border-[#F1F5F9] dark:border-slate-800">
                      <h3 className="text-[16px] font-normal text-[#0B1C30] dark:text-white leading-[24px] font-['Urbanist']">Upload New Content</h3>
                      <button
                        onClick={closeModal}
                        className="p-2 text-[#94A3B8] hover:text-[#64748B] hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors cursor-pointer"
                      >
                        <X size={20} />
                      </button>
                    </div>

                    {/* Modal Body */}
                    <div className="p-8 space-y-6">
                      {/* File Name Field */}
                      <div>
                        <label className="block text-[16px] font-normal text-[#0B1C30] dark:text-slate-200 mb-2 font-['Urbanist'] leading-[24px]">File Name</label>
                        <input
                          type="text"
                          placeholder="e.g. Deep Learning Syllabus"
                          className="w-full px-5 py-3.5 bg-white dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 rounded-2xl text-[14px] text-[#0F172A] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#F6810C]/20 focus:border-[#F6810C] transition-all font-['Urbanist']"
                        />
                      </div>

                      {/* Content Type Field */}
                      <div>
                        <label className="block text-[16px] font-normal text-[#0B1C30] dark:text-slate-200 mb-2 font-['Urbanist'] leading-[24px]">Content Type</label>
                        <div className="relative">
                          <div
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="w-full px-5 py-3.5 bg-white dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 rounded-2xl text-[14px] text-[#0F172A] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#F6810C]/20 focus:border-[#F6810C] transition-all font-['Urbanist'] flex justify-between items-center cursor-pointer select-none"
                          >
                            <span>{selectedType}</span>
                            <ChevronDown className={`text-[#94A3B8] transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} size={18} />
                          </div>

                          {isDropdownOpen && (
                            <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 rounded-2xl py-2 shadow-xl z-50 animate-in fade-in zoom-in-95 duration-150 font-['Urbanist']">
                              {["Notes", "Assignment", "Tests", "Labs"].map((type) => (
                                <div
                                  key={type}
                                  onClick={() => {
                                    setSelectedType(type);
                                    setIsDropdownOpen(false);
                                  }}
                                  className={`px-5 py-3 text-[14px] cursor-pointer hover:bg-[#FFF4ED] dark:hover:bg-[#F6810C]/10 hover:text-[#F6810C] dark:hover:text-[#F6810C] transition-colors ${
                                    selectedType === type ? 'text-[#F6810C] font-semibold bg-[#FFF4ED] dark:bg-[#F6810C]/10' : 'text-[#0F172A] dark:text-slate-200'
                                  }`}
                                >
                                  {type}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Dropzone */}
                      <div className="border-2 border-dashed border-[#E2E8F0] dark:border-slate-700 rounded-[24px] p-10 flex flex-col items-center justify-center bg-white dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 transition-colors cursor-pointer group">
                        <div className="w-16 h-16 rounded-full bg-white dark:bg-slate-700 border border-[#F1F5F9] dark:border-slate-800 flex items-center justify-center text-[#94A3B8] group-hover:text-[#F6810C] transition-colors mb-4">
                          <FileUp size={32} />
                        </div>
                        <p className="text-[16px] text-[#0B1C30] dark:text-white font-normal mb-1 font-['Urbanist'] leading-[24px]">
                          Drag & Drop files or <span className="text-[#F6810C] cursor-pointer hover:underline leading-none">Browse</span>
                        </p>
                        <p className="text-[13px] text-[#94A3B8] font-['Urbanist']">PDF, MP4, or ZIP files up to 100MB</p>
                      </div>
                    </div>

                    {/* Modal Footer */}
                    <div className="px-8 py-6 bg-white dark:bg-slate-800/50 flex justify-end items-center gap-4 border-t border-[#F1F5F9] dark:border-slate-800">
                      <button
                        onClick={closeModal}
                        className="px-6 py-2.5 text-[14px] font-semibold text-[#64748B] hover:text-[#0B1C30] dark:text-slate-400 dark:hover:text-white transition-colors cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button className="px-8 py-2.5 bg-[#F6810C] text-white rounded-2xl text-[14px] font-bold hover:bg-[#E6770B] transition-all cursor-pointer">
                        Upload
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default UploadedContent;
