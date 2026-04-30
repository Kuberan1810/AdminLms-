import { ChevronRight } from "lucide-react";

interface Session {
  id: string;
  month: string;
  day: number;
  title: string;
  time: string;
  isToday?: boolean;
}

interface Props {
  sessions: Session[];
}

const UpcomingSessions = ({ sessions }: Props) => {
  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-[#1E293B] dark:text-white">Upcoming Sessions</h2>
        <button className="text-sm font-bold text-[#F67300] hover:underline cursor-pointer">
          View Calendar
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sessions.map((session) => (
          <div
            key={session.id}
            className="flex items-center justify-between p-4 bg-white dark:bg-[#2A2A2A] rounded-[32px] border border-[#E2E8F0] dark:border-[#3B3B3B] transition-all duration-300"
          >
            <div className="flex items-center gap-5">
              {/* Date Box */}
              <div 
                className={`flex flex-col items-center justify-center w-20 h-20 rounded-3xl border transition-colors ${
                  session.isToday
                    ? "bg-[#FFF7F0] border-[#F673001A]"
                    : "bg-[#F8FAFC] dark:bg-[#3B3B3B] border-transparent"
                }`}
              >
                <span className={`text-xs font-bold uppercase tracking-wider ${
                  session.isToday ? "text-[#F67300]" : "text-[#64748B] dark:text-[#A3A3A3]"
                }`}>
                  {session.month}
                </span>
                <span className={`text-3xl font-black ${
                  session.isToday ? "text-[#F67300]" : "text-[#1E293B] dark:text-white"
                }`}>
                  {session.day}
                </span>
              </div>

              {/* Info */}
              <div className="space-y-1">
                <h3 className="text-[19px] font-bold text-[#1E293B] dark:text-white leading-tight">
                  {session.title}
                </h3>
                <p className="text-[15px] font-medium text-[#64748B] dark:text-[#A3A3A3]">
                  {session.time}
                </p>
              </div>
            </div>

            {/* Action Button */}
            <button className="w-14 h-14 rounded-full border border-[#E2E8F0] dark:border-[#4B4B4B] flex items-center justify-center text-[#64748B] dark:text-[#A3A3A3] hover:border-[#F67300] hover:text-[#F67300] transition-all cursor-pointer group">
              <ChevronRight size={24} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingSessions;
