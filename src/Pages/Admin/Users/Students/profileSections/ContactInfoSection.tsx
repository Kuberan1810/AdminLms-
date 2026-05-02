import React from 'react';
import { Mail, Phone, Calendar } from 'lucide-react';
import { DocumentText1 } from 'iconsax-react';

const ContactInfoSection = () => {
  return (
    <div className="bg-white dark:bg-[#242424] rounded-[28px] p-6 shadow-[0px_8px_32px_0px_rgba(53,44,85,0.04)] dark:shadow-none dark:border dark:border-[#3B3B3B]">
      <h2 className="text-[24px] font-medium text-[#222222] dark:text-white mb-6">Contact Information</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="flex items-start gap-4">
          <div className="w-[35px] h-[35px] rounded-[26px] bg-[#DCE7FF] text-[#653AF8] flex items-center justify-center shrink-0">
            <Mail size={18} />
          </div>
          <div>
            <p className="text-[16px] text-[#8C8C8C] dark:text-[#A3A3A3]">Email</p>
            <p className="text-[16px] font-medium text-[#000000] dark:text-white mt-1 break-all">Student@gmail.com</p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <div className="w-[35px] h-[35px] rounded-[26px] bg-[#DCE7FF] text-[#653AF8] flex items-center justify-center shrink-0">
            <Phone size={18} />
          </div>
          <div>
            <p className="text-[16px] text-[#8C8C8C] dark:text-[#A3A3A3]">Phone</p>
            <p className="text-[16px] font-medium text-[#000000] dark:text-white mt-1">+91 8976543278</p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <div className="w-[35px] h-[35px] rounded-[26px] bg-[#DCE7FF] text-[#653AF8] flex items-center justify-center shrink-0">
            <Calendar size={18} />
          </div>
          <div>
            <p className="text-[16px] text-[#8C8C8C] dark:text-[#A3A3A3]">Joined</p>
            <p className="text-[16px] font-medium text-[#000000] dark:text-white mt-1">Jan 22, 2026</p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <div className="w-[35px] h-[35px] rounded-[26px] bg-[#DCE7FF] text-[#653AF8] flex items-center justify-center shrink-0">
            <DocumentText1 size={18} color="currentColor" />
          </div>
          <div>
            <p className="text-[16px] text-[#8C8C8C] dark:text-[#A3A3A3]">Enrolled Course</p>
            <p className="text-[16px] font-medium text-[#000000] dark:text-white mt-1">Quantum Intelligence</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfoSection;
