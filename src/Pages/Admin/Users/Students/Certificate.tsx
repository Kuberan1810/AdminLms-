import React from 'react';

import UploadSection from './certificateSections/UploadSection';
import QueueStatusSection from './certificateSections/QueueStatusSection';
import CertificateTableSection from './certificateSections/CertificateTableSection';

const Certificate = () => {
  return (
    <div className="font-sans space-y-8 max-w-7xl mx-auto">

      <div className="flex flex-col lg:flex-row gap-6">
        <UploadSection />
        <div className="flex-1">
          <QueueStatusSection />
        </div>
      </div>

      <CertificateTableSection />
    </div>
  );
};

export default Certificate;
