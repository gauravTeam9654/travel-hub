import React, { useEffect, useMemo } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import PackageCard from "./PackageCard";
import {
  sikkimPackages,
  bhutanPackages,
  darjeelingPackages,
  meghalayaPackages,
  arunachalPackages,
  gangtokPackages,
} from "../data/tourpackages";
import "../Topdestinations.css";

const PopularPackagesPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Combine all packages; order chosen to surface diverse options first
  const allPackages = useMemo(
    () => [
      ...sikkimPackages,
      ...darjeelingPackages,
      ...gangtokPackages,
      ...bhutanPackages,
      ...meghalayaPackages,
      ...arunachalPackages,
    ],
    []
  );

  return (
    <>
  <Navbar fixed />
      {/* Hero banner */}
      <div
        style={{
          width: "100%",
          minHeight: 360,
          height: "56vh",
          maxHeight: 560,
          position: "relative",
          overflow: "hidden",
          borderRadius: 0,
          margin: "0 0 24px 0",
          background: `url(/darjeeling-final.png) center/cover no-repeat`,
          display: "flex",
          alignItems: "flex-end",
        }}
      >
        <img
          src="/Gradient.png"
          alt="gradient"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", mixBlendMode: "lighten" }}
        />
        <div style={{ position: "relative", zIndex: 2, padding: "24px 28px" }}>
          <h1 style={{ color: "#fff", fontSize: 42, fontWeight: 700, margin: 0, textShadow: "0 2px 10px #0008" }}>
            Tour Packages
          </h1>
        </div>
      </div>

      {/* Cards grid */}
      <section style={{ maxWidth: 1400, margin: "0 auto 40px auto" }}>
        <div className="tour-packages-grid">
          {allPackages.map((pkg) => (
            <a
              key={pkg.slug}
              href={`/package/${encodeURIComponent(pkg.slug)}`}
              style={{ textDecoration: "none" }}
            >
              <PackageCard image={pkg.image} title={pkg.title} subtitle={pkg.subtitle || "Tour Packages"} />
            </a>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
};

export default PopularPackagesPage;
