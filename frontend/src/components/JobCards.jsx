import React from "react";
import { Link } from "react-router-dom";

export default function JobCard({ job }) {
  return (
    <div className="job-card">
      <span className="badge">Employer</span>

      <h3>{job.title}</h3>

      <p className="location">
        📍 {job.city} &nbsp; ⭐ {job.rating}
      </p>

      <p className="desc">{job.description}</p>

      <div className="tags">{job.category}</div>

      <hr />

      <div className="L">
        <span className="author">👤 {job.author}</span>
        <Link to={`/jobs/${job.id}`} className="btn">
          View Details
        </Link>
      </div>
    </div>
  );
}
