import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, TickCircle } from 'iconsax-react';

interface SubmitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SubmitModal: React.FC<SubmitModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleGoDashboard = () => {
    onClose();
    navigate('/student/dashboard'); // Route to Dashboard/Assignment list
  };

  return (
    <div className="fixed inset-0 z-999 flex items-center justify-center px-5">
      {/* Background Overlay with Blur */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative bg-white rounded-[40px] p-10 w-full max-w-md shadow-2xl flex flex-col items-center text-center animate-in fade-in zoom-in duration-300">
        
        {/* Success Icon */}
        <div className=" rounded-full flex items-center justify-center mb-6 ">
          <TickCircle size="64" variant="Bold"  color='green'/>
        </div>

        {/* Text Content */}
        <h2 className="md:text-2xl text-lg  font-medium text-[#333] mb-2">Assignment Submitted!</h2>
        <p className="text-[#808080] text-sm md:text-lg mb-5">
          Your files have been successfully uploaded and sent to the instructor for evaluation.
        </p>

        {/* Buttons Row */}
        <div className="flex flex-col w-full gap-4">
          {/* Eye Icon Button - Orange/Red Gradient Style */}
          <button
            onClick={() => console.log("Viewing Submission...")}
            className=" flex items-center justify-center gap-3 py-3 orange text-white font-bold rounded-2xl cursor-pointer hover:opacity-90 transition-all active:scale-95"
          >
            <Eye size="25" variant="Bold" color='white'/>
            <span className="md:text-lg  text-base font-semibold tracking-wider">View My Submission</span>
          </button>

          {/* Back to Dashboard Button */}
          <button
            onClick={handleGoDashboard}
            className="w-full text-md py-4 text-[#808080] font-medium hover:text-[#333] transition-colors cursor-pointer"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubmitModal;