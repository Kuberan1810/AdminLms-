import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Search, Filter, ArrowUpDown, ChevronDown } from "lucide-react";
import InstructorDashboardLayout from "../../../../Components/instructor/InstructorDashboardLayout";
import { ArrowLeft2 } from "iconsax-react";
import { getTestDetails } from "../../../../services/testService";
import type { TestDetailsResponse } from "../../../../services/testService";

const statusStyles: Record<string, string> = {
  submitted: "bg-emerald-100 text-emerald-700",
  in_progress: "bg-blue-100 text-blue-700",
  not_attended: "bg-gray-100 text-gray-500",
  failed: "bg-red-100 text-red-600",
  passed: "bg-emerald-100 text-emerald-700",
};

export default function TestSection() {
  const { testId } = useParams<{ testId: string }>();
  const navigate = useNavigate();
  
  const [testData, setTestData] = useState<TestDetailsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [filterBy, setFilterBy] = useState<string>("All");
  const [sortBy, setSortBy] = useState<string>("Name");

  useEffect(() => {
    const fetchData = async () => {
      if (testId) {
        try {
          setLoading(true);
          const data = await getTestDetails(Number(testId));
          setTestData(data);
        } catch (error) {
          console.error("Failed to fetch test details:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchData();
  }, [testId]);

  const students = testData?.students || [];

  const filtered = students
    .filter((s) => s.student_name.toLowerCase().includes(query.toLowerCase()))
    .filter((s) => filterBy === "All" || s.status === filterBy.toLowerCase().replace(" ", "_"))
    .sort((a, b) => {
      if (sortBy === "Name") {
        return a.student_name.localeCompare(b.student_name);
      } else if (sortBy === "Status") {
        return a.status.localeCompare(b.status);
      } else if (sortBy === "Mark") {
        return (b.mark || 0) - (a.mark || 0);
      }
      return 0;
    });

  if (loading) {
     return (
        <InstructorDashboardLayout>
            <div className="p-6 w-full flex items-center justify-center h-[200px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#F67300]"></div>
            </div>
        </InstructorDashboardLayout>
     );
  }

  return (
    <InstructorDashboardLayout>
      <div className="p-6 w-full font-['Urbanist']">
        <div>
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-gray-600 mb-4 cursor-pointer hover:opacity-80 transition-opacity">
            <ArrowLeft2 size={16} color="black" /> Back to Batch
          </button>
        </div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[#1A1A1A]">{testData?.title || "Test Results"}</h1>
            <p className="text-sm text-gray-500 mt-1">
              Date: {testData?.date || "N/A"} | Module: {testData?.module_name} | Total Submissions: {testData?.total_submitted}/{testData?.total_enrolled}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
            {/* Search */}
            <div className="flex items-center border border-[#D3D3D3] rounded-xl px-3 py-2 bg-white shadow-sm focus-within:border-[#F67300] transition-colors">
              <Search size={16} color="#9E9E9E" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search student"
                className="ml-2 outline-none text-sm bg-transparent"
              />
            </div>

            {/* Filter Dropdown */}
            <div className="relative">
              <button
                onClick={() => setFilterOpen(!filterOpen)}
                className="flex items-center gap-2 border border-[#D3D3D3] px-4 py-2 rounded-xl shadow-sm hover:bg-gray-50 cursor-pointer bg-white text-sm"
              >
                <Filter size={16} /> Filter: {filterBy}
                <ChevronDown size={16} />
              </button>
              {filterOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-xl z-50">
                  {["All", "Submitted", "Not Submitted", "In Progress"].map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setFilterBy(option);
                        setFilterOpen(false);
                      }}
                      className="block w-full text-left px-4 py-3 text-sm hover:bg-[#FFF5ED] hover:text-[#F67300] transition-colors first:rounded-t-xl last:rounded-b-xl"
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
                className="flex items-center gap-2 border border-[#D3D3D3] px-4 py-2 rounded-xl shadow-sm hover:bg-gray-50 cursor-pointer bg-white text-sm"
              >
                <ArrowUpDown size={16} /> Sort: {sortBy}
                <ChevronDown size={16} />
              </button>
              {sortOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-xl z-50">
                  {["Name", "Status", "Mark"].map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setSortBy(option);
                        setSortOpen(false);
                      }}
                      className="block w-full text-left px-4 py-3 text-sm hover:bg-[#FFF5ED] hover:text-[#F67300] transition-colors first:rounded-t-xl last:rounded-b-xl"
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
        <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left bg-gray-50">
                <th className="px-6 py-4 font-semibold text-gray-600">S.no</th>
                <th className="px-6 py-4 font-semibold text-gray-600">Student ID</th>
                <th className="px-6 py-4 font-semibold text-gray-600">Student Name</th>
                <th className="px-6 py-4 font-semibold text-gray-600">Start Time</th>
                <th className="px-6 py-4 font-semibold text-gray-600">End Time</th>
                <th className="px-6 py-4 font-semibold text-gray-600 text-center">Status</th>
                <th className="px-6 py-4 font-semibold text-gray-600 text-center">Mark</th>
                <th className="px-6 py-4 font-semibold text-gray-600 text-center">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filtered.map((student, index) => (
                <tr
                  key={student.submission_id || index}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 text-gray-500">{index + 1}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{student.student_id}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{student.student_name}</td>
                  <td className="px-6 py-4 text-gray-500">{student.start_time ? new Date(student.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "----"}</td>
                  <td className="px-6 py-4 text-gray-500">{student.end_time ? new Date(student.end_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "----"}</td>

                  <td className="px-6 py-4 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${statusStyles[student.status] || "bg-gray-100 text-gray-500"}`}
                    >
                      {student.status.replace("_", " ")}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-center font-bold text-gray-900">
                    {student.mark !== null ? `${student.mark}%` : "----"}
                  </td>

                  <td className="px-6 py-4 text-center">
                    {student.submission_id ? (
                      <button 
                        onClick={() => navigate(`/instructor/tests/review/${testId}/${student.submission_id}`)}
                        className="bg-[#F67300] hover:bg-orange-600 text-white px-5 py-2 rounded-xl text-xs font-bold cursor-pointer transition-all shadow-md shadow-orange-50"
                      >
                        Review
                      </button>
                    ) : (
                      <span className="text-gray-300 text-xs font-medium italic">No submission</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
             <div className="p-10 text-center text-gray-400">No students found for this test.</div>
          )}
        </div>

        {/* Mobile list */}
        <div className="md:hidden space-y-4">
          {filtered.map((student, index) => (
            <div key={student.submission_id || index} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div className="min-w-0">
                   <div className="text-[10px] text-gray-400 font-bold uppercase mb-1">#{index + 1} • {student.student_id}</div>
                   <h4 className="font-bold text-[#1A1A1A] truncate text-lg">{student.student_name}</h4>
                </div>
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${statusStyles[student.status] || "bg-gray-100 text-gray-500"}`}>
                  {student.status.replace("_", " ")}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-5 text-sm">
                 <div>
                    <div className="text-gray-400 text-xs mb-0.5">Start Time</div>
                    <div className="font-medium">{student.start_time ? new Date(student.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "----"}</div>
                 </div>
                 <div>
                    <div className="text-gray-400 text-xs mb-0.5">Mark</div>
                    <div className="font-bold text-[#F67300]">{student.mark !== null ? `${student.mark}%` : "----"}</div>
                 </div>
              </div>

              {student.submission_id && (
                <button 
                  onClick={() => navigate(`/instructor/tests/review/${testId}/${student.submission_id}`)}
                  className="w-full bg-[#F67300] text-white py-3 rounded-xl text-sm font-bold shadow-lg shadow-orange-50"
                >
                  Review Submission
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </InstructorDashboardLayout>
  );
}
