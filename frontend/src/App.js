import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

/* Public pages */
// import Welcome from "./pages/W";
import Home from "./pages/Home";
import StudentServices from "./pages/StudentServices";
import JobDetails from "./pages/JobDetails";
import ServiceDetails from "./pages/ServiceDetails";
import Notifications from "./pages/Notifications";


/* Student pages */


import Jobs from "./pages/Jobs";
import JobDetailsPage from "./pages/JobDetailsPage";
import Contact from "./pages/Contact";
// Student pages


import Sign from "./pages/Sign";
import Login from "./pages/Login";
import StudentsCRUD from "./pages/StudentsCRUD";
import EditStudentProfile from "./pages/EditStudentProfile";
import Stdashboard1 from "./pages/stdashboard1";
import Stdashboard2 from "./pages/stdashboard2";

/* Employer pages */
import SignEmp from "./pages/signemp";
import EmpLogin from "./pages/emplogin";
import EmpDash1 from "./pages/empdash1";
import EmpDash2 from "./pages/empdash2";
import EditEmployerProfile from "./pages/EditEmployerProfile";

/* Job / Request pages */
import PostJob from "./pages/PostJob";
import PostRequest from "./pages/PostRequest";
import Edit1 from "./pages/Edit1";
import EditRequestPage from "./pages/EditRequestPage";

/* Auth checks */
const isStudentLoggedIn = () => !!localStorage.getItem("studentId");
const isEmployerLoggedIn = () => !!localStorage.getItem("employerId");

/* Protected routes */
const StudentPrivateRoute = ({ children }) =>
  isStudentLoggedIn() ? children : <Navigate to="/login" />;

const EmployerPrivateRoute = ({ children }) =>
  isEmployerLoggedIn() ? children : <Navigate to="/emplogin" />;

export default function App() {
  return (
    <Router>
      <Routes>

        {/* Public */}
       <Route path="/" element={<Home />} /> 
        <Route path="/Home" element={<Home />} />
        <Route path="/StudentServices" element={<StudentServices />} />
        <Route path="/JobDetails" element={<JobDetails />} />
        <Route path="/ServiceDetails" element={<ServiceDetails />} />
        <Route path="/Notifications" element={<Notifications />} />

        {/* Student */}
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

        {/* Employer */}
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
          path="/edit-employer"
          element={
            <EmployerPrivateRoute>
              <EditEmployerProfile />
            </EmployerPrivateRoute>
          }
        />
        <Route path="/jobs" element={<Jobs />} 
        />


        {/* Jobs & Requests */}
        <Route path="/PostJob" element={<PostJob />} />
        <Route path="/PostRequest" element={<PostRequest />} />
        <Route path="/Edit1/:id" element={<Edit1 />} />
        <Route path="/EditRequestPage/:id" element={<EditRequestPage />} />

        {/* Admin */}

        <Route path="/jobs/:id" element={<JobDetailsPage />}
         />    
         <Route path="/contact" element={<Contact />} 
         />
        {/* Admin/CRUD Route (Optional) */}

        <Route path="/students-crud" element={<StudentsCRUD />} />

        {/* 404 */}
        <Route path="*" element={<div>404 - Page Not Found</div>} />

      </Routes>
    </Router>
  );
}
