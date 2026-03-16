import { useState } from "react";
import { NotificationBing } from "iconsax-react";
import { ChevronDown, ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CreateAnnouncementPage = () => {
    const navigate = useNavigate();
    const courseOptions = ["Am101", "Advanced AI", "React Basics"];
    const batchOptions = ["Batch-01", "Batch-02", "Batch-03"];

    const [courseOpen, setCourseOpen] = useState(false);
    const [batchOpen, setBatchOpen] = useState(false);

    const [selectedCourse, setSelectedCourse] = useState("");
    const [selectedBatch, setSelectedBatch] = useState("");

    const handleBack = () => navigate(-1);
    const handleClose = () => navigate("/instructor/dashboard");

    return (
        <div className="w-full h-screen flex flex-col md:flex-row overflow-hidden relative bg-white">
            {/* Left Sidebar */}
            <div className="w-full flex-1 bg-[#F67300] p-6 md:p-[30px] flex flex-col justify-center md:justify-start items-center md:items-stretch gap-4 md:gap-[40px] text-white shrink-0 min-h-[220px] md:min-h-auto rounded-b-[30px] md:rounded-none relative">
                <button
                    onClick={handleBack}
                    className="absolute top-6 left-6 md:static flex items-center gap-2 text-sm font-medium hover:opacity-80 z-20 cursor-pointer"
                >
                    <ChevronLeft size={20} color="white" />
                    <span className="hidden md:inline">Back</span>
                </button>

                <div className="flex w-[84px] h-[84px] bg-white/20 rounded-[30px] items-center justify-center mb-2 md:mb-0">
                    <NotificationBing size={42} variant="Bold"  color="white" />
                </div>

                <div className="z-10 flex flex-col items-center md:items-start text-center md:text-left">
                    <h2 className="text-xl md:text-[32px] font-semibold mb-2 md:mb-2">
                        Broadcast
                    </h2>
                    <p className="text-sm md:text-base font-medium text-white/90 opacity-90 md:opacity-100">
                        Send an update to all your students instantly.
                    </p>
                </div>

                {/* Decorative circles */}
                <div className="hidden md:block absolute -bottom-20 -left-20 w-60 h-60 bg-white/5 rounded-full blur-3xl pointer-events-none" />
                <div className="hidden md:block absolute top-20 -right-20 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />
            </div>

            {/* Right Content */}
            <div className="flex-5 p-4 md:p-[40px] flex flex-col overflow-auto relative">
                <div className="mb-6 md:mb-[30px]">
                    <h2 className="text-2xl md:text-[32px] font-semibold text-[#333333]">
                        New Announcement
                    </h2>
                </div>

                <form className="flex flex-col gap-[20px] flex-1 w-full" onSubmit={(e) => e.preventDefault()}>
                    {/* Course Name / ID */}
                    <div className="flex flex-col gap-[8px]">
                        <label className="text-[16px] font-medium text-[#333333]">
                            Course Name / ID
                        </label>

                        <div className="relative">
                            <div
                                onClick={() => setCourseOpen(!courseOpen)}
                                className="w-full h-[45px] px-[15px]
                  rounded-[10px] border border-[#D3D3D3]
                  bg-white flex items-center justify-between
                  cursor-pointer"
                            >
                                <span className={selectedCourse ? "text-[#333333]" : "text-[#D3D3D3]"}>
                                    {selectedCourse || "E.g Am101"}
                                </span>
                                <ChevronDown size={20} color="#333333" />
                            </div>

                            {courseOpen && (
                                <div className="absolute mt-1 w-full bg-white rounded-[12px] border border-[#E5E5E5] shadow-lg z-[1200]">
                                    {courseOptions.map((item) => (
                                        <div
                                            key={item}
                                            onClick={() => {
                                                setSelectedCourse(item);
                                                setCourseOpen(false);
                                            }}
                                            className={`px-4 py-3 flex items-center justify-between cursor-pointer
                        hover:bg-[#F5F7FF]
                        ${selectedCourse === item
                                                    ? "bg-[#F5F7FF] text-[#4F46E5]"
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
                    <div className="flex flex-col gap-[8px]">
                        <label className="text-[16px] font-medium text-[#333333]">
                            Batch ID
                        </label>

                        <div className="relative">
                            <div
                                onClick={() => setBatchOpen(!batchOpen)}
                                className="w-full h-[45px] px-[15px]
                  rounded-[10px] border border-[#D3D3D3]
                  bg-white flex items-center justify-between
                  cursor-pointer"
                            >
                                <span className={selectedBatch ? "text-[#333333]" : "text-[#333333]"}>
                                    {selectedBatch || "E.g Batch-01"}
                                </span>
                                <ChevronDown size={20} color="#333333" />
                            </div>

                            {batchOpen && (
                                <div className="absolute mt-1 w-full bg-white rounded-[12px] border border-[#E5E5E5] shadow-lg z-[1200]">
                                    {batchOptions.map((item) => (
                                        <div
                                            key={item}
                                            onClick={() => {
                                                setSelectedBatch(item);
                                                setBatchOpen(false);
                                            }}
                                            className={`px-4 py-3 flex items-center justify-between cursor-pointer
                        hover:bg-[#F5F7FF]
                        ${selectedBatch === item
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

                    {/* Topic */}
                    <div className="flex flex-col gap-[8px]">
                        <label className="text-[16px] font-medium text-[#333333]">
                            Topic
                        </label>
                        <input
                            type="text"
                            placeholder="E.g Exam Update"
                            className="w-full h-[45px] px-[15px] rounded-[10px]
                border border-[#D3D3D3] outline-none focus:border-[#F67300]"
                        />
                    </div>

                    {/* Message */}
                    <div className="flex flex-col gap-[8px]">
                        <label className="text-[16px] font-medium text-[#333333]">
                            Message
                        </label>
                        <textarea
                            placeholder="Type your message here..."
                            className="w-full h-[150px] px-[15px] py-[15px]
                rounded-[10px] border border-[#D3D3D3]
                outline-none focus:border-[#F67300] resize-none"
                        />
                    </div>
                </form>

                {/* Footer */}
                <div className="flex justify-end gap-3.75 mt-8 w-full ">
                    <button
                        onClick={handleClose}
                        className="px-15 py-2 rounded-[10px]  bg-white text-gray-700 md:border-2 border border-[#F2EEF4] cursor-pointer hover:bg-gray-100"
                    >
                        Cancel
                    </button>
                    <button
                        className="px-15 py-2 rounded-[10px] bg-[#F67300] text-white hover:bg-[#fd8720] cursor-pointer transition-colors"
                    >
                        Post
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateAnnouncementPage;
