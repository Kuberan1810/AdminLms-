import React, { useState } from 'react';
import { Download } from 'lucide-react';
import type { Student } from '../mockData';

interface Props {
  student: Student;
}

const AttendanceSection = ({ student }: Props) => {
  const [showAll, setShowAll] = useState(false);
  const displayedRecords = showAll ? student.attendanceRecords : student.attendanceRecords.slice(0, 4);

  return (
    <div className="boxStyle">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[18px] font-semibold text-[#333333] dark:text-white">Attendance Details</h2>
        <button className="flex items-center gap-2 bg-[#F3F3F3]/32 border-[1px] border-[#EFEFEF] rounded-[8px] px-3 py-1.5 text-[14px] font-medium text-[#333333] dark:text-white hover:text-[#F67300] transition-colors cursor-pointer">
          <Download size={16} />
          Export CSV
        </button>
      </div>

      <div className="overflow-x-auto border border-[#F5F5F5] dark:border-[#3B3B3B] rounded-[20px]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="w-full bg-[#F3F3F3]/32 border-b border-[#F5F5F5] dark:border-[#3B3B3B] text-[13px] uppercase text-[#333] dark:text-[#A3A3A3]">
              <th className="py-4 px-4 font-semibold text-center">DATE</th>
              <th className="py-4 px-4 font-semibold text-center">COURSE NAME</th>
              <th className="py-4 px-4 font-semibold text-center">SESSION TIME</th>
              <th className="py-4 px-4 font-semibold text-center">STATUS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F5F5F5] dark:divide-[#3B3B3B]">
            {displayedRecords.length > 0 ? (
              displayedRecords.map((record, index) => (
                <tr key={index} className="text-xs md:text-[14px] text-[#333333] dark:text-white hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors">
                  <td className="py-4 px-4 font-semibold text-center whitespace-nowrap">{record.date}</td>
                  <td className="py-4 px-4 font-normal text-center whitespace-nowrap">{record.course}</td>
                  <td className="py-4 px-4 dark:text-[#A3A3A3] font-normal text-center whitespace-nowrap">{record.time}</td>
                  <td className="py-4 px-4 text-center">
                    <span className={`inline-block px-3 py-1 rounded-full text-[12px] font-regular ${record.status === 'Present'
                        ? 'text-[#22C55E] bg-[#E8F8F0] dark:bg-green-500/10 dark:text-green-400'
                        : 'text-[#EA1115] bg-[#EA1115]/10 dark:bg-red-500/10 dark:text-red-400'
                      }`}>
                      {record.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="py-8 text-center text-[#767676] dark:text-[#A3A3A3] text-sm">No attendance records found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-4 text-center">
        <button
          onClick={() => setShowAll(!showAll)}
          className="text-[12px] font-medium text-[#626262] dark:text-[#A3A3A3] hover:text-[#F67300] hover:underline transition-all cursor-pointer"
        >
          {showAll ? 'View less' : 'View more'}
        </button>
      </div>
    </div>
  );
};

export default AttendanceSection;
