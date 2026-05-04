// import React from 'react';
// import { Camera, Zap, UserPlus, UploadCloud } from 'lucide-react';
// import BaseModal from './BaseModal';

// const InstructorModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
//   return (
//     <BaseModal 
//       isOpen={isOpen} 
//       onClose={onClose}
//       title="Add New Instructor"
//       footer={
//         <>
//           <button onClick={onClose} className="text-slate-500 font-bold px-6 py-2 hover:text-slate-700 transition-colors">Cancel</button>
//           <button className="bg-[#F27427] text-white font-bold px-8 py-3 rounded-xl hover:bg-[#d9631e] shadow-lg shadow-orange-100 transition-all">
//             Add Instructor
//           </button>
//         </>
//       }
//     >
//       <div className="space-y-8">
//         {/* Profile Picture Section */}
//         <div className="flex flex-col items-center">
//           <div className="relative group cursor-pointer">
//             <div className="w-24 h-24 rounded-full border-2 border-dashed border-[#CBD5E1] flex items-center justify-center bg-[#F8FAFC] overflow-hidden">
//               <Camera size={32} className="text-slate-300 group-hover:text-slate-400 transition-colors" />
//             </div>
//             <div className="absolute bottom-1 right-1 w-7 h-7 rounded-full bg-[#F27427] text-white flex items-center justify-center border-2 border-white shadow-lg">
//               <Zap size={12} fill="white" />
//             </div>
//           </div>
//           <p className="text-[11px] font-bold text-slate-400 mt-3 uppercase tracking-widest">Profile Picture</p>
//         </div>

//         {/* Personal Information */}
//         <div className="space-y-4">
//           <div className="flex items-center gap-2 text-[#F27427]">
//             <UserPlus size={16} />
//             <h3 className="text-xs font-bold uppercase tracking-[0.2em]">Personal Information</h3>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
//             <InputGroup label="Full Name" placeholder="e.g. Dr. Sarah Jenkins" />
//             <InputGroup label="Email Address" placeholder="sarah.j@institution.edu" type="email" />
//             <InputGroup label="Phone Number" placeholder="" type="tel" />
//             <InputGroup label="Instructor ID" value="INI202061" readOnly className="bg-slate-100 text-slate-400 font-bold" />
//           </div>
//         </div>

//         {/* Professional Details */}
//         <div className="space-y-4">
//           <div className="flex items-center gap-2 text-[#F27427]">
//             <Zap size={16} />
//             <h3 className="text-xs font-bold uppercase tracking-[0.2em]">Professional Details</h3>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
//             <InputGroup label="Qualifications" placeholder="Ph.D, M.Sc in Pedagogy" />
//             <InputGroup label="Experience (Years)" placeholder="5" type="number" />
//           </div>
//         </div>

//         {/* Reusing the attachment component logic */}
//         <div className="space-y-2">
//            <label className="text-[13px] font-bold text-slate-700">Attachments</label>
//            <div className="border-2 border-dashed border-[#E2E8F0] rounded-2xl p-6 flex flex-col items-center justify-center gap-2 bg-[#F8FAFC]/50">
//              <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-[#F27427] border border-slate-100 shadow-sm">
//                 <UploadCloud size={16} />
//              </div>
//              <div className="text-center">
//                 <p className="font-bold text-sm text-[#1E293B]">Click or drag to upload</p>
//                 <p className="text-[10px] text-slate-400 font-medium">PDF, PNG, JPG (Max 10MB)</p>
//              </div>
//            </div>
//         </div>
//       </div>
//     </BaseModal>
//   );
// };

// // Internal Helper Component for Inputs
// const InputGroup = ({ label, className = "", ...props }: any) => (
//   <div className="space-y-1.5">
//     <label className="text-[11px] font-bold text-slate-700 ml-1 uppercase tracking-wider">{label}</label>
//     <input 
//       {...props} 
//       className={`w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-[#F27427] text-sm font-medium transition-all ${className}`} 
//     />
//   </div>
// );

// export default InstructorModal;

import React, { useState, useRef } from 'react';
import { Camera, Zap, UserPlus, UploadCloud, X, Paperclip } from 'lucide-react';
import BaseSlidePanel from './BaseSlidePanel';

const InstructorModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [profileImg, setProfileImg] = useState<string | null>(null);
  const [attachment, setAttachment] = useState<File | null>(null);
  const profileRef = useRef<HTMLInputElement>(null);
  const attachRef = useRef<HTMLInputElement>(null);

  const handleProfileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImg(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <BaseSlidePanel 
      isOpen={isOpen} onClose={onClose} title="Add New Instructor"
      footer={<><button onClick={onClose} className="text-slate-500 font-bold px-6 py-2 cursor-pointer">Cancel</button>
      <button className="bg-[#F27427] text-white font-bold px-8 py-3 rounded-xl shadow-lg cursor-pointer">Add Instructor</button></>}
    >
      <div className="space-y-8">
        {/* Profile Section */}
        <div className="flex flex-col items-center">
          <input type="file" ref={profileRef} onChange={handleProfileUpload} accept="image/*" className="hidden" />
          <div onClick={() => profileRef.current?.click()} className="relative group cursor-pointer">
            <div className="w-24 h-24 rounded-full border-2 border-dashed border-[#CBD5E1] flex items-center justify-center bg-[#F8FAFC] overflow-hidden">
              {profileImg ? <img src={profileImg} className="w-full h-full object-cover" /> : <Camera size={32} className="text-slate-300" />}
            </div>
            <div className="absolute bottom-1 right-1 w-7 h-7 rounded-full bg-[#F27427] text-white flex items-center justify-center border-2 border-white shadow-lg"><Zap size={12} fill="white" /></div>
          </div>
          <p className="text-[11px] font-bold text-slate-400 mt-3 uppercase tracking-widest">Profile Picture</p>
        </div>

        {/* ... Personal Information & Professional Details sections stay exactly as before ... */}

        {/* Personal Information */}
         <div className="space-y-4">
          <div className="flex items-center gap-2 text-[#F27427]">
             <UserPlus size={16} />
             <h3 className="text-xs font-bold uppercase tracking-[0.2em]">Personal Information</h3>
           </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
             <InputGroup label="Full Name" placeholder="e.g. Dr. Sarah Jenkins" />
             <InputGroup label="Email Address" placeholder="sarah.j@institution.edu" type="email" />
             <InputGroup label="Phone Number" placeholder="" type="tel" />
             <InputGroup label="Instructor ID" value="INI202061" readOnly className="bg-slate-100 text-slate-400 font-bold" />
           </div>
       </div>

         {/* Professional Details */}
         <div className="space-y-4">
           <div className="flex items-center gap-2 text-[#F27427]">
             <Zap size={16} />
             <h3 className="text-xs font-bold uppercase tracking-[0.2em]">Professional Details</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
             <InputGroup label="Qualifications" placeholder="Ph.D, M.Sc in Pedagogy" />
             <InputGroup label="Experience (Years)" placeholder="5" type="number" />
           </div>
        </div>

        {/* Attachment Section */}
        <div className="space-y-2">
           <label className="text-[13px] font-bold text-slate-700 uppercase tracking-wider">Attachments</label>
           <input type="file" ref={attachRef} onChange={(e) => e.target.files && setAttachment(e.target.files[0])} className="hidden" />
           <div 
             onClick={() => attachRef.current?.click()}
             onDragOver={(e) => e.preventDefault()}
             onDrop={(e) => { e.preventDefault(); if (e.dataTransfer.files[0]) setAttachment(e.dataTransfer.files[0]); }}
             className="border-2 border-dashed border-[#E2E8F0] rounded-2xl p-6 flex flex-col items-center justify-center gap-2 bg-[#F8FAFC]/50 cursor-pointer"
           >
             {attachment ? (
               <div className="flex items-center gap-2 text-[#F27427] font-bold text-sm">
                 <Paperclip size={16} /> {attachment.name}
               </div>
             ) : (
               <>
                 <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-[#F27427] border border-slate-100 shadow-sm"><UploadCloud size={16} /></div>
                 <div className="text-center">
                    <p className="font-bold text-sm text-[#1E293B]">Click or drag to upload</p>
                    <p className="text-[10px] text-slate-400 font-medium tracking-wide">PDF, PNG, JPG (Max 10MB)</p>
                 </div>
               </>
             )}
           </div>
        </div>
      </div>
    </BaseSlidePanel>
  );
};

const InputGroup = ({ label, className = "", ...props }: any) => (
  <div className="space-y-1.5">
    <label className="text-[11px] font-bold text-slate-700 ml-1 uppercase tracking-wider">{label}</label>
    <input 
      {...props} 
      className={`w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-[#F27427] text-sm font-medium transition-all ${className}`} 
    />
   </div>
 );

export default InstructorModal;