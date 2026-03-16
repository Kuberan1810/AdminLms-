import { useMemo, useState } from "react";
import { ArrowLeft2, ArrowRight2 } from "iconsax-react";
import { useSearchParams } from "react-router-dom";
import BtnCom from "../../../../Components/Student/BtnCom";
import InstructorScheduleCard from "./InstructorScheduleCard";
import { useSchedule } from "../../../../context/InstructorNotification/ScheduleContext";

/* ================= HELPERS ================= */

const toDateKey = (d: Date) =>
    d.toLocaleDateString("en-CA"); // ✅ SAFE YYYY-MM-DD

/* ================= COMPONENT ================= */

const InstructorUpcomingSchedule = () => {
    const { schedules } = useSchedule();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [weekDate, setWeekDate] = useState(today);
    const [selectedDate, setSelectedDate] = useState(today);

    const headerDate = selectedDate.toLocaleDateString("en-US", {
        weekday: "long",
        day: "numeric",
        month: "short",
        year: "numeric",
    });

    /* ===== WEEK DAYS ===== */
    const weekDays = useMemo(() => {
        const start = new Date(weekDate);
        start.setDate(start.getDate() - start.getDay());

        return Array.from({ length: 7 }).map((_, i) => {
            const d = new Date(start);
            d.setDate(start.getDate() + i);
            d.setHours(0, 0, 0, 0);

            const isToday = d.getTime() === today.getTime();
            const dayIndex = d.getDay();

            let className =
                "bg-white dark:bg-transparent border border-[#E5E7EB] dark:border-[#363636] text-gray-600 dark:text-[#A3A3A3]";

            if (isToday) className = "text-[#F67300] bg-[#FFEAD8] dark:bg-transparent border dark:border-[#F67300]";
            else if (dayIndex === 0) className = "bg-[#FFF5F5] dark:bg-transparent text-[#DC2626] border border-transparent dark:border-[#363636]";

            return {
                dateObj: d,
                dateKey: toDateKey(d),
                day: d.toLocaleDateString("en-US", { weekday: "short" }),
                date: d.getDate(),
                className,
            };
        });
    }, [weekDate, today]);

    const changeWeek = (type: "prev" | "next") => {
        const d = new Date(weekDate);
        d.setDate(d.getDate() + (type === "next" ? 7 : -7));
        setWeekDate(d);
    };

    const [searchParams] = useSearchParams();
    const searchQuery = (searchParams.get("search") || "").toLowerCase();

    /* ===== FILTER BY DATE & SEARCH ===== */
    const selectedKey = toDateKey(selectedDate);
    const filteredSchedules = schedules.filter(
        (s) => {
            const matchesDate = s.date === selectedKey;
            if (!matchesDate) return false;

            if (!searchQuery) return true;
            const matchesSearch = s.title.toLowerCase().includes(searchQuery) ||
                s.batch.toLowerCase().includes(searchQuery);
            return matchesSearch;
        }
    );

    return (
        <section className="boxStyle">
            {/* HEADER */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h3 className="text-xl lg:text-2xl font-semibold">
                        Upcoming Schedule
                    </h3>
                    <p className="text-[#626262] md:text-xl text-base">{headerDate}</p>
                </div>
                <div className="md:flex hidden">
                    <BtnCom label="View all" />
                </div>


                <div className="flex md:hidden gap-2 ">
                    <button onClick={() => changeWeek("prev")} className="iconStyle px- cursor-pointer">

                        <ArrowLeft2 size="16" color="currentColor" className="md:hidden" />
                        <ArrowLeft2 size="20" color="currentColor" className="hidden md:block" />

                    </button>
                    <button onClick={() => changeWeek("next")} className="iconStyle cursor-pointer">
                        <ArrowRight2 size="16" color="currentColor" className="md:hidden" />
                        <ArrowRight2 size="20" color="currentColor" className="hidden md:block" />
                    </button>
                </div>

            </div>

            {/* DATE PILLS */}
            <div className="md:flex hidden items-center gap-3 mb-6 ">
                <button onClick={() => changeWeek("prev")} className="iconStyle px- cursor-pointer">

                    <ArrowLeft2 size="16" color="currentColor" className="md:hidden" />
                    <ArrowLeft2 size="20" color="currentColor" className="hidden md:block" />

                </button>

                <div className="flex gap-3 w-full justify-between overflow-x-auto scrollbar-hide">
                    {weekDays.map((d) => (
                        <button
                            key={d.dateKey}
                            onClick={() => setSelectedDate(d.dateObj)}
                            className={`md:min-w-16  min-w-10 px-0 md:px-3  py-2  rounded-xl text-center cursor-pointer ${d.className}`}
                        >
                            <p className="font-semibold  md:text-base text-[10px]">{d.day}</p>
                            <p className="font-semibold  md:text-base text-[10px]">{d.date}</p>
                        </button>
                    ))}
                </div>

                <button onClick={() => changeWeek("next")} className="iconStyle cursor-pointer">
                    <ArrowRight2 size="16" color="currentColor" className="md:hidden" />
                    <ArrowRight2 size="20" color="currentColor" className="hidden md:block" />
                </button>
            </div>


            <div className="md:hidden flex flex-col justify-center gap-5">

                <div className="flex gap-3 w-full justify-between overflow-x-auto scrollbar-hide">
                    {weekDays.map((d) => (
                        <button
                            key={d.dateKey}
                            onClick={() => setSelectedDate(d.dateObj)}
                            className={`md:min-w-16  min-w-10 h-10 flex flex-col items-center px-0 md:px-3 mb-5  justify-center  rounded-xl text-center cursor-pointer ${d.className}`}
                        >
                            <p className="font-semibold  md:text-base text-[10px]">{d.day}</p>
                            <p className="font-semibold  md:text-base text-[10px]">{d.date}</p>
                        </button>
                    ))}
                </div>


            </div>


            {/* SCHEDULE LIST */}
            <div className="space-y-5">
                {filteredSchedules.length === 0 && (
                    <p className="text-sm text-gray-500">
                        No classes scheduled for this day
                    </p>
                )}

                {filteredSchedules.map((item) => (
                    <InstructorScheduleCard
                        key={item.id}
                        id={item.id}
                        batch={item.batch}
                        title={item.title}
                        time={item.time}
                        displayDate={item.displayDate}
                        status={item.status}
                    />
                ))}
            </div>
        </section>
    );
};

export default InstructorUpcomingSchedule;
