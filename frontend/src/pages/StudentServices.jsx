import React, { useState, useMemo, useEffect } from "react";
import { getRequests } from "../api"; // API call to get all requests
import ServiceCard from "../components/ServiceCard";
import ServiceFilters from "../components/ServiceFilters"; // Filters component

const categories = [
  "Education & Tutoring",
  "Digital & Freelance",
  "Service & Delivery",
  "Internships",
  "Health & Wellness",
  "Home & Family Help",
  "Events & Temporary Work",
];

const cities = [
  "All Cities",
  "Adrar",
  "Chlef",
  "Laghouat",
  "Oum El Bouaghi",
  "Batna",
  "Béjaïa",
  "Biskra",
  "Béchar",
  "Blida",
  "Bouira",
  "Tamanrasset",
  "Tébessa",
  "Tlemcen",
  "Tiaret",
  "Tizi Ouzou",
  "Alger",
  "Djelfa",
  "Jijel",
  "Sétif",
  "Saïda",
  "Skikda",
  "Sidi Bel Abbès",
  "Annaba",
  "Guelma",
  "Constantine",
  "Médéa",
  "Mostaganem",
  "MSila",
  "Mascara",
  "Ouargla",
  "Oran",
  "El Bayadh",
  "Illizi",
  "Bordj Bou Arreridj",
  "Boumerdès",
  "El Tarf",
  "Tindouf",
  "Tissemsilt",
  "El Oued",
  "Khenchela",
  "Souk Ahras",
  "Tipaza",
  "Mila",
  "Aïn Defla",
  "Naâma",
  "Aïn Témouchent",
  "Ghardaïa",
  "Relizane",
  "Timimoun",
  "Bordj Badji Mokhtar",
  "Ouled Djellal",
  "Béni Abbès",
  "In Salah",
  "In Guezzam",
  "Touggourt",
  "Djanet",
  "El MGhair",
  "El Meniaa",
];

export default function StudentServices() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [city, setCity] = useState("All Cities");

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await getRequests(); // Fetch all requests from backend
        setRequests(res.data); // Set the requests data
      } catch (err) {
        console.error("Error fetching requests:", err);
        setRequests([]);
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  const filtered = useMemo(() => {
    return requests.filter((s) => {
      const matchesSearch =
        !search ||
        s.title.toLowerCase().includes(search.toLowerCase()) ||
        s.description.toLowerCase().includes(search.toLowerCase());
      const matchesCategory =
        category === "All Categories" || s.category === category;
      const matchesCity = city === "All Cities" || s.city === city;
      return matchesSearch && matchesCategory && matchesCity;
    });
  }, [search, category, city, requests]);

  if (loading) return <p>Loading requests...</p>;
  if (requests.length === 0) return <p>No requests found.</p>;

  return (
    <div>
      <ServiceFilters
        categories={categories}
        cities={cities}
        total={filtered.length}
        onSearchChange={setSearch}    // Ensure search change is passed to parent
        onCategoryChange={setCategory} // Ensure category change is passed to parent
        onCityChange={setCity}        // Ensure city change is passed to parent
      />
      <div className="cards">
        {filtered.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  );
}
