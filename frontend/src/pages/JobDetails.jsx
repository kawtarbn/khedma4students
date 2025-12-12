import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const job = {
  title: "Graphic Designer Available for Freelance Work",
  postedBy: "Student",
  location: "Oran",
  date: "13/10/2025",
  rating: "4.8/5.0 (8 reviews)",
  description:
    "Computer Science student offering graphic design services. Experienced in logos, posters, social media content. Available evenings and weekends.",
  category: "Freelance & Digital Work",
  availability: "Mon-Fri: 6PM–10PM, Weekends: All day",
  author: "Amina Kaci",
  contactEmail: "amina.kaci@email.dz",
  reviews: [
    { name: "Fatima Z.", rating: "5/5", date: "08/10/2025", text: "Excellent work! Very professional and reliable." },
    { name: "Mohamed K.", rating: "4/5", date: "05/10/2025", text: "Good experience overall. Would recommend." },
  ],
};

export default function JobDetails() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <Header />

      <section className="container2">
        <div className="main-content">
          <a href="StudentServices" className="back-link">
            ← Back to listings
          </a>
          <div className="job-details">
            <div className="job-header">
              <h2>{job.title}</h2>
              <span className="posted">Posted by {job.postedBy}</span>
            </div>

            <div className="job-meta">
              <div>
                <img src="media/location.png" alt="" /> {job.location}
              </div>
              <div>{job.date}</div>
              <div>
                <img src="media/nostar.jpg" alt="rating" /> {job.rating}
              </div>
            </div>

            <h3 className="h3m3">Job Description</h3>
            <p>{job.description}</p>

            <hr />

            <h3>Category</h3>
            <span className="categorymm">{job.category}</span>

            <hr />

            <h3>Availability</h3>
            <div className="availability">{job.availability}</div>

            <hr />

            <h3>Posted By</h3>
            <div className="posted-by">
              <img src="media/user.png" alt="" />
              {job.author}
            </div>

            <hr />

            <h3>Reviews</h3>
            {job.reviews.map((rev) => (
              <div className="review" key={rev.name + rev.date}>
                <div className="review-header">
                  <strong>{rev.name}</strong>
                  <span>
                    <img src="media/nostar.jpg" alt="rating" /> {rev.rating}
                  </span>
                  <span className="date">{rev.date}</span>
                </div>
                <p>{rev.text}</p>
              </div>
            ))}
          </div>

          <aside className="contact-card">
            <h3>Contact Information</h3>
            <div className="emailm3">
              <img src="media/mail.png" alt="email" />
              <p>{job.contactEmail}</p>
            </div>
            <hr />
            <button className="login-btn" onClick={() => setShowModal(true)}>
              Apply Now
            </button>

            <p className="note">You need to be logged in to apply for jobs</p>
          </aside>
        </div>
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

