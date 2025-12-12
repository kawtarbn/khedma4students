import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

import { getEmployerById, getEmployerJobs, getEmployerApplications } from "../api";


export default function EmpDash1() {
  const [employer, setEmployer] = useState({});
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const employerId = localStorage.getItem("employerId");
        if (!employerId) return;

        const resEmployer = await getEmployerById(employerId);
        setEmployer(resEmployer.data);

        const resJobs = await getEmployerJobs(employerId);
        setJobs(Array.isArray(resJobs.data) ? resJobs.data : []);
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
        <div className="hh22">Loading dashboard...</div>
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
            <p>Active Jobs <br /><br />{jobs.filter(job => job.status === "active").length}</p>
          </div>
          <div className="ele">
            <p>Total Applications <br /><br />{jobs.reduce((sum, job) => sum + job.applications_count, 0)}</p>
          </div>
          <div className="ele">
            <p>Total Hires <br /><br />{jobs.reduce((sum, job) => sum + job.hired_count, 0)}</p>
          </div>
        </div>
      </section>

      <section className="mservices">
        <div className="bar">
          <a href="/empdash1" className="al actform"><b>My Jobs</b></a>
          <a href="/empdash2" className="al choose"><b>Applications</b></a>
        </div>

        <div className="jobs-c">
          {jobs.map((job) => (
            <div className="job-c" key={job.id}>
              <div className="job-info">
                <div className="job-title">
                  <h3>{job.title}</h3>
                  <span className={`status ${job.status === "active" ? "act" : "filled"}`}>
                    {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                  </span>
                </div>
                <p className="job-category">{job.category}</p>
                <div className="job-meta">
                  <span>Posted: {new Date(job.created_at).toLocaleDateString()}</span>
                  <span>Views: {job.views}</span>
                  <span>Applications: {job.applications_count}</span>
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
