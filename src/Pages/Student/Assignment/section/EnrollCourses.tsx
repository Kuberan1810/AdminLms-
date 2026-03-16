import React from "react";
import BtnCom from "../../../../Components/Student/BtnCom";
import EnrollCoursesCard from "./EnrollCoursesCard";

interface CourseData {
  id: string;
  code: string;
  title: string;
  completed: number;
  due: number;
  overdue: number;
}

interface EnrollCoursesProps {
  selectedCourse: string | null;
  onCourseSelect: (code: string | null) => void;
}

const courses: CourseData[] = [
  { id: "1", code: "AM101", title: "AI / ML Frontier Ai Engineer", completed: 15, due: 3, overdue: 1 },
  { id: "2", code: "SS102", title: "System and Software System Pro", completed: 15, due: 3, overdue: 1 },
  { id: "3", code: "Q1103", title: "Quantum Intelligence", completed: 15, due: 3, overdue: 1 },
];

const EnrollCourses: React.FC<EnrollCoursesProps> = ({
  selectedCourse,
  onCourseSelect,
}) => {
  return (
    <div className="boxStyle w-full min-w-0  ">

      {/* Header */}
      <div className="flex justify-between items-center md:mb-5 mb-3 ">
        <h2 className="font-semibold md:text-2xl text-gray-800 text-xl dark:text-gray-300">
          My Enrolled Courses
        </h2>
        <BtnCom label="View all" onClick={() => onCourseSelect(null)} />
      </div>

      <div className="grid gap-6 xl:grid-cols-3 md:grid-cols-2 max-md:grid-flow-col max-md:auto-cols-[80vw] max-md:overflow-x-auto max-md:snap-x max-md:snap-mandatory scrollbar-hide p-2">
        {courses.map((course) => (
          <div key={course.id} className="min-w-70 sm:min-w-65">
            <EnrollCoursesCard
              course={course}
              isActive={selectedCourse === course.code}
              onSelect={() =>
                onCourseSelect(selectedCourse === course.code ? null : course.code)
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default EnrollCourses;
