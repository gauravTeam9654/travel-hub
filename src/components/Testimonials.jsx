import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, A11y, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const testimonials = [
  {
    text: "Our trip to Sikkim was unforgettable! Even when plans changed, the TravelHub team was there every step of the way with exceptional care and guidance.",
    name: "Ishika Soni",
    location: "Bangalore",
  },
  {
    text: "TravelHub made our Bhutan journey absolutely seamless. From hotel bookings to local experiences — everything felt thoughtfully curated.",
    name: "Rahul Mehra",
    location: "Delhi",
  },
  {
    text: "Exploring Meghalaya was a dream come true. The planning, comfort, and coordination exceeded all expectations!",
    name: "Priya Sharma",
    location: "Mumbai",
  },
  {
    text: "A beautifully organized North-East adventure! Every detail reflected professionalism and a true love for travel.",
    name: "Amit Verma",
    location: "Kolkata",
  },
];

const stats = [
  { ico: "🏆", val: "12+",    lbl: "Years of Service" },
  { ico: "🧭", val: "6,758+", lbl: "Planned Tours" },
  { ico: "💬", val: "18,963+",lbl: "Happy Travellers" },
  { ico: "🤝", val: "120+",   lbl: "Trusted Partners" },
];

const Testimonials = () => (
  <section
    style={{
      background: "linear-gradient(135deg, #0f172a 0%, #1a2540 60%, #0f172a 100%)",
      padding: "110px 10%",
      fontFamily: "'Poppins', sans-serif",
      color: "#fff",
      position: "relative",
      overflow: "hidden",
    }}
  >
    {/* Subtle radial glow */}
    <div style={{
      position: "absolute", inset: 0, pointerEvents: "none",
      background: "radial-gradient(ellipse 70% 60% at 15% 55%, rgba(255,122,24,0.07) 0%, transparent 65%), radial-gradient(ellipse 50% 50% at 85% 20%, rgba(255,159,28,0.05) 0%, transparent 55%)",
    }} />

    <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 64 }}>

        {/* ── LEFT ── */}
        <div style={{ flex: "1 1 38%", minWidth: 300 }}>
          <p style={{
            color: "#ff9f1c", letterSpacing: "0.22em",
            fontSize: "0.78rem", fontWeight: 700,
            textTransform: "uppercase", marginBottom: 16,
          }}>
            ✦ &nbsp; Testimonials &nbsp; ✦
          </p>

          <h2 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(2rem, 3.5vw, 2.9rem)",
            fontWeight: 700, color: "#ffffff",
            marginBottom: 20, lineHeight: 1.2,
          }}>
            Stories From Our<br />
            <span style={{ color: "#ff9f1c" }}>Happy Travellers</span>
          </h2>

          <p style={{
            fontSize: "1rem", color: "rgba(255,255,255,0.58)",
            lineHeight: 1.82, marginBottom: 44, maxWidth: 420,
          }}>
            Real experiences from real people — discover how TravelHub transforms journeys into lifelong memories.
          </p>

          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 18 }}>
            {stats.map((s, i) => (
              <div
                key={i}
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.09)",
                  padding: "22px 18px", borderRadius: 18, textAlign: "center",
                  transition: "all 0.3s ease", cursor: "default",
                }}
                onMouseOver={e => {
                  e.currentTarget.style.background = "rgba(255,122,24,0.13)";
                  e.currentTarget.style.borderColor = "rgba(255,122,24,0.35)";
                  e.currentTarget.style.transform = "translateY(-4px)";
                }}
                onMouseOut={e => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div style={{ fontSize: "1.7rem", marginBottom: 6 }}>{s.ico}</div>
                <div style={{ fontSize: "1.55rem", fontWeight: 800, color: "#ff9f1c", lineHeight: 1 }}>{s.val}</div>
                <div style={{ color: "rgba(255,255,255,0.50)", fontSize: "0.82rem", marginTop: 6, fontWeight: 500 }}>{s.lbl}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT – Testimonial slider ── */}
        <div style={{ flex: "1 1 50%", minWidth: 320 }}>
          <Swiper
            modules={[Autoplay, Pagination, A11y]}
            spaceBetween={40}
            slidesPerView={1}
            loop
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            style={{ paddingBottom: 48 }}
          >
            {testimonials.map((t, i) => (
              <SwiperSlide key={i}>
                <div style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.10)",
                  padding: "46px 42px 40px",
                  borderRadius: 28,
                  minHeight: 300,
                  position: "relative",
                  overflow: "hidden",
                }}>
                  {/* Giant decorative quote */}
                  <div style={{
                    position: "absolute", top: 8, left: 22,
                    fontSize: "9rem", lineHeight: 1,
                    fontFamily: "Georgia, serif",
                    color: "#ff7a18", opacity: 0.18,
                    userSelect: "none", pointerEvents: "none",
                  }}>
                    &ldquo;
                  </div>

                  {/* Stars */}
                  <div style={{ color: "#ff9f1c", fontSize: "1rem", marginBottom: 22, letterSpacing: 3 }}>
                    ★★★★★
                  </div>

                  <p style={{
                    fontSize: "1.04rem", color: "rgba(255,255,255,0.82)",
                    lineHeight: 1.82, marginBottom: 32,
                    fontStyle: "italic", position: "relative", zIndex: 1,
                  }}>
                    "{t.text}"
                  </p>

                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <div style={{
                      width: 46, height: 46, borderRadius: "50%",
                      background: "linear-gradient(135deg, #ff7a18 0%, #ffb347 100%)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "1.15rem", fontWeight: 800, color: "#fff",
                      flexShrink: 0, boxShadow: "0 6px 18px rgba(255,100,0,0.35)",
                    }}>
                      {t.name[0]}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, color: "#fff", fontSize: "1rem" }}>{t.name}</div>
                      <div style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.85rem", marginTop: 2 }}>{t.location}</div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  </section>
);

export default Testimonials;
