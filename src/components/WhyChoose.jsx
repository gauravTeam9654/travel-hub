import React from "react";

const features = [
  {
    icon: <img src="/ultimate-flexibility.png" alt="Ultimate flexibility" style={{ width: 48, height: 48 }} />, 
    title: "Ultimate flexibility",
    desc: "You’re in control, with free cancellation and payment.",
  },
  {
    icon: <img src="/Memorable-experiences.png" alt="Memorable experiences" style={{ width: 48, height: 48 }} />, // Use image instead of emoji
    title: "Memorable experiences",
    desc: "Browse and book tours and activities so incredible, you’ll.",
  },
  {
    icon: <img src="/quality-core.png" alt="Quality at our core" style={{ width: 48, height: 48 }} />,
    title: "Quality at our core",
    desc: "High quality standards. Millions of reviews. A tourz company.",
  },
  {
    icon: <img src="/Award-winning support.png" alt="Award-winning support" style={{ width: 48, height: 48 }} />,
    title: "Award-winning support",
    desc: "New price? New plan? No problem. We’re here to help, 24/7.",
  },
];

const WhyChoose = () => (
  <section className="why-choose">
    <h2 className="why-choose-title">Why choose TravelHub</h2>
    <div className="why-features">
      {features.map((f) => (
        <div className="why-feature" key={f.title}>
          <div className="why-icon">{f.icon}</div>
          <div className="why-feature-title">{f.title}</div>
        <div className="why-feature-desc lighter-desc">{f.desc}</div>
        </div>
      ))}
    </div>
  </section>
);

export default WhyChoose;

