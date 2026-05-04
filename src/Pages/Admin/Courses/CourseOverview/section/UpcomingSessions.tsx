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
    <div className=" boxStyle  ">
      <div className="flex items-center justify-between mb-6 cursor-pointer">
        <h2 className="md:text-xl text-lg font-semibold text-[#0B1C30] dark:text-white">Upcoming Sessions</h2>
        <button className="text-sm font-semibold text-[#9F4200] hover:underline cursor-pointer">
          View Calendar
        </button>
      </div>

      <div className="flex md:flex-row flex-col gap-5">
        {sessions.map((session) => (
          <div
            key={session.id}
            className="flex flex-1 items-center justify-between p-4 bg-white dark:bg-[#2A2A2A] rounded-[32px] cursor-pointer hover:bg-gray-50 border border-[#E2E8F0] dark:border-[#3B3B3B] transition-all duration-300 group"
          >
            <div className="flex items-center gap-5">
              {/* Date Box */}
              <div 
                className={`flex flex-col items-center justify-center py-2 px-4 rounded-3xl border transition-colors ${
                  session.isToday
                    ? "bg-[#FFF7F0] border-[#F673001A]"
                    : "bg-[#F8FAFC] dark:bg-[#3B3B3B] border-transparent"
                }`}
              >
                <span className={`text-xs font-bold uppercase tracking-wider ${
                  session.isToday ? "text-[#EA580C]" : "text-[#64748B] dark:text-[#A3A3A3]"
                }`}>
                  {session.month}
                </span>
                <span className={`text-2xl font-black ${
                  session.isToday ? "text-[#C2410C]" : "text-[#1E293B] dark:text-white"
                }`}>
                  {session.day}
                </span>
              </div>

              {/* Info */}
              <div className="space-y-1">
                <h3 className="text-base md:text-[16px] font-bold text-[#1E293B] dark:text-white leading-tight">
                  {session.title}
                </h3>
                <p className="text-xs md:text-[14px] font-medium text-[#64748B] dark:text-[#A3A3A3]">
                  {session.time}
                </p>
              </div>
            </div>

            {/* Action Button */}
            <button className="w-10 h-10 rounded-full border border-[#E2E8F0] dark:border-[#4B4B4B] flex items-center justify-center text-[#64748B] dark:text-[#A3A3A3] group-hover:border-[#F67300] group-hover:text-[#F67300] transition-all cursor-pointer ">
              <ChevronRight size={24} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingSessions;
