import React from 'react';
import { Profile2User, Flag, Teacher, Calendar } from 'iconsax-react';

const StatsSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Card 1 */}
      <div className="bg-white dark:bg-[#242424] p-[24px] rounded-[16px] shadow-[0px_8px_32px_0px_rgba(53,44,85,0.04)] dark:shadow-none dark:border dark:border-[#3B3B3B] flex flex-col justify-between">
        <div className="w-[48px] h-[48px] rounded-[10px] bg-[#F6810C]/10 dark:bg-orange-500/20 flex items-center justify-center mb-4 text-orange-500">
          <Profile2User size={20} color="currentColor" />
        </div>
        <div>
          <p className="text-[14px] font-medium text-[#767676] dark:text-[#A3A3A3] mb-1">Total Students</p>
          <h2 className="text-[30px] font-bold text-[#222222] dark:text-white">550</h2>
          <p className="text-[14px] font-medium text-[#767676] dark:text-[#888888] mt-2">Enrolled Students</p>
        </div>
      </div>

      {/* Card 2 */}
      <div className="bg-white dark:bg-[#242424] p-[24px] rounded-[16px] shadow-[0px_8px_32px_0px_rgba(53,44,85,0.04)] dark:shadow-none dark:border dark:border-[#3B3B3B] flex flex-col justify-between">
        <div className="w-[48px] h-[48px] rounded-[10px] bg-[#018450]/10 dark:bg-green-500/20 flex items-center justify-center mb-4 text-[#018450]">
          <Flag size={20} color="currentColor" />
        </div>
        <div>
          <p className="text-[14px] font-medium text-[#767676] dark:text-[#A3A3A3] mb-1">Active Students</p>
          <h2 className="text-[30px] font-bold text-[#222222] dark:text-white">18</h2>
          <p className="text-[14px] font-medium text-[#767676] dark:text-[#888888] mt-2">Currently Active</p>
        </div>
      </div>

      {/* Card 3 */}
      <div className="bg-white dark:bg-[#242424] p-[24px] rounded-[16px] shadow-[0px_8px_32px_0px_rgba(53,44,85,0.04)] dark:shadow-none dark:border dark:border-[#3B3B3B] flex flex-col justify-between">
        <div className="w-[48px] h-[48px] rounded-[10px] bg-[#E0363F]/10 dark:bg-red-500/20 flex items-center justify-center mb-4 text-[#E0363F]">
          <Teacher size={20} color="currentColor" />
        </div>
        <div>
          <p className="text-[14px] font-medium text-[#767676] dark:text-[#A3A3A3] mb-1">Graduated</p>
          <h2 className="text-[30px] font-bold text-[#222222] dark:text-white">106</h2>
          <p className="text-[14px] font-medium text-[#767676] dark:text-[#888888] mt-2">Completed course</p>
        </div>
      </div>

      {/* Card 4 */}
      <div className="bg-white dark:bg-[#242424] p-[24px] rounded-[16px] shadow-[0px_8px_32_rgba(53,44,85,0.04)] dark:shadow-none dark:border dark:border-[#3B3B3B] flex flex-col justify-between relative">
        <div className="absolute top-6 right-6 bg-green-500/10 dark:bg-green-500/20 text-green-600 dark:text-green-400 text-[12px] font-bold px-2 py-1 rounded-md">
          +12%
        </div>
        <div className="w-[48px] h-[48px] rounded-[10px] bg-[#7036E0]/10 dark:bg-purple-500/20 flex items-center justify-center mb-4 text-[#7036E0]">
          <Calendar size={24} color="currentColor" />
        </div>
        <div>
          <p className="text-[14px] font-medium text-[#767676] dark:text-[#A3A3A3] mb-1">Avg. Attendance</p>
          <h2 className="text-[30px] font-bold text-[#222222] dark:text-white">95%</h2>
          <p className="text-[14px] font-medium text-[#767676] dark:text-[#888888] mt-2">Monthly average</p>
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
