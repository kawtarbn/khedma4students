import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ApplyModal from "../components/ApplyModal";
import { jobsData } from "../data/jobsData";

export default function JobDetailsPage() {
  const { id } = useParams();
  const job = jobsData.find((j) => j.id === Number(id));

  const isStudent = !!localStorage.getItem("studentId");
  const isEmployer = !!localStorage.getItem("employerId");
  const userRole = isStudent ? "student" : isEmployer ? "employer" : "guest";

  const [open, setOpen] = useState(false);

  if (!job) return <h2>Job not found</h2>;

  return (
    <>
      <Header variant={userRole} />

      <div className="X">
        {/* LEFT SIDE */}
        <div className="S">
          <Link to="/jobs" className="a">
            <h3 className="h3d">← Back to listings</h3>
          </Link>

          <div className="homem2">
            <div className="text1">
              <h3>{job.title}</h3>
              <h5 className="btnm">Posted by Employer</h5>
            </div>

            <div className="job-info">
              <span className="info-item">📍 {job.city}</span>
              <span className="info-item">📅 12/10/2025</span>
              <span className="info-item">⭐ {job.rating}</span>
            </div>

            <h3>Job Description</h3>
            <p>{job.description}</p>

            <h3>Category</h3>
            <h5 className="b">{job.category}</h5>

            <h3>Posted By</h3>
            <p>👤 {job.author}</p>
          </div>
        </div>

        {/* REVIEWS */}
        <div className="M">
          <h3>Reviews</h3>

          <div className="Q">
            <h3>Fatima.Z ⭐ (5/5)</h3>
            <p className="e">08/10/2025</p>
          </div>
          <p>Excellent work! Very professional and reliable.</p>
          <hr />

          <div className="Q">
            <h3>Mohamed.K ⭐ (4/5)</h3>
            <p className="t">05/10/2025</p>
          </div>
          <p>Good experience overall. Would recommend.</p>
          <hr />

          <div className="Q">
            <h3>Lina.B ⭐ (4/5)</h3>
            <p className="e">01/10/2025</p>
          </div>
          <p>Great communication and quality service.</p>
        </div>

        {/* CONTACT CARD */}
        <div className="card">
          <h3>Contact Information</h3>
          <p className="email2">{job.email}</p>

          {/* GUEST */}
          {userRole === "guest" && (
            <button className="login-btnn" disabled>
              Login to Continue
            </button>
          )}

          {/* STUDENT */}
          {userRole === "student" && (
            <div className="wrapper">
              <button className="apply-btn" onClick={() => setOpen(true)}>
                Apply Now
              </button>
            </div>
          )}

          {/* EMPLOYER */}
          {userRole === "employer" && (
            <>
              <hr />
              <div className="wrapper">
                <p className="info-msg">
                  This is an employer job posting. Only students can apply.
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {open && <ApplyModal onClose={() => setOpen(false)} />}

      <Footer />
    </>
  );
}
