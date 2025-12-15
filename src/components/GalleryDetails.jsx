import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { listAll, ref, getDownloadURL } from "firebase/storage";
// import { storage } from "../firebaseConfig";
import Loader from "../components/Loader";
import { storage } from "../../firebaseConfig";
import Navbar from "./Navbar";
import MergedFooter from "./Footer";

const GalleryDetails = () => {
  const { location } = useParams();
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const locRef = ref(storage, `gallery/${location}`);
        const result = await listAll(locRef);

        const files = result.items.filter(
          (item) => !item.name.includes("cover")
        );

        const urls = await Promise.all(
          files.map(async (item) => ({
            url: await getDownloadURL(item),
            isVideo: item.name.match(/\.(mp4|webm|mov)$/),
          }))
        );

        setMedia(urls);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMedia();
  }, [location]);

  if (loading) return <Loader />;

  return (
    <>
        <Navbar/>
    <section style={section}>
      <h2 style={heading}>{location}</h2>

      <div style={grid}>
        {media.map((item, index) =>
          item.isVideo ? (
            <video
              key={index}
              src={item.url}
              controls
              style={mediaItem}
            />
          ) : (
            <img
              key={index}
              src={item.url}
              alt=""
              style={mediaItem}
            />
          )
        )}
      </div>
    </section>
      <MergedFooter/>
      </>
  );
};

export default GalleryDetails;

/* ---------- STYLES ---------- */

const section = {
  padding: "10px 8%",
  fontFamily: "'Poppins', sans-serif",
};

const heading = {
  fontSize: "2.2rem",
  fontWeight: 600,
  marginBottom: "40px",
  textAlign: "center",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: "20px",
};

const mediaItem = {
  width: "100%",
  height: "220px",
  objectFit: "cover",
  borderRadius: "12px",
  boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
};
