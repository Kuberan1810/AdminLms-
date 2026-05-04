import React, { useState, useRef } from 'react';
import { ChevronDown, UploadCloud, Paperclip, X } from 'lucide-react';
import BaseSlidePanel from './BaseSlidePanel';
import { instructorMockData } from '../../../../../data/InstructorMockData';
import { motion, AnimatePresence } from 'framer-motion';

const AnnouncementModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [file, setFile] = useState<File | null>(null);
  const [selectedInstructor, setSelectedInstructor] = useState('All Instructors');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setFile(e.target.files[0]);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) setFile(e.dataTransfer.files[0]);
  };

  return (
    <BaseSlidePanel
      isOpen={isOpen} onClose={onClose} title="Send Announcement" subtitle='Broadcast a message to your institution s portal'
      footer={<><button onClick={onClose} className="flex-1 text-[#626262] border-[#E4E4E4] border rounded-xl hover:bg-gray-50 font-semibold px-8 py-3 cursor-pointer">Cancel</button>
        <button className="bg-[#F27427] text-white font-bold px-8 py-3 rounded-xl  cursor-pointer hover:bg-[#F25500]">Send Announcement</button>

      </>}
    >
      <div className="space-y-5">
        <div className="space-y-2">
          <label className="text-[13px] font-semibold text-[#0B1C30] ">Target Instructor</label>
          <div className="relative mt-3" ref={dropdownRef}>
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full flex items-center justify-between bg-[#F8FAFC] dark:bg-[#2A2A2A] border border-slate-200 dark:border-[#3B3B3B] rounded-xl px-4 py-3.5 outline-none text-slate-600 dark:text-white font-normal transition-all hover:border-[#F27427] cursor-pointer"
            >
              <span>{selectedInstructor}</span>
              <ChevronDown size={20} className={`text-[#626262] transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute z-20 top-full left-0 right-0 mt-2 bg-white dark:bg-[#2A2A2A] border border-slate-200 dark:border-[#3B3B3B] rounded-2xl shadow-xl overflow-hidden max-h-60 overflow-y-auto custom-scrollbar"
                >
                  <div 
                    onClick={() => { setSelectedInstructor('All Instructors'); setIsDropdownOpen(false); }}
                    className="px-4 py-3 hover:bg-orange-50 dark:hover:bg-[#F27427]/10 cursor-pointer transition-colors border-b border-slate-50 dark:border-[#3B3B3B] font-semibold text-[#F27427]"
                  >
                    All Instructors
                  </div>
                  {instructorMockData.map((instructor) => (
                    <div 
                      key={instructor.id}
                      onClick={() => { setSelectedInstructor(instructor.name); setIsDropdownOpen(false); }}
                      className="px-4 py-3 hover:bg-slate-50 dark:hover:bg-[#333] cursor-pointer transition-colors flex items-center gap-3 border-b border-slate-50 dark:border-[#3B3B3B] last:border-0"
                    >
                      <img src={instructor.avatar} alt="" className="w-8 h-8 rounded-full object-cover" />
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-[#1E293B] dark:text-white">{instructor.name}</span>
                        <span className="text-[11px] text-[#626262]">ID: {instructor.instructorId}</span>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[13px] font-semibold text-[#0B1C30]">Announcement Title</label>
          <input type="text" placeholder="e.g. End of Semester Grading Policy" className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-[#F27427] placeholder:text-slate-300 font-light mt-3 placeholder:text-sm" />
        </div>

        <div className="space-y-2">
          <label className="text-[13px] font-semibold text-[#0B1C30]">Message Body</label>
          <textarea placeholder="Type your message here.." rows={4} className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-[#F27427] placeholder:text-slate-300 font-light resize-none mt-3 placeholder:text-sm"></textarea>
        </div>

        <div className="space-y-2">
          <label className="text-[13px] font-semibold text-[#0B1C30] uppercase tracking-wider">Attachments</label>
          <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
          <div
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            className="mt-3 border-2 border-dashed border-[#E2E8F0] rounded-2xl p-8 flex flex-col items-center justify-center gap-2 bg-[#F8FAFC]/50 hover:bg-[#F8FAFC] transition-colors cursor-pointer group"
          >
            {file ? (
              <div className="flex items-center gap-3 text-[#F27427] font-semibold">
                <Paperclip size={20} /> <span>{file.name}</span>
                <X size={16} className="text-[#626262] hover:text-red-500" onClick={(e) => { e.stopPropagation(); setFile(null); }} />
              </div>
            ) : (
              <>
                <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow-sm text-[#F27427] border border-slate-100"><UploadCloud size={20} /></div>
                <div className="text-center">
                  <p className="font-semibold text-[#1E293B]">Click or drag to upload</p>
                  <p className="text-[11px] text-[#626262] font-medium">PDF, PNG, JPG (Max 10MB)</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </BaseSlidePanel>
  );
};

export default AnnouncementModal