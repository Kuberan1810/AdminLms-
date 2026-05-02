import React from 'react';
import { Users, GraduationCap, Layout, CheckCircle, CheckCircle2, CopyCheck, ChevronLeft, ChevronRight, Download, Calendar } from 'lucide-react';

// ─── Gauge helpers ────────────────────────────────────────────────────────────
const G = { cx: 162.5, cy: 162.5, r: 130, sw: 28, gap: 10 };

function polar(deg: number, r: number): [number, number] {
  const rad = (deg - 180) * Math.PI / 180;
  return [G.cx + r * Math.cos(rad), G.cy + r * Math.sin(rad)];
}

function arc(s: number, e: number, r: number) {
  const [x1, y1] = polar(s, r);
  const [x2, y2] = polar(e, r);
  return `M ${x1.toFixed(2)} ${y1.toFixed(2)} A ${r} ${r} 0 ${e - s > 180 ? 1 : 0} 1 ${x2.toFixed(2)} ${y2.toFixed(2)}`;
}

function roundedSegment(s: number, e: number, r: number, sw: number, cr: number) {
  const ro = r + sw / 2;
  const ri = r - sw / 2;
  const roPath = ro - cr;
  const riPath = ri + cr;
  const dDeg = (cr / r) * (180 / Math.PI);
  const start = s + dDeg;
  const end = e - dDeg;
  if (end <= start) return "";
  const [x1, y1] = polar(start, roPath);
  const [x2, y2] = polar(end, roPath);
  const [x3, y3] = polar(end, riPath);
  const [x4, y4] = polar(start, riPath);
  const largeArc = end - start > 180 ? 1 : 0;
  return `M ${x1.toFixed(2)} ${y1.toFixed(2)} A ${roPath} ${roPath} 0 ${largeArc} 1 ${x2.toFixed(2)} ${y2.toFixed(2)} L ${x3.toFixed(2)} ${y3.toFixed(2)} A ${riPath} ${riPath} 0 ${largeArc} 0 ${x4.toFixed(2)} ${y4.toFixed(2)} Z`;
}

function buildGaugeArcs(segs: { pct: number; color: string; label: string }[]) {
  const total = segs.reduce((s, x) => s + x.pct, 0);
  const gapCount = segs.length - 1;
  const available = 180 - gapCount * G.gap;
  let cursor = 0;
  return segs.map((seg) => {
    const span = (seg.pct / total) * available;
    const start = cursor;
    const end = cursor + span;
    cursor = end + G.gap;
    return { ...seg, start, end };
  });
}
// ─────────────────────────────────────────────────────────────────────────────

import EnrollmentGrowth from './Components/EnrollmentGrowth';
import PerformingBatches from './Components/PerformingBatches';
import CoursePerformance from './Components/CoursePerformance';

