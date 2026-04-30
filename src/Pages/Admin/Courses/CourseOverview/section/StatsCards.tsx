import { Users, Clock, Calendar, TrendingUp } from "lucide-react";

interface StatItem {
  label: string;
  value: string;
  subtitle?: string;
  icon: string;
  iconColor: string;
  bgColor: string;
  subtitleColor?: string;
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
          <div key={idx} className="bg-white dark:bg-[#2A2A2A] p-6 rounded-3xl border border-[#F2EEF4] dark:border-[#3B3B3B] space-y-4">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
                <Icon className={stat.iconColor} size={20} />
              </div>
              <span className="text-sm font-medium text-[#626262] dark:text-[#A3A3A3]">{stat.label}</span>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#333333] dark:text-white">{stat.value}</div>
              {stat.subtitle && (
                <p className={`text-xs mt-1 font-medium ${stat.subtitleColor || "text-[#626262] dark:text-[#A3A3A3]"}`}>
                  {stat.subtitle}
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
