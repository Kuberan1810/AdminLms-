import AssignmentsCard from "./AssignmentsCard";
import ClassesCard from "./ClassesCard";
import AttendanceCard from "./AttendanceCard";
import RecordingCard from "./RecordingCard";
import DashboardData from "./dashboardData";
import UpcomingClasses from "./UpcomingClasses";

const DashboardCard = () => {
    return (
        <div className="bg-[#F9FAFB] min-h-screen  ">

            {/* Top cards */}
            <DashboardData />

            {/* MAIN GRID */}
            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5">

                {/* LEFT SECTION */}
                <div className="md:col-span-2 lg:col-span-7 space-y-5">

                    {/* Classes & Recording */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <ClassesCard />
                        <RecordingCard />
                    </div>

                    <AssignmentsCard />
                </div>

                {/* RIGHT SECTION */}
                <div className="md:col-span-2 lg:col-span-5 space-y-5 pb-15 sm:pb-0">
                    <AttendanceCard />
                    <UpcomingClasses />
                </div>

            </div>
        </div>
    );
};

export default DashboardCard;
