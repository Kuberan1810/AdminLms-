import React from 'react';
import { TickCircle, More } from 'iconsax-react';
import { CircleAlert, MoreHorizontal, MoreVertical } from 'lucide-react';

const QueueStatusSection = () => {
  return (
    <div className="bg-white dark:bg-[#242424] p-6 shadow-[0px_8px_32px_0px_rgba(53,44,85,0.04)] border border-gray-100 dark:border-[#3B3B3B]">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[16px] font-medium text-[#000000] dark:text-white uppercase tracking-wider">QUEUE STATUS</h2>
        <MoreVertical size={20} className="text-gray-400 rotate-90" color='currentColor' />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-5 bg-[#F9F9F9] dark:bg-[#2A2A2A] rounded-xl">
          <div className="flex items-center gap-4">
            <div className="text-[#3B82F6]">
              <TickCircle size={20} color='currentColor' />
            </div>
            <span className="text-[16px] font-medium text-[#0B1C30] dark:text-gray-300">Verified Total</span>
          </div>
          <span className="text-[16px] font-normal text-[#1E3A8A] dark:text-white">1,284</span>
        </div>

        <div className="flex items-center justify-between p-5 bg-[#F9F9F9] dark:bg-[#2A2A2A] rounded-xl relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-[6px] bg-[#FACC15]" />
          <div className="flex items-center gap-4 pl-2">
            <div className="w-[20px] h-[20px] rounded-full border-2 border-[#CA8A04] flex items-center justify-center text-[#CA8A04]">
              <MoreHorizontal size={20} />
            </div>
            <span className="text-[16px] font-medium text-[#0B1C30] dark:text-gray-300">Pending Review</span>
          </div>
          <span className="text-[16px] font-normal text-[#A16207]">42</span>
        </div>

        <div className="flex items-center justify-between p-5 bg-[#F9F9F9] dark:bg-[#2A2A2A] rounded-xl">
          <div className="flex items-center gap-4">
            <div className="text-[#EF4444]">
              <CircleAlert size={20} />
            </div>
            <span className="text-[16px] font-medium text-[#0B1C30] dark:text-gray-300">Upload</span>
          </div>
          <span className="text-[16px] font-normal text-[#B91C1C]">0</span>
        </div>
      </div>
    </div>
  );
};

export default QueueStatusSection;
