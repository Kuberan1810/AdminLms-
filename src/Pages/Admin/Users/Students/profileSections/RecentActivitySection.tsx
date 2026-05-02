import React from 'react';
import { FileText, CheckCircle, Mail, FileCheck } from 'lucide-react';

const timelineData = [
  {
    icon: FileText,
    title: 'Assignment Uploaded',
    subtitle: 'AM101-B01',
    time: '10 mins ago',
  },
  {
    icon: CheckCircle,
    title: 'Submitted Assignment',
    subtitle: 'AM101-B04',
    time: '30 mins ago',
  },
  {
    icon: Mail,
    title: 'Replied to query',
    subtitle: 'AM101-B01',
    time: '1 hour ago',
  },
  {
    icon: FileCheck,
    title: 'Exam result published',
    subtitle: 'Q1103-B01',
    time: '1 hour ago',
  },
];

const RecentActivitySection = () => {
  return (
    <div className="bg-white dark:bg-[#242424] rounded-[28px] p-6 shadow-[0px_8px_32px_0px_rgba(53,44,85,0.04)] dark:shadow-none dark:border dark:border-[#3B3B3B]">
      <h2 className="text-[24px] font-medium text-[#222222] dark:text-white mb-8">Recent Activity</h2>

      <div className="flex flex-col gap-[50px]">
        {timelineData.map((item, index) => {
          const isLast = index === timelineData.length - 1;
          const Icon = item.icon;

          return (
            <div key={index} className="flex items-center gap-6">

              <div className="relative w-[40px] h-[40px] shrink-0">
                {!isLast && (
                  <div className="absolute top-[40px] left-[17px] w-[2px] h-[48px] bg-[#E5E5E5] dark:bg-[#3B3B3B] z-0" />
                )}

                <div className="absolute inset-0 rounded-full bg-[#F8FAFC] dark:bg-[#333333] flex items-center justify-center z-10">
                  <Icon size={20} className="text-[#94A3B8] dark:text-[#A3A3A3]" />
                </div>
              </div>

              <div className="flex-1 flex justify-between items-center">
                <div>
                  <p className="text-[14px] font-medium text-[#222222] dark:text-white leading-tight">{item.title}</p>
                  <p className="text-[12px] text-[#94A3B8] mt-1">{item.subtitle}</p>
                </div>
                <span className="text-[12px] text-[#94A3B8] whitespace-nowrap">{item.time}</span>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentActivitySection;
