import { useState } from "react";
import { ArrowLeft, Notification } from "iconsax-react";
import { ChevronDown } from "lucide-react";

interface AddStudentModalProps {
  onClose: () => void;
  onBack: () => void;
}

const AddStudentModal = ({ onClose, onBack }: AddStudentModalProps) => {
  const classOptions = ["Advanced AI", "React Basics", "UI UX"];
  const batchOptions = ["Batch-01", "Batch-02", "Batch-03"];

  const [classOpen, setClassOpen] = useState(false);
  const [batchOpen, setBatchOpen] = useState(false);

  const [selectedClass, setSelectedClass] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("");

  return (
    <div className="fixed inset-0 bg-black/30 z-[1100]">
      <div className="bg-white w-full h-full flex overflow-hidden relative">
        {/* Left Sidebar */}
        <div className="w-[261px] bg-[#F67300] p-[30px] flex flex-col gap-[40px] text-white">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-sm font-medium hover:opacity-80"
          >
            <ArrowLeft size={20}  color="white" />
            Back
          </button>

          <div className="w-[84px] h-[84px] bg-white/20 rounded-[30px] flex items-center justify-center">
            <Notification size={42}  color="white" />
          </div>

          <div>
            <h2 className="text-[32px] font-semibold mb-2 font-['Urbanist']">
              Add Student
            </h2>
            <p className="text-[16px] font-medium text-white/90">
              Enroll a new learner.
            </p>
          </div>
        </div>

        {/* Right Content */}
        <div className="flex-1 p-[40px] flex flex-col">
          <div className="mb-[30px] max-w-[573px]">
            <h2 className="text-[36px] font-semibold text-[#333333] font-['Urbanist']">
              Student Enrollment
            </h2>
          </div>

          <form className="flex flex-col gap-[20px] flex-1 max-w-[573px]">
            {/* Class Name / ID */}
            <div className="flex flex-col gap-[8px]">
              <label className="text-[16px] font-medium text-[#333333] font-['Urbanist']">
                Class Name / ID
              </label>

              <div className="relative">
                <div
                  onClick={() => setClassOpen(!classOpen)}
                  className="w-full h-[45px] px-[15px]
                  rounded-[10px] border border-[#D3D3D3]
                  bg-white flex items-center justify-between
                  cursor-pointer"
                >
                  <span
                    className={
                      selectedClass ? "text-[#333333]" : "text-[#F67300]"
                    }
                  >
                    {selectedClass || "E.g Advanced AI"}
                  </span>
                  <ChevronDown size={20} color="#333333" />
                </div>

                {classOpen && (
                  <div className="absolute mt-1 w-full bg-white rounded-[12px] border border-[#E5E5E5] shadow-lg z-[1200]">
                    {classOptions.map((item) => (
                      <div
                        key={item}
                        onClick={() => {
                          setSelectedClass(item);
                          setClassOpen(false);
                        }}
                        className={`px-4 py-3 flex items-center justify-between cursor-pointer
                        hover:bg-[#F5F7FF]
                        ${
                          selectedClass === item
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

            {/* Auto-Generated Student ID */}
            <div className="flex flex-col gap-[8px]">
              <label className="text-[16px] font-medium text-[#333333] font-['Urbanist']">
                Auto-Generated Student ID
              </label>
              <div className="relative">
                <span className="absolute left-[15px] top-1/2 -translate-y-1/2 text-[#D3D3D3]">
                  E.g
                </span>
                <input
                  type="text"
                  defaultValue="Am101"
                  disabled
                  className="w-full h-[45px] pl-[45px] pr-[15px] rounded-[10px]
                  border border-[#D3D3D3] bg-[#F2F2F2]
                  text-[#F67300] font-medium cursor-not-allowed"
                />
              </div>
            </div>

            {/* First & Last Name */}
            <div className="flex gap-[20px]">
              <input
                placeholder="First Name"
                className="flex-1 h-[45px] px-[15px] rounded-[10px] border border-[#D3D3D3] outline-none focus:border-[#F67300]"
              />
              <input
                placeholder="Last Name"
                className="flex-1 h-[45px] px-[15px] rounded-[10px] border border-[#D3D3D3] outline-none focus:border-[#F67300]"
              />
            </div>

            {/* Email */}
            <input
              type="email"
              placeholder="indhu@gmail.com"
              className="w-full h-[45px] px-[15px] rounded-[10px] border border-[#D3D3D3] outline-none focus:border-[#F67300]"
            />

            {/* Assign to Batch */}
            <div className="flex flex-col gap-[8px]">
              <label className="text-[16px] font-medium text-[#333333] font-['Urbanist']">
                Assign to Batch
              </label>

              <div className="relative">
                <div
                  onClick={() => setBatchOpen(!batchOpen)}
                  className="w-full h-[45px] px-[15px]
                  rounded-[10px] border border-[#D3D3D3]
                  bg-white flex items-center justify-between
                  cursor-pointer"
                >
                  <span
                    className={
                      selectedBatch ? "text-[#333333]" : "text-[#D3D3D3]"
                    }
                  >
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
                        ${
                          selectedBatch === item
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
          </form>

          {/* Footer */}
          <div className="flex justify-end gap-[15px] mt-8 max-w-[573px]">
            <button
              onClick={onClose}
              className="w-[153px] h-[44px] rounded-[12px] border border-[#333333] text-[#333333]"
            >
              Cancel
            </button>
            <button className="w-[153px] h-[44px] rounded-[12px] bg-[#F67300] text-white">
              Enroll
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddStudentModal;
