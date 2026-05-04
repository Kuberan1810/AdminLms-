import React from 'react';
import { Profile2User, Flag, Teacher, Calendar } from 'iconsax-react';
import { studentStats } from '../mockData';

const StatsSection = () => {
  const stats = [
    {
      label: "Total Students",
      value: studentStats.totalStudents,
      subtitle: "Enrolled Students",
      icon: Profile2User,
      iconColor: "text-[#F6810C]",
      bgColor: "bg-[#FFF4EB]",
    },
    {
      label: "Active Students",
      value: studentStats.activeStudents,
      subtitle: "Currently Active",
      icon: Flag,
      iconColor: "text-[#22C55E]",
      bgColor: "bg-[#E8F8F0]",
    },
    {
      label: "Graduated",
      value: studentStats.graduated,
      subtitle: "Completed course",
      icon: Teacher,
      iconColor: "text-[#EF4444]",
      bgColor: "bg-[#FEE2E2]",
    },
    {
      label: "Avg. Attendance",
      value: studentStats.avgAttendance,
      growth: studentStats.attendanceTrend,
      icon: Calendar,
      iconColor: "text-[#7036E0]",
      bgColor: "bg-[#7036E0]/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="boxStyle transition-all relative overflow-hidden"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`w-10 h-10 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
              <stat.icon className={stat.iconColor} size={20} variant="Outline" color="currentColor" />
            </div>
            {stat.growth && (
              <span className="bg-[#E8F8F0] text-[#22C55E] text-[10px] font-bold px-2 py-0.5 rounded-full">
                {stat.growth}
              </span>
            )}
          </div>
          <div>
            <p className="text-sm md:text-base font-medium text-[#767676] dark:text-[#A3A3A3] mb-1">{stat.label}</p>
            <div className="flex gap-2 items-center mt-2">
              <h3 className="text-2xl md:text-3xl font-bold text-[#333333] dark:text-white mb-1">{stat.value}</h3>
              {stat.subtitle && (
                <p className="text-[12px] text-[#767676] dark:text-[#A3A3A3] font-medium">{stat.subtitle}</p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsSection;
