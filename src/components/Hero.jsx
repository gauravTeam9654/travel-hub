import React, { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../Hero.css";

const Hero = () => {
  const [carouselItems, setCarouselItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const snapshot = await getDocs(collection(db, "dashboard_files"));
        const items = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setCarouselItems(items);
        console.log("Fetched hero files:", items);
      } catch (error) {
        console.error("Error fetching carousel data:", error);
      }
    };

    fetchItems();
  }, []);

  return (
    <section
      className="hero-section"
      style={{
        width: "100%",
        height: "100vh",
        maxHeight: "85vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {carouselItems.length > 0 ? (
        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          navigation
          pagination={{ clickable: true }}
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          {carouselItems.map((item) => (
            <SwiperSlide key={item.id}>
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                }}
              >
                {/* IMAGE DISPLAY */}
                {item.type === "image" && (
                  <img
                    src={item.url}
                    alt={item.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      filter: "brightness(0.7)",
                    }}
                  />
                )}

                {/* VIDEO DISPLAY */}
                {item.type === "video" && (
                  <video
                    src={item.url}
                    autoPlay
                    muted
                    loop
                    playsInline
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      filter: "brightness(0.7)",
                      background: "#000",
                    }}
                  />
                )}

                {/* TEXT OVERLAY */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "15%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "70%",
                    textAlign: "center",
                    color: "#fff",
                    fontSize: "5rem",
                    fontWeight: "bold",
                    textShadow: `
                      0 0 10px rgba(0, 0, 0, 0.9),
                      0 0 35px rgba(255, 255, 255, 0.7),
                      0 0 45px rgba(255, 255, 255, 0.6)
                    `,
                  }}
                >
                  {item.name}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p
          style={{
            color: "#fff",
            fontSize: "1.5rem",
            textAlign: "center",
            marginTop: "40vh",
          }}
        >
          Loading banner...
        </p>
      )}
    </section>
  );
};

export default Hero;
