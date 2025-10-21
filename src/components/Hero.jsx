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
  const [carouselImages, setCarouselImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const snapshot = await getDocs(collection(db, "dashboard_img"));
        const images = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCarouselImages(images);
        console.log("Fetched images:", images);
      } catch (error) {
        console.error("Error fetching carousel images:", error);
      }
    };

    fetchImages();
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
      {carouselImages.length > 0 ? (
        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          navigation
          pagination={{ clickable: true }}
          style={{
            width: "100%",
            height: "100%",
            
          }}
        >
          {carouselImages.map((item) => (
            <SwiperSlide key={item.id}>
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                }}
              >
                <img
                  src={item.imageBase64 || item.imageUrl}
                  alt={item.name || "Destination"}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    filter: "brightness(0.7)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: "15%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "rgba(0,0,0,0.5)",
                    color: "#fff",
                    padding: "10px 20px",
                    borderRadius: "10px",
                    fontSize: "1.4rem",
                    fontWeight: "bold",
                    textAlign: "center",
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
          Loading images...
        </p>
      )}
    </section>
  );
};

export default Hero;
