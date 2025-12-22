import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";

import "swiper/css";
import "swiper/css/pagination";

const PackageSection = ({ title, collectionName = "internationalTrips" }) => {
  const navigate = useNavigate();
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, collectionName));
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
    const to =collectionName === "hiddenGems" ? `/hiddenGem/${encodeURIComponent(pkg.slug || pkg.id)}` : `/package/${encodeURIComponent(pkg.slug || pkg.id)}`;
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
    padding: "90px 8%",
    background: "#fff7f0",
    fontFamily: "'Poppins', sans-serif",
    textAlign: "center",
  }}
>
  <h2
    style={{
      fontSize: "2.4rem",
      fontWeight: 600,
      color: "#2d2d2d",
      marginBottom: "16px",
    }}
  >
    Discover Our <span style={{ color: "#ff7a18" }}>{ collectionName === "hiddenGems" ? "Hidden Gems" : "Exclusive Trips"}</span>
  </h2>

  <p
    style={{
      color: "#666",
      fontSize: "1rem",
      marginBottom: "50px",
      maxWidth: "620px",
      marginInline: "auto",
      lineHeight: "1.6",
    }}
  >
    Thoughtfully designed travel experiences to help you explore the world
    with comfort and confidence.
  </p>

  <Swiper
    modules={[Autoplay, Pagination]}
    spaceBetween={24}
    slidesPerView={1}
    autoplay={{ delay: 3000, disableOnInteraction: false }}
    pagination={{ clickable: true }}
    loop
    breakpoints={{
      640: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
      1280: { slidesPerView: 4 },
    }}
  >
    {packages.map((pkg, index) => (
      <SwiperSlide key={index}>
        <div
          onClick={(e) => handleClick(pkg, e)}
          style={{
            background: "#ffffff",
            borderRadius: "14px",
            overflow: "hidden",
            boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Image */}
          <div style={{ position: "relative" }}>
            <img
              src={pkg.image}
              alt={pkg.title}
              style={{
                width: "100%",
                height: "220px",
                objectFit: "cover",
              }}
            />
          </div>

          {/* Content */}
          <div
            style={{
              padding: "20px",
              textAlign: "left",
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
            }}
          >
            <h3
              style={{
                fontSize: "1.2rem",
                fontWeight: 600,
                color: "#222",
                marginBottom: "6px",
              }}
            >
              {pkg.title}
            </h3>

            <p
              style={{
                fontSize: "0.9rem",
                color: "#ff7a18",
                marginBottom: "12px",
                fontWeight: 500,
              }}
            >
              {pkg.subtitle || "Premium Travel Experience"}
            </p>

            <p
              style={{
                fontSize: "0.95rem",
                color: "#555",
                lineHeight: "1.6",
                marginBottom: "18px",
                flexGrow: 1,
              }}
            >
              {pkg.description?.slice(0, 50) ||
                "Carefully curated destinations offering comfort, culture, and unforgettable memories."}...
            </p>

            <button
              style={{
                alignSelf: "flex-start",
                background: "#ff7a18",
                color: "#fff",
                padding: "10px 18px",
                borderRadius: "8px",
                border: "none",
                fontSize: "0.9rem",
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              Explore Details →
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
