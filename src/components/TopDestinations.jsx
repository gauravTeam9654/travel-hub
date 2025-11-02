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
  <div className="top-destinations-header">
    <h2 className="top-destinations-title">Explore Our Top Destinations</h2>
    <p className="top-destinations-subtitle">
      Discover breathtaking locations handpicked for your next adventure.
    </p>
  </div>

  <div className="destinations-grid">
    {destinations.map((destination) => (
      <Link
        key={destination.id}
        to={`/destination/${destination.slug || destination.name.replace(/\s+/g, '-').toLowerCase()}`}
        className="destination-card-link"
        onClick={handleCardClick}
      >
        <div className="destination-card">
          <div className="image-wrapper">
            <img src={destination.image} alt={destination.name} />
            <div className="image-overlay"></div>
            <h3 className="destination-name">{destination.name}</h3>
          </div>
        </div>
      </Link>
    ))}
  </div>
</div>

  );
};

export default TopDestinations;
