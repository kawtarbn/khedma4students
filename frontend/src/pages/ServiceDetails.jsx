import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const service = {
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
    { name: "Ahmed B.", rating: "5/5", date: "10/10/2025", text: "Great service! Fast and efficient." },
    { name: "Yasmine T.", rating: "4/5", date: "12/10/2025", text: "Good job! Would hire again." },
  ],
};

export default function ServiceDetails() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [errors, setErrors] = useState({});

  // Check if employer is logged in
  const isEmployerLoggedIn = () => {
    return !!localStorage.getItem('employerId');
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9+\-\s()]+$/.test(formData.phone)) {
      newErrors.phone = 'Phone number is invalid';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log('Form submitted:', formData);
      alert('Your message has been sent to the student!');
      setShowModal(false);
      setFormData({ name: '', email: '', phone: '', message: '' });
      setErrors({});
    }
  };

  return (
    <div>
      <Header />

      <section className="container2">
        <div className="main-content">
          <a href="StudentServices" className="back-link">
            ← Back to services
          </a>
          <div className="job-details">
            <div className="job-header">
              <h2>{service.title}</h2>
              <span className="posted">Posted by {service.postedBy}</span>
            </div>

            <div className="job-meta">
              <div>
                <img src="media/location.png" alt="" /> {service.location}
              </div>
              <div>{service.date}</div>
              <div>
                <img src="media/nostar.jpg" alt="rating" /> {service.rating}
              </div>
            </div>

            <hr />

            <h3 className="h3m3">Service Description</h3>
            <p>{service.description}</p>

            <hr />

            <h3>Category</h3>
            <span className="categorymm">{service.category}</span>

            <hr />

            <h3>Availability</h3>
            <div className="availability">{service.availability}</div>

            <hr />

            <h3>Posted By</h3>
            <div className="posted-by">
              <img src="media/user.png" alt="" />
              {service.author}
            </div>

            <hr />

            <h3>Reviews</h3>
            {service.reviews.map((rev) => (
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
              <p>{service.contactEmail}</p>
            </div>
            <hr />
            
            {isEmployerLoggedIn() ? (
              <button 
                className="login-btn" 
                onClick={() => setShowModal(true)}
                style={{ cursor: 'pointer' }}
              >
                Contact Student
              </button>
            ) : (
              <button 
                className="login-btn" 
                disabled
                style={{ 
                  cursor: 'not-allowed', 
                  opacity: '0.6',
                  backgroundColor: '#ccc'
                }}
              >
                Contact Student
              </button>
            )}

            {!isEmployerLoggedIn() && (
              <p className="note">You need to be logged in as an employer to contact students</p>
            )}
          </aside>
        </div>
      </section>

      {showModal && isEmployerLoggedIn() && (
        <div className="modal" style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div className="modalcontent" style={{
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '10px',
            maxWidth: '500px',
            width: '90%',
            position: 'relative'
          }}>
            <button 
              onClick={() => setShowModal(false)}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                background: '#ff4444',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '30px',
                height: '30px',
                fontSize: '18px',
                cursor: 'pointer'
              }}
            >
              ×
            </button>
            
            <h2 style={{ marginBottom: '20px', color: '#333' }}>Contact Student</h2>
            
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Full Name *</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: errors.name ? '2px solid #ff4444' : '1px solid #ddd',
                    borderRadius: '5px',
                    fontSize: '14px'
                  }}
                  placeholder="Enter your full name"
                />
                {errors.name && <div style={{ color: '#ff4444', fontSize: '12px', marginTop: '5px' }}>{errors.name}</div>}
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Email *</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: errors.email ? '2px solid #ff4444' : '1px solid #ddd',
                    borderRadius: '5px',
                    fontSize: '14px'
                  }}
                  placeholder="your.email@example.com"
                />
                {errors.email && <div style={{ color: '#ff4444', fontSize: '12px', marginTop: '5px' }}>{errors.email}</div>}
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Phone Number *</label>
                <input 
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: errors.phone ? '2px solid #ff4444' : '1px solid #ddd',
                    borderRadius: '5px',
                    fontSize: '14px'
                  }}
                  placeholder="+213 5XX XXX XXX"
                />
                {errors.phone && <div style={{ color: '#ff4444', fontSize: '12px', marginTop: '5px' }}>{errors.phone}</div>}
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="4"
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: errors.message ? '2px solid #ff4444' : '1px solid #ddd',
                    borderRadius: '5px',
                    fontSize: '14px',
                    resize: 'vertical'
                  }}
                  placeholder="Tell the student about your project or requirements..."
                />
                {errors.message && <div style={{ color: '#ff4444', fontSize: '12px', marginTop: '5px' }}>{errors.message}</div>}
              </div>

              <button 
                type="submit"
                style={{
                  width: '100%',
                  padding: '12px',
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  fontSize: '16px',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
