
import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Triangle, 
  Zap, 
  Megaphone, 
  Users 
} from 'lucide-react';

// Importing your newly created modular components
import AnnouncementModal from './modals/AnnouncementModal';
import InstructorModal from './modals/InstructorModal';

// --- Sub-Components (Attendance, Growth, Activity) ---

const DailyAttendance = () => (
  <div className="boxStyle flex flex-col h-full ">
    <h2 className="text-xl font-bold text-slate-800 mb-8">Daily Attendance</h2>
    <div className="space-y-6 flex-grow">
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
  <div className="boxStyle h-full flex flex-col ">
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
      <div className="flex-1 bg-[#F27121] rounded-sm h-[100%]"></div>
    </div>
  </div>
);

const RecentActivity = () => {
  const activities = [
    { name: "Alex Rivera", action: "Submitted: Full Stack Web Development Module 4", time: "2 mins ago" ,avatar: "https://i.pravatar.cc/150?u=alex"},
    { name: "Sophie Chen", action: "Started: Python for Beginners - Quiz 1", time: "15 mins ago",avatar: "https://i.pravatar.cc/150?u=sophie" },
    { name: "Jordan Smith", action: "Updated: Final Project Proposal Draft", time: "1 hour ago",avatar: "https://i.pravatar.cc/150?u=jordan" },
  ];

  return (
    <div className="boxStyle h-full">
      <h2 className="text-slate-500 text-sm font-semibold mb-8">Recent Activity</h2>
      <div className="relative space-y-8">
        <div className="absolute left-[18px] top-2 bottom-2 w-[1px] bg-slate-100" />
        {activities.map((item, idx) => (
          <div key={idx} className="flex gap-4 relative z-10">
            <div className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center border-4 border-white overflow-hidden shrink-0">
               <img src={item.avatar} alt={item.name} className="w-full h-full object-cover" />
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
  // State for the FAB Popover
  const [isFabOpen, setIsFabOpen] = useState(false);
  
  // States for the Modals
  const [activeModal, setActiveModal] = useState<'announcement' | 'instructor' | null>(null);

  return (
    <div className="">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DailyAttendance />
        <EnrollmentGrowth />
        <RecentActivity />
      </div>

      {/* --- MODALS --- */}
      <AnnouncementModal 
       isOpen={activeModal === 'announcement'} 
        onClose={() => setActiveModal(null)}
      />
      
      <InstructorModal 
        isOpen={activeModal === 'instructor'} 
        onClose={() => setActiveModal(null)}
      />

      {/* --- FLOATING ACTION BUTTON (FAB) --- */}
      <div
        className="fixed bottom-10 right-10 flex flex-col items-center gap-3 z-[90]"
        onMouseEnter={() => setIsFabOpen(true)}
        onMouseLeave={() => setIsFabOpen(false)}
      >

        {/* Slide-up actions panel */}
        <div
          className={`
      bg-white p-2.5 rounded-[24px] flex flex-col gap-2.5
      shadow-[0_8px_32px_rgba(0,0,0,0.18)]
      transition-all duration-300 origin-bottom
      ${isFabOpen
              ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
              : 'opacity-0 translate-y-3 scale-90 pointer-events-none'
            }
    `}
        >
          <div className="relative group/tip">
            <button
              onClick={() => { setActiveModal('announcement'); setIsFabOpen(false); }}
              className="group w-12 h-12 rounded-full bg-orange-50 hover:bg-[#F27121] flex items-center justify-center transition-all duration-200 hover:scale-110 cursor-pointer"
            >
              <Megaphone className="text-[#F27121] group-hover:text-white transition-colors" size={20} />
            </button>
            <span className="absolute right-14 top-1/2 -translate-y-1/2 bg-black/80 text-white text-[11px] px-2.5 py-1 rounded-md whitespace-nowrap opacity-0 group-hover/tip:opacity-100 transition-opacity pointer-events-none">
              Announcements
            </span>
          </div>

          <div className="relative group/tip">
            <button
              onClick={() => { setActiveModal('instructor'); setIsFabOpen(false); }}
              className="group w-12 h-12 rounded-full bg-blue-50 hover:bg-blue-600 flex items-center justify-center transition-all duration-200 hover:scale-110 cursor-pointer"
            >
              <Users className="text-blue-600 group-hover:text-white transition-colors" size={20} />
            </button>
            <span className="absolute right-14 top-1/2 -translate-y-1/2 bg-black/80 text-white text-[11px] px-2.5 py-1 rounded-md whitespace-nowrap opacity-0 group-hover/tip:opacity-100 transition-opacity pointer-events-none">
              Instructors
            </span>
          </div>
        </div>

        {/* Main FAB — no onClick needed now */}
        <button
          className={`
      relative w-[52px] h-[52px] rounded-full flex items-center justify-center
      border border-white/20 cursor-pointer
      transition-all duration-250
      ${isFabOpen
              ? 'bg-[#F27121] shadow-[0_8px_28px_rgba(242,113,33,0.5)]'
              : 'bg-white shadow-[0_6px_24px_rgba(0,0,0,0.15)]'
            }
    `}
        >
          {isFabOpen && (
            <span className="absolute inset-[-6px] rounded-full border border-[#F27121]/30 animate-ping" />
          )}
          <Zap
            className={`transition-all duration-250 ${isFabOpen ? 'text-white rotate-[15deg]' : 'text-[#F27121]'}`}
            size={22}
            strokeWidth={2.5}
          />
        </button>
        
      </div>
    </div>
  );
};

export default LmsAttendanceAndOthers;