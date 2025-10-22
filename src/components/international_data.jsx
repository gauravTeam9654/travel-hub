import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
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
    image: "",
    inclusions: "",
    exclusions: "",
  });

  const [uploading, setUploading] = useState(false);
  const [itinerary, setItinerary] = useState([{ title: "", description: "" }]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

//   const handleImageUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     setUploading(true);
//     const storageRef = ref(storage, `tripImages/${Date.now()}_${file.name}`);

//     try {
//       await uploadBytes(storageRef, file);
//       const downloadURL = await getDownloadURL(storageRef);
//       setFormData({ ...formData, image: downloadURL });
//       alert("Image uploaded successfully!");
//     } catch (err) {
//       console.error("Image upload error:", err);
//       alert("Failed to upload image");
//     } finally {
//       setUploading(false);
//     }
//   };

  const handleImageUpload = async () => {
      if ( !file) {
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




  // Itinerary handlers
  const handleItineraryChange = (index, field, value) => {
    const updated = [...itinerary];
    updated[index][field] = value;
    setItinerary(updated);
  };

  const addItineraryRow = () => {
    setItinerary([...itinerary, { title: "", description: "" }]);
  };

  const removeItineraryRow = (index) => {
    const updated = itinerary.filter((_, i) => i !== index);
    setItinerary(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedData = {
        ...formData,
        days: `${formData.days} Days`,
        inclusions: formData.inclusions.split(",").map((item) => item.trim()),
        exclusions: formData.exclusions.split(",").map((item) => item.trim()),
        itinerary,
        createdAt: new Date(),
      };

      await addDoc(collection(db, "internationalTrips"), formattedData);
      alert("Trip added successfully!");

      setFormData({
        title: "",
        subtitle: "",
        location: "",
        days: "",
        price: "",
        description: "",
        image: "",
        inclusions: "",
        exclusions: "",
      });
      setItinerary([{ title: "", description: "" }]);
    } catch (err) {
      console.error("Error adding trip:", err);
      alert("Failed to add trip");
    }
  };

  return (
    <div
      style={{
        padding: "50px",
        maxWidth: "850px",
        margin: "40px auto",
        backgroundColor: "#f9f9f9",
        borderRadius: "10px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "30px", color: "#333" }}>
        Add International Trip
      </h1>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <input
          name="title"
          placeholder="Trip Title"
          value={formData.title}
          onChange={handleChange}
          required
          style={{
            padding: "15px",
            fontSize: "16px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />
        <input
          name="subtitle"
          placeholder="Subtitle"
          value={formData.subtitle}
          onChange={handleChange}
          style={{
            padding: "15px",
            fontSize: "16px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />
        <input
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          style={{
            padding: "15px",
            fontSize: "16px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />
        <div style={{ display: "flex", gap: "20px" }}>
          <input
            name="days"
            placeholder="Number of Days"
            value={formData.days}
            onChange={handleChange}
            style={{
              flex: 1,
              padding: "15px",
              fontSize: "16px",
              borderRadius: "6px",
              border: "1px solid #ccc",
            }}
          />
          <input
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            style={{
              flex: 1,
              padding: "15px",
              fontSize: "16px",
              borderRadius: "6px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        {/* Image Upload */}
        <div>
          <label style={{ display: "block", marginBottom: "6px", fontWeight: "bold" }}>
            Upload Image:
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              borderRadius: "6px",
              width: "100%",
              backgroundColor: "#fff",
            }}
          />
          {uploading && (
            <p style={{ color: "#ff6600", fontSize: "14px" }}>Uploading image...</p>
          )}
          {formData.image && (
            <img
              src={formData.image}
              alt="Uploaded Preview"
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
                borderRadius: "8px",
                marginTop: "10px",
              }}
            />
          )}
        </div>

        {/* Description */}
        <textarea
          name="description"
          placeholder="Trip Description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          style={{
            padding: "15px",
            fontSize: "16px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />

        {/* Inclusions */}
        <textarea
          name="inclusions"
          placeholder="Inclusions (comma-separated)"
          value={formData.inclusions}
          onChange={handleChange}
          rows={3}
          style={{
            padding: "15px",
            fontSize: "16px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />

        {/* Exclusions */}
        <textarea
          name="exclusions"
          placeholder="Exclusions (comma-separated)"
          value={formData.exclusions}
          onChange={handleChange}
          rows={3}
          style={{
            padding: "15px",
            fontSize: "16px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />

        {/* Dynamic Itinerary */}
        <div
          style={{
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "8px",
            border: "1px solid #ddd",
          }}
        >
          <h3 style={{ marginBottom: "10px", color: "#333" }}>Itinerary</h3>
          {itinerary.map((item, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                marginBottom: "15px",
                borderBottom: "1px solid #eee",
                paddingBottom: "10px",
              }}
            >
              <input
                placeholder={`Day ${index + 1} Title`}
                value={item.title}
                onChange={(e) =>
                  handleItineraryChange(index, "title", e.target.value)
                }
                style={{
                  padding: "12px",
                  fontSize: "15px",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                }}
              />
              <textarea
                placeholder={`Day ${index + 1} Description`}
                value={item.description}
                onChange={(e) =>
                  handleItineraryChange(index, "description", e.target.value)
                }
                rows={3}
                style={{
                  padding: "12px",
                  fontSize: "15px",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
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
                    borderRadius: "6px",
                    padding: "8px 12px",
                    cursor: "pointer",
                    alignSelf: "flex-end",
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
              padding: "10px 16px",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "15px",
              fontWeight: "bold",
            }}
          >
            + Add Day
          </button>
        </div>

        <button
          type="submit"
          style={{
            backgroundColor: "#ff6600",
            color: "#fff",
            padding: "15px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "18px",
            fontWeight: "bold",
            transition: "0.3s",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#e55a00")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#ff6600")}
        >
          Save Trip
        </button>
      </form>
    </div>
  );
};

export default AddTripPage;
