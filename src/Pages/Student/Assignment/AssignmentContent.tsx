import { useState } from 'react';
import EnrollCourses from './section/EnrollCourses';
import AssignmentList from './section/AssignmentList';

const AssignmentContent = () => {
  // Shared state to track which course is selected for filtering
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-5 md:mb-0  mb-10 ">
      <EnrollCourses 
        selectedCourse={selectedCourse} 
        onCourseSelect={setSelectedCourse} 
      />
      <AssignmentList 
        selectedCourse={selectedCourse} 
      />
    </div>
  );
};

export default AssignmentContent;