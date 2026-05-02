import { useNavigate } from "react-router-dom";
import { Users, Clock } from "lucide-react";
import type { BatchCardData } from "../../../../../types/course";

interface Props {
  batch: BatchCardData;
}

export default function BatchListCard({ batch }: Props) {
  const navigate = useNavigate();
  // Using fixed progress for exact match with design image (65%)
  const progress = 65;

  return (
    <div
      onClick={() =>
        navigate(`/admin/courses/${batch.courseId}/batches/${batch.id}`)
      }
      className="boxStyle transition-all cursor-pointer hover:bg-white/60! hover:shadow-xs"  
    >
      {/* Top Row: Batch Code & Status */}
      <div className="flex items-center justify-between mb-5">
        <div className="bg-[#F6FAFF] px-2.5 py-1.5  dark:bg-[#0066FF]/10 rounded-xl">
          <span className="text-[#0058BC] text-[13px] font-medium ">
            {batch.id.startsWith("b1") ? "AM101-B01" :
              batch.id.startsWith("b2") ? "AM101-B02" :
                batch.id.startsWith("b3") ? "AM101-B03" : "AM101-B04"}
          </span>
        </div>
        <span className="bg-[#D1FAE5] text-[#047857] px-3 py-1 rounded-full text-[11px] font-medium border border-[#D1FAE5]">
          Active
        </span>
        
      </div>

      {/* Instructor Info */}
      <div className="flex items-center gap-3 mb-4">
        <img
          src={batch.instructor.avatar || `https://i.pravatar.cc/150?u=${batch.id}`}
          alt={batch.instructor.name}
          className="w-11 h-11 rounded-full object-cover"
        />
        <div>
          <h4 className="text-[#475569] dark:text-white md:text-base text-sm font-bold leading-tight">
            {batch.instructor.name}
          </h4>
          <p className="text-[#64748B] text-xs md:text-[14px] font-regular">Lead Instructor</p>
        </div>
      </div>

      {/* Optional: Session Info (as seen in B04) */}
      {batch.id === "b4" && (
        <div className="flex items-center gap-1.5 text-[#475569] dark:text-[#A3A3A3] mb-4">
          <Clock size={14} />
          <span className="text-[11px] md:text-[13px]  font-medium">Session Starts in 5 mins</span>
        </div>
      )}

      {/* Progress Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] md:text-[12px] text-[#64748B] dark:text-[#A3A3A3] font-semibold">Completion</span>
          <span className="text-[12px] text-[#0B1C30] dark:text-white font-bold">{progress}%</span>
        </div>
        <div className="h-2 bg-[#F3F5F7] dark:bg-[#3B3B3B] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#F67300] rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Bottom Row: Avatars & Count */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <div className="flex -space-x-2">
            {[1, 2].map(i => (
              <img
                key={i}
                src={`https://i.pravatar.cc/150?u=student${batch.id}${i}`}
                className="w-6 h-6 rounded-full border-2 border-white dark:border-[#2A2A2A] object-cover"
                alt="student"
              />
            ))}
          </div>
          <span className="-ml-3 text-[10px] bg-[#F1F5F9] p-1 rounded-full  text-[#64748B] dark:text-[#A3A3A3] font-bold">+{batch.totalStudents - 2}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Users size={14} className="text-[#94A3B8] dark:text-[#A3A3A3]" />
          <span className="text-[12px] text-[#94A3B8] dark:text-[#A3A3A3] font-bold">{batch.totalStudents}</span>
        </div>
      </div>
    </div>
  );
}
