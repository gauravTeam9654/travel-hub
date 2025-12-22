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

  const [selectedExtraPackage, setSelectedExtraPackage] = useState(null);

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
          console.log("Fetched destination:", docData);
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

  useEffect(() => {
  if (selectedExtraPackage) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

  return () => {
    document.body.style.overflow = "auto";
  };
}, [selectedExtraPackage]);


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

      <div className="destination-page">
        {/* HERO SECTION */}
        <section
          className="destination-hero"
          style={{ backgroundImage: `url(${dest.heroImage || ""})` }}
        >
          <div className="hero-overlay" />
          <div className="hero-content">
            <h1>{dest.heading}</h1>
            <p>{dest.description}</p>
          </div>
        </section>

        {/* EXTRA PACKAGES */}
        {dest.extraPackages?.length > 0 && (
          <section className="section">
            <div className="section-header">
              <h2 className="section-title">Exclusive Packages</h2>
              <p className="section-desc">Handpicked experiences crafted just for you.</p>
            </div>

            <div className="package-grid">
              {dest.extraPackages.map((pkg, index) => (
                <div
                  key={index}
                  className="package-card"
                  onClick={() => setSelectedExtraPackage(pkg)}
                >
                  <img src={pkg.image} alt={pkg.title} loading="lazy" />
                  <div className="package-overlay">
                    <h3>{pkg.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* PACKAGE MODAL */}
        {selectedExtraPackage && (
          <div
            className="custom-modal-overlay"
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 9999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 20,
            }}
            onClick={() => setSelectedExtraPackage(null)}
          >
            <div
              className="custom-modal-content"
              onClick={(e) => e.stopPropagation()}
              style={{
                width: "100%",
                maxWidth: 1100,
                maxHeight: "90vh",
                overflowY: "auto",
                position: "relative",
              }}
            >
              <button
                onClick={() => setSelectedExtraPackage(null)}
                style={{
                  position: "absolute",
                  top: 24,
                  right: 24,
                  background: "var(--primary)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "50%",
                  width: 44,
                  height: 44,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 20,
                  cursor: "pointer",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                  zIndex: 10,
                }}
              >
                ✕
              </button>

              {selectedExtraPackage.image && (
                <div style={{ height: 450, overflow: "hidden" }}>
                  <img
                    src={selectedExtraPackage.image}
                    alt={selectedExtraPackage.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
              )}

              <div style={{ padding: "40px 50px" }}>
                <h2
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "3rem",
                    fontWeight: 700,
                    marginBottom: 24,
                    color: "var(--text-dark)",
                  }}
                >
                  {selectedExtraPackage.title}
                </h2>

                {selectedExtraPackage.quillContent && (
                  <div
                    className="rich-content"
                    style={{ marginBottom: 40 }}
                    dangerouslySetInnerHTML={{
                      __html: selectedExtraPackage.quillContent,
                    }}
                  />
                )}

                {selectedExtraPackage.highlights?.length > 0 && (
                  <>
                    <h3
                      style={{
                        fontSize: "1.8rem",
                        fontWeight: 700,
                        marginBottom: 24,
                        color: "var(--accent)",
                        fontFamily: "'Playfair Display', serif",
                      }}
                    >
                      Journey Highlights
                    </h3>

                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                        gap: 20,
                      }}
                    >
                      {selectedExtraPackage.highlights.map((h, idx) => (
                        <div
                          key={idx}
                          style={{
                            background: "#fff",
                            padding: 24,
                            borderRadius: 20,
                            border: "1px solid #eef2f6",
                            boxShadow: "var(--shadow-sm)",
                          }}
                        >
                          <h4
                            style={{
                              fontSize: "1.2rem",
                              fontWeight: 700,
                              marginBottom: 10,
                              color: "var(--primary)",
                            }}
                          >
                            {h.title}
                          </h4>
                          <p style={{ color: "var(--text-muted)", fontSize: "1rem" }}>
                            {h.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ABOUT SECTION */}
        <section className="section">
          <div className="section-header">
            <h2 className="section-title">Discover {dest.name}</h2>
          </div>
          <div
            className="rich-content"
            style={{ textAlign: "left", maxWidth: "100%" }}
            dangerouslySetInnerHTML={{ __html: dest.descriptionRich || dest.description }}
          />
        </section>

        {/* HIGHLIGHTS SECTION */}
        {dest.highlights?.length > 0 && (
          <section className="section">
            <div className="section-header">
              <h2 className="section-title">Signature Highlights</h2>
              <p className="section-desc">The must-see spots and experiences that define {dest.name}.</p>
            </div>
            <div className="highlight-grid">
              {dest.highlights.map((place, idx) => (
                <div key={idx} className="highlight-card">
                  <h3>{place.title}</h3>
                  <p>{place.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* GALLERY SECTION */}
        {dest.galleryPhotos?.length > 0 && (
          <section className="section">
            <div className="section-header">
              <h2 className="section-title">Visual Journey</h2>
              <p className="section-desc">Glimpses of the beauty that awaits you.</p>
            </div>

            <div className="gallery-grid">
              {dest.galleryPhotos.map((img, index) => (
                <div key={index} className="gallery-item">
                  <img src={img} alt={`${dest.name} gallery ${index + 1}`} loading="lazy" />
                </div>
              ))}
            </div>
          </section>
        )}

        <Footer />
      </div>
    </>
  );
};

export default DestinationPage;

