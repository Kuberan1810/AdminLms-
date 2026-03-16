import React from 'react';
import pdf_img from '../../../../assets/Images/Enrolled_Courses/pdf_img.svg';
import { ImportCurve, FolderCross } from 'iconsax-react';

interface Resource {
    id: number;
    name: string;
    size: string;
}

const ResourcesTabSection: React.FC = () => {
    const resources: Resource[] = [
        // { id: 4, name: 'Agent Architecture 4.pdf', size: '2.4MB' },
        // { id: 3, name: 'Agent Architecture 3.pdf', size: '2.4MB' },
        // { id: 2, name: 'Agent Architecture 2.pdf', size: '2.4MB' },
        // { id: 1, name: 'Agent Architecture 1.pdf', size: '2.4MB' },
    ];

    const handleDownload = (resourceName: string) => {
        // Mock download logic
        const blob = new Blob(['Mock resource content'], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = resourceName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    if (resources.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-10 w-full text-center">
                <div className="w-[64px] h-[64px] bg-[#FFF0EF] dark:bg-[#3D2B20] rounded-full flex items-center justify-center mb-6">
                    <FolderCross size={32} color="#EF7A02" />
                </div>
                <h3 className="text-[#626262] dark:text-[#E0E0E0] text-base font-medium mb-2">No Resources Found</h3>
                <p className="text-[#989898] dark:text-[#A3A3A3] text-sm ">There are no resources available for this class.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4">
            {resources.map((resource) => (
                <div
                    key={resource.id}
                    className="flex items-center justify-between px-1 py-1 bg-white dark:bg-[#1E1E1E] border border-[#F2EEF4] dark:border-[#363636] rounded-[28px]  pr-5 "
                >
                    <div className="flex items-center gap-4">
                        <div className="p-5 bg-[#FFF0EF] dark:bg-[#3D2B20] rounded-[24px] flex items-center justify-center ">
                            <img src={pdf_img} alt="PDF" className="w-[30px]   object-contain" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[#333333] dark:text-white text-[18px] font-medium leading-tight"    >
                                {resource.name}
                            </span>
                            <div className="flex items-center gap-2">
                                <span className="text-[#989898] dark:text-gray-400 text-[14px]"    >
                                    {resource.size}
                                </span>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={() => handleDownload(resource.name)}
                        className="text-[#989898] hover:text-[#EF7A02] transition-colors cursor-pointer"
                    >
                        <ImportCurve className="w-6 h-6" color='#626262' />
                    </button>
                </div>
            ))}
        </div>
    );
};

export default ResourcesTabSection;