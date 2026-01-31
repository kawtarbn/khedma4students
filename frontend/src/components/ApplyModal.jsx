import React, { useState } from "react";
import { createApplication } from "../api";

export default function ApplyModal({ onClose, jobId, studentId }) {
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  function validate() {
    const e = {};

    if (form.fullname.trim().length < 3)
      e.fullname = "Name must be at least 3 characters";

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Email is invalid";

    if (!/^0[5-7][0-9]{8}$/.test(form.phone))
      e.phone = "Phone must start with 05, 06 or 07 and have 10 digits";

    if (form.message.trim().length < 10)
      e.message = "Message must be at least 10 characters";

    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function submit(e) {
    e.preventDefault();
    if (!validate()) return;

    if (!jobId || !studentId) {
      alert("Missing job or student information. Please try again.");
      return;
    }

    setLoading(true);
    try {
      const applicationData = {
        student_id: studentId,
        job_id: jobId,
        fullname: form.fullname,
        email: form.email,
        phone: form.phone,
        message: form.message,
        status: "pending",
      };

      await createApplication(applicationData);
      alert("Application submitted successfully!");
      setForm({
        fullname: "",
        email: "",
        phone: "",
        message: "",
      });
      setErrors({});
      onClose();
    } catch (err) {
      console.error("Error submitting application:", err.response || err);
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
        // Show backend validation message so user knows what went wrong
        const msg = err.response.data.errors.job_id?.[0] || err.response.data.errors.student_id?.[0] || err.response.data.message;
        if (msg) alert(msg);
      } else {
        const msg = err.response?.data?.message || (err.code === "ERR_NETWORK" ? "Cannot reach server. Is the backend running?" : "Failed to submit application. Please try again.");
        alert(msg);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="modal" style={{ display: "flex", zIndex: 10001 }}>
      <div className="modalcontent">
        <div className="form-box">
          <button className="close-btn" onClick={onClose}>
            ×
          </button>

          <h2 className="h2m">Apply for this Job</h2>

          <form onSubmit={submit}>
            <label>Full Name</label>
            <input
              type="text"
              name="fullname"
              value={form.fullname}
              onChange={(e) =>
                setForm({ ...form, fullname: e.target.value })
              }
            />
            {errors.fullname && (
              <div className="error-msg">{errors.fullname}</div>
            )}

            <label>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />
            {errors.email && (
              <div className="error-msg">{errors.email}</div>
            )}

            <label>Phone Number</label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={(e) =>
                setForm({ ...form, phone: e.target.value })
              }
            />
            {errors.phone && (
              <div className="error-msg">{errors.phone}</div>
            )}

            <label htmlFor="apply-cover-message">Cover Message</label>
            <textarea
              id="apply-cover-message"
              rows="4"
              name="message"
              value={form.message ?? ""}
              placeholder="Tell the employer why you're a good fit..."
              onChange={(e) =>
                setForm({ ...form, message: e.target.value })
              }
              aria-label="Cover message"
            />
            {errors.message && (
              <div className="error-msg">{errors.message}</div>
            )}

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Submitting..." : "Submit Application"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
