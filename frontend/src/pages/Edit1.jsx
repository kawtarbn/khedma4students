import React, { useEffect, useState } from "react";
import EditJobForm from "../components/EditJobForm";
import { useNavigate, useParams } from "react-router-dom";
import { getJobById, updateJob } from "../api";

export default function Edit1() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadJob = async () => {
      try {
        setError("");
        setLoading(true);
        const res = await getJobById(id);
        setJob(res.data);
      } catch (e) {
        console.error(e);
        setError("Failed to load job for editing.");
      } finally {
        setLoading(false);
      }
    };

    loadJob();
  }, [id]);

  const handleSave = async (updatedJob) => {
    try {
      const payload = {
        title: updatedJob.title,
        description: updatedJob.description,
        category: updatedJob.category,
        city: updatedJob.city,
        contactEmail: updatedJob.contactEmail,
        contactPhone: updatedJob.contactPhone,
        status: updatedJob.status,
      };

      await updateJob(id, payload);

      // go back after saving
      navigate("/jobs");
      // or: navigate(`/jobs/${id}`);
    } catch (e) {
      console.error(e);
      alert("Failed to update job.");
    }
  };

  const handleCancel = () => {
    navigate("/jobs");
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;
  if (!job) return <div>Job not found.</div>;

  return <EditJobForm job={job} onSave={handleSave} onCancel={handleCancel} />;
}
