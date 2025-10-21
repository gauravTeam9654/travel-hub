import { useState } from "react";

const faqs = [
  {
    question: "How can TravelHub help me plan a vacation within my budget?",
    answer:
      "We create customized travel plans that fit your budget by leveraging our vendor relationships to offer the best deals and maximize your travel experience.",
  },
  {
    question: "Why is travel insurance important for your trip?",
    answer:
      "Travel insurance protects you from unexpected events such as trip cancellations, medical emergencies, and lost luggage, ensuring peace of mind during your travels.",
  },
  {
    question: "What services does TravelHub offer for corporate travel?",
    answer:
      "We offer tailored corporate travel solutions including group bookings, event management, and 24/7 support for business travelers.",
  },
];

function FAQSection() {
  const [openIdx, setOpenIdx] = useState(0);
  return (
      <section style={{ background: "#fff", padding: "60px 0" }}>
        <div className="faq-section-inner" style={{ maxWidth: 1200, margin: "0 auto", display: "flex", flexWrap: "wrap", alignItems: "center", gap: 40 }}>
        {/* Left: FAQ Illustration */}
        <div style={{ flex: 1, minWidth: 320, display: "flex", justifyContent: "center", alignItems: "center", minHeight: 340 }}>
          <img src="/faqs.png" alt="FAQ" style={{ maxWidth: 540, width: "100%", height: "auto", display: "block" }} />
        </div>
        {/* Right: FAQ Accordion */}
        <div style={{ flex: 1, minWidth: 320, maxWidth: 540 }}>
          <h2 style={{ fontSize: 32, fontWeight: 700, marginBottom: 12, color: "#111" }}>Frequently Asked Questions</h2>
          <a href="/faq" style={{ color: "#ff6600", fontWeight: 500, fontSize: 16, marginBottom: 18, display: "inline-block", textDecoration: "underline" }}>View All FAQ's</a>
          <div style={{ marginTop: 18 }}>
            {faqs.map((faq, idx) => (
              <div key={idx} style={{ marginBottom: 8, borderRadius: 4, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
                <button
                  onClick={() => setOpenIdx(idx === openIdx ? -1 : idx)}
                  style={{
                    width: "100%",
                    background: idx === openIdx ? "#ff914d" : "#f7f7f7",
                    color: idx === openIdx ? "#fff" : "#222",
                    border: "none",
                    outline: "none",
                    padding: "18px 20px",
                    fontSize: 17,
                    fontWeight: 600,
                    textAlign: "left",
                    cursor: "pointer",
                    borderBottom: idx === openIdx ? "none" : "1px solid #eee",
                    transition: "background 0.2s, color 0.2s",
                  }}
                  aria-expanded={idx === openIdx}
                >
                  {faq.question}
                  <span style={{ float: "right", fontWeight: 400, fontSize: 22 }}>
                    {idx === openIdx ? "▲" : "▼"}
                  </span>
                </button>
                {idx === openIdx && (
                  <div style={{ background: "#fff", color: "#222", padding: "18px 20px", fontSize: 16, borderTop: "1px solid #eee" }}>
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
import React from "react";
import "../style.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, A11y, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const testimonials = [
  {
    text:
      "We recently went on a trip to Sikkim that took an unexpected turn when one of our friends fell ill. Although we couldn't complete the trip as planned, we want to express our gratitude to our trip coordinator, Diksha Chettri, for her exceptional support during this challenging time. We only managed to go to Nathula pass, it was an okay experience.",
    name: "Ishika Soni",
    location: "Bangalore",
  },
  {
    text:
      "TravelHub made our Bhutan trip seamless and memorable! The itinerary was well-planned and the support team was always available.",
    name: "Rahul Mehra",
    location: "Delhi",
  },
  {
    text:
      "Amazing experience in Meghalaya! The guides were knowledgeable and the accommodations were top-notch.",
    name: "Priya Sharma",
    location: "Mumbai",
  },
  {
    text:
      "Our Northeast adventure was unforgettable thanks to TravelHub's attention to detail and excellent service.",
    name: "Amit Verma",
    location: "Kolkata",
  },
];

const CaptivatingDestinations = () => {
  return (
    <>
      {/* FAQ Section  */}
      <FAQSection />

      {/* Testimonials  */}
      <section style={{ background: "linear-gradient(90deg, #ff914d 0%, #ff6e40 100%)", padding: "60px 0", color: "#fff", position: "relative" }}>
        <div className="orange-section-inner" style={{ maxWidth: 1200, margin: "0 auto", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 40 }}>
          {/* Left Column */}
          <div style={{ flex: 1, minWidth: 320, maxWidth: 500 }}>
            <h2 style={{ fontSize: 36, fontWeight: 700, marginBottom: 24 }}>We Make World Travel Easy</h2>
            <p style={{ fontSize: 18, marginBottom: 24, color: "#fff" }}>
              Traveling under your own power and at your own pace, you'll connect more meaningfully with your destination and have more fun!
            </p>
              {/* Button removed as requested */}
            <div className="info-boxes-responsive" style={{ display: "flex", gap: 24, marginTop: 16, flexWrap: "wrap" }}>
              <div style={{ background: "#fff", color: "#ff6600", borderRadius: 16, boxShadow: "0 2px 16px rgba(0,0,0,0.08)", padding: "24px 32px", minWidth: 150, textAlign: "center" }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>📍</div>
                <div style={{ fontWeight: 700, fontSize: 22, color: "#222" }}>15+</div>
                <div style={{ color: "#222", fontSize: 15, marginTop: 2 }}>Total Destinations</div>
              </div>
              <div style={{ background: "#fff", color: "#ff6600", borderRadius: 16, boxShadow: "0 2px 16px rgba(0,0,0,0.08)", padding: "24px 32px", minWidth: 150, textAlign: "center" }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>🗺️</div>
                <div style={{ fontWeight: 700, fontSize: 22, color: "#222" }}>6,758+</div>
                <div style={{ color: "#222", fontSize: 15, marginTop: 2 }}>Amazing Tours</div>
              </div>
              <div style={{ background: "#fff", color: "#ff6600", borderRadius: 16, boxShadow: "0 2px 16px rgba(0,0,0,0.08)", padding: "24px 32px", minWidth: 150, textAlign: "center" }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>🧑‍🤝‍🧑</div>
                <div style={{ fontWeight: 700, fontSize: 22, color: "#222" }}>18,963+</div>
                <div style={{ color: "#222", fontSize: 15, marginTop: 2 }}>Happy Customer</div>
              </div>
              <div style={{ background: "#fff", color: "#ff6600", borderRadius: 16, boxShadow: "0 2px 16px rgba(0,0,0,0.08)", padding: "24px 32px", minWidth: 150, textAlign: "center" }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>🌏</div>
                <div style={{ fontWeight: 700, fontSize: 22, color: "#222" }}>120+</div>
                <div style={{ color: "#222", fontSize: 15, marginTop: 2 }}>Global Partners</div>
              </div>
            </div>
          </div>
          {/* Right Column: Testimonial Slider */}
          <div style={{ flex: 1, minWidth: 320, maxWidth: 600, display: "flex", justifyContent: "center" }}>
            <div style={{ width: "100%", maxWidth: 500 }}>
              <Swiper
                modules={[Autoplay, Pagination, A11y]}
                spaceBetween={30}
                slidesPerView={1}
                loop={true}
                pagination={{ clickable: true }}
                autoplay={{ delay: 2000, disableOnInteraction: false }}
                style={{ padding: "30px 0" }}
              >
                {testimonials.map((testimonial, idx) => (
                  <SwiperSlide key={idx}>
                    <div
                      style={{
                        background: "rgba(255,255,255,0.08)",
                        borderRadius: "15px",
                        boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
                        padding: "40px 30px",
                        minHeight: 220,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <p style={{ fontStyle: "italic", color: "#fff", marginBottom: 20, textAlign: "center", fontSize: 18 }}>
                        {testimonial.text}
                      </p>
                      <div style={{ fontWeight: 600, color: "#fff" }}>{testimonial.name}</div>
                      <div style={{ color: "#ffe0b2", fontSize: 15 }}>{testimonial.location}</div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </section>

    </>
  );
};

export default CaptivatingDestinations;
