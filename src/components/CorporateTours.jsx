import React from "react";
import Navbar from "./Navbar";
import WhyChoose from "./WhyChoose";
import MergedFooter from "./TourGuideFooter";
import "../CorporateTours.css";

const CorporateTours = () => {
  return (
    <div className="corp-page">
      <Navbar fixed />

      {/* Hero Section */}
      <section className="corp-hero" aria-label="Corporate Tours">
        <div className="corp-hero-overlay" />
        <img className="corp-hero-gradient" src="/Gradient.png" alt="" aria-hidden="true" />
        <h1 className="corp-hero-title">Corporate Tours</h1>
      </section>

      {/* Intro Grid */}
      <section className="corp-intro container">
        <div className="corp-intro-media">
          <img src="/darjeeling-final.png" alt="Darjeeling Toy Train" />
        </div>
        <div className="corp-intro-copy">
          <p>
            Boost your team’s unity with our custom‑made Corporate Tours that mix business goals and memorable
            travel. We create the right balance of work and fun to energize, push, and refresh your team, whether
            you’re organizing a strategy meeting, a team‑bonding trip, or a gift tour.
          </p>
          <p>
            At <strong>TravelHub</strong>, we know each company has its own aims and group spirit. This is why you
            can tailor our Corporate Tours to fit your company’s style, budgets, and conditions. We craft
            experiences that make every moment special—from quiet spots for deep talks to lively events that bring
            people closer.
          </p>
        </div>
      </section>

        {/* Why Choose reuse */}
      <div className="container">
        <WhyChoose />
      </div>


      {/* Highlight Section */}
      <section className="corp-highlight container">
        <div className="corp-highlight-media">
          <img src="/bhutan-final.avif" alt="Valleys of Bhutan" />
        </div>
        <div className="corp-highlight-copy">
          <h3 className="corp-highlight-heading">Valleys of Bhutan</h3>
          <p>
            Whether you’re heading to the hills for the weekend or exploring a new culture overseas, our tours have a
            powerful effect on people. They make employees happier, lift spirits, and help build a stronger, more
            united team. We plan and run these trips like pros.
          </p>
          <p>Let us make your next company trip a smart way to invest in your staff.</p>
        </div>
      </section>

      {/* CTA */}
      <section className="corp-cta" aria-label="Call to action">
        <div className="container">
          <h2>Book your company tour now – where work and wonder come together.</h2>
          {/* <a className="corp-cta-btn" href="/b2b-enquiry">Contact us now »</a> */}
        </div>
      </section>

      

      {/* Tour Guide Footer + Footer combined component */}
      <MergedFooter />
    </div>
  );
};

export default CorporateTours;
