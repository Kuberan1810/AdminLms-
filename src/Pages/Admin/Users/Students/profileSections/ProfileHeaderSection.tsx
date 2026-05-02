import React from 'react';
import { ArrowLeft, Edit2, UserX } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { mockStudents } from '../mockData';

const ProfileHeaderSection = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const student = mockStudents.find(s => s.id === id) || mockStudents[0];

  return (
    <div className="bg-white dark:bg-[#242424] rounded-2xl p-6 shadow-[0px_8px_32px_0px_rgba(53,44,85,0.04)] dark:shadow-none dark:border dark:border-[#3B3B3B] flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="p-2 mr-2 text-[#888888] hover:text-[#333333] hover:bg-gray-100 dark:hover:bg-[#333333] rounded-full transition-colors hidden md:block cursor-pointer"
        >
          <ArrowLeft size={20} />
        </button>
        <img src={student.avatar} alt="Profile" className="w-[80px] h-[80px] rounded-full object-cover" />
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-[20px] font-bold text-[#333333] dark:text-white">{student.name}</h1>
            <span className="bg-[#047C2E]/10 text-[#047C2E] dark:bg-green-500/10 dark:text-green-400 px-3 py-1 rounded-[10px] text-[12px] font-medium">
              {student.status}
            </span>
          </div>
          <p className="text-[16px] text-[#333333] dark:text-[#A3A3A3] mt-1">ID: {student.id}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="flex items-center gap-2 px-5 py-2.5 bg-[#F6810C] text-white rounded-[8px] text-[12px] font-medium hover:bg-[#e06900] transition-colors cursor-pointer">
          <Edit2 size={16} />
          Edit Profile
        </button>
        <button className="flex items-center gap-2 px-5 py-2.5 border border-[#EA1115] text-[#F1351B] rounded-[8px] text-[12px] font-medium hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors cursor-pointer">
          <UserX size={16} />
          Deactivate
        </button>
      </div>
    </div>
  );
};

export default ProfileHeaderSection;
