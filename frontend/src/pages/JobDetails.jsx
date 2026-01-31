import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // For fetching the ID from URL
import { getRequestById } from "../api"; // The API function to fetch the request by ID
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function JobDetails() {
  const { id } = useParams(); // Fetch the ID from the URL
  const [service, setService] = useState(null); // State to store service details
  const [showModal, setShowModal] = useState(false); // For showing the "Apply Now" modal

  // Fetch service details when the component mounts
  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        const res = await getRequestById(id); // Fetch the request by ID
        setService(res.data); // Store the fetched service data in the state
      } catch (err) {
        console.error("Error fetching service details:", err);
      }
    };

    fetchServiceDetails(); // Call the function to fetch the data
  }, [id]); // Re-fetch if the ID changes

  if (!service) return <p>Loading...</p>; // Show loading state while fetching data

  return (
    <div>
      <Header />
      <section className="container2">
        <div className="main-content">
          <a href="/StudentServices" className="back-link">
            ← Back to listings
          </a>

          <div className="job-details">
            <h2>{service.title}</h2>
            <p>{service.description}</p>
            <p>Category: {service.category}</p>
            <p>City: {service.city}</p>
            <p>Availability: {service.availability}</p>
            <p>Contact Email: {service.contactEmail}</p>
            {/* Add other fields as needed */}

            <button className="login-btn" onClick={() => setShowModal(true)}>
              Apply Now
            </button>
            <p className="note">You need to be logged in to apply for jobs</p>

            {/* Apply Now Modal */}
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
                      <input className="input" type="text" name="fullname" />
                      <label className="label">Email</label>
                      <input className="input" type="email" name="email" />
                      <label className="label">Phone Number</label>
                      <input className="input" type="text" name="phone" />
                      <label className="label">Cover Message</label>
                      <textarea className="textarea" name="message" rows="4" />
                      <button type="button" className="submit-btn">
                        Submit Application
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
