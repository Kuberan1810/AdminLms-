import { useNavigate } from "react-router-dom";
import { ArrowLeft, ClipboardText } from "iconsax-react";
import { ChevronDown } from "lucide-react";

interface CreateAssignmentModalProps {
    onClose: () => void;
    onBack: () => void;
}

const CreateAssignmentModal = ({ onClose, onBack }: CreateAssignmentModalProps) => {
    const navigate = useNavigate();

    return (
        <div className="fixed inset-0 bg-black/30 z-[1100]">
            <div className="bg-white w-full h-full flex overflow-hidden relative">

                <div className="w-[261px] bg-[#F67300] p-[30px] flex flex-col gap-[40px] text-white relative">
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 text-sm font-medium hover:opacity-80 transition-opacity w-fit cursor-pointer"
                    >
                        <ArrowLeft size={20} color="white" />
                        Back
                    </button>

                    <div className="w-[84px] h-[84px] bg-white/20 rounded-[24px] flex items-center justify-center">
                        <ClipboardText size={42} color="white" variant="Bold" />
                    </div>

                    <div>
                        <h2 className="text-[32px] font-semibold leading-[120%] mb-2 font-['Urbanist']">
                            Create Assignment
                        </h2>

                        <p className="text-[14px] font-medium leading-[140%] font-['Urbanist'] text-white">
                            Assign tasks and track student progress.
                        </p>
                    </div>

                    {/* Step indicator */}
                    <div className="mt-auto">
                        <p className="text-[16px] font-medium opacity-80 font-['Urbanist']">Step 1 of 2</p>
                    </div>

                    {/* Decorative circles */}
                    <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
                    <div className="absolute top-20 -right-20 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
                </div>

                {/* Right Content Area */}
                <div className="flex-1 p-[40px] flex flex-col">
                    <div className="mb-[30px] w-[573px]">
                        <h2 className="text-[36px] font-semibold leading-[100%] font-['Urbanist'] text-[#333333]">Assignment Details</h2>
                    </div>

                    <form className="flex flex-col gap-[20px] flex-1 w-[573px]">
                        {/* Course Name / ID */}
                        <div className="flex flex-col gap-[8px]">
                            <label className="text-[16px] font-medium text-[#333333] font-['Urbanist']">Course Name / ID</label>
                            <input
                                type="text"
                                placeholder="E.g Am101"
                                className="w-full h-[45px] px-[15px] rounded-[10px] border border-[#D3D3D3] outline-none focus:border-[#F67300] text-[#333333] placeholder:text-[#D3D3D3]"
                            />
                        </div>

                        {/* Batch ID */}
                        <div className="flex flex-col gap-[8px]">
                            <label className="text-[16px] font-medium text-[#333333] font-['Urbanist']">Batch ID</label>
                            <div className="relative">
                                <select className="w-full h-[45px] px-[15px] rounded-[10px] border border-[#D3D3D3] outline-none focus:border-[#F67300] text-[#D3D3D3] bg-white appearance-none cursor-pointer">
                                    <option value="">E.g Batch-01</option>
                                </select>
                                <div className="absolute right-[15px] top-1/2 -translate-y-1/2 pointer-events-none">
                                    <ChevronDown size={20} color="#333333" />
                                </div>
                            </div>
                        </div>

                        {/* Module */}
                        <div className="flex flex-col gap-[8px]">
                            <label className="text-[16px] font-medium text-[#333333] font-['Urbanist']">Module</label>
                            <div className="relative">
                                <select className="w-full h-[45px] px-[15px] rounded-[10px] border border-[#D3D3D3] outline-none focus:border-[#F67300] text-[#D3D3D3] bg-white appearance-none cursor-pointer">
                                    <option value="">E.g Module 1</option>
                                </select>
                                <div className="absolute right-[15px] top-1/2 -translate-y-1/2 pointer-events-none">
                                    <ChevronDown size={20} color="#333333" />
                                </div>
                            </div>
                        </div>
                    </form>

                    {/* Footer Buttons */}
                    <div className="flex justify-end gap-[10px] mt-8 w-[573px]">
                        <button
                            onClick={onClose}
                            className="w-[126px] h-[44px] rounded-full border border-[#333333] text-[#333333] text-[16px] font-medium hover:bg-gray-50 transition-colors flex items-center justify-center cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => {
                                onClose();
                                navigate("/instructor/create-assignment");
                            }}
                            className="w-[126px] h-[44px] rounded-full bg-[#F67300] text-white text-[16px] font-medium hover:opacity-90 transition-opacity flex items-center justify-center cursor-pointer"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateAssignmentModal;
