import React from 'react';
import { DocumentText1, Monitor } from 'iconsax-react';
import type { Student } from '../mockData';

interface Props {
  student: Student;
}

const EnrolledCoursesSection = ({ student }: Props) => {
  return (
    <div className="boxStyle">
      <h2 className="text-[18px] font-semibold text-[#333333] dark:text-white mb-6">Enrolled Course & Sessions</h2>

      <div className="flex flex-col gap-6">
        <div className="flex items-start gap-4">
          <div className="w-[35px] h-[35px] rounded-[26px] bg-[#DCE7FF] text-[#653AF8] flex items-center justify-center shrink-0">
            <DocumentText1 size={20} color="currentColor" />
          </div>
          <div className="-mt-1">
            <p className="text-[14px] md:text-base font-semibold text-[#333] dark:text-[#A3A3A3] mb-2.5">Courses</p>
            <div className="flex flex-col gap-2">
              <span className="text-[14px]  text-[#333333] dark:text-white mt-1 break-all">{student.course}</span>
              {student.courseSubtitle && (
                <span className="text-[14px] font-semibold text-[#333333] dark:text-white">{student.courseSubtitle}</span>
              )}
            </div>
          </div>
        </div>

        <div className="w-full h-[1px] bg-[#F5F5F5] dark:bg-[#3B3B3B]"></div>

        <div className="flex items-start gap-4">
          <div className="w-[35px] h-[35px] rounded-[26px] bg-[#DCE7FF] text-[#653AF8] flex items-center justify-center shrink-0">
            <Monitor size={20} color="currentColor" />
          </div>
          <div className="-mt-1">
            <p className="text-[14px] md:text-base font-semibold text-[#333] dark:text-[#A3A3A3] mb-2.5">Batches</p>
            <div className="flex flex-wrap gap-3">
              {student.batches.map((batch, idx) => {
                const styles = [
                  "bg-[#F50000]/10 text-[#F50000] dark:bg-orange-500/10 dark:text-orange-400",
                  "bg-[#3EA465]/10 text-[#3EA465] dark:bg-green-500/10 dark:text-green-400",
                  "bg-[#A405D9]/10 text-[#A405D9] dark:bg-purple-500/10 dark:text-purple-400"
                ];
                const style = styles[idx % styles.length];
                return (
                  <span key={idx} className={`px-4 py-1.5 rounded-[12px] text-[12px] font-normal cursor-pointer opacity-70 hover:opacity-100 ${style}`}>
                    {batch}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnrolledCoursesSection;
