import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import ResourceCard from "./AssignmentResousesCard";
import type { Resource } from "../../data/AssignmentData";

interface AssignmentResourcesProps {
  resources: Resource[];
}

const AssignmentResources: React.FC<AssignmentResourcesProps> = ({ resources }) => {
  const navigate = useNavigate();
  const { assignmentId } = useParams<{ assignmentId: string }>();

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

        <div className="flex flex-col md:flex-row justify-between gap-10">
          {/* Resource List */}
          <div className="flex flex-col gap-5 ">
            {resources.length > 0 ? (
              resources.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))
            ) : (
              <p className="text-[#626262] dark:text-gray-300 text-sm">No resources available for this assignment.</p>
            )}
          </div>

          {/* Submit Section */}
          <div className="flex items-start md:items-end">
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