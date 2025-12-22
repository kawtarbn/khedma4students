import React from "react";
import HeroSection from "../components/HeroSection";
import CategoriesSection from "../components/CategoriesSection";
import WhyUsSection from "../components/WhyUsSection";
import StartSection from "../components/StartSection";
import edit1 from "../components/EditJobForm";
import JobList from "../components/JobList";
import RequestsList from "../components/RequestsList";
import Header from  "../components/Header";
import Footer from "../components/Footer";

const Home = () => {
  return (
    
    <main>
      <Header />
      <HeroSection />
      <CategoriesSection />
       <JobList />
       <RequestsList />
      <WhyUsSection />
      <StartSection />
      <Footer />
    </main>
  );
};

export default Home;
