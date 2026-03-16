

import React, { useState, useRef, useEffect } from 'react';
import { ImportSquare } from 'iconsax-react';
import SubmitModal from './SubmitModal'; // Ensure path is correct
import Pdficon from "../../../../../assets/Images/icon/pdfIcon.svg";
import Imgicon from "../../../../../assets/Images/icon/imgIcon.svg";
import FileIcon from "../../../../../assets/Images/icon/file.svg";
import XlIcon from "../../../../../assets/Images/icon/xl.svg";
import Docicon from "../../../../../assets/Images/icon/docIcon.svg";
import Word from "../../../../../assets/Images/icon/word.svg";
import { Trash2, X } from 'lucide-react';


/* ---------------- FILE CONFIG ---------------- */

type FileConfig = {
  icon: string;
  bg: string;
};

const FILE_TYPE_CONFIG: Record<string, FileConfig> = {
  pdf: { icon: Pdficon, bg: "bg-[#FEE2E2]" },
  doc: { icon: Docicon, bg: "bg-[#DDEBFD]" },
  docx: { icon: Word, bg: "bg-[#DDEBFD]" },
  xls: { icon: XlIcon, bg: "bg-[#CFFFE7]" },
  xlsx: { icon: XlIcon, bg: "bg-[#CFFFE7]" },
  jpg: { icon: Imgicon, bg: "bg-[#B2D2FA]" },
  jpeg: { icon: Imgicon, bg: "bg-[#B2D2FA]" },
  png: { icon: Imgicon, bg: "bg-[#B2D2FA]" },
  gif: { icon: Imgicon, bg: "bg-[#B2D2FA]" },
};

const getFileConfig = (fileName: string): FileConfig => {
  const extension = fileName.split(".").pop()?.toLowerCase() || "";
  return (
    FILE_TYPE_CONFIG[extension] || {
      icon: FileIcon,
      bg: "bg-[#FFF5D5]",
    }
  );
};

/* ---------------- TYPES ---------------- */

type UploadStatus = "Uploading" | "Completed" | "Cancelled" | "Failed";

interface UploadedFile {
  id: string;
  file: File;
  progress: number;
  status: UploadStatus;
}

/* ---------------- COMPONENT ---------------- */

