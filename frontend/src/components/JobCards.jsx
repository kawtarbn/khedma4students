import React from "react";
import { Link } from "react-router-dom";

export default function JobCard({ job, onDelete }) {
  return (
    <div className="job-card">
      {/* Backend field: status */}
      <span className="badge">{job.status || "Active"}</span>

      <h3>{job.title}</h3>

      {/* Backend field: city */}
      <p className="location">📍 {job.city}</p>

      {/* Backend field: description */}
      <p className="desc">{job.description}</p>

      {/* Backend field: category */}
      <div className="tags">{job.category}</div>

      <hr />

      <div className="L" style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        {/* Details page */}
        <Link to={`/jobs/${job.id}`} className="btn">
          View Details
        </Link>

        {/* Edit page you already have */}
        <Link to={`/Edit1/${job.id}`} className="btn">
          Edit
        </Link>

        {/* Delete */}
        <button
          type="button"
          className="btn"
          onClick={() => onDelete && onDelete(job.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
