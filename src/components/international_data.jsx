import React, { useState, useEffect } from "react";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db, storage } from "../../firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const AddTripPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    location: "",
    days: "",
    price: "",
    description: "",
    images: [],
    inclusions: "",
    exclusions: "",
  });
  const [uploading, setUploading] = useState(false);
  const [itinerary, setItinerary] = useState([{ title: "", description: "" }]);
  const [trips, setTrips] = useState([]); // 🔹 store fetched trips
  const [editingTrip, setEditingTrip] = useState(null); // 🔹 for edit mode

  // ✅ Fetch existing trips
  const fetchTrips = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "internationalTrips"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTrips(data);
    } catch (error) {
      console.error("Error fetching trips:", error);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  // ✅ Handle text input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleImageUpload = async (e) => {
  const files = Array.from(e.target.files);
  if (files.length === 0) return;

  setUploading(true);

  try {
    const uploadPromises = files.map(async (file) => {
      const fileRef = ref(storage, `destinations/${Date.now()}-${file.name}`);
      await uploadBytes(fileRef, file);
      return getDownloadURL(fileRef);
    });

    const newUrls = await Promise.all(uploadPromises);
    setFormData((prev) => ({ ...prev, images: [...prev.images, ...newUrls] }));
    alert(`${files.length} image(s) uploaded successfully!`);
  } catch (err) {
    console.error("Upload Error:", err);
    alert("Image upload failed");
  }

  setUploading(false);
};

