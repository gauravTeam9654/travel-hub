// "/faqs.png"/
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, A11y, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const faqs = [
  {
    question: "How can TravelHub help me plan a vacation within my budget?",
    answer:
      "TravelHub curates customized journeys that match your style and budget, ensuring every moment feels exclusive without breaking the bank.",
  },
  {
    question: "Why should I consider travel insurance?",
    answer:
      "Travel insurance safeguards your plans from unforeseen events like cancellations or medical emergencies — giving you complete peace of mind.",
  },
  {
    question: "Does TravelHub provide corporate travel assistance?",
    answer:
      "Yes, we provide seamless business travel services, including priority booking, team coordination, and 24/7 concierge support.",
  },
];

const testimonials = [
  {
    text:
      "Our Maldives trip was beyond perfect! TravelHub handled every detail with such elegance. It truly felt like a luxury experience without the luxury price tag.",
    name: "Sanya Kapoor",
    location: "Mumbai",
  },
  {
    text:
      "An unforgettable journey to Bali. The team’s attention to detail and responsiveness made everything stress-free. Highly recommend TravelHub!",
    name: "Rohit Agarwal",
    location: "Delhi",
  },
  {
    text:
      "We chose TravelHub for our European honeymoon — it was magical. The itinerary was flawless, and their support was world-class.",
    name: "Anjali & Karan",
    location: "Pune",
  },
];

function FAQSection() {
  const [openIdx, setOpenIdx] = useState(0);
  return (
    <section
      style={{
        background: "linear-gradient(135deg, #f8f9fc 0%, #eef3f9 100%)",
        padding: "90px 20px",
        transition: "all 0.5s ease-in-out",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 40,
        }}
      >
        {/* Illustration */}
        <div
          style={{
            flex: 1,
            minWidth: 320,
            display: "flex",
            justifyContent: "center",
            transform: "translateY(0px)",
            transition: "transform 0.8s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-10px)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0px)")}
        >
          <img
            src="/faqs.png"
            alt="FAQ Illustration"
            style={{
              maxWidth: 480,
              width: "100%",
              height: "auto",
              // filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.1))",
              transition: "all 0.5s ease",
            }}
          />
        </div>

        {/* FAQ List */}
        <div style={{ flex: 1, minWidth: 320 }}>
          <h2
            style={{
              fontSize: 36,
              fontWeight: 800,
              color: "#1a2b49",
              marginBottom: 16,
              fontFamily: "Poppins, sans-serif",
              letterSpacing: "0.5px",
              transition: "color 0.3s ease",
            }}
          >
            Frequently Asked Questions
          </h2>
          <p
            style={{
              color: "#4a5568",
              marginBottom: 28,
              fontSize: 18,
              fontFamily: "Inter, sans-serif",
              lineHeight: 1.6,
            }}
          >
            Everything you need to know before you start your next adventure.
          </p>

          {faqs.map((faq, idx) => (
            <div
              key={idx}
              style={{
                marginBottom: 12,
                borderRadius: 14,
                overflow: "hidden",
                border: idx === openIdx ? "1px solid #4f46e5" : "1px solid #e2e8f0",
                background: idx === openIdx ? "rgba(79,70,229,0.05)" : "#fff",
                boxShadow:
                  idx === openIdx
                    ? "0 6px 18px rgba(79,70,229,0.12)"
                    : "0 3px 8px rgba(0,0,0,0.04)",
                transition: "all 0.4s ease",
              }}
            >
              <button
                onClick={() => setOpenIdx(idx === openIdx ? -1 : idx)}
                style={{
                  width: "100%",
                  background: "transparent",
                  border: "none",
                  padding: "22px 26px",
                  fontSize: 17,
                  fontWeight: 600,
                  color: "#1a2b49",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  transition: "background 0.4s ease, color 0.4s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(79,70,229,0.08)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                {faq.question}
                <span
                  style={{
                    fontSize: 22,
                    color: idx === openIdx ? "#4f46e5" : "#64748b",
                    transition: "color 0.3s ease",
                  }}
                >
                  {idx === openIdx ? "−" : "+"}
                </span>
              </button>
              {idx === openIdx && (
                <div
                  style={{
                    background: "#fff",
                    color: "#4a5568",
                    padding: "18px 26px 26px",
                    fontSize: 16,
                    lineHeight: 1.7,
                    opacity: 1,
                    transform: "translateY(0)",
                    transition: "all 0.4s ease",
                  }}
                >
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import "./CaptivatingDestinations.css";

const CaptivatingDestinations = () => {
  return (
    <>
      <FAQSection />

      <section className="captivating-section">
        <div className="captivating-overlay" />
        <div className="captivating-container">
          {/* LEFT CONTENT */}
          <div className="captivating-left">
            <h2 className="captivating-title">
              Discover the World with{" "}
              <span style={{ color: "#ff7a18" }}>Travel<span style={{color:"#2b78e3ff"}}>Hub</span></span>
            </h2>

            <p className="captivating-desc">
              From breathtaking escapes to seamless travel planning, we curate journeys
              that stay with you forever.
            </p>

            {/* STATS */}
            <div className="stats-grid">
              {[
                { icon: "🌍", label: "20+ Destinations" },
                { icon: "🗺️", label: "7,000+ Tours" },
                { icon: "😊", label: "25,000+ Travelers" },
                { icon: "🤝", label: "150+ Partners" },
              ].map((item, i) => (
                <div key={i} className="stat-card">
                  <div className="stat-icon">
                    {item.icon}
                  </div>
                  <div className="stat-label">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* TESTIMONIALS */}
          <div className="captivating-right">
            <Swiper
              modules={[Autoplay, Pagination, A11y]}
              spaceBetween={30}
              slidesPerView={1}
              loop
              pagination={{ clickable: true }}
              autoplay={{ delay: 3500, disableOnInteraction: false }}
            >
              {testimonials.map((t, idx) => (
                <SwiperSlide key={idx}>
                  <div className="testimonial-card">
                    <p className="testimonial-text">
                      “{t.text}”
                    </p>

                    <div className="testimonial-name">
                      {t.name}
                    </div>

                    <div className="testimonial-location">
                      {t.location}
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>
    </>
  );
};

export default CaptivatingDestinations;
