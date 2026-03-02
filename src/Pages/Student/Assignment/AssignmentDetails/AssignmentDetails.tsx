
import { useParams } from 'react-router-dom';
import AssignmentResourses from './section/AssignmentResourses';
import AssignmentDesc from './section/AssignmentDesc';
import { getAssignmentById } from '../data/AssignmentData';

const AssignmentDetails = () => {
    const { assignmentId } = useParams<{ assignmentId: string }>();
    const assignment = assignmentId ? getAssignmentById(Number(assignmentId)) : undefined;

    if (!assignment) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <h2 className="text-2xl font-semibold text-[#333] mb-2">Assignment Not Found</h2>
                <p className="text-[#626262] text-sm">The assignment you're looking for doesn't exist.</p>
            </div>
        );
    }

    return (
        <div className='sm:mb-0 mb-10'>
            <AssignmentDesc assignment={assignment} />
            <AssignmentResourses resources={assignment.resources} />
        </div>
    );
};

export default AssignmentDetails;