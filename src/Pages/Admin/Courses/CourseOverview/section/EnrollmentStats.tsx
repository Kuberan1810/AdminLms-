interface EnrollmentData {
  total: number;
  attendance: number;
  completion: number;
  students: string[];
}

interface Props {
  enrollment: EnrollmentData;
}

const EnrollmentStats = ({ enrollment }: Props) => {
  return (
    <div className="bg-white dark:bg-[#2A2A2A] p-6 rounded-3xl border border-[#F2EEF4] dark:border-[#3B3B3B] space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-[#333333] dark:text-white">Enrollment Stats</h3>
        <span className="text-xs text-[#626262] dark:text-[#A3A3A3]">Total {enrollment.total}</span>
      </div>

      <div className="space-y-4">
        {/* Attendance */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-[#626262] dark:text-[#A3A3A3]">Avg. Attendance</span>
            <span className="text-sm font-bold text-[#333333] dark:text-white">{enrollment.attendance}%</span>
          </div>
          <div className="h-2 bg-[#F3F5F7] dark:bg-[#3B3B3B] rounded-full overflow-hidden">
            <div className="h-full bg-[#22C55E] rounded-full transition-all duration-500" style={{ width: `${enrollment.attendance}%` }} />
          </div>
        </div>

        {/* Assignment Completion */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-[#626262] dark:text-[#A3A3A3]">Assignment Completion</span>
            <span className="text-sm font-bold text-[#333333] dark:text-white">{enrollment.completion}%</span>
          </div>
          <div className="h-2 bg-[#F3F5F7] dark:bg-[#3B3B3B] rounded-full overflow-hidden">
            <div className="h-full bg-[#F67300] rounded-full transition-all duration-500" style={{ width: `${enrollment.completion}%` }} />
          </div>
        </div>
      </div>

      <div className="space-y-4 pt-2">
        <h4 className="text-xs font-bold text-[#333333] dark:text-white uppercase tracking-wider">Students</h4>
        <div className="flex items-center">
          <div className="flex -space-x-3 overflow-hidden">
            {enrollment.students.map((src, i) => (
              <img
                key={i}
                className="inline-block h-10 w-10 rounded-full ring-2 ring-white dark:ring-[#2A2A2A]"
                src={src}
                alt=""
              />
            ))}
            {enrollment.total > enrollment.students.length && (
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-[#F3F5F7] dark:bg-[#3B3B3B] ring-2 ring-white dark:ring-[#2A2A2A]">
                <span className="text-xs font-bold text-[#626262] dark:text-[#A3A3A3]">+{enrollment.total - enrollment.students.length}</span>
              </div>
            )}
          </div>
        </div>

        <button className="w-full py-2 bg-[#F3F5F7] dark:bg-[#3B3B3B]/50 text-[#626262] dark:text-[#A3A3A3] font-bold text-xs rounded-xl hover:bg-[#F3F5F7] transition-all cursor-pointer">
          View Enrollment List
        </button>
      </div>
    </div>
  );
};

export default EnrollmentStats;
