import { useNavigate } from "react-router-dom";
import BatchClassCard from "./BatchClassCard";
import { batchClasses } from "./batchDummyData";
import BtnCom from "../../../../Components/Student/BtnCom";

const MyClassesSection = () => {
    const navigate = useNavigate();

    const handleBatchClick = (batchName: string, courseName: string) => {
        navigate(`/instructor/batch-details/${batchName}`, {
            state: {
                batchName,
                courseName,
            },
        });
    };

    // const handleBatchClick = (batchName: string, course_id: string) => {
    //     navigate(`/instructor/batch-details/${batchName}`, {
    //         state: {
    //             batchName,
    //             course_id,
    //         },
    //     });
    // };

    return (
        <div className="w-full">
            {/* Header */}
            <div className="flex items-center justify-between mb-4 sm:mb-5">
                <h3 className="text-xl lg:text-2xl font-semibold">
                    My Classes
                </h3>
                <BtnCom label="View all" />
            </div>

            {/* Cards */}
            <div className="grid gap-6 lg:grid-cols-4 max-lg:grid-flow-col max-lg:auto-cols-[76vw]  max-lg:overflow-x-auto  max-lg:snap-x max-lg:snap-mandatory scrollbar-hide">
                {batchClasses.map((item) => (
                    <BatchClassCard
                        key={item.id}
                        data={item}
                        onClick={() =>
                            handleBatchClick(
                                item.batch,   // ex: Batch-01
                                item.title        // ex: AM101 - AI / ML Frontier
                            )
                        }
                    />
                ))}
            </div>
        </div>

    );
};

export default MyClassesSection;
