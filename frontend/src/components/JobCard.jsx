import React from "react";

export default function JobCard({ job }) {
  return (
    <div className="job-c">
      <div className="job-info">
        <div className="job-title">
          <h3>{job.title}</h3>
          <span className={`status ${job.statusClass}`}>{job.statusLabel}</span>
        </div>
        <p className="job-category">{job.category}</p>
        <div className="job-meta">
          <span>Posted: {job.posted}</span>
          <span>Views: {job.views}</span>
          <span>Applications: {job.applications}</span>
        </div>
      </div>
    </div>
  );
}