const AssignmentUpload: React.FC = () => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingFileId, setEditingFileId] = useState<string | null>(null);


  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // FIXED Timeout Type (no NodeJS error)
  const uploadIntervals = useRef<Record<string, number>>({});

  const MAX_SIZE = 10 * 1024 * 1024; // 10MB

  /* ---------------- CLEANUP ---------------- */

  useEffect(() => {
    return () => {
      Object.values(uploadIntervals.current).forEach((id) =>
        clearInterval(id)
      );
    };
  }, []);

  /* ---------------- FILE SELECT ---------------- */

  const openExplorer = (id?: string): void => {
    setEditingFileId(id || null);
    fileInputRef.current?.click();
  };

  const handleFileSelect = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const selectedFiles = event.target.files;
    if (!selectedFiles) return;

    const fileList = Array.from(selectedFiles);

    if (editingFileId) {
      replaceFile(editingFileId, fileList[0]);
    } else {
      processFiles(fileList);
    }

    event.target.value = "";
  };

  /* ---------------- PROCESS FILES ---------------- */

  const processFiles = (newFiles: File[]): void => {
    newFiles.forEach((file) => {
      if (file.size > MAX_SIZE) {
        alert(`${file.name} exceeds 10MB limit.`);
        return;
      }

      const fileId = crypto.randomUUID();

      const newFileObj: UploadedFile = {
        id: fileId,
        file,
        progress: 0,
        status: "Uploading",
      };

      setFiles((prev) => [...prev, newFileObj]);
      simulateUpload(fileId);
    });
  };

  /* ---------------- REPLACE FILE ---------------- */

  const replaceFile = (id: string, newFile: File): void => {
    if (newFile.size > MAX_SIZE) {
      alert(`${newFile.name} exceeds 10MB limit.`);
      return;
    }

    setFiles((prev) =>
      prev.map((f) =>
        f.id === id
          ? { ...f, file: newFile, progress: 0, status: "Uploading" }
          : f
      )
    );

    simulateUpload(id);
    setEditingFileId(null);
  };

  /* ---------------- SIMULATE UPLOAD ---------------- */

  const simulateUpload = (id: string): void => {
    let progress = 0;

    const intervalId = window.setInterval(() => {
      progress += 10;

      setFiles((prev) =>
        prev.map((file) =>
          file.id === id ? { ...file, progress } : file
        )
      );

      if (progress >= 100) {
        clearInterval(intervalId);
        delete uploadIntervals.current[id];

        setFiles((prev) =>
          prev.map((file) =>
            file.id === id
              ? { ...file, progress: 100, status: "Completed" }
              : file
          )
        );
      }
    }, 300);

    uploadIntervals.current[id] = intervalId;
  };

  /* ---------------- CANCEL ---------------- */

  const cancelUpload = (id: string): void => {
    const intervalId = uploadIntervals.current[id];
    if (intervalId) {
      clearInterval(intervalId);
      delete uploadIntervals.current[id];
    }

    setFiles((prev) =>
      prev.map((file) =>
        file.id === id
          ? { ...file, status: "Cancelled", progress: 0 }
          : file
      )
    );
  };

  /* ---------------- REMOVE ---------------- */

  const removeFile = (id: string): void => {
    const intervalId = uploadIntervals.current[id];
    if (intervalId) {
      clearInterval(intervalId);
      delete uploadIntervals.current[id];
    }

    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  /* ---------------- SUBMIT ---------------- */

  const handleSubmit = (): void => {
    const completedFiles = files.filter(
      (f) => f.status === "Completed"
    );

    if (completedFiles.length === files.length && files.length > 0) {
      setIsModalOpen(true);
    } else {
      alert("Please wait for all uploads to complete.");
    }
  };

  /* ---------------- JSX ---------------- */

  return (
    <div className="w-full ">
      <div className="">
        <h3 className="md:text-2xl text-xl  font-medium text-[#333333] mb-5 dark:text-white">Submit Assignment</h3>

        {/* Drag & Drop Area */}
        <div
          onClick={() => openExplorer()}
          onDrop={(e) => { e.preventDefault(); processFiles(Array.from(e.dataTransfer.files)); }}
          onDragOver={(e) => e.preventDefault()}
          className="border-2 border-dashed border-gray-300 hover:border-[#F67300] rounded-[30px] p-12 flex flex-col items-center justify-center bg-white hover:bg-[#fafafa] dark:bg-[#3a3a3a] dark:hover:bg-[#4a4a4a] cursor-pointer transition-all group"
        >
          <input
            type="file"
            multiple
            ref={fileInputRef}
            onChange={handleFileSelect}
            className="hidden"
          />

          <div className="w-16 h-16 orange opacity-90 rounded-full flex items-center justify-center mb-6.5   transition-transform">
            <ImportSquare size="32"  color='#fff' />
          </div>

          <p className="text-base md:text-2xl font-medium text-[#333] dark:text-white mb-2">Upload your files</p>
          <p className="text-sm md:text-lg  text-[#626262] dark:text-gray-400 mb-2 text-center">Drag and drop files here or click to select files</p>
          <p className="text-sm md:text-base text-[#626262] dark:text-gray-400">Supported fomats: pdf, doc, doccx, txt.</p>
          <p className="text-sm md:text-base   text-[#626262] dark:text-gray-400">Maximum file size: 10MB</p>

        </div>

        {/* File Preview Section (The "Ready to Upload" List) */}
        {files.length > 0 && (
          <div className="mt-5 space-y-5 boxStyle ">
            {files.map((fileObj) => {
              const fileConfig = getFileConfig(fileObj.file.name);

              return (
                <div
                  key={fileObj.id}
                  className="group flex items-center justify-between transition-all duration-300 cursor-pointer sm:rounded-3xl rounded-[20px] gap-10 py-1 md:pr-5 pr-3 pl-1 border border-[#F2EEF4] max-w-120"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`sm:px-6.5 sm:py-5 px-4 py-3 sm:rounded-3xl rounded-[20px] ${fileConfig.bg}`}
                    >
                      <img
                        src={fileConfig.icon}
                        alt="file icon"
                        className="min-w-6 min-h-7"
                      />
                    </div>

                    <div className="max-w-md">
                      <h4 className="text-sm md:text-lg text-[#4D4D4D] dark:text-gray-300 group-hover:text-[#333] transition-colors truncate max-w-45">
                        {fileObj.file.name}
                      </h4>

                      <div className="flex items-center gap-5">
                        <p className="text-xs md:text-base text-[#808080] dark:text-gray-400 mt-1">
                          {(fileObj.file.size / (1024 * 1024)).toFixed(1)} MB
                        </p>

                        {fileObj.status === 'Uploading' && (
                          <div className="max-w-full ">
                            <p className="text-xs text-gray-400 mb-1">Uploading...</p>
                            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-[#F67300] transition-all duration-300"
                                style={{ width: `${fileObj.progress}%` }}
                              />
                            </div>
                          </div>
                        )}

                        {fileObj.status === 'Completed' && (
                          <p className="text-xs md:text-base text-[#3EA465] dark:text-[#3EA465]">
                            Ready to submit
                          </p>
                        )}

                        {fileObj.status === 'Cancelled' && (
                          <p className="text-xs md:text-base text-red-500">
                            Cancelled
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3">
                    {fileObj.status === 'Uploading' && (
                      <button
                        onClick={() => cancelUpload(fileObj.id)}
                        className="text-[#626262] hover:text-red-500 transition-colors cursor-pointer"
                      >
                        <X />
                      </button>
                    )}

                    {fileObj.status !== 'Uploading' && (
                      <button
                        onClick={() => removeFile(fileObj.id)}
                        className="text-[#626262] hover:text-red-500 transition-colors cursor-pointer"
                      >
                        <Trash2 size="20" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {/* Submit Button */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={
              files.length === 0 ||
              files.some((f) => f.status === "Uploading")
            }
            className={` w-45 py-2.5 rounded-2xl text-white! text-sm font-semibold transition-all tracking-wider
               ${files.length === 0 ||
                files.some((f) => f.status === "Uploading")
                ? "opacity-50 cursor-not-allowed orange"
                : "orange hover:opacity-90 cursor-pointer"
              }
              `}
          >
            {files.some((f) => f.status === "Uploading")
              ? "Uploading..."
              : "Submit Assignment"}
          </button>
        </div>
      </div>

      {/* MODAL INTEGRATION */}
      <SubmitModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>



  );
};

export default AssignmentUpload;