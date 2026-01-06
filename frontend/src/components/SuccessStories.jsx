import React from "react";

const SuccessStories = () => {
  return (
    <section className="success-stories">
      <h2 className="success-title">Success Stories</h2>
      <p className="success-subtitle">
        See how Khedma4Students is helping the community
      </p>

      <div className="stories-container">
        {/* Card 1 */}
        <div className="story-card blue">
          <div className="story-header">
            <div className="avatar">AK</div>
            <div>
              <h4>Amina Kaci</h4>
              <span>Graphic Design Student - ESBA</span>
            </div>
          </div>

          <div className="rating">⭐ 4.9/5.0 from clients</div>

          <p className="story-text">
            "I found 3 freelance clients through Khedma4Students in my first
            month! The platform made it so easy to showcase my design work and
            connect with local businesses."
          </p>

          <span className="badge">15 Projects Completed</span>
        </div>

        {/* Card 2 */}
        <div className="story-card green">
          <div className="story-header">
            <div className="avatar green">AB</div>
            <div>
              <h4>Ahmed Benali</h4>
              <span>Parent - Algiers</span>
            </div>
          </div>

          <div className="rating">⭐ 5.0/5.0 from students</div>

          <p className="story-text">
            "Found an excellent math tutor for my son's Bac preparation. The
            student was professional, punctual, and my son's grades improved
            from 12 to 16!"
          </p>

          <span className="badge">Hired 3 Students</span>
        </div>

        {/* Card 3 */}
        <div className="story-card blue">
          <div className="story-header">
            <div className="avatar">YM</div>
            <div>
              <h4>Youcef Meziane</h4>
              <span>CS Student - USTHB</span>
            </div>
          </div>

          <div className="rating">⭐ 4.8/5.0 from clients</div>

          <p className="story-text">
            "Built my web development portfolio while earning 25,000 DA/month.
            The rating system helped me build trust with clients quickly!"
          </p>

          <span className="badge">22 Websites Built</span>
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
