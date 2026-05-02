import React from 'react';
import ProfileHeaderSection from './profileSections/ProfileHeaderSection';
import ContactInfoSection from './profileSections/ContactInfoSection';
import EnrolledCoursesSection from './profileSections/EnrolledCoursesSection';
import AttendanceSection from './profileSections/AttendanceSection';
import TestPerformanceSection from './profileSections/TestPerformanceSection';
import RecentActivitySection from './profileSections/RecentActivitySection';

const StudentProfile = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-6">

      <ProfileHeaderSection />

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-[45%] shrink-0 space-y-6">
          <ContactInfoSection />
          <EnrolledCoursesSection />
          <AttendanceSection />
        </div>

        <div className="flex-1 space-y-6 min-w-0">
          <TestPerformanceSection />
          <RecentActivitySection />
        </div>
      </div>

    </div>
  );
};

export default StudentProfile;
