import BtnCom from '../../../../Components/Student/BtnCom';
import UpcomingScheduleCard from './UpcomingScheduleCard';

const getTodayDate = () => {
    const today = new Date();
    return today.toLocaleDateString("en-US", {
        weekday: "long",
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
};

const UpcomingClasses = () => {
    return (
        <div className='boxStyle'>
            {/* ================= Header ================= */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h3 className="text-xl lg:text-2xl font-semibold text-primary dark:text-white">
                        Upcoming Schedule
                    </h3>
                    <p className="text-[#626262] dark:text-[#A3A3A3] md:text-xl text-base">
                        {getTodayDate()}
                    </p>
                </div>

                <BtnCom label="View all" />
            </div>

            {/* ================= Upcoming Schedule Cards ================= */}
            <UpcomingScheduleCard />
        </div>
    );
};

export default UpcomingClasses;
