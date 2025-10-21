import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../Gallery.css";

const images = [
  "/darjeeling-final.png",
  "/darjeeling2.png",
  "/darjeeling.png",
  "/gangtok-final.png",
  "/gangtok-final-2.avif",
  "/north-sikkim.png",
  "/North-Sikkim-2.png",
  "/Lachung-2.png",
  "/sikkim-final.png",
  "/sikkim-darjeeling.png",
  "/meghalaya-final.avif",
  "/meghalaya.png",
  "/meghalaya2.png",
  "/arunachal-final.png",
  "/arunachal.png",
  "/bhutan-final.avif",
  "/bhutan.png",
  "/bhutan2.png",
  "/8N9D-2.png",
  "/train2.png",
];

const Gallery = () => {
  return (
    <>
  <Navbar fixed />
      <main className="gallery-page">
      <section className="gallery-hero" role="banner" aria-label="Gallery hero">
        <div className="gallery-hero-overlay" />
        <div className="gallery-hero-content">
          <h1>Gallery</h1>
          <p>Moments from the mountains, valleys, and journeys we love.</p>
        </div>
      </section>

      <section className="gallery-content">
        <div className="gallery-grid">
          {images.map((src, idx) => (
            <figure className="gallery-item" key={src + idx}>
              <img loading="lazy" src={src} alt={`Tripjyada gallery ${idx + 1}`} />
            </figure>
          ))}
        </div>
      </section>
      </main>
      <Footer />
    </>
  );
};

export default Gallery;
