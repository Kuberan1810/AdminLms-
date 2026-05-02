import React from 'react';
import { Mail, Phone, Calendar } from 'lucide-react';
import { Teacher } from 'iconsax-react';
import type { InstructorData } from '../../../../../../data/InstructorMockData';

interface Props {
  instructor: InstructorData;
}

const ContactInfoSection = ({ instructor }: Props) => {
  return (
    <div className="boxStyle">
      <h2 className="md:text-xl text-lg font-semibold text-[#0B1C30]  dark:text-white mb-6">Contact Information</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div className="flex items-start gap-4">
          <div className="w-[35px] h-[35px] rounded-[26px] bg-[#DCE7FF] text-[#653AF8] flex items-center justify-center shrink-0">
            <Mail size={18} />
          </div>
          <div>
            <p className="text-[14px] md:text-base font-medium text-[#333] dark:text-[#A3A3A3]">Email</p>
            <p className="text-[14px]  text-[#626262] dark:text-white mt-1 break-all">{instructor.email}</p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <div className="w-[35px] h-[35px] rounded-[26px] bg-[#DCE7FF] text-[#653AF8] flex items-center justify-center shrink-0">
            <Phone size={18} />
          </div>
          <div>
            <p className="text-[14px] md:text-base font-medium text-[#333] dark:text-[#A3A3A3]">Phone</p>
            <p className="text-[14px]  text-[#626262] dark:text-white mt-1 break-all">{instructor.phone}</p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <div className="w-[35px] h-[35px] rounded-[26px] bg-[#DCE7FF] text-[#653AF8] flex items-center justify-center shrink-0">
            <Calendar size={18} />
          </div>
          <div>
            <p className="text-[14px] md:text-base font-medium text-[#333] dark:text-[#A3A3A3]">Joined</p>
            <p className="text-[14px]  text-[#626262] dark:text-white mt-1 break-all">{instructor.joinedDate}</p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <div className="w-[35px] h-[35px] rounded-[26px] bg-[#DCE7FF] text-[#653AF8] flex items-center justify-center shrink-0">
            <Teacher size={18} color="currentColor" />
          </div>
          <div>
            <p className="text-[14px] md:text-base font-medium text-[#333] dark:text-[#A3A3A3]">Qualification</p>
            <p className="text-[14px]  text-[#626262] dark:text-white mt-1 break-all">{instructor.qualification}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfoSection;
