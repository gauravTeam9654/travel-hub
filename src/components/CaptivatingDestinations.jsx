// "/faqs.png"/
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, A11y, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const faqs = [
  {
    question: "How can TravelVista help me plan a vacation within my budget?",
    answer:
      "TravelVista curates customized journeys that match your style and budget, ensuring every moment feels exclusive without breaking the bank.",
  },
  {
    question: "Why should I consider travel insurance?",
    answer:
      "Travel insurance safeguards your plans from unforeseen events like cancellations or medical emergencies — giving you complete peace of mind.",
  },
  {
    question: "Does TravelVista provide corporate travel assistance?",
    answer:
      "Yes, we provide seamless business travel services, including priority booking, team coordination, and 24/7 concierge support.",
  },
];

const testimonials = [
  {
    text:
      "Our Maldives trip was beyond perfect! TravelVista handled every detail with such elegance. It truly felt like a luxury experience without the luxury price tag.",
    name: "Sanya Kapoor",
    location: "Mumbai",
  },
  {
    text:
      "An unforgettable journey to Bali. The team’s attention to detail and responsiveness made everything stress-free. Highly recommend TravelVista!",
    name: "Rohit Agarwal",
    location: "Delhi",
  },
  {
    text:
      "We chose TravelVista for our European honeymoon — it was magical. The itinerary was flawless, and their support was world-class.",
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

const CaptivatingDestinations = () => {
  return (
    <>
      <FAQSection />

      <section
        style={{
          background: "linear-gradient(135deg, #4f46e5 0%, #38bdf8 100%)",
          color: "#fff",
          padding: "100px 20px",
          transition: "all 0.5s ease",
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
            gap: 60,
          }}
        >
          {/* Left side */}
          <div style={{ flex: 1, minWidth: 320, maxWidth: 500 }}>
            <h2
              style={{
                fontSize: 40,
                fontWeight: 800,
                marginBottom: 20,
                lineHeight: 1.3,
                fontFamily: "Poppins, sans-serif",
              }}
            >
              Discover the World with{" "}
              <span style={{ color: "#facc15" }}>TravelVista</span>
            </h2>
            <p
              style={{
                fontSize: 18,
                lineHeight: 1.8,
                marginBottom: 30,
                fontFamily: "Inter, sans-serif",
                color: "rgba(255,255,255,0.9)",
              }}
            >
              From breathtaking escapes to seamless travel planning, we make
              your journey as beautiful as your destination.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                gap: 22,
              }}
            >
              {[
                { icon: "🌍", label: "20+ Destinations" },
                { icon: "🗺️", label: "7,000+ Tours" },
                { icon: "😊", label: "25,000+ Happy Travelers" },
                { icon: "🤝", label: "150+ Global Partners" },
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    background: "rgba(255,255,255,0.15)",
                    borderRadius: 18,
                    padding: "24px",
                    textAlign: "center",
                    boxShadow: "0 6px 14px rgba(0,0,0,0.1)",
                    transform: "scale(1)",
                    transition: "all 0.4s ease",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.05)";
                    e.currentTarget.style.background = "rgba(255,255,255,0.25)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.background = "rgba(255,255,255,0.15)";
                  }}
                >
                  <div style={{ fontSize: 34, marginBottom: 8 }}>{item.icon}</div>
                  <div
                    style={{
                      fontSize: 16,
                      fontWeight: 600,
                      color: "#fff",
                      letterSpacing: "0.3px",
                    }}
                  >
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonials */}
          <div style={{ flex: 1, minWidth: 320, maxWidth: 580 }}>
            <Swiper
              modules={[Autoplay, Pagination, A11y]}
              spaceBetween={30}
              slidesPerView={1}
              loop={true}
              pagination={{ clickable: true }}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
            >
              {testimonials.map((t, idx) => (
                <SwiperSlide key={idx}>
                  <div
                    style={{
                      // background: "rgba(255,255,255,0.12)",
                      // borderRadius: 22,
                      padding: "48px 36px",
                      minHeight: 260,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      // boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                      backdropFilter: "blur(12px)",
                      transition: "all 0.4s ease",
                    }}
                  >
                    <p
                      style={{
                        fontStyle: "italic",
                        color: "#f0f9ff",
                        fontSize: 18,
                        lineHeight: 1.8,
                        marginBottom: 24,
                        textAlign: "center",
                        transition: "opacity 0.4s ease",
                      }}
                    >
                      “{t.text}”
                    </p>
                    <div
                      style={{
                        fontWeight: 700,
                        color: "#fde68a",
                        textAlign: "center",
                        marginBottom: 6,
                      }}
                    >
                      {t.name}
                    </div>
                    <div
                      style={{
                        fontSize: 15,
                        color: "#bae6fd",
                        textAlign: "center",
                      }}
                    >
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
