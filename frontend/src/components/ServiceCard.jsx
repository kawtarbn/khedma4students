import React from "react";

export default function ServiceCard({ service }) {
  return (
    <div className="card1">
      <div className="li">
        <div className="Title">
          <h3>{service.title}</h3>
        </div>
        <div className="b">
          <h3>Student</h3>
        </div>
      </div>

      <div className="info-line">
        <div className="cityn">
          <img src="media/location.png" alt="location" />
          <h4>{service.city}</h4>
        </div>
        <div className="Ratingn">
          <img src="media/starn.png" alt="rating" />
          <h4>{service.rating}</h4>
        </div>
      </div>

      <p>{service.description}</p>
      <h4 className="categoryn">{service.category}</h4>
      <div className="availabilityn">Available: {service.availability}</div>
      <hr />
      <div className="footer-card">
        <h4>{service.author}</h4>
        <a href="JobDetails">
          <button className="button">View Details</button>
        </a>
      </div>
    </div>
  );
}

