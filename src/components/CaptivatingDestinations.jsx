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
    text: "Thanks to the excellent services and guidance from Travel Hub, our US visa renewal process was incredibly smooth and hassle-free. Highly recommend their services to anyone seeking reliable travel assistance!",
    name: "Ashok Kumar Yadav",
    location: "Local Guide",
  },
  {
    text: "The Travel Hub team is incredibly supportive and provides highly efficient services. They helped me secure a visa within a very short timeframe for my business travel, making the entire process seamless and hassle-free. Highly recommend their services.",
    name: "Meenakshi Ajith",
    location: "Satisfied Client",
  },
  {
    text: "Got best price for my Europe trip and best in service. Very smooth and wonderful services. Thanks Mr Ajay Rawat, thanks a lot!",
    name: "Santosh Santosh",
    location: "Happy Traveller",
  },
  {
    text: "We planned a weekend trip to Jim Corbett & our experience with Travel Hub was superb. They offered choice of properties at a great price & all facilities. Special Thanks to team Travel Hub for their service.",
    name: "Deepak Dhingra",
    location: "Happy Traveller",
  },
  {
    text: "Ajay is a phenomenal person. He worked with me for multiple bookings and always delivered exceptional service with great attention to detail.",
    name: "Siddhartha Pramanik",
    location: "Loyal Client",
  },
];

function FAQSection() {
  const [openIdx, setOpenIdx] = useState(0);
  return (
    <section className="faq-section">
      <div className="faq-container">
        {/* Illustration */}
        <div
          className="faq-illustration"
          onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-10px)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0px)")}
        >
          <img
            src="/faqs.png"
            alt="FAQ Illustration"
            className="faq-illustration-img"
          />
        </div>

        {/* FAQ List */}
        <div className="faq-list">
          <h2 className="faq-title">
            Frequently Asked Questions
          </h2>
          <p className="faq-subtitle">
            Everything you need to know before you start your next adventure.
          </p>

          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className={`faq-item ${idx === openIdx ? "faq-item--active" : ""}`}
            >
              <button
                onClick={() => setOpenIdx(idx === openIdx ? -1 : idx)}
                className="faq-question"
              >
                <span>{faq.question}</span>
                <span className={`faq-icon ${idx === openIdx ? "faq-icon--active" : ""}`}>
                  {idx === openIdx ? "−" : "+"}
                </span>
              </button>
              {idx === openIdx && (
                <div className="faq-answer">
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
      {/* <FAQSection /> */}

      <section className="captivating-section">
        <div className="captivating-overlay" />
        <div className="captivating-container">
          {/* LEFT CONTENT */}
          <div className="captivating-left">
            <h2 className="captivating-title">
              Discover the India with{" "}
              <span style={{ color: "#ff7a18" }}>Travel<span style={{color:"#2b78e3ff"}}>Hub</span></span>
            </h2>

            <p className="captivating-desc">
              From breathtaking escapes to seamless travel planning, we curate journeys
              that stay with you forever.
            </p>

            {/* STATS */}
            <div className="stats-grid">
              {[
                { icon: "🏛️", label: "50+ Cultural Places" },
                { icon: "🤝", label: "100+ Local Partners" },
                { icon: "🧗", label: "50+ Adventure Experiences" },
                { icon: "😊", label: "5,000+ Happy Indian Travelers" },
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

      {/* <FAQSection /> */}

    </>
  );
};


export default CaptivatingDestinations;
