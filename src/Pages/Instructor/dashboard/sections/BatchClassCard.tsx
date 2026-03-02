import { Profile2User, DocumentText1 } from "iconsax-react";

export interface BatchCourse {
    id: string;
    title: string;
    batch: string;
    students: number;
    modulesCompleted: number;
    totalModules: number;
    progress: number;
}

interface Props {
    data: BatchCourse;
    onClick?: () => void;
}

const BatchClassCard = ({ data, onClick }: Props) => {
    return (
        <div
            onClick={onClick}
            className="boxStyle cursor-pointer  hover:bg-[#fafafa]! hover:shadow-xs "
        >
            {/* ===== Title ===== */}
            <h4 className="text-base md:text-lg font-semibold text-primary mb-2">
                {data.title}
            </h4>

            {/* ===== Batch ===== */}
            <p className="text-xs md:text-sm text-[#333] mb-4">
                {data.batch}
            </p>

            {/* ===== Meta ===== */}
            <div className="flex justify-between text-xs text-[#626262] mb-4">


                <div className="flex gap-1.5 justify-between items-center">
                    <div className="iconStyle">
                        <Profile2User size="16" color="#626262" />
                    </div>
                    <span className="text-[12px]">
                        {data.students} Students
                    </span>
                </div>
                <div className="flex gap-1.5 justify-between items-center">
                    <div className="iconStyle">
                        <DocumentText1 size="16" color="#626262" />
                    </div>
                    <span className="text-[12px]">
                        {data.modulesCompleted} Modules Completed
                    </span>
                </div>

            </div>

            {/* ===== Progress % ===== */}
            <div className="flex justify-end mb-2">
                <span className="text-[11px] border border-[#F2EEF4] rounded-full px-2 py-0.5 text-gray-500">
                    {data.progress}%
                </span>
            </div>

            {/* ===== Progress Bar ===== */}
            <div className="h-1 bg-gray-200 rounded">
                <div
                    className="h-1 bg-orange-500 rounded"
                    style={{ width: `${data.progress}%` }}
                />
            </div>
        </div>
    );
};

export default BatchClassCard;
