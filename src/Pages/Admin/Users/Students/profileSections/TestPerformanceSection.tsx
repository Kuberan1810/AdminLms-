import React from 'react';
import { Download } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { mockStudents } from '../mockData';

const TestPerformanceSection = () => {
  const { id } = useParams();
  const student = mockStudents.find(s => s.id === id) || mockStudents[0];
  const performanceData = student.testPerformance || [];

  return (
    <div className="boxStyle">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[24px] font-medium text-[#222222] dark:text-white">Test Performance</h2>
        <button className="flex items-center gap-2 bg-[#F3F3F3]/32 border-[1px] border-[#EFEFEF] rounded-[8px] px-2 py-1 text-[14px] font-medium text-[#333333] dark:text-white hover:text-[#F67300] transition-colors cursor-pointer">
          <Download size={16} />
          Export CSV
        </button>
      </div>

      <div className="overflow-x-auto rounded-[12px] border border-[#D3D3D3] dark:border-[#3B3B3B]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="dark:bg-[#2D2D2D] text-[16px] text-[#222222] font-medium dark:text-[#A3A3A3] ">
              <th className="px-4 py-1 font-medium">S.no</th>
              <th className="px-4 py-1 font-medium">Date</th>
              <th className="px-4 py-1 font-medium">Test name</th>
              <th className="px-4 py-1 font-medium">Mark</th>
              <th className="px-4 py-1 font-medium text-right">Result</th>
            </tr>
          </thead>
          <tbody className="">
            {performanceData.length > 0 ? (
              performanceData.map((test, i) => (
                <tr key={i} className="text-[14px] text-[#222222] dark:text-white hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors dark:border-[#3B3B3B]">
                  <td className="py-2 px-4 text-center text-[#767676]">{i + 1}</td>
                  <td className="py-2 px-4 whitespace-nowrap text-[#767676]">{test.date}</td>
                  <td className="py-2 px-4 whitespace-nowrap">{test.name}</td>
                  <td className="py-2 px-4 font-medium ">{test.mark}</td>
                  <td className="py-2 px-4 text-right flex justify-end">
                    <span className={`px-2 py-1 w-[57px] h-[18px] flex items-center justify-center rounded-md text-[12px] font-normal ${test.result === 'Fail'
                      ? 'bg-[#F1351B]/10 text-[#F1351B]'
                      : 'bg-[#2A9A46]/10 text-[#2A9A46]'
                      }`}>
                      {test.result === 'Passed' ? 'Passed' : 'Fail'}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-6 text-center text-[#767676] dark:text-[#A3A3A3]">No test records found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TestPerformanceSection;
