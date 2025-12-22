import React, { useState } from "react";
import { createRequest } from "../api";

const PostRequestSection = () => {
  const [form, setForm] = useState({
    title: "",
    category: "",
    city: "",
    description: "",
    pay: "",
    availability: "",
    contactEmail: "",
    contactPhone: "",
    status: "open",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
    setErrors({ ...errors, [e.target.id]: "" });
  };

  const validate = () => {
    const newErrors = {};
    if (form.title.trim().length < 3) newErrors.title = "Title is required";
    if (!form.category) newErrors.category = "Select a category";
    if (!form.city) newErrors.city = "Select a city";
    if (form.description.trim().length < 15) newErrors.description = "Description must be at least 15 characters";
    if (!form.availability) newErrors.availability = "Availability required";
    if (!form.contactEmail) newErrors.contactEmail = "Email required";
    if (!form.contactPhone) newErrors.contactPhone = "Phone required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const res = await createRequest(form);
      console.log("Request created:", res.data);

      setForm({
        title: "",
        category: "",
        city: "",
        description: "",
        pay: "",
        availability: "",
        contactEmail: "",
        contactPhone: "",
        status: "open",
      });

      alert("Request posted successfully!");
    } catch (err) {
      console.error("Error:", err.response || err);
      alert("Failed to post request");
    }
  };

  return (
    <div className="post-request">
      <form className="request-form" onSubmit={handleSubmit}>
        <label>Job title / What I'm looking for:</label>
        <input id="title" value={form.title} onChange={handleChange} />
        {errors.title && <p className="field-error-msg">{errors.title}</p>}

        <label>Category</label>
        <select id="category" value={form.category} onChange={handleChange}>
          <option value="">-- select --</option>
          <option>Tutoring & education</option>
          <option>Freelance & digital work</option>
          <option>Part time & small jobs</option>
          <option>Babysitting & Household Help</option>
          <option>Delivery and Errands</option>
        </select>

        <label>City</label>
        <select id="city" value={form.city} onChange={handleChange}>
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

        <label>Description</label>
        <textarea
          id="description"
          rows="6"
          value={form.description}
          onChange={handleChange}
        />

        <label>Expected Pay</label>
        <input id="pay" value={form.pay} onChange={handleChange} />

        <label>Availability</label>
        <input
          id="availability"
          value={form.availability}
          onChange={handleChange}
        />

        <label>Contact Email</label>
        <input id="contactEmail" value={form.contactEmail} onChange={handleChange} />

        <label>Contact Phone</label>
        <input id="contactPhone" value={form.contactPhone} onChange={handleChange} />

        <button type="submit" className="post-request-butt">
          Post Job Request
        </button>
      </form>
    </div>
  );
};

export default PostRequestSection;
