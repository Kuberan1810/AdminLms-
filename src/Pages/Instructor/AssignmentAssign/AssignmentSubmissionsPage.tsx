import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import InstructorDashboardLayout from "../../../Components/instructor/InstructorDashboardLayout";
import ReviewSubmissionModal from '../../../Components/instructor/ReviewSubmissionModal';
import { getAssignmentSubmissions, gradeSubmission } from '../../../services/assignmentService';
import type { SubmissionsListResponse, SubmissionStudent, SubmissionResponse } from '../../../services/assignmentService';
import { Filter, Sort } from 'iconsax-react';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';

const BASE_URL = "https://lms-backend-apis.onrender.com";

const formatDate = (dateString: string | null) => {
    if (!dateString) return "—";
    const d = new Date(dateString);
    return d.toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })
        + ", "
        + d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });
};

const getStatusBadge = (status: string) => {
    const s = status?.toLowerCase() || '';
    if (s === 'submitted late') {
        return (
            <span className="inline-flex items-center justify-center px-3 py-1 bg-[#F6730015] dark:bg-orange-900/20 text-[#F67300] dark:text-orange-400 rounded-full text-sm font-semibold border border-transparent dark:border-orange-900/30 transition-colors">
                Submitted Late
            </span>
        );
    } else if (s === 'submitted' || s === 'graded') {
        return (
            <span className="inline-flex items-center justify-center px-3 py-1 bg-[#2A9A4615] dark:bg-emerald-900/20 text-[#2A9A46]! dark:text-emerald-400 rounded-full text-sm  font-semibold border border-transparent dark:border-emerald-900/30 transition-colors">
                {s === 'graded' ? 'Graded' : 'Submitted'}
            </span>
        );
    } else if (s === 'not submitted' || s === 'not_submitted' || s === 'pending') {
        return (
            <span className="inline-flex items-center justify-center px-3 py-1 bg-[#F32D2D15] dark:bg-red-900/20 text-[#F32D2D] dark:text-red-400 rounded-full text-sm font-semibold border border-transparent dark:border-red-900/30 transition-colors">
                Not Submitted
            </span>
        );
    }
    return (
        <span className="inline-flex items-center justify-center px-3 py-1 bg-[#F6730015] dark:bg-orange-900/20 text-[#F67300] dark:text-orange-400 rounded-full text-sm  font-semibold border border-transparent dark:border-orange-900 transition-colors">
            {status || "Not Submitted"}
        </span>
    );
};

const AssignmentSubmissionsPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { assignmentSlug } = useParams<{ assignmentSlug: string }>();
    const state = location.state || {};

    const assignmentId = state.assignmentId || state.id;

    const [data, setData] = useState<SubmissionsListResponse | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const [isReviewLoading, setIsReviewLoading] = useState(false);
    const [selectedSubmission, setSelectedSubmission] = useState<SubmissionResponse | null>(null);
    const [selectedStudentStatus, setSelectedStudentStatus] = useState<string>('');

    const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
    const [sortBy, setSortBy] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;
    
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isSortOpen, setIsSortOpen] = useState(false);
    const filterRef = useRef<HTMLDivElement>(null);
    const sortRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (filterRef.current && !filterRef.current.contains(e.target as Node)) setIsFilterOpen(false);
            if (sortRef.current && !sortRef.current.contains(e.target as Node)) setIsSortOpen(false);
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        if (!assignmentId) return;
        setIsLoading(true);
        setError(null);
        getAssignmentSubmissions(assignmentId)
            .then(setData)
            .catch(() => setError("Failed to load submissions. Please try again."))
            .finally(() => setIsLoading(false));
    }, [assignmentId]);

    const toggleFilter = (status: string) => {
        setSelectedFilters(prev =>
            prev.includes(status) ? prev.filter(s => s !== status) : [...prev, status]
        );
    };

    const students: SubmissionStudent[] = data?.students || [];

    const filtered = students
        .filter(s => selectedFilters.length === 0 || selectedFilters.some(f => f.toLowerCase() === s.status?.toLowerCase()))
        .filter(s => {
            if (!searchQuery) return true;
            const query = searchQuery.toLowerCase();
            return (s.student_name?.toLowerCase().includes(query) || s.student_id?.toLowerCase().includes(query));
        })
        .sort((a, b) => {
            if (!sortBy) return 0;
            if (sortBy === 'Student Name') return a.student_name.localeCompare(b.student_name);
            if (sortBy === 'Submitted On') {
                if (!a.submitted_at) return 1;
                if (!b.submitted_at) return -1;
                return new Date(a.submitted_at).getTime() - new Date(b.submitted_at).getTime();
            }
            return 0;
        });

    const totalPages = Math.ceil(filtered.length / rowsPerPage);
    const paginatedData = filtered.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, selectedFilters]);

    const handleReview = async (student: SubmissionStudent) => {
        setIsReviewModalOpen(true);
        setIsReviewLoading(true);
        setSelectedStudentStatus(student.status || 'Not Submitted');

        // Render modal immediately with available info
        setSelectedSubmission({
            id: student.submission_id || 0,
            assignment_id: Number(assignmentId),
            student_id: student.student_id || "",
            student_name: student.student_name || "Student",
            submitted_at: student.submitted_at || "",
            grade: student.grade || null,
            submission_text: student.submission_text || null,
            file_name: student.file_name || null,
            file_path: student.file_path || null,
        });

        setIsReviewLoading(false);
    };

    const handleGradeSubmission = async (grade: string, feedback: string) => {
        if (!selectedSubmission) return;
        try {
            await gradeSubmission(assignmentId, selectedSubmission.id, grade, feedback);
            // Refresh table
            const newData = await getAssignmentSubmissions(assignmentId);
            setData(newData);
            setIsReviewModalOpen(false);
            setSelectedSubmission(null);
        } catch (error) {
            console.error("Failed to submit grade", error);
            throw error;
        }
    };

    // Header info: prefer API data, fallback to nav state
    const title = data?.title || state.title || "—";
    const batchName = data?.batch_name || state.batch || state.batch_name || "—";
    const moduleName = state.module_name || state.moduleInfo || "—";
    const dueDate = state.due_date ? formatDate(state.due_date) : "—";
    const totalEnrolled = data?.total_enrolled ?? "—";
    const totalSubmitted = data?.total_submitted ?? students.length;

    return (
        <InstructorDashboardLayout>
            <div className="flex flex-col h-full ">

                {/* Header Section */}
                <div className="bg-[#FCFCFC] dark:bg-[#1A1A1A] border border-[#EEEEEE] dark:border-[#333] rounded-[20px] p-6 mb-8 flex flex-col md:flex-row justify-between gap-8 md:gap-4 shadow-sm items-center transition-colors">

                    {/* Left: Info Grid */}
                    <div className="flex flex-col gap-3.5 w-full md:w-auto">
                        <div className="flex text-[15px] items-center">
                            <span className="text-[#626262] dark:text-[#A0A0A0] font-medium w-[150px] shrink-0">Assignment</span>
                            <span className="text-[#D3D3D3] dark:text-[#555] mr-3">:</span>
                            <span className="text-[#1A1A1A] dark:text-white font-bold">{title}</span>
                        </div>
                        <div className="flex text-[14px] items-center">
                            <span className="text-[#626262] dark:text-[#A0A0A0] font-medium w-[150px] shrink-0">Module</span>
                            <span className="text-[#D3D3D3] dark:text-[#555] mr-3">:</span>
                            <span className="text-[#333333] dark:text-[#E5E7EB] font-medium">{moduleName}</span>
                        </div>
                        <div className="flex text-[14px] items-center">
                            <span className="text-[#626262] dark:text-[#A0A0A0] font-medium w-[150px] shrink-0">Batch</span>
                            <span className="text-[#D3D3D3] dark:text-[#555] mr-3">:</span>
                            <span className="text-[#333333] dark:text-[#E5E7EB] font-medium">{batchName}</span>
                        </div>
                        <div className="flex text-[14px] items-center">
                            <span className="text-[#626262] dark:text-[#A0A0A0] font-medium w-[150px] shrink-0">Due Date &amp; Time</span>
                            <span className="text-[#D3D3D3] dark:text-[#555] mr-3">:</span>
                            <span className="text-[#333333] dark:text-[#E5E7EB] font-medium">{dueDate}</span>
                        </div>
                        <div className="hidden md:flex text-[14px] items-center">
                            <span className="text-[#626262] dark:text-[#A0A0A0] font-medium w-[150px] shrink-0">Total Submission</span>
                            <span className="text-[#D3D3D3] dark:text-[#555] mr-3">:</span>
                            <span className="text-[#F67300]  font-bold bg-[#FFF5ED] dark:bg-orange-900/50  dark:text-[#Fe7300]! px-3 py-1 rounded-lg transition-colors">
                                {isLoading ? "…" : `${totalSubmitted}/${totalEnrolled}`}
                            </span>
                        </div>
                    </div>
                    {/* Right: Stats Boxes */}
                    <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
                        <div className="bg-white dark:bg-[#222] border border-[#F2EEF4] dark:border-[#333] rounded-2xl px-5 py-4 flex flex-col items-center min-w-[100px] shadow-[0_2px_8px_-4px_rgba(0,0,0,0.05)] transition-colors">
                            <span className="text-2xl font-bold text-[#10B981] dark:text-emerald-400!">
                                {isLoading ? "…" : totalSubmitted}
                            </span>
                            <span className="text-[11px] text-[#10B981] dark:text-emerald-500! mt-1 uppercase tracking-wide">Submitted</span>
                        </div>
                        <div className="bg-white dark:bg-[#222]! border border-[#F2EEF4] dark:border-[#333] rounded-2xl px-5 py-4 flex flex-col items-center min-w-[100px] shadow-[0_2px_8px_-4px_rgba(0,0,0,0.05)] transition-colors">
                            <span className="text-2xl font-bold text-[#333333] dark:text-[#E5E7EB]!">
                                {isLoading ? "…" : totalEnrolled}
                            </span>
                            <span className="text-[11px] text-[#626262] dark:text-[#A0A0A0] mt-1 uppercase tracking-wide">Enrolled</span>
                        </div>
                        <div className="bg-white dark:bg-[#222] border border-[#F2EEF4] dark:border-[#333] rounded-2xl px-5 py-4 flex flex-col items-center min-w-[100px] shadow-[0_2px_8px_-4px_rgba(0,0,0,0.05)] transition-colors">
                            <span className="text-2xl font-bold text-[#F67300] dark:text-orange-400!">
                                {isLoading ? "…" : (typeof totalEnrolled === 'number' && typeof totalSubmitted === 'number' ? totalEnrolled - totalSubmitted : "—")}
                            </span>
                            <span className="text-[11px] text-[#F67300] dark:text-orange-500! mt-1 uppercase tracking-wide">Pending</span>
                        </div>
                    </div>
                </div>

                {/* Skeleton Loader */}
                {isLoading && (
                    <div className="animate-pulse space-y-4">
                        <div className="w-full bg-white dark:bg-[#1A1A1A] rounded-[10px] border border-[#D3D3D3] dark:border-[#333] overflow-hidden transition-colors">
                            <div className="flex justify-end gap-3 p-4 border-b border-gray-100 dark:border-[#333]">
                                <div className="w-20 h-7 bg-gray-100 dark:bg-gray-800 rounded-[4px]" />
                                <div className="w-16 h-7 bg-gray-100 dark:bg-gray-800 rounded-[4px]" />
                            </div>
                            <div className="grid grid-cols-[0.5fr_1fr_2fr_2fr_1.5fr_1fr_1fr] bg-[#FFF5ED] dark:bg-orange-900/10 px-4 py-3 border-b border-[#F67300]/20">
                                {[...Array(7)].map((_, i) => (
                                    <div key={i} className="h-4 bg-orange-100 dark:bg-orange-900/40 rounded-full mx-auto w-16" />
                                ))}
                            </div>
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="grid grid-cols-[0.5fr_1fr_2fr_2fr_1.5fr_1fr_1fr] px-4 py-4 border-b border-gray-50 dark:border-[#333] items-center justify-items-center">
                                    <div className="w-5 h-4 bg-gray-100 dark:bg-gray-800 rounded-full" />
                                    <div className="w-16 h-4 bg-gray-100 dark:bg-gray-800 rounded-full" />
                                    <div className="w-28 h-4 bg-gray-100 dark:bg-gray-800 rounded-full" />
                                    <div className="w-24 h-4 bg-gray-100 dark:bg-gray-800 rounded-full" />
                                    <div className="w-20 h-6 bg-gray-100 dark:bg-gray-800 rounded-full" />
                                    <div className="w-10 h-4 bg-gray-100 dark:bg-gray-800 rounded-full" />
                                    <div className="w-16 h-7 bg-orange-50 dark:bg-orange-900/20 rounded-full" />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                {error && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-2xl mb-4">
                        <p className="text-sm text-red-600">{error}</p>
                    </div>
                )}

               <div className='pb-20'>
                 {!isLoading && !error && (
                    <div className="w-full bg-white dark:bg-[#1A1A1A] rounded-[10px] border border-[#D3D3D3] dark:border-[#333] flex flex-col transition-colors ">

                        {/* Top Controls */}
                        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-5 border-b border-gray-100 dark:border-[#333]">
                            {/* Search */}
                            <div className="relative w-full sm:w-[320px]">
                                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-[#A0A0A0]" />
                                <input
                                    type="text"
                                    placeholder="Search by student name or ID..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-[#333] rounded-lg text-sm text-[#1A1A1A] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#F67300]/20 focus:border-[#F67300] transition-colors"
                                />
                            </div>

                            {/* Filters & Sort */}
                            <div className="flex gap-3 self-end sm:self-auto w-full sm:w-auto">
                                <div className="relative" ref={filterRef}>
                                    <button
                                        onClick={() => { setIsFilterOpen(!isFilterOpen); setIsSortOpen(false); }}
                                        className="cursor-pointer flex items-center gap-2 px-4 py-2 border border-[#E5E7EB] dark:border-[#444] rounded-lg bg-white dark:bg-[#222] text-[#626262] dark:text-[#A0A0A0] text-sm font-medium hover:bg-gray-50 dark:hover:bg-[#333] transition-colors"
                                    >
                                        <Filter size={16} color='currentColor' className="text-[#626262] dark:text-[#A0A0A0]" />
                                        <span>Filter{selectedFilters.length > 0 ? ` (${selectedFilters.length})` : ''}</span>
                                    </button>
                                    {isFilterOpen && (
                                        <div className="absolute right-0 top-full mt-2 w-[180px] bg-white dark:bg-[#222] rounded-[12px] shadow-[0px_4px_24px_rgba(0,0,0,0.08)] border border-gray-100 dark:border-[#444] z-50 p-4 transition-colors">
                                            <h4 className="text-sm font-semibold text-[#1A1A1A] dark:text-white border-b border-[#E5E7EB] dark:border-[#444] pb-2 mb-2">Filter by Status</h4>
                                            <div className="flex flex-col gap-3">
                                                {['submitted', 'not_submitted', 'pending'].map(s => (
                                                    <div key={s} onClick={() => toggleFilter(s)} className="flex items-center gap-2 cursor-pointer">
                                                        <span className={`text-sm capitalize font-medium ${selectedFilters.includes(s) ? 'text-[#F67300] dark:text-orange-400' : 'text-[#333333] dark:text-[#D1D5DB]'}`}>
                                                            {s.replace('_', ' ')}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="relative" ref={sortRef}>
                                    <button
                                        onClick={() => { setIsSortOpen(!isSortOpen); setIsFilterOpen(false); }}
                                        className="cursor-pointer flex items-center gap-2 px-4 py-2 border border-[#E5E7EB] dark:border-[#444] rounded-lg bg-white dark:bg-[#222] text-[#626262] dark:text-[#A0A0A0] text-sm font-medium hover:bg-gray-50 dark:hover:bg-[#333] transition-colors"
                                    >
                                        <Sort size={16} color='currentColor' className="text-[#626262] dark:text-[#A0A0A0]" />
                                        <span>Sort{sortBy ? `: ${sortBy}` : ''}</span>
                                    </button>
                                    {isSortOpen && (
                                        <div className="absolute right-0 top-full mt-2 w-[180px] bg-white dark:bg-[#222] rounded-[12px] shadow-[0px_4px_24px_rgba(0,0,0,0.08)] border border-gray-100 dark:border-[#444] z-50 p-4 transition-colors">
                                            <h4 className="text-sm font-semibold text-[#1A1A1A] dark:text-white border-b border-[#E5E7EB] dark:border-[#444] pb-2 mb-2">Sort by</h4>
                                            <div className="flex flex-col gap-3">
                                                {['Student Name', 'Submitted On'].map(option => (
                                                    <div key={option} onClick={() => { setSortBy(option); setIsSortOpen(false); }} className="flex items-center gap-2 cursor-pointer">
                                                        <span className={`text-sm font-medium ${sortBy === option ? 'text-[#F67300] dark:text-orange-400' : 'text-[#333333] dark:text-[#D1D5DB]'}`}>{option}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Table Container wrapping sticky header */}
                        <div className="overflow-x-auto">
                            <div className="min-w-[1000px]">
                                {/* Table Header */}
                                <div className="sticky top-0 z-10 grid grid-cols-[0.5fr_1fr_2.5fr_2fr_1.5fr_1fr_1fr] bg-[#FFF5ED] dark:bg-[#111] px-6 py-4 border-b border-[#F67300]/20 dark:border-[#333] items-center justify-items-start text-left transition-colors">
                                    <span className="text-[13px] uppercase font-extrabold tracking-wider text-[#f67300] dark:text-orange-500">S.No</span>
                                    <span className="text-[13px] uppercase font-extrabold tracking-wider text-[#f67300] dark:text-orange-500">Student ID</span>
                                    <span className="text-[13px] uppercase font-extrabold tracking-wider text-[#f67300] dark:text-orange-500">Student Name</span>
                                    <span className="text-[13px] uppercase font-extrabold tracking-wider text-[#f67300] dark:text-orange-500">Submitted On</span>
                                    <span className="text-[13px] uppercase font-extrabold tracking-wider text-[#f67300] dark:text-orange-500">Status</span>
                                    <span className="text-[13px] uppercase font-extrabold tracking-wider text-[#f67300] dark:text-orange-500 justify-self-center">Grade</span>
                                    <span className="text-[13px] uppercase font-extrabold tracking-wider text-[#f67300] dark:text-orange-500 justify-self-center">Action</span>
                                </div>

                                {/* Table Rows */}
                                {paginatedData.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center py-20 text-center">
                                        <div className="w-16 h-16 bg-orange-50 dark:bg-orange-900/20 rounded-full flex items-center justify-center mb-4 transition-colors">
                                            <Search size={28} className="text-[#F67300] dark:text-orange-400" />
                                        </div>
                                        <p className="text-[#1A1A1A] dark:text-[#E5E7EB] font-bold text-lg mb-1 ">No Submissions Found</p>
                                        <p className="text-sm text-[#626262] dark:text-[#9CA3AF]">Zero records matched your search or filters.</p>
                                    </div>
                                ) : (
                                    paginatedData.map((student, index) => (
                                        <div
                                            key={`${student.student_id}-${index}`}
                                            className="grid grid-cols-[0.5fr_1fr_2.5fr_2fr_1.5fr_1fr_1fr] px-6 py-4 border-b border-gray-50 dark:border-[#333] odd:bg-transparent even:bg-[#FAFAFA] dark:even:bg-[#1A1A1A] hover:bg-gray-50 dark:hover:bg-[#222] transition-colors items-center justify-items-start text-left group"
                                        >
                                            <span className="text-[15px] font-semibold text-[#888] dark:text-[#A0A0A0]">{(currentPage - 1) * rowsPerPage + index + 1}</span>
                                            <span className="text-[15px] font-medium text-[#333] dark:text-[#D1D5DB]">{student.student_id}</span>
                                            <span className="text-[15px] font-semibold text-[#333] dark:text-white truncate max-w-[200px]">{student.student_name}</span>
                                            <span className="text-[15px] font-medium text-[#626262] dark:text-[#A0A0A0]">{formatDate(student.submitted_at)}</span>
                                            <div className="w-full">{getStatusBadge(student.status)}</div>
                                            <span className="text-[15px] font-bold text-[#1A1A1A] dark:text-white justify-self-center">{student.grade ?? "—"}</span>
                                            <div className="flex justify-center justify-self-center w-full">
                                                <button
                                                    onClick={() => handleReview(student)}
                                                    className={`flex items-center justify-center gap-1.5 px-4 py-2 rounded-full text-[13px] font-bold transition-all w-[100px] cursor-pointer ${
                                                        student.grade || student.status?.toLowerCase() === 'graded' 
                                                        ? 'bg-[#F67300] hover:bg-[#D96500] text-white '
                                                        : 'bg-white dark:bg-[#1A1A1A] border border-[#F67300] text-[#F67300] hover:bg-[#FFF5ED] dark:hover:bg-orange-900/20'
                                                    }`}
                                                >
                                                    {student.grade || student.status?.toLowerCase() === 'graded' ? (
                                                        'View'
                                                    ) : (
                                                        'Review'
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                        {/* Pagination */}
                        {totalPages > 0 && (
                            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 dark:border-[#333] bg-[#FCFCFC] dark:bg-[#111] rounded-b-[10px]">
                                <span className="text-[13px] font-medium text-[#626262] dark:text-[#A0A0A0]">
                                    Showing <span className="text-[#1A1A1A] dark:text-white font-bold">{(currentPage - 1) * rowsPerPage + 1}</span> to <span className="text-[#1A1A1A] dark:text-white font-bold">{Math.min(currentPage * rowsPerPage, filtered.length)}</span> of <span className="text-[#1A1A1A] dark:text-white font-bold">{filtered.length}</span> entries
                                </span>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                        disabled={currentPage === 1}
                                        className="p-1.5 rounded-lg border border-gray-200 dark:border-[#444] text-[#626262] dark:text-[#A0A0A0] hover:bg-gray-100 dark:hover:bg-[#333] disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
                                    >
                                        <ChevronLeft size={18} />
                                    </button>
                                    <div className="flex items-center gap-1">
                                        {[...Array(totalPages)].map((_, i) => (
                                            <button
                                                key={i + 1}
                                                onClick={() => setCurrentPage(i + 1)}
                                                className={`w-8 h-8 flex items-center justify-center rounded-lg text-[13px] font-bold cursor-pointer transition-colors ${
                                                    currentPage === i + 1
                                                        ? 'bg-[#F67300] text-white shadow-md shadow-orange-500/20 dark:shadow-none'
                                                        : 'text-[#626262] dark:text-[#A0A0A0] hover:bg-gray-100 dark:hover:bg-[#333]'
                                                }`}
                                            >
                                                {i + 1}
                                            </button>
                                        ))}
                                    </div>
                                    <button
                                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                        disabled={currentPage === totalPages}
                                        className="p-1.5 rounded-lg border border-gray-200 dark:border-[#444] text-[#626262] dark:text-[#A0A0A0] hover:bg-gray-100 dark:hover:bg-[#333] disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
                                    >
                                        <ChevronRight size={18} />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
               </div>
            </div>

            {/* Review Modal */}
            {selectedSubmission && (
                <ReviewSubmissionModal
                    isOpen={isReviewModalOpen}
                    onClose={() => { setIsReviewModalOpen(false); setSelectedSubmission(null); }}
                    studentName={selectedSubmission.student_name || "Student"}
                    studentId={selectedSubmission.student_id || ""}
                    submittedOn={formatDate(selectedSubmission.submitted_at)}
                    status={selectedStudentStatus}
                    files={selectedSubmission.file_name && selectedSubmission.file_path ? [{
                        name: selectedSubmission.file_name,
                        size: "",
                        url: selectedSubmission.file_path.startsWith("http") ? selectedSubmission.file_path : `${BASE_URL}${selectedSubmission.file_path.replace(/^\//, '')}`
                    }] : []}
                    isLoading={isReviewLoading}
                    onSubmitGrade={handleGradeSubmission}
                    submissionText={selectedSubmission.submission_text}
                />
            )}
        </InstructorDashboardLayout>
    );
};

export default AssignmentSubmissionsPage;
