import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import GalleryLocations from "./GalleryLocation";

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

      <main style={{ background: "#fff" }}>
        {/* HERO */}
        <section
          style={{
            position: "relative",
            height: "75vh",
            background:
              "url('/darjeeling-final.png') center center / cover no-repeat",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.55), rgba(0,0,0,0.8))",
            }}
          />

          <div
            style={{
              position: "relative",
              zIndex: 2,
              textAlign: "center",
              color: "#fff",
              maxWidth: 720,
              padding: "0 20px",
            }}
          >
            <h1
              style={{
                fontSize: 48,
                fontWeight: 800,
                marginBottom: 16,
              }}
            >
              Travel Moments Gallery
            </h1>
            <p
              style={{
                fontSize: 18,
                lineHeight: 1.6,
                opacity: 0.9,
              }}
            >
              A collection of unforgettable journeys across mountains, valleys,
              monasteries, beaches, and hidden gems.
            </p>
          </div>
        </section>

        {/* INTRO */}
        <section
          style={{
            maxWidth: 900,
            margin: "80px auto 40px",
            padding: "0 20px",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontSize: 32,
              fontWeight: 700,
              // marginBottom: 14,
              color: "#0f172a",
            }}
          >
            Stories Captured Through Our Journeys
          </h2>
          <p
            style={{
              fontSize: 17,
              lineHeight: 1.8,
              color: "#475569",
            }}
          >
            Every destination has a story — misty mornings in the Himalayas,
            serene monasteries, winding roads, vibrant cultures, and moments
            that stay forever. This gallery is a glimpse into the experiences
            we curate for travelers who seek more than just a trip.
          </p>
        </section>

        {/* IMAGE GRID */}
     
        {/* LOCATIONS */}
        <GalleryLocations />
      </main>

      <Footer />
    </>
  );
};

export default Gallery;
