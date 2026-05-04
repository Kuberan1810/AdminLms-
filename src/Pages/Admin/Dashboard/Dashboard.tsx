import LmsStudentsMetrics from './section/LmsStudentsMetrics'
import LmsCourses from './section/LmsCourses'
import LmsAttendanceAndOthers from './section/LmsAttendanceAndOthers'
const Dashboard = () => {
  return (
    <div className="flex flex-col gap-6">
      <LmsStudentsMetrics/>
      <LmsCourses/>
      <LmsAttendanceAndOthers/>

      </div>
  )
}

export default Dashboard