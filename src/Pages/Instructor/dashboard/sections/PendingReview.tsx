import BtnCom from "../../../../Components/Student/BtnCom";

interface PendingReviewType {
    sno: number;
    studentId: string;
    name: string;
    submittedOn: string;
    batch: string;
}

const pendingReviews: PendingReviewType[] = [
    {
        sno: 1,
        studentId: "BT01",
        name: "Aarav",
        submittedOn: "22 Jan, 09:00 AM",
        batch: "Batch-01",
    },
    {
        sno: 2,
        studentId: "BT02",
        name: "Aarav",
        submittedOn: "22 Jan, 09:00 AM",
        batch: "Batch-01",
    },
];

const PendingReview = () => {
    return (
        <div className="boxStyle">

            <div className="flex justify-between">
                <h3 className="text-xl lg:text-2xl font-semibold mb-5">Pending Review</h3>
                <BtnCom label="View all" />
            </div>
            
            {/* ================= DESKTOP TABLE ================= */}
            <div className="hidden md:block overflow-x-auto rounded-xl">
                <table className="min-w-full text-sm">
                    <thead className="bg-[#FFF1E6] text-[#F67300] border border-gray-200">
                        <tr className="text-center">
                            <th className="py-3">S.no</th>
                            <th>Student ID</th>
                            <th>Student Name</th>
                            <th>Submitted On</th>
                            <th>Batch</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {pendingReviews.map((r) => (
                            <tr
                                key={r.sno}
                                className="text-center border border-gray-200"
                            >
                                <td className="py-3">{r.sno}</td>
                                <td>{r.studentId}</td>
                                <td>{r.name}</td>
                                <td>{r.submittedOn}</td>
                                <td>{r.batch}</td>
                                <td>
                                    <button className="bg-[#F67300] text-white px-4 py-1.5 rounded-lg text-xs hover:opacity-90 cursor-pointer">
                                        Review
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* ================= MOBILE CARD VIEW ================= */}
            <div className="md:hidden space-y-4">
                {pendingReviews.map((r) => (
                    <div
                        key={r.sno}
                        className="border border-gray-200 rounded-xl p-4 "
                    >
                        <div className="flex justify-between mb-2">
                            <span className="text-xs text-gray-500">
                                {r.sno}
                            </span>
                            <span className="text-xs  text-orange-600 px-2 py-0.5 rounded-full">
                                {r.batch}
                            </span>
                        </div>

                        <p className="text-sm font-medium">{r.name}</p>
                        <p className="text-xs text-gray-500 mb-2">
                            ID: {r.studentId}
                        </p>

                        <p className="text-xs text-gray-600 mb-3">
                            Submitted on {r.submittedOn}
                        </p>

                        <button className="w-full bg-[#F67300] text-white py-2.5 rounded-lg text-sm cursor-pointer" >
                            Review
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PendingReview;
