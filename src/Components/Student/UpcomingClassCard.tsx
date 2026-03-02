import { useState } from 'react';
import { Calendar2 } from 'iconsax-react';

interface UpcomingClassCardProps {
    code: string;
    title: string;
    instructor: string;
    topic: string;
    date: string;
    reminderOn?: boolean;
}

const UpcomingClassCard = ({ code, title, instructor, topic, date, reminderOn = false }: UpcomingClassCardProps) => {
    const [isReminderOn, setIsReminderOn] = useState(reminderOn);

    return (
        <div className="boxStyle w-full">
            <div className="mb-4">
                <h3 className="text-base font-medium text-[#333333] mb-1 ">
                    {code} - {title}
                </h3>
                <p className="text-sm text-[#626262] font-medium">Instructor: {instructor}</p>
                <p className="text-sm text-[#626262] mt-1 ">Lesson name: {topic}</p>
            </div>

            <div className="flex items-center gap-2 text-sm text-[#626262] mb-6">
                <div className='iconStyle'>
                    <Calendar2 size={16} color='#626262' />
                </div>
                <span>{date}</span>
            </div>

            <button
                onClick={() => setIsReminderOn(!isReminderOn)}
                className={`w-full py-2.5 px-4 rounded-xl border text-sm font-medium transition-colors cursor-pointer ${isReminderOn
                    ? 'bg-white text-gray-700 border-[#F2EEF4] hover:bg-gray-100'
                    : 'bg-[#fe7500] text-white hover:bg-[#ff820d]'
                    }`}
            >
                {isReminderOn ? 'Reminder On' : 'Set Reminder'}
            </button>
        </div>
    );
};

export default UpcomingClassCard;
