import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";

import "swiper/css";
import "swiper/css/pagination";

const PackageSection = ({ title }) => {
  const navigate = useNavigate();
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "internationalTrips"));
        const trips = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPackages(trips);
      } catch (error) {
        console.error("Error fetching trips:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, []);

  const handleClick = (pkg, e) => {
    e.preventDefault();
    const to = `/package/${encodeURIComponent(pkg.slug || pkg.id)}`;
    try {
      navigate(to);
    } catch {
      window.location.href = to;
    }
  };

  if (loading) {
    return <p style={{ textAlign: "center", padding: "40px", color: "#555" }}>Loading trips...</p>;
  }

  if (!packages.length) {
    return <p style={{ textAlign: "center", padding: "40px", color: "#555" }}>No trips found.</p>;
  }

  return (
    <section
      style={{
        padding: "100px 8%",
        background: "linear-gradient(135deg, #eef6ff 0%, #ffffff 100%)",
        fontFamily: "'Poppins', sans-serif",
        textAlign: "center",
        position: "relative",
      }}
    >
      <h2
        style={{
          fontSize: "2.8rem",
          fontWeight: 700,
          color: "#0a2540",
          marginBottom: "20px",
          letterSpacing: "0.5px",
        }}
      >
        Discover Our <span style={{ color: "#007bff" }}>Exclusive Trips</span>
      </h2>

      <p
        style={{
          color: "#666",
          fontSize: "1.1rem",
          marginBottom: "60px",
          maxWidth: "650px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        Explore breathtaking destinations curated with love and expertise — because every journey deserves perfection.
      </p>

      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        pagination={{ clickable: true, dynamicBullets: true }}
        loop={true}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
      >
        {packages.map((pkg, index) => (
          <SwiperSlide key={index}>
            <div
              style={{
                background: "rgba(255, 255, 255, 0.85)",
                borderRadius: "20px",
                overflow: "hidden",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.4s ease, box-shadow 0.4s ease",
                cursor: "pointer",
                height: "100%",
              }}
              onClick={(e) => handleClick(pkg, e)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-10px)";
                e.currentTarget.style.boxShadow = "0 15px 40px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.1)";
              }}
            >
              <div style={{ position: "relative" }}>
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  style={{
                    width: "100%",
                    height: "250px",
                    objectFit: "cover",
                    borderTopLeftRadius: "20px",
                    borderTopRightRadius: "20px",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0))",
                  }}
                ></div>
                <div
                  style={{
                    position: "absolute",
                    bottom: "20px",
                    left: "20px",
                    right: "20px",
                    color: "white",
                    textAlign: "left",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "1.3rem",
                      fontWeight: 600,
                      marginBottom: "5px",
                      textShadow: "0 2px 6px rgba(0,0,0,0.3)",
                    }}
                  >
                    {pkg.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "0.9rem",
                      color: "#eee",
                      textShadow: "0 1px 4px rgba(0,0,0,0.4)",
                    }}
                  >
                    {pkg.subtitle || "Discover more"}
                  </p>
                </div>
              </div>

              <div style={{ padding: "20px", textAlign: "left" }}>
                <p
                  style={{
                    color: "#555",
                    fontSize: "0.95rem",
                    lineHeight: "1.6",
                    marginBottom: "12px",
                    minHeight: "60px",
                  }}
                >
                  {pkg.description?.slice(0, 100) || "Experience unforgettable moments and explore hidden gems across the world."}
                </p>
                <button
                  style={{
                    background: "linear-gradient(90deg, #007bff, #00b4d8)",
                    color: "#fff",
                    padding: "10px 20px",
                    border: "none",
                    borderRadius: "10px",
                    fontWeight: 500,
                    fontSize: "0.9rem",
                    cursor: "pointer",
                    transition: "background 0.3s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "linear-gradient(90deg, #0056b3, #007bff)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "linear-gradient(90deg, #007bff, #00b4d8)")
                  }
                >
                  Explore Now →
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default PackageSection;
