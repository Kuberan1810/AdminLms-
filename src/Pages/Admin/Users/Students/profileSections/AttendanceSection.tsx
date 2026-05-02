import { useState } from 'react';
import { Download } from 'lucide-react';

import { useParams } from 'react-router-dom';
import { mockStudents } from '../mockData';

const AttendanceSection = () => {
  const { id } = useParams();
  const student = mockStudents.find(s => s.id === id) || mockStudents[0];

  const [showAll, setShowAll] = useState(false);
  const displayedRecords = showAll ? student.attendanceRecords : student.attendanceRecords.slice(0, 4);



  return (
    <div className="boxStyle !py-6">
      <div className="flex items-center justify-between mb-6 px-6">
        <h2 className="text-[24px] font-medium text-[#222222] dark:text-white">Attendance Details</h2>
        <button className="flex items-center gap-2 bg-[#F3F3F3]/32 border-[1px] border-[#EFEFEF] rounded-[8px] px-2 py-1 text-[14px] font-medium text-[#333333] dark:text-white hover:text-[#F67300] transition-colors cursor-pointer">
          <Download size={16} />
          Export CSV
        </button>
      </div>

      <div className="overflow-x-auto -mx-7">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="w-full bg-[#F9F9F9] dark:border-[#3B3B3B] text-[12px] uppercase text-[#222222] dark:text-[#A3A3A3] ">
              <th className="py-3 font-medium text-center">Date</th>
              <th className="py-3 font-medium text-center">Course Name</th>
              <th className="py-3 font-medium text-center">Session Time</th>
              <th className="py-3 font-medium text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F5F5F5] dark:divide-[#3B3B3B]">
            {displayedRecords.length > 0 ? (
              displayedRecords.map((record, index) => (
                <tr key={index} className="text-[14px] text-[#222222] dark:text-white transition-all duration-300">
                  <td className="py-4 pl-3 font-semibold text-center">{record.date}</td>
                  <td className="py-4 font-normal text-center">{record.course}</td>
                  <td className="py-4 dark:text-[#A3A3A3] font-normal text-center">{record.time}</td>
                  <td className="py-4 pr-3 text-center">
                    <span className={`${record.status === 'Present' ? 'text-[#15803D] bg-[#F0FDF4] rounded-full px-2.5' : 'text-[#C2410C] bg-[#FFF7ED] rounded-full px-2.5'} font-semibold`}>
                      {record.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="py-6 text-center text-[#767676] dark:text-[#A3A3A3]">No attendance records found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-4 text-center">
        <button
          onClick={() => setShowAll(!showAll)}
          className="text-[14px] font-medium text-[#222222] dark:text-[#A3A3A3] hover:underline transition-all cursor-pointer"
        >
          {showAll ? 'View less' : 'View more'}
        </button>
      </div>
    </div>
  );
};

export default AttendanceSection;
