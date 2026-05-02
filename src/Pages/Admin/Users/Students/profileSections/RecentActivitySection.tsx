import React from 'react';
import { FileText, CheckCircle, Mail, FileCheck } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { mockStudents } from '../mockData';

const RecentActivitySection = () => {
  const { id } = useParams();
  const student = mockStudents.find(s => s.id === id) || mockStudents[0];
  const activities = student.recentActivity || [];

  const getIcon = (type: string) => {
    switch (type) {
      case 'file': return FileText;
      case 'check': return CheckCircle;
      case 'mail': return Mail;
      case 'exam': return FileCheck;
      default: return FileText;
    }
  };

  return (
    <div className="boxStyle">
      <h2 className="text-[24px] font-medium text-[#222222] dark:text-white mb-8">Recent Activity</h2>

      <div className="flex flex-col gap-[40px] ml-1">
        {activities.length > 0 ? (
          activities.map((item, index) => {
            const isLast = index === activities.length - 1;
            const Icon = getIcon(item.iconType);

            return (
              <div key={index} className="flex items-center gap-6 relative">

                <div className="relative w-[36px] h-[36px] shrink-0">
                  {!isLast && (
                    <div className="absolute top-[36px] left-1/2 -translate-x-1/2 w-[1px] h-[40px] bg-[#E5E5E5] dark:bg-[#3B3B3B] z-0" />
                  )}

                  <div className="absolute inset-0 rounded-full bg-[#F1F5F9] dark:bg-[#333333] flex items-center justify-center z-10">
                    <Icon size={18} className="text-[#94A3B8] dark:text-[#A3A3A3]" />
                  </div>
                </div>

                <div className="flex-1 flex justify-between items-center">
                  <div className="flex flex-col">
                    <p className="text-[14px] font-medium text-[#222222] dark:text-white leading-tight">{item.title}</p>
                    <p className="text-[12px] text-[#94A3B8] mt-1">{item.subtitle}</p>
                  </div>
                  <span className="text-[12px] text-[#94A3B8] font-normal whitespace-nowrap">{item.time}</span>
                </div>

              </div>
            );
          })
        ) : (
          <div className="text-center text-[#94A3B8] py-4">No recent activity</div>
        )}
      </div>
    </div>
  );
};

export default RecentActivitySection;
