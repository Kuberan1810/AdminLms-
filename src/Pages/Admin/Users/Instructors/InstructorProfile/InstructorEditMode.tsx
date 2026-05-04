import React, { useState, useRef } from 'react';
import { User, Book1, DocumentUpload, Trash, Teacher } from 'iconsax-react';
import { Trash2 } from 'lucide-react';
import pdfIcon from '../../../../../assets/Images/icon/pdfIcon.svg';
import docIcon from '../../../../../assets/Images/icon/docIcon.svg';
import wordIcon from '../../../../../assets/Images/icon/word.svg';
import imgIcon from '../../../../../assets/Images/icon/imgIcon.svg';
import xlIcon from '../../../../../assets/Images/icon/xl.svg';
import type { InstructorData } from '../../../../../data/InstructorMockData';

interface Props {
  instructor: InstructorData;
  onCancel: () => void;
}

const FILE_TYPE_CONFIG: Record<string, { icon: string; bg: string }> = {
  pdf: { icon: pdfIcon, bg: "bg-[#FEE2E2]" },
  doc: { icon: docIcon, bg: "bg-[#DDEBFD]" },
  docx: { icon: wordIcon, bg: "bg-[#DDEBFD]" },
  xls: { icon: xlIcon, bg: "bg-[#CFFFE7]" },
  xlsx: { icon: xlIcon, bg: "bg-[#CFFFE7]" },
  jpg: { icon: imgIcon, bg: "bg-[#B2D2FA]" },
  jpeg: { icon: imgIcon, bg: "bg-[#B2D2FA]" },
  png: { icon: imgIcon, bg: "bg-[#B2D2FA]" },
};

