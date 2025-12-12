import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Welcome from "./pages/Welcome";
import StudentServices from "./pages/StudentServices";
import Notifications from "./pages/Notifications";
import JobDetails from  "./pages/JobDetails";

// Student pages
import StudentsCRUD from "./pages/StudentsCRUD";
import EditStudentProfile from "./pages/EditStudentProfile";
import Sign from "./pages/Sign";
import Login from "./pages/Login";
import Stdashboard1 from "./pages/stdashboard1";
import Stdashboard2 from "./pages/stdashboard2";

// Employer pages
import SignEmp from "./pages/signemp";
import EmpLogin from "./pages/emplogin";
import EmpDash1 from "./pages/empdash1";
import EmpDash2 from "./pages/empdash2";
import EditEmployerProfile from "./pages/EditEmployerProfile";

import "./App.css";

// Check for studentId instead of studentToken
const isStudentLoggedIn = () => {
  return !!localStorage.getItem("studentId");
};

// Check for employerId instead of employerToken
const isEmployerLoggedIn = () => {
  return !!localStorage.getItem("employerId");
};

// PrivateRoute wrappers
const StudentPrivateRoute = ({ children }) =>
  isStudentLoggedIn() ? children : <Navigate to="/login" />;

const EmployerPrivateRoute = ({ children }) =>
  isEmployerLoggedIn() ? children : <Navigate to="/emplogin" />;

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Home/Welcome Page */}
        <Route path="/" element={<Welcome />} />
        <Route path="/Welcome" element={<Welcome />} />
        
        {/* Student Routes */}
        <Route path="/sign" element={<Sign />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/stdashboard1"
          element={
            <StudentPrivateRoute>
              <Stdashboard1 />
            </StudentPrivateRoute>
          }
        />
        <Route
          path="/stdashboard2"
          element={
            <StudentPrivateRoute>
              <Stdashboard2 />
            </StudentPrivateRoute>
          }
        />
        <Route
          path="/edit-student/:id"
          element={
            <StudentPrivateRoute>
              <EditStudentProfile />
            </StudentPrivateRoute>
          }
        />

        {/* Employer Routes */}
        <Route path="/signemp" element={<SignEmp />} />
        <Route path="/emplogin" element={<EmpLogin />} />
        <Route
          path="/empdash1"
          element={
            <EmployerPrivateRoute>
              <EmpDash1 />
            </EmployerPrivateRoute>
          }
        />
        <Route
          path="/empdash2"
          element={
            <EmployerPrivateRoute>
              <EmpDash2 />
            </EmployerPrivateRoute>
          }
        />
        <Route
          path="/EditEmployerProfile"
          element={
            <EmployerPrivateRoute>
              <EditEmployerProfile />
            </EmployerPrivateRoute>
          }
        />

        {/* Admin/CRUD Route (Optional) */}
        <Route path="/students-crud" element={<StudentsCRUD />} />
        <Route path="/StudentServices" element={<StudentServices/>} />
        <Route path="/JobDetails" element={<JobDetails />}/>

        {/* 404 fallback */}
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </Router>
  );
}