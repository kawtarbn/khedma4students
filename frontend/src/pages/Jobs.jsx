import React, { useEffect, useMemo, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import JobCard from "../components/JobCards";
import JobFilters from "../components/JobFilters";
import { getJobs, deleteJob } from "../api"; // ✅ use backend API

const categories = [
  "All Categories",
  "Education & Tutoring",
  "Digital & Freelance",
  "Service & Delivery",
  "Interships",
  "Health & Wellness",
  "Home & Family Help",
  "Events & Temporary Work",
];

const cities = [
  "All Cities",
  "Adrar","Chlef","Laghouat","Oum El Bouaghi","Batna","Béjaïa","Biskra","Béchar",
  "Blida","Bouira","Tamanrasset","Tébessa","Tlemcen","Tiaret","Tizi Ouzou",
  "Alger","Djelfa","Jijel","Sétif","Saïda","Skikda","Sidi Bel Abbès","Annaba",
  "Guelma","Constantine","Médéa","Mostaganem","MSila","Mascara","Ouargla",
  "Oran","El Bayadh","Illizi","Bordj Bou Arreridj","Boumerdès","El Tarf",
  "Tindouf","Tissemsilt","El Oued","Khenchela","Souk Ahras","Tipaza","Mila",
  "Aïn Defla","Naâma","Aïn Témouchent","Ghardaïa","Relizane","Timimoun",
  "Bordj Badji Mokhtar","Ouled Djellal","Béni Abbès","In Salah","In Guezzam",
  "Touggourt","Djanet","El MGhair","El Meniaa",
];

export default function Jobs() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [city, setCity] = useState("All Cities");

  const [jobs, setJobs] = useState([]);        // ✅ real jobs from backend
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const refreshJobs = async () => {
    try {
      setError("");
      setLoading(true);
      const res = await getJobs();
      setJobs(res.data || []);
    } catch (e) {
      console.error(e);
      setError("Failed to load jobs. Check backend/server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshJobs();
  }, []);

  const handleDelete = async (id) => {
    const ok = window.confirm("Delete this job?");
    if (!ok) return;

    try {
      await deleteJob(id);
      // minimal update: refetch from server
      refreshJobs();
    } catch (e) {
      console.error(e);
      alert("Failed to delete job.");
    }
  };

  const filtered = useMemo(() => {
    return jobs.filter((j) => {
      const title = (j.title || "").toLowerCase();
      const description = (j.description || "").toLowerCase();
      const s = search.toLowerCase();

      const matchesSearch =
        !search || title.includes(s) || description.includes(s);

      // IMPORTANT: your backend categories are like "Tutoring & education"
      // but your friend’s filter list uses different labels.
      // Minimal change: if category is not "All Categories", do strict match.
      const matchesCategory =
        category === "All Categories" || j.category === category;

      const matchesCity = city === "All Cities" || j.city === city;

      return matchesSearch && matchesCategory && matchesCity;
    });
  }, [jobs, search, category, city]);

  return (
    <div>
      <Header variant="guest" />

      <section className="homee">
        <h2>Job Opportunities</h2>
        <p>Browse job requests posted by employers</p>

        <JobFilters
          categories={categories}
          cities={cities}
          total={filtered.length}
          onSearchChange={setSearch}
          onCategoryChange={setCategory}
          onCityChange={setCity}
        />

        {loading && <p>Loading jobs...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        <div className="job-list">
          {!loading && !error && filtered.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onDelete={handleDelete} // ✅ delete button handler
            />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
