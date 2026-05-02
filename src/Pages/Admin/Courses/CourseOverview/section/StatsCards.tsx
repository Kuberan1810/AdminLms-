import { Users, Clock, Calendar, TrendingUp } from "lucide-react";

interface StatItem {
  label: string;
  value: string;
  subtitle?: string;
  icon: string;
  iconColor: string;
  bgColor: string;
  subtitleColor?: string;
  growth?: string;
  topic?: string;
}

interface Props {
  stats: StatItem[];
}

const iconMap: Record<string, any> = {
  users: Users,
  clock: Clock,
  calendar: Calendar,
  trending: TrendingUp,
};

const StatsCards = ({ stats }: Props) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, idx) => {
        const Icon = iconMap[stat.icon] || Users;
        return (
          <div key={idx} className="boxStyle dark:border-[#3B3B3B] space-y-4">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
                <Icon className={stat.iconColor} size={20} />
              </div>
              <span className="text-sm md:text-base font-semibold text-[#64748B] dark:text-[#A3A3A3]">{stat.label}</span>
            </div>
            <div>
              <div className={`${idx === 0 ? "md:text-[36px] text-2xl" : "text-lg md:text-[20px]"} font-bold text-[#0B1C30] dark:text-white`}>
                {stat.value}
              </div>
              {stat.subtitle && (
                <p className={`text-xs md:text-sm mt-1 font-medium ${stat.subtitleColor || "text-[#64748B] dark:text-[#A3A3A3]"}`}>
                  {stat.subtitle}
                </p>
              )}
              {stat.topic !== undefined && (
                <p className="text-xs md:text-[14px] mt-1 font-medium text-[#64748B] dark:text-[#A3A3A3]">
                  Topic : <span className="font-semibold">{stat.topic}</span>
                </p>
              )}
              {stat.growth && (
                <p className="text-xs md:text-[14px] mt-1 font-medium text-[#16A34A]">
                  {stat.growth}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsCards;
