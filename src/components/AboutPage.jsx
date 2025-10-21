import React from "react";
import Navbar from "./Navbar";
import WhyChoose from "./WhyChoose";
import MergedFooter from "./TourGuideFooter";
import Testimonials from "./Testimonials";
import "../style.css"; 
import "../AboutPage.css"; 

const AboutPage = () => {
  return (
    <div style={{ background: "#fff" }}>
      <Navbar fixed />

      {/* Hero banner */}
      <section
        style={{
          position: "relative",
          width: "100%",
          minHeight: 380,
          height: "48vh",
          background: 'url("/darjeeling-final.png") center/cover no-repeat',
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.28)",
          }}
        />
        <img
          src="/Gradient.png"
          alt="overlay"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.9 }}
        />
        <h1 style={{ position: "relative", zIndex: 1, color: "#111", fontSize: 56, fontWeight: 800, marginLeft: 32 }}>
          About us
        </h1>
      </section>

      <section className="about-grid">
        <img
          className="about-image"
          src="/darjeeling-final.png"
          alt="Darjeeling toy train"
        />
        <div className="about-text">
          <h2 className="about-title">We Are TravelHub</h2>
          <p className="about-copy">
            TravelHub is a reputed travel company organising curated trips to Sikkim, North–East India, Bhutan and
            neighbouring destinations. From humble beginnings to serving travellers across the globe, we focus on
            thoughtful planning, reliable on-ground partners and great value.
          </p>
          <p className="about-copy">
            Our experienced team ensures every journey is memorable—whether you want a relaxed family vacation or an
            adventure-filled escape. Explore our handpicked packages or request a custom itinerary designed around your
            interests. Let’s make your next holiday easy, flexible and unforgettable.
          </p>
        </div>
      </section>

  <Testimonials />

      {/* Why Choose */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "16px 24px" }}>
        <WhyChoose />
      </div>

      <MergedFooter />
    </div>
  );
};

export default AboutPage;
