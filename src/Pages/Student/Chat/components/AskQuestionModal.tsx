import React, { useState } from "react";
import { createPortal } from "react-dom";
import { Lock, Globe, X, Paperclip } from "lucide-react";

interface AskQuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: {
    title: string;
    question: string;
    privacy: "private" | "public";
    file?: File | null;
  }) => void;
}

const AskQuestionModal: React.FC<AskQuestionModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [step, setStep] = useState<"details" | "privacy">("details");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = (privacy: "private" | "public") => {
    onSubmit?.({
      title: title,
      question: description,
      privacy,
      file: selectedFile,
    });

    setTitle("");
    setDescription("");
    setSelectedFile(null);
    setStep("details");
    onClose();
  };

  return createPortal(
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center px-4 z-[100]"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative transition-all duration-300 ${
          step === "details"
            ? "w-[800px] rounded-[20px] p-7 bg-[#FFFBFB] dark:bg-[#020817] text-gray-800 dark:text-gray-100 border border-gray-200 dark:border-[#334155]"
            : "w-[420px] rounded-[20px] p-4 bg-white dark:bg-[#020817] text-gray-800"
        }`}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 cursor-pointer"
        >
          <X />
        </button>

        {/* ================= STEP 1 ================= */}
        {step === "details" ? (
          <>
            <h2 className="text-lg mb-4">
              Title or summary
            </h2>

            <input
              type="text"
              placeholder="What is orchestration"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full h-[50px] bg-gray-100 dark:bg-[#1E293B] border border-gray-200 dark:border-[#334155] rounded-2xl px-4 mb-5 focus:outline-none focus:ring-1 focus:ring-orange-500"
            />

            <h3 className="text-md mb-2">
              Detail about the question
            </h3>

            <div className="border border-gray-200 dark:border-[#334155] rounded-2xl bg-gray-100 dark:bg-[#1E293B] p-4 mb-6">

              {/* File Upload */}
              <div className="flex items-center gap-3 mb-3">
                <label className="cursor-pointer">
                  <Paperclip className="w-5 h-5 text-gray-600 dark:text-gray-300 hover:text-orange-500"/>
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>

                {selectedFile && (
                  <span className="text-sm text-gray-700 dark:text-gray-300 truncate">
                    {selectedFile.name}
                  </span>
                )}
              </div>

              <hr className="border-b border-gray-200 dark:border-[#334155]" />

              <textarea
                placeholder="Description about the question..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full h-[80px] bg-transparent resize-none focus:outline-none"
              />
            </div>

            <button
              disabled={!title || !description}
              onClick={() => setStep("privacy")}
              className="w-full h-[50px] bg-[#F67300] text-white rounded-lg font-medium cursor-pointer"
            >
              Publish
            </button>
          </>
        ) : (
          /* ================= STEP 2 ================= */
          <>
            <h2 className="text-lg font-semibold text-center mb-6">
              How would you like to send this question?
            </h2>

            <div className="flex flex-col gap-4">

              {/* Private */}
              <div
                onClick={() => handleSubmit("private")}
                className="flex items-center gap-4 p-4 border border-gray-200 dark:border-[#334155] rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-[#1E293B]"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  <Lock className="w-5 h-5 text-blue-600 dark:text-blue-300" />
                </div>
                <div>
                  <h3 className="font-medium">
                    Send as private question
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Only instructor can see this
                  </p>
                </div>
              </div>

              {/* Public */}
              <div
                onClick={() => handleSubmit("public")}
                className="flex items-center gap-4 p-4 border border-gray-200 dark:border-[#334155] rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-[#1E293B]"
              >
                <div className="w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-900 flex items-center justify-center">
                  <Globe className="w-5 h-5 text-orange-600 dark:text-orange-300" />
                </div>
                <div>
                  <h3 className="font-medium">
                    Send as public question
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    All students can see this
                  </p>
                </div>
              </div>

            </div>
          </>
        )}
      </div>
    </div>,
    document.body
  );
};

export default AskQuestionModal;