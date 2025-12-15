import React from "react";
import {
  Briefcase,
  Compass,
  Headphones,
  HeartHandshake,
  ShieldCheck,
  Smile,
} from "lucide-react";

const reasons = [
  {
    icon: <Briefcase size={36} />,
    title: "12+ Years of Expertise",
    desc: "With over a decade of experience, we understand travel deeply and anticipate your needs before you even ask.",
  },
  {
    icon: <Compass size={36} />,
    title: "Personalized Journeys",
    desc: "Relaxation, culture, adventure or luxury — we listen first and craft trips that perfectly match your vision.",
  },
  {
    icon: <Headphones size={36} />,
    title: "End-to-End Assistance",
    desc: "From planning to your safe return home, every booking and every detail is handled with care.",
  },
  {
    icon: <HeartHandshake size={36} />,
    title: "A Lifetime of Travel Together",
    desc: "Your first journey with us is just the beginning. We build relationships that last across many adventures.",
  },
  {
    icon: <ShieldCheck size={36} />,
    title: "Peace of Mind",
    desc: "Travel should feel joyful, not stressful. We manage the logistics so you can enjoy every moment.",
  },
  {
    icon: <Smile size={36} />,
    title: "Trusted by Travelers",
    desc: "Thousands of happy travelers choose us for reliability, transparency, and unforgettable experiences.",
  },
];

const WhyChoose = () => {
  return (
    <section
      style={{
        padding: "100px 6%",
        background:
          "linear-gradient(135deg, #ff7a18 0%, #ff9f1c 100%)",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto"  }}>
        
        {/* Heading */}
        <div style={{ textAlign: "center", marginBottom: 70 }}>
          <p
            style={{
              color: "#fff7ed",
              letterSpacing: "0.12em",
              fontSize: "0.9rem",
              marginBottom: 12,
            }}
          >
            TRAVEL HUB
          </p>
    
          <h2
            style={{
              fontSize: "clamp(2.2rem, 4vw, 3rem)",
              fontWeight: 700,
              color: "#ffffff",
            }}
          >
            Why Choose Us

                {/* <span> */}
         {/* <span style={{ color: "#ffffffff" }}> Travel Hub</span> */}
      {/* </h2> */}
            {/* <img 
            src="/partners/logo.png"
            alt="decorative stars"
            style={{ width: 48, height: 12, marginBottom: 16 , backgroundColor : "white" , borderRadius : 6}}
          /> */}
          </h2>
        </div>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 36,
          }}
        >
          {reasons.map((item, index) => (
            <div
              key={index}
              style={{
                background: "rgba(255,255,255,0.15)",
                backdropFilter: "blur(12px)",
                borderRadius: 22,
                padding: "40px 32px",
                color: "#fff",
                transition: "all 0.35s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-10px)";
                e.currentTarget.style.background =
                  "rgba(255,255,255,0.22)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.background =
                  "rgba(255,255,255,0.15)";
              }}
            >
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 16,
                  background: "rgba(255,255,255,0.25)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 24,
                }}
              >
                {item.icon}
              </div>

              <h3
                style={{
                  fontSize: "1.35rem",
                  fontWeight: 600,
                  marginBottom: 14,
                }}
              >
                {item.title}
              </h3>

              <p
                style={{
                  fontSize: "1.02rem",
                  lineHeight: 1.7,
                  color: "#fffaf0",
                  margin: 0,
                }}
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
