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
    icon: <Briefcase size={30} />,
    title: "12+ Years of Expertise",
    desc: "With over a decade of experience, we understand travel deeply and anticipate your needs before you even ask.",
  },
  {
    icon: <Compass size={30} />,
    title: "Personalized Journeys",
    desc: "Relaxation, culture, adventure or luxury — we listen first and craft trips that perfectly match your vision.",
  },
  {
    icon: <Headphones size={30} />,
    title: "End-to-End Assistance",
    desc: "From planning to your safe return home, every booking and every detail is handled with care.",
  },
  {
    icon: <HeartHandshake size={30} />,
    title: "A Lifetime of Travel Together",
    desc: "Your first journey with us is just the beginning. We build relationships that last across many adventures.",
  },
  {
    icon: <ShieldCheck size={30} />,
    title: "Peace of Mind",
    desc: "Travel should feel joyful, not stressful. We manage the logistics so you can enjoy every moment.",
  },
  {
    icon: <Smile size={30} />,
    title: "Trusted by Travelers",
    desc: "Thousands of happy travelers choose us for reliability, transparency, and unforgettable experiences.",
  },
];

const WhyChoose = () => (
  <section
    style={{
      padding: "110px 6%",
      background: "linear-gradient(140deg, #ff5500 0%, #ff7a18 40%, #ffb347 100%)",
      fontFamily: "'Inter', sans-serif",
      position: "relative",
      overflow: "hidden",
    }}
  >
    {/* Decorative blobs */}
    <div style={{
      position: "absolute", top: "-120px", right: "-120px",
      width: 500, height: 500, borderRadius: "50%",
      background: "rgba(255,255,255,0.06)", pointerEvents: "none",
    }} />
    <div style={{
      position: "absolute", bottom: "-180px", left: "-80px",
      width: 600, height: 600, borderRadius: "50%",
      background: "rgba(255,255,255,0.04)", pointerEvents: "none",
    }} />
    <div style={{
      position: "absolute", top: "50%", left: "50%",
      transform: "translate(-50%,-50%)",
      width: 900, height: 900, borderRadius: "50%",
      background: "radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)",
      pointerEvents: "none",
    }} />

    <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>

      {/* Heading */}
      <div style={{ textAlign: "center", marginBottom: 72 }}>
        <p style={{
          color: "rgba(255,255,255,0.85)",
          letterSpacing: "0.22em",
          fontSize: "0.78rem",
          fontWeight: 700,
          textTransform: "uppercase",
          marginBottom: 14,
        }}>
          ✦ &nbsp; Our Promise To You &nbsp; ✦
        </p>
        <h2 style={{
          fontSize: "clamp(2.2rem, 4vw, 3.2rem)",
          fontWeight: 800,
          color: "#ffffff",
          letterSpacing: "-0.02em",
          lineHeight: 1.1,
          textShadow: "0 4px 24px rgba(0,0,0,0.15)",
          margin: "0 auto 20px",
        }}>
          Why Thousands Trust Us
        </h2>
        <div style={{
          width: 72, height: 4,
          background: "rgba(255,255,255,0.55)",
          borderRadius: 4,
          margin: "0 auto",
        }} />
      </div>

      {/* Cards grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: 28,
      }}>
        {reasons.map((item, index) => (
          <div
            key={index}
            style={{
              background: "rgba(255,255,255,0.12)",
              backdropFilter: "blur(18px)",
              WebkitBackdropFilter: "blur(18px)",
              borderRadius: 24,
              padding: "40px 34px 36px",
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.22)",
              transition: "all 0.38s cubic-bezier(0.4,0,0.2,1)",
              position: "relative",
              overflow: "hidden",
              cursor: "default",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-12px)";
              e.currentTarget.style.background = "rgba(255,255,255,0.24)";
              e.currentTarget.style.boxShadow = "0 28px 60px rgba(0,0,0,0.20), inset 0 1px 0 rgba(255,255,255,0.4)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.55)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.background = "rgba(255,255,255,0.12)";
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.22)";
            }}
          >
            {/* Ghost number */}
            <div style={{
              position: "absolute", top: 18, right: 26,
              fontSize: "4.5rem", fontWeight: 900,
              color: "rgba(255,255,255,0.08)",
              lineHeight: 1, fontFamily: "'Poppins', sans-serif",
              userSelect: "none", pointerEvents: "none",
            }}>
              {String(index + 1).padStart(2, "0")}
            </div>

            {/* Icon badge */}
            <div style={{
              width: 60, height: 60, borderRadius: 18,
              background: "rgba(255,255,255,0.22)",
              display: "flex", alignItems: "center", justifyContent: "center",
              marginBottom: 26,
              boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
            }}>
              {item.icon}
            </div>

            <h3 style={{
              fontSize: "1.25rem", fontWeight: 700,
              marginBottom: 14, letterSpacing: "-0.01em",
            }}>
              {item.title}
            </h3>

            <p style={{
              fontSize: "0.96rem", lineHeight: 1.78,
              color: "rgba(255,255,255,0.82)", margin: 0,
            }}>
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyChoose;
