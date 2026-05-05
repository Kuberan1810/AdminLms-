import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  MoreVertical, 
  ChevronLeft, 
  ChevronRight, 
  Mail, 
  FileText, 
  Users, 
  Trash2, 
  ListFilter, 
  SlidersHorizontal,
  ChevronDown,
  Check
} from "lucide-react";

import { Sort, Add } from 'iconsax-react';

import { mockStudents, type Student } from '../mockData';



const StatusBadge = ({ status }: { status: string }) => {
  const styles: Record<string, string> = {
    Active: 'bg-[#047C2E]/10 text-[#047C2E]',
    Leave: 'bg-[#F6810C]/10 text-[#F6810C]',
    Pending: 'bg-[#3111E8]/10 text-[#3111E8]',
    Dropped: 'bg-[#EA1115]/10 text-[#EA1115]',
  };

  return (
    <span className={`inline-block px-3 py-1 rounded-full text-[12px] font-regular ${styles[status] || 'bg-gray-100 text-gray-600'}`}>
      {status}
    </span>
  );
};

const TableSection = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState("Newest");
  const [currentPage, setCurrentPage] = useState(1);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [studentsList, setStudentsList] = useState<Student[]>(mockStudents);

  const itemsPerPage = 8;

  const [activeActionMenu, setActiveActionMenu] = useState<string | null>(null);
  const [studentToDelete, setStudentToDelete] = useState<Student | null>(null);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveActionMenu(null);
      }
      if (statusRef.current && !statusRef.current.contains(event.target as Node)) {
        setIsStatusOpen(false);
      }
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredAndSortedData = useMemo(() => {

    let data = [...studentsList];


    if (searchTerm) {
      const lowerQuery = searchTerm.toLowerCase();
      data = data.filter(student =>
        student.name.toLowerCase().includes(lowerQuery) ||
        student.email.toLowerCase().includes(lowerQuery) ||
        student.id.toLowerCase().includes(lowerQuery)
      );
    }

    if (statusFilter !== 'All') {
      data = data.filter(student => student.status === statusFilter);
    }

    data.sort((a, b) => {
      if (sortBy === "Name A-Z") return a.name.localeCompare(b.name);
      if (sortBy === "Name Z-A") return b.name.localeCompare(a.name);
      const dateA = new Date(a.dateJoined).getTime();
      const dateB = new Date(b.dateJoined).getTime();
      return sortBy === 'Newest' ? dateB - dateA : dateA - dateB;
    });

    return data;
  }, [searchTerm, statusFilter, sortBy]);

  const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage);
  const currentData = filteredAndSortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const confirmDelete = () => {
    if (studentToDelete) {

      setStudentsList(prev => prev.filter(s => s.id !== studentToDelete.id));

      setStudentToDelete(null);
    }
  };

  const statusOptions = ["All", "Active", "Leave", "Pending", "Dropped"];
  const sortOptions = ["Newest", "Oldest", "Name A-Z", "Name Z-A"];

  return (
    <div className="space-y-6">
      {/* Filter Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 relative z-10">
        <div className="relative w-full md:w-[400px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#626262]" size={18} />
          <input
            type="text"
            placeholder="Search by name, ID or email..."
            className="w-full pl-11 pr-4 py-3 bg-white dark:bg-[#2A2A2A] border border-[#F2EEF4] dark:border-[#3B3B3B] rounded-[18px] text-sm focus:outline-none focus:ring-1 focus:ring-[#F67300]/50 transition-all placeholder:text-[#888888]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Status Filter */}
          <div ref={statusRef} className="relative">
            <button
              onClick={() => setIsStatusOpen(!isStatusOpen)}
              className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-[#2A2A2A] border border-[#F2EEF4] dark:border-[#3B3B3B] rounded-xl text-sm font-semibold text-[#333333] dark:text-white hover:bg-gray-50 dark:hover:bg-[#333] transition-all min-w-[140px] justify-between cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <ListFilter size={18} className="text-[#626262]" />
                <span>{statusFilter === "All" ? "Filter Status" : statusFilter}</span>
              </div>
              <ChevronDown size={16} className={`text-[#626262] transition-transform ${isStatusOpen ? "rotate-180" : ""}`} />
            </button>
            {isStatusOpen && (
              <div className="absolute top-full right-0 mt-2 w-[180px] bg-white dark:bg-[#2A2A2A] border border-[#F2EEF4] dark:border-[#3B3B3B] rounded-xl shadow-xl overflow-hidden z-50">
                {statusOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => { setStatusFilter(option); setIsStatusOpen(false); setCurrentPage(1); }}
                    className="w-full text-left px-4 py-3 text-sm flex items-center justify-between hover:bg-gray-50 dark:hover:bg-[#333] transition-colors cursor-pointer"
                  >
                    <span className={`${statusFilter === option ? "text-[#F67300] font-bold" : "text-[#333333] dark:text-white font-medium"}`}>
                      {option === "All" ? "All Status" : option}
                    </span>
                    {statusFilter === option && <Check size={16} className="text-[#F67300]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Sort Dropdown */}
          <div ref={sortRef} className="relative">
            <button
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-[#2A2A2A] border border-[#F2EEF4] dark:border-[#3B3B3B] rounded-xl text-sm font-semibold text-[#333333] dark:text-white hover:bg-gray-50 dark:hover:bg-[#333] transition-all min-w-[160px] justify-between cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <SlidersHorizontal size={18} className="text-[#626262]" />
                <span>Sort by: <span className="text-[#F67300]">{sortBy}</span></span>
              </div>
              <ChevronDown size={16} className={`text-[#626262] transition-transform ${isSortOpen ? "rotate-180" : ""}`} />
            </button>
            {isSortOpen && (
              <div className="absolute top-full right-0 mt-2 w-[180px] bg-white dark:bg-[#2A2A2A] border border-[#F2EEF4] dark:border-[#3B3B3B] rounded-xl shadow-xl overflow-hidden z-50">
                {sortOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => { setSortBy(option); setIsSortOpen(false); }}
                    className="w-full text-left px-4 py-3 text-sm flex items-center justify-between hover:bg-gray-50 dark:hover:bg-[#333] transition-colors cursor-pointer"
                  >
                    <span className={`${sortBy === option ? "text-[#F67300] font-bold" : "text-[#333333] dark:text-white font-medium"}`}>
                      {option}
                    </span>
                    {sortBy === option && <Check size={16} className="text-[#F67300]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white dark:bg-[#2A2A2A] rounded-[20px] border border-[#F2EEF4] dark:border-[#3B3B3B] overflow-visible">
        <div className="overflow-x-auto overflow-y-visible pb-16">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#FFFBF8] dark:bg-[#3B3B3B] border-b border-[#F2EEF4] dark:border-[#3B3B3B]">
                <th className="px-6 py-5 text-sm md:text-base font-semibold text-[#333333] dark:text-white">Student</th>
                <th className="px-6 py-5 text-sm md:text-base font-semibold text-[#333333] dark:text-white text-center">Student Id</th>
                <th className="px-6 py-5 text-sm md:text-base font-semibold text-[#333333] dark:text-white">Course</th>
                <th className="px-6 py-5 text-sm md:text-base font-semibold text-[#333333] dark:text-white text-center">Status</th>
                <th className="px-6 py-5 text-sm md:text-base font-semibold text-[#333333] dark:text-white text-center">Attendance</th>
                <th className="px-6 py-5 text-sm md:text-base font-semibold text-[#333333] dark:text-white text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((student) => (
                <tr
                  key={student.id}
                  onClick={() => navigate(`/admin/users/students/${student.id}`)}
                  className="border-b border-[#F2EEF4] dark:border-[#3B3B3B] last:border-0 hover:bg-gray-50/50 dark:hover:bg-[#333]/30 transition-all cursor-pointer group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={student.avatar} alt={student.name} className="w-10 h-10 rounded-full object-cover" />
                      <div>
                        <p className="text-sm md:text-base font-semibold text-[#333333] dark:text-white">{student.name}</p>
                        <p className="text-sm md:text-base text-[#626262] dark:text-[#A3A3A3]">{student.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center text-sm font-medium text-[#626262] dark:text-[#A3A3A3]">
                    {student.id}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-[14px] text-[#333333] dark:text-white">{student.course}</div>
                    {student.courseSubtitle && (
                      <div className="text-[14px] text-[#767676] dark:text-[#A3A3A3] mt-1">{student.courseSubtitle}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <StatusBadge status={student.status} />
                  </td>
                  <td className="px-6 py-4 text-center text-sm font-semibold text-[#222222] dark:text-[#A3A3A3]">
                    {student.attendance}
                  </td>
                  <td className="px-6 py-4 text-center relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveActionMenu(activeActionMenu === student.id ? null : student.id);
                      }}
                      className="p-1 text-[#626262] hover:bg-gray-100 dark:hover:bg-[#333] rounded-lg transition-colors cursor-pointer"
                    >
                      <MoreVertical size={20} />
                    </button>

                    {activeActionMenu === student.id && (
                      <div
                        ref={menuRef}
                        onClick={(e) => e.stopPropagation()}
                        className="absolute top-[80%] right-10 w-[200px] bg-white dark:bg-[#2A2A2A] shadow-xl rounded-xl border border-[#F2EEF4] dark:border-[#3B3B3B] z-50 animate-in fade-in zoom-in-95 duration-200 overflow-hidden"
                      >
                        <div className="px-4 py-3 border-b border-[#F2EEF4] dark:border-[#3B3B3B]">
                          <p className="text-sm font-semibold text-[#333333] dark:text-white text-left">Student Action</p>
                        </div>
                        <div className="p-2 space-y-1">
                          <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-[#626262] dark:text-[#A3A3A3] hover:text-[#333333] dark:hover:text-white hover:bg-gray-50 dark:hover:bg-[#333] rounded-lg transition-colors text-left cursor-pointer">
                            <Mail size={16} />
                            Send Mail
                          </button>
                          <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-[#626262] dark:text-[#A3A3A3] hover:text-[#333333] dark:hover:text-white hover:bg-gray-50 dark:hover:bg-[#333] rounded-lg transition-colors text-left cursor-pointer">
                            <FileText size={16} />
                            Export Report
                          </button>
                          <button
                            onClick={() => navigate(`/admin/users/students/${student.id}`)}
                            className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-[#626262] dark:text-[#A3A3A3] hover:text-[#333333] dark:hover:text-white hover:bg-gray-50 dark:hover:bg-[#333] rounded-lg transition-colors text-left cursor-pointer"
                          >
                            <Users size={16} />
                            View Full Profile
                          </button>
                        </div>
                        <div className="border-t border-[#F2EEF4] dark:border-[#3B3B3B] p-2">
                          <button
                            onClick={() => { setStudentToDelete(student); setActiveActionMenu(null); }}
                            className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-[#FF5A5F] hover:bg-[#FF5A5F]/10 rounded-lg transition-colors cursor-pointer"
                          >
                            <Trash2 size={16} />
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="py-6 px-6 border-t border-[#F2EEF4] dark:border-[#3B3B3B] flex items-center justify-between">
          <p className="text-sm text-[#626262] dark:text-[#A3A3A3]">
            Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredAndSortedData.length)} of {filteredAndSortedData.length} students
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 border border-[#F2EEF4] dark:border-[#3B3B3B] rounded-lg hover:bg-gray-50 dark:hover:bg-[#333] disabled:opacity-50 transition-colors cursor-pointer"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 rounded-lg text-sm font-medium transition-all cursor-pointer ${currentPage === page ? 'bg-[#F67300] text-white' : 'text-[#626262] dark:text-[#A3A3A3] hover:bg-gray-50 dark:hover:bg-[#333]'}`}
                >
                  {page}
                </button>
              ))}
            </div>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 border border-[#F2EEF4] dark:border-[#3B3B3B] rounded-lg hover:bg-gray-50 dark:hover:bg-[#333] disabled:opacity-50 transition-colors cursor-pointer"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      {studentToDelete && (
        <div className="fixed h-full inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">

          <div className="bg-white dark:bg-[#2A2A2A] rounded-2xl p-6 w-full max-w-sm shadow-xl animate-in zoom-in-95 duration-200">
            <h3 className="text-xl font-bold text-[#333333] dark:text-white mb-2">Delete Student?</h3>
            <p className="text-sm text-[#626262] dark:text-[#A3A3A3] mb-6">
              Are you sure you want to remove <span className="font-semibold text-[#333333] dark:text-white">{studentToDelete.name}</span>? This action cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-3">
              <button onClick={() => setStudentToDelete(null)} className="px-4 py-2 rounded-xl text-sm font-medium text-[#626262] dark:text-[#A3A3A3] hover:bg-gray-100 dark:hover:bg-[#3B3B3B] transition-colors cursor-pointer border border-[#F2EEF4] dark:border-[#3B3B3B]">
                Cancel
              </button>
              <button onClick={confirmDelete} className="px-4 py-2 rounded-xl text-sm font-medium text-white bg-[#FF5A5F] hover:bg-[#E0484D] transition-colors cursor-pointer">
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default TableSection;
