import React, { useRef, useState } from "react";
import { UploadCloud, Trash2, FileText, Pencil, ArrowLeft } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { addResource, updateChapter, removeResource } from "../../../../store/slices/ResourcesSlice";
import { useParams } from "react-router-dom";

type FileItem = {
  id: string;
  file: File;
  progress: number;
  status: "uploading" | "done";
};

const ClassResources: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const { chapterId } = useParams<{ chapterId: string }>();

  const { chapters, resources } = useAppSelector((state) => state.resource);

  const [files, setFiles] = useState<FileItem[]>([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Initial state from Redux store
  const chapter = chapterId ? chapters.byId[chapterId] : null;

  // Local state
  const [title, setTitle] = useState(chapter?.title || "Chapter Title");
  const [classContent, setClassContent] = useState(chapter?.classContent || "");
  const [keyTopics, setKeyTopics] = useState(chapter?.keyTopics?.join("\n") || "");

  // Sync with store when chapter data is available/updates
  React.useEffect(() => {
    if (chapter) {
      setTitle(chapter.title);
      setClassContent(chapter.classContent || "");
      setKeyTopics(chapter.keyTopics?.join("\n") || "");
    }
  }, [chapter]);

  const existingResources = chapter
    ? chapter.resourceIds.map((id) => resources.byId[id]).filter(Boolean)
    : [];

  /* ---------------- Upload Logic ---------------- */

  const simulateUpload = (id: string) => {
    let progress = 0;

    const interval = setInterval(() => {
      progress += 10;

      setFiles((prev) =>
        prev.map((f) =>
          f.id === id ? { ...f, progress, status: progress === 100 ? "done" : "uploading" } : f
        )
      );

      if (progress >= 100) clearInterval(interval);
    }, 150);
  };

  const handleFiles = (selected: FileList | null) => {
    if (!selected) return;

    const newFiles: FileItem[] = [];

    Array.from(selected).forEach((file) => {
      const id = crypto.randomUUID();

      newFiles.push({
        id,
        file,
        progress: 0,
        status: "uploading",
      });

      simulateUpload(id);
    });

    setFiles((prev) => [...prev, ...newFiles]);
  };

  const handleDelete = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const handleDeleteExisting = (resourceId: string) => {
    if (chapterId) {
      dispatch(removeResource({ resourceId, chapterId }));
    }
  };

  /* ---------------- Drag Events ---------------- */

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const formatSize = (size: number) => {
    return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="min-h-screen p-4 sm:p-8 bg-gray-50 dark:bg-[#1E1E1E] transition-colors">
      <div className="mx-auto bg-white dark:bg-[#2A2A2A] rounded-2xl pt-3 sm:p-8 space-y-8 transition-colors border border-transparent dark:border-[#363636]">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div
            className="flex items-center justify-center cursor-pointer bg-white dark:bg-[#1E1E1E] border border-[#F2EEF4] dark:border-[#363636] hover:bg-gray-50 dark:hover:bg-[#252525] p-2 rounded-xl transition-all shadow-sm"
            onClick={() => window.history.back()}
          >
            <ArrowLeft size={20} className="text-[#333333] dark:text-white" />
          </div>
          <div className="flex items-center gap-2 flex-1">
            <textarea
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                e.target.style.height = 'auto';
                e.target.style.height = e.target.scrollHeight + 'px';
              }}
              // Initial resize on mount/render if needed can be handled via ref, 
              // but for now onInput covers typing. We'll set a ref to trigger it on mount if possible or just let it flow.
              // Actually, simply using rows={1} and the onInput hack is standard.
              ref={(ref) => {
                if (ref) {
                  ref.style.height = 'auto';
                  ref.style.height = ref.scrollHeight + 'px';
                }
              }}
              className="text-xl font-semibold bg-transparent border-none focus:outline-none focus:ring-0 p-0 m-0 w-full resize-none overflow-hidden dark:text-white"
              placeholder="Chapter Title"
              rows={1}
            />
            <Pencil size={18} className="text-gray-400 dark:text-gray-500 cursor-pointer shrink-0" />
          </div>
        </div>

        {/* Class Content */}
        <div className="rounded-xl ">
          <h2 className="font-semibold mb-3 dark:text-white">Class Content:</h2>

          <textarea
            value={classContent}
            onChange={(e) => setClassContent(e.target.value)}
            className="w-full bg-white dark:bg-[#1E1E1E] rounded-lg p-4 text-sm text-gray-700 dark:text-gray-200 border border-[#DEDEDE] dark:border-[#363636] min-h-[100px] focus:outline-none focus:border-orange-500 placeholder-gray-400 dark:placeholder-gray-600 resize-none transition-colors"
            placeholder="Enter class content description..."
          />
        </div>

        {/* Key Topics */}
        <div className="rounded-xl ">
          <h2 className="font-semibold mb-3 dark:text-white">Key Topics:</h2>

          <textarea
            value={keyTopics}
            onChange={(e) => setKeyTopics(e.target.value)}
            className="w-full bg-white dark:bg-[#1E1E1E] rounded-lg p-4 text-sm text-gray-700 dark:text-gray-200 border border-[#DEDEDE] dark:border-[#363636] min-h-[100px] focus:outline-none focus:border-orange-500 placeholder-gray-400 dark:placeholder-gray-600 resize-none transition-colors"
          />
        </div>

        {/* Resources */}
        <div className="rounded-xl ">
          <h2 className="font-semibold mb-5 dark:text-white">Resources</h2>

          {/* Upload Box */}
          <div
            onDrop={onDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => inputRef.current?.click()}
            className="border-2 border-dashed border-[#000000] dark:border-[#4B4B4B] rounded-xl py-10 sm:py-14 px-4 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 dark:hover:bg-[#1E1E1E] transition"
          >
            <div className="w-14 h-14 bg-[#F67300] rounded-full flex items-center justify-center mb-4 shadow-sm">
              <UploadCloud size={28} className="text-white" />
            </div>

            <p className="font-medium text-lg dark:text-white">Upload Material</p>

            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Drag and drop files here or click to select files
            </p>

            <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
              Supported formats: pdf, doc, docx, txt • Maximum size 10MB
            </p>

            <input
              ref={inputRef}
              type="file"
              multiple
              className="hidden"
              accept=".pdf,.doc,.docx,.txt"
              onChange={(e) => handleFiles(e.target.files)}
            />
          </div>

          {/* File List */}
          <div className="mt-6 space-y-3">
            {/* Existing Resources */}
            {existingResources.map((res) => (
              <div
                key={res.id}
                className="bg-gray-50 dark:bg-[#1E1E1E] rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3 transition-colors"
              >
                <div className="shrink-0">
                  <FileText className="text-red-500" />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate dark:text-white">{res.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{res.size}</p>
                  <p className="text-xs text-green-600 mt-1">Uploaded</p>
                </div>

                <div className="shrink-0 self-start sm:self-auto">
                  <Trash2
                    size={18}
                    onClick={() => handleDeleteExisting(res.id)}
                    className="text-gray-500 hover:text-red-500 cursor-pointer"
                  />
                </div>
              </div>
            ))}

            {/* New Uploads */}
            {files.map((f) => (
              <div
                key={f.id}
                className="bg-gray-50 dark:bg-[#1E1E1E] rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3 transition-colors"
              >
                <div className="shrink-0">
                  <FileText className="text-red-500" />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate dark:text-white">{f.file.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{formatSize(f.file.size)}</p>

                  {f.status === "uploading" && (
                    <div className="h-2 bg-gray-200 rounded mt-2 overflow-hidden">
                      <div
                        className="h-2 bg-orange-500 transition-all"
                        style={{ width: `${f.progress}%` }}
                      />
                    </div>
                  )}

                  {f.status === "done" && (
                    <p className="text-xs text-green-600 mt-1">Ready to submit</p>
                  )}
                </div>

                <div className="shrink-0 self-start sm:self-auto">
                  <Trash2
                    size={18}
                    onClick={() => handleDelete(f.id)}
                    className="text-gray-500 hover:text-red-500 cursor-pointer"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Button */}
        <div className="flex justify-end">
          <button
            onClick={() => {
              if (chapterId) {
                // Update Chapter Details (Title, Class Content & Key Topics)
                const topicsArray = keyTopics
                  .split('\n')
                  .map(t => t.trim())
                  .filter(Boolean);

                dispatch(updateChapter({
                  id: chapterId,
                  title: title,
                  classContent: classContent,
                  keyTopics: topicsArray
                }));

                // Add Resources
                files.forEach((file) => {
                  dispatch(addResource({
                    id: crypto.randomUUID(),
                    name: file.file.name,
                    url: URL.createObjectURL(file.file),
                    chapterId,
                    size: formatSize(file.file.size)
                  }));
                });
                setShowSuccessModal(true);
              }
            }}
            className="px-6 py-2 bg-[#F67300] text-white rounded-lg hover:bg-orange-700 transition cursor-pointer"
          >
            Create
          </button>
        </div>

        {/* Success Modal */}
        {showSuccessModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl p-6 w-[320px] shadow-xl border border-transparent dark:border-[#363636]">
              <h3 className="text-lg font-semibold mb-4 dark:text-white">Success</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Contents are uploaded successfully</p>
              <div className="flex justify-end">
                <button
                  onClick={() => setShowSuccessModal(false)}
                  className="px-4 py-2 bg-[#F67300] text-white rounded-lg cursor-pointer hover:bg-orange-600"
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClassResources;
