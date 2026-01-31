import React, { useMemo, useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ServiceCard from "../components/ServiceCard";
import ServiceFilters from "../components/ServiceFilters";

// Keep the original services data
const originalServicesData = [
  {
    title: "Graphic Designer Available for Freelance Work",
    city: "Oran",
    rating: "4.8 (8)",
    description:
      "Computer Science student offering graphic design services. Experienced in logos, posters, social media content. Available evenings and weekends.",
    category: "Freelance & Digital Work",
    availability: "Mon-Fri: 6PM-10PM, Weekends: All day",
    author: "Amina Kaci",
  },
  {
    title: "Web Developer Available - React & Node.js",
    city: "Annaba",
    rating: "5 (15)",
    description:
      "Engineering student specializing in web development. Can build websites, web apps, and provide maintenance.",
    category: "Freelance & Digital Work",
    availability: "Flexible schedule, remote preferred",
    author: "Youcef Meziane",
  },
  {
    title: "English Lessons Available - All Levels",
    city: "Tlemcen",
    rating: "4.9 (20)",
    description:
      "Bilingual student offering English lessons for all levels. IELTS prep available.",
    category: "Tutoring & Education",
    availability: "Tue/Thu/Sat 2PM-6PM",
    author: "Sarah Hadj",
  },
  {
    title: "Translation Services - French/Arabic/English",
    city: "Algiers",
    rating: "4.6 (11)",
    description:
      "Languages student offering professional translation services. Quick delivery.",
    category: "Freelance & Digital Work",
    availability: "Available every day",
    author: "Karim Belkacem",
  },
];

export default function StudentServices() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [city, setCity] = useState("All Cities");
  const [apiServices, setApiServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Combine original data with API data
  const allServices = [...originalServicesData, ...apiServices];

  // Fetch services from API
  useEffect(() => {
    fetchServices();
  }, [search, category, city]);

  const fetchServices = async () => {
    try {
      setLoading(true);
      setError("");
      
      // Build query parameters
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (category !== "All Categories") params.append('category', category);
      if (city !== "All Cities") params.append('city', city);
      
      const response = await fetch(`http://127.0.0.1:8000/api/student-services?${params}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch services');
      }
      
      const data = await response.json();
      setApiServices(data.data || []);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching services:', err);
    } finally {
      setLoading(false);
    }
  };

  // Filter all services (original + API)
  const filteredServices = useMemo(() => {
    return allServices.filter((s) => {
      const matchesSearch =
        !search ||
        s.title.toLowerCase().includes(search.toLowerCase()) ||
        s.description.toLowerCase().includes(search.toLowerCase());
      const matchesCategory =
        category === "All Categories" || s.category === category;
      const matchesCity = city === "All Cities" || s.city === city;
      return matchesSearch && matchesCategory && matchesCity;
    });
  }, [search, category, city, allServices]);

  const categories = [
    "All Categories",
    "Freelance & Digital Work",
    "Tutoring & Education",
    "Service & Delivery",
    "Health & Wellness",
    "Home & Family Help",
    "Events & Temporary Work",
  ];

  const cities = [
    "All Cities",
    "Alger", "Oran", "Constantine", "Annaba", "Blida", "Batna",
    "Sétif", "Tlemcen", "Béjaïa", "Mostaganem", "Bordj Bou Arreridj",
    "Boumerdès", "El Oued", "Skikda", "Jijel", "Biskra", "Béchar",
    "Tébessa", "Tiaret", "Médéa", "Tizi Ouzou", "Mila", "Aïn Defla",
  ];

  return (
    <div>
      <Header variant="guest" />
      <Header variant="student" />
      <Header variant="employer" />

      <section className="studentServices">
        <h2>Student Services</h2>
        <p>Browse services offered by talented students</p>

        <ServiceFilters
          categories={categories}
          cities={cities}
          total={filteredServices.length}
          onSearchChange={setSearch}
          onCategoryChange={setCategory}
          onCityChange={setCity}
        />

        <br />

        {/* Loading State */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <div style={{ fontSize: '16px', color: '#666' }}>Loading more services...</div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <div style={{ fontSize: '16px', color: '#ff4444' }}>Error loading additional services: {error}</div>
          </div>
        )}

        {/* Services List - Original + API */}
        <div className="cards">
          {filteredServices.map((service, index) => (
            <ServiceCard key={`${service.title || service.id}-${index}`} service={service} />
          ))}
        </div>

        {/* No Results */}
        {!loading && !error && filteredServices.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <div style={{ fontSize: '18px', color: '#666' }}>
              No services found matching your criteria.
            </div>
            <button 
              onClick={() => {
                setSearch("");
                setCategory("All Categories");
                setCity("All Cities");
              }}
              style={{
                marginTop: '10px',
                padding: '10px 20px',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              Clear Filters
            </button>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}

