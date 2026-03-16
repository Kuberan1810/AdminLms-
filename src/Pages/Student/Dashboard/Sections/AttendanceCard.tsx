import { useState, useEffect } from "react";
import { ArrowLeft2, ArrowRight2 } from "iconsax-react";
import { getAttendanceCalendar } from "../../../../store/attendanceStore";

/* ===================== TYPES ===================== */

type AttendanceStatus = "present" | "absent" | "holiday" | "none";

/* ===================== STATIC FALLBACK ===================== */

// const staticAttendance: Record<string, AttendanceStatus> = {
//   "2026-01-14": "absent",
//   "2026-01-15": "present",
//   "2026-01-18": "absent",
// };

/* ===================== STYLES ===================== */

const STATUS_STYLES: Record<AttendanceStatus, string> = {
  present: "bg-[#DCFCE7] dark:bg-[#F6730050] text-[#3EA465] dark:text-green-400",
  absent: "bg-red-100 dark:bg-[#3D1A1A] text-red-600 dark:text-red-400",
  holiday: "bg-orange-100 dark:bg-[#F6730050] text-orange-600 dark:text-orange-400",
  none: "border border-[#E5E7EB] dark:border-[#3B3B3B] text-gray-500 dark:text-[#A3A3A3] ",
};

/* ===================== HELPERS ===================== */

const getDayName = (date: Date) =>
  date.toLocaleDateString("en-US", { weekday: "short" });

const formatDateKey = (date: Date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

/* ===================== COMPONENT ===================== */

const AttendanceCard = () => {
  const today = new Date();
  const [attendanceData, setAttendanceData] = useState<Record<string, AttendanceStatus>>(getAttendanceCalendar);

  const [currentDate, setCurrentDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );

  const [selectedDate, setSelectedDate] = useState(formatDateKey(today));

  // Listen for leave event and update calendar
  useEffect(() => {
    const handleUpdate = () => {
      setAttendanceData(getAttendanceCalendar());
      console.log("AttendanceCard calendar updated");
    };

    window.addEventListener("attendance-updated", handleUpdate);
    return () => window.removeEventListener("attendance-updated", handleUpdate);
  }, []);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const goToPrevMonth = () =>
    setCurrentDate(new Date(year, month - 1, 1));

  const goToNextMonth = () =>
    setCurrentDate(new Date(year, month + 1, 1));

  return (
    <div className="boxStyle">

      {/* ================= Header ================= */}
      <header className="flex  sm:flex-row sm:items-center justify-between gap-4">
        <h3 className="text-xl lg:text-2xl font-semibold text-primary dark:text-white">
          Attendance
        </h3>

        <div className="flex items-center gap-4">
          <span className="px-4 py-2 rounded-2xl bg-[#F6730050] text-[#F67300] font-semibold text-center leading-4 border border-[#F67300]">
            {today.toLocaleDateString("en-US", { weekday: "short" })}
            <p className="text-sm">{today.getDate()}</p>
          </span>

          <div className="text-sm text-[#808080] dark:text-[#A3A3A3]">
            {today.toLocaleDateString("en-GB")}
            <p className="text-primary dark:text-white font-semibold">
              {today.toLocaleDateString("en-US", { weekday: "long" })}
            </p>
          </div>
        </div>
      </header>

      {/* ================= Month Selector ================= */}
      <div className="flex items-center justify-center gap-3 sm:gap-4 mt-4">
        <button
          onClick={goToPrevMonth}
          className="p-1 bg-[#f6730010] dark:bg-[#f6730020] rounded cursor-pointer transition-colors"
        >
          <ArrowLeft2 size="20" variant="Bold"  color="#f67300" />
        </button>

        <p className="font-medium text-sm sm:text-base dark:text-white">
          {currentDate.toLocaleString("default", {
            month: "short",
            year: "numeric",
          })}
        </p>

        <button
          onClick={goToNextMonth}
          className="p-1 bg-[#f6730010] dark:bg-[#f6730020] rounded cursor-pointer transition-colors"
        >
          <ArrowRight2 size="20" variant="Bold"  color="#f67300" />
        </button>
      </div>

      {/* ================= Calendar ================= */}
      <div className="grid grid-cols-7 gap-2 sm:gap-3.5 mt-5 text-center text-sm ">
        {Array(firstDayOfMonth)
          .fill(null)
          .map((_, i) => (
            <div key={i} />
          ))}

        {daysArray.map((day) => {
          const dateObj = new Date(year, month, day);
          const dateKey = formatDateKey(dateObj);

          const status = attendanceData[dateKey] ?? "none";
          const isToday = dateKey === formatDateKey(today);
          const isSunday = dateObj.getDay() === 0;

          const sundayStyle =
            isSunday && status === "none"
              ? "bg-[#FDEFE3] dark:bg-[#F6730030] text-gray-700 dark:text-[#E0E0E0] border-none"
              : "";

          return (
            <button
              key={day}
              onClick={() => setSelectedDate(dateKey)}
              className={`
                rounded-xl
                py-1.5 px-2
                min-w-[44px] min-h-[44px]
                flex flex-col items-center justify-center
                transition
                ${STATUS_STYLES[status]}
                ${sundayStyle}
                ${isToday && status === "none" ? "ring-1 ring-[#F67300] bg-[#FFEDDD] dark:bg-[#3D2B20] font-semibold" : ""}
                ${selectedDate === dateKey ? "scale-105" : ""}
              `}
            >
              <span className={`text-xs sm:text-sm font-semibold ${status !== "none" ? "text-inherit" : "text-[#333333] dark:text-white"}`}>
                {getDayName(dateObj)}
              </span>
              <span className={`text-xs font-medium ${status !== "none" ? "text-inherit opacity-90" : "text-[#626262] dark:text-[#A3A3A3]"}`}>
                {day}
              </span>
            </button>
          );
        })}
      </div>

      {/* ================= Legend ================= */}
      <footer className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-6 text-sm font-semibold text-[#626262] dark:text-[#A3A3A3]">
        <Legend color="bg-green-500" label="Present" />
        <Legend color="bg-red-500" label="Absent" />
        <Legend color="bg-orange-100 dark:bg-[#F6730030]" label="Holiday" />
      </footer>
    </div>
  );
};

/* ===================== LEGEND ITEM ===================== */

const Legend = ({ color, label }: { color: string; label: string }) => (
  <div className="flex items-center gap-2">
    <span className={`w-3 h-3 rounded-sm ${color}`} />
    {label}
  </div>
);

export default AttendanceCard;
