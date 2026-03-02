// import React, { useState } from 'react';
// import { Paperclip, Send } from 'lucide-react';
// import { Gallery, DocumentText } from 'iconsax-react';

// const AssignmentComment: React.FC = () => {
//   const [comment, setComment] = useState('');

//   const handleSend = () => {
//     if (comment.trim()) {
//       console.log("Comment Sent:", comment);
//       setComment('');
//     }
//   };

//   return (
//     <div className="w-full max-w-6xl mx-auto p-4 md:p-8 !pt-0">
//       {/* Main Container - Matches Description & Resources standard */}
//       <div className="bg-white border border-gray-100 rounded-[40px] p-8 md:p-10 shadow-sm">
        
//         <h3 className="text-2xl font-medium text-[#333333] mb-6">Comments</h3>

//         {/* Comment Input Box */}
//         <div className="relative border border-gray-100 rounded-[30px] bg-[#F9FAFB] p-4 transition-all focus-within:border-gray-200 focus-within:shadow-sm">
          
//           <textarea
//             className="w-full bg-transparent border-none focus:ring-0 text-[#1A1A1A] text-[15px] placeholder:text-gray-400 resize-none min-h-[100px] px-2 pt-2"
//             placeholder="Write your comment here..."
//             value={comment}
//             onChange={(e) => setComment(e.target.value)}
//           />

//           {/* Bottom Action Row */}
//           <div className="flex justify-between items-center mt-4 px-2">
            
//             {/* Attachment Icons */}
//             <div className="flex items-center gap-4 text-gray-400">
//               <button className="hover:text-[#C23DBE] transition-colors cursor-pointer" title="Attach Image">
//                 <Gallery size="22" variant="Outline" />
//               </button>
//               <button className="hover:text-[#C23DBE] transition-colors cursor-pointer" title="Attach Document">
//                 <DocumentText size="22" variant="Outline" />
//               </button>
//               <button className="hover:text-[#C23DBE] transition-colors cursor-pointer" title="Add Link">
//                 <Paperclip size="20" />
//               </button>
//             </div>

//             {/* Send Button - Orange & White Pattern */}
//             <button
//               onClick={handleSend}
//               className={`flex items-center gap-2 px-8 py-3 bg-[#FF8A00] hover:bg-[#E67C00] text-white font-bold rounded-full transition-all shadow-md shadow-orange-100 cursor-pointer active:scale-95 text-sm ${
//                 !comment.trim() ? 'opacity-90' : 'opacity-100'
//               }`}
//             >
//               <span>Send</span>
//               <Send size="16" fill="white" />
//             </button>
//           </div>
//         </div>

//         {/* Previous Comments Placeholder (Optional) */}
//         <div className="mt-8 border-t border-gray-50 pt-6">
//           <p className="text-xs text-gray-400 font-medium italic">
//             Comments are visible to you and your instructor.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AssignmentComment;

import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { Gallery, DocumentText, Link1 } from 'iconsax-react';

const AssignmentComment: React.FC = () => {
  const [comment, setComment] = useState('');

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-8 !pt-0">
      {/* Unified Card Wrap */}
      <div className="bg-white border border-gray-100 rounded-[40px] p-8 md:p-10 shadow-sm">
        
        <h3 className="text-xl font-semibold text-[#1A1A1A] mb-6">Comments</h3>

        {/* Streamlined Input Container */}
        <div className="relative w-full border border-gray-100 rounded-[32px] bg-[#F9FAFB] p-3 focus-within:bg-white focus-within:border-gray-200 transition-all duration-300">
          
          <div className="flex flex-col gap-2">
            {/* Input Field */}
            <textarea
              className="w-full bg-transparent border-none focus:ring-0 text-[#1A1A1A] text-[14px] placeholder:text-gray-400 resize-none min-h-[60px] px-3 pt-2"
              placeholder="Write your comment here..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />

            {/* Actions Row: Attachment Icons + Send Button */}
            <div className="flex justify-between items-center bg-white rounded-2xl p-2">
              
              {/* Attachment Icons Group */}
              <div className="flex items-center gap-3 pl-2">
                <button className="text-gray-400 hover:text-[#C23DBE] transition-colors cursor-pointer p-1">
                  <Gallery size="20" variant="Outline" color='#626262' />
                </button>
                <button className="text-gray-400 hover:text-[#C23DBE] transition-colors cursor-pointer p-1">
                  <DocumentText size="20" variant="Outline" color='#626262' />
                </button>
                <button className="text-gray-400 hover:text-[#C23DBE] transition-colors cursor-pointer p-1">
                  <Link1 size="20" variant="Outline"color='#626262'  />
                </button>
              </div>

              {/* Minimalist Orange Send Button */}
              <button
                onClick={() => console.log("Sent:", comment)}
                className="flex items-center gap-2 px-6 py-2 bg-[#FF8A00] hover:bg-[#E67C00] text-white font-bold rounded-xl transition-all shadow-md shadow-orange-50 cursor-pointer active:scale-95 text-xs  tracking-wider"
              >
                <span>Send</span>
                <Send size="14" fill="white" />
              </button>
            </div>
          </div>
        </div>

        {/* Visibility Note */}
        <p className="mt-4 px-4 text-[11px] text-gray-400 font-medium flex items-center gap-2">
          <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
          Comments are private between you and the instructor
        </p>
      </div>
    </div>
  );
};

export default AssignmentComment;