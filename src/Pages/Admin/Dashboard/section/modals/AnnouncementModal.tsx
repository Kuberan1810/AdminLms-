// import React from 'react';
// import { ChevronDown, UploadCloud } from 'lucide-react';
// import BaseModal from './BaseModal';

// const AnnouncementModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
//   return (
//     <BaseModal 
//       isOpen={isOpen} 
//       onClose={onClose}
//       title="Send Announcement"
//       subtitle="Broadcast a message to your institution's portal"
//       footer={
//         <>
//           <button onClick={onClose} className="text-slate-500 font-bold px-6 py-2 hover:text-slate-700 transition-colors">Cancel</button>
//           <button className="bg-[#F27427] text-white font-bold px-8 py-3 rounded-xl hover:bg-[#d9631e] shadow-lg shadow-orange-100 transition-all">
//             Send Announcement
//           </button>
//         </>
//       }
//     >
//       <div className="space-y-5">
//         <div className="space-y-2">
//           <label className="text-[13px] font-bold text-slate-700">Target Instructor</label>
//           <div className="relative">
//             <select className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-[#F27427] appearance-none text-slate-600 font-medium">
//               <option>All</option>
//             </select>
//             <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
//           </div>
//         </div>

//         <div className="space-y-2">
//           <label className="text-[13px] font-bold text-slate-700">Announcement Title</label>
//           <input type="text" placeholder="e.g. End of Semester Grading Policy" className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-[#F27427] placeholder:text-slate-300 font-medium" />
//         </div>

//         <div className="space-y-2">
//           <label className="text-[13px] font-bold text-slate-700">Message Body</label>
//           <textarea placeholder="Type your message here.." rows={4} className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-[#F27427] placeholder:text-slate-300 font-medium resize-none"></textarea>
//         </div>

//         <div className="space-y-2">
//           <label className="text-[13px] font-bold text-slate-700">Attachments</label>
//           <div className="border-2 border-dashed border-[#E2E8F0] rounded-2xl p-8 flex flex-col items-center justify-center gap-2 bg-[#F8FAFC]/50 hover:bg-[#F8FAFC] transition-colors cursor-pointer group">
//             <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow-sm text-[#F27427] border border-slate-100">
//               <UploadCloud size={20} />
//             </div>
//             <div className="text-center">
//               <p className="font-bold text-[#1E293B]">Click or drag to upload</p>
//               <p className="text-[11px] text-slate-400 font-medium">PDF, PNG, JPG (Max 10MB)</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </BaseModal>
//   );
// };

// export default AnnouncementModal;


import React, { useState, useRef } from 'react';
import { ChevronDown, UploadCloud, Paperclip, X } from 'lucide-react';
import BaseSlidePanel from './BaseSlidePanel';

const AnnouncementModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setFile(e.target.files[0]);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) setFile(e.dataTransfer.files[0]);
  };

  return (
    <BaseSlidePanel 
      isOpen={isOpen} onClose={onClose} title="Send Announcement"
      footer={<><button onClick={onClose} className="text-slate-500 font-bold px-6 py-2 cursor-pointer">Cancel</button>
      <button className="bg-[#F27427] text-white font-bold px-8 py-3 rounded-xl shadow-lg cursor-pointer">Send Announcement</button></>}
    >
      <div className="space-y-5">
        {/* Previous Form Fields remain unchanged... */}
                 <div className="space-y-2">
     <label className="text-[13px] font-bold text-slate-700">Target Instructor</label>
           <div className="relative">
             <select className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-[#F27427] appearance-none text-slate-600 font-medium">
               <option>All</option>
             </select>
             <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
           </div>
         </div>

         <div className="space-y-2">
           <label className="text-[13px] font-bold text-slate-700">Announcement Title</label>
           <input type="text" placeholder="e.g. End of Semester Grading Policy" className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-[#F27427] placeholder:text-slate-300 font-medium" />
         </div>

         <div className="space-y-2">
           <label className="text-[13px] font-bold text-slate-700">Message Body</label>
           <textarea placeholder="Type your message here.." rows={4} className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-[#F27427] placeholder:text-slate-300 font-medium resize-none"></textarea>
         </div>

        <div className="space-y-2">
          <label className="text-[13px] font-bold text-slate-700 uppercase tracking-wider">Attachments</label>
          <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
          <div 
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            className="border-2 border-dashed border-[#E2E8F0] rounded-2xl p-8 flex flex-col items-center justify-center gap-2 bg-[#F8FAFC]/50 hover:bg-[#F8FAFC] transition-colors cursor-pointer group"
          >
            {file ? (
              <div className="flex items-center gap-3 text-[#F27427] font-bold">
                <Paperclip size={20} /> <span>{file.name}</span>
                <X size={16} className="text-slate-400 hover:text-red-500" onClick={(e) => {e.stopPropagation(); setFile(null);}} />
              </div>
            ) : (
              <>
                <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow-sm text-[#F27427] border border-slate-100"><UploadCloud size={20} /></div>
                <div className="text-center">
                  <p className="font-bold text-[#1E293B]">Click or drag to upload</p>
                  <p className="text-[11px] text-slate-400 font-medium">PDF, PNG, JPG (Max 10MB)</p>
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