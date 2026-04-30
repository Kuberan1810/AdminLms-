import {
  Users,
  CalendarDays,
  Clock,
  GraduationCap,
  BarChart2,
} from "lucide-react";

interface Props {
  batchName: string;
  instructor: { name: string; avatar: string };
  startDate: string;
  endDate: string;
  totalStudents: number;
  capacity: number;
  status: "active" | "upcoming" | "completed";
  progress: number;
}

const statusConfig = {
  active: {
    label: "Active",
    className: "bg-[#E8F8F0] text-[#22C55E]",
  },
  upcoming: {
    label: "Upcoming",
    className: "bg-[#FFF5EB] text-[#F67300]",
  },
  completed: {
    label: "Completed",
    className: "bg-[#F0F0F0] text-[#626262]",
  },
};

export default function BatchInfoHeader({
  batchName,
  instructor,
  startDate,
  endDate,
  totalStudents,
  capacity,
  status,
  progress,
}: Props) {
  const s = statusConfig[status];
  const fillPercent = Math.round((totalStudents / capacity) * 100);

  return (
    <div className="bg-white dark:bg-[#2A2A2A] rounded-2xl border border-[#F3F5F7] dark:border-[#3B3B3B] p-6">
      {/* Top row: name + status */}
      <div className="flex items-start justify-between gap-3 mb-4 flex-wrap">
        <div>
          <h2 className="text-xl font-semibold text-[#333333] dark:text-white mb-1">
            {batchName}
          </h2>
          {/* Instructor */}
          <div className="flex items-center gap-2">
            <img
              src={instructor.avatar}
              alt={instructor.name}
              className="w-7 h-7 rounded-full object-cover border-2 border-[#F3F5F7] dark:border-[#3B3B3B]"
              onError={(e) => {
                const t = e.target as HTMLImageElement;
                t.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(instructor.name)}&background=F67300&color=fff&size=28`;
              }}
            />
            <div>
              <p className="text-[11px] text-[#A3A3A3]">Instructor</p>
              <p className="text-sm font-medium text-[#333333] dark:text-white">
                {instructor.name}
              </p>
            </div>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${s.className}`}>
          {s.label}
        </span>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-[#FFF5EB] dark:bg-[#F67300]/10 flex items-center justify-center">
            <CalendarDays size={16} className="text-[#F67300]" />
          </div>
          <div>
            <p className="text-xs text-[#A3A3A3]">Start</p>
            <p className="text-sm font-semibold text-[#333333] dark:text-white">{startDate}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-[#FEF9EC] dark:bg-[#F59E0B]/10 flex items-center justify-center">
            <Clock size={16} className="text-[#F59E0B]" />
          </div>
          <div>
            <p className="text-xs text-[#A3A3A3]">End</p>
            <p className="text-sm font-semibold text-[#333333] dark:text-white">{endDate}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-[#EEF2FF] dark:bg-[#6366F1]/10 flex items-center justify-center">
            <Users size={16} className="text-[#6366F1]" />
          </div>
          <div>
            <p className="text-xs text-[#A3A3A3]">Enrolled</p>
            <p className="text-sm font-semibold text-[#333333] dark:text-white">
              {totalStudents} / {capacity}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-[#E8F8F0] dark:bg-[#22C55E]/10 flex items-center justify-center">
            <BarChart2 size={16} className="text-[#22C55E]" />
          </div>
          <div>
            <p className="text-xs text-[#A3A3A3]">Avg Progress</p>
            <p className="text-sm font-semibold text-[#333333] dark:text-white">{progress}%</p>
          </div>
        </div>
      </div>

      {/* Capacity bar */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs text-[#626262] dark:text-[#A3A3A3]">Capacity Filled</span>
          <span className="text-xs font-semibold text-[#F67300]">{fillPercent}%</span>
        </div>
        <div className="h-2 bg-[#F3F5F7] dark:bg-[#3B3B3B] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#F67300] to-[#FFB36B] rounded-full transition-all duration-700"
            style={{ width: `${fillPercent}%` }}
          />
        </div>
      </div>
    </div>
  );
}
