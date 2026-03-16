



const CoursesList = () => {
  const SectionCard = ({
    title,
    children,
  }: {
    title: string;
    children: React.ReactNode;
  }) => {
    return (
      <div className=" rounded-xl mb-4 md:mb-6">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-3 bg-[#FFF5EB] dark:bg-[#3d271d] p-3 rounded-lg gap-2 border border-transparent dark:border-[#4d3125]">
          <h2 className="text-[#F67300] font-semibold text-base md:text-lg">{title}</h2>

          {/* <button className="flex items-center justify-center gap-2 text-sm border border-[#d3d3d3] px-3 py-1 rounded-lg bg-white w-full sm:w-auto">
          <Filter size={16} />
          All status
        </button> */}
        </div>

        {children}
      </div>
    );
  };

  return (
    <div>
      <SectionCard title="Current Courses">
        <div className="space-y-3">
          {[
            { code: "AM101", date: "10 , Mar 2026", batch: "01", duration: "3 Months" },
            // { code: "AM101", date: "12 , Dec 2025", batch: "02", duration: "3 Months" },
            // { code: "AM101", date: "12 , Dec 2025", batch: "03", duration: "3 Months" },
          ].map((course, i) => (
            <div
              key={i}
              className="bg-white dark:bg-[#1E1E1E] border border-[#d3d3d3] dark:border-[#363636] rounded-xl py-3 px-6 grid grid-cols-1 sm:grid-cols-4 gap-4 items-center transition-colors"
            >
              <div className="flex flex-col">
                <span className="text-sm font-medium text-black dark:text-gray-200">Course ID</span>
                <span className="text-sm text-[#333333] dark:text-[#A3A3A3] mt-1">{course.code}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-black dark:text-gray-200">Start Date</span>
                <span className="text-sm text-[#333333] dark:text-[#A3A3A3] mt-1">{course.date}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-black dark:text-gray-200">Batch Id</span>
                <span className="text-sm text-[#333333] dark:text-[#A3A3A3] mt-1">{course.batch}</span>
              </div>
              <div className="flex flex-col sm:items-end">
                <div className="flex flex-col sm:items-center w-full sm:w-auto">
                  <span className="text-sm font-medium text-black dark:text-gray-200">Duration</span>
                  <span className="text-sm text-[#333333] dark:text-[#A3A3A3] mt-1">{course.duration}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  )
}

export default CoursesList