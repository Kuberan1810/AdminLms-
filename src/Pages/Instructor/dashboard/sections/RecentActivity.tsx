import { Note1 } from "iconsax-react";
import BtnCom from "../../../../Components/Student/BtnCom";


const RecentActivity = () => {

    const activities: any[] = [
        // {
        //     id: 1,
        //     title: "Resource Uploaded",
        //     subtitle: "Added notes for the Batch-04",
        //     time: "2 hours ago",
        // },
        // {
        //     id: 2,
        //     title: "Resource Uploaded",
        //     subtitle: "Added notes for the Batch-04",
        //     time: "2 hours ago",
        // },
    ];

    return (
        <div className="boxStyle">
            <div className="flex justify-between">
                <h3 className="text-xl lg:text-2xl font-semibold mb-5">Recent activity</h3>
                <BtnCom label="View all" />
            </div>
            
            {activities.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                    <div className="p-4 bg-[#FFF0EF] dark:bg-[#3D2B2A] rounded-full mb-4">
                        <Note1 size={32} color="#EF7A02" />
                    </div>
                    <p className="text-[#626262] dark:text-[#E0E0E0] text-base font-medium">No Recent Activity</p>
                    <p className="text-[#989898] dark:text-[#A3A3A3] text-sm mt-1">There is no recent activity to show right now.</p>
                </div>
            ) : (
                <div className="flex flex-col gap-5">
                    {activities.map((a, i) => (
                        <div
                            key={a.id | i}
                            className="boxStyle bg-[#FAFAFA]! dark:bg-[#1E1E1E]!"
                        >
                            <p className="font-semibold text-[#333] text-base md:text-lg lg:text-xl">{a.title}</p>
                            <p className="text-sm md:text-base text-[#626262]">{a.subtitle}</p>
                            <p className="text-xs md:text-sm text-[#808080] mt-1.5">{a.time}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default RecentActivity;