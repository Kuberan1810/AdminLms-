import { Mail, Phone, Calendar, GraduationCap, FileText, Download, Clock, ArrowLeft, MoreVertical, Share2, Printer, ChevronRight } from "lucide-react";
import type { InstructorData } from "../../../../../data/InstructorMockData";

interface Props {
  instructor: InstructorData;
  onBack: () => void;
}

const InstructorProfile = ({ instructor, onBack }: Props) => {
  return (
    <div className="space-y-6 pb-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Back Button & Header */}
      <div className="flex items-center gap-4 mb-2">
        <button 
          onClick={onBack}
          className="p-2 bg-white dark:bg-[#2A2A2A] border border-[#F2EEF4] dark:border-[#3B3B3B] rounded-full hover:bg-gray-50 transition-all"
        >
          <ArrowLeft size={20} className="text-[#333333] dark:text-white" />
        </button>
        <h2 className="text-xl font-bold text-[#333333] dark:text-white">Instructor Profile</h2>
      </div>

      {/* Top Profile Banner */}
      <div className="bg-white dark:bg-[#2A2A2A] p-6 rounded-[28px] border border-[#F2EEF4] dark:border-[#3B3B3B] flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <img src={instructor.avatar} alt={instructor.name} className="w-20 h-20 rounded-full object-cover border-4 border-[#F67300]/10" />
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl font-bold text-[#333333] dark:text-white">{instructor.name}</h1>
              <span className="px-3 py-1 bg-[#E8F8F0] text-[#22C55E] text-[10px] font-bold rounded-full">{instructor.status}</span>
            </div>
            <p className="text-[#626262] dark:text-[#A3A3A3] font-medium">ID: {instructor.instructorId}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none px-6 py-2.5 bg-[#F67300] text-white rounded-xl text-sm font-bold shadow-lg shadow-[#F67300]/20 hover:bg-[#E66B00] transition-all">
            Edit Profile
          </button>
          <button className="flex-1 md:flex-none px-6 py-2.5 border border-[#EF4444] text-[#EF4444] rounded-xl text-sm font-bold hover:bg-red-50 transition-all">
            Deactivate
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Details & Attendance */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contact & Education Info */}
          <div className="bg-white dark:bg-[#2A2A2A] p-8 rounded-[28px] border border-[#F2EEF4] dark:border-[#3B3B3B]">
            <h3 className="text-lg font-bold text-[#333333] dark:text-white mb-6">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#F5F3FF] flex items-center justify-center rounded-2xl">
                  <Mail className="text-[#8B5CF6]" size={22} />
                </div>
                <div>
                  <p className="text-xs text-[#626262] dark:text-[#A3A3A3] font-medium mb-1">Email</p>
                  <p className="text-sm font-bold text-[#333333] dark:text-white">{instructor.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#FFF7ED] flex items-center justify-center rounded-2xl">
                  <Phone className="text-[#F97316]" size={22} />
                </div>
                <div>
                  <p className="text-xs text-[#626262] dark:text-[#A3A3A3] font-medium mb-1">Phone</p>
                  <p className="text-sm font-bold text-[#333333] dark:text-white">{instructor.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#F0FDF4] flex items-center justify-center rounded-2xl">
                  <Calendar className="text-[#22C55E]" size={22} />
                </div>
                <div>
                  <p className="text-xs text-[#626262] dark:text-[#A3A3A3] font-medium mb-1">Joined</p>
                  <p className="text-sm font-bold text-[#333333] dark:text-white">{instructor.joinedDate}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#EFF6FF] flex items-center justify-center rounded-2xl">
                  <GraduationCap className="text-[#3B82F6]" size={22} />
                </div>
                <div>
                  <p className="text-xs text-[#626262] dark:text-[#A3A3A3] font-medium mb-1">Qualification</p>
                  <p className="text-sm font-bold text-[#333333] dark:text-white">{instructor.qualification}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Courses & Sessions */}
          <div className="bg-white dark:bg-[#2A2A2A] p-8 rounded-[28px] border border-[#F2EEF4] dark:border-[#3B3B3B]">
            <h3 className="text-lg font-bold text-[#333333] dark:text-white mb-6">Course & Sessions</h3>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-[#F5F3FF] flex items-center justify-center rounded-2xl shrink-0">
                  <FileText className="text-[#8B5CF6]" size={22} />
                </div>
                <div>
                  <p className="text-xs text-[#626262] dark:text-[#A3A3A3] font-medium mb-2">Courses</p>
                  <div className="flex flex-wrap gap-2">
                    {instructor.courses.map((course, idx) => (
                      <span key={idx} className="text-sm font-bold text-[#333333] dark:text-white bg-gray-50 dark:bg-[#333] px-3 py-1 rounded-lg">
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-[#EFF6FF] flex items-center justify-center rounded-2xl shrink-0">
                   <Share2 className="text-[#3B82F6]" size={20} />
                </div>
                <div>
                  <p className="text-xs text-[#626262] dark:text-[#A3A3A3] font-medium mb-2">Batches</p>
                  <div className="flex flex-wrap gap-2">
                    {instructor.batches?.map((batch, idx) => (
                      <span key={idx} className={`px-3 py-1 rounded-lg text-[10px] font-bold ${
                        idx === 0 ? "bg-[#FFF1F2] text-[#F43F5E]" : 
                        idx === 1 ? "bg-[#F0FDF4] text-[#22C55E]" : 
                        "bg-[#F5F3FF] text-[#8B5CF6]"
                      }`}>
                        {batch}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Attendance Details */}
          <div className="bg-white dark:bg-[#2A2A2A] p-8 rounded-[28px] border border-[#F2EEF4] dark:border-[#3B3B3B]">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-[#333333] dark:text-white">Attendance Details</h3>
              <button className="flex items-center gap-2 px-4 py-2 border border-[#F2EEF4] dark:border-[#3B3B3B] rounded-xl text-xs font-bold text-[#626262] hover:bg-gray-50 transition-all">
                <Download size={14} />
                Export CSV
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[#626262] dark:text-[#A3A3A3] text-xs font-bold uppercase tracking-wider">
                    <th className="pb-4">Date</th>
                    <th className="pb-4">Course Name</th>
                    <th className="pb-4">Session Time</th>
                    <th className="pb-4 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F2EEF4] dark:divide-[#3B3B3B]">
                  {instructor.attendanceHistory?.map((record, idx) => (
                    <tr key={idx}>
                      <td className="py-4 text-sm font-bold text-[#333333] dark:text-white">{record.date}</td>
                      <td className="py-4 text-sm font-medium text-[#626262] dark:text-[#A3A3A3]">{record.courseName}</td>
                      <td className="py-4 text-sm font-medium text-[#626262] dark:text-[#A3A3A3]">{record.sessionTime}</td>
                      <td className="py-4 text-center">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                          record.status === "Present" ? "bg-[#E8F8F0] text-[#22C55E]" : "bg-[#FEF2F2] text-[#EF4444]"
                        }`}>
                          {record.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-6 flex justify-center">
              <button className="text-sm font-bold text-[#626262] dark:text-[#A3A3A3] hover:text-[#F67300] transition-colors">
                View more
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Uploaded & Activity */}
        <div className="space-y-6">
          {/* Uploaded Content */}
          <div className="bg-white dark:bg-[#2A2A2A] p-8 rounded-[28px] border border-[#F2EEF4] dark:border-[#3B3B3B]">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-[#333333] dark:text-white">Uploaded Content</h3>
              <button className="text-xs font-bold text-[#626262] dark:text-[#A3A3A3] hover:text-[#F67300]">View more</button>
            </div>
            <div className="space-y-5">
              {instructor.uploadedContent?.map((file, idx) => (
                <div key={idx} className="flex items-center justify-between gap-3 group">
                  <div className="flex items-center gap-4 min-w-0">
                    <div className={`w-10 h-10 flex items-center justify-center rounded-xl shrink-0 ${file.type === 'pdf' ? 'bg-[#FEF2F2]' : 'bg-[#EFF6FF]'}`}>
                      {file.type === 'pdf' ? <FileText className="text-[#EF4444]" size={20} /> : <FileText className="text-[#3B82F6]" size={20} />}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-[#333333] dark:text-white truncate">{file.title}</p>
                      <p className="text-[10px] text-[#626262] dark:text-[#A3A3A3] font-medium">{file.batch} • {file.timeAgo}</p>
                    </div>
                  </div>
                  <button className="p-2 text-[#626262] hover:bg-gray-100 dark:hover:bg-[#3B3B3B] rounded-lg transition-all opacity-0 group-hover:opacity-100">
                    <Download size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white dark:bg-[#2A2A2A] p-8 rounded-[28px] border border-[#F2EEF4] dark:border-[#3B3B3B]">
            <h3 className="text-lg font-bold text-[#333333] dark:text-white mb-6">Recent Activity</h3>
            <div className="relative space-y-8 before:absolute before:left-5 before:top-2 before:bottom-2 before:w-[1px] before:bg-[#F2EEF4] dark:before:bg-[#3B3B3B]">
              {instructor.recentActivity?.map((activity, idx) => (
                <div key={idx} className="relative flex items-start gap-4 pl-10">
                  <div className={`absolute left-0 w-10 h-10 rounded-full flex items-center justify-center border-4 border-white dark:border-[#2A2A2A] z-10 ${
                    activity.type === 'upload' ? 'bg-[#F5F3FF]' : 
                    activity.type === 'assignment' ? 'bg-[#F0FDF4]' : 'bg-[#EFF6FF]'
                  }`}>
                    {activity.type === 'upload' && <FileText className="text-[#8B5CF6]" size={16} />}
                    {activity.type === 'assignment' && <ChevronRight className="text-[#22C55E]" size={16} />}
                    {activity.type === 'reply' && <Mail className="text-[#3B82F6]" size={16} />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-[#333333] dark:text-white mb-0.5">{activity.title}</p>
                    <p className="text-[10px] text-[#626262] dark:text-[#A3A3A3] font-medium uppercase">{activity.batch}</p>
                  </div>
                  <p className="text-[10px] text-[#626262] dark:text-[#A3A3A3] font-medium whitespace-nowrap">{activity.timeAgo}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorProfile;
