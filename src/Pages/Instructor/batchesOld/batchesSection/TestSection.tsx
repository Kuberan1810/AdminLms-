import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../../../store/hooks";
import { Search, Filter, ArrowUpDown, ChevronDown } from "lucide-react";
import InstructorDashboardLayout from "../../../../Components/instructor/InstructorDashboardLayout";
import { ArrowLeft2 } from "iconsax-react";


type Status = "Submitted" | "Submitted Late" | "Not Submitted";

interface Row {
  id: number;
  studentId: string;
  studentName: string;
  submittedOn: string;
  status: Status;
  mark?: string;
}


const initialData: Row[] = Array.from({ length: 20 }).map((_, i) => ({
  id: i + 1,
  studentId: "BT01",
  studentName: "Aarav",
  submittedOn:
    i % 3 === 0 ? "22 Jan , 09:00 AM" : i % 3 === 1 ? "20 Jan , 10:45 AM" : "Not Submitted",
  status:
    i % 3 === 0
      ? "Submitted Late"
      : i % 3 === 1
      ? "Submitted"
      : "Not Submitted",
  mark: i % 3 === 2 ? undefined : i % 2 === 0 ? "91%" : "62%",
}));


const statusStyles: Record<Status, string> = {
  Submitted: "bg-emerald-100 text-emerald-700",
  "Submitted Late": "bg-orange-100 text-orange-600",
  "Not Submitted": "bg-gray-100 text-gray-500",
};


export default function TestSection() {
  const { testId } = useParams<{ testId: string }>();
  const { tests } = useAppSelector((state) => state.resource);
  const test = testId ? tests.byId[testId] : null;

  const [rows] = useState<Row[]>(initialData);
  const [query, setQuery] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [filterBy, setFilterBy] = useState<string>("All");
  const [sortBy, setSortBy] = useState<string>("Name");

  const filtered = rows
    .filter((r) => r.studentName.toLowerCase().includes(query.toLowerCase()))
    .filter((r) => filterBy === "All" || r.status === filterBy)
    .sort((a, b) => {
      if (sortBy === "Name") {
        return a.studentName.localeCompare(b.studentName);
      } else if (sortBy === "Status") {
        return a.status.localeCompare(b.status);
      } else if (sortBy === "Mark") {
        const aMark = a.mark ? parseInt(a.mark) : 0;
        const bMark = b.mark ? parseInt(b.mark) : 0;
        return bMark - aMark; // Descending
      }
      return 0;
    });

  return (
    <InstructorDashboardLayout>
<div className="p-6 w-full">
  <div>
      <button onClick={() => window.history.back()} className="flex items-center gap-2 text-sm text-gray-600 mb-4 cursor-pointer">
        <ArrowLeft2 size={16} color="black"/> Back to Batch
      </button>
  </div>
      {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-5 gap-4">
          <div>
            <h1 className="text-2xl font-semibold">{test?.name || "Test"}</h1>
            <p className="text-sm text-gray-500 mt-1">
              Date: {test?.date || "N/A"} | Total Submissions : {rows.length}/38
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
          {/* Search */}
          <div className="flex items-center border border-[#D3D3D3] rounded-xl px-3 py-2 bg-white shadow-sm">
            <Search size={16} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search student"
              className="ml-2 outline-none text-sm"
            />
          </div>

          {/* Filter Dropdown */}
          <div className="relative">
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className="flex items-center gap-2 border border-[#D3D3D3] px-4 py-2 rounded-xl shadow-sm hover:bg-gray-50 cursor-pointer"
            >
              <Filter size={16} /> Filter: {filterBy}
              <ChevronDown size={16} />
            </button>
            {filterOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-10">
                {["All", "Submitted", "Submitted Late", "Not Submitted"].map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setFilterBy(option);
                      setFilterOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <button
              onClick={() => setSortOpen(!sortOpen)}
              className="flex items-center gap-2 border border-[#D3D3D3] px-4 py-2 rounded-xl shadow-sm hover:bg-gray-50 cursor-pointer"
            >
              <ArrowUpDown size={16} /> Sort: {sortBy}
              <ChevronDown size={16} />
            </button>
            {sortOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-10">
                {["Name", "Status", "Mark"].map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setSortBy(option);
                      setSortOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Table for md+ */}
      <div className="hidden md:block bg-white rounded-2xl overflow-x-auto">
        <table className="w-full text-sm min-w-[800px]">
          <thead className="bg-white text-black">
            <tr className="text-left">
              <th className="px-6 py-4">S.no</th>
              <th className="px-6 py-4">Student ID</th>
              <th className="px-6 py-4">Student Name</th>
              <th className="px-6 py-4">Submitted On</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Mark</th>
              <th className="px-6 py-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((row, index) => (
              <tr
                key={row.id}
                className="border-t border-[#D3D3D3] hover:bg-gray-50 transition"
              >
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4">{row.studentId}</td>
                <td className="px-6 py-4 font-medium">{row.studentName}</td>
                <td className="px-6 py-4">{row.submittedOn}</td>

                {/* Status */}
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyles[row.status]}`}
                  >
                    {row.status}
                  </span>
                </td>

                {/* Marks */}
                <td className="px-6 py-4">
                  {row.mark ? row.mark : "----"}
                </td>

                {/* Action */}
                <td className="px-6 py-4 text-center">
                  <button className="bg-[#F67300] hover:bg-orange-600 text-white px-4 py-1.5 rounded-xl text-xs font-medium cursor-pointer">
                    Review
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile list for small screens */}
      <div className="md:hidden space-y-3">
        {filtered.map((row, index) => (
          <div key={row.id} className="bg-white rounded-xl p-4 border border-[#E6E6E6]">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center justify-between gap-3">
                  <h4 className="font-medium truncate">{row.studentName}</h4>
                  <div className="text-xs text-gray-500">#{index + 1}</div>
                </div>
                <p className="text-xs text-gray-500 mt-1">ID: {row.studentId}</p>
                <p className="text-xs text-gray-500 mt-1">{row.submittedOn}</p>
              </div>

              <div className="flex flex-col items-end gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyles[row.status]}`}>{row.status}</span>
                <button className="bg-[#F67300] text-white px-3 py-1 rounded-lg text-xs">Review</button>
              </div>
            </div>
            <div className="mt-2 text-xs text-gray-500">Mark: {row.mark ?? '----'}</div>
          </div>
        ))}
      </div>
    </div>
    </InstructorDashboardLayout>
    
  );
}
