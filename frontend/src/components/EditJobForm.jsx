import React, { useState } from "react";
import { updateJob } from "../api";

export default function EditJobForm({ job = {}, onSave = () => {}, onCancel = () => {} }) {
  const [title, setTitle] = useState(job.title || "");
  const [description, setDescription] = useState(job.description || "");
  const [category, setCategory] = useState(job.category || "");
  const [city, setCity] = useState(job.city || "");
  const [contactEmail, setContactEmail] = useState(job.contactEmail || "");
  const [contactPhone, setContactPhone] = useState(job.contactPhone || "");
  const [status, setStatus] = useState(job.status || "Active");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!job.id) {
      console.error("Job ID is missing!");
      return;
    }

    try {
      const res = await updateJob(job.id, {
        id: job.id, // include ID for clarity
        title,
        description,
        category,
        city,
        contactEmail,
        contactPhone,
        status,
      });

      console.log("Job updated:", res.data);
      onSave(res.data); // update parent state
    } catch (err) {
      console.error("Error updating job:", err.response || err);
      alert("Failed to update job.");
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.35)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
        padding: "20px",
        overflowY: "auto",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "520px",
          backgroundColor: "#fff",
          padding: "30px 25px",
          borderRadius: "12px",
          boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
          fontFamily: "Arial, sans-serif",
          boxSizing: "border-box",
        }}
      >
        <h2 style={{ margin: 0, fontSize: "22px", fontWeight: "700" }}>Edit Job Posting</h2>
        <p style={{ margin: "6px 0 20px", color: "#555" }}>
          Update your job posting details below.
        </p>

        <form onSubmit={handleSubmit}>
          {/* Job Title */}
          <label style={{ fontWeight: "600", display: "block", marginBottom: "6px" }}>Job Title</label>
          <input
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #e5e7eb",
              marginBottom: "12px",
              background: "#f3f6ff",
            }}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          {/* Category */}
          <label style={{ fontWeight: "600", display: "block", marginBottom: "6px" }}>Category</label>
          <select
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #e5e7eb",
              marginBottom: "12px",
              background: "#f3f6ff",
            }}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">-- select a category --</option>
            <option value="Tutoring & education">Tutoring & education</option>
            <option value="Freelance & digital work">Freelance & digital work</option>
            <option value="Part time & small jobs">Part time & small jobs</option>
            <option value="Babysitting & Household Help">Babysitting & Household Help</option>
            <option value="Delivery and Errands">Delivery and Errands</option>
          </select>

          {/* Description */}
          <label style={{ fontWeight: "600", display: "block", marginBottom: "6px" }}>Description</label>
          <textarea
            style={{
              width: "100%",
              padding: "10px",
              height: "100px",
              borderRadius: "8px",
              border: "1px solid #e5e7eb",
              marginBottom: "12px",
              background: "#f3f6ff",
              resize: "vertical",
            }}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          {/* City */}
          <label style={{ fontWeight: "600", display: "block", marginBottom: "6px" }}>Location</label>
          <select
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #e5e7eb",
              marginBottom: "12px",
              background: "#f3f6ff",
            }}
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          >
            <option value=""> -- select a city --</option>
                             <option value="Adrar">Adrar</option>
                             <option value="Chlef">Chlef</option>
                             <option value="Laghouat">Laghouat</option>
                             <option value="Oum El Bouaghi">Oum El Bouaghi</option>
                             <option value="Batna">Batna</option>
                             <option value="Béjaïa">Béjaïa</option>     
                             <option value="Biskra">Biskra</option>  
                             <option value="Béchar">Béchar</option>      
                             <option value="Blida">Blida</option>
                             <option value="Bouira">Bouira</option>
                             <option value="Tamanrasset">Tamanrasset</option>
                             <option value="Tébessa">Tébessa</option>
                             <option value="Tlemcen">Tlemcen</option>
                             <option value="Tiaret">Tiaret</option>
                             <option value="Tizi Ouzou">Tizi Ouzou</option>
                             <option value="Algiers">Algiers</option>
                             <option value="Djelfa">Djelfa</option>
                             <option value="Jijel">Jijel</option>
                             <option value="Sétif">Sétif</option>
                             <option value="Saïda">Saïda</option>
                             <option value="Skikda">Skikda</option>
                             <option value="Sidi Bel Abbès">Sidi Bel Abbès</option>
                             <option value="Annaba">Annaba</option>
                             <option value="Guelma">Guelma</option>
                             <option value="Constantine">Constantine</option>
                             <option value="Médéa">Médéa</option>
                             <option value="Mostaganem">Mostaganem</option>
                             <option value="M’Sila">M’Sila</option>
                             <option value="Maascar">Maascar</option>
                             <option value="Ouargla">Ouargla</option>
                             <option value="Oran">Oran</option>
                             <option value="El Bayadh">El Bayadh</option>
                             <option value="Illizi">Illizi</option>
                             <option value="Bordj Bou Arréridj">Bordj Bou Arréridj</option>
                             <option value="Boumerdès">Boumerdès</option>
                             <option value="El Tarf">El Tarf</option>
                             <option value="Tindouf">Tindouf</option>
                             <option value="Tissemsilt">Tissemsilt</option>
                             <option value="El Oued">El Oued</option>
                             <option value="Khenchela">Khenchela</option>
                             <option value="Souk Ahras">Souk Ahras</option>
                             <option value="Tipaza">Tipaza</option>
                             <option value="Mila">Mila</option>
                             <option value="Aïn Defla">Aïn Defla</option>
                             <option value="Naama">Naama</option>
                             <option value="Aïn Témouchent">Aïn Témouchent</option>
                             <option value="Ghardaïa">Ghardaïa</option>
                             <option value="Relizane">Relizane</option>
                             <option value="Timimoun">Timimoun</option>
                             <option value="Bordj Badji Mokhtar">Bordj Badji Mokhtar</option>
                             <option value="Ouled Djellal">Ouled Djellal</option>
                             <option value="Béni Abbès">Béni Abbès</option>
                             <option value="In Salah">In Salah</option>
                             <option value="In Guezzam">In Guezzam</option>
                             <option value="Touggourt">Touggourt</option>
                             <option value="El M’Ghair">El M’Ghair</option>
                             <option value="El Menia">El Menia</option>
                             <option value="Djanet">Djanet</option>
          </select>

          {/* Contact Email */}
          <label style={{ fontWeight: "600", display: "block", marginBottom: "6px" }}>Contact Email</label>
          <input
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #e5e7eb",
              marginBottom: "12px",
              background: "#f3f6ff",
            }}
            type="email"
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
          />

          {/* Contact Phone */}
          <label style={{ fontWeight: "600", display: "block", marginBottom: "6px" }}>Contact Phone</label>
          <input
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #e5e7eb",
              marginBottom: "12px",
              background: "#f3f6ff",
            }}
            value={contactPhone}
            onChange={(e) => setContactPhone(e.target.value)}
          />

          {/* Status */}
          <label style={{ fontWeight: "600", display: "block", marginBottom: "6px" }}>Status</label>
          <select
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #e5e7eb",
              marginBottom: "16px",
              background: "#f3f6ff",
            }}
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option>Active</option>
            <option>Inactive</option>
            <option>Closed</option>
          </select>

          {/* Buttons */}
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "20px" }}>
            <button
              type="button"
              onClick={onCancel}
              style={{
                padding: "8px 16px",
                borderRadius: "8px",
                border: "1px solid #d1d5db",
                background: "#fff",
                color: "#333",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              Cancel
            </button>

            <button
              type="submit"
              style={{
                padding: "8px 16px",
                borderRadius: "8px",
                border: "none",
                background: "#2563eb",
                color: "#fff",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
