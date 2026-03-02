import { DocumentText } from "iconsax-react";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CreateCoursePage = () => {
    const navigate = useNavigate();

    const handleBack = () => navigate(-1);
    const handleClose = () => navigate("/instructor/dashboard");

    return (
        <div className="w-full h-screen flex flex-col md:flex-row overflow-hidden relative bg-white">
            {/* Left Sidebar - Orange */}
            <div className="w-full flex-1 bg-[#F67300] p-6 md:p-[30px] flex flex-col justify-center md:justify-start items-center md:items-stretch gap-4 md:gap-[40px] text-white shrink-0 min-h-[220px] md:min-h-auto rounded-b-[30px] md:rounded-none relative">
                <button
                    onClick={handleBack}
                    className="absolute top-6 left-6 md:static flex items-center gap-2 text-sm font-medium hover:opacity-80 transition-opacity w-fit z-20 cursor-pointer"
                >
                    <ChevronLeft size={20} color="white" />
                    <span className="hidden md:inline">Back</span>
                </button>

                <div className="flex w-[84px] h-[84px] bg-white/20 rounded-[30px] items-center justify-center mb-2 md:mb-0">
                    <DocumentText size={42} color="white" variant="Bold" />
                </div>

                <div className="z-10 flex flex-col items-center md:items-start text-center md:text-left">
                    <h2 className="text-xl md:text-[32px] font-semibold mb-2 md:mb-2 text-white">
                        Create New Course
                    </h2>

                    <p className="text-[14px] font-medium leading-[140%] text-white/90 opacity-90 md:opacity-100">
                        Design a new curriculum and educational path.
                    </p>
                </div>

                {/* Decorative circles */}
                <div className="hidden md:block absolute -bottom-20 -left-20 w-60 h-60 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
                <div className="hidden md:block absolute top-20 -right-20 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
            </div>

            {/* Right Content - Form */}
            <div className="flex-5 p-4 md:p-[40px] flex flex-col overflow-auto relative">
                <div className="mb-6 md:mb-[30px]">
                    <h2 className="text-2xl md:text-[32px] font-semibold text-[#333333]">Course Details</h2>
                </div>

                <form className="flex flex-col gap-[20px] flex-1 w-full" onSubmit={(e) => e.preventDefault()}>
                    {/* Auto-Generated Batch ID */}
                    <div className="flex flex-col gap-[8px]">
                        <label className="text-[16px] font-medium text-[#333333]">Auto-Generated Batch ID</label>
                        <div className="relative">
                            <input
                                type="text"
                                value="Am101"
                                disabled
                                className="w-full h-[45px] px-[15px] rounded-[10px] border border-[#D3D3D3] outline-none bg-[#F2F2F2] text-[#333333] cursor-not-allowed font-medium"
                            />
                        </div>
                    </div>

                    {/* Course ID */}
                    <div className="flex flex-col gap-[8px]">
                        <label className="text-[16px] font-medium text-[#333333]">Course ID</label>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="E.g Am101"
                                className="w-full h-[45px] px-[15px] rounded-[10px] border border-[#D3D3D3] outline-none focus:border-[#F67300] text-[#333333] placeholder:text-[#D3D3D3]"
                            />
                        </div>
                    </div>

                    {/* Course Title */}
                    <div className="flex flex-col gap-[8px]">
                        <label className="text-[16px] font-medium text-[#333333]">Course Title</label>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="E.g AI/AML"
                                className="w-full h-[45px] px-[15px] rounded-[10px] border border-[#D3D3D3] outline-none focus:border-[#F67300] text-[#333333] placeholder:text-[#D3D3D3]"
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div className="flex flex-col gap-[8px]">
                        <label className="text-[16px] font-medium text-[#333333]">Description</label>
                        <div className="relative">
                            <textarea
                                placeholder="E.g Am101"
                                className="w-full h-[134px] p-[15px] rounded-[10px] border border-[#D3D3D3] outline-none focus:border-[#F67300] text-[#333333] placeholder:text-[#D3D3D3] resize-none"
                            />
                        </div>
                    </div>

                    {/* Duration */}
                    <div className="flex flex-col gap-[8px]">
                        <label className="text-[16px] font-medium text-[#333333]">Duration</label>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="E.g 3 Months"
                                className="w-full h-[45px] px-[15px] rounded-[10px] border border-[#D3D3D3] outline-none focus:border-[#F67300] text-[#333333] placeholder:text-[#D3D3D3]"
                            />
                        </div>
                    </div>
                </form>

                {/* Footer Buttons */}
                <div className="flex justify-end gap-3.75 mt-8 w-full">
                    <button
                        onClick={handleClose}
                        className="px-15 py-2 rounded-[10px] bg-white text-gray-700 md:border-2 border border-[#F2EEF4] cursor-pointer hover:bg-gray-100 transition-colors"
                    >
                        Cancel
                    </button>
                    <button className="px-15 py-2 rounded-[10px] bg-[#F67300] text-white hover:bg-[#fd8720] transition-colors cursor-pointer">
                        Save Course
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateCoursePage;
