import React, { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Search, MoreVertical, ChevronLeft, ChevronRight, Users, TrendingUp, Clock, SortDesc } from 'lucide-react';
import { Sort, ExportCurve, Add } from 'iconsax-react';
import { mockStudents } from '../../Students/mockData';

const CourseBatchDetails = () => {
  const { batchId } = useParams();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortOrder, setSortOrder] = useState<'Newest' | 'Oldest'>('Newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const itemsPerPage = 8;

  const studentsData = useMemo(() => {
    return mockStudents.map((s, idx) => ({
      ...s,
      studentId: `AM-2026-0891`,
      performance: idx % 4 === 0 ? 'A+' : idx % 4 === 1 ? 'A-' : idx % 4 === 2 ? 'B' : 'A',
      status: idx % 3 === 1 ? 'Leave' : 'Active',
    }));
  }, []);

  const getPerformanceStyles = (perf: string) => {
    switch (perf) {
      case 'A+': return 'bg-[#F0FDF4] text-[#15803D] border-[1px] border-[#DCFCE7]';
      case 'A': return 'bg-[#DCFCE7] text-[#15803D] border-[1px] border-[#DCFCE7]';
      case 'A-': return 'bg-[#FFF7ED] text-[#C2410C] border-[1px] border-[#FFF7ED]';
      case 'B': return 'bg-[#F3F4F6] text-[#374151] border-[1px] border-[#F3F4F6]';
      case 'C-': return 'bg-[#FEF2F2] text-[#BA1A1A] border-[1px] border-[#FEF2F2]';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-[#047C2E]/10 text-[#047C2E]';
      case 'Leave': return 'bg-[#F6810C]/10 text-[#F6810C]';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const filteredAndSortedData = useMemo(() => {
    let data = [...studentsData];

    if (searchTerm) {
      const lowerQuery = searchTerm.toLowerCase();
      data = data.filter(s =>
        s.name.toLowerCase().includes(lowerQuery) ||
        s.email.toLowerCase().includes(lowerQuery) ||
        s.studentId.toLowerCase().includes(lowerQuery)
      );
    }

    if (statusFilter !== 'All') {
      data = data.filter(s => s.status === statusFilter);
    }

    if (sortOrder === 'Oldest') {
      data = data.reverse();
    }

    return data;
  }, [searchTerm, statusFilter, sortOrder, studentsData]);

  const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage) || 1;
  const currentData = filteredAndSortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const toggleSort = () => {
    setSortOrder(prev => prev === 'Newest' ? 'Oldest' : 'Newest');
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-[12px] font-normal">
            <span className="text-[#9CA3AF]">Classes</span>
            <span className="text-gray-400">&gt;</span>
            <span className="text-[#EA580C] font-medium">{batchId || 'AM101-B01'}</span>
          </div>
          <h2 className="text-[20px] md:text-[24px] font-medium text-[#222222] dark:text-white">AM101 - AI / ML Frontier AI Engineer</h2>
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2 text-[14px] text-[#2222222] dark:text-[#A3A3A3] font-medium">
              <Users size={16} className="text-[#9CA3AF]" />
              <span className="font-normal text-[#222222] dark:text-white">32</span> Total Students
            </div>
            <div className="flex items-center gap-2 text-[14px] text-[#222222] dark:text-[#A3A3A3] font-medium">
              <TrendingUp size={16} className="text-[#9CA3AF]" />
              <span className="font-normal text-[#222222] dark:text-white">88%</span> Avg. Attendance
            </div>
            <div className="flex items-center gap-2 text-[14px] text-[#222222] dark:text-[#A3A3A3] font-medium">
              <Clock size={16} className="text-[#9CA3AF]" />
              Next Session: <span className="font-normal text-[#222222] dark:text-white">Today, 2:00 PM</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-[16px] py-[8px] bg-white dark:bg-[#242424] border border-[#D3D3D3] dark:border-[#3B3B3B] rounded-[8px] text-[13px] font-medium text-[#333333] dark:text-white hover:bg-gray-50 transition-colors cursor-pointer">
            <ExportCurve size={18} color='black' />
            Export List
          </button>
          <button className="flex items-center gap-2 px-[16px] py-[8px] bg-[#F27121] text-white rounded-[8px] text-[13px] font-bold hover:bg-[#e06900] transition-colors cursor-pointer">
            <Add size={18} color='white' />
            Add Student
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
        <div className="relative w-full sm:w-[400px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#888888] dark:text-[#A3A3A3]" size={18} />
          <input
            type="text"
            placeholder="Search by name, ID or email..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-[#242424] border border-[#D3D3D3] dark:border-[#3B3B3B] rounded-[12px] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#F67300]/20 focus:border-[#F67300] transition-all placeholder:text-[#888888]"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto relative">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-[#242424] border border-[#D3D3D3] dark:border-[#3B3B3B] rounded-[12px] text-[12px] font-semibold transition-colors cursor-pointer ${statusFilter !== 'All' ? 'text-[#F67300] border-[#F67300]' : 'text-[#333333] dark:text-white hover:bg-gray-50'}`}
          >
            <Sort size={16} color="black" />
            {statusFilter === 'All' ? 'Filter' : statusFilter}
          </button>

          {isFilterOpen && (
            <div className="absolute top-12 left-0 w-40 bg-white dark:bg-[#242424] border border-[#D3D3D3] dark:border-[#3B3B3B] shadow-lg rounded-[12px] z-10 py-2">
              {['All', 'Active', 'Leave'].map((status) => (
                <button
                  key={status}
                  className={`w-full text-left px-4 py-2 text-[12px] font-semibold hover:bg-gray-50 dark:hover:bg-[#333333] transition-colors cursor-pointer ${statusFilter === status ? 'text-[#F67300] bg-orange-50/50' : 'text-[#333333] dark:text-[#A3A3A3]'}`}
                  onClick={() => {
                    setStatusFilter(status);
                    setIsFilterOpen(false);
                    setCurrentPage(1);
                  }}
                >
                  {status}
                </button>
              ))}
            </div>
          )}

          <button
            onClick={toggleSort}
            className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-[#242424] border border-[#D3D3D3] dark:border-[#3B3B3B] rounded-[12px] text-[12px] font-medium text-[#333333] dark:text-white hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <SortDesc size={16} color="black" />
            Sort by : {sortOrder}
          </button>
        </div>
      </div>

      <div className="boxStyle !p-0 overflow-hidden mt-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#FFFBF8] dark:bg-[#242424] border-b border-[#E5E5E5] dark:border-[#3B3B3B]">
                <th className="px-6 py-4 text-[16px] font-normal text-[#222222] dark:text-[#A3A3A3]">Student name</th>
                <th className="px-6 py-4 text-[16px] font-normal text-[#222222] dark:text-[#A3A3A3]">Student Id</th>
                <th className="px-6 py-4 text-[16px] font-normal text-[#222222] dark:text-[#A3A3A3]">Performance</th>
                <th className="px-6 py-4 text-[16px] font-normal text-[#222222] dark:text-[#A3A3A3]">Status</th>
                <th className="px-6 py-4 text-[16px] font-normal text-[#222222] dark:text-[#A3A3A3]">Attendance</th>
                <th className="px-6 py-4 text-[16px] font-normal text-center text-[#222222] dark:text-[#A3A3A3]">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F5F5F5] dark:divide-[#3B3B3B]">
              {currentData.length > 0 ? (
                currentData.map((student, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-gray-50/50 dark:hover:bg-[#2A2A2A] transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={student.avatar} alt={student.name} className="w-[35px] h-[35px] rounded-full object-cover" />
                        <div>
                          <p className="text-[16px] font-normal text-[#222222] dark:text-white leading-tight">{student.name}</p>
                          <p className="text-[16px] font-normal text-[#767676] dark:text-[#A3A3A3] mt-1">{student.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[16px] text-[#222222] dark:text-[#A3A3A3]">{student.studentId}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-md text-[12px] font-bold ${getPerformanceStyles(student.performance)}`}>
                        {student.performance}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-[11px] font-bold ${getStatusStyles(student.status)}`}>
                        {student.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[16px] text-[#222222] dark:text-white font-medium">{student.attendance}</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button className="p-2 text-[#575757] dark:text-[#A3A3A3] cursor-pointer">
                        <MoreVertical size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-[#888888] dark:text-[#A3A3A3]">
                    No students found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="py-4 flex items-center justify-end gap-2">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          className="w-[32px] h-[32px] flex items-center justify-center rounded-[8px] border border-[#E5E5E5] dark:border-[#3B3B3B] text-[#888888] dark:text-[#A3A3A3] hover:bg-gray-50 dark:hover:bg-[#333333] transition-colors bg-white dark:bg-[#242424] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft size={16} strokeWidth={2} />
        </button>
        <div className="flex items-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-[32px] h-[32px] flex items-center justify-center rounded-[8px] text-[14px] transition-colors cursor-pointer ${currentPage === page
                ? 'bg-[#F67300] text-white font-medium shadow-sm'
                : 'text-[#4F4F4F] dark:text-[#A3A3A3] hover:bg-gray-100 dark:hover:bg-[#333333] font-medium bg-transparent'
                }`}
            >
              {page}
            </button>
          ))}
        </div>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          className="w-[32px] h-[32px] flex items-center justify-center rounded-[8px] border border-[#E5E5E5] dark:border-[#3B3B3B] text-[#888888] dark:text-[#A3A3A3] hover:bg-gray-50 dark:hover:bg-[#333333] transition-colors bg-white dark:bg-[#242424] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronRight size={16} strokeWidth={2} />
        </button>
      </div>
    </div>


  );
};

export default CourseBatchDetails;

