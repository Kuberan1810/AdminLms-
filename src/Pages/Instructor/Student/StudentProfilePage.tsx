import { ArrowLeft } from "iconsax-react";
import { useNavigate, useParams } from "react-router-dom";
import InstructorDashboardLayout from "../../../Components/instructor/InstructorDashboardLayout";
import { students } from "./studentsData";
import BtnCom from "../../../Components/Student/BtnCom";
import { assignmentData, testData, attendanceData, recentActivityData } from "./studentsData";

const StudentProfilePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  // const student = students.find((s) => s.id === id);
  const student = students.find((s) => String(s.id) === id);


  if (!student) {
    return (
      <InstructorDashboardLayout>
        <div className="flex flex-col h-full bg-[#FAFAFA] px-6 py-6 items-center justify-center">
          <h2 className="text-xl font-semibold text-[#1A1A1A]">
            Student not found
          </h2>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 px-4 py-2 bg-[#F67300] text-white rounded-lg"
          >
            Go Back
          </button>
        </div>
      </InstructorDashboardLayout>
    );
  }

  return (
    <InstructorDashboardLayout>
      <div className="flex flex-col h-full bg-[#FAFAFA] dark:bg-[#1E1E1E] px-4 sm:px-6 py-6 overflow-y-auto custom-scrollbar space-y-5 transition-colors">
        {/* Back Button */}
        {/* <div className="flex gap-2 items-center">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-full transition cursor-pointer "
          >
            <ArrowLeft size={22}  color="#333" />
          </button>
          <p className="lg:text-lg text-base font-semibold text-[#333] ">Go Back</p>
        </div> */}

        {/* Header Card */}
        <div className="boxStyle mb-6 flex flex-col gap-6">



          {/* RIGHT ACTIONS */}
          <div className="flex gap-3 w-auto self-end">

            <BtnCom label="Message" />
            <BtnCom label="Export Report" />
          </div>


          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* LEFT */}
            <div className="flex flex-col sm:flex-row sm:items-center   md:gap-50 gap-5 w-full ">
              <div className="flex gap-5 items-center justify-center ">
                {/* Avatar */}
                <div className="w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] bg-[#D9D9D9] rounded-full shrink-0 ">

                  {student.image && (
                    <img
                      src={student.image}
                      alt={student.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  )}
                </div>

                {/* Name & ID */}

                <div>
                  <h1 className="text-[16px] sm:text-[18px] lg:text-2xl font-semibold text-[#333] mb-1">
                    {student.name}
                  </h1>
                  <span className="text-sm md:text-base lg:text-lg text-[#808080]">
                    {student.studentId}
                  </span>
                </div>
              </div>

              <div className="flex gap-10 justify-center">
                {/* Email */}
                <div>
                  <span className="block text-xs lg:text-base font-semibold text-[#333]">Email Id</span>
                  <span className="text-sm lg:text-sm text-[#626262] break-all">
                    {student.email}
                  </span>
                </div>

                {/* Contact */}
                <div>
                  <span className="block text-xs lg:text-base font-semibold text-[#333]">
                    Contact number
                  </span>
                  <span className="text-sm lg:text-sm text-[#626262] break-all">
                    {student.contact}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* STATS */}
          <div className="flex flex-wrap gap-4 justify-center">
            {[
              {
                label: "Overall Attendance",
                value: student.stats.overallAttendance,
                color: "#16A34A",
              },
              {
                label: "Average Score",
                value: student.stats.averageScore,
              },
              {
                label: "Live Participation",
                value: student.stats.liveParticipation,
              },
              {
                label: "Classes Attended",
                value: student.stats.classesAttended,
              },
            ].map((stat, i) => (
              <div
                key={i}
                className="boxStyle flex flex-col items-center gap-1"
              >
                <span className="text-sm lg:text-base text-[#4d4d4d] font-medium text-center">
                  {stat.label}
                </span>
                <span
                  className="text-lg font-semibold"
                  style={{ color: stat.color ?? "#626262" }}
                >
                  {stat.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Assignment Performance */}
          <div className="boxStyle flex flex-col gap-2.5">
            <div className="flex justify-between items-center mb-2.5">
              <h2 className="text-base lg:text-lg font-semibold text-[#333]">
                Assignment Performance
              </h2>
              <BtnCom label="Export CSV" />
            </div>

            {/* Scroll Wrapper */}
            <div className="overflow-x-auto">

              {/* Table Wrapper */}
              <div className="border border-[#E5E7EB] dark:border-[#3B3B3B] rounded-[12px] overflow-hidden min-w-[600px]">

                {/* Table Header */}
                <div className="bg-[#FFF5ED] dark:bg-[#333333] grid grid-cols-[120px_1fr_180px_80px] items-center px-5 py-3 text-xs lg:text-sm font-bold text-[#F67300] transition-colors">
                  <span>S.no</span>
                  <span>Assignment Name</span>
                  <span className="text-center">Submission</span>
                  <span className="text-right">Mark</span>
                </div>

                {/* Table Body */}
                <div className="flex flex-col divide-y divide-gray-100">
                  {assignmentData.map((item, index) => (
                    <div
                      key={item.id}
                      className="grid grid-cols-[120px_1fr_180px_80px] items-center px-5 py-3 text-xs lg:text-sm text-[#333333] dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-[#363636] transition-colors"
                    >
                      <span className="text-[#626262]">
                        {index + 1}
                      </span>

                      <span className="truncate pr-6 font-medium">
                        {item.name}
                      </span>

                      <div className="flex justify-center">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium
                  ${item.submission === "Late"
                              ? "bg-yellow-100 text-yellow-600"
                              : item.submission === "Overdue"
                                ? "bg-red-100 text-red-600"
                                : "bg-green-100 text-green-600"
                            }
                `}
                        >
                          {item.submission}
                        </span>
                      </div>

                      <span className="text-right font-semibold text-[#333]">
                        {item.mark}
                      </span>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </div>



          {/* Test Performance */}
          <div className="boxStyle flex flex-col gap-2.5">

            <div className="flex justify-between items-center mb-2.5">
              <h2 className="text-base lg:text-lg font-semibold text-[#333]">
                Test Performance
              </h2>
              <BtnCom label="Export CSV" />
            </div>

            {/* Scroll Wrapper */}
            <div className="overflow-x-auto">

              {/* Table Wrapper */}
              <div className="border border-[#E5E7EB] dark:border-[#3B3B3B] rounded-[12px] overflow-hidden min-w-[700px] lg:min-w-0">

                {/* Header */}
                <div className="bg-[#FFF5ED] dark:bg-[#333333] grid grid-cols-[70px_130px_1fr_130px_50px] items-center px-5 py-3 text-xs lg:text-sm font-bold text-[#F67300] transition-colors">

                  <span>S.no</span>
                  <span>Date</span>
                  <span>Test Name</span>
                  <span className="text-center">Mark</span>
                  <span className="text-center">Status</span>

                </div>

                {/* Body */}
                <div className="flex flex-col divide-y divide-gray-100">

                  {testData.map((item, index) => (
                    <div
                      key={item.id}
                      className="grid grid-cols-[70px_130px_1fr_130px_50px] items-center px-5 py-3 text-xs lg:text-sm text-[#333333] dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-[#363636] transition-colors"
                    >
                      {/* S.no */}
                      <span className="text-[#626262]">
                        {index + 1}
                      </span>

                      {/* Date */}
                      <span>
                        {item.date}
                      </span>

                      {/* Test Name */}
                      <span className="truncate pr-6 font-medium">
                        {item.name}
                      </span>

                      {/* Mark */}
                      <span className="text-center font-semibold text-[#333]">
                        {item.mark}
                      </span>

                      {/* Status Badge */}
                      <div className="flex justify-center">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium
                ${item.result === "Fail"
                              ? "bg-red-100 text-red-600"
                              : "bg-green-100 text-green-600"
                            }`}
                        >
                          {item.result}
                        </span>
                      </div>

                    </div>
                  ))}

                </div>

              </div>
            </div>
          </div>



          {/* Attendance Details */}
          <div className="boxStyle flex flex-col gap-2.5 h-fit">

            <div className="flex justify-between items-center mb-2.5">
              <h2 className="text-base lg:text-lg font-semibold text-[#333]">
                Attendance Details
              </h2>
              <BtnCom label="Export CSV" />
            </div>

            {/* Scroll Wrapper */}
            <div className="overflow-x-auto">

              <div className="border border-[#E5E7EB] dark:border-[#3B3B3B] rounded-[12px] 
    overflow-hidden min-w-[600px] lg:min-w-0">

                {/* Header */}
                <div className="bg-[#FFF5ED] dark:bg-[#333333]
      grid grid-cols-[120px_150px_1fr_120px] 
      items-center px-5 py-3 
      text-xs lg:text-sm font-bold text-[#F67300] transition-colors">

                  <span>S.no</span>
                  <span>Date</span>
                  <span>Class</span>
                  <span className="text-center">Status</span>

                </div>

                {/* Body */}
                <div className="flex flex-col divide-y divide-gray-100">

                  {attendanceData.map((item, index) => (
                    <div
                      key={item.id}
                      className="grid grid-cols-[120px_150px_1fr_120px] 
            items-center px-5 py-3 
            text-xs lg:text-sm text-[#333333] dark:text-gray-200
            hover:bg-gray-50 dark:hover:bg-[#363636] transition-colors"
                    >
                      {/* S.no */}
                      <span className="text-[#626262]">
                        {index + 1}
                      </span>

                      {/* Date */}
                      <span>
                        {item.date}
                      </span>

                      {/* Class */}
                      <span className="truncate pr-6 font-medium">
                        {item.className}
                      </span>

                      {/* Status */}
                      <div className="flex justify-center">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium
                ${item.status === "Absent"
                              ? "bg-red-100 text-red-600"
                              : "bg-green-100 text-green-600"
                            }`}
                        >
                          {item.status}
                        </span>
                      </div>

                    </div>
                  ))}

                </div>

              </div>
            </div>
          </div>


          {/* Recent Activity */}
          <div className="boxStyle flex flex-col gap-2.5 h-full">

            <div className="flex justify-between items-center mb-2.5">
              <h2 className="text-base lg:text-lg font-semibold text-[#333]">
                Recent Activity
              </h2>
              <BtnCom label="Export CSV" />
            </div>

            <div className="flex flex-col gap-3">

              {recentActivityData.map((item) => (
                <div
                  key={item.id}
                  className="boxStyle hover:bg-[#fafafa]! dark:hover:bg-[#363636]! transition-colors cursor-pointer"
                >
                  <p className="text-sm lg:text-base   text-[#333] font-medium mb-1 truncate">
                    {item.title}
                  </p>

                  <span className="text-xs lg:text-sm text-[#808080]">
                    {item.time}
                  </span>
                </div>
              ))}

            </div>

          </div>

        </div>
      </div>
    </InstructorDashboardLayout>
  );
};

export default StudentProfilePage;
