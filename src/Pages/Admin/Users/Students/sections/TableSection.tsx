import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MoreVertical, ChevronLeft, ChevronRight, SortDesc } from 'lucide-react';
import { Sort } from 'iconsax-react';

import { mockStudents } from '../mockData';

const StatusBadge = ({ status }: { status: string }) => {
  const styles: Record<string, string> = {
    Active: 'bg-[#047C2E]/10 text-[#047C2E] dark:bg-green-500/10 dark:text-green-400',
    Leave: 'bg-[#F6810C]/10 text-[#F6810C] dark:bg-orange-500/10 dark:text-orange-400',
    Pending: 'bg-[#3111E8]/10 text-[#3111E8] dark:bg-purple-500/10 dark:text-purple-400',
    Dropped: 'bg-[#EA1115]/10 text-[#EA1115] dark:bg-red-500/10 dark:text-red-400',
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles[status] || 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300'}`}>
      {status}
    </span>
  );
};

const TableSection = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortOrder, setSortOrder] = useState<'Newest' | 'Oldest'>('Newest');

  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const itemsPerPage = 8;

  const filteredAndSortedData = useMemo(() => {
    let data = [...mockStudents];

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
      const dateA = new Date(a.dateJoined).getTime();
      const dateB = new Date(b.dateJoined).getTime();
      return sortOrder === 'Newest' ? dateB - dateA : dateA - dateB;
    });

    return data;
  }, [searchTerm, statusFilter, sortOrder]);

  const totalPages = 7;

  const currentData = filteredAndSortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const toggleSort = () => {
    setSortOrder(prev => prev === 'Newest' ? 'Oldest' : 'Newest');
    setCurrentPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const getPaginationGroup = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (currentPage <= 3) {
      return [1, 2, 3, '...', totalPages];
    }
    if (currentPage >= totalPages - 2) {
      return [1, '...', totalPages - 2, totalPages - 1, totalPages];
    }
    return [1, '...', currentPage, '...', totalPages];
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4">
        <div className="relative w-full sm:w-[400px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#888888] dark:text-[#A3A3A3]" size={18} />
          <input
            type="text"
            placeholder="Search by name, ID or email..."
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-[#242424] border border-[#D3D3D3] dark:border-[#3B3B3B] rounded-[12px] text-[14px] text-[#6B7280] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#F67300]/20 focus:border-[#F67300] transition-all placeholder:text-[#888888] dark:placeholder:text-[#A3A3A3]"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto relative">

          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-[#242424] border border-[#D3D3D3] dark:border-[#3B3B3B] rounded-[12px] text-[12px] font-semibold transition-colors cursor-pointer ${statusFilter !== 'All' ? 'text-[#F67300] border-[#F67300] dark:border-[#F67300]' : 'text-[#333333] dark:text-white hover:bg-gray-50 dark:hover:bg-[#333333]'}`}
          >
            <Sort size={16} color='black' />
            {statusFilter === 'All' ? 'Filter' : statusFilter}
          </button>

          {isFilterOpen && (
            <div className="absolute top-12 left-0 w-40 bg-white dark:bg-[#242424] border border-[#D3D3D3] dark:border-[#3B3B3B] shadow-lg rounded-[12px] z-10 py-2">
              {['All', 'Active', 'Leave', 'Pending', 'Dropped'].map((status) => (
                <button
                  key={status}
                  className={`w-full text-left px-4 py-2 text-[12px] font-semibold hover:bg-gray-50 dark:hover:bg-[#333333] transition-colors cursor-pointer ${statusFilter === status ? 'text-[#F67300] font-medium bg-orange-50/50 dark:bg-orange-500/10' : 'text-[#333333] dark:text-[#A3A3A3]'}`}
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
            className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-[#242424] border border-[#D3D3D3] dark:border-[#3B3B3B] rounded-[12px] text-[12px] font-medium text-[#333333] dark:text-white hover:bg-gray-50 dark:hover:bg-[#333333] transition-colors cursor-pointer"
          >
            <SortDesc size={16} color='black' />
            Sort by : {sortOrder}
          </button>


        </div>
      </div>

      <div className="boxStyle overflow-hidden mt-6 min-h-[400px] flex flex-col justify-between !p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#E5E5E5] dark:border-[#3B3B3B] text-[16px] font-medium text-[#222222] dark:text-[#A3A3A3] bg-[#FFFBF8] dark:bg-[#242424]">
                <th className="px-6 py-4 font-normal whitespace-nowrap">Student name</th>
                <th className="px-6 py-4 font-normal whitespace-nowrap">Student Id</th>
                <th className="px-6 py-4 font-normal whitespace-nowrap">Course</th>
                <th className="px-6 py-4 font-normal whitespace-nowrap">Status</th>
                <th className="px-6 py-4 font-normal whitespace-nowrap">Attendance</th>
                <th className="px-6 py-4 font-normal text-center whitespace-nowrap">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F5F5F5] dark:divide-[#3B3B3B]">
              {currentData.length > 0 ? (
                currentData.map((student, idx) => (
                  <tr
                    key={idx}
                    onClick={() => navigate(`/admin/users/students/${student.id}`)}
                    className="hover:bg-gray-50/50 dark:hover:bg-[#2A2A2A] transition-colors group cursor-pointer"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={student.avatar}
                          alt={student.name}
                          className="w-[35px] h-[35px] rounded-full object-covers"
                        />
                        <div>
                          <p className="text-[16px] font-normal text-[#222222] dark:text-white">{student.name}</p>
                          <p className="text-[16px] font-normal text-[#767676] dark:text-[#A3A3A3]">{student.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[16px] text-[#222222] dark:text-[#A3A3A3]">{student.id}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-[14px] text-[#333333] dark:text-white">{student.course}</div>
                      {student.courseSubtitle && (
                        <div className="text-[14px] text-[#333333] dark:text-white mt-1">{student.courseSubtitle}</div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={student.status} />
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
                  <td colSpan={6} className="px-6 py-12 text-center text-[#888888] dark:text-[#A3A3A3] text-sm">
                    No students found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="py-4 flex items-center justify-center sm:justify-end gap-2">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          className="w-[32px] h-[32px] flex items-center justify-center rounded-[8px] border border-[#E5E5E5] dark:border-[#3B3B3B] text-[#888888] dark:text-[#A3A3A3] hover:bg-gray-50 dark:hover:bg-[#333333] disabled:opacity-50 disabled:hover:bg-transparent dark:disabled:hover:bg-transparent transition-colors bg-white dark:bg-[#242424] cursor-pointer disabled:cursor-not-allowed"
        >
          <ChevronLeft size={16} strokeWidth={2} />
        </button>

        {getPaginationGroup().map((item, idx) => {
          if (item === '...') {
            return <span key={`ellipsis-${idx}`} className="text-[#888888] dark:text-[#A3A3A3] px-1 text-[14px] tracking-widest flex items-end pb-1">...</span>;
          }
          const page = item as number;
          return (
            <button
              key={`page-${page}`}
              onClick={() => setCurrentPage(page)}
              className={`w-[32px] h-[32px] flex items-center justify-center rounded-[8px] text-[14px] transition-colors cursor-pointer ${currentPage === page
                ? 'bg-[#F67300] text-white font-medium shadow-sm'
                : 'text-[#4F4F4F] dark:text-[#A3A3A3] hover:bg-gray-100 dark:hover:bg-[#333333] font-medium bg-transparent'
                }`}
            >
              {page}
            </button>
          );
        })}

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          className="w-[32px] h-[32px] flex items-center justify-center rounded-[8px] border border-[#E5E5E5] dark:border-[#3B3B3B] text-[#888888] dark:text-[#A3A3A3] hover:bg-gray-50 dark:hover:bg-[#333333] disabled:opacity-50 disabled:hover:bg-transparent dark:disabled:hover:bg-transparent transition-colors bg-white dark:bg-[#242424] cursor-pointer disabled:cursor-not-allowed"
        >
          <ChevronRight size={16} strokeWidth={2} />
        </button>
      </div>
    </div>
  );
};

export default TableSection;
