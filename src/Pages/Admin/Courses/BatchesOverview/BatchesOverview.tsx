import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft, Edit2, Check, X } from "lucide-react";
import BatchListCard from "./section/BatchListCard";
import type { BatchCardData } from "../../../../types/course";

const mockCourseDetail: Record<
  string,
  {
    id: string;
    title: string;
    description: string;
    batches: BatchCardData[];
  }
> = {
  "AM101": {
    id: "AM101",
    title: "AI / ML Frontier AI Engineer",
    description:
      "The AI / ML Frontier AI Engineer course is designed to equip learners with the skills required to build, deploy, and scale real-world AI and machine learning solutions. This course covers the complete AI/ML lifecycle—from data preparation and model development to deployment and monitoring in production environments.",
    batches: [
      { id: "b1", courseId: "AM101", batchName: "Batch 01", instructor: { name: "David", avatar: "" }, startDate: "Jan 10", endDate: "Apr 05", totalStudents: 32, capacity: 40, status: "active" },
      { id: "b2", courseId: "AM101", batchName: "Batch 02", instructor: { name: "David", avatar: "" }, startDate: "Feb 15", endDate: "May 10", totalStudents: 28, capacity: 40, status: "active" },
      { id: "b3", courseId: "AM101", batchName: "Batch 03", instructor: { name: "David", avatar: "" }, startDate: "Mar 01", endDate: "Jun 20", totalStudents: 35, capacity: 40, status: "active" },
      { id: "b4", courseId: "AM101", batchName: "Batch 04", instructor: { name: "David", avatar: "" }, startDate: "Jun 01", endDate: "Aug 15", totalStudents: 5, capacity: 40, status: "active" },
    ],
  },
};

export default function BatchesOverview() {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();

  const initialCourse = mockCourseDetail[courseId ?? "AM101"] ?? mockCourseDetail["AM101"];
  const [isEditing, setIsEditing] = useState(false);
  const [course, setCourse] = useState(initialCourse);
  const [tempCourse, setTempCourse] = useState(initialCourse);

  const handleSave = () => {
    setCourse(tempCourse);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempCourse(course);
    setIsEditing(false);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-10 pb-10">
      {/* ─── Header ─────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate("/admin/courses")}
          className="flex items-center gap-2 text-[#333333] dark:text-white hover:opacity-80 transition-opacity cursor-pointer group"
        >
          <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
          <span className="md:text-xl text-lg  font-medium ">{course.id}</span>
        </button>

        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <button onClick={handleSave} className="p-2 rounded-xl border border-green-200 bg-green-50 text-green-600 cursor-pointer">
                <Check size={20} />
              </button>
              <button onClick={handleCancel} className="p-2 rounded-xl border border-red-200 bg-red-50 text-red-600 cursor-pointer">
                <X size={20} />
              </button>
            </>
          ) : (
            <button onClick={() => setIsEditing(true)} className="p-2 rounded-xl border border-[#F2EEF4] dark:border-[#3B3B3B] hover:bg-gray-50 cursor-pointer">
              <Edit2 size={20} className="text-[#626262]" />
            </button>
          )}
        </div>
      </div>

      <div className="space-y-4">
        {isEditing ? (
          <div className="space-y-4">
            <input
              type="text"
              value={tempCourse.title}
              onChange={(e) => setTempCourse({ ...tempCourse, title: e.target.value })}
              className="w-full text-2xl font-bold text-[#333333] dark:text-white bg-transparent border-b border-[#F67300] focus:outline-none"
            />
            <textarea
              value={tempCourse.description}
              onChange={(e) => setTempCourse({ ...tempCourse, description: e.target.value })}
              rows={4}
              className="w-full text-base text-[#626262] dark:text-[#A3A3A3] leading-relaxed bg-transparent border border-[#E2E8F0] rounded-xl p-4 focus:outline-none focus:border-[#F67300]"
            />
          </div>
        ) : (
          <>
            <h1 className="md:text-2xl text-xl  font-semibold text-[#333333] dark:text-white">{course.title}</h1>
            <p className="md:text-base text-sm text-[#64748B] dark:text-[#A3A3A3] leading-relaxed max-w-7xl">
              {course.description}
            </p>
          </>
        )}
      </div>

      {/* ─── Batches Overview Section ─────────────────────────────────── */}
      <div className="space-y-6">
        <h2 className="text-lg md:text-xl font-medium text-[#333333] dark:text-white  tracking-wider">Batches Overview</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {course.batches.map((batch) => (
            <BatchListCard key={batch.id} batch={batch} />
          ))}
        </div>
      </div>
    </div>
  );
}
