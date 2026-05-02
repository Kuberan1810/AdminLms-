import React, { useState } from 'react';
import { Download } from 'lucide-react';

const allAttendanceRecords = [
  { date: 'Jan 24, 2026', course: 'Advanced Algorithms', time: '09:00 AM - 10:30 AM', status: 'Present' },
  { date: 'Jan 24, 2026', course: 'Data Structures', time: '11:00 AM - 12:30 PM', status: 'Present' },
  { date: 'Jan 23, 2026', course: 'Advanced Algorithms', time: '02:00 PM - 03:30 PM', status: 'Absent' },
  { date: 'Jan 21, 2026', course: 'Machine Learning Intro', time: '10:00 AM - 11:30 AM', status: 'Present' },
  { date: 'Jan 20, 2026', course: 'Neural Networks', time: '09:00 AM - 10:30 AM', status: 'Present' },
  { date: 'Jan 19, 2026', course: 'Computer Vision', time: '01:00 PM - 02:30 PM', status: 'Present' },
  { date: 'Jan 18, 2026', course: 'Natural Language Processing', time: '04:00 PM - 05:30 PM', status: 'Absent' },
];

const AttendanceSection = () => {
  const [showAll, setShowAll] = useState(false);
  const displayedRecords = showAll ? allAttendanceRecords : allAttendanceRecords.slice(0, 4);

  return (
    <div className="bg-white dark:bg-[#242424] rounded-[28px] py-6 shadow-[0px_8px_32px_0px_rgba(53,44,85,0.04)] dark:shadow-none dark:border dark:border-[#3B3B3B]">
      <div className="flex items-center justify-between mb-6 px-6">
        <h2 className="text-[24px] font-medium text-[#222222] dark:text-white">Attendance Details</h2>
        <button className="flex items-center gap-2 bg-[#F3F3F3]/32 border-[1px] border-[#EFEFEF] rounded-[8px] px-2 py-1 text-[14px] font-medium text-[#333333] dark:text-white hover:text-[#F67300] transition-colors">
          <Download size={16} />
          Export CSV
        </button>
      </div>

      <div className="overflow-x-auto ">
        <table className="w-full text-left border-collapse ">
          <thead>
            <tr className="w-full bg-[#F9F9F9] dark:border-[#3B3B3B] text-[12px] uppercase text-[#222222] dark:text-[#A3A3A3]">
              <th className="py-3 font-medium text-center">Date</th>
              <th className="py-3 font-medium text-center">Course Name</th>
              <th className="py-3 font-medium text-center">Session Time</th>
              <th className="py-3 font-medium text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F5F5F5] dark:divide-[#3B3B3B]">
            {displayedRecords.map((record, index) => (
              <tr key={index} className="text-[14px] text-[#222222] dark:text-white transition-all duration-300">
                <td className="py-4 font-semibold text-center">{record.date}</td>
                <td className="py-4 font-normal text-center">{record.course}</td>
                <td className="py-4 dark:text-[#A3A3A3] font-normal text-center">{record.time}</td>
                <td className="py-4 text-center">
                  <span className={`${record.status === 'Present' ? 'text-[#15803D] bg-[#F0FDF4] rounded-[6px] px-2.5' : 'text-[#C2410C] bg-[#FFF7ED] rounded-[6px] px-2.5'} font-semibold`}>
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
          className="text-[14px] font-medium text-[#222222] dark:text-[#A3A3A3] hover:underline transition-all"
        >
          {showAll ? 'View less' : 'View more'}
        </button>
      </div>
    </div>
  );
};

export default AttendanceSection;
