import { useState, useEffect } from "react";
import { X } from "lucide-react";

interface Props {
  onClose: () => void;
  onSubmit: (data: CourseFormData) => void;
}

export interface CourseFormData {
  batchId: string;
  courseId: string;
  courseTitle: string;
  description: string;
  duration: string;
  leadInstructor: string;
}

const initialForm: CourseFormData = {
  batchId: "",
  courseId: "",
  courseTitle: "",
  description: "",
  duration: "",
  leadInstructor: "",
};

export default function AddCourseModal({ onClose, onSubmit }: Props) {
  const [form, setForm] = useState<CourseFormData>(initialForm);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger slide-in after mount
    setIsVisible(true);
  }, []);

  const handleClose = () => {
    // Trigger slide-out, then call parent onClose
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300); // 300ms matches the transition duration
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
    handleClose();
  };

  return (
    <div 
      onClick={handleClose}
      className={`fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className={`bg-white dark:bg-[#2A2A2A] w-full md:w-[450px] h-full shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out ${
          isVisible ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#F2EEF4] dark:border-[#3B3B3B]">
          <div>
            <h2 className="text-xl font-semibold text-[#333333] dark:text-white">
              Course Details
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 hover:bg-[#F5F5F5] dark:hover:bg-[#3B3B3B] rounded-lg transition-colors cursor-pointer"
          >
            <X size={20} className="text-[#626262] dark:text-[#A3A3A3]" />
          </button>
        </div>

        {/* Scrollable Form Content */}
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Batch ID */}
            <div>
              <label className="block text-sm font-medium text-[#626262] dark:text-[#A3A3A3] mb-1.5">
                Batch ID
              </label>
              <input
                type="text"
                name="batchId"
                value={form.batchId}
                onChange={handleChange}
                placeholder="Batch Id"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E8E8] dark:border-[#3B3B3B] bg-white dark:bg-[#2A2A2A] text-[#333333] dark:text-white placeholder-[#C0C0C0] text-sm outline-none focus:border-[#F67300] transition-colors"
              />
            </div>

            {/* Course ID */}
            <div>
              <label className="block text-sm font-medium text-[#626262] dark:text-[#A3A3A3] mb-1.5">
                Course ID
              </label>
              <input
                type="text"
                name="courseId"
                value={form.courseId}
                onChange={handleChange}
                placeholder="E.g Am101"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E8E8] dark:border-[#3B3B3B] bg-white dark:bg-[#2A2A2A] text-[#333333] dark:text-white placeholder-[#C0C0C0] text-sm outline-none focus:border-[#F67300] transition-colors"
              />
            </div>

            {/* Course Title */}
            <div>
              <label className="block text-sm font-medium text-[#626262] dark:text-[#A3A3A3] mb-1.5">
                Course Title
              </label>
              <input
                type="text"
                name="courseTitle"
                value={form.courseTitle}
                onChange={handleChange}
                placeholder="E.g  AI/ML"
                required
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E8E8] dark:border-[#3B3B3B] bg-white dark:bg-[#2A2A2A] text-[#333333] dark:text-white placeholder-[#C0C0C0] text-sm outline-none focus:border-[#F67300] transition-colors"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-[#626262] dark:text-[#A3A3A3] mb-1.5">
                Description
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Enter The Description"
                rows={3}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E8E8] dark:border-[#3B3B3B] bg-white dark:bg-[#2A2A2A] text-[#333333] dark:text-white placeholder-[#C0C0C0] text-sm outline-none focus:border-[#F67300] transition-colors resize-none"
              />
            </div>

            {/* Duration */}
            <div>
              <label className="block text-sm font-medium text-[#626262] dark:text-[#A3A3A3] mb-1.5">
                Duration
              </label>
              <input
                type="text"
                name="duration"
                value={form.duration}
                onChange={handleChange}
                placeholder="e.g. 3 Months"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E8E8] dark:border-[#3B3B3B] bg-white dark:bg-[#2A2A2A] text-[#333333] dark:text-white placeholder-[#C0C0C0] text-sm outline-none focus:border-[#F67300] transition-colors"
              />
            </div>

            {/* Lead Instructor */}
            <div>
              <label className="block text-sm font-medium text-[#626262] dark:text-[#A3A3A3] mb-1.5">
                Lead Instructor
              </label>
              <input
                type="text"
                name="leadInstructor"
                value={form.leadInstructor}
                onChange={handleChange}
                placeholder="Instructor"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E8E8] dark:border-[#3B3B3B] bg-white dark:bg-[#2A2A2A] text-[#333333] dark:text-white placeholder-[#C0C0C0] text-sm outline-none focus:border-[#F67300] transition-colors"
              />
            </div>
          </form>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-[#F2EEF4] dark:border-[#3B3B3B] bg-white dark:bg-[#2A2A2A]">
          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={handleClose}
              className="px-5 py-2.5 rounded-xl border border-[#E8E8E8] dark:border-[#3B3B3B] text-[#626262] dark:text-[#A3A3A3] text-sm font-medium hover:bg-[#F5F5F5] dark:hover:bg-[#3B3B3B] transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="px-5 py-2.5 rounded-xl bg-[#F67300] text-white text-sm font-medium hover:bg-[#E06500] transition-colors cursor-pointer"
            >
              Publish Course
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
