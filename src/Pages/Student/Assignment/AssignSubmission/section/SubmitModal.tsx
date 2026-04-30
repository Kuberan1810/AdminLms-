import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, TickCircle, ArrowRight } from 'iconsax-react';

interface SubmitModalProps {
  isOpen: boolean;
  onClose: () => void;
  assignmentId?: number;
}

const SubmitModal: React.FC<SubmitModalProps> = ({ isOpen, onClose, assignmentId }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleGoDashboard = () => {
    onClose();
    navigate('/student/assignments'); 
  };

  const handleViewSubmission = () => {
    onClose();
    if (assignmentId) {
      navigate(`/student/assignment/${assignmentId}/view-submission`);
    } else {
      handleGoDashboard();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-5">
      {/* Background Overlay with Blur */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative bg-white dark:bg-[#1E1E1E] rounded-[32px] p-8 md:p-10 w-full max-w-md shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-none border border-transparent dark:border-[#333] flex flex-col items-center text-center animate-in fade-in zoom-in duration-300">
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-green-500/10 blur-3xl rounded-full pointer-events-none"></div>

        {/* Success Icon */}
        <div className="relative w-24 h-24 bg-green-50 dark:bg-green-500/10 rounded-full flex items-center justify-center mb-6 shadow-inner ring-4 ring-white dark:ring-[#1E1E1E]">
          <TickCircle size="48" variant="Bold" color='currentColor' className="text-green-500" />
        </div>

        {/* Text Content */}
        <h2 className="relative md:text-2xl text-xl font-bold text-[#333] dark:text-white mb-3">
          Assignment Submitted!
        </h2>
        <p className="relative text-[#626262] dark:text-gray-400 text-sm md:text-base leading-relaxed mb-8 px-4">
          Your files have been successfully uploaded and sent to the instructor for evaluation. Great job!
        </p>

        {/* Buttons Row */}
        <div className="relative flex flex-col w-full gap-3">
          {/* Main Action Button */}
          <button
            onClick={handleViewSubmission}
            className="flex items-center justify-center gap-2 py-3.5 bg-[#F67300] hover:bg-[#fa943a] text-white font-semibold rounded-2xl cursor-pointer transition-all shadow-[0_8px_20px_rgba(246,115,0,0.25)] hover:shadow-[0_10px_25px_rgba(246,115,0,0.35)] active:scale-95"
          >
            <Eye size="20" variant="Bold" />
            <span className="tracking-wide">View My Submission</span>
          </button>

          {/* Secondary Action Button */}
          <button
            onClick={handleGoDashboard}
            className="flex items-center justify-center gap-2 py-3.5 bg-gray-50 dark:bg-[#2A2A2A] hover:bg-gray-100 dark:hover:bg-[#333] text-[#4D4D4D] dark:text-gray-300 font-medium rounded-2xl cursor-pointer transition-colors"
          >
            <span className="tracking-wide">Back to Assignments</span>
            <ArrowRight size="18" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubmitModal;