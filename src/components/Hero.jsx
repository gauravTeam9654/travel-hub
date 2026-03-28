import { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import Loader from "./Loader";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../Hero.css";

const Hero = () => {
  const [carouselItems, setCarouselItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const snapshot = await getDocs(collection(db, "dashboard_files"));
        const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        
        // Filter items based on device type
        const filteredItems = items.filter((item) => {
          const device = item.deviceType || "website"; // Default to website for legacy items
          return isMobile ? device === "mobile" : device === "website";
        });

        if (filteredItems.length > 0) {
          setCarouselItems(filteredItems);
        } else {
            // If no device-specific items found, fallback to showing all or website
            setCarouselItems(items.filter(it => (it.deviceType || "website") === "website"));
        }
      } catch (error) {
        console.error("Error fetching carousel data:", error);
      } finally {
        setTimeout(() => setLoading(false), 800);
      }
    };
    fetchItems();
  }, [isMobile]);

  return (
    <section className="hero-section">
      <Loader open={loading} />

      {!loading && carouselItems.length > 0 && (
        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          slidesPerView={1}
          loop
          autoplay={{ delay: 8000, disableOnInteraction: false }}
          navigation
          pagination={{ clickable: true }}
          className="hero-swiper"
          style={{ height: "100%" }}
        >
          {carouselItems.map((item) => (
            <SwiperSlide key={item.id}>
              <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden" }}>
                {/* Background media */}
                {item.type === "image" ? (
                  <img src={item.url} alt={item.name || "destination"} className="hero-slide-image" />
                ) : (
                  <video
                    src={item.url}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="hero-slide-image"
                  />
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      {/* Cinematic gradient overlay */}
      <div className="hero-gradient-overlay" />

      {/* Animated content overlay – always visible over the swiper */}
      <motion.div
        className="hero-content-overlay"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1], delay: 0.3 }}
      >
        <h1 className="hero-title">
          Discover The World's<br />
          <span className="hero-title-accent">Most Breathtaking</span><br />
          Destinations
        </h1>

        <p className="hero-subtitle">
          Let us craft the journey you've always dreamed of.
        </p>
      </motion.div>

      {/* Scroll indicator */}
      <div className="hero-scroll-indicator">
        <span>Scroll</span>
        <div className="hero-scroll-line" />
      </div>
    </section>
  );
};

export default Hero;
