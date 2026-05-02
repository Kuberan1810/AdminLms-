import React, { useRef, useState } from 'react';
import { CloudPlus } from 'iconsax-react';
import { CloudUploadIcon } from 'lucide-react';

const UploadSection = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full lg:w-[750px] bg-white dark:bg-[#242424] p-6 shadow-[0px_8px_32px_0px_rgba(53,44,85,0.04)] border border-gray-100 dark:border-[#3B3B3B]">
      <div className="flex items-center gap-2 mb-6">
        <CloudPlus size={20} color="currentColor" className="text-[#00355F]" />
        <h2 className="text-[16px] font-normal text-[#1E3A8A] dark:text-white">Bulk Upload Service</h2>
      </div>

      <div
        onClick={triggerFileSelect}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-[10px] p-12 flex flex-col items-center justify-center text-center space-y-4 cursor-pointer transition-all ${isDragging ? 'border-[#F67300] bg-orange-50/10' : 'border-[#000000] dark:border-[#3B3B3B]'}`}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept=".pdf,.doc,.docx,.txt"
        />
        <div className="w-[70px] h-[70px] bg-[#F6810C] rounded-full flex items-center justify-center shadow-lg shadow-orange-200 dark:shadow-none">
          <CloudUploadIcon className="text-white" size={28} color="currentColor" />
        </div>
        <div className="space-y-1">
          <h3 className="text-[24px] font-medium text-gray-900 dark:text-white">
            {selectedFile ? selectedFile.name : 'Upload Certificate file'}
          </h3>
          {selectedFile ? (
            <p className="text-[#F67300] font-medium text-sm">File selected successfully. Click to change.</p>
          ) : (
            <>
              <p className="text-[20px] text-[#626262] dark:text-gray-400">Drag and drop files here or click to select files</p>
              <p className="text-[20px] text-[#626262]">Supported formats: pdf, doc, docx, txt.</p>
              <p className="text-[20px] text-[#626262]">Maximum file size: 10MB</p>
            </>
          )}
        </div>
      </div>

      {selectedFile && (
        <div className="mt-6 flex justify-end">
          <button
            onClick={() => {
              alert(`Uploading ${selectedFile.name}...`);
              setSelectedFile(null);
            }}
            className="px-6 py-2 bg-[#F67300] text-white rounded-xl font-semibold hover:bg-[#e66a00] transition-colors"
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default UploadSection;
