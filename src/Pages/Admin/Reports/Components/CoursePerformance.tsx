import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Course {
  name: string;
  batches: number;
  students: number;
  attendance: number;
  engagement: string;
}

interface CoursePerformanceProps {
  courses: Course[];
}

const CoursePerformance: React.FC<CoursePerformanceProps> = ({ courses }) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-[#F1F5F9] dark:border-slate-800 overflow-hidden transition-colors duration-300">
      <div className="px-7 pt-7 pb-4">
        <h3 className="text-[20px] font-semibold text-[#0B1C30] dark:text-white leading-[28px] font-['Urbanist']">Course Performance</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-[#F8FAFC] dark:bg-slate-800/50">
              {["Course Name", "Batches", "Total Students", "Avg. Attendance", "Engagement"].map((h, i) => (
                <th key={h} className={`py-3.5 px-7 text-[12px] font-semibold text-[#64748B] dark:text-slate-400 uppercase tracking-[0.6px] leading-[16px] font-['Urbanist'] whitespace-nowrap ${i === 0 ? 'text-left' : 'text-center'}`}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F1F5F9] dark:divide-slate-800">
            {courses.map((c, i) => (
              <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                <td className="py-5 px-7 text-[14px] font-medium text-[#0F172A] dark:text-slate-200 leading-[20px] font-['Urbanist'] whitespace-nowrap text-left">{c.name}</td>
                <td className="py-5 px-7 text-[14px] font-normal text-[#0F172A] dark:text-slate-300 leading-[20px] font-['Urbanist'] text-center">{c.batches}</td>
                <td className="py-5 px-7 text-[14px] font-normal text-[#0F172A] dark:text-slate-300 leading-[20px] font-['Urbanist'] text-center">{c.students}</td>
                <td className="py-5 px-7 min-w-[140px] text-center">
                  <div className="mx-auto max-w-[80px] text-left">
                    <span className="text-[14px] font-medium text-[#0F172A] dark:text-slate-200 leading-[20px] font-['Urbanist'] block mb-1.5">{c.attendance}%</span>
                    <div className="h-1.5 w-full bg-[#F1F5F9] dark:bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${c.attendance > 90 ? 'bg-[#22C55E]' : c.attendance > 80 ? 'bg-[#FBBF24]' : 'bg-[#F6810C]'}`}
                        style={{ width: `${c.attendance}%` }}
                      />
                    </div>
                  </div>
                </td>
                <td className="py-5 px-7 text-center">
                  <span className="text-[14px] font-normal text-[#0F172A] dark:text-slate-200 leading-none font-['Urbanist']">
                    {c.engagement}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-8 py-4 flex justify-between items-center border-t border-[#F1F5F9] dark:border-slate-800 bg-[#F8FAFC] dark:bg-slate-800/50">
        <p className="text-[13px] font-normal text-[#64748B] dark:text-slate-400 leading-[18px] font-['Urbanist']">Showing 1-3 of 09 courses</p>
        <div className="flex gap-2">
          <button className="w-8 h-8 rounded-full border border-[#E2E8F0] dark:border-slate-700 flex items-center justify-center text-[#94A3B8] dark:text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800">
            <ChevronLeft size={15} />
          </button>
          <button className="w-8 h-8 rounded-full border border-[#E2E8F0] dark:border-slate-700 flex items-center justify-center text-[#94A3B8] dark:text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800">
            <ChevronRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoursePerformance;
