import { useNavigate, useSearchParams } from "react-router-dom";
import BatchClassCard from "./BatchClassCard";
import { batchClasses } from "./batchDummyData";
import BtnCom from "../../../../Components/Student/BtnCom";

const MyClassesSection = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const searchQuery = (searchParams.get("search") || "").toLowerCase();

    const handleBatchClick = (batchName: string, courseName: string) => {
        navigate(`/instructor/batch-details/${batchName}`, {
            state: {
                batchName,
                courseName,
            },
        });
    };

    const filteredClasses = batchClasses.filter((item) => {
        if (!searchQuery) return true;
        return item.title.toLowerCase().includes(searchQuery) ||
            item.batch.toLowerCase().includes(searchQuery);
    });

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
                {filteredClasses.length > 0 ? (
                    filteredClasses.map((item) => (
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
                    ))
                ) : (
                    <p className="text-gray-500">No classes match your search.</p>
                )}
            </div>
        </div>

    );
};

export default MyClassesSection;
