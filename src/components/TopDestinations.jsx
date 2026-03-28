import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import "../Topdestinations.css";

const TopDestinations = () => {
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const snapshot = await getDocs(collection(db, "destinations"));
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setDestinations(data);
      } catch (error) {
        console.error("Error fetching destinations:", error);
      }
    };
    fetchDestinations();
  }, []);

  const handleCardClick = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="top-destinations-container">
      <div className="top-destinations-header">
        <p className="top-destinations-eyebrow">✦ &nbsp; Where Do You Want To Go? &nbsp; ✦</p>
        <h2 className="top-destinations-title">
          Explore Our <span>Top Destinations</span>
        </h2>
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
                <img src={destination.image} alt={destination.name} loading="lazy" />
                <div className="image-overlay" />
                <h3 className="destination-name">{destination.name}</h3>
                <span className="destination-explore-pill">Explore →</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TopDestinations;
