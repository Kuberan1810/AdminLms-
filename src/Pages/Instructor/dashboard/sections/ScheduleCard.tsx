import api from "../../../../config/axios";

function ScheduleCard({
    id,
    batch,
    batchname,
    time,
    muted,
}: {
    id: number;
    batch: string;
    batchname: string;
    time: string;
    muted: boolean;
}) {
    const startClass = async () => {
        try {
            await api.post(`/sessions/start`, null, {
                params: {
                    classroom_id: id, // 👈 IMPORTANT
                },
            });
            console.log("Session started for classroom:", id);
        } catch (err) {
            console.error("Failed to start class", err);
        }
    };
    return (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border border-[#D3D3D3] rounded-xl p-3">
            <div className="flex-1">
                <p className="text-sm font-medium">{batch}</p>
                <p className="text-xs font-medium text-gray-600">{batchname}</p>
                <p className="text-xs text-gray-500">{time}</p>
            </div>

            <button
                onClick={startClass}
                disabled={muted}
                className={`px-4 py-1 rounded-lg text-xs cursor-pointer self-start sm:self-auto  ${muted
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-[#F67300] text-white"
                    }`}
            >
                Start
            </button>
        </div>
    );
}
export default ScheduleCard