
import { Routes, Route } from "react-router-dom";
import Login from "../Pages/Student/Login/LoginParent";
import ProtectedRoute from "./ProtectedRoute";

/* ================= STUDENT LAYOUT ================= */
import StudentLayout from "../Components/Student/StudentLayout";

/* ================= STUDENT PAGES ================= */
import Dashboard from "../Pages/Student/Dashboard/Dashboard";
import Courses from "../Pages/Student/Courses/Courses";
import CourseDetails from "../Pages/Student/Courses/CourseDetails";
import LessonDetails from "../Pages/Student/Courses/LessonDetails";
import Assignments from "../Pages/Student/Assignment/Assignment";
import AssignmentList from "../Pages/Student/Assignment/AssignmentDetails/AssignmentList";
import AssignSubmission from "../Pages/Student/Assignment/AssignSubmission/AssignSubmission";
import ViewSubmission from "../Pages/Student/Assignment/ViewSubmission/ViewSubmission";
import Community from "../Pages/Student/Community/Community";
import Chat from "../Pages/Student/Chat/Chat";
import Test from "../Pages/Student/Test/Test";
import TestQuestions from "../Pages/Student/Test/TestQuestions/TestQuestions";
import Attendance from "../Pages/Student/Attendance/Attendance";
import Profile from "../Pages/Student/profile/Profile";
import LiveClassRoom from "../Pages/Student/LiveClassRoom";

/* ================= INSTRUCTOR ================= */
import InstructorDashboard from "../Pages/Instructor/dashboard/InstructorDashboard";
import CreateAssignmentPage from "../Pages/Instructor/AssignmentAssign/CreateAssignmentPage";
import StudentsPage from "../Pages/Instructor/Student/StudentsPage";
import StudentProfilePage from "../Pages/Instructor/Student/StudentProfilePage";
import TestResultsPage from "../Pages/Instructor/Tests/TestResultsPage";
import ReviewTestPage from "../Pages/Instructor/Tests/ReviewTestPage";
import Batches from "../Pages/Instructor/batches/Batches";
import UploadResources from "../Pages/Instructor/batches/batchesSection/UploadFiles";
import ResourceInfoSection from "../Pages/Instructor/batches/batchesSection/ResourceInfoSection";
import TestSection from "../Pages/Instructor/batches/batchesSection/TestSection";
import AssignmentDetailsPage from "../Pages/Instructor/AssignmentAssign/AssignmentDetailsPage";
import AssignmentSubmissionsPage from "../Pages/Instructor/AssignmentAssign/AssignmentSubmissionsPage";
import InstructorCommunity from "../Pages/Instructor/Community/Community";
import InstructorChat from "../Pages/Instructor/Chat/InstructorChat";
import InstructorProfile from "../Pages/Instructor/profile/InstructorProfile";
import Settings from "../Pages/Student/Settings/Settings";
import AddStudentPage from "../Pages/Instructor/CreatePages/AddStudentPage";
import CreateAnnouncementPage from "../Pages/Instructor/CreatePages/CreateAnnouncementPage";
import CreateAssignmentDetailsPage from "../Pages/Instructor/CreatePages/CreateAssignmentDetailsPage";
import CreateClassPage from "../Pages/Instructor/CreatePages/CreateClassPage";
import CreateCoursePage from "../Pages/Instructor/CreatePages/CreateCoursePage";
import CreateTestPage from "../Pages/Instructor/CreatePages/CreateTestPage";
import Chats from "../Pages/Student/Chats/Chat";

/* ================= ADMIN ================= */
import AdminDashboard from "../Pages/Admin/Dashboard/Dashboard";
import AdminCourses from "../Pages/Admin/Courses/Courses";
import AdminLayout from "../Components/Admin/AdminLayout";
import AdminInstructors from "../Pages/Admin/Users/Instructors/Instructors";
import AdminStudents from "../Pages/Admin/Users/Students/Students";
import AdminCommunity from "../Pages/Admin/Community/Community";
import AdminChat from "../Pages/Admin/Chat/Chat";
import Reports from "../Pages/Admin/Reports/Reports";
import CourseOverview from "../Pages/Admin/Courses/BatchesOverview/BatchesOverview";
import BatchesOverview from "../Pages/Admin/Courses/CourseOverview/CoursesOverview";
import UploadedContent from "../Pages/Admin/Users/Instructors/UploadedContent";




