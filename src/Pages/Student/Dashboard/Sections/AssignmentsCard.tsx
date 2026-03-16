import { useMemo, useState, useEffect } from "react";
import { Clock, ArrowLeft2, ArrowRight2, Calendar, Note1 } from "iconsax-react";
import BtnCom from "../../../../Components/Student/BtnCom";
import { useNavigate, useParams } from "react-router-dom";
import { getAttendanceCalendar } from "../../../../store/attendanceStore";

/* ===================== TYPES ===================== */

type Status = "In progress" | "Completed" | "Over due";

interface Assignment {
  id: number;
  title: string;
  date: string;
  dueDate: string;
  dueTime: string;
  status: Status;
}

/* ===================== DUMMY DATA ===================== */

const assignments: Assignment[] = [
  // {
  //   id: 1,
  //   title: "AM101 - AI / ML Frontier Ai Engineer",
  //   date: "2026-02-01",
  //   dueDate: "Jan 15, 26",
  //   dueTime: "9:00 - 10:00 am",
  //   status: "In progress",
  // },
  // {
  //   id: 2,
  //   title: "SS102 - System and Software System Pro",
  //   date: "2026-02-01",
  //   dueDate: "Jan 15, 26",
  //   dueTime: "9:00 - 10:00 am",
  //   status: "Completed",
  // },
  // {
  //   id: 3,
  //   title: "SS102 - System and Software System Pro",
  //   date: "2026-02-01",
  //   dueDate: "Jan 16, 26",
  //   dueTime: "9:00 - 10:00 am",
  //   status: "In progress",
  // },
  // {
  //   id: 4,
  //   title: "AM101 - AI / ML Frontier Ai Engineer",
  //   date: "2026-02-01",
  //   dueDate: "Jan 14, 26",
  //   dueTime: "9:00 - 10:00 am",
  //   status: "Over due",
  // },
];

/* ===================== STATUS STYLE ===================== */

const statusStyle: Record<Status, string> = {
  "In progress": "bg-[#FFEDDE] dark:bg-[#3D2B20] text-[#F67300] dark:text-orange-400",
  Completed: "bg-[#E5F1E8] dark:bg-[#1C2F23] text-[#2A9A46] dark:text-green-400",
  "Over due": "bg-[#FEE2E2] dark:bg-[#3D1A1A] text-[#FF1313] dark:text-red-400",
};

/* ===================== COMPONENT ===================== */

