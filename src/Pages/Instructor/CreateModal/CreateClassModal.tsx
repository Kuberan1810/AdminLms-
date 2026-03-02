import { useState } from "react";
import { ArrowLeft,Calendar, DocumentText, ArrowDown2} from "iconsax-react";

interface CreateClassModalProps {
  onClose: () => void;
  onBack: () => void;
}

const CreateClassModal = ({ onClose, onBack }: CreateClassModalProps) => {
  const classOptions = ["Advanced AI", "React Basics"];

  const [classOpen, setClassOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState("");

  return (
    <div className="fixed inset-0 bg-black/30 z-[1100]">
      <div className="bg-white w-full h-full flex overflow-hidden relative">
        {/* Left Sidebar */}
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
              Create New Class
            </h2>

            <p className="text-[14px] font-medium leading-[100%] font-['Urbanist']">
              Set up a new learning environment for your students. Assign a
              course, define the schedule, and start your journey.
            </p>
          </div>

          {/* Decorative circles */}
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-white/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-20 -right-20 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        </div>

        {/* Right Content */}
        <div className="flex-1 p-[40px] flex flex-col overflow-hidden">
          <div className="mb-[30px] w-[573px]">
            <h2 className="text-[32px] font-semibold text-[#333333] font-['Urbanist']">
              New Class
            </h2>
            <p className="text-[#626262] mt-2">
              Provide the necessary details to launch your next class.
            </p>
          </div>

          <form className="flex flex-col gap-[20px] flex-1 w-[573px]">
            {/* Class Name / ID */}
            <div className="flex flex-col gap-[10px]">
              <label className="text-sm font-medium text-[#333333]">
                Class Name / ID
              </label>

              <div className="relative">
                <div
                  onClick={() => setClassOpen(!classOpen)}
                  className="w-full h-[37px] px-[10px]
                  rounded-[10px] border border-[#D3D3D3]
                  bg-white flex items-center justify-between
                  cursor-pointer focus-within:border-[#F67300]"
                >
                  <span
                    className={`text-sm ${
                      selectedClass ? "text-[#333333]" : "text-[#9E9E9E]"
                    }`}
                  >
                    {selectedClass || "E.g Advanced AI"}
                  </span>

                  <ArrowDown2 size={14} color="#626262" />
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
                        className={`px-4 py-2 flex items-center justify-between
                        cursor-pointer text-sm hover:bg-[#F5F7FF]
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

            {/* Batch ID */}
            <div className="flex flex-col gap-[10px]">
              <label className="text-sm font-medium text-[#333333]">
                Batch ID
              </label>
              <input
                type="text"
                placeholder="Batch- 01"
                className="w-full h-[37px] px-[10px] rounded-[10px]
                border border-[#D3D3D3] outline-none
                focus:border-[#F67300]"
              />
            </div>

<div className="flex flex-col gap-[10px]">
  <label className="text-sm font-medium text-[#333333]">
    Schedule Time
  </label>

  <div className="flex items-center gap-[10px]">
    <input
      type="time"
      className="w-[120px] h-[37px] px-[10px]
      rounded-[10px] border border-[#D3D3D3]
      outline-none focus:border-[#F67300]
      text-[#333333]"
    />

    <span className="text-sm text-[#333333]">to</span>

    <input
      type="time"
      className="w-[120px] h-[37px] px-[10px]
      rounded-[10px] border border-[#D3D3D3]
      outline-none focus:border-[#F67300]
      text-[#333333]"
    />
  </div>
</div>

<div className="flex flex-col gap-[10px]">
  <label className="text-sm font-medium text-[#333333]">
    Select Date
  </label>

  <div className="relative w-fit">
    <input
      type="date"
      className="w-[160px] h-[38px] px-[10px]
      rounded-[10px] border border-[#D3D3D3]
      outline-none focus:border-[#F67300]
      text-[#333333]"
    />

    <div
      className="absolute right-2 top-1/2 -translate-y-1/2
      w-[30px] h-[30px] bg-[#F9F9F9]
      rounded-lg border border-[#F2F2F2]
      flex items-center justify-center pointer-events-none"
    >
      <Calendar size={16} color="#626262" />
    </div>
  </div>
</div>
</form>
          {/* Footer */}
          <div className="flex justify-end gap-[10px] mt-8 pt-4 border-t border-[#F2EEF4]">
            <button
              onClick={onClose}
              className="w-[105px] h-[30px] rounded-[10px]
              border border-[#333333] text-[#333333]
              text-[14px] font-medium hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              className="w-[105px] h-[30px] rounded-[10px]
              bg-[#F67300] text-white
              text-[14px] font-medium hover:opacity-90"
            >
              Launch Class
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateClassModal;
