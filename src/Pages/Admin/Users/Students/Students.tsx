import React from 'react';
import StatsSection from './sections/StatsSection';
import TableSection from './sections/TableSection';

const Students = () => {
  return (
    <div className="font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        <StatsSection />
        <TableSection />
      </div>
    </div>
  );
};

export default Students;
