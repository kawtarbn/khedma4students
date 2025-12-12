import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getStudentById, getStudentApplications, deleteStudent } from "../api";

export default function Stdashboard2() {
  const studentId = localStorage.getItem("studentId");
  const [student, setStudent] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const studentRes = await getStudentById(studentId);
        setStudent(studentRes.data);

        const appsRes = await getStudentApplications(studentId);
        setApplications(Array.isArray(appsRes.data) ? appsRes.data : []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [studentId]);
   const handleDelete = async (id) => {
      if (!window.confirm("Are you sure you want to delete your account?")) return;
  
      try {
        await deleteStudent(id);
  
        
        localStorage.removeItem("studentId");
        localStorage.removeItem("role");
  
       
        window.dispatchEvent(new Event("storage"));
  
        
        window.location.href = "/";
      } catch (err) {
        console.error("Delete failed:", err.response || err);
      }
    };
  if (loading || !student) {
    return (
      <>
        <Header />
        <div className="hh22">Loading applications...</div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <section className="stprofile">
        <div className="hh22">
          <div className="cardd">
            <div className="profile-header">
              <div className="profile-info">
                <div className="logo-circle">{student.full_name.split(" ").map(n => n[0]).join("")}</div>
                <div className="profile-text">
                  <h2>{student.full_name}</h2>
                  <p>
                    {student.major} - {student.year_of_study}<br />
                    {student.university}<br />
                    {student.email}<br />
                    {student.location}
                  </p>
                </div>
              </div>
            </div>
            <div className="last">
              <div> <a href={`/edit-student/${studentId}`} className="edit-btn">Edit</a></div>
               <div>
              <button onClick={() => handleDelete(student.id)} style={{ backgroundColor: "red" }} className="edit-btn">
                Delete
              </button>
                </div>
            </div>
          </div>
        </div>
      </section>

      <section className="stcards">
        <div className="bar1">
          <div className="ele"><p>Active Services <br /><br />{applications.filter(a => a.status === "Active").length}</p></div>
          <div className="ele"><p>Total Applications <br /><br />{applications.length}</p></div>
          <div className="ele"><p>Completed Jobs<br /><br />{applications.filter(a => a.status === "Completed").length}</p></div>
        </div>
      </section>

      <section className="mservices">
        <div className="bar">
          <a href="/stdashboard1" className="al choose"><b>My services</b></a>
          <a href="/stdashboard2" className="al actform"><b>Applications</b></a>
        </div>

        <div className="header-bar">
          <h2>My Applications</h2>
          <a href="/jobs" className="browse-btn">Browse Jobs</a>
        </div>

        {applications.map(app => (
          <div key={app.id} className="application-card">
            <div className="left-section">
              <h3>
                {app.title} <span className={`status ${app.status.toLowerCase()}`}>{app.status}</span>
              </h3>
              <p className="emp">Employer: {app.employer_name}</p>
              <p className="date">Applied on: {new Date(app.created_at).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
      </section>
      <Footer />
    </>
  );
}
