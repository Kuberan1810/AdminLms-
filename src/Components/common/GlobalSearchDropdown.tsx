import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { DocumentText1, Video, MonitorRecorder, ArrowRight2 } from "iconsax-react";

// Student data imports
import { upcomingClasses, coursesData } from "../../Pages/Student/Courses/CourseDetailsData";

// Instructor data imports
import { batchClasses } from "../../Pages/Instructor/dashboard/sections/batchDummyData";

interface GlobalSearchDropdownProps {
    query: string;
    role: 'student' | 'instructor';
    onClose: () => void;
}

export default function GlobalSearchDropdown({ query, role, onClose }: GlobalSearchDropdownProps) {
    const navigate = useNavigate();
    const lowerQuery = query.toLowerCase().trim();

    if (!lowerQuery) return null;

    /* ================= STUDENT SEARCH ================= */
    const studentCourses = Object.values(coursesData).filter((c) =>
        c.course.title.toLowerCase().includes(lowerQuery) ||
        c.course.instructor.name.toLowerCase().includes(lowerQuery)
    );

    const studentCurrentClasses = upcomingClasses.filter((c) =>
        c.title.toLowerCase().includes(lowerQuery) ||
        c.topic.toLowerCase().includes(lowerQuery) ||
        c.instructor.toLowerCase().includes(lowerQuery)
    );

    /* ================= INSTRUCTOR SEARCH ================= */
    const instructorBatches = batchClasses.filter((b) =>
        b.title.toLowerCase().includes(lowerQuery) ||
        b.batch.toLowerCase().includes(lowerQuery)
    );

    // We could add dummy schedules for instructor here, but batchClasses gives a good demo.

    const handleNavigate = (path: string) => {
        navigate(path);
        onClose();
    };

    const hasStudentResults = studentCourses.length > 0 || studentCurrentClasses.length > 0;
    const hasInstructorResults = instructorBatches.length > 0;
    const hasResults = role === 'student' ? hasStudentResults : hasInstructorResults;

    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-[110%] left-0 w-[450px] bg-white rounded-xl shadow-lg border border-[#F2EEF4] z-50 overflow-hidden"
        >
            <div className="max-h-[400px] overflow-y-auto p-2 scrollbar-hide">
                {!hasResults ? (
                    <div className="p-4 text-center text-sm text-[#626262]">
                        No results found for "{query}"
                    </div>
                ) : (
                    <>
                        {/* ================= STUDENT RESULTS ================= */}
                        {role === 'student' && (
                            <>
                                {studentCourses.length > 0 && (
                                    <div className="mb-2">
                                        <h4 className="px-3 py-2 text-xs font-semibold text-[#626262] uppercase tracking-wider">Courses</h4>
                                        {studentCourses.map((course, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => handleNavigate(`/student/courses`)}
                                                className="cursor-pointer w-full text-left px-3 py-2.5 hover:bg-gray-100 rounded-lg flex items-center justify-between group transition-colors"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 bg-[#F6730020] rounded-lg ">
                                                        <DocumentText1 color="#F67300" size={18} />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-800 line-clamp-1">{course.course.title}</p>
                                                        <p className="text-xs text-gray-500">{course.course.instructor.name}</p>
                                                    </div>
                                                </div>
                                                <ArrowRight2 size={16} color="#626262" className="text-[#626262] group-hover:text-orange-500" />
                                            </button>
                                        ))}
                                    </div>
                                )}

                                {studentCurrentClasses.length > 0 && (
                                    <div>
                                        <h4 className="px-3 py-2 text-xs font-semibold text-[#626262] uppercase tracking-wider">Upcoming Classes</h4>
                                        {studentCurrentClasses.map((cls, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => handleNavigate(`/student/courses`)}
                                                className="cursor-pointer w-full text-left px-3 py-2.5 hover:hover:bg-gray-100 rounded-lg flex items-center justify-between group transition-colors"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 bg-[#0095FF20] rounded-lg ">
                                                        <Video color="#0095FF" size={18} />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-800 line-clamp-1">{cls.topic}</p>
                                                        <p className="text-xs text-gray-500">{cls.title} • {cls.date}</p>
                                                    </div>
                                                </div>
                                                <ArrowRight2 size={16} className="text-[#626262] group-hover:text-orange-500" />
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </>
                        )}

                        {/* ================= INSTRUCTOR RESULTS ================= */}
                        {role === 'instructor' && (
                            <>
                                {instructorBatches.length > 0 && (
                                    <div>
                                        <h4 className="px-3 py-2 text-xs font-semibold text-[#626262] uppercase tracking-wider">My Classes & Batches</h4>
                                        {instructorBatches.map((batch, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => handleNavigate(`/instructor/batch-details/${batch.batch}`)}
                                                className="cursor-pointer w-full text-left px-3 py-2.5 hover:bg-gray-100 rounded-lg flex items-center justify-between group transition-colors"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
                                                        <MonitorRecorder color="purple" size={18} />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-800 line-clamp-1">{batch.batch}</p>
                                                        <p className="text-xs text-gray-500">{batch.title}</p>
                                                    </div>
                                                </div>
                                                <ArrowRight2 size={16} className="text-[#626262] group-hover:text-orange-500" />
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </>
                        )}
                    </>
                )}
            </div>
        </motion.div>
    );
}
