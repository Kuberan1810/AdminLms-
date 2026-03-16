import { useState } from "react";
import { Calendar, DocumentText, ArrowDown2, Clock } from "iconsax-react";
import { ChevronLeft } from "lucide-react";
import { useSchedule } from "../../../context/InstructorNotification/ScheduleContext";

import { useNavigate } from "react-router-dom";

const CreateClassPage = () => {
    const navigate = useNavigate();
    const classOptions = ["Advanced AI", "React Basics"];

    const { addSchedule } = useSchedule();

    const [classOpen, setClassOpen] = useState(false);
    const [selectedClass, setSelectedClass] = useState("");
    const [batchId, setBatchId] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [date, setDate] = useState("");

    const handleLaunch = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedClass || !batchId || !startTime || !endTime || !date) {
            alert("Please fill all fields");
            return;
        }

        const dateObj = new Date(date);
        const displayDate = dateObj.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: '2-digit' });

        addSchedule({
            title: selectedClass,
            batch: batchId,
            time: `${startTime} - ${endTime}`,
            date: date,
            displayDate: displayDate,
            status: "soon" // Default status
        });

        navigate(-1);
    };

    return (
        <div className="w-full h-screen flex flex-col md:flex-row overflow-hidden relative bg-white">
            {/* Left Sidebar */}
            <div className="w-full flex-1 bg-[#F67300] p-6 md:p-[30px] flex flex-col justify-center md:justify-start items-center md:items-stretch gap-4 md:gap-[40px] text-white shrink-0 min-h-[220px] md:min-h-auto rounded-b-[30px] md:rounded-none relative">
                <button
                    onClick={() => navigate(-1)}
                    className="absolute top-6 left-6 md:static flex items-center gap-2 text-sm font-medium hover:opacity-80 transition-opacity w-fit cursor-pointer z-20"
                >
                    <ChevronLeft size={20} color="white" />
                    <span className="hidden md:inline">Back</span>
                </button>

                <div className="flex w-[84px] h-[84px] bg-white/20 rounded-[30px] items-center justify-center mb-2 md:mb-0">
                    <DocumentText size={32} variant="Bold"  color="white" />
                </div>

                <div className="z-10 flex flex-col items-center md:items-start text-center md:text-left">
                    <h2 className="text-xl md:text-[32px] font-semibold mb-2 md:mb-2 text-white">
                        Create New Class
                    </h2>

                    <p className="text-[14px] font-medium leading-[140%] text-white/90 opacity-90 md:opacity-100">
                        Set up a new learning environment for your students. Assign a
                        course, define the schedule, and start your journey.
                    </p>
                </div>

                {/* Decorative circles */}
                <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-white/5 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute top-20 -right-20 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />
            </div>

            {/* Right Content */}
            <div className="flex-5 p-4 md:p-[40px] flex flex-col overflow-auto relative">
                <div className="mb-6 md:mb-[30px]">
                    <h2 className="text-2xl md:text-[32px] font-semibold text-[#333333]">
                        New Class
                    </h2>
                    <p className="text-[#626262] mt-2 text-sm md:text-base">
                        Provide the necessary details to launch your next class.
                    </p>
                </div>

                <form className="flex flex-col gap-[16px] md:gap-[20px] flex-1 w-full md:w-[573px]">
                    {/* Class Name / ID */}
                    <div className="flex flex-col gap-[8px] md:gap-[10px]">
                        <label className="text-sm font-medium text-[#333333]">
                            Class Name / ID
                        </label>

                        <div className="relative">
                            <div
                                onClick={() => setClassOpen(!classOpen)}
                                className="w-full h-[45px] md:h-[37px] px-[15px] md:px-[10px]
                  rounded-[10px] border border-[#D3D3D3]
                  bg-white flex items-center justify-between
                  cursor-pointer focus-within:border-[#F67300]"
                            >
                                <span
                                    className={`text-sm ${selectedClass ? "text-[#333333]" : "text-[#9E9E9E]"
                                        }`}
                                >
                                    {selectedClass || "E.g Advanced AI"}
                                </span>

                                <ArrowDown2 size={14}  color="#626262" />
                            </div>

                            {classOpen && (
                                <div
                                    className="absolute mt-1 w-full bg-white
                    rounded-[12px] border border-[#E5E5E5]
                    shadow-lg z-[1200]"
                                >
                                    {classOptions.map((item) => (
                                        <div
                                            key={item}
                                            onClick={() => {
                                                setSelectedClass(item);
                                                setClassOpen(false);
                                            }}
                                            className={`px-4 py-3 md:py-2 flex items-center justify-between
                        cursor-pointer text-sm hover:bg-[#F5F7FF]
                        ${selectedClass === item
                                                    ? "bg-[#F5F7FF] text-[#F67300]"
                                                    : "text-[#333333]"
                                                }`}
                                        >
                                            <span>{item}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Batch ID */}
                    <div className="flex flex-col gap-[8px] md:gap-[10px]">
                        <label className="text-sm font-medium text-[#333333]">
                            Batch ID
                        </label>
                        <input
                            type="text"
                            placeholder="Batch- 01"
                            value={batchId}
                            onChange={(e) => setBatchId(e.target.value)}
                            className="w-full h-[45px] md:h-[37px] px-[15px] md:px-[10px] rounded-[10px]
                border border-[#D3D3D3] outline-none
                focus:border-[#F67300]"
                        />
                    </div>

                    <div className="flex flex-col gap-[8px]">
                        <label className="text-[16px] font-medium text-[#333333]">
                            Schedule Time
                        </label>

                        <div className="flex items-center gap-[15px]">
                            <div className="relative flex-1">
                                <input
                                    type="time"
                                    value={startTime}
                                    onChange={(e) => setStartTime(e.target.value)}
                                    className="w-full h-[45px] pl-[15px] pr-[40px]
                        rounded-[10px] border border-[#D3D3D3]
                        outline-none focus:border-[#F67300]
                        text-[#333333] transition-colors relative z-10 bg-transparent"
                                />
                                <div className="absolute right-[12px] top-1/2 -translate-y-1/2 pointer-events-none z-0">
                                    <Clock size={18}  color="#333333" />
                                </div>
                            </div>

                            <span className="text-sm font-medium text-[#626262]">to</span>

                            <div className="relative flex-1">
                                <input
                                    type="time"
                                    value={endTime}
                                    onChange={(e) => setEndTime(e.target.value)}
                                    className="w-full h-[45px] pl-[15px] pr-[40px]
                        rounded-[10px] border border-[#D3D3D3]
                        outline-none focus:border-[#F67300]
                        text-[#333333] transition-colors relative z-10 bg-transparent"
                                />
                                <div className="absolute right-[12px] top-1/2 -translate-y-1/2 pointer-events-none z-0">
                                    <Clock size={18}  color="#333333" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-[8px]">
                        <label className="text-[16px] font-medium text-[#333333]">
                            Select Date
                        </label>

                        <div className="relative w-full">
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="w-full h-[45px] pl-[15px] pr-[45px]
                        rounded-[10px] border border-[#D3D3D3]
                        outline-none focus:border-[#F67300]
                        text-[#333333] transition-colors relative z-10 bg-transparent"
                            />

                            <div
                                className="absolute right-[8px] top-1/2 -translate-y-1/2
                        w-[30px] h-[30px] bg-white
                        rounded-[8px] border border-[#E5E5E5]
                        flex items-center justify-center pointer-events-none z-0"
                            >
                                <Calendar size={16}  color="#333333" />
                            </div>
                        </div>
                    </div>
                </form>
                {/* Footer */}
                <div className="flex justify-end gap-3.75 mt-8 w-full">
                    <button
                        onClick={() => navigate(-1)}
                        type="button"
                        className="px-15 py-2 rounded-[10px] bg-white text-gray-700 md:border-2 border border-[#F2EEF4] cursor-pointer hover:bg-gray-100 transition-colors"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleLaunch}
                        className="px-15 py-2 rounded-[10px] bg-[#F67300] text-white hover:bg-[#fd8720] transition-colors cursor-pointer"
                    >
                        Launch
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateClassPage;
