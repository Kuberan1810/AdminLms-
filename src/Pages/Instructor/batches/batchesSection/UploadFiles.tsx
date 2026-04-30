import React, { useRef, useState } from "react";
import { UploadCloud, Trash2, Pencil, ArrowLeft } from "lucide-react";
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
            className="border-2 border-dashed border-gray-300 hover:border-[#F67300] rounded-[30px] p-12 flex flex-col items-center justify-center bg-white hover:bg-[#fafafa] dark:bg-[#3a3a3a] dark:hover:bg-[#4a4a4a] cursor-pointer transition-all group"
          >
            <div className="w-16 h-16 orange opacity-90 rounded-full flex items-center justify-center mb-6 transition-transform group-hover:scale-105">
              <UploadCloud size={32} className="text-white" />
            </div>
            <p className="text-base md:text-2xl font-medium text-[#333] dark:text-white mb-2">Upload your files</p>
            <p className="text-sm md:text-lg text-[#626262] dark:text-gray-400 mb-2 text-center">Drag and drop files here or click to select files</p>
            <p className="text-sm md:text-base text-[#626262] dark:text-gray-400">Supported formats: pdf, doc, docx, txt</p>
            <p className="text-sm md:text-base text-[#626262] dark:text-gray-400">Maximum file size: 10MB</p>
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
          <div className="mt-5 space-y-5">
            {/* Existing Resources */}
            {existingResources.map((res) => (
              <div
                key={res.id}
                className="group flex items-center justify-between transition-all duration-300 sm:rounded-3xl rounded-[20px] gap-10 py-1 md:pr-5 pr-3 pl-1 border border-[#F2EEF4]"
              >
                <div className="flex items-center gap-4">
                  <div className="sm:px-6.5 sm:py-5 px-4 py-3 sm:rounded-3xl rounded-[20px] bg-[#FEE2E2]">
                    <span className="text-xs font-bold uppercase text-red-600">PDF</span>
                  </div>
                  <div className="max-w-md">
                    <h4 className="text-sm md:text-lg text-[#4D4D4D] dark:text-gray-300 truncate max-w-45">{res.name}</h4>
                    <div className="flex items-center gap-5">
                      <p className="text-xs md:text-base text-[#808080] dark:text-gray-400 mt-1">{res.size}</p>
                      <p className="text-xs md:text-base text-[#3EA465]">Uploaded ✓</p>
                    </div>
                  </div>
                </div>
                <button onClick={() => handleDeleteExisting(res.id)} className="text-[#626262] hover:text-red-500 transition-colors cursor-pointer">
                  <Trash2 size={20} />
                </button>
              </div>
            ))}

            {/* New Uploads */}
            {files.map((f) => {
              const ext = f.file.name.split('.').pop()?.toLowerCase() || '';
              const isPdf = ext === 'pdf';
              const isDoc = ['doc','docx'].includes(ext);
              const isXl = ['xls','xlsx'].includes(ext);
              const iconBg = isPdf ? 'bg-[#FEE2E2]' : isDoc ? 'bg-[#DDEBFD]' : isXl ? 'bg-[#CFFFE7]' : 'bg-[#FFF5D5]';
              const iconColor = isPdf ? 'text-red-600' : isDoc ? 'text-blue-500' : isXl ? 'text-green-600' : 'text-yellow-600';
              return (
                <div
                  key={f.id}
                  className="group flex items-center justify-between transition-all duration-300 sm:rounded-3xl rounded-[20px] gap-10 py-1 md:pr-5 pr-3 pl-1 border border-[#F2EEF4]"
                >
                  <div className="flex items-center gap-4">
                    <div className={`sm:px-6.5 sm:py-5 px-4 py-3 sm:rounded-3xl rounded-[20px] ${iconBg}`}>
                      <span className={`text-xs font-bold uppercase ${iconColor}`}>{ext || 'FILE'}</span>
                    </div>
                    <div className="max-w-md">
                      <h4 className="text-sm md:text-lg text-[#4D4D4D] dark:text-gray-300 truncate max-w-45">{f.file.name}</h4>
                      <div className="flex items-center gap-5">
                        <p className="text-xs md:text-base text-[#808080] dark:text-gray-400 mt-1">{formatSize(f.file.size)}</p>
                        {f.status === 'uploading' && (
                          <div className="max-w-full">
                            <p className="text-xs text-gray-400 mb-1">Uploading...</p>
                            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                              <div className="h-full bg-[#F67300] transition-all duration-300" style={{ width: `${f.progress}%` }} />
                            </div>
                          </div>
                        )}
                        {f.status === 'done' && (
                          <p className="text-xs md:text-base text-[#3EA465]">Ready ✓</p>
                        )}
                      </div>
                    </div>
                  </div>
                  <button onClick={() => handleDelete(f.id)} className="text-[#626262] hover:text-red-500 transition-colors cursor-pointer">
                    <Trash2 size={20} />
                  </button>
                </div>
              );
            })}
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
