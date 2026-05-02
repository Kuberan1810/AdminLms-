import React from 'react';
import { Download } from 'lucide-react';

const TestPerformanceSection = () => {
  return (
    <div className="bg-white dark:bg-[#242424] rounded-2xl p-6 shadow-[0px_8px_32px_0px_rgba(53,44,85,0.04)] dark:shadow-none dark:border dark:border-[#3B3B3B]">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[24px] font-medium text-[#222222] dark:text-white">Test Performance</h2>
        <button className="flex items-center gap-2 bg-[#F3F3F3]/32 border-[1px] border-[#EFEFEF] rounded-[8px] px-2 py-1 text-[14px] font-medium text-[#333333] dark:text-white hover:text-[#F67300] transition-colors">
          <Download size={16} />
          Export CSV
        </button>
      </div>

      <div className="overflow-x-auto rounded-[12px] border border-[#D3D3D3] dark:border-[#3B3B3B]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="dark:bg-[#2D2D2D] text-[16px] text-[#222222] text-medium dark:text-[#A3A3A3] ">
              <th className="px-4 py-1font-medium">S.no</th>
              <th className="px-4 py-1 font-medium">Date</th>
              <th className="px-4 py-1 font-medium">Test name</th>
              <th className="px-4 py-1 font-medium">Mark</th>
              <th className="px-4 py-1 font-medium text-right">Result</th>
            </tr>
          </thead>
          <tbody className="">
            {[1, 2, 3, 4, 5, 6].map((num, i) => (
              <tr key={i} className="text-[13px] text-[#222222] dark:text-white hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors">
                <td className="py-2 px-4 text-center text-[#767676]">{num}</td>
                <td className="py-2 px-4 whitespace-nowrap text-[#767676]">23 Jan 2026</td>
                <td className="py-2 px-4 whitespace-nowrap">Mid - Term AI Proficiency Test</td>
                <td className="py-2 px-4 font-medium ">86</td>
                <td className="py-2 px-4 text-right">
                  {num === 3 || num === 5 || num === 6 ? (
                    <span className="px-2 py-1 bg-[#F1351B]/10 text-[#F1351B] w-[57px] h-[18px] flex items-center justify-center rounded-md text-[12px] font-normal">Fail</span>
                  ) : (
                    <span className="px-2 py-1 bg-[#2A9A46]/10 text-[#2A9A46] w-[57px] h-[18px] flex items-center justify-center rounded-md text-[12px] font-normal">Passed</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TestPerformanceSection;
