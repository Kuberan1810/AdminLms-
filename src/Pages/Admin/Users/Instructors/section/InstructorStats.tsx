import { Users, Presentation, Calendar, CheckSquare } from "lucide-react";
import Teaching from "../../../../../assets/icons/teaching.svg"
import Leave from "../../../../../assets/icons/leave.svg"
import Instructor from "../../../../../assets/icons/instructor.svg"


const InstructorStats = () => {
  const stats = [
    {
      label: "Total Instructor",
      value: "24",
      subtitle: "Across all departments",
      icon: Instructor,
      iconColor: "text-[#F67300]",
      bgColor: "bg-[#FFF4EB]",
    },
    {
      label: "Currently Teaching",
      value: "18",
      subtitle: "Live classes ongoing",
      icon: Teaching,
      iconColor: "text-[#22C55E]",
      bgColor: "bg-[#E8F8F0]",
    },
    {
      label: "On Leave",
      value: "2",
      subtitle: "Not available today",
      icon: Leave,
      iconColor: "text-[#EF4444]",
      bgColor: "bg-[#FEE2E2]",
    },
    {
      label: "Avg. Attendance",
      value: "95%",
      growth: "+12%",
      icon: Calendar ,
      iconColor: "text-[#7036E0]",
      bgColor: "bg-[#7036E0]/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="boxStyle transition-all relative overflow-hidden"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`w-10 h-10 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
              {typeof stat.icon === "string" ? (
                <img src={stat.icon} alt="icon" className="w-5 h-5" />
              ) : (
                <stat.icon className={stat.iconColor} size={20} />
              )}
            </div>
            {stat.growth && (
              <span className="bg-[#E8F8F0] text-[#22C55E] text-[10px] font-bold px-2 py-0.5 rounded-full">
                {stat.growth}
              </span>
            )}
          </div>
          <div>
            <p className="text-sm md:text-base font-medium text-[#767676] dark:text-[#A3A3A3] mb-1">{stat.label}</p>
            <div className="flex gap-2 items-center mt-2">
              <h3 className="text-2xl md:text-3xl  font-bold text-[#333333] dark:text-white mb-1">{stat.value}</h3>
              {stat.subtitle && (
                <p className="text-[12px] text-[#767676] dark:text-[#A3A3A3] font-medium">{stat.subtitle}</p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InstructorStats;
