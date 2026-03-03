import React, { useState, useRef, useEffect } from "react";
import { FilterSearch, CalendarTick } from 'iconsax-react';
import { CalendarCheck, CalendarClock, ChevronDown, ClipboardList } from "lucide-react";

const Badge = ({
  children,
  color = "gray",
}: {
  children: React.ReactNode;
  color?: "green" | "red" | "orange" | "gray";
}) => {
  const map = {
    green: "bg-green-100 text-green-600",
    red: "bg-red-100 text-red-600",
    orange: "bg-orange-100 text-orange-600",
    gray: "bg-gray-100 text-gray-600",
  };

  return (
    <span
      className={`text-xs px-3 py-1 rounded-full font-medium ${map[color]}`}
    >
      {children}
    </span>
  );
};

const SectionCard = ({
  title,
  children,
  hasFilter = true,
  filterValue,
  onFilterChange,
  filterOptions = ['All status'],
}: {
  title: string;
  children: React.ReactNode;
  hasFilter?: boolean;
  filterValue?: string;
  onFilterChange?: (value: string) => void;
  filterOptions?: string[];
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () =>
      document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="boxStyle mb-5">
      <div className="flex items-center justify-between mb-4 bg-[#FFF5EB] p-4 rounded-xl shadow-sm border border-orange-100">
        <h2 className="text-[#F67300] font-semibold text-lg ">{title}</h2>

        {hasFilter && onFilterChange && filterValue && (
          <div ref={dropdownRef} className="relative z-10 w-full md:w-auto">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center justify-between gap-2 border border-[#F2EEF4] rounded-xl px-4 py-2 bg-white hover:bg-gray-50 transition-all cursor-pointer w-full md:w-auto min-w-[140px]"
            >
              <div className="flex items-center gap-2">
                <FilterSearch size="16" color="#626262" />
                <span className="text-[13px] font-medium text-gray-600">
                  {filterValue}
                </span>
              </div>
              <ChevronDown
                size="16"
                className={`text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
              />
            </button>

            {isOpen && (
              <div className="absolute top-full mt-2 right-0 w-full min-w-[140px] bg-white border border-[#F2EEF4] rounded-xl shadow-md overflow-hidden">
                {filterOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      onFilterChange(option);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-[13px] transition-colors cursor-pointer ${filterValue === option
                      ? "bg-[#FFF7ED] text-[#F97316] font-medium"
                      : "hover:bg-gray-50 text-gray-600"
                      }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {children}
    </div>
  );
};

const AcademicInfo = () => {

  const [attendanceFilter, setAttendanceFilter] = useState('All status');
  const attendanceOptions = ['All status', 'Present', 'Absent', 'Holiday'];

  const attendanceData = [
    // { sno: 1, date: "12/01/2026", class: "AI Agent", status: "Present" },
    // { sno: 2, date: "13/01/2026", class: "Web Development", status: "Present" },
    // { sno: 3, date: "14/01/2026", class: "Machine Learning", status: "Absent" },
    // { sno: 4, date: "15/01/2026", class: "AI Agent", status: "Present" },
  ];

  const filteredAttendance = attendanceData.filter(item =>
    attendanceFilter === 'All status' || item.status === attendanceFilter
  );

  const [assignmentFilter, setAssignmentFilter] = useState('All status');
  const assignmentOptions = ['All status', 'In Progress', 'Submitted'];

  const assignmentData = [
    // {
    //   title: "Build Q&A system using RAG",
    //   course: "AM101 - AI / ML Frontier AI Engineer",
    //   desc: "Building a Question-Answering (Q&A) system using Retrieval-Augmented Generation (RAG)",
    //   status: "In Progress",
    //   dueDate: "Due Jan 26, 11:59 PM",
    //   btnText: "View Assignment",
    //   btnColor: "orange",
    // },
    // {
    //   title: "Implement PDF-based Q&A using Vector Database",
    //   course: "AM101 - AI / ML Frontier AI Engineer",
    //   desc: "Extract content from PDFs, store embeddings, and answer user queries using vector search",
    //   status: "Submitted",
    //   dueDate: "Submitted on: Jan 18, 12:06 PM",
    //   btnText: "Submitted",
    //   btnColor: "gray",
    //   mark: "Mark :75%",
    // },
    // {
    //   title: "Create a Search Interface for System Logs",
    //   course: "SS102 - System and Software System Pro",
    //   desc: "Simulate quantum entanglement concepts using code and visualize quantum state behavior.",
    //   status: "In Progress",
    //   dueDate: "Due Jan 26, 11:59 PM",
    //   btnText: "View Assignment",
    //   btnColor: "orange",
    // },
  ];

  const filteredAssignments = assignmentData.filter(item =>
    assignmentFilter === 'All status' || item.status === assignmentFilter
  );

  const [testFilter, setTestFilter] = useState('All status');
  const testOptions = ['All status', 'Pass', 'Fail'];

  const testData = [
    // { sno: 1, date: "23 Jan 2026", name: "Test name", mark: 35, result: "Fail" },
    // { sno: 2, date: "23 Jan 2026", name: "Test name", mark: 35, result: "Pass" },
    // { sno: 3, date: "23 Jan 2026", name: "Test name", mark: 35, result: "Pass" },
    // { sno: 4, date: "23 Jan 2026", name: "Test name", mark: 35, result: "Pass" },
  ];

  const filteredTests = testData.filter(item =>
    testFilter === 'All status' || item.result === testFilter
  );

  return (
    <div className="min-h-screen pb-10">
      <div className="mx-auto">

        {/* ---------------- My Courses ---------------- */}

        <SectionCard title="My Courses" hasFilter={false}>
          <div className="space-y-3">
            {[
              { code: "AM101", date: "02 Mar 2026", duration: "3 Months" },

            ].map((course, i) => (
              <div
                key={i}
                className="boxStyle px-6 md:px-8 flex flex-col md:flex-row justify-between md:items-center gap-4 transition-all "
              >
                <div className="text-md font-medium text-primary">Course ID
                  <p className="text-sm font-medium text-[#626262] ">{course.code}</p></div>
                <div className="text-md font-medium text-primary">Start Date
                  <p className="text-sm font-medium text-[#626262]">{course.date}</p></div>
                <div className="text-md font-medium text-primary">Duration
                  <p className="text-sm font-medium text-[#626262] ">{course.duration}</p></div>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* ---------------- Attendance ---------------- */}
        <SectionCard
          title="Attendance Details"
          filterValue={attendanceFilter}
          onFilterChange={setAttendanceFilter}
          filterOptions={attendanceOptions}
        >
          {filteredAttendance.length > 0 ? (
            <div className="boxStyle overflow-hidden overflow-x-auto p-0">
              <table className="w-full text-sm min-w-[500px]">
                <thead className="bg-[#F6730010] text-[#F67300] border-b border-[#F6730020]">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">S.no</th>
                    <th className="px-6 py-4 text-left font-semibold">Date</th>
                    <th className="px-6 py-4 text-left font-semibold">Class</th>
                    <th className="px-6 py-4 text-left font-semibold">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredAttendance.map((row, i) => (
                    <tr key={i} className="border-b border-[#F2EEF4] last:border-0 hover:bg-orange-50/30 transition-colors">
                      <td className="px-6 py-4 align-middle text-[#333333] font-medium">{row.sno}</td>
                      <td className="px-6 py-4 align-middle text-[#626262]">{row.date}</td>
                      <td className="px-6 py-4 align-middle text-[#333333]">{row.class}</td>
                      <td className="px-6 py-4 align-middle">
                        <Badge color={row.status === "Present" ? "green" : "red"}>
                          {row.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="w-16 h-16 bg-[#FFF5EB] rounded-full flex items-center justify-center mb-4">
                <ClipboardList size={28} className="text-[#F67300]" />
              </div>
              <h3 className="text-lg font-normal text-[#333333] mb-2">
                No Attendance Records Found
              </h3>
              <p className="text-sm text-[#808080] mb-0 text-center max-w-sm font-light">
                There are no attendance records for this date.
              </p>
            </div>
          )}
        </SectionCard>

        {/* ---------------- Assignment ---------------- */}
        <SectionCard
          title="Assignment"
          filterValue={assignmentFilter}
          onFilterChange={setAssignmentFilter}
          filterOptions={assignmentOptions}
        >
          {filteredAssignments.length > 0 ? (
            <div className="space-y-4">
              {filteredAssignments.map((item, i) => {
                const getStatusStyles = (status: string) => {
                  switch (status) {
                    case 'In Progress': return 'bg-[#FFEDDE] text-[#F67300] ';
                    case 'Submitted': return 'bg-[#2A9A4610] text-[#2A9A46] ';
                    case 'Overdue': return 'bg-[#F32D2D10] text-[#F32D2D] ';
                    case 'Submitted Late': return 'bg-[#F32D2D10] text-[#F32D2D]';
                    default: return 'bg-gray-50 text-gray-400 ';
                  }
                };

                const isLocked = item.status === "Submitted" || item.status === "Submitted Late";

                return (
                  <div key={i} className="boxStyle">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                      {/* LEFT CONTENT */}
                      <div className="flex-1">
                        <div className="flex flex-wrap sm:items-center sm:flex-row gap-2.5 sm:gap-7.5 mb-1.5">
                          <h3 className="text-[18px] sm:text-[20px] font-semibold text-[#333333]">
                            {item.title}
                          </h3>

                          <span
                            className={`text-[12px] px-2.5 py-1 rounded-full w-fit mb-2.5 font-medium ${getStatusStyles(
                              item.status
                            )}`}
                          >
                            {item.status}
                          </span>
                        </div>

                        <p className="text-[14px] sm:text-[16px] font-medium text-[#626262] mb-4">
                          {item.course}
                        </p>

                        <p className="text-[14px] text-[#626262] leading-relaxed md:line-clamp-1 line-clamp-2 ">
                          {item.desc}
                        </p>
                      </div>

                      {/* RIGHT CONTENT */}
                      <div className="flex flex-col items-start sm:items-end gap-3 w-full lg:w-auto min-w-50">
                        <div className="flex items-center gap-2 text-[#626262]">
                          <div className="iconStyle">
                            <CalendarTick size="16" color="#626262" />
                          </div>
                          <span className="text-[12px] md:text-base font-medium">
                            {item.dueDate}
                          </span>
                        </div>

                        <button
                          disabled={isLocked}
                          className={`w-full sm:w-44 py-2.5 rounded-2xl text-sm font-semibold tracking-wider transition-all ${isLocked
                            ? "bg-[#F4F4F4] text-[#808080] cursor-not-allowed"
                            : "bg-[#F67300] text-white hover:opacity-90 cursor-pointer"
                            }`}
                        >
                          {isLocked ? item.status : "View Assignment"}
                        </button>

                        {item.mark && (
                          <div className="w-full text-center sm:text-right mt-1">
                            <span className="bg-[#FFF5EB] text-[#F67300] text-sm font-semibold px-4 py-1.5 rounded-lg border border-[#F6730030]">
                              Score: {item.mark}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="w-16 h-16 bg-[#FFF5EB] rounded-full flex items-center justify-center mb-4">
                <ClipboardList size={28} className="text-[#F67300]" />
              </div>
              <h3 className="text-lg font-normal text-[#333333] mb-2">
                No Assignments Found
              </h3>
              <p className="text-sm text-[#808080] mb-0 text-center max-w-sm font-light">
                There are no assignments scheduled for this date.
              </p>
            </div>
          )}
        </SectionCard>

        {/* ---------------- Test ---------------- */}
        <SectionCard
          title="Test"
          filterValue={testFilter}
          onFilterChange={setTestFilter}
          filterOptions={testOptions}
        >
          {filteredTests.length > 0 ? (
            <div className="boxStyle overflow-hidden overflow-x-auto p-0">
              <table className="w-full text-sm min-w-[600px]">
                <thead className="bg-[#F6730010] text-[#F67300] border-b border-[#F6730020]">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">S.no</th>
                    <th className="px-6 py-4 text-left font-semibold">Date</th>
                    <th className="px-6 py-4 text-left font-semibold">Test name</th>
                    <th className="px-6 py-4 text-left font-semibold">Mark</th>
                    <th className="px-6 py-4 text-left font-semibold">Result</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredTests.map((t, i) => (
                    <tr key={i} className="border-b border-[#F2EEF4] last:border-0 hover:bg-orange-50/30 transition-colors">
                      <td className="px-6 py-4 align-middle text-[#333333] font-medium">{t.sno}</td>
                      <td className="px-6 py-4 align-middle text-[#626262]">{t.date}</td>
                      <td className="px-6 py-4 align-middle text-[#333333]">
                        {t.name}
                      </td>
                      <td className="px-6 py-4 align-middle text-[#333333]">{t.mark}</td>
                      <td className="px-6 py-4 align-middle">
                        <Badge color={t.result === "Pass" ? "green" : "red"}>
                          {t.result}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="w-16 h-16 bg-[#FFF5EB] rounded-full flex items-center justify-center mb-4">
                <ClipboardList size={28} className="text-[#F67300]" />
              </div>
              <h3 className="text-lg font-normal text-[#333333] mb-2">
                No Test Records Found
              </h3>
              <p className="text-sm text-[#808080] mb-0 text-center max-w-sm font-light">
                There are no test records for this date.
              </p>
            </div>
          )}
        </SectionCard>

      </div>
    </div>
  );
};

export default AcademicInfo;
