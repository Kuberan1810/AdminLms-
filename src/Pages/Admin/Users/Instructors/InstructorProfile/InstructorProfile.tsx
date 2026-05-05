
import React, { useMemo, useState } from 'react';

import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Profile} from 'iconsax-react';
import { instructorMockData } from '../../../../../data/InstructorMockData';
import ProfileHeaderSection from './profileSections/ProfileHeaderSection';
import ContactInfoSection from './profileSections/ContactInfoSection';
import CourseSessionSection from './profileSections/CourseSessionSection';
import AttendanceSection from './profileSections/AttendanceSection';
import UploadedContentSection from './profileSections/UploadedContentSection';
import RecentActivitySection from './profileSections/RecentActivitySection';
import InstructorEditMode from './InstructorEditMode';

const InstructorProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { instructorId } = useParams();
  const navigate = useNavigate();


  const [instructor, setInstructor] = useState(() => {
    return instructorMockData.find(inst => inst.instructorId === instructorId);
  });

  const handleDeactivate = () => {
    if (instructor) {
      setInstructor({ ...instructor, status: 'Deactivated' });
    }
  };


  if (!instructor) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <div className="w-[80px] h-[80px] rounded-full bg-[#FFF5F0] dark:bg-orange-500/10 flex items-center justify-center mb-6">
          <Profile size={36} color='currentColor' className="text-[#F6810C]" variant="Outline" />
        </div>
        <h3 className="text-[20px] font-medium text-[#4B5563] dark:text-[#A3A3A3] mb-2">
          No Instructor Found
        </h3>
        <p className="text-[14px] text-[#9CA3AF] dark:text-[#626262] mb-6">
          We couldn't find the instructor you're looking for right now.
        </p>
        <button 
          onClick={() => navigate('/admin/users/instructors')} 
          className="text-[#F6810C] hover:underline font-medium cursor-pointer"
        >
          Go Back to Instructors
        </button>
      </div>
    );
  }

  return (
    <div className=" pb-4">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Back Button & Header */}
        <div className="flex items-center gap-4 mb-2">
          <button 
            onClick={() => navigate('/admin/users/instructors')}
            className="p-2 bg-white dark:bg-[#2A2A2A] border border-[#F2EEF4] dark:border-[#3B3B3B] rounded-full hover:bg-gray-50 dark:hover:bg-[#333] transition-all cursor-pointer"
          >
            <ArrowLeft size={20} className="text-[#333333] dark:text-white" />
          </button>
          <h2 className="text-[20px] font-semibold text-[#333333] dark:text-white">Instructor Profile</h2>
        </div>

        {isEditing ? (
          <InstructorEditMode 
            instructor={instructor} 
            onCancel={() => setIsEditing(false)} 
          />
        ) : (
          <>

            <ProfileHeaderSection instructor={instructor} onEdit={() => setIsEditing(true)} onDeactivate={handleDeactivate} />


            <div className="flex flex-col lg:flex-row gap-6">
              <div className="w-full flex-1 shrink-0 space-y-6">
                <ContactInfoSection instructor={instructor} />
                <CourseSessionSection instructor={instructor} />
                <AttendanceSection instructor={instructor} />
              </div>

              <div className="flex-1 space-y-6 min-w-0">
                <UploadedContentSection instructor={instructor} />
                <RecentActivitySection instructor={instructor} />
              </div>
            </div>
          </>
        )}

      </div>
    </div>
  );
};

export default InstructorProfile;
