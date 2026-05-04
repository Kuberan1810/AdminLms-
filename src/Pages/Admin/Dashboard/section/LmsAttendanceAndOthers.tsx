import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Triangle, 
  Zap, 
  Megaphone, 
  Users, 
  User as UserIcon 
} from 'lucide-react';

// --- Sub-Components ---

const DailyAttendance = () => (
  <div className="bg-white rounded-[32px] p-8 font-[Urbanist] border-slate-50 flex flex-col h-full">
    <h2 className="text-xl font-bold text-slate-800 mb-8">Daily Attendance</h2>
    <div className="boxstyle">
      <div className="flex justify-between items-center">
        <span className="text-slate-500 font-medium">Absent Students</span>
        <span className="text-orange-500 font-bold text-xl">24</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-slate-500 font-medium">Absent Teachers</span>
        <span className="text-orange-500 font-bold text-xl">2</span>
      </div>
    </div>
    <div className="mt-8 bg-red-50/50 border-l-4 border-red-500 rounded-r-xl p-4 flex gap-3 items-center">
      <AlertTriangle className="text-red-500 shrink-0" size={20} />
      <p className="text-[11px] leading-tight text-red-800 font-medium">
        Batch #402 (Cybersec) below 40% attendance this week.
      </p>
    </div>
  </div>
);

const EnrollmentGrowth = () => (
  <div className="bg-white rounded-[32px] p-8  border border-slate-50 h-full flex flex-col font-[Urbanist]">
    <h2 className="text-[20px] font-semibold text-[#0B1C30]">Enrollment Growth</h2>
    <p className="text-xs text-slate-400 mt-1 mb-6">Monthly Performance</p>
    
    <div className="flex items-baseline gap-3 mb-8">
      <span className="text-[36px] font-semibold text-[#F27121]">+18.5%</span>
      <div className="flex items-center text-[#22C55E] text-[14px] font-bold gap-1">
        <Triangle size={8} fill="currentColor" /> 2.4%
      </div>
    </div>

    <div className="flex items-end gap-2 h-24 mt-auto">
      <div className="flex-1 bg-orange-100 rounded-sm h-[40%]"></div>
      <div className="flex-1 bg-orange-100 rounded-sm h-[60%]"></div>
      <div className="flex-1 bg-orange-200 rounded-sm h-[50%]"></div>
      <div className="flex-1 bg-orange-300 rounded-sm h-[80%]"></div>
      <div className="flex-1 bg-orange-500 rounded-sm h-[100%]"></div>
    </div>
  </div>
);

const RecentActivity = () => {
  const activities = [
    { name: "Alex Rivera", action: "Submitted: Full Stack Web Development Module 4", time: "2 mins ago" },
    { name: "Sophie Chen", action: "Started: Python for Beginners - Quiz 1", time: "15 mins ago" },
    { name: "Jordan Smith", action: "Updated: Final Project Proposal Draft", time: "1 hour ago" },
  ];

  return (
    <div className="bg-white rounded-[32px] p-8 font-[Urbanist] border border-slate-50 h-full">
      <h2 className="text-slate-500 text-sm font-semibold mb-8">Recent Activity</h2>
      <div className="relative space-y-8">
        {/* Timeline Line */}
        <div className="absolute left-[18px] top-2 bottom-2 w-[1px] bg-slate-100" />
        
        {activities.map((item, idx) => (
          <div key={idx} className="flex gap-4 relative z-10">
            <div className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center border-4 border-white overflow-hidden shrink-0">
               <UserIcon className="text-white p-1" />
            </div>
            <div className="flex flex-col">
              <span className="text-[14px] font-bold text-slate-800 leading-none">{item.name}</span>
              <span className="text-[11px] text-slate-400 mt-1">{item.action}</span>
              <span className="text-[10px] text-slate-300 mt-1 font-medium">{item.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Main Component ---

const LmsAttendanceAndOthers: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-full bg-slate-50/30 p-6 md:p-10 lg:p-12 min-h-screen font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <DailyAttendance />
        <EnrollmentGrowth />
        <RecentActivity />
      </div>

      {/* Floating Action Button Logic */}
      <div className="fixed bottom-10 right-10 flex flex-col items-center gap-4 z-50">
        {/* Modal-like Popover Icons */}
        {isOpen && (
          <div className="bg-white p-3 rounded-[24px] shadow-2xl border border-slate-100 flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <button className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center hover:bg-blue-100 transition-colors">
              <Megaphone className="text-orange-500" size={24} />
            </button>
            <button className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center hover:bg-blue-100 transition-colors">
              <Users className="text-orange-500" size={24} />
            </button>
          </div>
        )}

        {/* Main Thunder Button */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
            isOpen ? 'bg-orange-600 rotate-12 scale-110' : 'bg-orange-500 hover:bg-orange-600 shadow-orange-200'
          }`}
        >
          <Zap 
            className="text-white" 
            size={32} 
            fill="white"
          />
        </button>
      </div>
    </div>
  );
};

export default LmsAttendanceAndOthers;