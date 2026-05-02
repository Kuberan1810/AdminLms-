import React, { useState, useMemo, useRef } from 'react';
import { SearchNormal1, More, ArrowLeft2, ArrowRight2, DocumentUpload, Sort, CloseCircle } from 'iconsax-react';
import { SortAscIcon } from 'lucide-react';

import { mockStudents } from '../mockData';

const StatusBadge = ({ status }: { status: string }) => {
  const styles: Record<string, string> = {
    Verified: 'bg-[#047C2E]/10 text-[#047C2E] dark:bg-green-500/20 dark:text-green-400',
    Pending: 'bg-[#3111E8]/10 text-[#3111E8] dark:bg-purple-500/20 dark:text-purple-400',
  };

  return (
    <span className={`px-2.5 py-1 rounded-full text-[11px] font-medium ${styles[status] || 'bg-gray-100 text-gray-600'}`}>
      {status}
    </span>
  );
};

const CertificateTableSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortOrder, setSortOrder] = useState<'Newest' | 'Oldest' | 'A-Z' | 'Z-A'>('Newest');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);

  const handleUploadClick = (studentId: string) => {
    setSelectedStudentId(studentId);
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && selectedStudentId) {
      const file = e.target.files[0];
      alert(`Uploading "${file.name}" for Student ID: ${selectedStudentId}`);

      setSelectedStudentId(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const parseDate = (dateStr: string) => {
    const [day, month, year] = dateStr.split('/').map(Number);
    return new Date(year, month - 1, day).getTime();
  };

  const filteredAndSortedData = useMemo(() => {
    let data = [...mockStudents];

    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      data = data.filter(item =>
        item.name.toLowerCase().includes(lowerSearch) ||
        item.id.toLowerCase().includes(lowerSearch) ||
        item.email.toLowerCase().includes(lowerSearch)
      );
    }

    if (statusFilter !== 'All') {
      data = data.filter(item => item.certificateStatus === statusFilter);
    }

    data.sort((a, b) => {
      switch (sortOrder) {
        case 'Newest':
          return parseDate(b.completionDate) - parseDate(a.completionDate);
        case 'Oldest':
          return parseDate(a.completionDate) - parseDate(b.completionDate);
        case 'A-Z':
          return a.name.localeCompare(b.name);
        case 'Z-A':
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });

    return data;
  }, [searchTerm, statusFilter, sortOrder]);

  const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage);
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedData, currentPage]);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, sortOrder]);

  return (
    <div className="space-y-6">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept=".pdf,.doc,.docx,.jpg,.png"
      />
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-[400px]">
          <SearchNormal1 className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} color="currentColor" />
          <input
            type="text"
            placeholder="Search by name, ID or email"
            className="w-full pl-10 pr-10 py-2.5 bg-white dark:bg-[#242424] border border-[#E5E7EB] dark:border-[#3B3B3B] rounded-[12px] text-[14px] focus:outline-none focus:ring-1 focus:ring-[#F67300] focus:border-[#F67300] dark:text-white placeholder:text-gray-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <CloseCircle size={16} />
            </button>
          )}
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto relative">
          <div className="relative">
            <button
              onClick={() => { setIsFilterOpen(!isFilterOpen); setIsSortOpen(false); }}
              className={`flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-[#242424] border rounded-[8px] text-[12px] font-semibold transition-colors cursor-pointer ${statusFilter !== 'All' ? 'border-[#F67300] text-[#F67300]' : 'border-[#D3D3D3] dark:border-[#3B3B3B] text-[#333333] dark:text-gray-300'
                }`}
            >
              <Sort size={16} color="currentColor" />
              {statusFilter === 'All' ? 'Filter' : `Filter: ${statusFilter}`}
            </button>
            {isFilterOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-[#242424] border border-gray-200 dark:border-[#3B3B3B] rounded-xl shadow-xl z-20 py-1 overflow-hidden">
                {['All', 'Verified', 'Pending'].map(status => (
                  <button
                    key={status}
                    onClick={() => { setStatusFilter(status); setIsFilterOpen(false); }}
                    className={`block w-full text-left px-4 py-2.5 text-[13px] transition-colors cursor-pointer ${statusFilter === status ? 'bg-[#F67300]/10 text-[#F67300] font-medium' : 'hover:bg-gray-50 dark:hover:bg-[#2A2A2A] dark:text-gray-300'
                      }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            )}
          </div>


          <div className="relative">
            <button
              onClick={() => { setIsSortOpen(!isSortOpen); setIsFilterOpen(false); }}
              className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-[#242424] border border-[#D3D3D3] dark:border-[#3B3B3B] rounded-[8px] text-[12px] font-semibold text-[#333333] dark:text-gray-300 transition-colors cursor-pointer"
            >
              <SortAscIcon size={16} color="currentColor" />
              Sort: {sortOrder}
            </button>
            {isSortOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-[#242424] border border-gray-200 dark:border-[#3B3B3B] rounded-xl shadow-xl z-20 py-1 overflow-hidden">
                {['Newest', 'Oldest', 'A-Z', 'Z-A'].map(order => (
                  <button
                    key={order}
                    onClick={() => { setSortOrder(order as any); setIsSortOpen(false); }}
                    className={`block w-full text-left px-4 py-2.5 text-[13px] transition-colors cursor-pointer ${sortOrder === order ? 'bg-[#F67300]/10 text-[#F67300] font-medium' : 'hover:bg-gray-50 dark:hover:bg-[#2A2A2A] dark:text-gray-300'
                      }`}
                  >
                    {order}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="boxStyle overflow-hidden mt-6 !p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="dark:border-[#3B3B3B] text-[#222222] dark:text-gray-400 bg-[#FFFBF8] dark:bg-[#2A2A2A]">
                <th className="px-6 py-5 font-medium text-[16px] whitespace-nowrap">Student name</th>
                <th className="px-6 py-5 font-medium text-[16px] whitespace-nowrap">Student Id</th>
                <th className="px-6 py-5 font-medium text-[16px] whitespace-nowrap">Course</th>
                <th className="px-6 py-5 font-medium text-[16px] whitespace-nowrap">Status</th>
                <th className="px-6 py-5 font-medium text-[16px] whitespace-nowrap">Completion date</th>
                <th className="px-6 py-5 font-medium text-[16px] text-center whitespace-nowrap">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-[#3B3B3B]">
              {paginatedData.length > 0 ? (
                paginatedData.map((student, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/50 dark:hover:bg-[#2A2A2A] transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={student.avatar} alt="" className="w-[35px] h-[35px] rounded-full object-cover" />
                        <div>
                          <p className="text-[16px] font-medium text-[#222222] dark:text-white leading-tight">{student.name}</p>
                          <p className="text-[16px] text-[#767676] dark:text-gray-400 mt-0.5">{student.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[16px] text-[#222222] dark:text-gray-400">{student.id}</td>
                    <td className="px-6 py-4">
                      <div className="text-[14px] text-[#333333] dark:text-gray-400 leading-tight">{student.course}</div>
                      {student.courseSubtitle && (
                        <div className="text-[14px] text-[#333333] dark:text-gray-400 mt-1">{student.courseSubtitle}</div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={student.certificateStatus} />
                    </td>
                    <td className="px-6 py-4 text-[16px] text-[#222222] dark:text-gray-400">{student.completionDate}</td>
                    <td className="px-6 py-4 text-center">
                      {student.action === 'Upload' ? (
                        <button
                          onClick={() => handleUploadClick(student.id)}
                          className="flex items-center gap-2 px-3 py-1 text-[#F27121] hover:bg-orange-50 dark:hover:bg-orange-500/10 rounded-lg text-[14px] font-medium transition-colors mx-auto cursor-pointer"
                        >
                          <DocumentUpload size={18} color="currentColor" variant="Bold" />
                          Upload
                        </button>
                      ) : (
                        <button className="p-2 text-[#575757] hover:text-gray-600 dark:hover:text-gray-200 transition-colors mx-auto cursor-pointer">
                          <More size={20} className="rotate-90" color="currentColor" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-gray-500 dark:text-gray-400">
                    No results found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center sm:justify-end gap-2 mt-4 pr-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className={`w-[32px] h-[32px] flex items-center justify-center rounded-[6px] border border-gray-100 dark:border-[#3B3B3B] transition-colors cursor-pointer ${currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-[#333333]'
              }`}
          >
            <ArrowLeft2 size={14} color="currentColor" />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-[32px] h-[32px] flex items-center justify-center rounded-[6px] text-[12px] font-medium transition-colors cursor-pointer ${currentPage === page ? 'bg-[#F67300] text-white' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-[#333333]'
                }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className={`w-[32px] h-[32px] flex items-center justify-center rounded-[6px] border border-gray-100 dark:border-[#3B3B3B] transition-colors cursor-pointer ${currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-[#333333]'
              }`}
          >
            <ArrowRight2 size={14} color="currentColor" />
          </button>
        </div>
      )}
    </div>
  );
};

export default CertificateTableSection