import SignIn from "~/Pages/SignIn";
import Home from "~/Pages/Home";
import StudentList from "~/Pages/Student/StudentList";
import AddNewStudent from "~/Pages/Student/AddNewStudent";
import UserList from "~/Pages/User/UserList";
import AddNewUser from "~/Pages/User/AddNewUser";
import MajorList from "~/Pages/Major/MajorList";
import AddNewMajor from "~/Pages/Major/AddNewMajor";
import ResetPassword from "~/Pages/ResetPassword";
import ConfirmPassword from "~/Pages/ConfirmPassword";
import NotFound from "~/Pages/NotFound";
import HonourList from "~/Pages/Student/Honour";
import SubjectList from "~/Pages/Subject/SubjectList";
import ClassList from "~/Pages/Class/ClassList";
import RoleList from "~/Pages/Roles/RoleList";
import ProgramList from "~/Pages/Program/ProgramList";
import TermList from "~/Pages/Term/TermList";
import OJTList from "~/Pages/Student/OJT";
import FailSubjectList from "~/Pages/Student/FailSubject";
import DepartmentList from "~/Pages/Department/DepartmentList";
import AddNewDepartment from "~/Pages/Department/AddNewDepartment";
import StudentScore from "~/Pages/Student/Score/Score";
import AddNewSubject from "~/Pages/Subject/AddNewSubject";
import AssignStudentClass from "~/Pages/Class/AssignStudentClass";
import StudentClassDetail from "~/Pages/Class/StudentClassDetail/StudentClassDetail";

const publicRoutes = [
  { path: "sign-in", component: <SignIn /> },
  { path: "reset-password", component: <ResetPassword /> },
  { path: "confirm-password", component: <ConfirmPassword /> },
  { path: "*", component: <NotFound /> },
];
const privateRoutes = [
  { path: "/", component: <Home />, exact: true, index: true },
  { path: "students", component: <StudentList /> },
  { path: "students/honour", component: <HonourList /> },
  { path: "students/ojt", component: <OJTList /> },
  { path: "students/fail-subject", component: <FailSubjectList /> },
  { path: "students/score/:id", component: <StudentScore /> },
  { path: "departments", component: <DepartmentList /> },
  { path: "departments/add", component: <AddNewDepartment /> },
  { path: "students/add", component: <AddNewStudent /> },
  { path: "users", component: <UserList /> },
  { path: "users/add", component: <AddNewUser /> },
  { path: "majors", component: <MajorList /> },
  { path: "majors/add", component: <AddNewMajor /> },
  { path: "subjects", component: <SubjectList /> },
  { path: "subjects/add", component: <AddNewSubject /> },
  { path: "class", component: <ClassList /> },
  { path: "class/add", component: <AssignStudentClass /> },
  { path: "roles", component: <RoleList /> },
  { path: "programs", component: <ProgramList /> },
  { path: "terms", component: <TermList /> },
  { path: "class/:classCode/student-list", component: <StudentClassDetail /> },
];

export { publicRoutes, privateRoutes };
