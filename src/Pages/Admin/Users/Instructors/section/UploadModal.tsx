import React from 'react';
import {
  X,
  ChevronDown,
  FileUp,
  FileText,
  File as FileIcon,
  FileQuestion,
  Terminal
} from 'lucide-react';

interface UploadModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
  fileName: string;
  setFileName: React.Dispatch<React.SetStateAction<string>>;
  selectedType: string;
  setSelectedType: React.Dispatch<React.SetStateAction<string>>;
  isDropdownOpen: boolean;
  setIsDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
  file: File | null;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  selectedChapter: number | null;
  setChapters: React.Dispatch<React.SetStateAction<any[]>>;
}

export const UploadModal: React.FC<UploadModalProps> = ({
  isModalOpen,
  closeModal,
  fileName,
  setFileName,
  selectedType,
  setSelectedType,
  isDropdownOpen,
  setIsDropdownOpen,
  file,
  setFile,
  selectedChapter,
  setChapters,
}) => {
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/15 backdrop-blur-[2px] animate-in fade-in duration-200">
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
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
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

          {/* Hidden Input File */}
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                const f = e.target.files[0];
                setFile(f);
                if (!fileName) setFileName(f.name);
              }
            }}
          />

          {/* Dropzone */}
          <div
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                const f = e.dataTransfer.files[0];
                setFile(f);
                if (!fileName) setFileName(f.name);
              }
            }}
            className="border-2 border-dashed border-[#E2E8F0] dark:border-slate-700 rounded-[24px] p-8 flex flex-col items-center justify-center bg-white dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 transition-colors cursor-pointer group"
          >
            <div className="w-16 h-16 rounded-full bg-[#FFF4ED] dark:bg-[#FFF4ED]/10 border border-[#FFE2CD] dark:border-[#F6810C]/20 flex items-center justify-center text-[#F6810C] mb-4">
              <FileUp size={32} />
            </div>
            {file ? (
              <div className="text-center">
                <p className="text-[16px] text-[#F6810C] font-semibold mb-1 font-['Urbanist'] leading-[24px]">
                  {file.name}
                </p>
                <p className="text-[13px] text-[#94A3B8] font-['Urbanist']">
                  {(file.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
            ) : (
              <>
                <p className="text-[16px] text-[#0B1C30] dark:text-white font-normal mb-1 font-['Urbanist'] leading-[24px]">
                  Drag & Drop files or <span className="text-[#F6810C] cursor-pointer hover:underline leading-none">Browse</span>
                </p>
                <p className="text-[13px] text-[#94A3B8] font-['Urbanist']">PDF, MP4, or ZIP files up to 100MB</p>
              </>
            )}
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
          <button
            onClick={() => {
              if (!fileName) return;
              const selectedTypeUpper = selectedType.toUpperCase();
              const newFile = {
                id: Date.now(),
                name: fileName,
                type: file ? file.name.split('.').pop()?.toUpperCase() || "PDF" : "PDF",
                category: selectedTypeUpper,
                size: file ? `${(file.size / (1024 * 1024)).toFixed(1)} MB` : "1.2 MB",
                date: `Uploaded ${new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}`,
                color: selectedTypeUpper === "ASSIGNMENT" 
                  ? "bg-[#FAF5FF] text-[#9333EA]" 
                  : selectedTypeUpper === "TESTS"
                    ? "bg-[#FEF2F2] text-[#DC2626]"
                    : selectedTypeUpper === "LABS"
                      ? "bg-[#F3FAF7] text-[#057A55]"
                      : "bg-[#FFF4ED] text-[#F6810C]",
                icon: selectedTypeUpper === "ASSIGNMENT"
                  ? <FileIcon size={20} />
                  : selectedTypeUpper === "TESTS"
                    ? <FileQuestion size={20} />
                    : selectedTypeUpper === "LABS"
                      ? <Terminal size={20} />
                      : <FileText size={20} />
              };

              setChapters(prevChapters => prevChapters.map(ch => {
                if (ch.id === selectedChapter) {
                  return {
                    ...ch,
                    fileCount: ch.fileCount + 1,
                    files: [...ch.files, newFile]
                  };
                }
                return ch;
              }));

              closeModal();
            }}
            className="px-8 py-2.5 bg-[#F6810C] text-white rounded-2xl text-[14px] font-bold hover:bg-[#E6770B] transition-all cursor-pointer"
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};
