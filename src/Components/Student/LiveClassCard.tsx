
import { Profile2User, Video } from 'iconsax-react';
interface LiveClassCardProps {
    code: string;
    title: string;
    instructor: string;
    topic: string;
    studentsCount: number;
    onJoin?: () => void;
}

const LiveClassCard = ({ code, title, instructor, topic, studentsCount, onJoin }: LiveClassCardProps) => {
    return (
        <div className="boxStyle w-fit">
            <div className="mb-4">
                <h3 className="md:text-lg text-base font-semibold text-[#333333] mb-1 ">
                    {code} - {title}
                </h3>
                <p className="text-sm md:text-base text-[#626262]  ">Instructor:  <span className="text-[#EF7A02] font-medium">{instructor}</span></p>
                <p className="text-sm md:text-base text-[#626262] mt-1 ">Lesson name: <span className="text-[#EF7A02] font-medium">{topic} </span> </p>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-500 mb-5">
                <div className='iconStyle'>
                    <Profile2User size={16} color='#626262' />
                </div>
                <span className='text-[#626262] text-sm font-medium'>{studentsCount} Students attending</span>
            </div>

            <button onClick={onJoin} className="w-full bg-[#F67300] hover:bg-[#ff8820] text-white font-medium py-2 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer">
                <Video size={20} color='white' />
                Join Class Now
            </button>
        </div>
    );
};

export default LiveClassCard;
