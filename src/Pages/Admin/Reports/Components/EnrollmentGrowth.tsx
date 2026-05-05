import React, { useState } from 'react';

interface EnrollmentData {
  day: string;
  value: number;
  highlighted?: boolean;
  label?: string;
}

interface EnrollmentGrowthProps {
  data?: EnrollmentData[];
}

const EnrollmentGrowth: React.FC<EnrollmentGrowthProps> = () => {
  const [activeRange, setActiveRange] = useState<'Week' | 'Month'>('Week');

  const weekData: EnrollmentData[] = [
    { day: "MON", value: 40, label: "40 Enrollments" },
    { day: "TUE", value: 25, label: "25 Enrollments" },
    { day: "WED", value: 45, label: "45 Enrollments" },
    { day: "THUR", value: 35, label: "35 Enrollments" },
    { day: "FRI", value: 70, highlighted: true, label: "70 Enrollments" },
  ];

  const monthData: EnrollmentData[] = [
    { day: "JAN", value: 65, label: "65 Enrollments" },
    { day: "FEB", value: 45, label: "45 Enrollments" },
    { day: "MAR", value: 75, highlighted: true, label: "75 Enrollments" },
    { day: "APR", value: 50, label: "50 Enrollments" },
    { day: "MAY", value: 60, label: "60 Enrollments" },
  ];

  const currentData = activeRange === 'Week' ? weekData : monthData;

  return (
    <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl border border-[#F1F5F9] dark:border-slate-800 p-7 transition-colors duration-300">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h3 className="text-[20px] font-semibold text-[#0B1C30] dark:text-white leading-[28px] font-['Urbanist']">Enrollment Growth</h3>
          <p className="text-[13px] text-[#64748B] dark:text-slate-400 mt-0.5">New learner registrations</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveRange('Month')}
            className={`px-4 py-1.5 text-[12px] font-bold rounded-xl font-['Urbanist'] cursor-pointer transition-all ${
              activeRange === 'Month'
                ? 'text-white bg-[#F6810C] border border-[#F6810C]'
                : 'text-[#334155] dark:text-slate-300 bg-white dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700'
            }`}
          >
            Month
          </button>
          <button
            onClick={() => setActiveRange('Week')}
            className={`px-4 py-1.5 text-[12px] font-bold rounded-xl font-['Urbanist'] cursor-pointer transition-all ${
              activeRange === 'Week'
                ? 'text-white bg-[#F6810C] border border-[#F6810C]'
                : 'text-[#334155] dark:text-slate-300 bg-white dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700'
            }`}
          >
            Week
          </button>
        </div>
      </div>

      <div className="relative h-56 flex items-end justify-between px-2">
        {/* grid lines */}
        {[0, 1, 2, 3, 4].map(i => (
          <div key={i} className="absolute w-full h-px bg-[#F1F5F9] dark:bg-slate-800" style={{ bottom: `${i * 25}%` }} />
        ))}

        {currentData.map((d, i) => (
          <div key={i} className="relative flex flex-col items-center flex-1 h-full justify-end group cursor-pointer">
            <div
              className={`w-[64px] rounded-t-[12px] flex flex-col justify-end items-center p-2 pt-[6px] pb-0 mb-6 relative ${d.highlighted ? 'bg-[#E3F1FF] dark:bg-[#1E293B]' : ''}`}
              style={{ height: `${(d.value / 80) * 80}%` }}
            >
              <div
                className={`w-[48px] flex-1 rounded-t-[12px] ${d.highlighted ? 'bg-[#F6810C]' : 'bg-[#FFF4ED] dark:bg-slate-800'}`}
              >
                <div className="absolute top-1/2 left-full ml-2 -translate-y-1/2 bg-white dark:bg-slate-800 shadow-lg border border-[#E2E8F0] dark:border-slate-700 px-3 py-1.5 rounded-xl whitespace-nowrap z-50 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 pointer-events-none select-none">
                  <p className="text-[11px] font-medium text-[#171C1F] dark:text-white">
                    {d.label || `Enrollments: ${d.value}`}
                  </p>
                </div>
              </div>
            </div>
            <span className="text-[11px] font-bold text-[#94A3B8] dark:text-slate-500 uppercase tracking-wide h-[14px] leading-none flex items-center">{d.day}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EnrollmentGrowth;
