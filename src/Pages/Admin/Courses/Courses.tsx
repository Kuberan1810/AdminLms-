import { useState } from "react";
import { Search, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import BatchCards from "./section/BatchCards";
import type { CourseCardData } from "../../../types/course";
import AddCourseModal from "./section/AddCourseModal";

// ─── Mock Data ──────────────────────────────────────────────────────────────
const mockCourses: CourseCardData[] = [
  {
    id: "AM101",
    title: "AI / ML Frontier AI Engineer",
    description: "Master modern web technologies including React, Node.js, Express and MongoDB.",
    instructor: { name: "David ,Hem...", avatar: "" },
    duration: "12 Weeks",
    totalBatches: 4,
    totalStudents: 28,
    activeStudents: 28,
    progress: 68,
    status: "active",
    thumbnail: "",
  },
  {
    id: "Q1103",
    title: "Quantum Intelligence",
    description: "Learn design thinking, wireframing, prototyping and user research.",
    instructor: { name: "Sonal", avatar: "" },
    duration: "8 Weeks",
    totalBatches: 2,
    totalStudents: 28,
    activeStudents: 28,
    progress: 82,
    status: "active",
    thumbnail: "",
  },
  {
    id: "SS102",
    title: "System and Software System Pro",
    description: "Comprehensive introduction to Python, data analysis, visualization.",
    instructor: { name: "David ,Hem...", avatar: "" },
    duration: "16 Weeks",
    totalBatches: 4,
    totalStudents: 28,
    activeStudents: 28,
    progress: 45,
    status: "active",
    thumbnail: "",
  },
  {
    id: "Q1103-2",
    title: "Quantum Intelligence",
    description: "Learn SEO, social media marketing, Google Ads, email campaigns.",
    instructor: { name: "Sonal", avatar: "" },
    duration: "6 Weeks",
    totalBatches: 1,
    totalStudents: 28,
    activeStudents: 28,
    progress: 91,
    status: "active",
    thumbnail: "",
  },
  {
    id: "SS102-2",
    title: "System and Software System Pro",
    description: "Hands-on training in AWS services including EC2, S3, Lambda.",
    instructor: { name: "David ,Hem...", avatar: "" },
    duration: "10 Weeks",
    totalBatches: 4,
    totalStudents: 28,
    activeStudents: 28,
    progress: 10,
    status: "active",
    thumbnail: "",
  },
  {
    id: "AM101-2",
    title: "AI / ML Frontier AI Engineer",
    description: "Build cross-platform iOS and Android apps using Flutter and Dart.",
    instructor: { name: "David ,Hem...", avatar: "" },
    duration: "14 Weeks",
    totalBatches: 3,
    totalStudents: 28,
    activeStudents: 28,
    progress: 55,
    status: "active",
    thumbnail: "",
  },
  {
    id: "Q1103-3",
    title: "Quantum Intelligence",
    description: "Quantum physics and intelligence systems.",
    instructor: { name: "David ,Hem...", avatar: "" },
    duration: "12 Weeks",
    totalBatches: 4,
    totalStudents: 28,
    activeStudents: 28,
    progress: 30,
    status: "active",
    thumbnail: "",
  },
  {
    id: "AM101-3",
    title: "AI / ML Frontier AI Engineer",
    description: "Advanced AI engineering concepts.",
    instructor: { name: "David", avatar: "" },
    duration: "12 Weeks",
    totalBatches: 1,
    totalStudents: 28,
    activeStudents: 28,
    progress: 15,
    status: "active",
    thumbnail: "",
  },
  {
    id: "SS102-3",
    title: "System and Software System Pro",
    description: "Pro level system software architecture.",
    instructor: { name: "David ,Hem...", avatar: "" },
    duration: "12 Weeks",
    totalBatches: 4,
    totalStudents: 28,
    activeStudents: 28,
    progress: 40,
    status: "active",
    thumbnail: "",
  },
];

export default function Courses() {
  const [showModal, setShowModal] = useState(false);
  const [courses] = useState<CourseCardData[]>(mockCourses);

  return (
    <div className="space-y-8 pb-10">
      {/* ─── Header Action ─────────────────────────────────────────── */}
      <div className="flex justify-end">
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-6 py-3.5 bg-[#F67300] hover:bg-[#E06500] text-white rounded-2xl text-base font-bold transition-all  cursor-pointer"
        >
          <div className="w-5 h-5 rounded-full border-2 border-white flex items-center justify-center">
            <Plus size={12} strokeWidth={4} />
          </div>
          Create New Course
        </button>
      </div>

      {/* ─── Course Grid ───────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {courses.map((course) => (
          <BatchCards key={course.id} course={course} />
        ))}
      </div>

      {/* ─── Pagination ───────────────────────────────────────────── */}
      <div className="bg-white dark:bg-[#2A2A2A] rounded-[16px] border border-[#F3F5F7] py-4 px-6 dark:border-[#3B3B3B]  flex items-center justify-between ">
        <p className="text-sm text-[#626262] dark:text-[#A3A3A3] font-medium">
          Showing <span className="text-[#333333] dark:text-white font-bold">1</span> of <span className="text-[#333333] dark:text-white font-bold">09</span> courses
        </p>
        
        <div className="flex items-center gap-2">
           <button className="p-2 rounded-lg text-[#626262] dark:text-[#A3A3A3] hover:bg-[#FAFAFA] dark:hover:bg-[#3B3B3B] transition-colors cursor-pointer">
              <ChevronLeft size={20} />
           </button>
           <div className="flex items-center gap-1">
              <button className="w-10 h-10 rounded-lg bg-[#FFF5EB] text-[#F67300] font-bold flex items-center justify-center cursor-pointer">1</button>
           </div>
           <button className="p-2 rounded-lg text-[#626262] dark:text-[#A3A3A3] hover:bg-[#FAFAFA] dark:hover:bg-[#3B3B3B] transition-colors cursor-pointer">
              <ChevronRight size={20} />
           </button>
        </div>
      </div>

      {/* ─── Add Course Modal ──────────────────────────────────────── */}
      {showModal && (
        <AddCourseModal
          onClose={() => setShowModal(false)}
          onSubmit={(data) => {
            console.log(data);
          }}
        />
      )}
    </div>
  );
}