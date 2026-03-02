import { X } from "lucide-react";
import { DocumentDownload } from "iconsax-react";
import { useState } from "react";

interface ReviewSubmissionModalProps {
    isOpen: boolean;
    onClose: () => void;
    studentName: string;
    studentId: string;
    submittedOn: string;
    status: string;
    files: Array<{ name: string; size: string }>;
}

const ReviewSubmissionModal = ({ isOpen, onClose, studentName, studentId, submittedOn, status, files }: ReviewSubmissionModalProps) => {
    const [marks, setMarks] = useState("");
    const [feedback, setFeedback] = useState("");

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[1100] bg-black/30 flex justify-end font-['Urbanist']">
            <div className="relative bg-white w-[600px] h-full p-8 flex flex-col gap-6 overflow-y-auto rounded-l-[30px] shadow-xl animate-in slide-in-from-right duration-300">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 p-1.5 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
                >
                    <X size={24} color="#626262" />
                </button>

                {/* Header */}
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                        <h2 className="text-[24px] font-bold text-[#1A1A1A]">Review Submission</h2>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${status === 'Submitted Late' ? 'bg-[#FFF5ED] text-[#F67300]' :
                            status === 'Submitted' ? 'bg-[#ECFDF5] text-[#10B981]' :
                                'bg-[#F3F4F6] text-[#9CA3AF]'
                            }`}>
                            {status}
                        </span>
                    </div>
                    <p className="text-[14px] text-[#626262]">
                        {studentName} ({studentId}) • Submitted : {submittedOn}
                    </p>
                </div>

                {/* Submitted Files */}
                <div className="flex flex-col gap-4">
                    <h3 className="text-[16px] font-medium text-[#333333]">Submitted Files</h3>
                    <div className="flex flex-col gap-3">
                        {files.map((file, index) => (
                            <div key={index} className="flex items-center justify-between p-4 border border-[#EEEEEE] rounded-[16px] hover:bg-gray-50 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-[#FEE2E2] rounded-lg flex items-center justify-center text-red-500 font-bold text-[10px] uppercase">
                                        PDF
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[14px] font-medium text-[#333333]">{file.name}</span>
                                        <span className="text-[12px] text-[#939393]">{file.size}</span>
                                    </div>
                                </div>
                                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer text-[#939393] hover:text-[#333333]">
                                    <DocumentDownload size={20} variant="Outline" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Grading & Feedback */}
                <div className="flex flex-col gap-4">
                    <h3 className="text-[16px] font-medium text-[#333333]">Grading & Feedback</h3>

                    <div className="flex flex-col gap-2">
                        <label className="text-[14px] text-[#626262]">Marks awarded (out of 100)</label>
                        <div className="flex items-center bg-[#F9F9F9] rounded-[12px] px-4 py-3 w-[120px]">
                            <input
                                type="number"
                                placeholder="0"
                                className="bg-transparent outline-none w-full text-[14px] text-[#333333]"
                                value={marks}
                                onChange={(e) => setMarks(e.target.value)}
                            />
                            <span className="text-[#939393] text-[14px]">/100</span>
                        </div>
                    </div>
                </div>

                {/* Instructor Feedback */}
                <div className="flex flex-col gap-2">
                    <label className="text-[16px] font-medium text-[#333333]">Instructor Feedback</label>
                    <textarea
                        className="w-full h-[120px] p-4 border border-[#EEEEEE] rounded-[16px] resize-none outline-none text-[#626262] text-[14px] placeholder:text-[#939393] focus:border-[#F67300] transition-colors"
                        placeholder="Feedback"
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                    />
                </div>

                {/* Footer Buttons */}
                <div className="flex justify-end gap-3 mt-2">
                    <button
                        onClick={onClose}
                        className="px-6 py-2.5 rounded-[12px] border border-[#E5E7EB] text-[#333333] font-semibold text-[14px] hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button className="px-6 py-2.5 rounded-[12px] bg-[#F67300] text-white font-semibold text-[14px] hover:opacity-90 transition-opacity shadow-md shadow-orange-100">
                        Submit Grade
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReviewSubmissionModal;
