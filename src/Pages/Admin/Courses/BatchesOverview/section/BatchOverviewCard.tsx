import { Mail } from "lucide-react";
import type { StudentData } from "../../../../../types/course";

interface Props {
  student: StudentData;
}

export default function BatchOverviewCard({ student }: Props) {
  return (
    <div className="bg-white dark:bg-[#2A2A2A] rounded-[24px] border border-[#F3F5F7] dark:border-[#3B3B3B] p-6 shadow-sm hover:shadow-md transition-all">
      {/* Top Section: Avatar & Info */}
      <div className="flex items-center gap-4 mb-6">
        <img
          src={student.avatar || `https://i.pravatar.cc/150?u=${student.id}`}
          alt={student.name}
          className="w-14 h-14 rounded-full object-cover border-2 border-white dark:border-[#2A2A2A] shadow-sm"
        />
        <div className="min-w-0">
          <h3 className="text-[#333333] dark:text-white text-base font-bold truncate">
            {student.name}
          </h3>
          <p className="text-[#626262] dark:text-[#A3A3A3] text-[13px] truncate">
            {student.email}
          </p>
        </div>
      </div>

      {/* Progress Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] text-[#626262] dark:text-[#A3A3A3] font-medium">Progress</span>
          <span className="text-[11px] text-[#F67300] font-bold">{student.progress}%</span>
        </div>
        <div className="h-1.5 bg-[#F3F5F7] dark:bg-[#3B3B3B] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#F67300] rounded-full transition-all duration-500"
            style={{ width: `${student.progress}%` }}
          />
        </div>
      </div>

      {/* Bottom Section: Status, Date & Contact */}
      <div className="flex items-center justify-between pt-4 border-t border-[#F3F5F7] dark:border-[#3B3B3B]">
        <div className="flex flex-col gap-1">
          <span className={`w-fit px-3 py-0.5 rounded-full text-[10px] font-semibold ${
            student.status === "active" 
              ? "bg-[#E8F8F0] text-[#22C55E]" 
              : "bg-[#FEECEB] text-[#F43F5E]"
          }`}>
            {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
          </span>
          <span className="text-[10px] text-[#A3A3A3] font-medium">
            Joined: {student.joinedDate}
          </span>
        </div>
        
        <button className="flex items-center gap-1.5 text-[#F67300] text-sm font-bold hover:underline cursor-pointer">
          <Mail size={14} />
          Contact
        </button>
      </div>
    </div>
  );
}
