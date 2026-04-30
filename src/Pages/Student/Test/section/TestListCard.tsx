import React from "react";
import { Clock, Calendar, Note1, TickCircle } from "iconsax-react";

interface TestListCardProps {
  test: {
    id: string;
    name: string;
    date: string;
    fromTime: string;
    toTime: string;
    questions: any[];
    totalMarks: number;
    description: string;
  };
  onClick: () => void;
}

const TestListCard: React.FC<TestListCardProps> = ({ test, onClick }) => {
  const getStatus = () => {
    const now = new Date();
    
    // Parse date and time
    const [year, month, day] = test.date.split("-").map(Number);
    const parseTime = (timeStr: string) => {
      const [time, period] = timeStr.split(" ");
      let [hours, minutes] = time.split(":").map(Number);
      if (period === "PM" && hours < 12) hours += 12;
      if (period === "AM" && hours === 12) hours = 0;
      return new Date(year, month - 1, day, hours, minutes);
    };

    const startTime = parseTime(test.fromTime);
    const endTime = parseTime(test.toTime);

    if (now < startTime) return { label: "Upcoming", color: "text-blue-600 bg-blue-50" };
    if (now >= startTime && now <= endTime) return { label: "Live", color: "text-green-600 bg-green-50" };
    return { label: "Completed", color: "text-gray-600 bg-gray-100" };
  };

  const status = getStatus();

  return (
    <div 
      onClick={onClick}
      className="boxStyle flex flex-col md:flex-row justify-between items-center bg-white dark:bg-[#2A2A2A] border dark:border-[#3B3B3B] cursor-pointer transition-all hover:shadow-md"
    >
      <div className="w-full">
        <div className="flex items-center gap-3 mb-2">
            <h4 className="md:text-lg text-base font-semibold text-primary dark:text-white">
            {test.name}
            </h4>
            <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${status.color}`}>
                {status.label}
            </span>
        </div>
        
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-1">{test.description}</p>
        
        <div className="flex flex-wrap gap-4 md:gap-6">
          <div className="flex items-center gap-2 text-[#626262] dark:text-[#A3A3A3] text-sm font-medium">
            <div className="iconStyle dark:bg-[#3B3B3B] dark:border-[#4B4B4B]">
              <Calendar size="16" className="text-[#F67300]" variant="Bold" />
            </div>
            <span>{test.date}</span>
          </div>

          <div className="flex items-center gap-2 text-[#626262] dark:text-[#A3A3A3] text-sm font-medium">
            <div className="iconStyle dark:bg-[#3B3B3B] dark:border-[#4B4B4B]">
              <Clock size="16" className="text-[#F67300]" variant="Bold" />
            </div>
            <span>{test.fromTime} - {test.toTime}</span>
          </div>

          <div className="flex items-center gap-2 text-[#626262] dark:text-[#A3A3A3] text-sm font-medium">
            <div className="iconStyle dark:bg-[#3B3B3B] dark:border-[#4B4B4B]">
              <Note1 size="16" className="text-[#F67300]" variant="Bold" />
            </div>
            <span>{test.questions.length} Questions</span>
          </div>

          <div className="flex items-center gap-2 text-[#626262] dark:text-[#A3A3A3] text-sm font-medium">
            <div className="iconStyle dark:bg-[#3B3B3B] dark:border-[#4B4B4B]">
              <TickCircle size="16" className="text-[#F67300]" variant="Bold" />
            </div>
            <span>{test.totalMarks} Marks</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestListCard;
