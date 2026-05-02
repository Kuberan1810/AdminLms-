import React from 'react';
import { ChevronRight, Share2, FileText, Cpu, Terminal, File as FileIcon, FileQuestion } from 'lucide-react';
import { FilterBar } from './section/FilterBar';
import { ChapterSection } from './section/ChapterSection';
import { UploadModal } from './section/UploadModal';

const UploadedContent = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedChapter, setSelectedChapter] = React.useState<number | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const [selectedType, setSelectedType] = React.useState("Notes");

  const [contentTypeFilter, setContentTypeFilter] = React.useState<string[]>(["All"]);
  const [chapterFilter, setChapterFilter] = React.useState<string[]>(["All Chapters"]);
  const [isContentTypeOpen, setIsContentTypeOpen] = React.useState(false);
  const [isChaptersOpen, setIsChaptersOpen] = React.useState(false);
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('list');
  const [openMenuFileId, setOpenMenuFileId] = React.useState<number | null>(null);

  React.useEffect(() => {
    const handleGlobalClick = () => {
      setIsContentTypeOpen(false);
      setIsChaptersOpen(false);
      setOpenMenuFileId(null);
    };
    window.addEventListener('click', handleGlobalClick);
    return () => window.removeEventListener('click', handleGlobalClick);
  }, []);

  const [file, setFile] = React.useState<File | null>(null);
  const [fileName, setFileName] = React.useState("");

  const openModal = (chapterId: number) => {
    setSelectedChapter(chapterId);
    setIsModalOpen(true);
    setFile(null);
    setFileName("");
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedChapter(null);
    setIsDropdownOpen(false);
    setFile(null);
    setFileName("");
  };

  const deleteFile = (chapterId: number, fileId: number) => {
    setChapters(prevChapters => prevChapters.map(ch => {
      if (ch.id === chapterId) {
        return {
          ...ch,
          fileCount: ch.fileCount - 1,
          files: ch.files.filter(f => f.id !== fileId)
        };
      }
      return ch;
    }));
    setOpenMenuFileId(null);
  };

  const handleDownload = (e: React.MouseEvent, fileName: string) => {
    e.stopPropagation();
    const link = document.createElement("a");
    link.href = "data:text/plain;charset=utf-8," + encodeURIComponent(`Content of ${fileName}`);
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const [chapters, setChapters] = React.useState([
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
  ]);

  const filteredChapters = chapters
    .map((chapter) => {
      const filteredFiles = chapter.files.filter((file) => {
        const matchesType =
          contentTypeFilter.includes("All") ||
          contentTypeFilter.some(filter => filter.toLowerCase() === file.category.toLowerCase());
        return matchesType;
      });

      const matchesChapter =
        chapterFilter.includes("All Chapters") || chapterFilter.includes(chapter.title);

      if (!matchesChapter) return null;

      return {
        ...chapter,
        files: filteredFiles,
        fileCount: filteredFiles.length,
      };
    })
    .filter(Boolean) as typeof chapters;

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

      <FilterBar
        contentTypeFilter={contentTypeFilter}
        setContentTypeFilter={setContentTypeFilter}
        chapterFilter={chapterFilter}
        setChapterFilter={setChapterFilter}
        isContentTypeOpen={isContentTypeOpen}
        setIsContentTypeOpen={setIsContentTypeOpen}
        isChaptersOpen={isChaptersOpen}
        setIsChaptersOpen={setIsChaptersOpen}
        viewMode={viewMode}
        setViewMode={setViewMode}
        chapters={chapters}
      />

      <ChapterSection
        filteredChapters={filteredChapters}
        viewMode={viewMode}
        openModal={openModal}
        openMenuFileId={openMenuFileId}
        setOpenMenuFileId={setOpenMenuFileId}
        deleteFile={deleteFile}
        handleDownload={handleDownload}
      />

      <UploadModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        fileName={fileName}
        setFileName={setFileName}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        isDropdownOpen={isDropdownOpen}
        setIsDropdownOpen={setIsDropdownOpen}
        file={file}
        setFile={setFile}
        selectedChapter={selectedChapter}
        setChapters={setChapters}
      />
    </div>
  );
};

export default UploadedContent;
