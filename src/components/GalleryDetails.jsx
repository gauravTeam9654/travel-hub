import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { listAll, ref, getDownloadURL } from "firebase/storage";
import Loader from "../components/Loader";
import { storage } from "../../firebaseConfig";
import Navbar from "./Navbar";
import MergedFooter from "./Footer";
import "./GalleryDetails.css";

// Lightbox imports
import Lightbox from "yet-another-react-lightbox";
import Video from "yet-another-react-lightbox/plugins/video";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

const GalleryDetails = () => {
  const { location } = useParams();
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Lightbox state
  const [index, setIndex] = useState(-1);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const locRef = ref(storage, `gallery/${location}`);
        const result = await listAll(locRef);

        const files = result.items.filter(
          (item) => !item.name.includes("cover")
        );

        const urls = await Promise.all(
          files.map(async (item) => {
            const url = await getDownloadURL(item);
            const isVideo = item.name.match(/\.(mp4|webm|mov)$/i);
            return {
              url,
              isVideo,
              name: item.name
            };
          })
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

  // Prepare slides for lightbox
  const slides = media.map((item) => {
    if (item.isVideo) {
      return {
        type: "video",
        width: 1280,
        height: 720,
        poster: item.url, // Standard behavior: use video as its own poster if no other provided
        sources: [
          {
            src: item.url,
            type: "video/mp4", // Default to mp4, browser will handle most formats
          },
        ],
      };
    }
    return {
      src: item.url,
    };
  });

  if (loading) return <div className="loader-container"><Loader open={true} /></div>;

  return (
    <>
      <Navbar />
      <section className="gallery-details-section">
        <h2 className="gallery-details-heading">{location}</h2>

        <div className="gallery-details-grid">
          {media.map((item, index) => (
            <div 
                key={index} 
                className="gallery-media-item"
                onClick={() => setIndex(index)}
            >
              {item.isVideo ? (
                <video
                  src={item.url}
                  className="gallery-media-content"
                />
              ) : (
                <img
                  src={item.url}
                  alt=""
                  className="gallery-media-content"
                />
              )}
            </div>
          ))}
        </div>

        <Lightbox
          index={index}
          open={index >= 0}
          close={() => setIndex(-1)}
          slides={slides}
          plugins={[Video, Thumbnails, Zoom]}
        />
      </section>
      <MergedFooter />
    </>
  );
};

export default GalleryDetails;


