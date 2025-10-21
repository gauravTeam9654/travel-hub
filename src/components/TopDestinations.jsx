import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../firebaseConfig"; // your Firebase config
import { collection, getDocs } from "firebase/firestore";
import "../Topdestinations.css";

const TopDestinations = () => {
  const [destinations, setDestinations] = useState([]);

  // Fetch destinations from Firestore
  const fetchDestinations = async () => {
    try {
      const snapshot = await getDocs(collection(db, "destinations"));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setDestinations(data);
    } catch (error) {
      console.error("Error fetching destinations:", error);
    }
  };

  useEffect(() => {
    fetchDestinations();
  }, []);

  const handleCardClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="top-destinations-container">
      <h2 className="top-destinations-title">Top Destinations</h2>
      <div className="destinations-grid">
        {destinations.map((destination) => (
          <Link
            key={destination.id}
            to={`/destination/${destination.slug || destination.name.replace(/\s+/g, '-').toLowerCase()}`}
            style={{ textDecoration: 'none' }}
            onClick={handleCardClick}
          >
            <div className="destination-card" style={{ position: 'relative', overflow: 'hidden' }}>
              <img
                src={destination.image}
                alt={destination.name}
                className="destination-image"
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '20px' }}
              />
              <div style={{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0,
                padding: '0 0 24px 0',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-end',
                height: '100%',
                pointerEvents: 'none',
              }}>
                <span style={{
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: '2rem',
                  textShadow: '0 2px 8px rgba(0,0,0,0.6)',
                  fontFamily: 'inherit',
                  letterSpacing: '0.5px',
                  background: 'rgba(0,0,0,0.0)',
                  borderRadius: '10px',
                  padding: '0.2em 1em',
                }}>
                  {destination.name}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TopDestinations;
