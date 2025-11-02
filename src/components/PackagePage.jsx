import React, { useState, useEffect } from "react";
import "../PackagePage.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import {
  FaBed,
  FaCar,
  FaBinoculars,
  FaUtensils,
  FaMapMarkerAlt,
  FaRegCalendarAlt,
} from "react-icons/fa";
import { useParams } from "react-router-dom";
import { db } from "../../firebaseConfig";
import { collection, query, where, getDoc , doc } from "firebase/firestore";

const PackagePage = () => {
  const { slug } = useParams();
  const decodedSlug = decodeURIComponent(slug);
  console.log(decodedSlug,"<--")
  const [pkg, setPkg] = useState(null);
  const [loading, setLoading] = useState(true);

// ✅ Fetch data for the selected trip
// import { doc, getDoc } from "firebase/firestore";

useEffect(() => {
  const fetchPackage = async () => {
    try {
      const docRef = doc(db, "internationalTrips", decodedSlug); // decodedSlug = document ID
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
      <div className="package-detail-main" style={{ background: "#fff", minHeight: "100vh" }}>
        <div className="image-gradient-container">
          <img
            src={pkg.image}
            alt={pkg.title}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <img src="/Gradient.png" alt="Gradient Overlay" className="gradient-overlay" />
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 2,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              padding: "32px 48px",
            }}
          >
            <h1
              style={{
                color: "#fff",
                fontSize: 36,
                fontWeight: 700,
                marginBottom: 8,
                textShadow: "0 2px 8px #0006",
              }}
            >
              {pkg.title}
            </h1>
          </div>
        </div>

        <div className="package-content-wrapper">
          <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 16px" }}>
            <h2 style={{ fontSize: 28, fontWeight: 600, marginBottom: 12, marginTop: 32 }}>
              {pkg.subtitle}
            </h2>

            {/* <div className="icon-row-scroll">
              <div style={{ textAlign: "center" }}>
                <FaMapMarkerAlt style={{ color: "#222", fontSize: 28 }} />
                <p>{pkg.location}</p>
              </div>
              <div style={{ textAlign: "center" }}>
                <FaRegCalendarAlt style={{ color: "#222", fontSize: 26 }} />
                <p>{pkg.days}</p>
              </div>
              <div style={{ textAlign: "center" }}>
                <FaBed style={{ color: "#bbb", fontSize: 28 }} />
                <p style={{ color: "#bbb" }}>Hotels</p>
              </div>
              <div style={{ textAlign: "center" }}>
                <FaCar style={{ color: "#bbb", fontSize: 28 }} />
                <p style={{ color: "#bbb" }}>Transport</p>
              </div>
              <div style={{ textAlign: "center" }}>
                <FaBinoculars style={{ color: "#bbb", fontSize: 28 }} />
                <p style={{ color: "#bbb" }}>Sightseeing</p>
              </div>
              <div style={{ textAlign: "center" }}>
                <FaUtensils style={{ color: "#bbb", fontSize: 28 }} />
                <p style={{ color: "#bbb" }}>Meals</p>
              </div>
            </div> */}

            <div
              className="package-two-col"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
                gap: 32,
                maxWidth: 1400,
                margin: "0 auto",
                padding: "40px 16px 0 16px",
                flexWrap: "wrap",
              }}
            >
              <div className="left-main" style={{ flex: 2, minWidth: 0 }}>
                <h3 style={{ fontSize: 22, fontWeight: 600, marginBottom: 8 }}>
                  Tour Package Description
                </h3>
                <div style={{ fontSize: 16, color: "#222", lineHeight: 1.7 }}>
                  {pkg.description}
                </div>

                {/* Itinerary Section */}
                {pkg.itinerary && pkg.itinerary.length > 0 && (
                  <div style={{ marginTop: 32 }}>
                    <h3 style={{ fontSize: 22, fontWeight: 600, marginBottom: 16 }}>
                      Itinerary ({pkg.days})
                    </h3>
                    {pkg.itinerary.map((day, i) => (
                      <div
                        key={i}
                        style={{
                          background: "#fafbfc",
                          borderRadius: 12,
                          boxShadow: "0 2px 8px #0001",
                          padding: 24,
                          marginBottom: 20,
                        }}
                      >
                        <h4 style={{ color: "#ff6600", fontWeight: 700, fontSize: 20 }}>
                          {day.title || `Day ${i + 1}`}
                        </h4>
                        <ul style={{ paddingLeft: 20, fontSize: 16, color: "#222" }}>
                          {/* {day.details?.map((line, j) => ( */}
                            <li>{day.description}</li>
                          {/* ))} */}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Right Sidebar */}
              {/* <div className="right-sidebar" style={{ flex: 1, minWidth: 280, marginTop: 40 }}>
                {(pkg.inclusions?.length > 0 || pkg.exclusions?.length > 0) && (
                  <div
                    className="inclusions-block"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 40,
                      marginTop: 20,
                    }}
                  >
                    {pkg.inclusions && (
                      <div>
                        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 12 }}>
                          Inclusions
                        </h2>
                        <ul style={{ paddingLeft: 20, fontSize: 16, color: "#222" }}>
                          {pkg.inclusions.map((item, i) => (
                            <li key={i}>⦿ {item}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {pkg.exclusions && (
                      <div>
                        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 12 }}>
                          Exclusions
                        </h2>
                        <ul style={{ paddingLeft: 20, fontSize: 16, color: "#222" }}>
                          {pkg.exclusions.map((item, i) => (
                            <li key={i}>✖ {item}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div> */}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PackagePage;
