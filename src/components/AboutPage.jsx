import React from "react";
import Navbar from "./Navbar";
import WhyChoose from "./WhyChoose";
import MergedFooter from "./TourGuideFooter";
import Testimonials from "./Testimonials";
import { Users, Shield, Map, Star, Heart, Award } from "lucide-react";
import "../style.css"; 
import "../AboutPage.css"; 

const AboutPage = () => {
  return (
    <div style={{ background: "#fcfcfc" }}>
      <Navbar fixed />

      {/* Modern Hero Section */}
      <section className="about-hero">
        <div className="about-hero-overlay" />
        <div className="about-hero-content">
          <span className="about-hero-tag">ESTABLISHED SINCE 2012</span>
          <h1>The Complete Travel <span className="text-orange">Solution</span></h1>
          <p>Over 12 years of crafting unforgettable memories across the globe.</p>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="about-section">
        <div className="container">
          <div className="about-flex">
            <div className="about-content">
              <h2 className="section-subtitle">Our Story</h2>
              <h3 className="section-title">A Decade of Dedicated Service</h3>
              <p className="about-paragraph">
                With over <strong>12 years of dedicated service</strong> in the travel industry, we specialize in creating personalized journeys that reflect the unique preferences of each client. Our mission is to take the stress out of planning, ensuring that every detail—from flights and accommodations to local experiences—is seamlessly arranged.
              </p>
              <p className="about-paragraph">
                By combining our expertise, trusted partnerships, and passion for exploration, we aim to deliver experiences that go beyond expectations. At the heart of our work is a commitment to building lifelong relationships with our clients, making every journey unforgettable and every traveler feel valued.
              </p>
            </div>
            <div className="about-image-wrapper">

              <img
                className="about-main-image"
                src="/darjeeling-final.png"
                alt="Travel experiences"
              />
              <div className="image-experience-badge">
                <Award size={24} />
                <span>Premium Quality</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Beliefs & Mission Section */}
      <section className="values-section">
        <div className="container">
          <div className="values-header">
            <h2 className="section-title-alt">Our Mission & Values</h2>
            <p className="section-desc-alt">We believe travel is not just about visiting destinations but about building memories and meaningful connections.</p>
          </div>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon"><Map size={32} /></div>
              <h4>Personalized Journeys</h4>
              <p>Every itinerary is crafted to reflect your unique preferences and travel style.</p>
            </div>
            <div className="value-card">
              <div className="value-icon"><Shield size={32} /></div>
              <h4>Seamless Planning</h4>
              <p>From flights to local experiences, we handle every detail so you can travel stress-free.</p>
            </div>
            <div className="value-card">
              <div className="value-icon"><Heart size={32} /></div>
              <h4>Meaningful Connections</h4>
              <p>We focus on building lifelong relationships with our clients through exceptional service.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* Why Choose Section Integration */}
      <div className="about-why-choose">
        <WhyChoose />
      </div>

      <MergedFooter />
    </div>
  );
};

export default AboutPage;

