
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "../style.css";

const groupCompanies = [
  {
    src: "/sk-dj-tourism.png",
    alt: "Sikkim Darjeeling Tourism"
  },
  {
    src: "/northeast-cab.png",
    alt: "Northeast Cab"
  }
];

const hotelPartners = [
  { src: "/partners/hotel1.png", alt: "Divine" },
  { src: "/partners/hotel2.png", alt: "Lemon Tree Hotels" },
  { src: "/partners/hotel3.png", alt: "The Deltin" },
  { src: "/partners/hotel4.png", alt: "Ramada" },
  { src: "/partners/hotel5.png", alt: "Taj" },
  { src: "/partners/hotel6.png", alt: "Udaan Hotels & Resorts" },
  { src: "/partners/hotel7.png", alt: "Other Partner" }
];



const Partners = () => (
  <div className="partners-bg">
    <section className="partners-section" style={{ maxWidth: 1200, margin: '0 auto', padding: '0 16px' }}>
      <h2 className="partners-title">Our Group Of Companies</h2>
      <div className="partners-group-logos-responsive">
        {groupCompanies.map((company, idx) => (
          <img
            key={idx}
            src={company.src}
            alt={company.alt}
            className="partners-group-img"
          />
        ))}
      </div>
    </section>
    <section className="partners-section" style={{ maxWidth: 1200, margin: '0 auto', padding: '0 16px' }}>
      <h2 className="partners-title partners-title-small">Our Hotel Partners</h2>
      <div className="partners-hotel-slider-responsive">
        <Swiper
          modules={[Autoplay, Navigation]}
          spaceBetween={30}
          slidesPerView={5}
          loop={true}
          autoplay={{ delay: 0, disableOnInteraction: false, pauseOnMouseEnter: true }}
          speed={2500}
          allowTouchMove={true}
          navigation={true}
          style={{ padding: "30px 0" }}
          breakpoints={{
            320: { slidesPerView: 2 },
            640: { slidesPerView: 3 },
            1024: { slidesPerView: 5 },
          }}
        >
          {hotelPartners.concat(hotelPartners).map((hotel, idx) => (
            <SwiperSlide key={idx}>
              <div className="partners-marquee-img-wrap">
                <img
                  src={hotel.src}
                  alt={hotel.alt}
                  className="partners-marquee-img"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  </div>
);

export default Partners;
