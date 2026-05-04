import React from 'react';
import { Download } from 'lucide-react';
import type { Student } from '../mockData';

interface Props {
  student: Student;
}

const TestPerformanceSection = ({ student }: Props) => {
  const performanceData = student.testPerformance || [];

  return (
    <div className="boxStyle">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[18px] font-semibold text-[#333333] dark:text-white">Test Performance</h2>
        <button className="flex items-center gap-2 bg-[#F3F3F3]/32 border-[1px] border-[#EFEFEF] rounded-[8px] px-3 py-1.5 text-[14px] font-medium text-[#333333] dark:text-white hover:text-[#F67300] transition-colors cursor-pointer">
          <Download size={16} />
          Export CSV
        </button>
      </div>

      <div className="overflow-x-auto border border-[#F5F5F5] dark:border-[#3B3B3B] rounded-[20px]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="w-full bg-[#F3F3F3]/32 border-b border-[#F5F5F5] dark:border-[#3B3B3B] text-[13px] uppercase text-[#333] dark:text-[#A3A3A3]">
              <th className="py-4 px-4 font-semibold text-center">S.NO</th>
              <th className="py-4 px-4 font-semibold">DATE</th>
              <th className="py-4 px-4 font-semibold">TEST NAME</th>
              <th className="py-4 px-4 font-semibold text-center">MARK</th>
              <th className="py-4 px-4 font-semibold text-center">RESULT</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F5F5F5] dark:divide-[#3B3B3B]">
            {performanceData.length > 0 ? (
              performanceData.map((test, i) => (
                <tr key={i} className="text-xs md:text-[14px] text-[#333333] dark:text-white hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors">
                  <td className="py-4 px-4 text-center text-[#767676]">{i + 1}</td>
                  <td className="py-4 px-4 whitespace-nowrap text-[#767676]">{test.date}</td>
                  <td className="py-4 px-4 font-medium">{test.name}</td>
                  <td className="py-4 px-4 font-semibold text-center text-[#222222] dark:text-white">{test.mark}</td>
                  <td className="py-4 px-4 text-center">
                    <span className={`inline-block px-3 py-1 rounded-full text-[12px] font-regular ${test.result === 'Fail'
                        ? 'text-[#EA1115] bg-[#EA1115]/10 dark:bg-red-500/10 dark:text-red-400'
                        : 'text-[#22C55E] bg-[#E8F8F0] dark:bg-green-500/10 dark:text-green-400'
                      }`}>
                      {test.result}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-8 text-center text-[#767676] dark:text-[#A3A3A3] text-sm">No test records found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TestPerformanceSection;
