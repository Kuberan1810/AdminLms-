import React from 'react';
import { Download } from 'lucide-react';
import pdfIcon from '../../../../../../assets/Images/icon/pdfIcon.svg';
import docIcon from '../../../../../../assets/Images/icon/docIcon.svg';
import wordIcon from '../../../../../../assets/Images/icon/word.svg';
import type { InstructorData } from '../../../../../../data/InstructorMockData';

interface Props {
  instructor: InstructorData;
}

const UploadedContentSection = ({ instructor }: Props) => {
  const contentList = instructor.uploadedContent && instructor.uploadedContent.length > 0
    ? instructor.uploadedContent
    : [
      { title: 'Agents (LangChain, CrewAI, AutoGen).pdf', batch: 'AM101-B01', timeAgo: '10 mins ago', type: 'pdf' },
      { title: 'Theory Analysis Paper (Due 21, Jan 2026)', batch: 'AM101-B04', timeAgo: '10 mins ago', type: 'doc' },
      { title: 'Module 3 Proficiency Test', batch: 'Q1103-B02', timeAgo: '10 mins ago', type: 'test' },
      { title: 'Agents (LangChain, CrewAI, AutoGen).pdf', batch: 'AM101-B01', timeAgo: '10 mins ago', type: 'pdf' },
      { title: 'Agents (LangChain, CrewAI, AutoGen).pdf', batch: 'AM101-B01', timeAgo: '10 mins ago', type: 'pdf' },
    ];

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf': return pdfIcon;
      case 'doc': return wordIcon;
      case 'test': return docIcon;
      default: return docIcon;
    }
  };

  return (
    <div className="boxStyle">
      <div className="flex items-center justify-between mb-6">
        <h2 className="md:text-xl text-lg font-semibold text-[#0B1C30]  dark:text-white">Uploaded Content</h2>
        <button className="text-[12px] font-medium text-[#626262] dark:text-[#A3A3A3] hover:text-[#F67300] hover:underline cursor-pointer" >
          View more
        </button>
      </div>

      <div className="flex flex-col gap-6">
        {contentList.map((file, index) => {
          return (
            <div key={index} className="flex items-center justify-between gap-4 boxStyle p-2.5! rounded-[20px]! hover:bg-gray-50! cursor-pointer group duration-500">
              <div className="flex items-center gap-4">
                <div className="w-[30px] h-[30px] flex items-center justify-center rounded-[8px] shrink-0">
                  <img src={getFileIcon(file.type)} alt={file.type} className="w-full h-full object-contain" />
                </div>
                <div>
                  <p className="text-[14px] md:text-[16px] font-medium text-[#222222] dark:text-white">{file.title}</p>
                  <p className="text-[12px] md:text-[14px] text-[#8C8E90] mt-1">{file.batch}  <span className="ml-1">{file.timeAgo}</span></p>
                </div>
              </div>
              <button className="w-[30px] h-[30px] flex items-center justify-center text-[#626262] border border-[#E5E5E5] group-hover:border-orange-500 rounded-[20px] group-hover:bg-white dark:group-hover:bg-[#3B3B3B] dark:border-[#3B3B3B] shrink-0 cursor-pointer duration-500">
                <Download size={14} className='group-hover:text-orange-500 duration-500'/>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UploadedContentSection;