export default function Reports() {
  const [isCalendarOpen, setIsCalendarOpen] = React.useState(false);
  const [currentDate, setCurrentDate] = React.useState(new Date(2026, 0, 12));
  const [startDate, setStartDate] = React.useState<Date | null>(new Date(2026, 0, 12));
  const [endDate, setEndDate] = React.useState<Date | null>(new Date(2026, 0, 17));

  React.useEffect(() => {
    const handleGlobalClick = () => {
      setIsCalendarOpen(false);
    };
    window.addEventListener('click', handleGlobalClick);
    return () => window.removeEventListener('click', handleGlobalClick);
  }, []);

  // KPI cards
  const kpis = [
    {
      title: "TOTAL STUDENTS", value: "540", subtext: "Unique active learners",
      change: "+12%", icon: <Users size={20} />, iconBg: "bg-[#F0F7FF] text-[#004370]",
    },
    {
      title: "TOTAL INSTRUCTORS", value: "30", subtext: "",
      change: "+12%", icon: <GraduationCap size={20} />, iconBg: "bg-[#FFF4ED] text-[#F6810C]",
    },
    {
      title: "ACTIVE BATCHES", value: "42", subtext: "",
      badge: "Live Now: 02", badgeColor: "bg-[#FFF4ED] text-[#EA580C] font-medium",
      icon: <CopyCheck size={20} />, iconBg: "bg-[#FDFBEB] text-[#BC8800]",
    },
    {
      title: "AVG. COMPLETION", value: "84.2%", subtext: "",
      badge: "Target: 80%", badgeColor: "bg-[#EFF6FF] text-[#2563EB] font-semibold",
      icon: <CheckCircle2 size={19} />, iconBg: "bg-[#F5F3FF] text-[#9333EA]", progress: 84.2,
    },
  ];

  // Bar chart
  const enrollmentData = [
    { day: "Mon", value: 40 },
    { day: "Tue", value: 25 },
    { day: "WED", value: 45 },
    { day: "THUR", value: 35 },
    { day: "FRI", value: 70, highlighted: true },
  ];

  // Gauge
  const assignmentSegs = [
    { label: "Completed", pct: 75, color: "#5B4DEA" },
    { label: "In progress", pct: 55, color: "#FEB000" },
    { label: "Overdue", pct: 30, color: "#EF4444" },
    { label: "Not Started", pct: 20, color: "#D1D5DB" },
  ];
  const gaugeArcs = buildGaugeArcs(assignmentSegs);

  // Pie chart
  const topBatches = [
    { name: "AM101-B01", value: 45, color: "#F6810C" },
    { name: "AM101-B05", value: 25, color: "#3B82F6" },
    { name: "QI202-B05", value: 30, color: "#EC4899" },
  ];

  // Course table
  const courses = [
    { name: "Advanced UX Research", batches: 12, students: 28, attendance: 94.2, engagement: "High" },
    { name: "Cloud Infrastructure", batches: 8, students: 38, attendance: 88.5, engagement: "Medium" },
    { name: "Digital Marketing Pro", batches: 15, students: 45, attendance: 76.0, engagement: "Low" },
  ];

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1);
  const dayOfWeek = (firstDay.getDay() + 6) % 7; 
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const monthName = currentDate.toLocaleString('en-US', { month: 'long', year: 'numeric' });

  const formatDateLabel = () => {
    if (startDate && endDate) {
      const sStr = startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      const eStr = endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      return `${sStr} – ${endDate.getMonth() === startDate.getMonth() ? endDate.getDate() : eStr}`;
    }
    if (startDate) {
      return startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
    return "Select dates";
  };

  const prevMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };
  const nextMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const handleDayClick = (day: number) => {
    const clickedDate = new Date(year, month, day);
    if (!startDate || (startDate && endDate)) {
      setStartDate(clickedDate);
      setEndDate(null);
    } else if (startDate && !endDate) {
      if (clickedDate < startDate) {
        setStartDate(clickedDate);
      } else {
        setEndDate(clickedDate);
      }
    }
  };

  return (
    <div className="p-6 bg-[#F8FAFC] dark:bg-slate-950 min-h-screen transition-colors duration-300" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* ── Header ── */}
      <div className="flex justify-end items-center gap-3 mb-6 relative">
        <div className="relative">
          <div
            onClick={(e) => {
              e.stopPropagation();
              setIsCalendarOpen(!isCalendarOpen);
            }}
            className="h-[40px] px-4 min-w-[150px] flex items-center justify-center gap-2 bg-white dark:bg-slate-900 border border-[#E2E8F0] dark:border-slate-800 rounded-xl text-[13px] font-medium text-[#464554] dark:text-slate-400 cursor-pointer select-none"
          >
            <Calendar size={15} />
            <span>{formatDateLabel()}</span>
            <ChevronRight size={13} className={`transition-transform duration-200 ${isCalendarOpen ? 'rotate-[-90deg]' : 'rotate-90'}`} />
          </div>

          {isCalendarOpen && (
            <div
              onClick={(e) => e.stopPropagation()}
              className="absolute top-full right-0 mt-2 bg-white dark:bg-slate-900 border border-[#E2E8F0] dark:border-slate-800 rounded-2xl p-6 shadow-2xl z-50 w-[330px] font-['Urbanist'] animate-in fade-in zoom-in-95 duration-150"
            >
              <div className="flex justify-between items-center mb-6">
                <span className="text-[18px] font-semibold text-[#0F172A] dark:text-white select-none">{monthName}</span>
                <div className="flex items-center gap-3">
                  <button onClick={prevMonth} className="p-1 text-[#64748B] hover:text-[#0F172A] dark:hover:text-white cursor-pointer select-none">
                    <ChevronLeft size={18} />
                  </button>
                  <button onClick={nextMonth} className="p-1 text-[#64748B] hover:text-[#0F172A] dark:hover:text-white cursor-pointer select-none">
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-7 text-center mb-3 select-none">
                {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((wd) => (
                  <span key={wd} className="text-[14px] font-normal text-[#475569] dark:text-slate-400 h-8 flex items-center justify-center">
                    {wd}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-7 text-center">
                {[...Array(dayOfWeek).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)].map((day, i) => {
                  if (day === null) {
                    return <div key={`empty-${i}`} className="h-9" />;
                  }

                  const currentDayDate = new Date(year, month, day);

                  let isSelected = false;
                  let isStart = false;
                  let isEnd = false;

                  if (startDate && endDate) {
                    isSelected = currentDayDate >= startDate && currentDayDate <= endDate;
                    isStart = currentDayDate.getTime() === startDate.getTime();
                    isEnd = currentDayDate.getTime() === endDate.getTime();
                  } else if (startDate) {
                    isStart = currentDayDate.getTime() === startDate.getTime();
                    isSelected = isStart;
                  }

                  const today = new Date();
                  const isToday = currentDayDate.getDate() === today.getDate() && 
                                  currentDayDate.getMonth() === today.getMonth() && 
                                  currentDayDate.getFullYear() === today.getFullYear();

                  return (
                    <div
                      key={day}
                      onClick={() => handleDayClick(day)}
                      className={`h-9 flex items-center justify-center text-[14px] cursor-pointer font-medium select-none transition-all ${
                        isSelected 
                          ? 'bg-[#F6810C] text-white' 
                          : isToday
                            ? 'border-2 border-[#F6810C] text-[#F6810C] hover:bg-[#FFF4ED] dark:hover:bg-[#F6810C]/10 rounded-full'
                            : 'text-[#1E293B] dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full'
                      } ${isStart ? 'rounded-l-full' : ''} ${isEnd ? 'rounded-r-full' : ''}`}
                    >
                      {day}
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 pt-3 border-t border-[#F1F5F9] dark:border-slate-800 flex justify-between items-center select-none font-['Urbanist']">
                <span className="text-[12px] font-medium text-[#64748B] dark:text-slate-400">Today: {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                <button 
                  onClick={() => {
                    const t = new Date();
                    setCurrentDate(t);
                    setStartDate(t);
                    setEndDate(t);
                    setIsCalendarOpen(false);
                  }}
                  className="text-[12px] font-bold text-[#F6810C] hover:underline cursor-pointer"
                >
                  Go to Today
                </button>
              </div>
            </div>
          )}
        </div>

        <button className="h-[40px] w-[140px] flex items-center justify-center gap-2 bg-[#F6810C] text-white rounded-xl text-[13px] font-bold hover:opacity-90 transition-all">
          <Download size={15} />
          Export
        </button>
      </div>

      {/* ── KPI row ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {kpis.map((k, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 rounded-2xl border border-[#F1F5F9] dark:border-slate-800 p-5 flex flex-col min-h-[160px] transition-colors duration-300">
            <div className="flex justify-between items-start mb-auto">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${k.iconBg}`}>{k.icon}</div>
              {k.change && <span className="bg-[#EBF7F5] dark:bg-[#EBF7F5]/10 text-[#16A34A] px-2.5 py-0.5 rounded-full text-[11px] font-bold leading-[16.5px] font-['Urbanist']">{k.change}</span>}
              {k.badge && <span className={`${k.badgeColor} px-2.5 py-0.5 rounded-full text-[11px] leading-none font-['Urbanist']`}>{k.badge}</span>}
            </div>
            <div className="mt-4">
              <p className="text-[#64748B] dark:text-slate-400 text-[12px] font-semibold uppercase tracking-[0.6px] leading-[16px] mb-1 font-['Urbanist']">{k.title}</p>
              <p className="text-[24px] font-bold text-[#0F172A] dark:text-white leading-[32px] font-['Urbanist']">{k.value}</p>
              <div className="min-h-[20px]">
                {k.subtext && <p className="text-[#94A3B8] dark:text-slate-500 text-[13px] font-normal leading-[18px] mt-0.5 font-['Urbanist']">{k.subtext}</p>}
                {k.progress != null && (
                  <div className="mt-3 h-1.5 w-full bg-[#F1F5F9] dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-[#F6810C] rounded-full" style={{ width: `${k.progress}%` }} />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Row 1: Enrollment Growth + Top Batches ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-4">
        <EnrollmentGrowth data={enrollmentData} />
        <PerformingBatches batches={topBatches} />
      </div>

      {/* ── Row 2: Assignment Breakdown + Attendance ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-6">

        {/* Assignment Breakdown */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl border border-[#F1F5F9] dark:border-slate-800 p-7 transition-colors duration-300">
          <h3 className="text-[20px] font-semibold text-[#0B1C30] dark:text-white leading-[28px] font-['Urbanist']">Assignment Breakdown</h3>
          <p className="text-[13px] text-[#64748B] dark:text-slate-400 mt-0.5 mb-8">Overall Assignment this week</p>

          <div className="flex flex-col md:flex-row items-center gap-20">
            {/* Gauge */}
            <div className="relative flex-shrink-0" style={{ width: 325, height: 175 }}>
              <svg width="325" height="175" viewBox="0 0 325 175" style={{ overflow: 'visible' }}>
                {/* Outer Thin Grey Track */}
                <path d={arc(0, 180, G.r + 30)} fill="none" className="stroke-[#F1F5F9] dark:stroke-slate-800" strokeWidth="8" strokeLinecap="round" />

                {/* Inner Grey Track */}
                <path d={roundedSegment(0, 180, G.r, G.sw, 6)} className="fill-[#E5E7EB] stroke-[#E5E7EB] dark:fill-slate-800 dark:stroke-slate-800" strokeWidth="12" strokeLinejoin="round" />

                {/* Segments */}
                {gaugeArcs.map(a => (
                  <path
                    key={a.label}
                    d={roundedSegment(a.start, a.end, G.r, G.sw, 6)}
                    fill={a.color}
                    stroke={a.color}
                    strokeWidth="12"
                    strokeLinejoin="round"
                  />
                ))}
              </svg>
              <div className="absolute inset-x-0 flex flex-col items-center" style={{ bottom: 10 }}>
                <span className="text-[24px] font-normal text-[#64748B] dark:text-slate-400 leading-none font-['Urbanist']">Total</span>
                <span className="text-[40px] font-semibold text-[#111111] dark:text-white leading-none font-['Urbanist']">10</span>
              </div>
            </div>

            {/* Legend */}
            <div className="flex-1 w-full space-y-4">
              {assignmentSegs.map(seg => (
                <div key={seg.label} className="flex justify-between items-center">
                  <div className="flex items-center gap-2.5">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: seg.color }} />
                    <span className="text-[20px] font-medium text-[#475569] dark:text-slate-400 leading-[18px] font-['Urbanist']">{seg.label}</span>
                  </div>
                  <span className="text-[16px] font-semibold text-[#0F172A] dark:text-white leading-[18px] font-['Urbanist']">{seg.pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Attendance */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-3xl border border-[#F1F5F9] dark:border-slate-800 p-7 transition-colors duration-300">
          <h3 className="text-[20px] font-semibold text-[#0B1C30] dark:text-white leading-[28px] font-['Urbanist'] mb-6">Attendance</h3>

          <div className="flex flex-col items-center">
            <div className="relative w-44 h-44 mb-8">
              <svg viewBox="0 0 100 100" className="w-full h-full" style={{ transform: 'rotate(-90deg)' }}>
                <circle cx="50" cy="50" r="44" fill="none" className="stroke-[#E5E7EB] dark:stroke-slate-800" strokeWidth="5" />
                <circle cx="50" cy="50" r="44" fill="none" stroke="#D946EF" strokeWidth="5"
                  strokeDasharray={`${(45 / 100) * 2 * Math.PI * 44} ${2 * Math.PI * 44}`}
                  strokeLinecap="round" />
                <circle cx="50" cy="50" r="33" fill="none" className="stroke-[#E5E7EB] dark:stroke-slate-800" strokeWidth="5" />
                <circle cx="50" cy="50" r="33" fill="none" stroke="#22C55E" strokeWidth="5"
                  strokeDasharray={`${(25 / 100) * 2 * Math.PI * 33} ${2 * Math.PI * 33}`}
                  strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="w-[42px] h-[42px] bg-white dark:bg-slate-800 rounded-full flex items-center justify-center border border-[#F1F5F9] dark:border-slate-700"
                  style={{
                    boxShadow: '0px 1px 4px 0px rgba(0, 0, 0, 0.25), inset 0px 2px 10px 0px rgba(167, 180, 198, 0.34)'
                  }}
                >
                  <Users size={20} className="text-[#94A3B8] dark:text-slate-500" />
                </div>
              </div>
            </div>

            <div className="flex justify-between w-full px-4">
              {[
                { label: "Students", value: "45%", color: "#D946EF" },
                { label: "Instructor", value: "25%", color: "#22C55E" },
              ].map(item => (
                <div key={item.label} className="text-center">
                  <div className="flex items-center justify-center gap-2.5 mb-2">
                    <div className="w-3 h-3 rounded-full" style={{ background: item.color }} />
                    <span className="text-[16px] font-medium text-[#475569] dark:text-slate-400 font-['Urbanist']">{item.label}</span>
                  </div>
                  <p className="text-[20px] font-semibold text-[#0F172A] dark:text-white font-['Urbanist'] leading-tight">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Course Performance Table ── */}
      <CoursePerformance courses={courses} />

    </div>
  );
}
