import React, { useState, useEffect } from "react";
import "../PackagePage.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import {
  MapPin,
  Calendar,
  Bed,
  Car,
  Binoculars,
  Coffee,
  ShoppingCart,
} from "lucide-react";
import { useParams } from "react-router-dom";
import { db } from "../../firebaseConfig";
import { collection, query, where, getDoc , doc } from "firebase/firestore";

const HiddenPackagePage = () => {
  const { slug } = useParams();
  const decodedSlug = decodeURIComponent(slug);
  console.log(decodedSlug,"<--")
  const [pkg, setPkg] = useState(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchPackage = async () => {
    try {
      const docRef = doc(db, "hiddenGems", decodedSlug); // decodedSlug = document ID
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setPkg(docSnap.data());
        console.log("Fetched package:", docSnap.data());
      } else {
        console.error("Package not found");
      }
    } catch (err) {
      console.error("Error fetching package:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchPackage();
}, [decodedSlug]);

  if (loading) return <div style={{ padding: 40 }}>Loading package...</div>;
  if (!pkg) return <div style={{ padding: 40 }}>Package not found.</div>;

  const isMobile = typeof window !== "undefined" && window.innerWidth <= 700;

  return (
    <>
  
    <Navbar fixed />

      {/* HERO SECTION */}
      <div style={{ position: "relative", height: "70vh" }}>
        <img
          src={pkg.image}
          alt={pkg.title}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.1))",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 40,
            left: 60,
            right: 60,
            color: "#fff",
            maxWidth: 1200,
          }}
        >
          <p style={{ fontSize: 14, letterSpacing: 1, opacity: 0.9 }}>
            {pkg.location} • {pkg.days}
          </p>
          <h1
            style={{
              fontSize: 44,
              fontWeight: 800,
              margin: "6px 0",
              textShadow: "0 6px 20px rgba(0,0,0,0.5)",
            }}
          >
            {pkg.title}
          </h1>
          <p
            style={{
              fontSize: 20,
              fontWeight: 500,
              color: "#ff6600",
            }}
          >
            {pkg.subtitle}
          </p>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div style={{ background: "#f9fafb", minHeight: "100vh", padding: "60px 0" }}>
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "flex",
            gap: 40,
            flexWrap: "wrap",
            padding: "0 16px",
          }}
        >
          {/* LEFT CONTENT */}
          <div style={{ flex: 2, minWidth: 300 }}>
            {/* ICON INFO ROW */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 24,
                marginBottom: 40,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <MapPin size={22} color="#ea580c" />
                <span >{pkg.location}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Calendar size={22} color="#ea580c" />
                <span >{pkg.days}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Bed size={22} color="#ea580c" />
                <span>Hotels</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Car size={22} color="#ea580c" />
                <span>Transport</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Binoculars size={22} color="#ea580c" />
                <span>Sightseeing</span>
              </div>
              {/* <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Coffee size={22} color="#ea580c" />
                <span>Meals</span>
              </div> */}
            </div>

            {/* DESCRIPTION */}
            <h2 style={{ fontSize: 26, fontWeight: 700, marginBottom: 14, color: "#0f172a" }}>
              About This Trip
            </h2>
            <p style={{ fontSize: 16.5, lineHeight: 1.9, color: "#334155", marginBottom: 40 }}>
              {pkg.description}
            </p>

            {/* ITINERARY */}
            {pkg.itinerary && pkg.itinerary.length > 0 && (
              <>
                <h2 style={{ fontSize: 26, fontWeight: 700, marginBottom: 20, color: "#0f172a" }}>
                  Detailed Itinerary ({pkg.days})
                </h2>
                {pkg.itinerary.map((day, i) => (
                  <div
                    key={i}
                    style={{
                      background: "#fff",
                      border: "1px solid #f1f5f9",
                      borderRadius: 16,
                      padding: 28,
                      marginBottom: 24,
                      boxShadow: "0 8px 25px rgba(0,0,0,0.05)",
                      transition: "all 0.3s ease",
                    }}
                  >
                    <h3 style={{ fontSize: 20, fontWeight: 700, color: "#ea580c", marginBottom: 10 }}>
                      {day.title || `Day ${i + 1}`}
                    </h3>
                    <p style={{ fontSize: 16, lineHeight: 1.8, color: "#374151", whiteSpace: "pre-line" }}>
                      {day.description}
                    </p>
                  </div>
                ))}
              </>
            )}
          </div>

          {/* RIGHT SIDEBAR */}
          <div style={{ flex: 1, minWidth: 280, position: "sticky", top: 120 }}>
            {/* PRICE */}
            <div
              style={{
                background: "#fff7ed",
                borderRadius: 18,
                padding: 28,
                marginBottom: 30,
                border: "1px solid #fed7aa",
                textAlign: "center",
              }}
            >
              <p style={{ fontSize: 14, color: "#9a3412" }}>Starting From</p>
              <h3 style={{ fontSize: 32, fontWeight: 800, color: "#ea580c" }}>
                ₹{pkg.price}
              </h3>
              <p style={{ fontSize: 14, color: "#78350f" }}>per person</p>
              {/* <button
                style={{
                  marginTop: 20,
                  width: "100%",
                  padding: "12px 0",
                  border: "none",
                  borderRadius: 8,
                  backgroundColor: "#ea580c",
                  color: "#fff",
                  fontWeight: 700,
                  cursor: "pointer",
                  fontSize: 16,
                  transition: "0.3s all ease",
                }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = "#ff7a3c")}
                onMouseLeave={(e) => (e.target.style.backgroundColor = "#ea580c")}
              >
                Book Now
              </button> */}
            </div>

            {/* INCLUSIONS */}
            {pkg.inclusions && (
              <div style={{ marginBottom: 30 }}>
                <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 14 }}>
                  Inclusions
                </h3>
                <ul style={{ paddingLeft: 18 }}>
                  {pkg.inclusions.map((item, i) => (
                    <li key={i} style={{ marginBottom: 10, fontSize: 15.5, color: "#334155", display: "flex", alignItems: "center", gap: 6 }}>
                      <ShoppingCart size={16} color="#ea580c" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* EXCLUSIONS */}
            {pkg.exclusions && (
              <div>
                <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 14 }}>
                  Exclusions
                </h3>
                <ul style={{ paddingLeft: 18 }}>
                  {pkg.exclusions.map((item, i) => (
                    <li key={i} style={{ marginBottom: 10, fontSize: 15.5, color: "#475569" }}>
                      ✖ {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default HiddenPackagePage;
