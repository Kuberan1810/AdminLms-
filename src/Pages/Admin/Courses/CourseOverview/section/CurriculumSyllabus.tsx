import { useState } from "react";
import { ChevronUp, ChevronDown, PlayCircle, CheckCircle2 } from "lucide-react";

interface Lesson {
  id: string;
  title: string;
  isLive?: boolean;
  isCompleted?: boolean;
  duration?: string;
}

interface Module {
  id: string;
  number: string;
  title: string;
  lessons: Lesson[];
}

interface Props {
  modules: Module[];
}

const CurriculumSyllabus = ({ modules }: Props) => {
  const [expandedModule, setExpandedModule] = useState<string | null>(modules[0]?.id || null);

  return (
    <div className="bg-white dark:bg-[#2A2A2A] rounded-3xl p-6 border border-[#F2EEF4] dark:border-[#3B3B3B]">
      <div className="flex items-center justify-between mb-6">
        <h2 className="md:text-xl text-lg font-semibold text-[#0B1C30] dark:text-white">Curriculum & Syllabus</h2>
        <span className="text-xs md:text-sm text-[#64748B] dark:text-[#A3A3A3]">
          {modules.length} Modules • {modules.reduce((acc, m) => acc + m.lessons.length, 0)} Lessons
        </span>
      </div>

      <div className="space-y-4">
        {modules.map((module) => (
          <div
            key={module.id}
            className={`rounded-[24px] border-2 transition-all duration-300 ${expandedModule === module.id
              ? "border-[#F27121]/10 bg-white"
                : "border-[#F3F5F7] bg-white"
              }`}
          >
            <button
              onClick={() => setExpandedModule(expandedModule === module.id ? null : module.id)}
              className={`w-full flex items-center justify-between p-4 cursor-pointer ${expandedModule === module.id
                ? " border-[#F27121]/10 bg-[#FFF7F0]/30 dark:bg-[#F67300]/5"
                : "border-[#F2EEF4] dark:border-[#3B3B3B]"
                }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-300 ${expandedModule === module.id
                    ? "bg-[#9B4100] text-white"
                  : "bg-[#E2E8F0] text-[#475569]"
                  }`}>
                  {module.number}
                </div>
                <span className={`font-semibold text-[#121212] text-base md:text-lg transition-colors duration-300 ${expandedModule === module.id ? "text-[#9B4100]" : "text-[#0B1C30]"
                  }`}>
                  {module.title}
                </span>
              </div>
              {expandedModule === module.id ? (
                <ChevronUp className="text-[#9B4100]" size={20} />
              ) : (
                <ChevronDown className="text-[#94A3B8]" size={20} />
              )}
            </button>

            {expandedModule === module.id && module.lessons.length > 0 && (
              <div className="px-4 pb-4 space-y-2 mt-2">
                {module.lessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    className={`flex items-center justify-between p-3 rounded-xl transition-colors cursor-pointer ${lesson.isLive ? "bg-[#FFF7ED]/50 dark:bg-[#F67300]/10" : "hover:bg-gray-50 dark:hover:bg-white/5"
                      }`}
                  >
                    <div className="flex items-center gap-3  ">
                      {lesson.isLive ? (
                        <PlayCircle className="text-[#F67300]" size={18} />
                      ) : lesson.isCompleted ? (
                        <CheckCircle2 className="text-[#626262] dark:text-[#A3A3A3]" size={18} />
                      ) : (
                        <div className="w-[18px] h-[18px] rounded-full border-2 border-[#E2E8F0] dark:border-[#4B4B4B]" />
                      )}
                      <span className={`text-sm font-medium ${lesson.isLive ? "text-[#333333] dark:text-white" : "text-[#626262] dark:text-[#A3A3A3]"
                        }`}>
                        {lesson.title}
                      </span>
                    </div>
                    {lesson.isLive ? (
                      <span className="text-[10px] font-bold text-[#F67300] bg-[#FFEDD5] hover:bg-[#FFD9A6] px-2 py-0.5 rounded-md cursor-pointer">
                        LIVE NOW
                      </span>
                    ) : (
                      <span className="text-xs text-[#626262] dark:text-[#A3A3A3] font-medium">
                        {lesson.duration}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CurriculumSyllabus;
