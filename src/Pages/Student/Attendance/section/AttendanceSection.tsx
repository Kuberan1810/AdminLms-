import { useState, useEffect } from "react";
import { ArrowLeft2, ArrowRight2, Filter } from "iconsax-react";
import { getAttendanceRecords, type AttendanceRecord } from "../../../../store/attendanceStore";

// ---------------- Types ----------------
type ClassItem = {
  id: string;
  course: string;
  time: string;
  status: "Present" | "Absent" | "Upcoming";
};

type DayCell = {
  date: number | null;
  classes: ClassItem[];
  isCurrentMonth: boolean;
  isToday: boolean;
};

// ---------------- Mock Data ----------------
const courses = [
  "AM101 - AI / ML Frontier AI Engineer",
  "SS102 - System and Software Systems",
  "QI103 - Quantum Intelligence",
];

// Static mock classes (existing)
const staticClasses: Record<number, ClassItem[]> = {
  5: [
    { id: "static-1", course: courses[0], time: "10:00AM - 12:00PM", status: "Absent" },
    { id: "static-2", course: courses[2], time: "05:30PM - 06:30PM", status: "Present" },
  ],
  9: [
    { id: "static-3", course: courses[1], time: "06:00AM - 08:00AM", status: "Present" },
  ],
  24: [
    { id: "static-4", course: courses[0], time: "10:00AM - 12:00PM", status: "Present" },
  ],
};

