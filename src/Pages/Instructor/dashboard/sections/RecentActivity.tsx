import BtnCom from "../../../../Components/Student/BtnCom";


const RecentActivity = () => {

    const activities = [
        {
            id: 1,
            title: "Resource Uploaded",
            subtitle: "Added notes for the Batch-04",
            time: "2 hours ago",
        },
        {
            id: 2,
            title: "Resource Uploaded",
            subtitle: "Added notes for the Batch-04",
            time: "2 hours ago",
        },
    ];

    return (



        <div className="boxStyle">
            <div className="flex justify-between">
                <h3 className="text-xl lg:text-2xl font-semibold mb-5">Recent activity</h3>
                <BtnCom label="View all" />
            </div>
            <div className="flex flex-col gap-5">
                {activities.map((a, i) => (
                    <div
                        key={a.id | i}
                        className="boxStyle bg-[#FAFAFA]!"
                    >
                        <p className="font-semibold text-[#333] text-base md:text-lg lg:text-xl">{a.title}</p>
                        <p className="text-sm md:text-base text-[#626262]">{a.subtitle}</p>
                        <p className="text-xs md:text-sm text-[#808080] mt-1.5">{a.time}</p>
                    </div>
                ))}
            </div>
        </div>

    )
}

export default RecentActivity