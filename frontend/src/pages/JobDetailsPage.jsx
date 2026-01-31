import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getJobById } from "../api";

export default function JobDetailsPage() {
  const { id } = useParams();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const loadJob = async () => {
      try {
        setError("");
        setLoading(true);
        const res = await getJobById(id);
        setJob(res.data);
      } catch (e) {
        console.error(e);
        setError("Failed to load job details.");
      } finally {
        setLoading(false);
      }
    };

    loadJob();
  }, [id]);

  return (

    <>
      <Header  />

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
        

    <div>
     


      <section className="container2">
        <div className="main-content">
          <Link to="/jobs" className="back-link">
            ← Back to listings
          </Link>

          {loading && <p>Loading job details...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}

          {!loading && !error && job && (
            <>
              <div className="job-details">
                <div className="job-header">
                  <h2>{job.title}</h2>
                  <span className="posted">Status: {job.status}</span>
                </div>

                <div className="job-meta">
                  <div>
                    <img src="/media/location.png" alt="" /> {job.city}
                  </div>
                  <div>
                    Posted:{" "}
                    {job.created_at
                      ? new Date(job.created_at).toLocaleDateString()
                      : "—"}
                  </div>
                </div>

                <h3 className="h3m3">Job Description</h3>
                <p>{job.description}</p>

                <hr />

                <h3>Category</h3>
                <span className="categorymm">{job.category}</span>

                <hr />

                <h3>Contact</h3>
                <p>Email: {job.contactEmail}</p>
                <p>Phone: {job.contactPhone}</p>
              </div>

              <aside className="contact-card">
                <h3>Contact Information</h3>
                <div className="emailm3">
                  <img src="/media/mail.png" alt="email" />
                  <p>{job.contactEmail}</p>
                </div>
                <hr />
                <button className="login-btn" onClick={() => setShowModal(true)}>
                  Apply Now
                </button>

                <p className="note">You need to be logged in to apply for jobs</p>
              </aside>
            </>
          )}
        </div>
      </div>
         {open && (
        <ApplyModal
          onClose={() => setOpen(false)}
          jobId={job.id}
          studentId={localStorage.getItem("studentId")}
        />
      )}
      </section>

      {showModal && (
        <div className="modal">
          <div className="modalcontent">
            <div className="form-box">
              <button className="a" onClick={() => setShowModal(false)}>
                &times;
              </button>
              <h2 className="h2m">Apply for this Job</h2>
              <form>
                <label className="label">Full Name</label>
                <br />
                <input className="input" type="text" name="fullname" />
                <br />

                <label className="label">Email</label>
                <br />
                <input className="input" type="email" name="email" />
                <br />

                <label className="label">Phone Number</label>
                <br />
                <input className="input" type="text" name="phone" />
                <br />

                <label className="label">Cover Message</label>
                <br />
                <textarea
                  className="textarea"
                  name="message"
                  rows="4"
                  placeholder="Tell them why you're a great fit..."
                />
                <br />

                <button type="button" className="submit-btn">
                  Submit Application
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
