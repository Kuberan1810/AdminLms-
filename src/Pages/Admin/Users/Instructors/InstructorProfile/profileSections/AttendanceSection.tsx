import React, { useState } from 'react';
import { Download } from 'lucide-react';
import type { InstructorData } from '../../../../../../data/InstructorMockData';

interface Props {
  instructor: InstructorData;
}

const AttendanceSection = ({ instructor }: Props) => {
  const [showAll, setShowAll] = useState(false);

  // Use instructor's attendanceHistory or fallback to dummy if empty
  const records = instructor.attendanceHistory && instructor.attendanceHistory.length > 0
    ? instructor.attendanceHistory
    : [
      { date: 'Jan 24, 2026', courseName: 'Advanced Algorithms', sessionTime: '09:00 AM - 10:30 AM', status: 'Present' },
      { date: 'Jan 24, 2026', courseName: 'Data Structures', sessionTime: '11:00 AM - 12:30 PM', status: 'Present' },
      { date: 'Jan 23, 2026', courseName: 'Faculty Meeting', sessionTime: '02:00 PM - 03:30 PM', status: 'Leave' },
      { date: 'Jan 21, 2026', courseName: 'Machine Learning Intro', sessionTime: '10:00 AM - 11:30 AM', status: 'Present' },
    ];

  const displayedRecords = showAll ? records : records.slice(0, 4);

  return (
    <div className="boxStyle">
      <div className="flex items-center justify-between mb-4">
        <h2 className="md:text-xl text-lg font-semibold text-[#0B1C30]  dark:text-white">Attendance Details</h2>
        <button className="flex items-center gap-2 bg-[#F3F3F3]/32 border-[1px] border-[#EFEFEF] rounded-[8px] px-3 py-1.5 text-[14px] font-medium text-[#333333] dark:text-white hover:text-[#F67300] transition-colors cursor-pointer">
          <Download size={16} />
          Export CSV
        </button>
      </div>

      <div className="overflow-x-auto border border-[#F5F5F5] dark:border-[#3B3B3B] rounded-[20px] ">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="w-full bg-[#F3F3F3]/32 border-b border-[#F5F5F5] dark:border-[#3B3B3B] text-[13px] uppercase text-[#333] dark:text-[#A3A3A3]">
              <th className="py-4 px-4 font-semibold">DATE</th>
              <th className="py-4 px-4 font-semibold">COURSE NAME</th>
              <th className="py-4 px-4 font-semibold">SESSION TIME</th>
              <th className="py-4 px-4 font-semibold text-center">STATUS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F5F5F5] dark:divide-[#3B3B3B]">
            {displayedRecords.map((record, index) => (
              <tr key={index} className="text-xs md:text-[14px] text-[#333333] dark:text-white hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors">
                <td className="py-4 px-4 font-semibold whitespace-nowrap">{record.date}</td>
                <td className="py-4 px-4 font-normal whitespace-nowrap">{record.courseName}</td>
                <td className="py-4 px-4 dark:text-[#A3A3A3] font-normal whitespace-nowrap">{record.sessionTime}</td>
                <td className="py-4 px-4 text-center">
                  <span className={`inline-block px-3 py-1 rounded-full text-[12px] font-regular ${record.status === 'Present'
                      ? 'text-[#22C55E] bg-[#E8F8F0] dark:bg-green-500/10 dark:text-green-400'
                      : 'text-[#F6810C] bg-[#F6810C]/10 dark:bg-orange-500/10 dark:text-orange-400'
                    }`}>
                    {record.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 text-center">
        <button
          onClick={() => setShowAll(!showAll)}
          className="text-[12px] font-medium text-[#626262] dark:text-[#A3A3A3] hover:text-[#F67300] hover:underline transition-all"
        >
          {showAll ? 'View less' : 'View more'}
        </button>
      </div>
    </div>
  );
};

export default AttendanceSection;
