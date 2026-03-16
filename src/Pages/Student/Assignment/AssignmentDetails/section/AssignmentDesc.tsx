
import React from 'react';
import AssignmentHeader from './AssignmentHeader';
import type { Assignment } from '../../data/AssignmentData';

interface AssignmentDescProps {
  assignment: Assignment;
}

const AssignmentDesc: React.FC<AssignmentDescProps> = ({ assignment }) => {
  return (
    <div className="w-full">
      <div className="boxStyle mb-5 ">

        {/* Header */}
        <div className='mb-10'>
          <AssignmentHeader
            title={assignment.title}
            status={assignment.status}
            deadline={assignment.deadline}
            courseCode={assignment.course}
          />
        </div>

        {/* Content Sections */}
        <div className="space-y-10 ">
          <section>
            <h2 className="md:text-2xl text-lg  font-medium text-[#333333] dark:text-gray-300 md:mb-5 mb-2">Description:</h2>
            <p className="text-[#4D4D4D] md:text-[18px] text-[15px] dark:text-gray-200 leading-[1.6] font-normal ">
              {assignment.description}
            </p>
          </section>

          <section>
            <h2 className="md:text-2xl text-lg  font-medium text-[#333333] dark:text-gray-300 md:mb-5 mb-2">Objective:</h2>
            <p className="text-[#4D4D4D] md:text-[18px] text-[15px] dark:text-gray-200 leading-[1.6] font-normal">
              {assignment.objective}
            </p>
          </section>

          <section>
            <h2 className="md:text-2xl text-lg font-medium text-[#333333] dark:text-gray-300 md:mb-5 mb-2">Expected Outcome:</h2>
            <p className="text-[#4D4D4D] md:text-[18px] text-[15px] dark:text-gray-200 leading-[1.6] font-normal">
              {assignment.expectedOutcome}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AssignmentDesc;