import React from 'react';
import { Mail, Phone, Calendar } from 'lucide-react';
import { DocumentText1 } from 'iconsax-react';
import { useParams } from 'react-router-dom';
import { mockStudents } from '../mockData';

const ContactInfoSection = () => {
  const { id } = useParams();
  const student = mockStudents.find(s => s.id === id) || mockStudents[0];

  return (
    <div className="boxStyle">
      <h2 className="text-[24px] font-medium text-[#222222] dark:text-white mb-6">Contact Information</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="flex items-start gap-4">
          <div className="w-[35px] h-[35px] rounded-[26px] bg-[#DCE7FF] text-[#653AF8] flex items-center justify-center shrink-0">
            <Mail size={18} />
          </div>
          <div>
            <p className="text-[16px] text-[#8C8C8C] dark:text-[#A3A3A3]">Email</p>
            <p className="text-[16px] font-medium text-[#333333] dark:text-white mt-1 break-all">{student.email}</p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <div className="w-[35px] h-[35px] rounded-[26px] bg-[#DCE7FF] text-[#653AF8] flex items-center justify-center shrink-0">
            <Phone size={18} />
          </div>
          <div>
            <p className="text-[16px] text-[#8C8C8C] dark:text-[#A3A3A3]">Phone</p>
            <p className="text-[16px] font-medium text-[#333333] dark:text-white mt-1">{student.phone}</p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <div className="w-[35px] h-[35px] rounded-[26px] bg-[#DCE7FF] text-[#653AF8] flex items-center justify-center shrink-0">
            <Calendar size={18} />
          </div>
          <div>
            <p className="text-[16px] text-[#8C8C8C] dark:text-[#A3A3A3]">Joined</p>
            <p className="text-[16px] font-medium text-[#333333] dark:text-white mt-1">{student.dateJoined}</p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <div className="w-[35px] h-[35px] rounded-[26px] bg-[#DCE7FF] text-[#653AF8] flex items-center justify-center shrink-0">
            <DocumentText1 size={18} color="currentColor" />
          </div>
          <div>
            <p className="text-[16px] text-[#8C8C8C] dark:text-[#A3A3A3]">Enrolled Course</p>
            <p className="text-[16px] font-medium text-[#333333] dark:text-white mt-1">{student.course}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfoSection;
