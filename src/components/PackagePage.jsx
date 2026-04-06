import React, { useState, useEffect } from "react";
import "./ModernPackagePage.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import {
  MapPin,
  Calendar,
  Bed,
  Car,
  Binoculars,
  CheckCircle2,
  XCircle,
  MessageCircle,
} from "lucide-react";
import { useParams } from "react-router-dom";
import { db } from "../../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

const PackagePage = () => {
  const { slug } = useParams();
  const decodedSlug = decodeURIComponent(slug);
  const [pkg, setPkg] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const docRef = doc(db, "internationalTrips", decodedSlug);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setPkg(docSnap.data());
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
    window.scrollTo(0, 0);
  }, [decodedSlug]);

  if (loading) return (
    <div className="modern-package-container">
      <Navbar fixed />
      <div style={{ height: "400px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p>Loading your adventure...</p>
      </div>
    </div>
  );

  if (!pkg) return (
    <div className="modern-package-container">
      <Navbar fixed />
      <div style={{ height: "400px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p>Package not found.</p>
      </div>
    </div>
  );

  const handleWhatsApp = () => {
    const message = `Hi TravelHub! I'm interested in the "${pkg.title}" package (${pkg.days}). Could you please share more details?`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/9953773227?text=${encodedMessage}`, "_blank");
  };

  return (
    <div className="modern-package-container">
      <Navbar fixed />

      {/* Hero Section */}
      <section className="pkg-hero">
        <img src={pkg.image} alt={pkg.title} className="pkg-hero-img" />
        <div className="pkg-hero-overlay">
          <div className="pkg-hero-content">
            <span className="pkg-hero-badge">Exclusive Adventure</span>
            <h1 className="pkg-hero-title">{pkg.title}</h1>
            <p className="pkg-hero-subtitle">{pkg.subtitle}</p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="pkg-main-grid">
        <div className="pkg-left-col">
          {/* Quick Info Card */}
          <div className="pkg-card">
            <div className="pkg-info-row">
              <div className="pkg-info-item">
                <MapPin className="pkg-info-icon" size={20} />
                <span>{pkg.location}</span>
              </div>
              <div className="pkg-info-item">
                <Calendar className="pkg-info-icon" size={20} />
                <span>{pkg.days}</span>
              </div>
              <div className="pkg-info-item">
                <Bed className="pkg-info-icon" size={20} />
                <span>Premium Stays</span>
              </div>
              <div className="pkg-info-item">
                <Car className="pkg-info-icon" size={20} />
                <span>Luxury Travel</span>
              </div>
              <div className="pkg-info-item">
                <Binoculars className="pkg-info-icon" size={20} />
                <span>Sightseeing Included</span>
              </div>
            </div>
          </div>

          {/* About Section */}
          <div className="pkg-card">
            <h2 className="pkg-section-title">About This Journey</h2>
            <p className="pkg-description">{pkg.description}</p>
          </div>

          {/* Itinerary Section */}
          {pkg.itinerary && pkg.itinerary.length > 0 && (
            <div className="pkg-card">
              <h2 className="pkg-section-title">Planned Itinerary</h2>
              <div className="itinerary-list">
                {pkg.itinerary.map((day, i) => (
                  <div key={i} className="itinerary-day-card">
                    <div className="itinerary-header">
                      <span className="itinerary-day-num">Day {i + 1}</span>
                    </div>
                    <h3 className="itinerary-day-title">{day.title || `Exploring ${pkg.location}`}</h3>
                    <p className="itinerary-day-desc">{day.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="pkg-sidebar">
          <div className="sticky-sidebar">
            <div className="price-card">
              <p className="price-label">Starting from</p>
              <h3 className="price-value">₹{pkg.price}</h3>
              <p className="price-subtext">per person (limited time offer)</p>
              
              <button className="book-btn" onClick={handleWhatsApp}>
                <MessageCircle size={20} />
                Book via WhatsApp
              </button>
              
              <button className="enquiry-btn" onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}>
                Quick Enquiry
              </button>
            </div>

            {/* Inclusions Card */}
            {pkg.inclusions && pkg.inclusions.length > 0 && (
              <div className="pkg-card inclusions-card" style={{ marginTop: '25px' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '15px' }}>What's Included</h3>
                <ul className="pkg-list">
                  {pkg.inclusions.map((item, i) => (
                    <li key={i} className="pkg-list-item">
                      <CheckCircle2 className="check-icon" size={18} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Exclusions Card */}
            {pkg.exclusions && pkg.exclusions.length > 0 && (
              <div className="pkg-card exclusions-card" style={{ marginTop: '25px' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '15px' }}>Not Included</h3>
                <ul className="pkg-list">
                  {pkg.exclusions.map((item, i) => (
                    <li key={i} className="pkg-list-item">
                      <XCircle className="cross-icon" size={18} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PackagePage;

