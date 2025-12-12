import React, { useMemo, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ServiceCard from "../components/ServiceCard";
import ServiceFilters from "../components/ServiceFilters";


const servicesData = [
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

const categories = [
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
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [city, setCity] = useState("All Cities");

  const filtered = useMemo(() => {
    return servicesData.filter((s) => {
      const matchesSearch =
        !search ||
        s.title.toLowerCase().includes(search.toLowerCase()) ||
        s.description.toLowerCase().includes(search.toLowerCase());
      const matchesCategory =
        category === "All Categories" || s.category === category;
      const matchesCity = city === "All Cities" || s.city === city;
      return matchesSearch && matchesCategory && matchesCity;
    });
  }, [search, category, city]);

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
          total={filtered.length}
          onSearchChange={setSearch}
          onCategoryChange={setCategory}
          onCityChange={setCity}
        />

        <br />

        <div className="cards">
          {filtered.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}

