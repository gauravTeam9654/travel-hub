import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, A11y, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "../Destinations.css"; 

const testimonials = [
  {
    text:
      "We recently went on a trip to Sikkim that took an unexpected turn when one of our friends fell ill. Although we couldn't complete the trip as planned, the support team helped us throughout—truly appreciated.",
    name: "Ishika Soni",
    location: "Bangalore",
  },
  {
    text:
      "Our Bhutan vacation was seamless and memorable. Well‑planned itinerary and quick assistance whenever we needed it.",
    name: "Rahul Mehra",
    location: "Delhi",
  },
  {
    text:
      "Meghalaya was spectacular! Great guides, smooth logistics and comfortable stays—highly recommended.",
    name: "Priya Sharma",
    location: "Mumbai",
  },
  {
    text:
      "A wonderful North‑East adventure—attention to detail and courteous service made it special.",
    name: "Amit Verma",
    location: "Kolkata",
  },
];

const Testimonials = () => {
  return (
    <section className="tj-testimonials">
      <div className="tj-testimonials-inner">
        <div className="tj-testimonials-left">
          <h2>What Our Travellers Say</h2>
          <p>
            Travel at your own pace while we handle the planning. From curated stays to
            reliable transport, we make world travel easy and stress‑free.
          </p>
          <button onClick={() => (window.location.href = "/#enquiry")}>
            Send Online Enquiry Now
          </button>
          <div className="tj-stats">
            <div className="tj-stat">
              <div className="ico">📍</div>
              <div className="val">15+</div>
              <div className="lbl">Total Destinations</div>
            </div>
            <div className="tj-stat">
              <div className="ico">🗺️</div>
              <div className="val">6,758+</div>
              <div className="lbl">Amazing Tours</div>
            </div>
            <div className="tj-stat">
              <div className="ico">🧑‍🤝‍🧑</div>
              <div className="val">18,963+</div>
              <div className="lbl">Happy Customers</div>
            </div>
            <div className="tj-stat">
              <div className="ico">🌏</div>
              <div className="val">120+</div>
              <div className="lbl">Global Partners</div>
            </div>
          </div>
        </div>
        <div className="tj-testimonials-right">
          <div className="tj-swiper-wrap">
            <Swiper
              modules={[Autoplay, Pagination, A11y]}
              spaceBetween={30}
              slidesPerView={1}
              loop={true}
              pagination={{ clickable: true }}
              autoplay={{ delay: 2000, disableOnInteraction: false }}
            >
              {testimonials.map((t, i) => (
                <SwiperSlide key={i}>
                  <div className="tj-slide">
                    <p className="quote">{t.text}</p>
                    <div className="name">{t.name}</div>
                    <div className="loc">{t.location}</div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
