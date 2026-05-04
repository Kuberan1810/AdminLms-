import React from 'react';
import { Calendar } from 'lucide-react';

// --- Types ---
interface ScheduleItem {
  time: string;
  period: string;
  title: string;
  instructor: string;
  batch: string;
  status: 'join' | 'countdown' | 'upcoming';
  countdownText?: string;
  accentColor: string;
}

interface CourseMetric {
  name: string;
  students: number;
  progress: number; // 0 to 100
  barColor: string;
}

// --- Mock Data ---
const scheduleData: ScheduleItem[] = [
  {
    time: "09:00",
    period: "AM",
    title: "Advanced Data Structures",
    instructor: "Dr. Sarah Jenkins",
    batch: "Batch A24",
    status: 'join',
    accentColor: "border-orange-400"
  },
  {
    time: "11:30",
    period: "AM",
    title: "UI/UX Design Fundamentals",
    instructor: "Marcus Thorne",
    batch: "Batch D09",
    status: 'countdown',
    countdownText: "Starts in 2h",
    accentColor: "border-blue-200"
  },
  {
    time: "02:00",
    period: "PM",
    title: "Business Management 101",
    instructor: "Elena Rodriguez",
    batch: "Batch B12",
    status: 'upcoming',
    accentColor: "border-slate-200"
  }
];

const topCourses: CourseMetric[] = [
  { name: "AI Fundamentals", students: 60, progress: 75, barColor: "bg-emerald-400" },
  { name: "Python Basics", students: 46, progress: 60, barColor: "bg-blue-500" },
  { name: "UI/UX Principles", students: 40, progress: 55, barColor: "bg-purple-500" },
  { name: "Data Analytics", students: 40, progress: 55, barColor: "bg-orange-500" },
  { name: "Data Analytics", students: 40, progress: 55, barColor: "bg-orange-600" },
];

// --- Components ---

const ScheduleCard: React.FC<{ item: ScheduleItem }> = ({ item }) => {
  const getButtonStyles = () => {
    switch (item.status) {
      case 'join':
        return "bg-orange-500 text-white hover:bg-orange-600";
      case 'countdown':
        return "bg-slate-100 text-slate-500 cursor-default";
      case 'upcoming':
        return "bg-slate-100 text-slate-400 cursor-default";
    }
  };

  return (
    <div className="boxStyle flex items-center justify-between transition-all hover:shadow-md">
      <div className="flex items-center gap-6 ">
        <div className="flex flex-col items-center min-w-[60px]">
          <span className="text-lg font-bold text-slate-800 leading-none">{item.time}</span>
          <span className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-tighter">{item.period}</span>
        </div>
        
        <div className={`h-10 border-l-2 ${item.accentColor} rounded-full`}></div>
        
        <div className="flex flex-col">
          <h4 className="font-semibold text-[#0F172A] text-[16px]">{item.title}</h4>
          <p className="text-sm text-slate-400 font-medium">
            {item.instructor} · <span className="opacity-80">{item.batch}</span>
          </p>
        </div>
      </div>

      <button className={`px-6 py-2 rounded-xl text-sm font-bold transition-colors min-w-[110px] ${getButtonStyles()}`}>
        {item.status === 'join' && "Join"}
        {item.status === 'countdown' && item.countdownText}
        {item.status === 'upcoming' && "Upcoming"}
      </button>
    </div>
  );
};

const LmsCourses: React.FC = () => {
  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Section: Today's Schedule */}
        <div className="lg:col-span-7 boxStyle">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-[24px ] font-bold text-[#0F172A]">Today's Schedule</h2>
            <button className="text-orange-500 text-sm font-bold hover:underline flex items-center gap-2 cursor-pointer">
              View Calendar
            </button>
          </div>
          
          <div className="flex flex-col gap-4">
            {scheduleData.map((item, idx) => (
              <ScheduleCard key={idx} item={item} />
            ))}
          </div>
        </div>
        

        {/* Right Section: Top Courses */}
        <div className="lg:col-span-5 h-full  boxStyle">
          <h2 className="text-2xl font-bold text-slate-900 mb-10">Top Courses</h2>
          
          <div className="space-y-8">
            {topCourses.map((course, idx) => (
              <div key={idx} className="flex flex-col gap-3">
                <div className="flex justify-between items-end">
                  <span className="font-bold text-slate-800 text-[15px]">{course.name}</span>
                  <span className="text-slate-400 text-xs font-medium">{course.students} students</span>
                </div>
                <div className="w-full bg-slate-100 h-[7px] rounded-full overflow-hidden">
                  <div 
                    className={`${course.barColor} h-full rounded-full transition-all duration-700`} 
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default LmsCourses;