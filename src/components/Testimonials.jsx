import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, A11y, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const testimonials = [
  {
    text:
      "Our trip to Sikkim was unforgettable! Even when plans changed, the TravelHub team was there every step of the way with exceptional care and guidance.",
    name: "Ishika Soni",
    location: "Bangalore",
  },
  {
    text:
      "TravelHub made our Bhutan journey absolutely seamless. From hotel bookings to local experiences—everything felt thoughtfully curated.",
    name: "Rahul Mehra",
    location: "Delhi",
  },
  {
    text:
      "Exploring Meghalaya was a dream come true. The planning, comfort, and coordination exceeded all expectations!",
    name: "Priya Sharma",
    location: "Mumbai",
  },
  {
    text:
      "A beautifully organized North-East adventure! Every detail reflected professionalism and a true love for travel.",
    name: "Amit Verma",
    location: "Kolkata",
  },
];

const Testimonials = () => {
  return (
    <section
      style={{
        background: "linear-gradient(135deg, #eef7f6 0%, #dce8ff 100%)",
        padding: "80px 10%",
        borderRadius: "0 0 80px 80px",
        fontFamily: "'Poppins', sans-serif",
        color: "#1a1a1a",
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "60px",
        }}
      >
        {/* LEFT SECTION */}
        <div style={{ flex: "1 1 40%", minWidth: "300px" }}>
          <h2
            style={{
              fontSize: "2.8rem",
              fontWeight: "700",
              color: "#002b5b",
              marginBottom: "20px",
              lineHeight: "1.2",
            }}
          >
            What Our Travellers Say
          </h2>
          <p
            style={{
              fontSize: "1.1rem",
              color: "#333",
              lineHeight: "1.8",
              marginBottom: "40px",
            }}
          >
            TravelHub makes exploring the world effortless. From curated stays
            to reliable transfers, every trip is planned to perfection—so you
            can just enjoy the journey.
          </p>

          {/* <button
            onClick={() => (window.location.href = "/#enquiry")}
            style={{
              background:
                "linear-gradient(90deg, #0077ff 0%, #00c6ff 100%)",
              color: "#fff",
              border: "none",
              borderRadius: "50px",
              padding: "14px 34px",
              fontSize: "1rem",
              fontWeight: "600",
              cursor: "pointer",
              boxShadow: "0 8px 20px rgba(0, 123, 255, 0.3)",
              transition: "all 0.3s ease",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.boxShadow =
                "0 10px 25px rgba(0, 123, 255, 0.5)")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.boxShadow =
                "0 8px 20px rgba(0, 123, 255, 0.3)")
            }
          >
            Send Enquiry
          </button> */}

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "25px",
              marginTop: "50px",
            }}
          >
            {[
              { ico: "🌍", val: "15+", lbl: "Top Destinations" },
              { ico: "🧭", val: "6,758+", lbl: "Planned Tours" },
              { ico: "💬", val: "18,963+", lbl: "Happy Travellers" },
              { ico: "🤝", val: "120+", lbl: "Trusted Partners" },
            ].map((stat, i) => (
              <div
                key={i}
                style={{
                  background: "#fff",
                  padding: "20px 25px",
                  borderRadius: "16px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  textAlign: "center",
                  transition: "transform 0.3s ease",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.transform = "translateY(-6px)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.transform = "translateY(0)")
                }
              >
                <div style={{ fontSize: "2rem" }}>{stat.ico}</div>
                <div
                  style={{
                    fontSize: "1.3rem",
                    fontWeight: "700",
                    color: "#002b5b",
                    marginTop: "8px",
                  }}
                >
                  {stat.val}
                </div>
                <div style={{ color: "#555", fontSize: "0.95rem" }}>
                  {stat.lbl}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SECTION - TESTIMONIAL SLIDER */}
        <div style={{ flex: "1 1 50%", minWidth: "320px" }}>
          <Swiper
            modules={[Autoplay, Pagination, A11y]}
            spaceBetween={40}
            slidesPerView={1}
            loop={true}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
          >
            {testimonials.map((t, i) => (
              <SwiperSlide key={i}>
                <div
                  style={{
                    background: "#fff",
                    padding: "40px 35px",
                    borderRadius: "24px",
                    // boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                    transition: "all 0.4s ease",
                    minHeight: "280px",
                  }}
                >
                  <p
                    style={{
                      fontSize: "1.05rem",
                      color: "#333",
                      lineHeight: "1.7",
                      marginBottom: "25px",
                      fontStyle: "italic",
                    }}
                  >
                    “{t.text}”
                  </p>
                  <div
                    style={{
                      fontWeight: "600",
                      fontSize: "1.1rem",
                      color: "#002b5b",
                    }}
                  >
                    {t.name}
                  </div>
                  <div
                    style={{
                      color: "#777",
                      fontSize: "0.95rem",
                      marginTop: "4px",
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
  );
};

export default Testimonials;
