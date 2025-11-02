import React, { useEffect, useMemo, useRef, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { getTabsForDestination } from "../data/destinationTabs";
import PackageCard from "./PackageCard";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../DestinationPackage.css";

// Firebase imports
import { db } from "../../firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";

const DestinationPage = () => {
  const { slug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState(0);
  const [isManualTabClick, setIsManualTabClick] = useState(false);
  const [loading, setLoading] = useState(true);
  const [dest, setDest] = useState(null);

  // Refs for smooth scrolling
  const packagesRef = useRef(null);
  const aboutRef = useRef(null);
  const placesRef = useRef(null);
  const lakesRef = useRef(null);
  const monasteriesRef = useRef(null);
  const offbeatRef = useRef(null);
  const guideRef = useRef(null);

  const indexToTab = useMemo(
    () => ({
      0: "packages",
      1: "about",
      2: "places",
      3: "lakes",
      4: "monasteries",
      5: "offbeat",
      6: "guide",
    }),
    []
  );

  // ✅ Fetch destination data from Firestore
  useEffect(() => {
    const fetchDestination = async () => {
      setLoading(true);
      try {
        const q = query(collection(db, "destinations"), where("slug", "==", slug));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const docData = querySnapshot.docs[0].data();
          setDest(docData);
        } else {
          setDest(null);
        }
      } catch (err) {
        console.error("Error fetching destination:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDestination();
  }, [slug]);

  // 🧭 Handle tab change
  const handleTabChange = (idx) => {
    setActiveTab(idx);
    setIsManualTabClick(true);

    const refMap = {
      0: packagesRef,
      1: aboutRef,
      2: placesRef,
      3: lakesRef,
      4: monasteriesRef,
      5: offbeatRef,
      6: guideRef,
    };

    const targetRef = refMap[idx];
    if (targetRef?.current) {
      const offset = 80;
      const el = targetRef.current;
      const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }

    const tabKey = indexToTab[idx] || "packages";
    navigate({ pathname: location.pathname, search: `?tab=${tabKey}` }, { replace: true });
  };

  // Update tab when URL changes
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tabFromQuery = (searchParams.get("tab") || "").toLowerCase();

    const tabMap = {
      packages: 0,
      about: 1,
      places: 2,
      highlights: 2,
      lakes: 3,
      monasteries: 4,
      offbeat: 5,
      guide: 6,
    };

    setActiveTab(tabMap[tabFromQuery] ?? 0);
  }, [location.search]);

  if (loading) {
    return (
      <>
        <Navbar fixed />
        <div style={{ padding: "100px", textAlign: "center" }}>Loading destination...</div>
        <Footer />
      </>
    );
  }

  if (!dest) {
    return (
      <>
        <Navbar fixed />
        <div style={{ padding: "100px", textAlign: "center" }}>Destination not found.</div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar fixed />

      {/* 🌄 Hero Section */}
      <div className="destination-main-bg">
        <div
          className="destination-hero"
          style={{
            background: `url(${dest.heroImage || ""}) center/cover no-repeat`,
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            minHeight: 650,
            height: "75vh",
            width: "100%",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.32)",
              zIndex: 1,
            }}
          ></div>

          <div
            className="destination-hero-text"
            style={{
              position: "relative",
              zIndex: 2,
              maxWidth: 600,
              padding: "0 24px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <h1 style={{ color: "#fff", fontSize: 44, fontWeight: 700, marginBottom: 16 }}>
              {dest.heading}
            </h1>
            <p style={{ color: "#fff", fontSize: 20 }}>{dest.description}</p>
          </div>
        </div>

        {/* 🧭 Tabs */}

{/* 🧳 Extra Packages Section */}
{dest.extraPackages && dest.extraPackages.length > 0 && (
  <section
    id="extra-packages"
    style={{
      margin: "60px 0",
      padding: "40px 32px",
      background: "#ffffff",
      borderRadius: "16px",
    }}
  >
    <h2
      style={{
        fontSize: "2rem",
        fontWeight: "700",
        color: "#1a237e",
        marginBottom: "30px",
        textAlign: "center",
      }}
    >
      Explore More Packages
    </h2>

    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "20px",
      }}
    >
      {dest.extraPackages.map((pkg, index) => (
        <div
          key={index}
          style={{
            position: "relative",
            borderRadius: "12px",
            overflow: "hidden",
            height: "250px",
            cursor: "pointer",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            transition: "transform 0.3s ease",
          }}
          onClick={() => {
            // Optional: Navigate to a package details page if available
            console.log("Clicked package:", pkg.title);
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <img
            src={pkg.image}
            alt={pkg.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0.2))",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              padding: "20px",
            }}
          >
            <h3
              style={{
                color: "#fff",
                fontSize: "1.4rem",
                fontWeight: "600",
                textAlign: "center",
                textShadow: "0 2px 4px rgba(0,0,0,0.6)",
              }}
            >
              {pkg.title}
            </h3>
          </div>
        </div>
      ))}
    </div>
  </section>
)}




        <div className="destination-tabs" ref={guideRef}>
          {getTabsForDestination(dest.slug, dest.name).map((tab, idx) => (
            <button
              key={tab.label}
              className={`destination-tab-btn${activeTab === idx ? " active" : ""}`}
              onClick={() => handleTabChange(idx)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 🏞️ About Section */}
        <section id="about" ref={aboutRef} style={{ margin: "40px 0", background: "#f7f8fa", borderRadius: 16, padding: "40px 32px" }}>
          <h2 style={{ fontSize: "2rem", fontWeight: 700, color: "#1a237e", marginBottom: 18 }}>
            About {dest.name}
          </h2>
          <p style={{ fontSize: "1.2rem", color: "#333" }}>{dest.description}</p>
        </section>

        {/* 🌆 Highlights */}
        <section id="highlights" ref={placesRef} style={{ margin: "40px 0", background: "#f7f8fa", borderRadius: 16, padding: "40px 32px" }}>
          <h2 style={{ fontSize: "2rem", fontWeight: 700, color: "#1a237e", marginBottom: 18 }}>
            Best Places to Visit in {dest.name}
          </h2>
          {(!dest.highlights || dest.highlights.length === 0) ? (
            <p>No highlights available.</p>
          ) : (
            dest.highlights.map((place, idx) => (
              <div
                key={idx}
                style={{
                  marginBottom: 24,
                  background: "#fff",
                  borderRadius: 12,
                  padding: 24,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                }}
              >
                <h3 style={{ fontSize: "1.3rem", fontWeight: 600, marginBottom: 8 }}>
                  {place.title}
                </h3>
                <p>{place.description}</p>
              </div>
            ))
          )}
        </section>

        <Footer />
      </div>
    </>
  );
};

export default DestinationPage;
