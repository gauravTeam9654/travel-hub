import React from "react";

const features = [
  {
    icon: "/ultimate-flexibility.png",
    title: "Ultimate Flexibility",
    desc: "Stay in control with easy cancellations and flexible payments for every journey.",
  },
  {
    icon: "/Memorable-experiences.png",
    title: "Memorable Experiences",
    desc: "Book unique tours and experiences curated to make every trip unforgettable.",
  },
  {
    icon: "/quality-core.png",
    title: "Quality at Our Core",
    desc: "We partner with trusted providers to ensure exceptional quality and value.",
  },
  // {
  //   icon: "/Award-winning support.png",
  //   title: "Award-Winning Support",
  //   desc: "Travel worry-free — our team is here 24/7 to assist you anytime, anywhere.",
  // },
];

const WhyChoose = () => {
  return (
    <section
      style={{
        padding: "100px 10%",
        background: "linear-gradient(135deg, #f9fafb 0%, #ffffff 100%)",
        fontFamily: "'Poppins', sans-serif",
        textAlign: "center",
        color: "#222",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <h2
          style={{
            fontSize: "2.6rem",
            fontWeight: 700,
            marginBottom: "15px",
            color: "#111",
          }}
        >
          Why Choose <span style={{ color: "#007bff" }}>TravelHub</span>
        </h2>

        <p
          style={{
            color: "#666",
            fontSize: "1.1rem",
            maxWidth: "600px",
            margin: "0 auto 60px",
          }}
        >
          We make travel planning effortless — from inspiration to destination.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "30px",
          }}
        >
          {features.map((f) => (
            <div
              key={f.title}
              style={{
                background: "rgba(255, 255, 255, 0.9)",
                borderRadius: "20px",
                padding: "40px 30px",
                boxShadow: "0 8px 30px rgba(0, 0, 0, 0.08)",
                transition: "all 0.35s ease",
                border: "1px solid rgba(0, 0, 0, 0.05)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-10px)";
                e.currentTarget.style.boxShadow =
                  "0 14px 45px rgba(0, 0, 0, 0.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 8px 30px rgba(0, 0, 0, 0.08)";
              }}
            >
              <div style={{ marginBottom: "25px" }}>
                <img
                  src={f.icon}
                  alt={f.title}
                  style={{
                    width: "64px",
                    height: "64px",
                    objectFit: "contain",
                    transition: "transform 0.3s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.1)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                />
              </div>
              <h3
                style={{
                  fontSize: "1.3rem",
                  fontWeight: 600,
                  marginBottom: "12px",
                  color: "#222",
                }}
              >
                {f.title}
              </h3>
              <p
                style={{
                  color: "#666",
                  fontSize: "0.98rem",
                  lineHeight: "1.6",
                  margin: 0,
                }}
              >
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
