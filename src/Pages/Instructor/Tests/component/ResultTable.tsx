import { useNavigate } from "react-router-dom";
import type { StudentResult } from "../../../../types/test";

interface Props {
  data: StudentResult[];
}

const ResultTable = ({ data }: Props) => {
  const navigate = useNavigate();

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full bg-white rounded-2xl overflow-hidden">
        <thead className="bg-orange-100 text-[9px] sm:text-sm text-orange-500">
          <tr>
            <th className="px-2 sm:px-4 py-2 sm:py-3 text-left">S.No</th>
            <th className="px-2 sm:px-4 py-2 sm:py-3 text-left">
              Student ID
            </th>
            <th className="px-2 sm:px-4 py-2 sm:py-3 text-left">
              Name
            </th>

            <th className=" md:table-cell px-4 py-3 text-left">
              Start time
            </th>
            <th className=" md:table-cell px-4 py-3 text-left">
              End time
            </th>

            <th className="px-2 sm:px-4 py-2 sm:py-3 text-left">
              Status
            </th>
            <th className=" sm:table-cell px-4 py-3 text-left">
              Mark
            </th>

            <th className="px-2 sm:px-4 py-2 sm:py-3 text-left">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {data.map((row, index) => (
            <tr
              key={row.id}
              className="border-t border-gray-200
                         text-[10px] sm:text-sm
                         hover:bg-gray-50"
            >
              <td className="px-2 sm:px-4 py-2 sm:py-3">
                {index + 1}
              </td>

              <td className="px-2 sm:px-4 py-2 sm:py-3">
                {row.studentId}
              </td>

              <td className="px-2 sm:px-4 py-2 sm:py-3 font-medium">
                {row.name}
              </td>

              {/* Start Time */}
              <td className="md:table-cell px-4 py-3">
                {row.startTime ?? "---"}
              </td>

              {/* End Time */}
              <td className="md:table-cell px-4 py-3">
                {row.endTime ?? "---"}
              </td>

              {/* Status */}
              <td className="px-2 sm:px-4 py-2 sm:py-3">
                <span
                  className={`px-2 py-0.5 sm:py-1 rounded-full
                              text-[9px] sm:text-xs whitespace-nowrap
                    ${
                      row.status === "submitted"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                >
                  {row.status}
                </span>
              </td>

              {/* Mark */}
              <td className=" sm:table-cell px-4 py-3">
                {row.mark ?? "-"}
              </td>

              {/* Action */}
              <td className="px-2 sm:px-4 py-2 sm:py-3">
                <button
                  onClick={() => navigate(`/instructor/tests/results/review-test/${row.id}`)}
                  className="bg-orange-600 text-white
                             px-3 sm:px-4 py-1
                             rounded-full
                             text-[9px] sm:text-xs
                             whitespace-nowrap"
                >
                  Review
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResultTable;
