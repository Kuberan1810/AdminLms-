import { ArrowLeft, DocumentText } from "iconsax-react";

interface CreateCourseModalProps {
    onClose: () => void;
    onBack: () => void;
}

const CreateCourseModal = ({ onClose, onBack }: CreateCourseModalProps) => {
    return (
        <div className="fixed inset-0 bg-black/30 z-[1100]">
            <div className="bg-white w-full h-full flex overflow-hidden relative">

                {/* Left Sidebar - Orange */}
                <div className="w-[261px] bg-[#F67300] p-[30px] flex flex-col gap-[40px] text-white relative">
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 text-sm font-medium hover:opacity-80 transition-opacity w-fit"
                    >
                        <ArrowLeft size={20} color="white" />
                        Back
                    </button>

                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                        <DocumentText size={32} color="white" variant="Bold" />
                    </div>

                    <div>
                        <h2 className="text-[24px] font-semibold leading-[100%] mb-4 font-['Urbanist']">
                            Create New Course
                        </h2>

                        <p className="text-[14px] font-medium leading-[100%] font-['Urbanist'] text-white">
                            Design a new curriculum and educational path.
                        </p>
                    </div>

                    {/* Decorative circles */}
                    <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
                    <div className="absolute top-20 -right-20 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
                </div>

                {/* Right Content - Form */}
                <div className="flex-1 p-[40px] flex flex-col overflow-hidden">
                    <div className="mb-[30px] w-[573px]">
                        <h2 className="text-[32px] font-semibold leading-[100%] font-['Urbanist'] text-[#333333]">Course Details</h2>
                    </div>

                    <form className="flex flex-col gap-[16px] flex-1 w-[551px] overflow-hidden pr-2">
                        {/* Auto-Generated Batch ID */}
                        <div className="flex flex-col gap-[4px]">
                            <label className="text-sm font-medium text-[#333333]">Auto-Generated Batch ID</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value="Am101"
                                    disabled
                                    className="w-full h-[34px] px-[10px] rounded-[10px] border border-[#D3D3D3] outline-none bg-[#F2F2F2] text-[#F67300] cursor-not-allowed font-medium"
                                />
                            </div>
                        </div>

                        {/* Course ID */}
                        <div className="flex flex-col gap-[4px]">
                            <label className="text-sm font-medium text-[#333333]">Course ID</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="E.g Am101"
                                    className="w-full h-[34px] px-[10px] rounded-[10px] border border-[#D3D3D3] outline-none focus:border-[#F67300] text-[#333333] placeholder:text-[#D3D3D3]"
                                />
                            </div>
                        </div>

                        {/* Course Title */}
                        <div className="flex flex-col gap-[4px]">
                            <label className="text-sm font-medium text-[#333333]">Course Title</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="E.g AI/AML"
                                    className="w-full h-[34px] px-[10px] rounded-[10px] border border-[#D3D3D3] outline-none focus:border-[#F67300] text-[#333333] placeholder:text-[#D3D3D3]"
                                />
                            </div>
                        </div>

                        {/* Description */}
                        <div className="flex flex-col gap-[4px]">
                            <label className="text-sm font-medium text-[#333333]">Description</label>
                            <div className="relative">
                                <textarea
                                    placeholder="E.g Am101"
                                    className="w-full h-[134px] px-[10px] py-[10px] rounded-[10px] border border-[#D3D3D3] outline-none focus:border-[#F67300] text-[#333333] placeholder:text-[#D3D3D3] resize-none"
                                />
                            </div>
                        </div>

                        {/* Duration */}
                        <div className="flex flex-col gap-[4px]">
                            <label className="text-sm font-medium text-[#333333]">Duration</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="E.g 3 Months"
                                    className="w-full h-[34px] px-[10px] rounded-[10px] border border-[#D3D3D3] outline-none focus:border-[#F67300] text-[#333333] placeholder:text-[#D3D3D3]"
                                />
                            </div>
                        </div>
                    </form>

                    {/* Footer Buttons */}
                    <div className="flex justify-end gap-4 mt-6">
                        <button
                            onClick={onClose}
                            className="px-8 py-3 rounded-[15px] border border-[#333333] text-[#333333] font-medium hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button className="px-8 py-3 rounded-[15px] bg-[#F67300] text-white font-medium hover:opacity-90 transition-opacity">
                            Save Course
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateCourseModal;
