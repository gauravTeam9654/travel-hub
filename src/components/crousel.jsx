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
        storagePath,
        createdAt: new Date(),
      });

      setName("");
      setFile(null);
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

  return (
    <div style={{ maxWidth: 700, margin: "20px auto", padding: 20 }}>
      <h3>Upload Image/Video</h3>
      <input
        type="text"
        placeholder="Enter file name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ width: "100%", padding: 8, marginBottom: 10 }}
      />

      <input
        type="file"
        accept="image/*,video/*"
        onChange={handleFileChange}
        style={{ marginBottom: 10 }}
      />

      <button
        onClick={handleUpload}
        disabled={uploading}
        style={{ padding: "10px 16px", marginBottom: 20 }}
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>

      <h3>Uploaded Files</h3>

      {loadingFiles ? (
        <p>Loading...</p>
      ) : files.length === 0 ? (
        <p>No files uploaded yet.</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid #ccc", padding: 8 }}>Preview</th>
              <th style={{ border: "1px solid #ccc", padding: 8 }}>Name</th>
              <th style={{ border: "1px solid #ccc", padding: 8 }}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {files.map((f) => (
              <tr key={f.id}>
                <td style={{ border: "1px solid #ccc", padding: 8 }}>
                  {f.type === "image" ? (
                    <img
                      src={f.url}
                      alt={f.name}
                      style={{ width: 100, height: 60, objectFit: "cover" }}
                    />
                  ) : (
                    <video
                      src={f.url}
                      width="120"
                      height="70"
                      controls
                      style={{ background: "#000" }}
                    />
                  )}
                </td>

                <td style={{ border: "1px solid #ccc", padding: 8 }}>
                  <input
                    type="text"
                    value={f.name}
                    onChange={(e) => handleUpdateName(f.id, e.target.value)}
                    style={{ width: "100%" }}
                  />
                </td>

                <td style={{ border: "1px solid #ccc", padding: 8 }}>
                  <button
                    onClick={() => handleDelete(f.id, f.storagePath)}
                    style={{ color: "red", cursor: "pointer" }}
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
