import React, { useState } from "react";

export default function ApplyModal({ onClose }) {
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

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

  function submit(e) {
    e.preventDefault();
    if (validate()) {
      alert("Application submitted successfully!");
      onClose();
    }
  }

  return (
    <div className="modal" style={{ display: "flex" }}>
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

            <label>Cover Message</label>
            <textarea
              rows="4"
              name="message"
              value={form.message}
              onChange={(e) =>
                setForm({ ...form, message: e.target.value })
              }
            />
            {errors.message && (
              <div className="error-msg">{errors.message}</div>
            )}

            <button type="submit" className="submit-btn">
              Submit Application
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
