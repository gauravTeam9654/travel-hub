import React, { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, PlayCircle } from "lucide-react";
import Loader from "./Loader";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../Hero.css";
import { Link } from "react-router-dom";

const Hero = () => {
  const [carouselItems, setCarouselItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const snapshot = await getDocs(collection(db, "dashboard_files"));
        const items = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        if (items.length > 0) {
          setCarouselItems(items);
          setTimeout(() => setLoading(false), 1500);
        } else {
           setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching carousel data:", error);
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

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
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          className="hero-swiper"
          style={{ height: "100%" }}
        >
          {carouselItems.map((item, index) => (
            <SwiperSlide key={item.id}>
              <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden" }}>
                {/* Background Media with Ken Burns Effect */}
                <div style={{ width: "100%", height: "100%" }}>
                  {item.type === "image" ? (
                    <img src={item.url} alt={item.name} className="hero-slide-image" style={{height:"100vh"}}/>
                  ) : (
                    <video
                      src={item.url}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="hero-slide-image"
                      style={{ filter: "brightness(0.9)" }}
                    />
                  )}
                </div>

                {/* Text and Overlay Removed for Full Screen View */}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </section>
  );
};

export default Hero;
