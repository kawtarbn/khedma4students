import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getStudentById, getStudentServices, deleteStudent } from "../api";

export default function Stdashboard1() {
  const studentId = localStorage.getItem("studentId");
  const [student, setStudent] = useState(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const studentRes = await getStudentById(studentId);
        setStudent(studentRes.data);

        const servicesRes = await getStudentServices(studentId);
        setServices(Array.isArray(servicesRes.data) ? servicesRes.data : []);
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

  if (loading) {
    return (
      <>
        <Header />
        <div className="hh22">Loading dashboard...</div>
        <Footer />
      </>
    );
  }

  if (!student) {
    return (
      <>
        <Header />
        <div className="hh22">
          <p>Could not load your dashboard.</p>
          <p style={{ marginTop: "0.5rem", fontSize: "0.95rem" }}>
            Please check that the backend is running and you are logged in, then{" "}
            <a href="/stdashboard1" style={{ color: "#2563eb" }}>try again</a> or{" "}
            <a href="/login" style={{ color: "#2563eb" }}>log in again</a>.
          </p>
        </div>
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
                <div className="logo-circle">
                  {student.full_name.split(" ").map(n => n[0]).join("")}
                </div>
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
              <div>
              <a href={`/edit-student/${studentId}`} className="edit-btn">Edit</a>
               </div>
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
          <div className="ele">
            <p>Active Services <br /><br />{services.filter(s => s.status === "Active").length}</p>
          </div>
          <div className="ele">
            <p>Total Applications <br /><br />{services.reduce((sum, s) => sum + s.applications, 0)}</p>
          </div>
          <div className="ele">
            <p>Completed Jobs <br /><br />{services.filter(s => s.status === "Completed").length}</p>
          </div>
        </div>
      </section>

      <section className="mservices">
        <div className="bar">
          <a href="/stdashboard1" className="al actform"><b>My services</b></a>
          <a href="/stdashboard2" className="al choose"><b>Applications</b></a>
        </div>

        <div className="services-container">
          <div className="posted-sev">
            <h2>My Posted Services</h2>
            <a href="/post-request" className="add-service-btn">+ Post New Service</a>
          </div>

          {services.map(service => (
            <div key={service.id} className="service-card">
              <div className="service-info">
                <div className="service-title">
                  <h3>{service.title}</h3>
                  <span className={`status ${service.status.toLowerCase()}`}>
                    {service.status}
                  </span>
                </div>

                <p className="service-category">{service.category}</p>

                <div className="service-meta">
                  <span>Posted: {service.posted_date}</span>
                  <span>Views: {service.views}</span>
                  <span>Applications: {service.applications}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}
