import { useEffect, useState } from "react";
import { listAll, ref, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { storage } from "../../firebaseConfig";
import "./GalleryLocations.css";

const GalleryLocations = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const galleryRef = ref(storage, "gallery");
        const result = await listAll(galleryRef);

        const data = await Promise.all(
          result.prefixes.map(async (folder) => {
            let coverUrl = "";

            try {
              coverUrl = await getDownloadURL(
                ref(storage, `gallery/${folder.name}/cover`)
              );
            } catch {}

            return {
              name: folder.name,
              cover: coverUrl,
            };
          })
        );

        setLocations(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  if (loading) return <div className="loader-container"><Loader open={true} /></div>;

  return (
    <section className="gallery-locations-section">
      <h2 className="gallery-locations-heading">
        Our <span>Gallery</span>
      </h2>

      <div className="gallery-locations-grid">
        {locations.map((loc, index) => (
          <div
            key={index}
            onClick={() => navigate(`/mygallery/${loc.name}`)}
            className="gallery-location-card"
          >
            <img
              src={loc.cover}
              alt={loc.name}
              className="gallery-location-image"
            />

            <div className="gallery-location-overlay">
              <h3 className="gallery-location-title">{loc.name}</h3>
              <p className="gallery-location-explore">Explore Collection →</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default GalleryLocations;

