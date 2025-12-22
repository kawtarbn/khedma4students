import React, { useState, useEffect } from "react";
import EditJobForm from "./EditJobForm";
import { getJobs, deleteJob, updateJob } from "../api";

export default function JobList() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingJob, setEditingJob] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await getJobs();
        setJobs(res.data);
      } catch (err) {
        console.error("Error fetching jobs:", err.response || err);
        setJobs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;

    try {
      await deleteJob(id);
      setJobs(jobs.filter((job) => job.id !== id));
    } catch (err) {
      console.error("Delete failed:", err.response || err);
    }
  };

  const handleEditSave = async (updatedJob) => {
    try {
      const res = await updateJob(updatedJob.id, updatedJob);
      const data = res.data;
      setJobs(jobs.map((job) => (job.id === data.id ? data : job)));
      setEditingJob(null);
    } catch (err) {
      console.error("Update failed:", err.response || err);
      alert("Failed to update job.");
    }
  };

  if (loading) return <p>Loading jobs...</p>;

  return (
    <div>
      <h2 style={{ marginLeft: "90px" }}>Job Listings:</h2>
      {jobs.length === 0 && <p>No jobs found.</p>}

      <ul>
        {jobs.map((job) => (
          <li
            key={job.id}
            style={{
              borderBottom: "1px solid #ccc",
              marginBottom: "12px",
              paddingBottom: "12px",
            }}
          >
            <h3>{job.title}</h3>
            <p>{job.description}</p>
            <p><strong>Category:</strong> {job.category}</p>
            <p><strong>City:</strong> {job.city}</p>
            <p><strong>Email:</strong> {job.contactEmail || "-"}</p>
            <p><strong>Phone:</strong> {job.contactPhone || "-"}</p>
            <p><strong>Status:</strong> {job.status}</p>

            <button
              onClick={() => setEditingJob(job)}
              style={{
                padding: "6px 12px",
                borderRadius: "6px",
                border: "none",
                backgroundColor: "#2563eb",
                color: "#fff",
                cursor: "pointer",
                marginRight: "6px",
              }}
            >
              Edit
            </button>

            <button
              onClick={() => handleDelete(job.id)}
              style={{
                padding: "6px 12px",
                borderRadius: "6px",
                border: "none",
                backgroundColor: "#dc2626",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {editingJob && (
        <EditJobForm
          job={editingJob}
          onSave={handleEditSave}
          onCancel={() => setEditingJob(null)}
        />
      )}
    </div>
  );
}
