import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getEmployerById, getEmployerJobs, getEmployerApplications } from "../api";


export default function EmpDash2() {
  const [employer, setEmployer] = useState({});
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const employerId = localStorage.getItem("employerId");
        if (!employerId) return;

        const resEmployer = await getEmployerById(employerId);
        setEmployer(resEmployer.data);

        const resApps = await getEmployerApplications(employerId);
        setApplications(Array.isArray(resApps.data) ? resApps.data : []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
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
                <div className="logo-circle">{employer.company?.charAt(0)}</div>
                <div className="profile-text">
                  <h2>{employer.company}</h2>
                 {/* <p><strong>Contact Person:</strong> {employer.contact_person}</p>*/}
                  <p>
                    {employer.description}<br />
                    {employer.city}<br />
                    {employer.email}<br />
                    {employer.phone}
                  </p>
                </div>
              </div>
            </div>
            <div className="last">
              <a href="/EditEmployerProfile" className="edit-btn">Edit</a>
            </div>
          </div>
        </div>
      </section>

      <section className="stcards">
        <div className="bar1">
          <div className="ele">
            <p>Active Jobs <br /><br />{applications.filter(app => app.job_status === "active").length}</p>
          </div>
          <div className="ele">
            <p>Total Applications <br /><br />{applications.length}</p>
          </div>
          <div className="ele">
            <p>Total Hires <br /><br />{applications.filter(app => app.status === "hired").length}</p>
          </div>
        </div>
      </section>

      <section className="mservices">
        <div className="bar">
          <a href="/empdash1" className="al choose"><b>My Jobs</b></a>
          <a href="/empdash2" className="al actform"><b>Applications</b></a>
        </div>

        <div className="header-bar">
          <h2>Recent Applications</h2>
        </div>

        {applications.map((app) => (
          <div className="application-card" key={app.id}>
            <div className="app-left">
              <div className="avatar">{app.student_name?.split(" ").map(n => n[0]).join("")}</div>
              <div className="info">
                <h3>
                  {app.student_name} <span className={`status ${app.status}`}>{app.status.charAt(0).toUpperCase() + app.status.slice(1)}</span>
                </h3>
                <p className="applied-for">Applied for: {app.job_title}</p>
                <div className="extra">
                  <span className="experience">{app.experience}</span>
                  <span className="date">Applied: {new Date(app.created_at).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
      <Footer />
    </>
  );
}
