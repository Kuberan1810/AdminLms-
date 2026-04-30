import { Users, Presentation, Calendar, CheckSquare } from "lucide-react";

const InstructorStats = () => {
  const stats = [
    {
      label: "Total Instructor",
      value: "24",
      subtitle: "Across all departments",
      icon: Users,
      iconColor: "text-[#F67300]",
      bgColor: "bg-[#FFF4EB]",
    },
    {
      label: "Currently Teaching",
      value: "18",
      subtitle: "Live classes ongoing",
      icon: Presentation,
      iconColor: "text-[#22C55E]",
      bgColor: "bg-[#E8F8F0]",
    },
    {
      label: "On Leave",
      value: "2",
      subtitle: "Not available today",
      icon: Calendar,
      iconColor: "text-[#EF4444]",
      bgColor: "bg-[#FEE2E2]",
    },
    {
      label: "Avg. Attendance",
      value: "95%",
      growth: "+12%",
      icon: CheckSquare,
      iconColor: "text-[#8B5CF6]",
      bgColor: "bg-[#F5F3FF]",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white dark:bg-[#2A2A2A] p-6 rounded-[28px] border border-[#F2EEF4] dark:border-[#3B3B3B] transition-all hover:shadow-md relative overflow-hidden"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`w-10 h-10 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
              <stat.icon className={stat.iconColor} size={20} />
            </div>
            {stat.growth && (
              <span className="bg-[#E8F8F0] text-[#22C55E] text-[10px] font-bold px-2 py-0.5 rounded-full">
                {stat.growth}
              </span>
            )}
          </div>
          <div>
            <p className="text-sm font-medium text-[#626262] dark:text-[#A3A3A3] mb-1">{stat.label}</p>
            <h3 className="text-2xl font-bold text-[#333333] dark:text-white mb-1">{stat.value}</h3>
            {stat.subtitle && (
              <p className="text-[11px] text-[#626262] dark:text-[#A3A3A3] font-medium">{stat.subtitle}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default InstructorStats;
