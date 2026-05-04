import React from 'react';
import { Mail, Phone, Calendar } from 'lucide-react';
import { Teacher } from 'iconsax-react';
import type { InstructorData } from '../../../../../../data/InstructorMockData';

interface Props {
  instructor: InstructorData;
}

const ContactInfoSection = ({ instructor }: Props) => {
  const contactItems = [
    {
      label: "Email Address",
      value: instructor.email,
      icon: Mail,
      iconColor: "text-[#7036E0]",
      bgColor: "bg-[#F3E8FF]",
    },
    {
      label: "Phone Number",
      value: instructor.phone,
      icon: Phone,
      iconColor: "text-[#22C55E]",
      bgColor: "bg-[#E8F8F0]",
    },
    {
      label: "Date Joined",
      value: instructor.joinedDate,
      icon: Calendar,
      iconColor: "text-[#F6810C]",
      bgColor: "bg-[#FFF4EB]",
    },
    {
      label: "Qualification",
      value: instructor.qualification,
      icon: Teacher,
      iconColor: "text-[#EF4444]",
      bgColor: "bg-[#FEE2E2]",
    },
  ];

  return (
    <div className="boxStyle">
      <h2 className="text-[18px] font-semibold text-[#333333] dark:text-white mb-6">Contact Information</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
        {contactItems.map((item, index) => (
          <div key={index} className="flex items-start gap-4">
            <div className={`w-10 h-10 rounded-xl ${item.bgColor} flex items-center justify-center shrink-0`}>
              <item.icon color='currentColor' className={item.iconColor} size={20} />
            </div>
            <div className="min-w-0">
              <p className="text-[14px] md:text-base font-semibold text-[#333] dark:text-[#A3A3A3]">{item.label}</p>
              <p className="text-[14px]  text-[#626262] dark:text-white mt-1 break-all">{item.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactInfoSection;
