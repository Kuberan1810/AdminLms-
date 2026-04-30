import { useNavigate } from "react-router-dom";
import { ChevronRight, Users } from "lucide-react";
import type { CourseCardData } from "../../../../types/course";

interface Props {
  course: CourseCardData;
}

export default function BatchCards({ course }: Props) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/admin/courses/${course.id}`)}
      className=" boxStyle transition-all cursor-pointer group"
    >
      {/* Top Row: Batches Count & Status */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-[#0058BC] text-[13px] font-medium bg-[#F6FAFF] px-2.5 py-1.5 rounded-[10px]">
          No. of Batches : {course.totalBatches}
        </span>
        <span className="bg-[#D1FAE5] text-[#047857] px-3 py-1 rounded-full text-[11px] font-medium border border-[#D1FAE5]">
          Active
        </span>
      </div>

      {/* Course Title */}
      <h3 className="text-[#222] dark:text-white font-semibold mb-5 line-clamp-1 text-sm md:text-base">
        {course.id.startsWith("1") ? "AM101" : "Q1103"} - {course.title}
      </h3>

      {/* Instructors Row */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex -space-x-2">
          {[1, 2, 3].map((i) => (
            <img
              key={i}
              src={`https://i.pravatar.cc/150?u=${course.id}${i}`}
              alt="instructor"
              className="w-10 h-10 rounded-full border-2 border-white dark:border-[#2A2A2A] object-cover"
            />
          ))}
        </div>
        <span className="text-[#626262] dark:text-[#A3A3A3] text-sm font-medium">
          {course.instructor.name}
        </span>
      </div>

      {/* Bottom Row: Icons & View Link */}
      <div className="flex items-center justify-between border-t border-[#F3F5F7] dark:border-[#3B3B3B] pt-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <img
                  key={i}
                  src={`https://i.pravatar.cc/150?u=${course.id}${i}`}
                  alt="instructor"
                  className="w-6 h-6 rounded-full border-2 border-white dark:border-[#2A2A2A] object-cover"
                />
              ))}
            </div>
            <span className="text-[10px] bg-[#F1F5F9] p-1 rounded-full  text-[#64748B] dark:text-[#A3A3A3] font-bold">+{course.totalStudents - 2}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users size={14} color="currentColor" className="text-[#94A3B8] dark:text-[#A3A3A3]" />
            <span className="text-[11px]  text-[#94A3B8] dark:text-[#A3A3A3] font-semibold">{course.totalStudents}</span>
          </div>
        </div>

        <div className="flex items-center gap-1 text-[#F67300] text-sm font-bold group-hover:gap-2 transition-all">
          View <ChevronRight size={16} strokeWidth={3} />
        </div>
      </div>
    </div>
  );
}
