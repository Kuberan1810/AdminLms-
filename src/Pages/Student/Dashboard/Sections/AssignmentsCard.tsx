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
  "In progress": "bg-[#FFEDDE] text-[#F67300]",
  Completed: "bg-[#E5F1E8] text-[#2A9A46]",
  "Over due": "bg-[#FEE2E2] text-[#FF1313]",
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

      let className = "bg-white border border-[#E5E7EB] text-gray-600";
      const dayIndex = d.getDay();
      const isToday = d.getTime() === today.getTime();

      if (isToday) className = "text-[#F67300] bg-[#FFEAD8] border";
      else if (dayIndex === 0) className = "bg-[#FFFD3720] text-primary";
      else if (d < today) {
        if (attendanceMap[dKeyLocal] === "present") {
          className = "text-[#3EA465] bg-[#3EA46510]";
        } else if (attendanceMap[dKeyLocal] === "absent") {
          className = "text-[#CE1919] bg-[#CE191910]";
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
          <h3 className="text-xl lg:text-2xl font-semibold text-primary">
            Assignments
          </h3>
          <p className="text-[#626262] md:text-xl text-base">{headerDate}</p>
        </div>
        <div className="md:flex hidden">
          {/* <BtnCom label="View all" onClick={() => navigate("/student/assignments")} /> */}
          <BtnCom label="View all" />
        </div>

        {/* Mobile-only arrows in header */}
        <div className="flex md:hidden gap-2">
          <button onClick={() => changeWeek("prev")} className="iconStyle cursor-pointer">
            <ArrowLeft2 size="16" color="#626262" />
          </button>
          <button onClick={() => changeWeek("next")} className="iconStyle cursor-pointer">
            <ArrowRight2 size="16" color="#626262" />
          </button>
        </div>
      </div>

      {/* ================= Desktop Dates (with arrows) ================= */}
      <div className="md:flex hidden items-center gap-3 mb-5">
        <button onClick={() => changeWeek("prev")} className="iconStyle cursor-pointer">
          <ArrowLeft2 size="20" color="#626262" />
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
          <ArrowRight2 size="20" color="#626262" />
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
                : "text-[#808080]"
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
            <div className="p-4 bg-[#FFF0EF] rounded-full mb-4">
              <Note1 size={32} color="#EF7A02" />
            </div>
            <p className="text-[#626262] text-base font-medium">No Assignments Found</p>
            <p className="text-[#989898] text-sm mt-1">There are no assignments scheduled for this date.</p>
          </div>
        ) : (
          filteredAssignments.map(item => (
            /* 🔒 WRAPPER ONLY FOR MOBILE — DESKTOP CARD UNTOUCHED */
            <div key={item.id} className="max-lg:block">
              <div
                onClick={() => navigate(`/student/assignment/${assignmentId}`)}
                className="boxStyle flex flex-col md:flex-row justify-between items-center bg-[#FAFAFA]! cursor-pointer"
              >
                <div className="max-lg:w-full">
                  <h4 className="md:text-lg text-base   font-semibold text-primary mb-2.5">
                    {item.title}
                  </h4>
                  <div className="flex flex-col md:flex-row justify-center gap-5 ">
                    <div className="flex items-center gap-2 text-[#626262] text-sm">
                      <div className="iconStyle">
                        <Calendar size="16" color="#626262" />
                      </div>
                      <span>Due date: {item.dueDate}</span>
                    </div>

                    <div className="flex items-center gap-2 text-[#626262] text-sm">
                      <div className="iconStyle">
                        <Clock size="16" color="#626262" />
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
