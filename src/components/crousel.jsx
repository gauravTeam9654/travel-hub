import React, { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";

const DashboardImageManager = () => {
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [images, setImages] = useState([]);
  const [loadingImages, setLoadingImages] = useState(true);

  const fetchImages = async () => {
    setLoadingImages(true);
    try {
      const snapshot = await getDocs(collection(db, "dashboard_img"));
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setImages(data);
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoadingImages(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleFileChange = (e) => {
    if (e.target.files[0]) setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!name || !file) {
      alert("Please provide both name and image file.");
      return;
    }

    setUploading(true);
    try {
      // Convert image file to Base64 string
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = async () => {
        const base64String = reader.result;

        await addDoc(collection(db, "dashboard_img"), {
          name,
          imageBase64: base64String,
          createdAt: new Date(),
        });

        setName("");
        setFile(null);
        fetchImages();
        setUploading(false);
      };
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload image.");
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this image?");
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "dashboard_img", id));
      fetchImages();
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete image.");
    }
  };

  const handleUpdateName = async (id, newName) => {
    try {
      await updateDoc(doc(db, "dashboard_img", id), { name: newName });
      fetchImages();
    } catch (error) {
      console.error("Update failed:", error);
      alert("Failed to update name.");
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "20px auto", padding: 20, border: "1px solid #ccc", borderRadius: 8 }}>
      <h3>Upload Dashboard Image</h3>
      <input
        type="text"
        placeholder="Enter image name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ width: "100%", padding: 8, marginBottom: 10 }}
      />
      <input type="file" accept="image/*" onChange={handleFileChange} style={{ marginBottom: 10 }} />
      <button
        onClick={handleUpload}
        disabled={uploading}
        style={{ padding: "8px 16px", marginBottom: 20, cursor: uploading ? "not-allowed" : "pointer" }}
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>

      <h3>Uploaded Images</h3>
      {loadingImages ? (
        <p>Loading...</p>
      ) : images.length === 0 ? (
        <p>No images uploaded yet.</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid #ccc", padding: 8 }}>Image</th>
              <th style={{ border: "1px solid #ccc", padding: 8 }}>Name</th>
              <th style={{ border: "1px solid #ccc", padding: 8 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {images.map((img) => (
              <tr key={img.id}>
                <td style={{ border: "1px solid #ccc", padding: 8 }}>
                  <img
                    src={img.imageBase64}
                    alt={img.name}
                    style={{ width: 100, height: 60, objectFit: "cover" }}
                  />
                </td>
                <td style={{ border: "1px solid #ccc", padding: 8 }}>
                  <input
                    type="text"
                    value={img.name}
                    onChange={(e) => handleUpdateName(img.id, e.target.value)}
                    style={{ width: "100%" }}
                  />
                </td>
                <td style={{ border: "1px solid #ccc", padding: 8 }}>
                  <button onClick={() => handleDelete(img.id)} style={{ color: "red", cursor: "pointer" }}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DashboardImageManager;
