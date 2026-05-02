import React from 'react';
import { FileText, CheckCircle, Mail, FileCheck } from 'lucide-react';
import { DocumentUpload } from "iconsax-react"
import type { InstructorData } from '../../../../../../data/InstructorMockData';

interface Props {
  instructor: InstructorData;
}

const RecentActivitySection = ({ instructor }: Props) => {
  const activities = instructor.recentActivity && instructor.recentActivity.length > 0
    ? instructor.recentActivity
    : [
      { type: '', title: 'Submitted Agents (LangChain, CrewAI, AutoGen).pdf', batch: 'AM101-B01', timeAgo: '10 mins ago' },
      { type: 'assignment', title: 'Assignment created', batch: 'AM101-B04', timeAgo: '30 mins ago' },
      { type: 'reply', title: 'Replied to student query', batch: 'AM101-B01', timeAgo: '1 hour ago' },
      { type: 'upload', title: 'Uploaded Test', batch: 'Q1103-B01', timeAgo: '1 hour ago' },
    ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'upload': return <DocumentUpload size={18} color='currentColor' />;
      case 'assignment': return <CheckCircle size={18} />;
      case 'reply': return <Mail size={18} />;
      default: return <FileText size={18} />;
    }
  };

  return (
    <div className="boxStyle">
      <h2 className="md:text-xl text-lg font-semibold text-[#0B1C30]  dark:text-white mb-8">Recent Activity</h2>

      <div className="flex flex-col gap-[40px]">
        {activities.map((item, index) => {
          const isLast = index === activities.length - 1;

          return (
            <div key={index} className="flex items-center gap-6">

              <div className="relative w-[36px] h-[36px] shrink-0">
                {!isLast && (
                  <div className="absolute top-[36px] left-[17px] w-[2px] h-[44px] bg-[#F1F5F9] dark:bg-[#3B3B3B] z-0" />
                )}

                <div className="absolute inset-0 rounded-full bg-[#F8FAFC] dark:bg-[#333333] dark:border-[#242424] flex items-center justify-center z-10 text-[#94A3B8]">
                  {getIcon(item.type)}
                </div>
              </div>

              <div className="flex-1 flex justify-between items-center">
                <div>
                  <p className="text-[12px] md:text-[14px] font-medium text-[#333] dark:text-white leading-tight">{item.title}</p>
                  <p className="text-[10px] md:text-[12px] text-[#94A3B8] mt-1">{item.batch}</p>
                </div>
                <span className="text-[10px] md:text-[12px] text-[#94A3B8] whitespace-nowrap">{item.timeAgo}</span>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentActivitySection;
