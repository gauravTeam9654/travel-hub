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

      {/* 🌄 Hero Section */}
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
    <h2 className="section-title">Explore More Packages</h2>

    <div className="package-grid">
      {dest.extraPackages.map((pkg, index) => (
        <div
          key={index}
          className="package-card"
          onClick={() => setSelectedExtraPackage(pkg)}
          style={{ cursor: "pointer" }}
        >
          <img src={pkg.image} alt={pkg.title} />
          <div className="package-overlay">
            <h3>{pkg.title}</h3>
          </div>
        </div>
      ))}
    </div>
  </section>
)}

{selectedExtraPackage && (
  <div
    style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.75)",
      zIndex: 9999,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 20,
    }}
    onClick={() => setSelectedExtraPackage(null)}
  >
    {/* Modal Box */}
    <div
      onClick={(e) => e.stopPropagation()}
      style={{
        background: "#fff",
        width: "100%",
        maxWidth: 1000,
        maxHeight: "90vh",
        overflowY: "auto",
        borderRadius: 18,
        boxShadow: "0 25px 60px rgba(0,0,0,0.4)",
        position: "relative",
      }}
    >
      {/* Close Button */}
      <button
        onClick={() => setSelectedExtraPackage(null)}
        style={{
          position: "absolute",
          top: 16,
          right: 16,
          background: "#0f172a",
          color: "#fff",
          border: "none",
          borderRadius: 10,
          padding: "6px 14px",
          fontSize: 14,
          cursor: "pointer",
        }}
      >
        ✕ Close
      </button>

      {/* Image */}
      {selectedExtraPackage.image && (
        <img
          src={selectedExtraPackage.image}
          alt={selectedExtraPackage.title}
          style={{
            width: "100%",
            height: 380,
            objectFit: "cover",
            borderTopLeftRadius: 18,
            borderTopRightRadius: 18,
          }}
        />
      )}

      {/* Content */}
      <div style={{ padding: "28px 32px" }}>
        {/* Title */}
        <h2
          style={{
            fontSize: 34,
            fontWeight: 700,
            marginBottom: 20,
            color: "#0f172a",
          }}
        >
          {selectedExtraPackage.title}
        </h2>

        {/* Quill Content */}
        {selectedExtraPackage.quillContent && (
          <div
            className="rich-content"
            style={{
              fontSize: 16,
              lineHeight: 1.7,
              color: "#334155",
              marginBottom: 36,
            }}
            dangerouslySetInnerHTML={{
              __html: selectedExtraPackage.quillContent,
            }}
          />
        )}

        {/* Highlights */}
        {selectedExtraPackage.highlights?.length > 0 && (
          <>
            <h3
              style={{
                fontSize: 24,
                fontWeight: 600,
                marginBottom: 18,
                color: "#f97316",
              }}
            >
              Package Highlights
            </h3>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: 18,
              }}
            >
              {selectedExtraPackage.highlights.map((h, idx) => (
                <div
                  key={idx}
                  style={{
                    background: "#f8fafc",
                    padding: 18,
                    borderRadius: 14,
                    border: "1px solid #e2e8f0",
                    transition: "all 0.2s ease",
                  }}
                >
                  <h4
                    style={{
                      fontSize: 16,
                      fontWeight: 600,
                      marginBottom: 8,
                      color: "#0f172a",
                    }}
                  >
                    {h.title}
                  </h4>
                  <p
                    style={{
                      fontSize: 14,
                      color: "#475569",
                      lineHeight: 1.6,
                    }}
                  >
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



  {/* ABOUT */}
  <section className="section light">
    <h2 className="section-title">About {dest.name}</h2>
    <p className="section-desc">{dest.description}</p>

    <div
      className="rich-content"
      dangerouslySetInnerHTML={{ __html: dest.descriptionRich }}
    />
  </section>

  {/* HIGHLIGHTS */}
  <section className="section light">
    <h2 className="section-title">{dest.name} Highlights</h2>

    {dest.highlights?.length ? (
      <div className="highlight-grid">
        {dest.highlights.map((place, idx) => (
          <div key={idx} className="highlight-card">
            <h3>{place.title}</h3>
            <p>{place.description}</p>
          </div>
        ))}
      </div>
    ) : (
      <p>No highlights available.</p>
    )}
  </section>

  {/* 🖼️ DESTINATION GALLERY */}
{dest.galleryPhotos?.length > 0 && (
  <section className="section light">
    <h2 className="section-title">{dest.name} Gallery</h2>

    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        gap: 18,
        marginTop: 20,
      }}
    >
      {dest.galleryPhotos.map((img, index) => (
        <div
          key={index}
          style={{
            borderRadius: 16,
            overflow: "hidden",
            boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
            cursor: "pointer",
          }}
        >
          <img
            src={img}
            alt={`${dest.name} gallery ${index + 1}`}
            style={{
              width: "100%",
              height: 220,
              objectFit: "cover",
              transition: "transform 0.4s ease",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.transform = "scale(1.08)")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.transform = "scale(1)")
            }
          />
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
