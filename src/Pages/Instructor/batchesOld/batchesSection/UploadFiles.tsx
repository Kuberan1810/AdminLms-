import React, { useRef, useState } from "react";
import { UploadCloud, Trash2, FileText } from "lucide-react";
import { ArrowLeft2 } from "iconsax-react";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { addResource } from "../../../../store/slices/ResourcesSlice";
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

  const { chapters } = useAppSelector((state) => state.resource);

  const [files, setFiles] = useState<FileItem[]>([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

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
    <div className="min-h-screen p-4 sm:p-8 bg-gray-50">
      <div className="mx-auto bg-white rounded-2xl pt-3 sm:p-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 cursor-pointer" onClick={() => window.history.back()}>
          <div className="flex items-center">
            <ArrowLeft2 size={20} color="#000"/>
          </div>
          <h1 className="text-xl font-semibold">
            {chapterId ? chapters.byId[chapterId]?.title : "Upload Resources"}
          </h1>
        </div>

        {/* Class Content */}
        <div className="rounded-xl ">
          <h2 className="font-semibold mb-3">Class Content:</h2>

          <div className="bg-white rounded-lg p-4 text-sm text-gray-700 border border-[#DEDEDE] ">
            AI Agents are systems that use LLMs to plan, act, and collaborate autonomously.
            LangChain builds tool-using agents for workflows and RAG. CrewAI enables
            role-based multi-agent teamwork. AutoGen focuses on conversation-driven agents
            that interact with each other and humans to solve complex tasks.
          </div>
        </div>

        {/* Resources */}
        <div className="rounded-xl ">
          <h2 className="font-semibold mb-5">Resources</h2>

          {/* Upload Box */}
          <div
            onDrop={onDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => inputRef.current?.click()}
            className="border-2 border-dashed border-[#000000] rounded-xl py-10 sm:py-14 px-4 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition"
          >
            <UploadCloud size={36} className="text-[#F67300] mb-3" />

            <p className="font-medium">Upload Material</p>

            <p className="text-sm text-gray-500 mt-1">
              Drag and drop files here or click to select files
            </p>

            <p className="text-xs text-gray-400 mt-1">
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
            {files.map((f) => (
              <div
                key={f.id}
                className="bg-gray-50 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3"
              >
                <div className="flex-shrink-0">
                  <FileText className="text-red-500" />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{f.file.name}</p>
                  <p className="text-xs text-gray-500">{formatSize(f.file.size)}</p>

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

                <div className="flex-shrink-0 self-start sm:self-auto">
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
                files.forEach((file) => {
                  dispatch(addResource({
                    id: crypto.randomUUID(),
                    name: file.file.name,
                    url: file.file.name, // Placeholder URL
                    chapterId
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
            <div className="bg-white rounded-2xl p-6 w-[320px] shadow-xl">
              <h3 className="text-lg font-semibold mb-4">Success</h3>
              <p className="text-sm text-gray-500 mb-6">Contents are uploaded successfully</p>
              <div className="flex justify-end">
                <button
                  onClick={() => setShowSuccessModal(false)}
                  className="px-4 py-2 bg-[#F67300] text-white rounded-lg cursor-pointer"
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
