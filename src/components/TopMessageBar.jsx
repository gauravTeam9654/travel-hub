import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import "swiper/css";

const TopMessageBar = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const q = query(
            collection(db, "top_messages"), 
            where("isActive", "==", true)
        );
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        // Sort client-side to avoid creating a composite index
        data.sort((a, b) => {
          const t1 = a.createdAt?.seconds || 0;
          const t2 = b.createdAt?.seconds || 0;
          return t2 - t1;
        });
        console.log(data , "top messages");
        setMessages(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching top messages:", error);
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  useEffect(() => {
    if (!loading && messages.length > 0) {
      // Push navbar down when message bar is active
      const navbar = document.querySelector('.navbar');
      if (navbar) {
        navbar.style.top = '40px';
      }
    }
    return () => {
      // Reset navbar position on unmount or when messages clear
      const navbar = document.querySelector('.navbar');
      if (navbar) {
        navbar.style.top = '0';
      }
    };
  }, [loading, messages]);

  if (loading || messages.length === 0) return null;

  return (
    <div style={{
      background: "#ff6600",
      color: "#fff",
      textAlign: "center",
      overflow: "hidden",
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      zIndex: 1200, // Higher than navbar (1100)
      height: "40px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
    }}>
      <Swiper
        modules={[Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        loop={messages.length > 1}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        style={{ width: "100%", height: "100%" }}
      >
        {messages.map((msg) => (
          <SwiperSlide key={msg.id} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
             <span style={{ fontSize: "14px", fontWeight: 600, letterSpacing: "0.5px" }}>
               {msg.text}
             </span>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TopMessageBar;
