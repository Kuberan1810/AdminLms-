  import React, { useState } from 'react';
import { Edit2, UserX } from 'lucide-react';
import { Danger } from 'iconsax-react';
import type { Student } from '../mockData';

interface Props {
  student: Student;
  onEdit?: () => void;
  onDeactivate?: () => void;
}

const ProfileHeaderSection = ({ student, onEdit, onDeactivate }: Props) => {
  const [isDeactivateModalOpen, setIsDeactivateModalOpen] = useState(false);

  return (
    <>
      <div className="boxStyle flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <img src={student.avatar} alt="Profile" className="w-[80px] h-[80px] rounded-full object-cover" />
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-[20px] font-semibold text-[#333333] dark:text-white">{student.name}</h1>
              <span className={`px-3 py-1 rounded-full text-[12px] font-regular ${
                student.status === 'Active' ? 'bg-[#047C2E]/10 text-[#047C2E] dark:bg-green-500/10 dark:text-green-400' :
                student.status === 'Leave' ? 'bg-[#F6810C]/10 text-[#F6810C] dark:bg-orange-500/10 dark:text-orange-400' :
                student.status === 'Pending' ? 'bg-[#3111E8]/10 text-[#3111E8] dark:bg-purple-500/10 dark:text-purple-400' :
                student.status === 'Dropped' ? 'bg-[#EA1115]/10 text-[#EA1115] dark:bg-red-500/10 dark:text-red-400' :
                student.status === 'Deactivated' ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' :
                'bg-gray-100 text-gray-600'
              }`}>
                {student.status}
              </span>
            </div>
            <p className="md:text-[16px] text-sm text-[#626262] dark:text-[#A3A3A3] mt-1">ID: {student.id}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={onEdit}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#F6810C] text-white rounded-[8px] text-[12px] font-medium hover:bg-[#e06900] transition-colors cursor-pointer"
          >
            <Edit2 size={16} />
            Edit Profile
          </button>
          <button 
            onClick={() => setIsDeactivateModalOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 border border-[#EA1115] text-[#F1351B] rounded-[8px] text-[12px] font-medium hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors cursor-pointer"
          >
            <UserX size={16} />
            Deactivate
          </button>
        </div>
      </div>

      {isDeactivateModalOpen && (
        <div className="fixed h-full inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#2A2A2A] rounded-[24px] w-full max-w-md overflow-hidden shadow-2xl flex flex-col animate-in zoom-in-95 duration-200">
            <div className="p-8 pb-6 flex flex-col items-center text-center">
              
              <div className="w-[80px] h-[80px] rounded-full bg-[#EA1115]/5 flex items-center justify-center mb-6">
                <Danger size={48} variant="Bold" color="#EA1115" />
              </div>
              
              <h3 className="text-[20px] font-semibold text-[#0B1C30] dark:text-white mb-3">
                Deactivate Student Account?
              </h3>
              
              <p className="text-[14px] text-[#626262] dark:text-[#A3A3A3] leading-relaxed mb-8">
                Are you sure you want to deactivate <span className="font-bold text-[#0B1C30] dark:text-white">{student.name}'s</span> account? This will restrict their access to the LMS portal and course materials. This action can be undone by an administrator later.
              </p>

              {/* Profile Box */}
              <div className="w-full bg-[#FFFBF8] dark:bg-[#333] border border-[#FFF0E5] dark:border-[#3B3B3B] rounded-[16px] p-4 flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <img src={student.avatar} alt="Profile" className="w-[40px] h-[40px] rounded-full object-cover" />
                  <div className="text-left">
                    <p className="text-[14px] font-semibold text-[#0B1C30] dark:text-white leading-tight">{student.name}</p>
                    <p className="text-[12px] text-[#626262] dark:text-[#A3A3A3] mt-0.5">ID: {student.id}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-[12px] font-medium ${
                  student.status === 'Active' ? 'bg-[#047C2E]/10 text-[#047C2E] dark:bg-green-500/10 dark:text-green-400' :
                  student.status === 'Leave' ? 'bg-[#F6810C]/10 text-[#F6810C] dark:bg-orange-500/10 dark:text-orange-400' :
                  student.status === 'Pending' ? 'bg-[#3111E8]/10 text-[#3111E8] dark:bg-purple-500/10 dark:text-purple-400' :
                  student.status === 'Dropped' ? 'bg-[#EA1115]/10 text-[#EA1115] dark:bg-red-500/10 dark:text-red-400' :
                  'bg-gray-100 text-gray-600'
                }`}>
                  {student.status}
                </span>
              </div>

              {/* Buttons */}
              <div className="w-full flex items-center gap-4">
                <button 
                  onClick={() => setIsDeactivateModalOpen(false)}
                  className="flex-1 py-3.5 border border-[#E5E7EB] dark:border-[#3B3B3B] rounded-[12px] text-[14px] font-semibold text-[#0B1C30] dark:text-white hover:bg-gray-50 dark:hover:bg-[#333] transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    onDeactivate?.();
                    setIsDeactivateModalOpen(false);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-[#B91C1C] text-white rounded-[12px] text-[14px] font-semibold hover:bg-[#991B1B] transition-colors cursor-pointer"
                >
                  <UserX size={18} />
                  Deactivate Account
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="w-full bg-[#D3E4FE]/30 dark:bg-[#242424] py-5 text-center border-t border-[#F2EEF4] dark:border-[#3B3B3B]">
              <p className="text-[12px] text-[#626262] dark:text-[#A3A3A3]">
                Access records and academic history will be preserved.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileHeaderSection;
