import { X, Loader2 } from "lucide-react";
import { DocumentDownload } from "iconsax-react";
import { useState, useEffect } from "react";
import { capitalizeWords } from "../../utils/capitalize";

interface ReviewSubmissionModalProps {
    isOpen: boolean;
    onClose: () => void;
    studentName: string;
    studentId: string;
    submittedOn: string;
    status: string;
    files: Array<{ name: string; size: string; url?: string }>;
    isLoading?: boolean;
    onSubmitGrade?: (grade: string, feedback: string) => Promise<void>;
    existingGrade?: string | null;
    submissionText?: string | null;
}

const ReviewSubmissionModal = ({ isOpen, onClose, studentName, studentId, submittedOn, status, files, isLoading, onSubmitGrade, existingGrade, submissionText }: ReviewSubmissionModalProps) => {
    const [marks, setMarks] = useState("");
    const [feedback, setFeedback] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const isGraded = !!existingGrade;
    const isNotSubmitted = ['not submitted', 'not_submitted', 'pending'].includes(status?.toLowerCase() || '');
    const isReadOnly = isGraded || isNotSubmitted;

    // Reset fields when opened for a new student
    useEffect(() => {
        if (isOpen) {
            setMarks(existingGrade || "");
            setFeedback("");
        }
    }, [isOpen, studentId, existingGrade]);

    const handleSubmit = async () => {
        if (!onSubmitGrade || isReadOnly) return;
        setIsSubmitting(true);
        try {
            await onSubmitGrade(marks, feedback);
        } catch (error) {
            console.error("Failed to submit grade", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-1100 bg-black/40 backdrop-blur-sm flex justify-end transition-all duration-300">
            <div className="relative bg-white dark:bg-[#1A1A1A] w-[600px] h-full p-8 flex flex-col gap-8 overflow-y-auto rounded-l-[30px] shadow-2xl animate-in slide-in-from-right duration-500 ease-out transition-colors">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#333] transition-colors cursor-pointer z-10"
                >
                    <X size={20} className="text-[#626262] dark:text-[#A0A0A0]" />
                </button>

                {isLoading ? (
                    /* Loading Skeleton */
                    <div className="flex flex-col gap-8 animate-pulse mt-2">
                        <div className="flex flex-col gap-3 border-b border-gray-100 dark:border-[#333] pb-6">
                            <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded-md w-1/2"></div>
                            <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded-md w-3/4"></div>
                        </div>
                        <div className="flex flex-col gap-4">
                            <div className="h-5 bg-gray-200 dark:bg-gray-800 rounded-md w-32"></div>
                            <div className="h-20 bg-gray-100 dark:bg-gray-800 rounded-[16px] w-full"></div>
                            <div className="h-20 bg-gray-100 dark:bg-gray-800 rounded-[16px] w-full"></div>
                        </div>
                        <div className="flex flex-col gap-4">
                            <div className="h-5 bg-gray-200 dark:bg-gray-800 rounded-md w-40"></div>
                            <div className="h-12 bg-gray-100 dark:bg-gray-800 rounded-[12px] w-1/3"></div>
                        </div>
                        <div className="flex flex-col gap-4 mt-auto">
                            <div className="h-32 bg-gray-100 dark:bg-gray-800 rounded-[16px] w-full"></div>
                        </div>
                    </div>
                ) : (
                    <>
                        {/* Header */}
                        <div className="flex flex-col gap-3 border-b border-gray-100 dark:border-[#333] pb-6 mt-2">
                            <div className="flex items-center gap-3">
                                <h2 className="text-2xl font-bold text-[#1A1A1A] dark:text-white tracking-tight">{isNotSubmitted ? "Submission Status" : isGraded ? "View Submission" : "Review Submission"}</h2>
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                    ['submitted late', 'submitted_late'].includes(status?.toLowerCase()) ? 'bg-[#FFF5ED] dark:bg-orange-900/20 text-[#F67300] dark:text-orange-400' :
                                    ['submitted', 'graded'].includes(status?.toLowerCase()) ? 'bg-[#2A9A4615] dark:bg-emerald-900/20 text-[#2A9A46] dark:text-emerald-400' :
                                    ['overdue'].includes(status?.toLowerCase()) ? 'bg-[#F32D2D15] dark:bg-red-900/20 text-[#F32D2D] dark:text-red-400' :
                                    'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400'
                                    }`}>
                                    {status}
                                </span>
                            </div>
                            <p className="text-[15px] text-[#626262] dark:text-[#A0A0A0]">
                                <span className="font-semibold text-[#1A1A1A] dark:text-[#E5E7EB]">{studentName} ({studentId})</span> • Submitted : {submittedOn}
                            </p>
                        </div>

                        {/* Student Submission Text */}
                        {!isNotSubmitted && (
                            <div className="flex flex-col gap-4">
                                <h3 className="text-lg font-semibold text-[#333333] dark:text-white">Student Notes</h3>
                                {submissionText ? (
                                    <div className="p-6 bg-[#FFF5ED]/30 dark:bg-orange-900/5 border-l-4 border-[#F67300] rounded-r-[16px] rounded-l-[4px]">
                                        <p className="text-[15px] text-[#4D4D4D] dark:text-[#E5E7EB] leading-relaxed whitespace-pre-wrap italic">
                                            "{submissionText}"
                                        </p>
                                    </div>
                                ) : (
                                    <div className="p-6 border border-dashed border-gray-200 dark:border-[#333] rounded-[16px] text-center opacity-60">
                                        <p className="text-sm italic text-[#626262] dark:text-[#9CA3AF]">
                                            No additional notes were provided for this submission.
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Submitted Files */}
                        {isNotSubmitted ? (
                            <div className="flex flex-col gap-4">
                                <div className="p-8 bg-gray-50 dark:bg-[#222] border border-dashed border-[#D3D3D3] dark:border-[#444] rounded-[16px] text-center">
                                    <p className="text-[15px] font-medium text-[#626262] dark:text-[#9CA3AF]">This student hasn't submitted yet.</p>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-4">
                                <h3 className="text-lg font-semibold text-[#333333] dark:text-white">Submitted Files</h3>
                                <div className="flex flex-col gap-3">
                                    {files.length === 0 && (
                                        <div className="p-6 border border-dashed border-gray-200 dark:border-[#444] rounded-[16px] text-center">
                                            <p className="text-sm text-[#626262] dark:text-[#9CA3AF]">No files were uploaded with this submission.</p>
                                        </div>
                                    )}
                                    {files.map((file, index) => {
                                        const ext = file.name.split('.').pop()?.toLowerCase() || '';
                                        const isPdf = ext === 'pdf';
                                        const isImg = ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext);
                                        const isDoc = ['doc', 'docx'].includes(ext);
                                        const iconBg = isPdf ? 'bg-[#FEE2E2] dark:bg-red-900/30 text-red-600 dark:text-red-400' 
                                                     : isImg ? 'bg-[#B2D2FA] dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' 
                                                     : isDoc ? 'bg-[#DDEBFD] dark:bg-blue-800/30 text-blue-500 dark:text-blue-300' 
                                                     : 'bg-[#FFF5D5] dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400';
                                        return (
                                            <div key={index} className="group flex items-center justify-between p-4 border border-[#EEEEEE] dark:border-[#333] rounded-[16px] hover:bg-gray-50 dark:hover:bg-[#222] transition-all">
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-[11px] uppercase tracking-wider ${iconBg}`}>
                                                        {ext || 'FILE'}
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-[15px] font-medium text-[#333333] dark:text-[#E5E7EB] truncate max-w-[280px] transition-colors">{file.name}</span>
                                                        {file.size && <span className="text-[13px] text-[#939393] dark:text-[#777]">{file.size}</span>}
                                                    </div>
                                                </div>
                                                {file.url ? (
                                                    <a
                                                        href={file.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        download={file.name}
                                                        className="p-2.5 bg-white dark:bg-[#1A1A1A] border border-gray-100 dark:border-[#444] hover:bg-gray-100 dark:hover:bg-[#333] shadow-sm rounded-full transition-all text-[#626262] dark:text-[#A0A0A0]"
                                                    >
                                                        <DocumentDownload size={20} variant="Outline" />
                                                    </a>
                                                ) : (
                                                    <button disabled className="p-2.5 bg-gray-50 dark:bg-[#2A2A2A] rounded-full text-[#D3D3D3] dark:text-[#555] cursor-not-allowed">
                                                        <DocumentDownload size={20} variant="Outline" />
                                                    </button>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Grading & Feedback */}
                        <div className="flex flex-col gap-4 mt-2">
                            <h3 className="text-lg font-semibold text-[#333333] dark:text-white">{isReadOnly ? "Grade Details" : "Grading & Feedback"}</h3>

                            <div className="flex flex-col gap-2">
                                <label className="text-[14px] font-medium text-[#626262] dark:text-[#A0A0A0]">Marks awarded (out of 100)</label>
                                <div className={`flex items-center rounded-[12px] px-4 py-3 w-[140px] transition-colors ${isReadOnly ? 'bg-[#F2F2F2] dark:bg-[#2A2A2A] border border-[#EEEEEE] dark:border-[#444]' : 'bg-[#F9F9F9] dark:bg-[#222] border border-transparent focus-within:border-[#F67300] dark:focus-within:border-orange-500'}`}>
                                    <input
                                        type="number"
                                        placeholder="0"
                                        disabled={isReadOnly}
                                        className={`bg-transparent outline-none w-full text-[16px] font-medium ${isReadOnly ? 'text-[#626262] dark:text-[#9CA3AF] cursor-not-allowed' : 'text-[#333333] dark:text-white'}`}
                                        value={marks}
                                        onChange={(e) => setMarks(e.target.value)}
                                    />
                                    <span className={`text-[15px] font-medium border-l pl-3 ml-2 ${isReadOnly ? 'text-[#939393] dark:text-[#777] border-[#D3D3D3] dark:border-[#555]' : 'text-[#939393] dark:text-[#777] border-gray-200 dark:border-[#444]'}`}>/100</span>
                                </div>
                            </div>
                        </div>

                        {/* Instructor Feedback */}
                        <div className="flex flex-col gap-2 grow mt-2">
                            <label className="text-[14px] font-medium text-[#626262] dark:text-[#A0A0A0]">Instructor Feedback</label>
                            <textarea
                                disabled={isReadOnly}
                                className={`w-full grow min-h-[140px] p-5 border rounded-[16px] resize-none outline-none text-[15px] shadow-sm transition-colors leading-relaxed ${isReadOnly ? 'bg-[#F2F2F2] dark:bg-[#2A2A2A] border-[#EEEEEE] dark:border-[#444] text-[#626262] dark:text-[#9CA3AF] cursor-not-allowed placeholder:text-[#939393] dark:placeholder:text-[#666]' : 'bg-white dark:bg-[#1A1A1A] border-[#EEEEEE] dark:border-[#333] text-[#333333] dark:text-[#E5E7EB] placeholder:text-[#939393] dark:placeholder:text-[#666] focus:border-[#F67300] dark:focus:border-orange-500'}`}
                                placeholder="Write your context and feedback here..."
                                autoCapitalize="words"
                                value={feedback}
                                onChange={(e) => setFeedback(capitalizeWords(e.target.value))}
                            />
                        </div>

                        {/* Footer Buttons */}
                        <div className="flex justify-end gap-3 pt-6 border-t border-gray-100 dark:border-[#333] mt-auto">
                            {!isReadOnly ? (
                                <>
                                    <button
                                        onClick={onClose}
                                        disabled={isSubmitting}
                                        className="px-6 py-3 rounded-[12px] border border-[#E5E7EB] dark:border-[#444] text-[#333333] dark:text-[#D1D5DB] font-semibold text-[15px] hover:bg-gray-50 dark:hover:bg-[#222] transition-colors disabled:opacity-50 cursor-pointer"
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        onClick={handleSubmit}
                                        disabled={!marks || isSubmitting}
                                        className="flex items-center gap-2 px-8 py-3 rounded-[12px] bg-[#F67300] text-white font-semibold text-[15px] focus:ring-4 focus:ring-orange-100 dark:focus:ring-orange-900 hover:bg-[#E86A00] transition-all shadow-md shadow-orange-100 dark:shadow-none disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 size={18} className="animate-spin" />
                                                <span>Submitting...</span>
                                            </>
                                        ) : (
                                            <span>Submit Grade</span>
                                        )}
                                    </button>
                                </>
                            ) : (
                                <button
                                    onClick={onClose}
                                    className="px-8 py-3 rounded-[12px] border border-[#E5E7EB] dark:border-[#444] text-[#333333] dark:text-[#D1D5DB] font-semibold text-[15px] hover:bg-gray-50 dark:hover:bg-[#222] transition-colors cursor-pointer"
                                >
                                    Close
                                </button>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ReviewSubmissionModal;

