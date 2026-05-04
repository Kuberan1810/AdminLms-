import React, { useState } from 'react';
import { X, Camera, User } from 'lucide-react';
import { Edit2 } from 'iconsax-react';

interface AddStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (student: any) => void;
}

const AddStudentModal: React.FC<AddStudentModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    studentId: '',
    avatar: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(formData);
    onClose();
  };

  return (
    <div
      className={`fixed  inset-0 z-[100] flex justify-end bg-black/40 backdrop-blur-sm transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      onClick={onClose}
    >
      <div
        className={`bg-white dark:bg-[#1E1E1E] w-full max-w-[550px] h-full shadow-2xl transition-transform duration-500 ease-out transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-8 border-b border-gray-100 dark:border-[#2A2A2A]">
          <h2 className="text-[24px] font-bold text-[#222222] dark:text-white">Add New Student</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-[#2A2A2A] rounded-full transition-colors cursor-pointer"
          >
            <X size={24} className="text-[#626262] dark:text-[#A3A3A3]" />
          </button>
        </div>

        <div className="h-[calc(100vh-180px)] overflow-y-auto custom-scrollbar">
          <form onSubmit={handleSubmit} className="px-8 py-10">
            {/* Profile Picture Upload */}
            <div className="flex flex-col items-center mb-12">
              <div className="relative group">
                <div className="w-[120px] h-[120px] rounded-full border-2 border-dashed border-[#F67300]/30 dark:border-[#F67300]/20 flex items-center justify-center bg-[#FFF8F3] dark:bg-[#2A2A2A] overflow-hidden transition-all group-hover:border-[#F67300]">
                  {formData.avatar ? (
                    <img src={formData.avatar} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <Camera size={40} className="text-[#F67300]/40" />
                      <span className="text-[12px] font-medium text-[#F67300]/60">Upload</span>
                    </div>
                  )}
                </div>
                <label className="absolute bottom-1 right-1 w-[36px] h-[36px] bg-[#F67300] rounded-full flex items-center justify-center border-2 border-white dark:border-[#1E1E1E] cursor-pointer hover:bg-[#e06900] transition-all shadow-lg transform hover:scale-110">
                  <Edit2 size={18} color="white" variant="Bold" />
                  <input type="file" className="hidden" accept="image/*" />
                </label>
              </div>
              <p className="mt-4 text-[14px] font-semibold text-[#333333] dark:text-[#A3A3A3]">Profile Picture</p>
            </div>

            {/* Personal Information Section */}
            <div className="space-y-8">
              <div className="flex items-center gap-3">
                <User size={20} color='currentColor' className='text-[#F6810C]' />
                <h3 className="text-[18px] font-bold text-[#F6810C] dark:text-white uppercase tracking-tight">Personal Information</h3>
              </div>

              <div className="space-y-6">
                {/* Full Name */}
                <div className="space-y-2">
                  <label className="text-[14px] font-bold text-[#333333] dark:text-[#A3A3A3] ml-1 pb-2">Full Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Dr. Sarah Jenkins"
                    className="w-full px-5 py-4 mt-3 bg-white dark:bg-[#242424] border border-[#94A3B8]/10 focus:bg-white dark:focus:bg-[#242424] focus:border-[#F67300] rounded-[16px] text-[15px] font-medium transition-all  focus:ring-[#F67300]/10 placeholder:text-[#9CA3AF] dark:text-white"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                {/* Email Address */}
                <div className="space-y-2">
                  <label className="text-[14px] font-bold text-[#333333] dark:text-[#A3A3A3] ml-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="sarah.j@institution.edu"
                    className="w-full px-5 py-4 bg-white mt-3 dark:bg-[#242424] border border-[#94A3B8]/10 focus:bg-white dark:focus:bg-[#242424] focus:border-[#F67300] rounded-[16px] text-[15px] font-medium transition-all  focus:ring-[#F67300] placeholder:text-[#9CA3AF] dark:text-white"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                {/* Phone Number */}
                <div className="space-y-2">
                  <label className="text-[14px] font-bold text-[#333333] dark:text-[#A3A3A3] ml-1">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-5 py-4 bg-white mt-3 dark:bg-[#242424] border border-[#94A3B8]/10 focus:bg-white dark:focus:bg-[#242424] focus:border-[#F67300] rounded-[16px] text-[15px] font-medium transition-all  focus:ring-[#F67300]/10 placeholder:text-[#9CA3AF] dark:text-white"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                {/* Student ID */}
                <div className="space-y-2 mb-10">
                  <label className="text-[14px] font-bold text-[#333333] dark:text-[#A3A3A3] ml-1">Student ID</label>
                  <input
                    type="text"
                    placeholder="IN1202061"
                    className="w-full px-5 py-4 bg-white mt-3 dark:bg-[#242424] border border-[#94A3B8]/10 focus:bg-white dark:focus:bg-[#242424] focus:border-[#F67300] rounded-[16px] text-[15px] font-medium transition-all  focus:ring-[#F67300]/10 placeholder:text-[#9CA3AF] dark:text-white"
                    value={formData.studentId}
                    onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Action Buttons */}
        <div className="absolute bottom-0 left-0 right-0 p-8 bg-white dark:bg-[#1E1E1E] border-t border-gray-100 dark:border-[#2A2A2A] flex items-center gap-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-4 text-[16px] font-semibold border-[#F2EEF4] border text-[#626262] dark:text-[#A3A3A3] hover:bg-gray-50 dark:hover:bg-[#2A2A2A] rounded-[16px] transition-all cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            type="submit"
            className="flex-1 py-4 bg-[#F67300] text-white rounded-[16px] text-[16px] font-semibold  hover:bg-[#e06900] transition-all transform active:scale-95 cursor-pointer"
          >
            Add Student
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddStudentModal;
