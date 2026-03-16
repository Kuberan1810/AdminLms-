import { useState } from "react";
import { ArrowLeft, NotificationBing } from "iconsax-react";
import { ChevronDown } from "lucide-react";

interface CreateAnnouncementModalProps {
  onClose: () => void;
  onBack: () => void;
}

const CreateAnnouncementModal = ({ onClose, onBack }: CreateAnnouncementModalProps) => {
  const courseOptions = ["Am101", "Advanced AI", "React Basics"];
  const batchOptions = ["Batch-01", "Batch-02", "Batch-03"];

  const [courseOpen, setCourseOpen] = useState(false);
  const [batchOpen, setBatchOpen] = useState(false);

  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("");

  return (
    <div className="fixed inset-0 bg-black/30 z-[1100]">
      <div className="bg-white w-full h-full flex overflow-hidden relative">
        {/* Left Sidebar */}
        <div className="w-[261px] bg-[#F67300] p-[30px] flex flex-col gap-[40px] text-white relative">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-sm font-medium hover:opacity-80"
          >
            <ArrowLeft size={20}  color="white" />
            Back
          </button>

          <div className="w-[84px] h-[84px] bg-white/20 rounded-[24px] flex items-center justify-center">
            <NotificationBing size={42} variant="Bold"  color="white" />
          </div>

          <div>
            <h2 className="text-[32px] font-semibold mb-2 font-['Urbanist']">
              Broadcast
            </h2>
            <p className="text-[14px] font-medium leading-[140%]">
              Send an update to all your students instantly.
            </p>
          </div>

          {/* Decorative circles */}
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-white/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-20 -right-20 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        </div>

        {/* Right Content */}
        <div className="flex-1 p-[40px] flex flex-col">
          <div className="mb-[30px] w-[573px]">
            <h2 className="text-[36px] font-semibold text-[#333333] font-['Urbanist']">
              New Announcement
            </h2>
          </div>

          <form className="flex flex-col gap-[20px] flex-1 w-[573px]">
            {/* Course Name / ID */}
            <div className="flex flex-col gap-[8px]">
              <label className="text-[16px] font-medium text-[#333333] font-['Urbanist']">
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
                        ${
                          selectedCourse === item
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
              <label className="text-[16px] font-medium text-[#333333] font-['Urbanist']">
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
                  <span className={selectedBatch ? "text-[#333333]" : "text-[#F67300]"}>
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
              <label className="text-[16px] font-medium text-[#333333] font-['Urbanist']">
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
              <label className="text-[16px] font-medium text-[#333333] font-['Urbanist']">
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
          <div className="flex justify-end gap-[10px] mt-8 w-[573px]">
            <button
              onClick={onClose}
              className="w-[126px] h-[44px] rounded-full border border-[#333333] text-[#333333]"
            >
              Cancel
            </button>
            <button className="w-[126px] h-[44px] rounded-full bg-[#F67300] text-white">
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAnnouncementModal;
