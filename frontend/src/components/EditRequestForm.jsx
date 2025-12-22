import React, { useState } from "react";
import { updateRequest } from "../api";

export default function EditRequestForm({ request, onSave, onCancel }) {
  const [form, setForm] = useState({ ...request });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await updateRequest(request.id, form);
      onSave(res.data);
    } catch (err) {
      alert("Update failed");
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "8px",
          minWidth: "400px",
          maxWidth: "90%",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ marginBottom: "15px" }}>Edit Request</h2>
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          <input
            id="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
            style={{ padding: "8px", width: "100%", boxSizing: "border-box" }}
          />
          <input
            id="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Category"
            style={{ padding: "8px", width: "100%", boxSizing: "border-box" }}
          />
          <select
            id="city"
            value={form.city}
            onChange={handleChange}
            placeholder="City"
            style={{ padding: "8px", width: "100%", boxSizing: "border-box" }}
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
          <textarea
            id="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            style={{
              padding: "8px",
              width: "100%",
              boxSizing: "border-box",
              minHeight: "80px",
            }}
          />
          <input
            id="pay"
            value={form.pay}
            onChange={handleChange}
            placeholder="Pay"
            style={{ padding: "8px", width: "100%", boxSizing: "border-box" }}
          />
          <input
            id="availability"
            value={form.availability}
            onChange={handleChange}
            placeholder="Availability"
            style={{ padding: "8px", width: "100%", boxSizing: "border-box" }}
          />

          <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
            <button
              type="submit"
              style={{
                padding: "8px 16px",
                backgroundColor: "#2563eb",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Save
            </button>
            <button
              type="button"
              onClick={onCancel}
              style={{
                padding: "8px 16px",
                backgroundColor: "#dc2626",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
