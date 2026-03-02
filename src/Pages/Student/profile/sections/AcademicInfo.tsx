import React from "react";
import { Filter, CalendarCheck, CalendarClock } from "lucide-react";

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
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="bg-white rounded-2xl p-6 mb-8 shadow-[0_4px_20px_0px_rgba(0,0,0,0.05)] border border-gray-100">
      <div className="flex items-center justify-between mb-4 bg-[#FFF5EB] p-4 rounded-xl">
        <h2 className="text-[#F67300] font-semibold text-lg ">{title}</h2>

        <button className="flex items-center gap-2 text-xs md:text-sm border border-[#E5E7EB] px-3 py-1.5 rounded-lg bg-gray-50 text-gray-600 font-medium hover:bg-gray-100 transition-colors">
          <Filter size={14} className="text-gray-400" />
          All status
        </button>
      </div>

      {children}
    </div>
  );
};

const AcademicInfo = () => {
  return (
    <div className="min-h-screen pb-10">
      <div className="mx-auto">

        {/* ---------------- My Courses ---------------- */}
        {/* ---------------- My Courses ---------------- */}
        <SectionCard title="My Courses">
          <div className="space-y-3">
            {[
              { code: "AM101", date: "12 Dec 2025", duration: "3 Months" },
              { code: "CS201", date: "5 Jan 2026", duration: "4 Months" },
              { code: "ML301", date: "15 Jan 2026", duration: "6 Months" },
              { code: "WEB401", date: "20 Jan 2026", duration: "2 Months" },
            ].map((course, i) => (
              <div
                key={i}
                className="bg-white border border-[#d3d3d3] rounded-xl py-4 px-6 md:px-8 flex flex-col md:flex-row justify-between md:items-center gap-4 transition-all hover:shadow-md"
              >
                <div className="text-md font-medium">Course ID
                  <p className="text-sm font-light text-gray-600">{course.code}</p></div>
                <div className="text-md font-medium">Start Date
                  <p className="text-sm font-light text-gray-600">{course.date}</p></div>
                <div className="text-md font-medium">Duration
                  <p className="text-sm font-light text-gray-600">{course.duration}</p></div>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* ---------------- Attendance ---------------- */}
        <SectionCard title="Attendance Details">
          <div className="bg-white rounded-xl border border-[#d3d3d3] overflow-hidden overflow-x-auto">
            <table className="w-full text-sm min-w-[500px]">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="px-4 py-3 text-left">S.no</th>
                  <th className="px-4 py-3 text-left">Date</th>
                  <th className="px-4 py-3 text-left">Class</th>
                  <th className="px-4 py-3 text-left">Status</th>
                </tr>
              </thead>

              <tbody>
                {[
                  { sno: 1, date: "12/01/2026", class: "AI Agent", status: "Present" },
                  { sno: 2, date: "13/01/2026", class: "Web Development", status: "Present" },
                  { sno: 3, date: "14/01/2026", class: "Machine Learning", status: "Absent" },
                  { sno: 4, date: "15/01/2026", class: "AI Agent", status: "Present" },
                ].map((row, i) => (
                  <tr key={i} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 align-middle">{row.sno}</td>
                    <td className="px-4 py-3 align-middle">{row.date}</td>
                    <td className="px-4 py-3 align-middle">{row.class}</td>
                    <td className="px-4 py-3 align-middle">
                      <Badge color={row.status === "Present" ? "green" : "red"}>
                        {row.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>

        {/* ---------------- Assignment ---------------- */}
        <SectionCard title="Assignment">
          <div className="space-y-4">
            {[
              {
                title: "Build Q&A system using RAG",
                course: "AM101 - AI / ML Frontier AI Engineer",
                desc: "Building a Question-Answering (Q&A) system using Retrieval-Augmented Generation (RAG)",
                status: "In Progress",
                dueDate: "Due Jan 26, 11:59 PM",
                btnText: "View Assignment",
                btnColor: "orange",
              },
              {
                title: "Implement PDF-based Q&A using Vector Database",
                course: "AM101 - AI / ML Frontier AI Engineer",
                desc: "Extract content from PDFs, store embeddings, and answer user queries using vector search",
                status: "Submitted",
                dueDate: "Submitted on: Jan 18, 12:06 PM",
                btnText: "Submitted",
                btnColor: "gray",
                mark: "Mark :75%",
              },
              {
                title: "Create a Search Interface for System Logs",
                course: "SS102 - System and Software System Pro",
                desc: "Simulate quantum entanglement concepts using code and visualize quantum state behavior.",
                status: "In Progress",
                dueDate: "Due Jan 26, 11:59 PM",
                btnText: "View Assignment",
                btnColor: "orange",
              },
            ].map((assignment, i) => (
              <div
                key={i}
                className="bg-gray-50/50 border border-[#d3d3d3] rounded-2xl p-6 transition-all hover:shadow-md relative"
              >
                <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                  {/* Left Content */}
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="font-semibold text-lg text-[#333333]">
                        {assignment.title}
                      </h3>
                      <Badge color={assignment.status === "In Progress" ? "orange" : "green"}>
                        {assignment.status}
                      </Badge>
                    </div>

                    <p className="text-sm text-gray-500 font-medium">
                      {assignment.course}
                    </p>

                    <p className="text-sm text-gray-500 pt-1">
                      {assignment.desc}
                    </p>
                  </div>

                  {/* Right Content */}
                  <div className="flex flex-col items-end gap-3 min-w-fit">
                    {assignment.status === "Submitted" ? (
                      <div className="flex flex-col items-center gap-2">
                        <span className="text-sm text-gray-500 font-normal flex items-center gap-2 mb-1">
                          <CalendarCheck size={16} className="text-gray-400" /> {assignment.dueDate}
                        </span>

                        <button className="bg-gray-100/50 text-gray-500 text-sm font-medium px-10 py-2.5 rounded-xl cursor-default w-full text-center hover:bg-gray-100 transition-colors">
                          {assignment.btnText}
                        </button>

                        {assignment.mark && (
                          <span className="bg-orange-100/50 text-orange-500 text-sm font-medium px-4 py-1.5 rounded-lg">
                            {assignment.mark}
                          </span>
                        )}
                      </div>
                    ) : (
                      <div className="flex flex-col items-end gap-1">
                        <span className="text-xs text-gray-400 font-medium flex items-center gap-1 mb-2">
                          <CalendarClock size={14} /> {assignment.dueDate}
                        </span>
                        <button className="bg-[#F67300] text-white text-sm font-medium px-6 py-2.5 rounded-xl hover:bg-orange-600 transition-colors shadow-sm">
                          {assignment.btnText}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* ---------------- Test ---------------- */}
        <SectionCard title="Test">
          <div className="bg-white rounded-xl border border-[#d3d3d3] overflow-hidden overflow-x-auto">
            <table className="w-full text-sm min-w-[600px]">
              <thead className="bg-[#fff] text-[#333333] border-b border-[#d3d3d3]">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">S.no</th>
                  <th className="px-6 py-4 text-left font-semibold">Date</th>
                  <th className="px-6 py-4 text-left font-semibold">Test name</th>
                  <th className="px-6 py-4 text-left font-semibold">Mark</th>
                  <th className="px-6 py-4 text-left font-semibold">Result</th>
                </tr>
              </thead>

              <tbody>
                {[
                  { sno: 1, date: "23 Jan 2026", name: "Test name", mark: 35, result: "Fail" },
                  { sno: 2, date: "23 Jan 2026", name: "Test name", mark: 35, result: "Pass" },
                  { sno: 3, date: "23 Jan 2026", name: "Test name", mark: 35, result: "Pass" },
                  { sno: 4, date: "23 Jan 2026", name: "Test name", mark: 35, result: "Pass" },
                ].map((t, i) => (
                  <tr key={i} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 align-middle text-[#333333]">{t.sno}</td>
                    <td className="px-6 py-4 align-middle text-[#333333]">{t.date}</td>
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
        </SectionCard>

      </div>
    </div>
  );
};

export default AcademicInfo;
