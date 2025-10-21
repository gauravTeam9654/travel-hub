import React, { useEffect } from "react";
import Navbar from "./Navbar";
import TopDestinations from "./TopDestinations";
import WhyChoose from "./WhyChoose";
import Testimonials from "./Testimonials";
import MergedFooter from "./TourGuideFooter";
import "../Destinations.css";

const Destinations = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="destinations-page">
      <Navbar />

      {/* Hero */}
      <section className="destinations-hero">
        <div className="overlay" />
        <img className="gradient" src="/Gradient.png" alt="overlay" />
        <div className="hero-inner">
          <h1>Destinations</h1>
        </div>
      </section>

      {/* Intro */}
      <section className="destinations-intro">
        <div className="intro-inner">
          <h2>Destinations in India</h2>
          <p>
            Backpack Tours are a revolutionary way to travel, designed for those who seek adventure,
            freedom, and authenticity. Unlike traditional travel, backpack tours focus on minimalist,
            cost‑effective, and experience‑driven journeys. You’ll connect with new cultures, discover
            hidden gems, and enjoy the camaraderie of fellow travelers. It’s not just a trip—it’s a
            lifestyle that inspires exploration and spontaneity.
          </p>
          <p>
            Whether it’s a trek to the Himalayas, a serene escape to Kerala’s backwaters, or a road trip
            through Ladakh’s rugged terrains, our Backpack Tours allow you to explore with ease, embrace the
            unknown, and create lifelong memories.
          </p>
        </div>
      </section>

      {/* Top Destinations grid (reused) */}
      <TopDestinations />

      {/* Why Choose (reused) */}
      <div className="why-choose-wrap">
        <WhyChoose />
      </div>

      {/* Testimonials slider with orange background */}
      <Testimonials />

      {/* Tour Guide + Footer combined */}
      <MergedFooter />
    </div>
  );
};

export default Destinations;