const InstructorEditMode = ({ instructor, onCancel }: Props) => {
  const [attachments, setAttachments] = useState([
    { id: 1, name: 'UG_certificate.pdf', size: '2.4 MB', date: 'Jan 12, 2026' },
    { id: 2, name: 'Experience_Letter.pdf', size: '1.8 MB', date: 'Jan 12, 2026' },
  ]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getFileConfig = (fileName: string) => {
    const ext = fileName.split('.').pop()?.toLowerCase() || '';
    return FILE_TYPE_CONFIG[ext] || { icon: docIcon, bg: "bg-[#FFF5D5]" };
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const newFiles = Array.from(files).map((file, index) => ({
        id: Date.now() + index,
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      }));
      setAttachments([...attachments, ...newFiles]);
    }
  };

  const removeAttachment = (id: number) => {
    setAttachments(attachments.filter(attr => attr.id !== id));
  };

  return (
    <div className="w-full space-y-6 animate-in fade-in duration-300">

      {/* Header */}
      <div className="boxStyle flex flex-col md:flex-row md:items-center justify-between gap-6 p-6">
        <div className="flex items-center gap-5">
          <img src={instructor.avatar} alt="Profile" className="w-[80px] h-[80px] rounded-full object-cover" />
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-[20px] font-semibold text-[#0B1C30] dark:text-white">{instructor.name}</h1>
              <span className={`px-3 py-1 rounded-full text-[12px] font-medium ${instructor.status === 'Active' ? 'bg-[#047C2E]/10 text-[#047C2E] dark:bg-green-500/10 dark:text-green-400' :
                  instructor.status === 'Leave' ? 'bg-[#F6810C]/10 text-[#F6810C] dark:bg-orange-500/10 dark:text-orange-400' :
                    instructor.status === 'Pending' ? 'bg-[#3111E8]/10 text-[#3111E8] dark:bg-purple-500/10 dark:text-purple-400' :
                      instructor.status === 'Resigned' ? 'bg-[#EA1115]/10 text-[#EA1115] dark:bg-red-500/10 dark:text-red-400' :
                        'bg-gray-100 text-gray-600'
                }`}>
                {instructor.status}
              </span>
            </div>
            <p className="text-[14px] text-[#626262] dark:text-[#A3A3A3] mt-1">ID: {instructor.instructorId}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onCancel}
            className="px-6 py-2.5 border border-[#E5E7EB] dark:border-[#3B3B3B] rounded-[8px] text-[14px] font-semibold text-[#0B1C30] dark:text-white hover:bg-gray-50 dark:hover:bg-[#333] transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onCancel}
            className="px-6 py-2.5 bg-[#F6810C] text-white rounded-[8px] text-[14px] font-semibold hover:bg-[#e06900] transition-colors cursor-pointer"
          >
            Save Changes
          </button>
        </div>
      </div>

      {/* Personal Information */}
      <div className="boxStyle p-8">
        <div className="flex items-center gap-3 mb-6">
          <User size={20} color='currentColor' className="text-[#F6810C]" variant="Outline" />
          <h2 className="text-[16px] font-semibold text-[#0B1C30] dark:text-white">Personal Information</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          <div className="flex flex-col gap-2">
            <label className="text-[12px] text-[#626262] dark:text-[#A3A3A3] font-medium">Full Name</label>
            <input
              type="text"
              defaultValue={instructor.name}
              className="w-full px-4 py-3 border border-[#E5E7EB] dark:border-[#3B3B3B] rounded-[12px] bg-white dark:bg-[#242424] text-[14px] text-[#0B1C30] dark:text-white focus:outline-none focus:border-[#F6810C]"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[12px] text-[#626262] dark:text-[#A3A3A3] font-medium">Email Address</label>
            <input
              type="email"
              defaultValue={instructor.email}
              className="w-full px-4 py-3 border border-[#E5E7EB] dark:border-[#3B3B3B] rounded-[12px] bg-white dark:bg-[#242424] text-[14px] text-[#0B1C30] dark:text-white focus:outline-none focus:border-[#F6810C]"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[12px] text-[#626262] dark:text-[#A3A3A3] font-medium">Phone Number</label>
            <div className="relative flex items-center">
              <span className="absolute left-4 text-[14px] font-medium text-[#333333] dark:text-[#A3A3A3] border-r border-[#E5E7EB] dark:border-[#3B3B3B] pr-3">
                +91
              </span>
              <input
                type="text"
                defaultValue={instructor.phone?.replace('+91', '') || ''}
                className="w-full pl-16 pr-4 py-3 border border-[#E5E7EB] dark:border-[#3B3B3B] rounded-[12px] bg-white dark:bg-[#242424] text-[14px] text-[#0B1C30] dark:text-white focus:outline-none focus:border-[#F6810C]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Professional Information */}
      <div className="boxStyle p-8">
        <div className="flex items-center gap-3 mb-6">
          <Teacher size={20} color='currentColor' className="text-[#F6810C]" variant="Outline" />
          <h2 className="text-[16px] font-semibold text-[#0B1C30] dark:text-white">Professional Information</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-8">
          <div className="flex flex-col gap-2">
            <label className="text-[12px] text-[#626262] dark:text-[#A3A3A3] font-medium">Qualifications</label>
            <input
              type="text"
              defaultValue={instructor.qualification}
              className="w-full px-4 py-3 border border-[#E5E7EB] dark:border-[#3B3B3B] rounded-[12px] bg-white dark:bg-[#242424] text-[14px] text-[#0B1C30] dark:text-white focus:outline-none focus:border-[#F6810C]"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[12px] text-[#626262] dark:text-[#A3A3A3] font-medium">Experience (years)</label>
            <input
              type="text"
              defaultValue="3"
              className="w-full px-4 py-3 border border-[#E5E7EB] dark:border-[#3B3B3B] rounded-[12px] bg-white dark:bg-[#242424] text-[14px] text-[#0B1C30] dark:text-white focus:outline-none focus:border-[#F6810C]"
            />
          </div>
        </div>

        {/* Attachments */}
        <div className="space-y-6">
          <h3 className="text-[12px] text-[#626262] dark:text-[#A3A3A3] font-medium">Attachments</h3>

          {/* Upload Dropzone */}
          <div
            onClick={() => fileInputRef.current?.click()}
            className="w-full border-2 border-dashed border-[#E5E7EB] dark:border-[#3B3B3B] bg-[#FAFAFA] dark:bg-[#242424] rounded-[16px] py-8 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 dark:hover:bg-[#333] transition-colors group"
          >
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              multiple
              accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
              onChange={handleFileUpload}
            />
            <div className="w-[40px] h-[40px] rounded-full bg-[#FFF5F0] dark:bg-orange-500/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <DocumentUpload size={20} className="text-[#F6810C]" color='currentColor' variant="Outline" />
            </div>
            <p className="text-[14px] font-semibold text-[#0B1C30] dark:text-white mb-1">Click or drag to upload</p>
            <p className="text-[12px] text-[#A3A3A3]">PDF, PNG, JPG (Max 10MB)</p>
          </div>

          {/* File Preview Section */}
          {attachments.length > 0 && (
            <div className="mt-5 space-y-4">
              {attachments.map((file) => {
                const config = getFileConfig(file.name);
                return (
                  <div
                    key={file.id}
                    className="group flex items-center justify-between transition-all duration-300 cursor-pointer sm:rounded-3xl rounded-[20px] gap-10 py-1 md:pr-5 pr-3 pl-1 border border-[#F2EEF4] animate-in slide-in-from-top-2"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`sm:px-6.5 sm:py-5 px-4 py-3 sm:rounded-3xl rounded-[20px] ${config.bg}`}>
                        <img src={config.icon} alt="file icon" className="min-w-6 min-h-7" />
                      </div>
                      <div>
                        <h4 className="text-sm md:text-lg text-[#4D4D4D] dark:text-gray-300 truncate max-w-[200px] md:max-w-md">
                          {file.name}
                        </h4>
                        <p className="text-xs md:text-base text-[#808080] dark:text-gray-400 mt-1">
                          {file.size} <span className="ml-2">Uploaded {file.date}</span>
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); removeAttachment(file.id); }}
                      className="text-[#626262] hover:text-red-500 transition-colors cursor-pointer p-2"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>

    </div>
  );
};

export default InstructorEditMode;