function AssignmentsCard() {
  const navigate = useNavigate();
  const { assignmentId } = useParams();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [weekDate, setWeekDate] = useState(today);
  const [selectedDate, setSelectedDate] = useState(today);
  const [filter, setFilter] = useState<"All" | Status>("All");
  const [attendanceMap, setAttendanceMap] = useState<Record<string, "present" | "absent">>({});

  // Fetch initial attendance on mount
  useEffect(() => {
    setAttendanceMap(getAttendanceCalendar());

    const handleUpdate = () => {
      setAttendanceMap(getAttendanceCalendar());
    };

    window.addEventListener("attendance-updated", handleUpdate);
    return () => window.removeEventListener("attendance-updated", handleUpdate);
  }, []);

  const headerDate = selectedDate.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const weekDays = useMemo(() => {
    const start = new Date(weekDate);
    start.setDate(start.getDate() - start.getDay());

    return Array.from({ length: 7 }).map((_, i) => {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      d.setHours(0, 0, 0, 0);

      const dKeyLocal = new Date(d.getTime() - d.getTimezoneOffset() * 60000)
        .toISOString()
        .split("T")[0]; // "YYYY-MM-DD" local format for lookup

      let className = "bg-white dark:bg-[#1E1E1E] border border-[#E5E7EB] dark:border-[#3B3B3B] text-gray-600 dark:text-[#A3A3A3]";
      const dayIndex = d.getDay();
      const isToday = d.getTime() === today.getTime();

      if (isToday) className = "text-[#F67300] bg-[#FFEAD8] dark:bg-[#3D2B20] border";
      else if (dayIndex === 0) className = "bg-[#FFFD3720] text-primary";
      else if (d < today) {
        if (attendanceMap[dKeyLocal] === "present") {
          className = "text-[#3EA465] bg-[#3EA46510] dark:bg-[#3EA46520]";
        } else if (attendanceMap[dKeyLocal] === "absent") {
          className = "text-[#CE1919] bg-[#CE191910] dark:bg-[#CE191920]";
        }
      }

      return {
        dateObj: d,
        dateKey: d.toISOString().split("T")[0],
        day: d.toLocaleDateString("en-US", { weekday: "short" }),
        date: d.getDate(),
        className,
      };
    });
  }, [weekDate, today, attendanceMap]);

  const filteredAssignments = assignments.filter(a => {
    const matchDate = a.date === selectedDate.toISOString().split("T")[0];
    const matchStatus = filter === "All" || a.status === filter;
    return matchDate && matchStatus;
  });

  const changeWeek = (type: "prev" | "next") => {
    const d = new Date(weekDate);
    d.setDate(d.getDate() + (type === "next" ? 7 : -7));
    setWeekDate(d);
  };

  return (
    <section className="boxStyle">
      {/* ================= Header ================= */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl lg:text-2xl font-semibold text-primary dark:text-white">
            Assignments
          </h3>
          <p className="text-[#626262] dark:text-[#A3A3A3] md:text-xl text-base">{headerDate}</p>
        </div>
        <div className="md:flex hidden">
          {/* <BtnCom label="View all" onClick={() => navigate("/student/assignments")} /> */}
          <BtnCom label="View all" />
        </div>

        {/* Mobile-only arrows in header */}
        <div className="flex md:hidden gap-2">
          <button onClick={() => changeWeek("prev")} className="iconStyle cursor-pointer">
            <ArrowLeft2 size="16" color="currentColor" />
          </button>
          <button onClick={() => changeWeek("next")} className="iconStyle cursor-pointer">
            <ArrowRight2 size="16" color="currentColor" />
          </button>
        </div>
      </div>

      {/* ================= Desktop Dates (with arrows) ================= */}
      <div className="md:flex hidden items-center gap-3 mb-5">
        <button onClick={() => changeWeek("prev")} className="iconStyle cursor-pointer">
          <ArrowLeft2 size="20" color="currentColor" />
        </button>

        <div className="flex gap-3 w-full justify-between overflow-x-auto scrollbar-hide">
          {weekDays.map(d => (
            <button
              key={d.dateKey}
              onClick={() => setSelectedDate(d.dateObj)}
              className={`md:min-w-16 min-w-10 px-0 md:px-3 py-2 rounded-xl text-center cursor-pointer ${d.className}`}
            >
              <p className="font-semibold md:text-base text-[10px]">{d.day}</p>
              <p className="font-semibold md:text-base text-[10px]">{d.date}</p>
            </button>
          ))}
        </div>

        <button onClick={() => changeWeek("next")} className="iconStyle cursor-pointer">
          <ArrowRight2 size="20" color="currentColor" />
        </button>
      </div>

      {/* ================= Mobile Dates (no arrows) ================= */}
      <div className="md:hidden flex flex-col justify-center gap-5">
        <div className="flex gap-3 w-full justify-between overflow-x-auto scrollbar-hide">
          {weekDays.map(d => (
            <button
              key={d.dateKey}
              onClick={() => setSelectedDate(d.dateObj)}
              className={`min-w-10 h-10 flex flex-col items-center px-0 mb-5 justify-center rounded-xl text-center cursor-pointer ${d.className}`}
            >
              <p className="font-semibold text-[10px]">{d.day}</p>
              <p className="font-semibold text-[10px]">{d.date}</p>
            </button>
          ))}
        </div>
      </div>

      {/* ================= Filters ================= */}
      <div className="flex justify-between md:justify-start  gap-2 mb-6 max-lg:overflow-x-auto max-lg:scrollbar-hide">
        {["All", "In progress", "Completed", "Over due"].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f as any)}
            className={`px-3 md:px-5 py-2.5 rounded-[10px]   font-medium border border-[#F2EEF4] cursor-pointer text-[12px] md:text-sm
              ${filter === f
                ? "bg-[#F67300] text-white border-[#F67300]"
                : "text-[#808080] dark:text-[#A3A3A3] dark:border-[#3B3B3B]"
              }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* ================= Assignment List ================= */}
      <div className={`space-y-5 ${filteredAssignments.length > 0 ? "h-100 overflow-y-auto scrollbar-hide" : ""}`}>
        {filteredAssignments.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <div className="p-4 bg-[#FFF0EF] dark:bg-[#3D2B2A] rounded-full mb-4">
              <Note1 size={32}  color="#EF7A02" />
            </div>
            <p className="text-[#626262] dark:text-[#E0E0E0] text-base font-medium">No Assignments Found</p>
            <p className="text-[#989898] dark:text-[#A3A3A3] text-sm mt-1">There are no assignments scheduled for this date.</p>
          </div>
        ) : (
          filteredAssignments.map(item => (
            /* 🔒 WRAPPER ONLY FOR MOBILE — DESKTOP CARD UNTOUCHED */
            <div key={item.id} className="max-lg:block">
              <div
                onClick={() => navigate(`/student/assignment/${assignmentId}`)}
                className="boxStyle flex flex-col md:flex-row justify-between items-center bg-[#FAFAFA]! dark:bg-[#2A2A2A]! border dark:border-[#3B3B3B] cursor-pointer transition-colors duration-300"
              >
                <div className="max-lg:w-full">
                  <h4 className="md:text-lg text-base   font-semibold text-primary mb-2.5">
                    {item.title}
                  </h4>
                  <div className="flex flex-col md:flex-row justify-center gap-5 ">
                    <div className="flex items-center gap-2 text-[#626262] dark:text-[#A3A3A3] text-sm">
                      <div className="iconStyle dark:bg-[#3B3B3B] dark:border-[#4B4B4B]">
                        <Calendar size="16" className="text-[#626262] dark:text-white"  color="currentColor" />
                      </div>
                      <span>Due date: {item.dueDate}</span>
                    </div>

                    <div className="flex items-center gap-2 text-[#626262] dark:text-[#A3A3A3] text-sm">
                      <div className="iconStyle dark:bg-[#3B3B3B] dark:border-[#4B4B4B]">
                        <Clock size="16" className="text-[#626262] dark:text-white"  color="currentColor" />
                      </div>
                      <span>Due time: {item.dueTime}</span>
                    </div>

                  </div>
                </div>

                <span
                  className={`px-7 py-2.5 rounded-full text-sm ${statusStyle[item.status]} max-lg:mt-4`}
                >
                  {item.status}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default AssignmentsCard;
