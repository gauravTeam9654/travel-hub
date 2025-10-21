import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/pagination";

const PackageSection = ({ title, packages }) => {
  const navigate = useNavigate();
  const isBhutan = title && title.toLowerCase().includes("bhutan");
  // Use the provided packages as-is; Swiper will handle looping internally.
  const items = Array.isArray(packages) ? packages : [];

  const handleClick = (pkg, e) => {
    e?.preventDefault?.();
    e?.stopPropagation?.();
    const to = `/package/${encodeURIComponent(pkg.slug)}`;
    try { navigate(to); } catch { window.location.href = to; }
  };

  return (
    <section className={isBhutan ? "popular-packages-section" : "my-10 px-4"}>
      <h2 className={isBhutan ? "" : "text-2xl font-bold mb-6"}>{title}</h2>
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={16}
        slidesPerView={1}
  autoplay={{ delay: 2000, disableOnInteraction: false, pauseOnMouseEnter: false, stopOnLastSlide: false }}
  speed={2000}
  pagination={isBhutan ? { clickable: true, dynamicBullets: true } : false}
        navigation={false}
  loop={true}
  loopPreventsSliding={false}
  loopedSlides={items.length || 0}
  loopAdditionalSlides={items.length || 0}
        slidesPerGroup={1}
        centeredSlides={false}
        slidesOffsetBefore={0}
        slidesOffsetAfter={0}
        allowTouchMove={true}
        grabCursor={true}
        breakpoints={{
          640: { slidesPerView: 2, slidesPerGroup: 1, spaceBetween: 16, slidesOffsetBefore: 0, slidesOffsetAfter: 0 },
          768: { slidesPerView: 3, slidesPerGroup: 1, spaceBetween: 16, slidesOffsetBefore: 0, slidesOffsetAfter: 0 },
          1024: { slidesPerView: 4, slidesPerGroup: 1, spaceBetween: 16, slidesOffsetBefore: 0, slidesOffsetAfter: 0 },
        }}
      >
        {items.map((pkg, index) => (
          <SwiperSlide key={index} onClick={(e) => handleClick(pkg, e)}>
            <div className={isBhutan ? "package-card" : "rounded-lg overflow-hidden shadow-md relative"} style={{ cursor: 'pointer' }}>
              <img src={pkg.image} alt={pkg.title} className={isBhutan ? "" : "w-full h-56 object-cover"} />
              <div className={isBhutan ? "package-card-content" : "absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-3"}>
                <div className={isBhutan ? "package-card-title" : "text-white font-semibold text-lg"}>{pkg.title}</div>
                {/* Subheading removed in cards to prevent overflow/cut text */}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default PackageSection;