export default function AppRoutes() {
    return (
        <Routes>

            {/* PUBLIC */}
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />

            {/* STUDENT */}
            <Route element={<ProtectedRoute allowedRole="student" />}>
                <Route path="/student" element={<StudentLayout />}>
                    <Route path="dashboard" element={<Dashboard />} />

                    <Route path="courses" element={<Courses />} />
                    <Route path="courses/:id" element={<CourseDetails />} />
                    <Route path="courses/:courseId/lessons/:lessonId" element={<LessonDetails />} />

                    <Route path="assignments" element={<Assignments />} />
                    <Route path="assignment/:assignmentSlug" element={<AssignmentList />} />
                    <Route path="assignment/:assignmentSlug/view-submission" element={<ViewSubmission />} />
                    <Route path="assignment/:assignmentSlug/submit" element={<AssignSubmission />} />
                    <Route path="community" element={<Community />} />
                    <Route path="chat" element={<Chat />} />
                    <Route path="chats" element={<Chats />} />

                    <Route path="attendance" element={<Attendance />} />
                </Route>
                <Route path="/student/test" element={<Test />} />
                <Route path="/student/test/:testname" element={<TestQuestions />} />
                <Route path="/student/live-class" element={<LiveClassRoom />} />

                <Route path="student/profile" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />

            </Route>

            {/* INSTRUCTOR */}
            <Route element={<ProtectedRoute allowedRole="instructor" />}>
                <Route path="/instructor/dashboard" element={<InstructorDashboard />} />

                <Route path="/instructor/students" element={<StudentsPage />} />
                <Route path="/instructor/students/profile/:id" element={<StudentProfilePage />} />
                <Route path="/instructor/tests/results" element={<TestResultsPage />} />
                <Route path="/instructor/tests/review/:testId/:submissionId" element={<ReviewTestPage />} />
                <Route path="/instructor/batch-details/:batchId" element={<Batches />} />
                <Route path="/instructor/batch-details/upload-resources/:chapterId" element={<UploadResources />} />
                <Route path="/instructor/batch-details/resource-info/:chapterId" element={<ResourceInfoSection />} />
                <Route path="/instructor/batch-details/test-section/:testId" element={<TestSection />} />

                <Route path="/instructor/chat" element={<InstructorChat />} />
                <Route path="/instructor/community" element={<InstructorCommunity />} />
                <Route path="/instructor/profile" element={<InstructorProfile />} />

                {/* Creation Pages */}
                <Route path="/instructor/create-class" element={<CreateClassPage />} />
                <Route path="/instructor/create-course" element={<CreateCoursePage />} />
                <Route path="/instructor/add-student" element={<AddStudentPage />} />
                <Route path="/instructor/create-announcement" element={<CreateAnnouncementPage />} />
                <Route path="/instructor/create-test" element={<CreateTestPage />} />



                {/* ASSIGNMENTS */}
                {/* <Route path="/instructor/assignments/new" element={<CreateAssignmentDetailsPage />} />
            <Route path="/instructor/assignments/:id" element={<AssignmentDetailsPage />} />
            <Route path="/instructor/assignments/:id/edit" element={<CreateAssignmentDetailsPage />} />
            <Route path="/instructor/assignments/:id/submissions" element={<AssignmentSubmissionsPage />} /> */}


                <Route path="/instructor/create-assignment/details" element={<CreateAssignmentPage />} />
                <Route path="/instructor/assignment-details" element={<AssignmentDetailsPage />} />
                <Route path="/instructor/assignment/:assignmentSlug/review" element={<AssignmentSubmissionsPage />} />
                <Route path="/instructor/create-assignment" element={<CreateAssignmentDetailsPage />} />
            </Route>

            {/* ADMIN */}
            {/* <Route element={<ProtectedRoute allowedRole="admin" />}> */}
            <Route path="/admin" element={<AdminLayout />}>
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="courses" element={<AdminCourses />} />
                <Route path="courses/:courseId" element={<CourseOverview />} />
                <Route path="courses/:courseId/batches/:batchId" element={<BatchesOverview />} />
                <Route path="users/instructors" element={<AdminInstructors />} />
                <Route path="users/instructors/uploaded-content" element={<UploadedContent />} />
                <Route path="users/students" element={<AdminStudents />} />
                <Route path="community" element={<AdminCommunity />} />
                <Route path="chat" element={<AdminChat />} />
                <Route path="reports" element={<Reports />} />
            </Route>
            {/* </Route> */}


        </Routes>
    );
}
