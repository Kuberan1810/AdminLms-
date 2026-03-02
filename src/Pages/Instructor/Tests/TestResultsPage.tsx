import { useMemo, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

import InstructorHeader from "../../../Components/instructor/InstructorHeader";
import ResultTable from "./component/ResultTable";
import FilterDropdown from "./component/FilterDropdown";
import SortDropdown from "./component/SortDropdown";
import CreateTestModal from "../CreateModal/CreateTestModal"; // ✅ IMPORT MODAL

export const MOCK_DATA = [
  { id: "1", studentId: "BT01", name: "Aarav", status: "submitted", mark: 85, startTime: "10:00", endTime: "10:45" },
  { id: "2", studentId: "BT02", name: "Neha", status: "not_attended" },
  { id: "3", studentId: "BT03", name: "John", status: "submitted", mark: 78, startTime: "10:01", endTime: "10:45" },
  { id: "4", studentId: "BT04", name: "Meera", status: "submitted", mark: 92, startTime: "10:00", endTime: "10:40" },
  { id: "5", studentId: "BT05", name: "Rohan", status: "not_attended" },
  { id: "6", studentId: "BT06", name: "Sneha", status: "submitted", mark: 66, startTime: "10:05", endTime: "10:45" },
  { id: "7", studentId: "BT07", name: "Arjun", status: "submitted", mark: 49, startTime: "10:02", endTime: "10:44" },
  { id: "8", studentId: "BT08", name: "Kavya", status: "not_attended" },
  { id: "9", studentId: "BT09", name: "Vikram", status: "submitted", mark: 88, startTime: "10:00", endTime: "10:43" },
  { id: "10", studentId: "BT10", name: "Ananya", status: "submitted", mark: 10, startTime: "10:00", endTime: "10:41" },
  { id: "11", studentId: "BT11", name: "Suresh", status: "not_attended" },
  { id: "12", studentId: "BT12", name: "Pooja", status: "submitted", mark: 72, startTime: "10:03", endTime: "10:45" },
  { id: "13", studentId: "BT13", name: "Rahul", status: "submitted", mark: 58, startTime: "10:04", endTime: "10:42" },
  { id: "14", studentId: "BT14", name: "Divya", status: "not_attended" },
  { id: "15", studentId: "BT15", name: "Kiran", status: "submitted", mark: 81, startTime: "10:00", endTime: "10:45" },
];

const TestResultsPage = () => {
  const navigate = useNavigate();

  //  MODAL STATE
  const [openEditModal, setOpenEditModal] = useState(false);

  const [filter, setFilter] =
    useState<"all" | "submitted" | "not attended">("all");
  const [sort, setSort] = useState<"name" | "mark">("name");

  const filteredData = useMemo(() => {
    let data = [...MOCK_DATA];

    if (filter !== "all") {
      data = data.filter(d => d.status === filter);
    }

    if (sort === "name") {
      data.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (sort === "mark") {
      data.sort((a, b) => (b.mark ?? 0) - (a.mark ?? 0));
    }

    return data;
  }, [filter, sort]);

  const passedCount = filteredData.filter(d => (d.mark ?? 0) >= 40).length;
  const failedCount = filteredData.length - passedCount;

  return (
    <>
      <InstructorHeader />

      <div className="p-4 bg-[#FAFAFA] space-y-4">

        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="rounded-full hover:bg-gray-100 text-gray-600"
          aria-label="Go back"
        >
          <ArrowLeft size={20} />
        </button>

        {/* Test Details */}
        <div className="p-2">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-semibold">
                Module 3 Proficiency Test
              </h2>
              <p className="text-sm text-gray-500">
                Module 3 · Frontier AI Systems & Deployment
              </p>
            </div>

            <button
              onClick={() => setOpenEditModal(true)}
              className="px-4 py-1.5 border border-gray-200 rounded-lg text-sm hover:bg-gray-50"
            >
              Edit Test
            </button>
          </div>

          <div className="gap-2 text-sm text-gray-600 mt-2">
            <div>Date: 21 Jan 2026</div>
            <div>Duration: 45 mins (10:00 – 10:45)</div>
            <div>Total Submissions: {filteredData.length}</div>
          </div>
        </div>

        {/* Stats */}
        <div className="flex justify-between items-center bg-[#FAFAFA] rounded-xl px-4 py-3">
          <div className="flex gap-4">
            <div className="flex items-center gap-2 px-4 py-2 border border-gray-200  rounded-lg text-sm">
              <span className="text-gray-600">Student Passed:</span>
              <span className="font-semibold">{passedCount}</span>
            </div>

            <div className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm">
              <span className="text-gray-600">Student Failed:</span>
              <span className="font-semibold">{failedCount}</span>
            </div>
          </div>

          <div className="flex gap-3 mx-6">
            <FilterDropdown onChange={setFilter} />
            <SortDropdown onChange={setSort} />
          </div>
        </div>

        {/* Result Table */}
        <ResultTable data={filteredData} />
      </div>

      {openEditModal && (
        <CreateTestModal
          onClose={() => setOpenEditModal(false)}
          onBack={() => setOpenEditModal(false)}
          mode="edit"
        />
      )}
    </>
  );
};

export default TestResultsPage;