const removeImage = (index) => {
  setFormData((prev) => ({
    ...prev,
    images: prev.images.filter((_, i) => i !== index),
  }));
};



  // ✅ Itinerary Handlers
  const handleItineraryChange = (index, field, value) => {
    const updated = [...itinerary];
    updated[index][field] = value;
    setItinerary(updated);
  };
  const addItineraryRow = () => setItinerary([...itinerary, { title: "", description: "" }]);
  const removeItineraryRow = (index) =>
    setItinerary(itinerary.filter((_, i) => i !== index));

  // ✅ Save or Update Trip
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedData = {
      ...formData,
      days: `${formData.days} Days`,
      inclusions: formData.inclusions.split(",").map((i) => i.trim()),
      exclusions: formData.exclusions.split(",").map((i) => i.trim()),
      itinerary,
      createdAt: new Date(),
    };

    try {
      if (editingTrip) {
        // Update existing trip
        const tripRef = doc(db, "internationalTrips", editingTrip);
        await updateDoc(tripRef, formattedData);
        alert("Trip updated successfully!");
        setEditingTrip(null);
      } else {
        // Add new trip
        await addDoc(collection(db, "internationalTrips"), formattedData);
        alert("Trip added successfully!");
      }

      setFormData({
        title: "",
        subtitle: "",
        location: "",
        days: "",
        price: "",
        description: "",
        images: [],
        inclusions: "",
        exclusions: "",
      });
      setItinerary([{ title: "", description: "" }]);
      fetchTrips(); // refresh list
    } catch (err) {
      console.error("Error saving trip:", err);
      alert("Failed to save trip");
    }
  };

  // ✅ Edit Trip
  const handleEdit = (trip) => {
    setEditingTrip(trip.id);
    setFormData({
      title: trip.title || "",
      subtitle: trip.subtitle || "",
      location: trip.location || "",
      days: trip.days.replace(" Days", "") || "",
      price: trip.price || "",
      description: trip.description || "",
      images: trip.images || (trip.image ? [trip.image] : []),
      inclusions: (trip.inclusions || []).join(", "),
      exclusions: (trip.exclusions || []).join(", "),
    });
    setItinerary(trip.itinerary || [{ title: "", description: "" }]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ✅ Delete Trip
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this trip?")) return;
    try {
      await deleteDoc(doc(db, "internationalTrips", id));
      alert("Trip deleted successfully!");
      fetchTrips();
    } catch (error) {
      console.error("Error deleting trip:", error);
      alert("Failed to delete trip");
    }
  };

  return (
    <div
      style={{
        padding: "50px",
        maxWidth: "900px",
        margin: "40px auto",
        backgroundColor: "#f9f9f9",
        borderRadius: "10px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "30px", color: "#333" }}>
        {editingTrip ? "Edit Trip" : "Add International Trip"}
      </h1>

      {/* 🔸 FORM SECTION */}
   <form
  onSubmit={handleSubmit}
  style={{
    display: "flex",
    flexDirection: "column",
    gap: "24px",
    maxWidth: "800px",
    margin: "40px auto",
    backgroundColor: "#fff",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
    fontFamily: "Inter, sans-serif",
  }}
>
  {/* Title & Subtitle */}
  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
    <div>
      <label style={{ fontWeight: 600 }}>Trip Title</label>
      <input
        name="title"
        placeholder="Enter trip title"
        value={formData.title}
        onChange={handleChange}
        required
        style={{
          width: "100%",
          padding: "12px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          marginTop: "6px",
        }}
      />
    </div>

    <div>
      <label style={{ fontWeight: 600 }}>Subtitle</label>
      <input
        name="subtitle"
        placeholder="Enter subtitle"
        value={formData.subtitle}
        onChange={handleChange}
        style={{
          width: "100%",
          padding: "12px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          marginTop: "6px",
        }}
      />
    </div>
  </div>

  {/* Location, Days, Price */}
  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "20px" }}>
    <div>
      <label style={{ fontWeight: 600 }}>Location</label>
      <input
        name="location"
        placeholder="Location"
        value={formData.location}
        onChange={handleChange}
        style={{
          width: "100%",
          padding: "12px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          marginTop: "6px",
        }}
      />
    </div>
    <div>
      <label style={{ fontWeight: 600 }}>Days</label>
      <input
        name="days"
        placeholder="Days"
        value={formData.days}
        onChange={handleChange}
        style={{
          width: "100%",
          padding: "12px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          marginTop: "6px",
        }}
      />
    </div>
    <div>
      <label style={{ fontWeight: 600 }}>Price</label>
      <input
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
        style={{
          width: "100%",
          padding: "12px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          marginTop: "6px",
        }}
      />
    </div>
  </div>

  {/* Image Upload - Multiple */}
  <div>
    <label style={{ fontWeight: 600 }}>Upload Images (Multiple allowed)</label>
    <input
      type="file"
      accept="image/*"
      multiple
      onChange={handleImageUpload}
      style={{ marginTop: "10px" }}
    />
    {uploading && <p style={{ color: "#ff6600" }}>Uploading images...</p>}
    {formData.images.length > 0 && (
      <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginTop: "15px" }}>
        {formData.images.map((url, idx) => (
          <div key={idx} style={{ position: "relative", width: "150px", height: "110px" }}>
            <img
              src={url}
              alt={`preview-${idx}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "8px",
                border: "2px solid #eee",
              }}
            />
            <button
              type="button"
              onClick={() => removeImage(idx)}
              style={{
                position: "absolute",
                top: "-8px",
                right: "-8px",
                backgroundColor: "#e74c3c",
                color: "#fff",
                border: "none",
                borderRadius: "50%",
                width: "24px",
                height: "24px",
                cursor: "pointer",
                fontSize: "14px",
                lineHeight: "1",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              x
            </button>
          </div>
        ))}
      </div>
    )}
  </div>

  {/* Description */}
  <div>
    <label style={{ fontWeight: 600 }}>Trip Description</label>
    <textarea
      name="description"
      placeholder="Write about the trip..."
      value={formData.description}
      onChange={handleChange}
      rows={4}
      style={{
        width: "100%",
        padding: "12px",
        borderRadius: "8px",
        border: "1px solid #ccc",
        marginTop: "6px",
        resize: "vertical",
      }}
    />
  </div>

  {/* Inclusions & Exclusions */}
  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
    <div>
      <label style={{ fontWeight: 600 }}>Inclusions</label>
      <textarea
        name="inclusions"
        placeholder="Comma-separated inclusions"
        value={formData.inclusions}
        onChange={handleChange}
        rows={3}
        style={{
          width: "100%",
          padding: "12px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          marginTop: "6px",
          resize: "vertical",
        }}
      />
    </div>
    <div>
      <label style={{ fontWeight: 600 }}>Exclusions</label>
      <textarea
        name="exclusions"
        placeholder="Comma-separated exclusions"
        value={formData.exclusions}
        onChange={handleChange}
        rows={3}
        style={{
          width: "100%",
          padding: "12px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          marginTop: "6px",
          resize: "vertical",
        }}
      />
    </div>
  </div>

  {/* Itinerary */}
  <div
    style={{
      backgroundColor: "#f9fafb",
      padding: "25px",
      borderRadius: "10px",
      border: "1px solid #eee",
    }}
  >
    <h3 style={{ marginBottom: "16px", fontSize: "20px", fontWeight: 700 }}>Itinerary</h3>
    {itinerary.map((item, index) => (
      <div
        key={index}
        style={{
          marginBottom: 20,
          padding: "15px",
          borderRadius: "8px",
          backgroundColor: "#fff",
          border: "1px solid #ddd",
        }}
      >
        <input
          placeholder={`Day ${index + 1} Title`}
          value={item.title}
          onChange={(e) => handleItineraryChange(index, "title", e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            marginBottom: "10px",
          }}
        />
        <textarea
          placeholder={`Day ${index + 1} Description`}
          value={item.description}
          onChange={(e) => handleItineraryChange(index, "description", e.target.value)}
          rows={3}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            marginBottom: "10px",
            resize: "vertical",
          }}
        />
        {itinerary.length > 1 && (
          <button
            type="button"
            onClick={() => removeItineraryRow(index)}
            style={{
              backgroundColor: "#e74c3c",
              color: "#fff",
              border: "none",
              padding: "8px 12px",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Remove
          </button>
        )}
      </div>
    ))}
    <button
      type="button"
      onClick={addItineraryRow}
      style={{
        backgroundColor: "#27ae60",
        color: "#fff",
        border: "none",
        padding: "10px 15px",
        borderRadius: "6px",
        cursor: "pointer",
        fontWeight: "bold",
      }}
    >
      + Add Day
    </button>
  </div>

  {/* Submit */}
  <button
    type="submit"
    style={{
      backgroundColor: "#ff6600",
      color: "#fff",
      padding: "15px",
      borderRadius: "8px",
      fontSize: "18px",
      fontWeight: "bold",
      border: "none",
      cursor: "pointer",
      marginTop: "10px",
    }}
  >
    {editingTrip ? "Update Trip" : "Save Trip"}
  </button>
</form>


      {/* 🔸 DISPLAY EXISTING TRIPS */}
      <div style={{ marginTop: "50px" }}>
        <h2 style={{ marginBottom: "20px" }}>Existing International Trips</h2>
        {trips.length === 0 ? (
          <p>No trips found.</p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "20px",
            }}
          >
            {trips.map((trip) => (
              <div
                key={trip.id}
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "10px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  overflow: "hidden",
                  textAlign: "center",
                  paddingBottom: "15px",
                }}
              >
                <img
                  src={(trip.images && trip.images[0]) || trip.image}
                  alt={trip.title}
                  style={{ width: "100%", height: "160px", objectFit: "cover" }}
                />
                <h3 style={{ margin: "10px 0", fontSize: "18px" }}>{trip.title}</h3>
                <p style={{ color: "#666", fontSize: "14px" }}>{trip.location}</p>
                <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "10px" }}>
                  <button
                    onClick={() => handleEdit(trip)}
                    style={{ backgroundColor: "#3498db", color: "#fff", padding: "8px 12px", borderRadius: "6px" }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(trip.id)}
                    style={{ backgroundColor: "#e74c3c", color: "#fff", padding: "8px 12px", borderRadius: "6px" }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddTripPage;