// Format ISO timestamp to 12-hour time (e.g., "2026-02-26T14:04:48" → "2:04PM")
function formatTime(isoStr: string): string {
  try {
    const date = new Date(isoStr);
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${hours}:${minutes}${ampm}`;
  } catch {
    return isoStr;
  }
}

// Convert stored records to ClassItem[] for the calendar
function getStoredClasses(year: number, month: number): Record<number, ClassItem[]> {
  const records = getAttendanceRecords();
  const result: Record<number, ClassItem[]> = {};

  records.forEach((record: AttendanceRecord, idx: number) => {
    const [rYear, rMonth, rDay] = record.date.split("-").map(Number);
    if (rYear === year && rMonth - 1 === month) {
      const day = rDay;
      if (!result[day]) result[day] = [];

      // Format join_time and leave_time to readable 12-hour format
      const timeStr = record.join_time && record.leave_time
        ? `${formatTime(record.join_time)} - ${formatTime(record.leave_time)}`
        : record.duration_minutes
          ? `${record.duration_minutes} min`
          : "Live Class";

      result[day].push({
        id: `stored-${idx}`,
        course: record.course_name || courses[0],
        time: timeStr,
        status: record.status === "present" ? "Present" : "Absent",
      });
    }
  });

  return result;
}

// ---------------- Helpers ----------------
const formatMonthYear = (date: Date) =>
  date.toLocaleString("en-US", { month: "long", year: "numeric" });

const getDaysInMonth = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  return new Date(year, month + 1, 0).getDate();
};

const getFirstDayOfMonth = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  return new Date(year, month, 1).getDay();
};

// ---------------- Component ----------------
export default function AttendanceSection() {
  const [selectedCourses, setSelectedCourses] = useState<string[]>(courses);
  const [open, setOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [, setRefreshKey] = useState(0); // Force re-render on attendance update

  // Listen for attendance updates
  useEffect(() => {
    const handleUpdate = () => {
      setRefreshKey(prev => prev + 1);
      console.log("AttendanceSection refreshed from leave data");
    };

    window.addEventListener("attendance-updated", handleUpdate);
    return () => window.removeEventListener("attendance-updated", handleUpdate);
  }, []);

  // Month navigation
  const changeMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const d = new Date(prev);
      d.setMonth(prev.getMonth() + (direction === "next" ? 1 : -1));
      return d;
    });
  };

  // Toggle course checkbox
  const toggleCourse = (course: string) => {
    setSelectedCourses((prev) =>
      prev.includes(course)
        ? prev.filter((c) => c !== course)
        : [...prev, course]
    );
  };

  // Generate calendar data based on current month
  const generateCalendarData = (): DayCell[] => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const today = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    // Get stored attendance records for this month
    const storedClasses = getStoredClasses(currentYear, currentMonth);

    // Get days from previous month
    const prevMonth = new Date(currentYear, currentMonth - 1, 0);
    const daysInPrevMonth = prevMonth.getDate();

    const calendarDays: DayCell[] = [];

    // Add previous month's trailing days
    for (let i = firstDay - 1; i >= 0; i--) {
      calendarDays.push({
        date: daysInPrevMonth - i,
        classes: [],
        isCurrentMonth: false,
        isToday: false,
      });
    }

    // Add current month's days
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday =
        today.getDate() === day &&
        today.getMonth() === currentMonth &&
        today.getFullYear() === currentYear;

      // Merge static + stored classes for this day
      const classes: ClassItem[] = [
        ...(staticClasses[day] || []),
        ...(storedClasses[day] || []),
      ];

      calendarDays.push({
        date: day,
        classes,
        isCurrentMonth: true,
        isToday,
      });
    }

    // Add next month's leading days to fill the grid
    const remainingCells = 42 - calendarDays.length; // 6 rows × 7 days = 42 cells
    for (let day = 1; day <= remainingCells; day++) {
      calendarDays.push({
        date: day,
        classes: [],
        isCurrentMonth: false,
        isToday: false,
      });
    }

    return calendarDays;
  };

  const calendarData = generateCalendarData();

  // Calculate attendance stats for each course
  const getAttendanceStats = (course: string) => {
    let totalClasses = 0;
    let attendedClasses = 0;

    calendarData.forEach((cell) => {
      const courseClasses = cell.classes.filter((c) => c.course === course);
      totalClasses += courseClasses.length;
      attendedClasses += courseClasses.filter(
        (c) => c.status === "Present"
      ).length;
    });

    const percentage = totalClasses > 0 ? Math.round((attendedClasses / totalClasses) * 100) : 0;
    return { totalClasses, attendedClasses, percentage };
  };

  return (
    <section className="w-full min-h-screen">

      {/* Courses Summary */}
      <div className="px-3 py-3 sm:px-4 sm:py-4 md:px-5 md:py-5 lg:px-6 lg:py-6 space-y-3 sm:space-y-4 boxStyle mb-4 sm:mb-5">
        <h2 className="text-base sm:text-lg md:text-xl font-semibold">Courses</h2>

        <div className="grid gap-5 xl:grid-cols-3 md:grid-cols-2 max-md:grid-flow-col max-md:auto-cols-[80vw] max-md:overflow-x-auto max-md:snap-x max-md:snap-mandatory scrollbar-hide p-2 ">
          {courses.map((course, i) => {
            const stats = getAttendanceStats(course);
            return (
              <div
                key={i}
                className="boxStyle"
              >
                <div className="flex justify-between text-xs sm:text-sm md:text-base mb-2 text-gray-700 dark:text-gray-300">
                  <span className="text-base sm:text-lg font-semibold text-[#333] dark:text-gray-300">{course}</span>
                </div>
                {/* ===== Progress ===== */}
                <div>
                  <div className="flex justify-end mb-2.5">
                    <p className="text-xs border border-[#F2EEF4] rounded-full w-fit text-[#626262] px-3 py-1 dark:text-gray-300">
                      {stats.percentage}%
                    </p>
                  </div>

                  <div className="h-1 bg-gray-200 rounded mb-2.5">
                    <div
                      className="h-1 orange rounded"
                      style={{ width: `${stats.percentage}%` }}
                    />
                  </div>
                </div>

                <div className=" text-[#626262] dark:text-gray-300">
                  {stats.attendedClasses} of {stats.totalClasses} classes attended
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="boxStyle overflow-hidden">

        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-4 sm:px-5 sm:py-4 lg:px-6 border-b border-[#F0F0F0]">
          <div className="flex items-center gap-3">
            <button
              onClick={() => changeMonth("prev")}
              className="w-9 h-9 flex items-center justify-center rounded-xl bg-[#FFF7F0] dark:border-gray-600 dark:hover:bg-[#FFEBD7] transition-colors cursor-pointer"
            >
              <ArrowLeft2 size="18" variant="Bold"  color="#F67300" />
            </button>

            <span className="text-base sm:text-lg font-semibold text-[#333] dark:text-gray-300 min-w-[160px] text-center">
              {formatMonthYear(currentDate)}
            </span>

            <button
              onClick={() => changeMonth("next")}
              className="w-9 h-9 flex items-center justify-center rounded-xl bg-[#FFF7F0] hover:bg-[#FFEBD7] transition-colors cursor-pointer"
            >
              <ArrowRight2 size="18" variant="Bold"  color="#F67300" />
            </button>
          </div>

          <div className="flex items-center gap-4">
            {/* Inline Legend */}
            <div className="hidden md:flex items-center gap-4 text-xs font-medium text-[#808080]">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E]" /> Present
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" /> Absent
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#F67300]" /> Today
              </span>
            </div>

            {/* Course Filter */}
            <div className="relative">
              <button
                onClick={() => setOpen(!open)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 max-h-[35px] cursor-pointer
                  ${open
                    ? "bg-[#F67300] text-white"
                    : "bg-[#FFF7F0] text-[#F67300] border border-[#F6730030] hover:border-[#F67300]"
                  }`}
              >
                <Filter size="18" variant={open ? "Bold" : "Linear"}  color={open ? "#fff" : "#F67300"} />
                <span>Filter Courses</span>
                <ArrowRight2
                  size="14"
                  className={`transition-transform duration-200 ${open ? "rotate-90" : ""}`} />
              </button>

              {open && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
                  <div className="absolute mt-3 w-[320px] sm:w-[340px] bg-white dark:bg-[#1E293B] border border-[#E5E7EB] dark:border-gray-700 shadow-xl">
                    <div className="px-4 py-3 bg-[#FAFAFA] border-b border-[#F0F0F0] dark:bg-[#1E293B] dark:border-gray-600">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-[#333] dark:text-gray-300">Select Courses</span>
                        <button
                          onClick={() => {
                            if (selectedCourses.length === courses.length) {
                              setSelectedCourses([]);
                            } else {
                              setSelectedCourses([...courses]);
                            }
                          }}
                          className="text-xs text-[#F67300] font-semibold hover:underline cursor-pointer"
                        >
                          {selectedCourses.length === courses.length ? "Deselect All" : "Select All"}
                        </button>
                      </div>
                    </div>
                    <div className="p-2 space-y-1">
                      {courses.map((course) => {
                        const isSelected = selectedCourses.includes(course);
                        const code = course.split(" - ")[0];
                        const name = course.split(" - ")[1] || course;
                        return (
                          <label
                            key={course}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-150
                              ${isSelected ? "bg-[#FFF7F0] border border-[#F6730020]" : "hover:bg-[#F9FAFB] border border-transparent"}`}
                          >
                            <div className={`w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 transition-all duration-150
                              ${isSelected ? "bg-[#F67300] shadow-sm" : "border-2 border-[#D1D5DB]"}`}>
                              {isSelected && (
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                  <path d="M2.5 6L5 8.5L9.5 3.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              )}
                            </div>
                            <input type="checkbox" checked={isSelected} onChange={() => toggleCourse(course)} className="hidden" />
                            <div className="flex items-center gap-2 min-w-0">
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md flex-shrink-0 ${isSelected ? "bg-[#F67300] text-white" : "bg-[#F0F0F0] text-[#666]"}`}>{code}</span>
                              <span className="text-sm text-[#333] truncate">{name}</span>
                            </div>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Day Names Header */}
        <div className="grid grid-cols-7 bg-[#FAFAFA] dark:bg-[#1E293B] ">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d, i) => (
            <div key={d} className={`text-center py-2.5 sm:py-3 text-[10px] sm:text-xs md:text-sm font-semibold tracking-wide uppercase ${i === 0 ? "text-[#EF4444]" : "text-[#888] dark:text-gray-400"}`}>
              {d}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 border-t border-[#E5E7EB] dark:border-gray-600">
          {calendarData.map((cell, idx) => {
            const filteredClasses = cell.classes.filter(c => selectedCourses.includes(c.course));
            const hasPresent = filteredClasses.some(c => c.status === "Present");
            const hasAbsent = filteredClasses.some(c => c.status === "Absent");

            return (
              <div
                key={idx}
                className={`
                  min-h-[65px] sm:min-h-[90px] md:min-h-[120px] lg:min-h-[150px]
                  p-1.5 sm:p-2 md:p-2.5 lg:p-3
                  border-r border-b border-[#F0F0F0]
                  transition-all duration-150
                  ${!cell.isCurrentMonth ? "bg-[#FAFAFA] dark:bg-[#1E293B]" : "bg-white dark:bg-[#2D3748]"}
                  ${cell.isToday ? "bg-[#FFF8F2] " : ""}
                `}
              >
                {/* Date + Status Dots */}
                <div className="flex items-start justify-between mb-1">
                  {cell.date && (
                    <span className={`
                      text-xs sm:text-sm font-semibold leading-none
                      ${!cell.isCurrentMonth
                        ? "text-[#D1D5DB] "
                        : cell.isToday
                          ? "text-white bg-[#F67300] w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-[10px] sm:text-xs shadow-sm"
                          : "text-[#333] dark:text-gray-300"
                      }
                    `}>
                      {cell.date}
                    </span>
                  )}

                  {cell.isCurrentMonth && filteredClasses.length > 0 && (
                    <div className="flex gap-0.5 mt-0.5">
                      {hasPresent && <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#22C55E]" />}
                      {hasAbsent && <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#EF4444]" />}
                    </div>
                  )}
                </div>

                {/* Class Tags */}
                <div className="space-y-0.5 sm:space-y-1">
                  {filteredClasses.map((cls) => (
                    <div
                      key={cls.id}
                      className={`rounded-md px-1 sm:px-1.5 md:px-2 py-0.5 md:py-1 text-[7px] sm:text-[9px] md:text-[10px] border-l-[3px] ${cls.status === "Present"
                        ? "bg-[#F0FDF4] text-[#166534] border-[#22C55E]"
                        : cls.status === "Absent"
                          ? "bg-[#FEF2F2] text-[#991B1B] border-[#EF4444]"
                          : "bg-[#FFF7ED] text-[#9A3412] border-[#F97316]"
                        }`}
                    >
                      <div className="font-semibold leading-tight">
                        {cls.course.split(" ")[0]}
                      </div>
                      <div className="hidden sm:block leading-tight opacity-80">{cls.status}</div>
                      <div className="hidden md:block text-[6px] sm:text-[8px] md:text-[9px] leading-tight opacity-60">{cls.time}</div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile Legend */}
        <div className="md:hidden flex items-center justify-center gap-5 py-3 border-t border-[#F0F0F0]">
          <span className="flex items-center gap-1.5 text-xs text-[#808080] font-medium">
            <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E]" /> Present
          </span>
          <span className="flex items-center gap-1.5 text-xs text-[#808080] font-medium">
            <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" /> Absent
          </span>
          <span className="flex items-center gap-1.5 text-xs text-[#808080] font-medium">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F67300]" /> Today
          </span>
        </div>
      </div>

    </section>
  );
}
