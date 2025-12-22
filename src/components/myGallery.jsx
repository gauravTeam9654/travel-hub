import { useEffect, useState } from "react";
import { ref, uploadBytes, listAll, deleteObject, getDownloadURL } from "firebase/storage";
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
  const [mediaItems, setMediaItems] = useState([]); // 🔹 State for listed media
  const [editingLocation, setEditingLocation] = useState(null); // 🔹 State for location edit
  const [editLocName, setEditLocName] = useState("");
  const [editLocCover, setEditLocCover] = useState(null);

  // Fetch existing locations
  const fetchLocations = async () => {
    try {
      const galleryRef = ref(storage, "gallery");
      const result = await listAll(galleryRef);
      setLocations(result.prefixes.map((p) => p.name));
    } catch (err) {
      console.error("Error fetching locations:", err);
    }
  };

  // 🔹 Fetch media for selected location
  const fetchMedia = async (loc) => {
    if (!loc) {
      setMediaItems([]);
      return;
    }
    setLoading(true);
    try {
      const locationRef = ref(storage, `gallery/${loc}`);
      const result = await listAll(locationRef);
      
      const items = await Promise.all(
        result.items
          .filter(item => item.name !== "cover") // Skip cover image
          .map(async (item) => {
            const url = await getDownloadURL(item);
            return { name: item.name, url, fullPath: item.fullPath };
          })
      );
      setMediaItems(items);
    } catch (err) {
      console.error("Error fetching media:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  // 🔹 Re-fetch media when location changes
  useEffect(() => {
    fetchMedia(selectedLocation);
  }, [selectedLocation]);

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
      const coverRef = ref(storage, `gallery/${newLocation}/cover`);
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

  /* ================= UPDATE LOCATION (EDIT) ================= */
  // const handleUpdateLocation = async () => {
  //   if (!editingLocation) return;
  //   if (!editLocName) {
  //     alert("Location name cannot be empty");
  //     return;
  //   }

  //   setLoading(true);
  //   try {
  //     // 1. If name changed, migrate all files
  //     if (editLocName !== editingLocation) {
  //       if (locations.includes(editLocName)) {
  //         alert("New name already exists");
  //         setLoading(false);
  //         return;
  //       }

  //       const oldRef = ref(storage, `gallery/${editingLocation}`);
  //       const result = await listAll(oldRef);

  //       // Migrate each file
  //       await Promise.all(
  //         result.items.map(async (item) => {
  //           const blob = await fetch(await getDownloadURL(item)).then(r => r.blob());
  //           const newFileRef = ref(storage, `gallery/${editLocName}/${item.name}`);
  //           await uploadBytes(newFileRef, blob);
  //           await deleteObject(item);
  //         })
  //       );
  //     }

  //     // 2. If new cover provided, update it
  //     if (editLocCover) {
  //       const coverRef = ref(storage, `gallery/${editLocName}/cover`);
  //       await uploadBytes(coverRef, editLocCover);
  //     }

  //     alert("Location updated successfully ✅");
  //     setEditingLocation(null);
  //     setEditLocCover(null);
  //     fetchLocations();
  //     if (selectedLocation === editingLocation) setSelectedLocation(editLocName);
  //   } catch (err) {
  //     console.error("Update failed:", err);
  //     alert("Failed to update location ❌");
  //   } finally {
  //     setLoading(false);
  //   }
  // };


  const copyFolder = async (sourceRef, destPath) => {
  const res = await listAll(sourceRef);

  // copy files
  await Promise.all(
    res.items.map(async (item) => {
      const url = await getDownloadURL(item);
      const blob = await fetch(url).then(r => r.blob());
      const newRef = ref(storage, `${destPath}/${item.name}`);
      await uploadBytes(newRef, blob);
      await deleteObject(item);
    })
  );

  // recurse folders
  await Promise.all(
    res.prefixes.map((folder) =>
      copyFolder(folder, `${destPath}/${folder.name}`)
    )
  );
};



  const handleUpdateLocation = async () => {
  if (!editingLocation || !editLocName) {
    alert("Invalid location data");
    return;
  }

  setLoading(true);

  try {
    // 🔁 Rename folder
    if (editLocName !== editingLocation) {
      if (locations.includes(editLocName)) {
        alert("Location already exists");
        setLoading(false);
        return;
      }

      const oldRef = ref(storage, `gallery/${editingLocation}`);
      await copyFolder(oldRef, `gallery/${editLocName}`);

      // update state
      setLocations(prev =>
        prev.map(loc => loc === editingLocation ? editLocName : loc)
      );
    }

    // 🖼 Update cover image
    if (editLocCover) {
      const coverRef = ref(
        storage,
        `gallery/${editLocName || editingLocation}/cover`
      );
      await uploadBytes(coverRef, editLocCover);
    }

    alert("Location updated successfully ✅");

    setEditingLocation(null);
    setEditLocCover(null);

    if (selectedLocation === editingLocation) {
      setSelectedLocation(editLocName);
    }

  } catch (err) {
    console.error("Update failed:", err);
    alert("Failed to update location ❌");
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
      fetchMedia(selectedLocation); // Refresh list
    } catch (err) {
      console.error(err);
      alert("Upload failed ❌");
    } finally {
      setLoading(false);
    }
  };

  /* ================= DELETE MEDIA ================= */
  const handleDeleteMedia = async (itemPath) => {
    if (!window.confirm("Are you sure you want to delete this file?")) return;

    setLoading(true);
    try {
      const fileRef = ref(storage, itemPath);
      await deleteObject(fileRef);
      alert("Deleted successfully ✅");
      fetchMedia(selectedLocation);
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete ❌");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <section
      style={{
        padding: "80px 8%",
        maxWidth: "900px",
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
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "16px" }}>
          <input
            type="text"
            placeholder="Location name (e.g. Manali)"
            value={newLocation}
            onChange={(e) => setNewLocation(e.target.value)}
            style={{ ...input, marginBottom: 0 }}
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setCoverImage(e.target.files[0])}
            style={{ ...input, marginBottom: 0 }}
          />
        </div>
        <button onClick={handleAddLocation} style={primaryBtn}>
          Add Location with Cover Image
        </button>
      </div>

      {/* ========= FORM 2 : MANAGE LOCATIONS (EDIT) ========= */}
      <div style={card}>
        <h3 style={subHeading}>Manage Locations</h3>
        {editingLocation ? (
          <div style={{ backgroundColor: "#fff8f1", padding: "15px", borderRadius: "8px", border: "1px solid #ffe3cd" }}>
            <h4 style={{ marginBottom: "12px", color: "#e66a00" }}>Editing: {editingLocation}</h4>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "16px" }}>
              <div>
                <label style={{ fontSize: "0.8rem", color: "#666" }}>New Location Name</label>
                <input
                  type="text"
                  value={editLocName}
                  onChange={(e) => setEditLocName(e.target.value)}
                  style={{ ...input, marginBottom: 0 }}
                />
              </div>
              <div>
                <label style={{ fontSize: "0.8rem", color: "#666" }}>New Cover Image (Optional)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setEditLocCover(e.target.files[0])}
                  style={{ ...input, marginBottom: 0 }}
                />
              </div>
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <button onClick={handleUpdateLocation} style={{ ...primaryBtn, flex: 1 }}>Save Changes</button>
              <button onClick={() => setEditingLocation(null)} style={{ ...deleteBtn, flex: 0.3, background: "#f3f4f6", color: "#4b5563", border: "1px solid #d1d5db" }}>Cancel</button>
            </div>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: "12px" }}>
            {locations.map((loc, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px", background: "#f9fafb", borderRadius: "8px", border: "1px solid #eee" }}>
                <span style={{ fontSize: "0.9rem", fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{loc}</span>
                <button 
                  onClick={() => {
                    setEditingLocation(loc);
                    setEditLocName(loc);
                  }}
                  style={{ background: "transparent", border: "none", color: "#2563eb", cursor: "pointer", fontSize: "0.8rem", fontWeight: 600 }}
                >
                  Edit
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ========= FORM 3 : UPLOAD MEDIA ========= */}
      <div style={card}>
        <h3 style={subHeading}>Upload Media to Location</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "16px" }}>
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            style={{ ...input, marginBottom: 0 }}
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
            style={{ ...input, marginBottom: 0 }}
          />
        </div>
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

      {/* ========= LIST MEDIA : DISPLAY FILES ========= */}
      {selectedLocation && (
        <div style={card}>
          <h3 style={subHeading}>Files in {selectedLocation}</h3>
          {mediaItems.length === 0 ? (
            <p style={{ textAlign: "center", color: "#666" }}>No files found in this location.</p>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: "20px" }}>
              {mediaItems.map((item, idx) => (
                <div key={idx} style={mediaCard}>
                  <div style={mediaPreview}>
                    {item.name.match(/\.(mp4|webm|ogg)$/i) || item.url.includes(".mp4") ? (
                      <video src={item.url} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    ) : (
                      <img src={item.url} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    )}
                  </div>
                  <div style={{ padding: "8px" }}>
                    <p style={mediaTitle}>{item.name.split('-')[0]}</p>
                    <button
                      onClick={() => handleDeleteMedia(item.fullPath)}
                      style={deleteBtn}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
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

const mediaCard = {
  background: "#f8f9fa",
  borderRadius: "8px",
  overflow: "hidden",
  border: "1px solid #eee",
  transition: "transform 0.2s",
};

const mediaPreview = {
  width: "100%",
  height: "120px",
  background: "#000",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
};

const mediaTitle = {
  fontSize: "0.85rem",
  fontWeight: 500,
  color: "#333",
  marginBottom: "8px",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
};

const deleteBtn = {
  width: "100%",
  padding: "6px",
  background: "#fee2e2",
  color: "#dc2626",
  border: "1px solid #fecaca",
  borderRadius: "4px",
  fontSize: "0.8rem",
  cursor: "pointer",
  transition: "all 0.2s",
};

export default GalleryUploader;
