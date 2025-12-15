import { useEffect, useState } from "react";
import { listAll, ref, getDownloadURL } from "firebase/storage";
// import { storage } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { storage } from "../../firebaseConfig";

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

  if (loading) return <Loader />;

  return (
    <section style={section}>
      <h2 style={heading}>
        Our <span style={{ color: "#ff7a18" }}>Gallery</span>
      </h2>

      <div style={grid}>
        {locations.map((loc, index) => (
          <div
            key={index}
            onClick={() => navigate(`/mygallery/${loc.name}`)}
            style={card}
          >
            <img
              src={loc.cover}
              alt={loc.name}
              style={image}
            />

            <div style={overlay}>
              <h3 style={title}>{loc.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default GalleryLocations;

/* ---------- STYLES ---------- */

const section = {
  padding: "90px 8%",
  fontFamily: "'Poppins', sans-serif",
};

const heading = {
  textAlign: "center",
  fontSize: "2.4rem",
  fontWeight: 600,
  marginBottom: "60px",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: "30px",
};

const card = {
  position: "relative",
  height: "260px",
  borderRadius: "14px",
  overflow: "hidden",
  cursor: "pointer",
  boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
};

const image = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
};

const overlay = {
  position: "absolute",
  inset: 0,
  background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent)",
  display: "flex",
  alignItems: "flex-end",
  padding: "20px",
};

const title = {
  color: "#fff",
  fontSize: "1.4rem",
  fontWeight: 600,
};
