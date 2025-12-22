import React, { useState } from "react";
import { Link } from "react-router-dom"; 
import PostRequestSection from "../components/PostRequestSection";
import Tips2Section from "../components/Tips2Section";
import HowItWorks from "../components/HowItWorks";


const PostRequest = () => {
  return (
    <main>
      {/* Go Back Home Link */}
      <Link to="/" className="go-back-home">
        ← Go back Home
      </Link>

      <section className="req">
        <h2>Post a Job Request</h2>
        <p>Students: Let employers know what kind of jobs you want to apply for</p>

        <PostRequestSection />
        <Tips2Section />
        <input 
          type="submit" 
          value="Post Job Request" 
          className="post-request-butt" 
        />
        <HowItWorks />
      </section>
    </main>
  );
};

export default PostRequest;
