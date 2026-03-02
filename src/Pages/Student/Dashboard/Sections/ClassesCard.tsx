import { useState, useEffect } from "react";
import { InfoCircle } from "iconsax-react";
import { motion } from "framer-motion";
import { attendanceData as staticData } from "../data/DashboardData";
import { getAttendanceSummary } from "../../../../store/attendanceStore";

const ClassesCard = () => {
    const [showTooltip, setShowTooltip] = useState(false);

    // Get initial counts from store (static + stored records)
    const initial = getAttendanceSummary(staticData);
    const [attended, setAttended] = useState(initial.attended);
    const [absent, setAbsent] = useState(initial.absent);
    const [upcoming, setUpcoming] = useState(initial.upcoming);

    useEffect(() => {
        const handleUpdate = () => {
            const updated = getAttendanceSummary(staticData);
            setAttended(updated.attended);
            setAbsent(updated.absent);
            setUpcoming(updated.upcoming);
            console.log("ClassesCard updated:", updated);
        };

        window.addEventListener("attendance-updated", handleUpdate);
        return () => window.removeEventListener("attendance-updated", handleUpdate);
    }, []);

    useEffect(() => {
        if (showTooltip) {
            const timer = setTimeout(() => {
                setShowTooltip(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [showTooltip]);

    const total = attended + absent + upcoming;
    const percentage = total > 0 ? Math.round((attended / total) * 100) : 0;

    // 🎯 DONUT CONFIG
    const radius = 44;
    const strokeWidth = 22;
    const circumference = 2 * Math.PI * radius;

    // Gap must account for round caps: each cap extends strokeWidth/2
    // visual gap ≈ gap - strokeWidth
    const gap = 28;
    const totalGap = gap * 3;
    const usable = circumference - totalGap;

    // Distribute remaining arc proportionally
    const attendedLen = total > 0 ? (attended / total) * usable : 0;
    const absentLen = total > 0 ? (absent / total) * usable : 0;
    const upcomingLen = total > 0 ? (upcoming / total) * usable : 0;

    // Offsets: Green → Red → Gray (clockwise)
    const redOffset = -(attendedLen + gap);
    const grayOffset = -(attendedLen + gap + absentLen + gap);

    return (
        <div className="boxStyle" onClick={() => setShowTooltip(false)}>
            {/* Header */}
            <div className="mb-7.5 flex items-center justify-between">
                <h2 className="text-[24px] font-semibold text-[#333333]">
                    Classes
                </h2>
                <div className="relative group/tooltip cursor-pointer" onClick={(e) => {
                    e.stopPropagation();
                    setShowTooltip(!showTooltip);
                }}>
                    <InfoCircle size="28" color="#333333" />
                    <div className={`absolute right-0 top-full mt-2 w-56 z-50 shadow-xl 
                        ${showTooltip ? 'block' : 'hidden md:group-hover/tooltip:block'}`}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            className="bg-[#808080] text-white text-xs rounded-xl px-4 py-3 relative"
                        >
                            <p>Track your class attendance, attended, absent, and upcoming classes with overall attendance percentage.</p>
                            <div className="absolute -top-1.5 right-3 w-3 h-3 bg-[#808080] rotate-45 shadow-lg" />
                        </motion.div>
                    </div>
                </div>
            </div>
            <div>
                {/* Content */}
                <div className="flex items-center justify-between">
                    {/* Left info */}
                    <div>
                        <p className="mb-1 text-[20px] text-[#808080]">
                            Attended
                        </p>
                        <p className="text-[24px] font-semibold text-[#4D4D4D]">
                            {attended} / {total}
                        </p>
                    </div>

                    {/* Donut */}
                    <div className="relative h-[130px] w-[130px]">
                        <svg
                            width="130"
                            height="130"
                            viewBox="0 0 130 130"
                            className="-rotate-[80deg]"
                        >
                            {/* GREEN – Attended */}
                            <circle
                                cx="65"
                                cy="65"
                                r={radius}
                                fill="none"
                                stroke="#22C55E"
                                strokeWidth={strokeWidth}
                                strokeDasharray={`${attendedLen} ${circumference}`}
                                strokeLinecap="round"
                            />

                            {/* RED – Absent (after green) */}
                            <circle
                                cx="65"
                                cy="65"
                                r={radius}
                                fill="none"
                                stroke="#D90015"
                                strokeWidth={strokeWidth}
                                strokeDasharray={`${absentLen} ${circumference}`}
                                strokeDashoffset={redOffset}
                                strokeLinecap="round"
                            />

                            {/* GREY – Upcoming (after red) */}
                            <circle
                                cx="65"
                                cy="65"
                                r={radius}
                                fill="none"
                                stroke="#E5E5E5"
                                strokeWidth={strokeWidth}
                                strokeDasharray={`${upcomingLen} ${circumference}`}
                                strokeDashoffset={grayOffset}
                                strokeLinecap="round"
                            />
                        </svg>

                        {/* Center percentage */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-[18px] font-semibold text-[#7A7A7A]">
                                {percentage}%
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            {/* Legend */}
            <div className="mt-5 flex justify-between text-[13px] text-[#6B7280]">
                <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded bg-[#22C55E]" />
                    Attended: {attended}
                </div>

                <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded bg-[#D90015]" />
                    Absent: {absent.toString().padStart(2, "0")}
                </div>

                <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded bg-[#E5E5E5]" />
                    Upcoming: {upcoming}
                </div>
            </div>
        </div>
    );
};

export default ClassesCard;