import { useState, useRef, useEffect } from "react";
import { Filter, Sort } from "iconsax-react";

interface Student {
    id: number | string;
    studentId: string;
    name: string;
    email: string;
    status: string;
    img?: string;
}

interface SubmissionTableProps {
    students: Student[];
    onReview: (student: any) => void;
    showFilters?: boolean;
}

const SubmissionTable = ({ students, onReview, showFilters = true }: SubmissionTableProps) => {
    const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isSortOpen, setIsSortOpen] = useState(false);
    const [sortBy, setSortBy] = useState<string>('');
    const filterRef = useRef<HTMLDivElement>(null);
    const sortRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
                setIsFilterOpen(false);
            }
            if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
                setIsSortOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleFilter = (status: string) => {
        setSelectedFilters(prev =>
            prev.includes(status)
                ? prev.filter(s => s !== status)
                : [...prev, status]
        );
    };

    const getStatusBadge = (status: string) => {
        if (status === 'Submitted Late') {
            return (
                <span className="px-3 py-1 bg-[#FFF5ED] text-[#F67300] rounded-full text-xs font-medium">
                    Submitted Late
                </span>
            );
        } else if (status === 'Submitted') {
            return (
                <span className="px-3 py-1 bg-[#ECFDF5] text-[#10B981] rounded-full text-xs font-medium">
                    Submitted
                </span>
            );
        } else {
            return (
                <span className="px-3 py-1 bg-[#F3F4F6] text-[#9CA3AF] rounded-full text-xs font-medium">
                    Not Submitted
                </span>
            );
        }
    };

    const activeSubmissionData = students.map((s, index) => {
        let status = 'Not Submitted';
        let mark = '---';
        let submittedOn = 'Not Submitted';

        if (index < 4) {
            status = 'Submitted Late';
            submittedOn = '22 Jan , 09:00 AM';
            mark = '';
        } else if (index === 4) {
            status = 'Submitted';
            submittedOn = '20 Jan , 10:45 AM';
            mark = '91%';
        } else if (index >= 5 && index <= 8) {
            status = 'Not Submitted';
            submittedOn = 'Not Submitted';
            mark = '---';
        } else {
            if (index % 2 === 0) {
                status = 'Submitted';
                submittedOn = '20 Jan , 10:45 AM';
                mark = '91%';
            } else {
                status = 'Submitted Late';
                submittedOn = '22 Jan , 09:00 AM';
                mark = '62%';
            }
        }

        return {
            id: s.id,
            studentId: s.studentId,
            name: s.name,
            submittedOn,
            status,
            mark
        };
    }).filter(student => selectedFilters.length === 0 || selectedFilters.includes(student.status))
        .sort((a, b) => {
            if (!sortBy) return 0;
            if (sortBy === 'Student Name') return a.name.localeCompare(b.name);
            if (sortBy === 'Submitted On') {
                if (a.submittedOn === 'Not Submitted') return 1;
                if (b.submittedOn === 'Not Submitted') return -1;
                return new Date(b.submittedOn).getTime() - new Date(a.submittedOn).getTime();
            }
            if (sortBy === 'Mark') {
                const getMarkValue = (markStr: string) => (markStr === '---' || !markStr) ? -1 : parseInt(markStr.replace('%', ''));
                return getMarkValue(b.mark) - getMarkValue(a.mark);
            }
            return 0;
        });

    return (
        <div className="w-full bg-white rounded-[10px] border border-[#D3D3D3]   flex flex-col ">
            {showFilters && (
                <div className="flex justify-end gap-3 p-4 border-b border-gray-100 ">
                    <div className="relative" ref={filterRef}>
                        <button
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                            className="cursor-pointer flex items-center gap-2 px-3 py-1.5 border border-[#E5E7EB] rounded-[4px] bg-white text-[#626262] text-xs font-medium hover:bg-gray-50 transition-colors"
                        >
                            <Filter size={14} color="#626262" />
                            <span>Filter</span>
                        </button>

                        {isFilterOpen && (
                            <div className="absolute right-0 top-full mt-2 w-[180px] bg-white rounded-[12px] shadow-[0px_4px_24px_rgba(0,0,0,0.08)] border border-gray-100 z-50 p-4">
                                <h4 className="text-sm font-normal text-[#1A1A1A] border-b border-[#E5E7EB] pb-2 mb-2">Filter by Status</h4>
                                <div className="flex flex-col gap-3">
                                    {['Submitted', 'Submitted Late', 'Not Submitted'].map(status => (
                                        <div
                                            key={status}
                                            onClick={() => toggleFilter(status)}
                                            className="flex items-center gap-2 cursor-pointer group"
                                        >
                                            <span className={`text-sm transition-colors ${selectedFilters.includes(status) ? 'text-[#F67300]' : 'text-[#333333]'}`}>{status}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="relative" ref={sortRef}>
                        <button
                            onClick={() => setIsSortOpen(!isSortOpen)}
                            className="cursor-pointer flex items-center gap-2 px-3 py-1.5 border border-[#E5E7EB] rounded-[4px] bg-white text-[#626262] text-xs font-medium hover:bg-gray-50 transition-colors"
                        >
                            <Sort size={14} color="#626262" />
                            <span>Sort</span>
                        </button>

                        {isSortOpen && (
                            <div className="absolute right-0 top-full mt-2 w-[180px] bg-white rounded-[12px] shadow-[0px_4px_24px_rgba(0,0,0,0.08)] border border-gray-100 z-50 p-4">
                                <h4 className="text-sm font-normal text-[#1A1A1A] border-b border-[#E5E7EB] pb-2 mb-2">Sort by</h4>
                                <div className="flex flex-col gap-3">
                                    {['Student Name', 'Submitted On', 'Mark'].map((option) => (
                                        <div
                                            key={option}
                                            onClick={() => { setSortBy(option); setIsSortOpen(false); }}
                                            className="flex items-center gap-2 cursor-pointer group"
                                        >
                                            <span className={`text-sm transition-colors ${sortBy === option ? 'text-[#F67300]' : 'text-[#333333]'}`}>
                                                {option}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
            <div className="">
                <div className="grid grid-cols-[0.5fr_1fr_2fr_2fr_1.5fr_1fr_1fr] bg-[#FFF5ED] px-4 py-3  border-b border-[#F67300]/20 items-center justify-items-center text-center">
                    <span className="text-sm font-semibold text-[#F67300]">S.no</span>
                    <span className="text-sm font-semibold text-[#F67300]">Student ID</span>
                    <span className="text-sm font-semibold text-[#F67300]">Student Name</span>
                    <span className="text-sm font-semibold text-[#F67300]">Submitted On</span>
                    <span className="text-sm font-semibold text-[#F67300]">Status</span>
                    <span className="text-sm font-semibold text-[#F67300]">Mark</span>
                    <span className="text-sm font-semibold text-[#F67300]">Action</span>
                </div>

                <div className="">
                    {activeSubmissionData.map((student, index) => (
                        <div
                            key={index}
                            className="grid grid-cols-[0.5fr_1fr_2fr_2fr_1.5fr_1fr_1fr] px-4 py-3 border-b border-gray-50 hover:bg-gray-50 transition-colors items-center justify-items-center text-center "
                        >
                            <span className="text-sm text-[#333333] font-normal">{index + 1}</span>
                            <span className="text-sm text-[#333333] font-normal">{student.studentId}</span>
                            <span className="text-sm text-[#333333] font-normal">{student.name}</span>
                            <span className="text-sm text-[#333333] font-normal">{student.submittedOn}</span>
                            <div className='flex items-center'>
                                {getStatusBadge(student.status)}
                            </div>
                            <span className="text-sm text-[#333333] font-normal">{student.mark}</span>

                            <div className="flex justify-center">
                                {(student.status === 'Submitted' || student.status === 'Submitted Late') && (
                                    <button
                                        onClick={() => onReview(student)}
                                        className="px-3 py-1 bg-[#FFF5ED] text-[#F67300] rounded-full text-xs font-medium hover:bg-[#FFEDD5] transition-colors"
                                    >
                                        Review
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default SubmissionTable;
