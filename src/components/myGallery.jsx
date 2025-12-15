import { useEffect, useState } from "react";
import { ref, uploadBytes, listAll } from "firebase/storage";
// import { storage } from "../firebase/firebaseConfig";
import Loader from "./Loader";
import { storage } from "../../firebaseConfig";

const GalleryUploader = () => {
  const [locations, setLocations] = useState([]);
  const [newLocation, setNewLocation] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch existing locations
  const fetchLocations = async () => {
    const galleryRef = ref(storage, "gallery");
    const result = await listAll(galleryRef);
    setLocations(result.prefixes.map((p) => p.name));
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  /* ================= ADD LOCATION ================= */
  const handleAddLocation = async () => {
    
    if (!newLocation || !coverImage) {
      alert("Location name and cover image are required");
      return;
    }

    if (locations.includes(newLocation)) {
      alert("Location already exists");
      return;
    }

    setLoading(true);

    try {
      const coverRef = ref(
        storage,
        `gallery/${newLocation}/cover`
      );

      await uploadBytes(coverRef, coverImage);

      setLocations((prev) => [...prev, newLocation]);
      setSelectedLocation(newLocation);
      setNewLocation("");
      setCoverImage(null);

      alert("Location added successfully ✅");
    } catch (err) {
      console.error(err);
      alert("Failed to add location ❌");
    } finally {
      setLoading(false);
    }
  };

  /* ================= UPLOAD MEDIA ================= */
  const handleUpload = async () => {
    if (!selectedLocation || !file || !title) {
      alert("Fill all upload fields");
      return;
    }

    setLoading(true);

    try {
      const fileRef = ref(
        storage,
        `gallery/${selectedLocation}/${title}-${Date.now()}`
      );

      await uploadBytes(fileRef, file);

      alert("Media uploaded successfully ✅");
      setTitle("");
      setFile(null);
    } catch (err) {
      console.error(err);
      alert("Upload failed ❌");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <section
      style={{
        padding: "80px 8%",
        maxWidth: "720px",
        margin: "0 auto",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <h2 style={heading}>
        Gallery <span style={{ color: "#ff7a18" }}>Manager</span>
      </h2>

      {/* ========= FORM 1 : ADD LOCATION ========= */}
      <div style={card}>
        <h3 style={subHeading}>Add New Location</h3>

        <input
          type="text"
          placeholder="Location name (e.g. Manali)"
          value={newLocation}
          onChange={(e) => setNewLocation(e.target.value)}
          style={input}
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setCoverImage(e.target.files[0])}
          style={input}
        />

        <button onClick={handleAddLocation} style={primaryBtn}>
          Add Location with Cover Image
        </button>
      </div>

      {/* ========= FORM 2 : UPLOAD MEDIA ========= */}
      <div style={card}>
        <h3 style={subHeading}>Upload Media to Location</h3>

        <select
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          style={input}
        >
          <option value="">-- Select Location --</option>
          {locations.map((loc, i) => (
            <option key={i} value={loc}>
              {loc}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Image / Video Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={input}
        />

        <input
          type="file"
          accept="image/*,video/*"
          onChange={(e) => setFile(e.target.files[0])}
          style={input}
        />

        <button onClick={handleUpload} style={primaryBtn}>
          Upload Media
        </button>
      </div>
    </section>
  );
};

/* ================= STYLES ================= */

const heading = {
  textAlign: "center",
  fontSize: "2.2rem",
  fontWeight: 600,
  marginBottom: "50px",
};

const subHeading = {
  fontSize: "1.2rem",
  fontWeight: 600,
  marginBottom: "16px",
  color: "#333",
};

const card = {
  background: "#fff",
  padding: "24px",
  borderRadius: "12px",
  boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
  marginBottom: "40px",
};

const input = {
  width: "100%",
  padding: "12px",
  marginBottom: "16px",
  borderRadius: "8px",
  border: "1px solid #ddd",
  fontSize: "0.95rem",
};

const primaryBtn = {
  width: "100%",
  padding: "14px",
  background: "#ff7a18",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  fontSize: "1rem",
  fontWeight: 500,
  cursor: "pointer",
};

export default GalleryUploader;
