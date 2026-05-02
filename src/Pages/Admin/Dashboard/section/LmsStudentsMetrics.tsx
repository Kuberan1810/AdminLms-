import React from 'react';
import { Users, GraduationCap, BookOpen, CheckCircle2 } from 'lucide-react';

interface MetricCardProps {
  icon: React.ElementType;
  title: string;
  value: string;
  subtitle?: string;
  badgeText?: string;
  badgeType?: 'success' | 'warning';
  variant: 'blue' | 'orange' | 'yellow' | 'purple';
}

const MetricCard: React.FC<MetricCardProps> = ({
  icon: Icon,
  title,
  value,
  subtitle,
  badgeText,
  badgeType = 'success',
  variant
}) => {
  const themes = {
    blue: { bg: 'bg-[#f0f7ff]', text: 'text-[#3b82f6]' },
    orange: { bg: 'bg-[#fff7ed]', text: 'text-[#f97316]' },
    yellow: { bg: 'bg-[#fefce8]', text: 'text-[#ca8a04]' },
    purple: { bg: 'bg-[#f5f3ff]', text: 'text-[#8b5cf6]' }
  };

  return (
    <div className="bg-white rounded-[35px] p-7 shadow-sm border border-gray-100 flex flex-col h-full min-h-[200px]">
      {/* Top Row: Icon and Badge */}
      <div className="flex justify-between items-start mb-8">
        <div className={`p-3 rounded-2xl ${themes[variant].bg} ${themes[variant].text}`}>
          <Icon size={24} strokeWidth={2.5} />
        </div>
        {badgeText && (
          <div className={`px-3 py-1 rounded-full text-[11px] font-bold ${
            badgeType === 'success' 
              ? 'bg-[#ecfdf5] text-[#10b981]' 
              : 'bg-[#fff7ed] text-[#f97316]'
          }`}>
            {badgeText}
          </div>
        )}
      </div>

      {/* Content Row: Precisely Aligned */}
      <div className="flex flex-col gap-1">
        <p className="text-[11px] font-bold text-[#94a3b8] uppercase tracking-widest">
          {title}
        </p>
        <div className="flex flex-col">
          <h3 className="text-3xl font-extrabold text-[#1e293b]">
            {value}
          </h3>
          {/* Subtitle space reserved to prevent layout shift */}
          <p className="text-[13px] font-medium text-[#94a3b8] mt-1 min-h-[20px]">
            {subtitle || ""}
          </p>
        </div>
      </div>
    </div>
  );
};

export const LmsStudentsMetrics: React.FC = () => {
  const metrics = [
    {
      icon: Users,
      title: "Total Students",
      value: "540",
      subtitle: "Unique active learners",
      badgeText: "+12%",
      variant: "blue" as const
    },
    {
      icon: GraduationCap,
      title: "Total Instructors",
      value: "30",
      badgeText: "+12%",
      variant: "orange" as const
    },
    {
      icon: BookOpen,
      title: "Active Courses",
      value: "12",
      badgeText: "Live Now: 02",
      badgeType: "warning" as const,
      variant: "yellow" as const
    },
    {
      icon: CheckCircle2,
      title: "Avg. Attendance",
      value: "84.2%",
      variant: "purple" as const
    }
  ];

  return (
    <div className="w-full bg-[#f8fafc] p-6 md:p-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((m, i) => (
          <MetricCard key={i} {...m} />
        ))}
      </div>
    </div>
  );
};

export default LmsStudentsMetrics;