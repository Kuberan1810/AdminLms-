import React from "react";
import { useNavigate } from "react-router-dom";
import ResourceCard from "./AssignmentResousesCard";
import type { Resource } from "../../data/AssignmentData";
import { CalendarRemove } from 'iconsax-react';

interface AssignmentResourcesProps {
  resources: Resource[];
  assignmentId?: number;
}

const AssignmentResources: React.FC<AssignmentResourcesProps> = ({ resources, assignmentId }) => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!assignmentId) return;
    navigate(`/student/assignment/${assignmentId}/submit`);
  };

  return (
    <div className="w-full ">
      <div className="boxStyle">
        <h2 className="md:text-2xl text-xl  font-medium text-[#333333] dark:text-white md:mb-5 mb-2">
          Assignment Resources
        </h2>

        <div className="flex flex-col justify-between gap-10">
          {/* Resource List */}
          <div className="flex-1">
            {resources.length > 0 ? (
              <div className="flex flex-col gap-5 ">
                {resources.map((resource) => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-10  rounded-3xl ">
                <div className="w-16 h-16 bg-orange-50 dark:bg-orange-900/20 rounded-full flex items-center justify-center mb-4">
                  <CalendarRemove size="32" variant="Outline" color="#F67300" className="text-[#F67300]" />
                </div>
                <h3 className="text-lg font-semibold text-[#333] dark:text-white mb-1">No Resources Found</h3>
                <p className="text-[#626262] dark:text-gray-400 text-sm">There are no resources available for this assignment.</p>
              </div>
            )}
          </div>

          {/* Submit Section */}
          <div className="flex items-start md:items-end justify-end">
            <button
              onClick={handleSubmit}
              className="px-8 py-3 rounded-2xl bg-[#F67300] text-white font-medium text-sm  transition-all duration-300 md:w-fit w-full cursor-pointer hover:bg-[#ff9232]"
            >
              Submit Assignment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignmentResources;