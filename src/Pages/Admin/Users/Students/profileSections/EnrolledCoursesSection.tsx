import { DocumentText1, Monitor } from 'iconsax-react';

const EnrolledCoursesSection = () => {
  return (
    <div className="bg-white dark:bg-[#242424] rounded-[28px] p-8 shadow-[0px_8px_32px_0px_rgba(53,44,85,0.04)] dark:shadow-none dark:border dark:border-[#3B3B3B]">
      <h2 className="text-[24px] font-medium text-[#222222] dark:text-white mb-8">Enrolled Course & Sessions</h2>

      <div className="flex flex-col gap-6">
        <div className="flex items-start gap-4">
          <div className="w-[35px] h-[35px] rounded-[26px] bg-[#DCE7FF] text-[#653AF8] flex items-center justify-center shrink-0">
            <DocumentText1 size={20} color="currentColor" />
          </div>
          <div className="-mt-2">
            <p className="text-[16px] text-[#222222] dark:text-white mb-3">Courses</p>
            <div className="flex flex-wrap gap-x-12 gap-y-3">
              <span className="text-[14px] text-[#222222] dark:text-[#A3A3A3] font-normal">AM101 - AI / ML Frontier AI Engineer</span>
              <span className="text-[14px] text-[#222222] dark:text-[#A3A3A3] font-normal">Q1103 - Quantum Intelligence</span>
            </div>
          </div>
        </div>

        <div className="w-full h-[1px] bg-[#F5F5F5] dark:bg-[#3B3B3B]"></div>

        <div className="flex items-start gap-4">
          <div className="w-[35px] h-[35px] rounded-[26px] bg-[#DCE7FF] text-[#653AF8] flex items-center justify-center shrink-0">
            <Monitor size={20} color="currentColor" />
          </div>
          <div className="-mt-2">
            <p className="text-[16px] text-[#222222] dark:text-white mb-3">Batches</p>
            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-1.5 bg-[#FFF0E5] text-[#F50000] dark:bg-orange-500/10 dark:text-orange-400 rounded-[6px] text-[10px] font-normal">#AM101-B01</span>
              <span className="px-4 py-1.5 bg-[#DCFFE9] text-[#3EA465] dark:bg-green-500/10 dark:text-green-400 rounded-[6px] text-[10px] font-normal">#AM101-B04</span>
              <span className="px-4 py-1.5 bg-[#FBEFFF] text-[#A405D9] dark:bg-purple-500/10 dark:text-purple-400 rounded-[6px] text-[10px] font-normal">#Q1103-B02</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnrolledCoursesSection;
