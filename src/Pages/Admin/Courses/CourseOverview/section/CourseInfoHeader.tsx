import { BookOpen, Users, Clock, GraduationCap, TrendingUp } from "lucide-react";

interface Props {
  title: string;
  description: string;
  instructor: { name: string; avatar: string };
  duration: string;
  totalBatches: number;
  totalStudents: number;
  activeStudents: number;
  overallProgress: number;
  status: "active" | "upcoming" | "completed";
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

export default function CourseInfoHeader({
  title,
  description,
  instructor,
  duration,
  totalBatches,
  totalStudents,
  activeStudents,
  overallProgress,
  status,
}: Props) {
  const s = statusConfig[status];

  return (
    <div className="bg-white dark:bg-[#2A2A2A] rounded-2xl border border-[#F3F5F7] dark:border-[#3B3B3B] p-6">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left – thumbnail placeholder */}
        <div className="w-full lg:w-72 h-44 lg:h-auto rounded-xl overflow-hidden bg-gradient-to-br from-[#FFF5EB] to-[#FFE0C2] dark:from-[#3B2800] dark:to-[#2A1A00] shrink-0 flex items-center justify-center">
          <BookOpen size={48} className="text-[#F67300]/50" />
        </div>

        {/* Right – info */}
        <div className="flex-1 space-y-4">
          {/* Title + status */}
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <h2 className="text-xl font-semibold text-[#333333] dark:text-white">{title}</h2>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold shrink-0 ${s.className}`}>
              {s.label}
            </span>
          </div>

          <p className="text-sm text-[#626262] dark:text-[#A3A3A3] leading-relaxed">
            {description}
          </p>

          {/* Instructor */}
          <div className="flex items-center gap-2">
            <img
              src={instructor.avatar}
              alt={instructor.name}
              className="w-8 h-8 rounded-full object-cover border-2 border-[#F3F5F7] dark:border-[#3B3B3B]"
              onError={(e) => {
                const t = e.target as HTMLImageElement;
                t.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(instructor.name)}&background=F67300&color=fff&size=32`;
              }}
            />
            <div>
              <p className="text-xs text-[#A3A3A3] dark:text-[#626262]">Lead Instructor</p>
              <p className="text-sm font-medium text-[#333333] dark:text-white">{instructor.name}</p>
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#FFF5EB] dark:bg-[#F67300]/10 flex items-center justify-center">
                <BookOpen size={15} className="text-[#F67300]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#333333] dark:text-white">{totalBatches}</p>
                <p className="text-xs text-[#A3A3A3]">Batches</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#EEF2FF] dark:bg-[#6366F1]/10 flex items-center justify-center">
                <Users size={15} className="text-[#6366F1]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#333333] dark:text-white">{totalStudents}</p>
                <p className="text-xs text-[#A3A3A3]">Students</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#E8F8F0] dark:bg-[#22C55E]/10 flex items-center justify-center">
                <GraduationCap size={15} className="text-[#22C55E]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#333333] dark:text-white">{activeStudents}</p>
                <p className="text-xs text-[#A3A3A3]">Active</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#FEF9EC] dark:bg-[#F59E0B]/10 flex items-center justify-center">
                <Clock size={15} className="text-[#F59E0B]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#333333] dark:text-white">{duration}</p>
                <p className="text-xs text-[#A3A3A3]">Duration</p>
              </div>
            </div>
          </div>

          {/* Overall progress */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-[#626262] dark:text-[#A3A3A3] flex items-center gap-1">
                <TrendingUp size={12} /> Overall Completion
              </span>
              <span className="text-xs font-semibold text-[#F67300]">{overallProgress}%</span>
            </div>
            <div className="h-2 bg-[#F3F5F7] dark:bg-[#3B3B3B] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#F67300] to-[#FFB36B] rounded-full transition-all duration-700"
                style={{ width: `${overallProgress}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
