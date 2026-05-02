import React from 'react';
import { FileText, CheckCircle, Mail, FileCheck } from 'lucide-react';
import { DocumentUpload } from "iconsax-react";
import type { Student } from '../mockData';

interface Props {
  student: Student;
}

const RecentActivitySection = ({ student }: Props) => {
  const activities = student.recentActivity || [];

  const getIcon = (type: string) => {
    switch (type) {
      case 'file': return <DocumentUpload size={18} color="currentColor" />;
      case 'check': return <CheckCircle size={18} />;
      case 'mail': return <Mail size={18} />;
      case 'exam': return <FileCheck size={18} />;
      default: return <FileText size={18} />;
    }
  };

  return (
    <div className="boxStyle">
      <h2 className="text-[18px] font-semibold text-[#333333] dark:text-white mb-8">Recent Activity</h2>

      <div className="flex flex-col gap-[40px]">
        {activities.length > 0 ? (
          activities.map((item, index) => {
            const isLast = index === activities.length - 1;

            return (
              <div key={index} className="flex items-center gap-6">

                <div className="relative w-[36px] h-[36px] shrink-0">
                  {!isLast && (
                    <div className="absolute top-[36px] left-[17px] w-[2px] h-[44px] bg-[#F1F5F9] dark:bg-[#3B3B3B] z-0" />
                  )}

                  <div className="absolute inset-0 rounded-full bg-[#F8FAFC] dark:bg-[#333333] flex items-center justify-center z-10 text-[#94A3B8]">
                    {getIcon(item.iconType)}
                  </div>
                </div>

                <div className="flex-1 flex justify-between items-center">
                  <div>
                    <p className="text-[14px] font-medium text-[#333333] dark:text-white leading-tight">{item.title}</p>
                    <p className="text-[12px] text-[#94A3B8] mt-1">{item.subtitle}</p>
                  </div>
                  <span className="text-[12px] text-[#94A3B8] font-normal whitespace-nowrap">{item.time}</span>
                </div>

              </div>
            );
          })
        ) : (
          <div className="text-center text-[#94A3B8] py-4 text-sm font-medium">No recent activity found</div>
        )}
      </div>
    </div>
  );
};

export default RecentActivitySection;
