import React, { useMemo } from "react";
import Navbar from "./Navbar";
import MergedFooter from "./TourGuideFooter";
import FAQAccordion from "./FAQAccordion";
import "../style.css";
import "../Faqs.css";
import {
  meghalayaPackages,
  bhutanPackages,
  gangtokPackages,
  darjeelingPackages,
  arunachalPackages,
} from "../data/tourpackages";

const mergeFaqs = (packagesArr) => {
  const seen = new Set();
  const out = [];
  (packagesArr || []).forEach((p) => {
    (p.faq || []).forEach((f) => {
      const key = (f.q || "").trim().toLowerCase();
      if (!seen.has(key) && f.q && f.a) {
        seen.add(key);
        out.push({ q: f.q, a: f.a });
      }
    });
  });
  return out;
};

const FaqSection = ({ title, faqs }) => {
  if (!faqs || faqs.length === 0) return null;
  return (
    <section className="faq-page-section">
      <h2 className="faq-page-heading">{title}</h2>
      <FAQAccordion faqs={faqs} />
    </section>
  );
};

const FaqPage = () => {
  const data = useMemo(() => (
    [
      { title: "Meghalaya", faqs: mergeFaqs(meghalayaPackages) },
      { title: "Bhutan", faqs: mergeFaqs(bhutanPackages) },
      { title: "Sikkim", faqs: mergeFaqs(gangtokPackages) },
      { title: "Darjeeling", faqs: mergeFaqs(darjeelingPackages) },
      { title: "Arunachal Pradesh", faqs: mergeFaqs(arunachalPackages) },
    ]
  ), []);

  return (
    <div style={{ background: "#fff" }}>
      <Navbar />

      {/* Hero banner */}
      <section
        className="faq-hero"
        style={{
          position: "relative",
          width: "100%",
          minHeight: 280,
          height: "36vh",
          background: 'url("/darjeeling-final.png") center/cover no-repeat',
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <div
          style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.28)" }}
        />
        <img
          src="/Gradient.png"
          alt="overlay"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.9 }}
        />
        <h1 style={{ position: "relative", zIndex: 1, color: "#111", fontSize: 50, fontWeight: 800, marginLeft: 32 }}>
          FAQ's
        </h1>
      </section>

      <main className="faq-page-container">
        {data.map((sec) => (
          <FaqSection key={sec.title} title={sec.title} faqs={sec.faqs} />)
        )}
      </main>

      <MergedFooter />
    </div>
  );
};

export default FaqPage;
