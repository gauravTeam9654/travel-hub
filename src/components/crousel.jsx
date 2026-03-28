import React, { useEffect, useState } from "react";
import { db, storage } from "../../firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

const DashboardFileManager = () => {
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [deviceType, setDeviceType] = useState("website"); // Default to website
  const [uploading, setUploading] = useState(false);
  const [files, setFiles] = useState([]);
  const [loadingFiles, setLoadingFiles] = useState(true);

  const fetchFiles = async () => {
    setLoadingFiles(true);
    try {
      const snapshot = await getDocs(collection(db, "dashboard_files"));
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFiles(data);
    } catch (error) {
      console.error("Error fetching files:", error);
    } finally {
      setLoadingFiles(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleFileChange = (e) => {
    if (e.target.files[0]) setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!name || !file) {
      alert("Please provide a name and file.");
      return;
    }

    setUploading(true);
    try {
      const fileType = file.type.startsWith("image") ? "image" : "video";
      const storagePath = `${fileType}s/${Date.now()}-${file.name}`;

      const fileRef = ref(storage, storagePath);

      await uploadBytes(fileRef, file);
      const downloadURL = await getDownloadURL(fileRef);

      await addDoc(collection(db, "dashboard_files"), {
        name,
        url: downloadURL,
        type: fileType,
        deviceType, // Save mobile or website
        storagePath,
        createdAt: new Date(),
      });

      setName("");
      setFile(null);
      setDeviceType("website");
      fetchFiles();
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload file.");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id, storagePath) => {
    const confirmDelete = window.confirm("Delete this file?");
    if (!confirmDelete) return;

    try {
      // Delete from Storage bucket
      await deleteObject(ref(storage, storagePath));

      // Delete Firestore entry
      await deleteDoc(doc(db, "dashboard_files", id));

      fetchFiles();
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete file.");
    }
  };

  const handleUpdateName = async (id, newName) => {
    try {
      await updateDoc(doc(db, "dashboard_files", id), { name: newName });
      fetchFiles();
    } catch (error) {
      console.error("Update failed:", error);
      alert("Failed to update name.");
    }
  };

  const handleUpdateDeviceType = async (id, newType) => {
    try {
      await updateDoc(doc(db, "dashboard_files", id), { deviceType: newType });
      fetchFiles();
    } catch (error) {
      console.error("Update failed:", error);
      alert("Failed to update device type.");
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: "20px auto", padding: 20 }}>
      <h3>Upload Hero Image/Video</h3>
      <div style={{ marginBottom: 15 }}>
        <input
          type="text"
          placeholder="Enter file name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ width: "100%", padding: 8, marginBottom: 10, borderRadius: 4, border: "1px solid #ccc" }}
        />

        <div style={{ marginBottom: 10 }}>
          <label style={{ marginRight: 15 }}>
            <input
              type="radio"
              value="website"
              checked={deviceType === "website"}
              onChange={(e) => setDeviceType(e.target.value)}
            /> Website (Desktop)
          </label>
          <label>
            <input
              type="radio"
              value="mobile"
              checked={deviceType === "mobile"}
              onChange={(e) => setDeviceType(e.target.value)}
            /> Mobile
          </label>
        </div>

        <input
          type="file"
          accept="image/*,video/*"
          onChange={handleFileChange}
          style={{ marginBottom: 10, display: "block" }}
        />

        <button
          onClick={handleUpload}
          disabled={uploading}
          style={{ 
            padding: "10px 20px", 
            backgroundColor: "#007bff", 
            color: "white", 
            border: "none", 
            borderRadius: "4px",
            cursor: uploading ? "not-allowed" : "pointer"
          }}
        >
          {uploading ? "Uploading..." : "Upload to Hero"}
        </button>
      </div>

      <h3>Manage Current Media</h3>

      {loadingFiles ? (
        <p>Loading items...</p>
      ) : files.length === 0 ? (
        <p>No media uploaded yet.</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 10 }}>
          <thead>
            <tr style={{ backgroundColor: "#f8f9fa" }}>
              <th style={{ border: "1px solid #ddd", padding: 12, textAlign: "left" }}>Preview</th>
              <th style={{ border: "1px solid #ddd", padding: 12, textAlign: "left" }}>Details</th>
              <th style={{ border: "1px solid #ddd", padding: 12, textAlign: "left" }}>Device</th>
              <th style={{ border: "1px solid #ddd", padding: 12, textAlign: "center" }}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {files.map((f) => (
              <tr key={f.id}>
                <td style={{ border: "1px solid #ddd", padding: 12 }}>
                  {f.type === "image" ? (
                    <img
                      src={f.url}
                      alt={f.name}
                      style={{ width: 120, height: 70, objectFit: "cover", borderRadius: 4 }}
                    />
                  ) : (
                    <video
                      src={f.url}
                      width="120"
                      height="70"
                      style={{ background: "#000", borderRadius: 4 }}
                    />
                  )}
                </td>

                <td style={{ border: "1px solid #ddd", padding: 12 }}>
                  <input
                    type="text"
                    value={f.name}
                    onChange={(e) => handleUpdateName(f.id, e.target.value)}
                    style={{ width: "100%", padding: "4px 8px", borderRadius: 4, border: "1px solid #eee" }}
                  />
                  <div style={{ fontSize: "0.8rem", color: "#666", marginTop: 4 }}>Type: {f.type}</div>
                </td>

                <td style={{ border: "1px solid #ddd", padding: 12 }}>
                  <select 
                    value={f.deviceType || "website"} 
                    onChange={(e) => handleUpdateDeviceType(f.id, e.target.value)}
                    style={{ padding: "4px 8px", borderRadius: 4 }}
                  >
                    <option value="website">Website</option>
                    <option value="mobile">Mobile</option>
                  </select>
                </td>

                <td style={{ border: "1px solid #ddd", padding: 12, textAlign: "center" }}>
                  <button
                    onClick={() => handleDelete(f.id, f.storagePath)}
                    style={{ 
                        color: "#dc3545", 
                        cursor: "pointer", 
                        border: "none", 
                        background: "none",
                        fontWeight: "bold"
                    }}
                  >
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

export default DashboardFileManager;

