import React from "react";
import { Link } from "react-router-dom";
import PostJobSection from "../components/PostJobSection";
import TipsSection from "../components/TipsSection";

const PostJob = () => {
  return (
    <main>

      
      <Link to="/" className="go-back-home">
        ← Go back Home
      </Link>

      <PostJobSection />
      <TipsSection />
    </main>
  );
};

export default PostJob;
