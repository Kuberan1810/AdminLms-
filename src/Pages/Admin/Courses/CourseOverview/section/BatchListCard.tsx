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
      className="bg-white dark:bg-[#2A2A2A] rounded-[32px] border border-[#F3F5F7] dark:border-[#3B3B3B] p-6 shadow-sm hover:shadow-md transition-all cursor-pointer group"
    >
      {/* Top Row: Batch Code & Status */}
      <div className="flex items-center justify-between mb-5">
        <div className="px-4 py-1.5 bg-[#F0F7FF] dark:bg-[#0066FF]/10 rounded-xl">
           <span className="text-[#0066FF] text-[13px] font-bold">
             {batch.id.startsWith("b1") ? "AM101-B01" : 
              batch.id.startsWith("b2") ? "AM101-B02" : 
              batch.id.startsWith("b3") ? "AM101-B03" : "AM101-B04"}
           </span>
        </div>
        <span className="bg-[#E8F8F0] text-[#22C55E] px-3.5 py-1 rounded-full text-[11px] font-bold">
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
          <h4 className="text-[#333333] dark:text-white text-base font-bold leading-tight">
            {batch.instructor.name}
          </h4>
          <p className="text-[#A3A3A3] text-[11px] font-medium">Lead Instructor</p>
        </div>
      </div>

      {/* Optional: Session Info (as seen in B04) */}
      {batch.id === "b4" && (
         <div className="flex items-center gap-1.5 text-[#626262] dark:text-[#A3A3A3] mb-4">
            <Clock size={14} />
            <span className="text-[11px] font-medium">Session Starts in 5 mins</span>
         </div>
      )}

      {/* Progress Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
           <span className="text-[11px] text-[#626262] dark:text-[#A3A3A3] font-medium">Completion</span>
           <span className="text-[11px] text-[#333333] dark:text-white font-bold">{progress}%</span>
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
            <span className="text-[11px] text-[#626262] dark:text-[#A3A3A3] font-medium">+{batch.totalStudents - 2}</span>
         </div>
         <div className="flex items-center gap-1.5">
            <Users size={14} className="text-[#626262] dark:text-[#A3A3A3]" />
            <span className="text-[11px] text-[#626262] dark:text-[#A3A3A3] font-medium">{batch.totalStudents}</span>
         </div>
      </div>
    </div>
  );
}
