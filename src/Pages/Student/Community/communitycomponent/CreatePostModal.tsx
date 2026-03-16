import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, Upload, File, ChevronDown, Hash, Tag, Pin } from "lucide-react";
import type { Post } from "../types/post";

interface Props {
  onClose: () => void;
  onSubmit: (post: Post) => void;
}

const categories = [
  "My Post",
  "Announcement",
  "Doubts",
  "Q/A",
  "General Discussion",
];

const CreatePostModal = ({ onClose, onSubmit }: Props) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [isPinned, setIsPinned] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);

    if (selectedFile.type.startsWith("image/")) {
      setFilePreview(URL.createObjectURL(selectedFile));
    } else {
      setFilePreview(null);
    }
  };

  const handleSubmit = () => {
    if (!title || !content) return;

    const newPost: Post = {
      id: Date.now(),
      author: "You",
      role: "Student",
      time: "Just now",
      title,
      description: content,
      tag: category || "General Discussion",
      likes: 0,
      liked: false,
      saved: false,
      isMine: true,
      isInstructor: false,
      isPinned: isPinned,
      comments: [],
      file: file || undefined,
    };

    onSubmit(newPost);
    onClose();
  };

  return createPortal(
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] px-3">
      <div className="bg-white dark:bg-black text-[#333] dark:text-white w-full max-w-[420px] rounded-2xl p-4 sm:p-6 relative max-h-[95vh] overflow-y-auto">
        {/* MOBILE HEADER */}
        <div className="flex sm:hidden items-center justify-between mb-4">
          <button onClick={onClose} className="text-gray-600 font-medium dark:text-gray-400">
            Cancel
          </button>

          <h2 className="text-lg font-semibold">New Post</h2>

          <button
            onClick={handleSubmit}
            className="text-gray-400 bg-gray-100 py-1 px-2 rounded-lg"
          >
            Post
          </button>
        </div>

        {/* DESKTOP HEADER */}
        <div className="hidden sm:block">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-black"
          >
            <X size={20} />
          </button>

          <h2 className="text-xl font-semibold mb-5">
            Create New Post
          </h2>
        </div>

        {/* Title */}
        <div className="mb-4">
          <label className="text-sm font-medium">Title :</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter Post Title"
            className="w-full mt-1 bg-gray-100 dark:bg-[#1E293B] rounded-md px-3 py-2 text-sm outline-none"
          />
        </div>

        {/* Content */}
        <div className="mb-2">
          <label className="text-sm font-medium">Content :</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your Post here..."
            rows={4}
            maxLength={10000}
            className="w-full mt-1 bg-gray-100 dark:bg-[#1E293B] rounded-md px-3 py-2 text-sm outline-none resize-none"
          />
        </div>

        <div className="sm:hidden text-right text-xs text-gray-400 mb-4">
          {content.length}/10000
        </div>

        {/* Upload */}
        <div className="mb-4">
          <label className="text-sm font-medium">
            Upload files <span className="text-gray-400">(Optional)</span>
          </label>

          <input
            type="file"
            id="fileUpload"
            onChange={handleFileChange}
            className="hidden"
          />

          <label
            htmlFor="fileUpload"
            className="flex items-center justify-center gap-2 w-fit px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 cursor-pointer mt-2"
          >
            <Upload size={16} />
            Upload
          </label>

          {file && (
            <div className="mt-3 bg-gray-50 border rounded-md p-3">
              <a
                href={filePreview || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-orange-500 hover:underline"
              >
                <File size={20} />
                <span className="text-sm font-medium">{file.name}</span>
              </a>
            </div>
          )}
        </div>

        {/* MOBILE */}
        <div className="mb-6 sm:hidden flex gap-3">

          {/* PIN OPTION */}
          <div className="mb-4 flex items-center justify-between bg-gray-50 dark:bg-[#1E293B] px-4 py-3 rounded-lg">
            <div className="text-sm font-medium">Pin this post</div>

            <button
              onClick={() => setIsPinned(!isPinned)}
              className="text-gray-400 hover:text-[#FF7A00] transition"
            >
              <Pin
                size={18}
                className={
                  isPinned
                    ? "fill-[#FF7A00] text-[#FF7A00]"
                    : ""
                }
              />
            </button>
          </div>

          {/* CATEGORY */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center justify-between h-[36px] px-4 gap-2 
                         border border-gray-200 rounded-xl dark:border-[#1E293B]
                         text-sm text-orange-500 font-medium bg-white dark:bg-[#1E293B] dark:text-orange-500"
            >
              <div className="flex items-center gap-2">
                <Tag size={16} className="fill-orange-500" />
                {category ? category : "Add Category"}
              </div>

              <ChevronDown
                size={18} color="gray"
                className={`transition-transform  ${isDropdownOpen ? "rotate-180 " : ""
                  }`}
              />
            </button>

            {isDropdownOpen && (
              <div className="absolute mt-2 w-[183px] bg-white rounded-xl border border-gray-300 dark:border-[#1E293B] dark:bg-[#1E293B] z-50">
                {categories.map((cat) => (
                  <div
                    key={cat}
                    onClick={() => {
                      setCategory(cat);
                      setIsDropdownOpen(false);
                    }}
                    className={`px-4 py-3 text-sm cursor-pointer hover:bg-gray-100 ${category === cat ? "bg-gray-100 font-medium" : ""
                      }`}
                  >
                    {cat}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* TOPIC */}
          <button
            className="flex items-center gap-2 h-[36px] px-4
                       border border-gray-200 rounded-[200px] dark:border-[#1E293B]
                       text-sm text-orange-500 font-medium bg-white dark:bg-[#1E293B] dark:text-orange-500"
          >
            <Hash size={16} />
            Topic
          </button>

        </div>

        {/* DESKTOP CATEGORY */}
        <div className="hidden sm:flex flex-wrap gap-2 mt-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3 py-1 rounded-full text-sm border ${category === cat
                  ? "bg-orange-500 text-white border-orange-500"
                  : "text-gray-700 hover:border-orange-400"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Desktop Bottom Buttons */}
        <div className="hidden sm:flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-6 py-2 border rounded-md text-sm"
          >
            Discard
          </button>

          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-orange-500 text-white rounded-md text-sm hover:bg-orange-600"
          >
            Publish Post
          </button>
        </div>

      </div>
    </div>,
    document.body
  );
};

export default CreatePostModal;
