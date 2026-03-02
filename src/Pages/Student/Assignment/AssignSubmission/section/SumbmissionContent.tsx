import React from 'react'
import AssignmentHeader from '../../AssignmentDetails/section/AssignmentHeader'
import AssignmentUpload from './AssignmentUpload'

interface AssignmentHeaderProps {
  title?: string;
  status?: string;
  deadline?: string;
  courseCode?: string;
}

const SumbmissionContent: React.FC<AssignmentHeaderProps> = ({
  title = "Build Q&A system using RAG",
  status = "In Progress",
  deadline = "Due Jan 26, 11:59 PM",
  courseCode = "AM101 - AI / ML Frontier Ai Engineer"
}) => {
  return (
    <div className='space-y-5 mb-20'>
      <div className='boxStyle'>
        <AssignmentHeader
          title={title}
          status={status}
          deadline={deadline}
          courseCode={courseCode}
        />
      </div>
      <AssignmentUpload />
    </div>
  )
}

export default SumbmissionContent