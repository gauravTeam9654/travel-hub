// import React, { useEffect, useMemo, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   collection,
//   getDocs,
//   setDoc,
//   doc,
//   deleteDoc,
// } from "firebase/firestore";
// import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
// import {
//   signInWithEmailAndPassword,
//   setPersistence,
//   browserSessionPersistence,
//   signOut,
// } from "firebase/auth";
// import { auth, db } from "../../firebaseConfig";
// import "../AdminPanel.css";
// import DashboardImageManager from "./crousel";
// import AddTripPage from "./international_data";

// const initialForm = {
//   image: "",        // will store image URL (not base64)
//   title: "",
//   subtitle: "Tour Packages",
//   slug: "",
//   destinationSlug: "",
//   days: "",
//   price: "",
//   description: "",
//   inclusions: [],
//   exclusions: [],
//   faq: [],
//   itinerary: [],
//   highlights: [], // <-- new dynamic titles+descriptions
// };

// const initialDestForm = {
//   slug: "",
//   name: "",
//   image: "",
//   heroImage: "",
//   heading: "",
//   description: "",
//   monasteriesSection: null,
//   highlights: [],
//   extraPackages: [],
// };

// const AdminPanel = () => {
//   const navigate = useNavigate();
//   const [isAuth, setIsAuth] = useState(() => sessionStorage.getItem("admin.auth") === "yes");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [packages, setPackages] = useState([]);
//   const [destinations, setDestinations] = useState([]);
//   const [form, setForm] = useState(initialForm);
//   const [editingSlug, setEditingSlug] = useState("");
//   const [destForm, setDestForm] = useState(initialDestForm);
//   const [editingDestSlug, setEditingDestSlug] = useState("");
//   const [showPkgForm, setShowPkgForm] = useState(false);
//   const [showDestForm, setShowDestForm] = useState(false);
//   const [openPreview, setOpenPreview] = useState("");

// // track which destination's inline manager is open
// const [openExtraManagerFor, setOpenExtraManagerFor] = useState(null);

// // draft for the inline manager (single package at a time)
// const [extraDraft, setExtraDraft] = useState({ title: "", image: "", highlights: [] });

// // index when editing an existing extra inside a destination
// const [editingExtraIndexFor, setEditingExtraIndexFor] = useState({ slug: null, index: null });

// const storage = getStorage();

// // ---------------------------
// // Image compression utility
// // ---------------------------
// const compressImage = (file, maxWidth = 1600, quality = 0.8) => {
//   return new Promise((resolve, reject) => {
//     const img = new Image();
//     const url = URL.createObjectURL(file);
//     img.onload = () => {
//       let { width, height } = img;
//       if (width > maxWidth) {
//         const ratio = maxWidth / width;
//         width = maxWidth;
//         height = height * ratio;
//       }
//       const canvas = document.createElement("canvas");
//       canvas.width = width;
//       canvas.height = height;
//       const ctx = canvas.getContext("2d");
//       ctx.drawImage(img, 0, 0, width, height);
//       canvas.toBlob(
//         (blob) => {
//           URL.revokeObjectURL(url);
//           if (blob) resolve(blob);
//           else reject(new Error("Compression failed"));
//         },
//         "image/jpeg",
//         quality
//       );
//     };
//     img.onerror = (e) => {
//       URL.revokeObjectURL(url);
//       reject(e);
//     };
//     img.src = url;
//   });
// };

// // Upload compressed image to Firebase Storage and return public URL
// const uploadCompressedImage = async (file, folder = "packages") => {
//   try {
//     const blob = await compressImage(file, 1600, 0.8);
//     const ref = storageRef(storage, `${folder}/${Date.now()}-${file.name.replace(/\s+/g, "_")}`);
//     await uploadBytes(ref, blob);
//     const url = await getDownloadURL(ref);
//     return url;
//   } catch (err) {
//     console.error("uploadCompressedImage error", err);
//     throw err;
//   }
// };

// // ---------------------------
// // Save (add or update) an extra package directly on a destination in Firestore
// // ---------------------------
// const saveExtraPackageForDestination = async (destSlug) => {
//   if (!extraDraft.title) return alert("fill title");

//   try {
//     // if extraDraft.image is a File (object), upload it first
//     let imageUrl = extraDraft.image;
//     if (extraDraft.imageFile) {
//       imageUrl = await uploadCompressedImage(extraDraft.imageFile, "extraPackages");
//     }

//     // find destination object from state
//     const destination = destinations.find(d => d.slug === destSlug) || null;
//     const current = destination?.extraPackages ? [...destination.extraPackages] : [];

//     const newPkg = { title: extraDraft.title, image: imageUrl || "", highlights: extraDraft.highlights || [] };

//     // if editing, replace at index
//     if (editingExtraIndexFor.slug === destSlug && editingExtraIndexFor.index !== null) {
//       current[editingExtraIndexFor.index] = newPkg;
//     } else {
//       current.push(newPkg);
//     }

//     // write back to Firestore (merge)
//     await setDoc(doc(db, "destinations", destSlug), { extraPackages: current }, { merge: true });

//     // refresh local list
//     await fetchDestinations();

//     // reset UI
//     setExtraDraft({ title: "", image: "", highlights: [] });
//     setEditingExtraIndexFor({ slug: null, index: null });
//     setOpenExtraManagerFor(null);
//   } catch (err) {
//     console.error("save extra pkg error", err);
//     alert("Failed to save extra package");
//   }
// };

// // start editing an existing extra package for a destination
// const startEditExtraForDestination = (destSlug, index) => {
//   const destination = destinations.find(d => d.slug === destSlug);
//   if (!destination) return;
//   const pkg = destination.extraPackages?.[index] || { title: "", image: "", highlights: [] };
//   // populate draft
//   setExtraDraft({ title: pkg.title || "", image: pkg.image || "", highlights: pkg.highlights || [] });
//   setEditingExtraIndexFor({ slug: destSlug, index });
//   setOpenExtraManagerFor(destSlug);
// };

// // delete an extra package from a destination
// const deleteExtraFromDestination = async (destSlug, index) => {
//   if (!window.confirm("Remove this package?")) return;
//   try {
//     const destination = destinations.find(d => d.slug === destSlug);
//     const current = destination?.extraPackages ? [...destination.extraPackages] : [];
//     current.splice(index, 1);
//     await setDoc(doc(db, "destinations", destSlug), { extraPackages: current }, { merge: true });
//     await fetchDestinations();
//   } catch (err) {
//     console.error("delete extra pkg error", err);
//     alert("Failed to delete extra package");
//   }
// };


// // ---------------------------
// // Fetch Data
// // ---------------------------
// const fetchPackages = async () => {
//   const snapshot = await getDocs(collection(db, "packages"));
//   setPackages(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
// };

// const fetchDestinations = async () => {
//   const snapshot = await getDocs(collection(db, "destinations"));
//   setDestinations(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
// };

// useEffect(() => {
//   if (isAuth) {
//     fetchPackages();
//     fetchDestinations();
//   }
// }, [isAuth]);

// // ---------------------------
// // LOGIN
// // ---------------------------
// const handleLogin = async (e) => {
//   e.preventDefault();
//   try {
//     await setPersistence(auth, browserSessionPersistence);
//     await signInWithEmailAndPassword(auth, email, password);
//     sessionStorage.setItem("admin.auth", "yes");
//     setIsAuth(true);
//   } catch (error) {
//     console.error(error);
//     alert("Login failed! Check your email or password.");
//   }
// };

// // ---------------------------
// // LOGOUT
// // ---------------------------
// const handleLogout = async () => {
//   await signOut(auth);
//   sessionStorage.removeItem("admin.auth");
//   setIsAuth(false);
// };

// // ---------------------------
// // CRUD: PACKAGES
// // ---------------------------
// const handlePackageSubmit = async (e) => {
//   e.preventDefault();
//   if (!form.slug) return alert("Slug is required!");
//   try {
//     // if form has an imageFile, upload and replace image field with URL
//     let imageUrl = form.image;
//     if (form.imageFile) {
//       imageUrl = await uploadCompressedImage(form.imageFile, "packages");
//     }

//     const payload = { ...form, image: imageUrl };
//     // remove transient fields (imageFile)
//     delete payload.imageFile;

//     const docRef = doc(db, "packages", form.slug);
//     await setDoc(docRef, payload, { merge: true });
//     alert(editingSlug ? "Package updated!" : "Package added!");
//     clearForm();
//     fetchPackages();
//   } catch (err) {
//     console.error(err);
//     alert("Failed to save package");
//   }
// };

// const handleDeletePackage = async (slug) => {
//   if (!window.confirm("Delete this package?")) return;
//   await deleteDoc(doc(db, "packages", slug));
//   fetchPackages();
// };

// const clearForm = () => {
//   setForm(initialForm);
//   setEditingSlug("");
//   setShowPkgForm(false);
// };

// // ---------------------------
// // CRUD: DESTINATIONS
// // ---------------------------
// const handleDestSubmit = async (e) => {
//   e.preventDefault();
//   if (!destForm.slug) return alert("Destination slug is required!");
//   try {
//     // upload dest images if present
//     let imageUrl = destForm.image;
//     let heroUrl = destForm.heroImage;
//     if (destForm.imageFile) imageUrl = await uploadCompressedImage(destForm.imageFile, "destinations");
//     if (destForm.heroImageFile) heroUrl = await uploadCompressedImage(destForm.heroImageFile, "destinations");

//     const payload = { ...destForm, image: imageUrl, heroImage: heroUrl };
//     delete payload.imageFile;
//     delete payload.heroImageFile;

//     const docRef = doc(db, "destinations", destForm.slug);
//     await setDoc(docRef, payload, { merge: true });
//     alert(editingDestSlug ? "Destination updated!" : "Destination added!");
//     setDestForm(initialDestForm);
//     setEditingDestSlug("");
//     setShowDestForm(false);
//     fetchDestinations();
//   } catch (err) {
//     console.error(err);
//     alert("Failed to save destination");
//   }
// };

// const handleDeleteDestination = async (slug) => {
//   if (!window.confirm("Delete this destination?")) return;
//   await deleteDoc(doc(db, "destinations", slug));
//   fetchDestinations();
// };

// // ---------------------------
// // File Input Handlers (compress & upload on save - we save files temporarily in state)
// // ---------------------------
// const handleImageFile = (e) => {
//   const file = e.target.files?.[0];
//   if (!file) return;
//   // store file object in form for upload later
//   setForm((prev) => ({ ...prev, imageFile: file }));
// };

// const handleDestImageFile = (e) => {
//   const file = e.target.files?.[0];
//   if (!file) return;
//   setDestForm((prev) => ({ ...prev, imageFile: file }));
// };

// const handleDestHeroFile = (e) => {
//   const file = e.target.files?.[0];
//   if (!file) return;
//   setDestForm((prev) => ({ ...prev, heroImageFile: file }));
// };

// const handleExtraDraftImageFile = (e) => {
//   const file = e.target.files?.[0];
//   if (!file) return;
//   setExtraDraft((prev) => ({ ...prev, imageFile: file, image: "" }));
// };

// // ---------------------------
// // Map Packages by Destination
// // ---------------------------
// const destinationPackages = useMemo(() => {
//   const map = {};
//   packages.forEach((pkg) => {
//     if (pkg.destinationSlug) {
//       (map[pkg.destinationSlug] = map[pkg.destinationSlug] || []).push(pkg);
//     }
//   });
//   return map;
// }, [packages]);

// if (!isAuth) {
//   return (
//     <div className="login-card admin-card">
//       <h2 className="login-title">Admin Login</h2>
//       <form onSubmit={handleLogin} className="login-form">
//         <input type="text" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
//         <input type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
//         <button type="submit" className="btn-primary">Login</button>
//       </form>
//     </div>
//   );
// }

// return (
//   <>
//     <div className="admin-wrap">
//       <div className="admin-header">
//         <h1 className="admin-title">Admin Panel</h1>
//         <div className="admin-actions">
//           <button className="btn" onClick={handleLogout}>Logout</button>
//           <button className="btn" onClick={() => navigate("/")}>Go Home</button>
//         </div>
//       </div>




//       {/* --- Destinations --- */}
//       <div className="admin-grid dests-only" style={{ marginTop: 24 }}>
//         {showDestForm ? (
//           <div className="admin-card dest-form-block">
//             <div className="card-head-row">
//               <h2>{editingDestSlug ? "Edit Destination" : "Add Destination"}</h2>
//               <button
//                 className="btn-tertiary"
//                 onClick={() => {
//                   setShowDestForm(false);
//                   setDestForm(initialDestForm);
//                   setEditingDestSlug("");
//                 }}
//               >
//                 Close
//               </button>
//             </div>

//             <form onSubmit={handleDestSubmit} className="form-grid">
//               {/* Slug */}
//               <input placeholder="Slug (unique)" value={destForm.slug} onChange={(e) => setDestForm({ ...destForm, slug: e.target.value })} />
//               {/* Name */}
//               <input placeholder="Name" value={destForm.name} onChange={(e) => setDestForm({ ...destForm, name: e.target.value })} />
//               {/* Image + Hero */}
//               <input placeholder="Image URL" value={destForm.image} onChange={(e) => setDestForm({ ...destForm, image: e.target.value })} />
//               <input type="file" accept="image/*" onChange={handleDestImageFile} />
//               <input placeholder="Hero Image URL" value={destForm.heroImage} onChange={(e) => setDestForm({ ...destForm, heroImage: e.target.value })} />
//               <input type="file" accept="image/*" onChange={handleDestHeroFile} />

//               <input placeholder="Heading" value={destForm.heading} onChange={(e) => setDestForm({ ...destForm, heading: e.target.value })} />
//               <textarea placeholder="Description" value={destForm.description} onChange={(e) => setDestForm({ ...destForm, description: e.target.value })} style={{ gridColumn: "1 / -1" }} />

//                 {/* ✅ Highlights Section */}
// <div style={{ gridColumn: "1 / -1", marginTop: "10px" }}>
//   <h3>Highlights</h3>

//   {(destForm.highlights || []).map((h, index) => (
//     <div
//       key={index}
//       style={{
//         display: "grid",
//         gridTemplateColumns: "1fr 1fr auto",
//         gap: "10px",
//         marginBottom: "10px",
//         alignItems: "center",
//       }}
//     >
//       <input
//         type="text"
//         placeholder="Highlight Title"
//         value={h.title}
//         onChange={(e) => {
//           const newHighlights = [...destForm.highlights];
//           newHighlights[index].title = e.target.value;
//           setDestForm({ ...destForm, highlights: newHighlights });
//         }}
//       />

//       <input
//         type="text"
//         placeholder="Highlight Description"
//         value={h.description}
//         onChange={(e) => {
//           const newHighlights = [...destForm.highlights];
//           newHighlights[index].description = e.target.value;
//           setDestForm({ ...destForm, highlights: newHighlights });
//         }}
//       />

//       <button
//         type="button"
//         onClick={() => {
//           const newHighlights = destForm.highlights.filter((_, i) => i !== index);
//           setDestForm({ ...destForm, highlights: newHighlights });
//         }}
//         style={{
//           background: "transparent",
//           color: "red",
//           fontWeight: "bold",
//           border: "none",
//           cursor: "pointer",
//           fontSize: "18px",
//         }}
//       >
//         ✕
//       </button>
//     </div>
//   ))}

//   <button
//     type="button"
//     onClick={() =>
//       setDestForm({
//         ...destForm,
//         highlights: [
//           ...(destForm.highlights || []),
//           { title: "", description: "" },
//         ],
//       })
//     }
//     style={{
//       background: "#007bff",
//       color: "white",
//       border: "none",
//       borderRadius: "5px",
//       padding: "6px 12px",
//       cursor: "pointer",
//       fontWeight: 500,
//     }}
//   >
//     + Add Highlight
//   </button>
// </div>



//               {/* Buttons */}
//               <div className="form-actions">
//                 <button type="submit" className="btn-primary">{editingDestSlug ? "Save" : "Add"}</button>
//                 <button type="button" className="btn-tertiary" onClick={() => { setShowDestForm(false); setDestForm(initialDestForm); }}>Cancel</button>
//               </div>
//             </form>
//           </div>
//         ) : (
//           <div className="admin-card dests-list-card">
//             <div className="card-head-row">
//               <h2>Destinations</h2>
//               <button className="btn-small" onClick={() => { setShowDestForm(true); setDestForm(initialDestForm); setEditingDestSlug(""); }}>+ Add Destination</button>
//             </div>
//             <div className="list">
//               {destinations.map(d => (
//                 <div key={d.slug} className="list-item dest-item">
//                   <img className="thumb" src={d.image} alt={d.name} />
//                   <div>
//                     <div className="item-title">{d.name}</div>
//                     <div className="item-sub">{d.slug}</div>
//                   </div>
//                   <div className="item-actions">
//                     <button className="btn-tertiary" onClick={() => { setShowDestForm(true); setDestForm(d); setEditingDestSlug(d.slug); }}>Edit</button>
//                     <button className="btn-danger" onClick={() => handleDeleteDestination(d.slug)}>Delete</button>
//                     <button className="btn-tertiary" onClick={() => setOpenPreview((s) => (s === d.slug ? "" : d.slug))}>{openPreview === d.slug ? "Hide" : "👁"}</button>
//                   </div>

//                   {/* --- Add Extra Package button for this destination --- */}
// <div style={{ marginTop: 8 }}>
//   <button
//     className="btn-small"
//     onClick={() => {
//       // toggle manager open for this destination
//       if (openExtraManagerFor === d.slug) {
//         setOpenExtraManagerFor(null);
//         setExtraDraft({ title: "", image: "", highlights: [] });
//         setEditingExtraIndexFor({ slug: null, index: null });
//       } else {
//         setOpenExtraManagerFor(d.slug);
//         setExtraDraft({ title: "", image: "", highlights: [] });
//         setEditingExtraIndexFor({ slug: null, index: null });
//       }
//     }}
//   >
//     {openExtraManagerFor === d.slug ? "Close Add Package" : "+ Add Package"}
//   </button>
// </div>

// {/* --- Inline Manager (only for this destination) --- */}
// {openExtraManagerFor === d.slug && (
//   <div style={{
//     marginTop: 12,
//     padding: 12,
//     borderRadius: 8,
//     background: "#fff",
//     boxShadow: "0 2px 6px rgba(0,0,0,0.04)"
//   }}>
//     <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
//       <input
//         type="text"
//         placeholder="Package title"
//         value={extraDraft.title}
//         onChange={(e) => setExtraDraft(prev => ({ ...prev, title: e.target.value }))}
//       />
//       <input
//         type="text"
//         placeholder="Image URL (or use upload)"
//         value={extraDraft.image}
//         onChange={(e) => setExtraDraft(prev => ({ ...prev, image: e.target.value }))}
//       />
//       <input
//         type="file"
//         accept="image/*"
//         onChange={(e) => {
//           const file = e.target.files?.[0];
//           if (!file) return;
//           setExtraDraft(prev => ({ ...prev, imageFile: file, image: "" }));
//         }}
//       />
//       <button className="btn-primary" onClick={() => saveExtraPackageForDestination(d.slug)}>
//         {editingExtraIndexFor.slug === d.slug && editingExtraIndexFor.index !== null ? "Save" : "Add"}
//       </button>
//       <button className="btn-tertiary" onClick={() => { setOpenExtraManagerFor(null); setExtraDraft({ title: "", image: "", highlights: [] }); setEditingExtraIndexFor({ slug: null, index: null }); }}>
//         Cancel
//       </button>
//     </div>

//     {/* Highlights inside extra package */}
//     <div style={{ marginTop: 12 }}>
//       <strong>Highlights</strong>
//       {(extraDraft.highlights || []).map((h, idx) => (
//         <div key={idx} style={{ display: "flex", gap: 8, marginTop: 8 }}>
//           <input type="text" placeholder="Title" value={h.title} onChange={(e) => {
//             const arr = [...extraDraft.highlights];
//             arr[idx].title = e.target.value;
//             setExtraDraft(prev => ({ ...prev, highlights: arr }));
//           }} />
//           <input type="text" placeholder="Description" value={h.description} onChange={(e) => {
//             const arr = [...extraDraft.highlights];
//             arr[idx].description = e.target.value;
//             setExtraDraft(prev => ({ ...prev, highlights: arr }));
//           }} />
//           <button className="btn-mini danger" onClick={() => {
//             const arr = extraDraft.highlights.filter((_, i) => i !== idx);
//             setExtraDraft(prev => ({ ...prev, highlights: arr }));
//           }}>✕</button>
//         </div>
//       ))}

//       <div style={{ marginTop: 8 }}>
//         <button className="btn-small" onClick={() => setExtraDraft(prev => ({ ...prev, highlights: [...(prev.highlights||[]), { title: "", description: "" }] }))}>+ Add Highlight</button>
//       </div>
//     </div>

//     {/* list existing extras for this destination with edit & delete */}
//     {d.extraPackages?.length > 0 && (
//       <div style={{ marginTop: 12 }}>
//         <strong>Existing Packages</strong>
//         {d.extraPackages.map((pkg, idx) => (
//           <div key={idx} style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 8 }}>
//             {pkg.image && <img src={pkg.image} alt={pkg.title} style={{ width: 70, height: 50, objectFit: "cover", borderRadius: 6 }} />}
//             <div style={{ flex: 1 }}>{pkg.title}</div>
//             <button className="btn-mini" onClick={() => startEditExtraForDestination(d.slug, idx)}>✎ Edit</button>
//             <button className="btn-mini danger" onClick={() => deleteExtraFromDestination(d.slug, idx)}>✕</button>
//           </div>
//         ))}
//       </div>
//     )}
//   </div>
// )}


//                   {/* Destination Preview */}
//                   {openPreview === d.slug && (
//                     <div className="dest-preview">
//                       <div className="dest-preview-head">
//                         <strong>Packages</strong>
//                         <button className="btn-small add-inline" onClick={() => { setShowPkgForm(true); setForm({ ...initialForm, destinationSlug: d.slug }); }}>+ Add Tour Package</button>
//                       </div>
//                       <div className="dest-preview-list">
//                         {(destinationPackages[d.slug] || []).map(p => (
//                           <div key={p.slug} className="dest-preview-item">
//                             {p.image && <img src={p.image} alt={p.title} />}
//                             <div className="dp-text"><div className="dp-title">{p.title}</div></div>
//                             <div className="dp-actions">
//                               <button className="btn-mini" onClick={() => { setForm(p); setEditingSlug(p.slug); setShowPkgForm(true); }}>Edit</button>
//                               <button className="btn-mini danger" onClick={() => handleDeletePackage(p.slug)}>Remove</button>
//                             </div>
//                           </div>
//                         ))}
//                       </div>

//                       {/* ✅ Preview Extra Packages */}
//                       {d.extraPackages?.length > 0 && (
//                         <div style={{ marginTop: "15px" }}>
//                           <strong>Extra Packages</strong>
//                           <div className="dest-preview-list">
//                             {d.extraPackages.map((pkg, i) => (
//                               <div key={i} className="dest-preview-item">
//                                 {pkg.image && <img src={pkg.image} alt={pkg.title} />}
//                                 <div className="dp-text">
//                                   <div className="dp-title">{pkg.title}</div>
//                                 </div>
//                               </div>
//                             ))}
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>

//       {/* --- Package Form --- */}
//       {showPkgForm && (
//         <div className="admin-card package-form-block" id="package-form">
//           <div className="card-head-row">
//             <h2>{editingSlug ? "Edit Package" : "Add Package"}</h2>
//             <div className="item-actions">
//               <button className="btn-tertiary" onClick={clearForm}>Close</button>
//             </div>
//           </div>
//           <form onSubmit={handlePackageSubmit} className="form-grid">
//             <input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
//             <input placeholder="Subtitle" value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} />
//             <input placeholder="Slug (unique)" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
//             <select value={form.destinationSlug} onChange={(e) => setForm({ ...form, destinationSlug: e.target.value })}>
//               <option value="">-- Destination (optional) --</option>
//               {(destinations || []).map(d => <option key={d.slug} value={d.slug}>{d.name}</option>)}
//             </select>
//             <input placeholder="Image URL" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
//             <input type="file" accept="image/*" onChange={(e) => {
//               const file = e.target.files?.[0];
//               if (!file) return;
//               setForm(prev => ({ ...prev, imageFile: file }));
//             }} />
//             <input placeholder="Days (e.g., 5N/6D)" value={form.days} onChange={(e) => setForm({ ...form, days: e.target.value })} />
//             <input placeholder="Price" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
//             <textarea placeholder="Description" style={{ gridColumn: "1 / -1" }} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
//             <textarea placeholder="Inclusions (one per line)" style={{ gridColumn: "1 / -1" }} value={(form.inclusions || []).join("\n")} onChange={(e) => setForm({ ...form, inclusions: e.target.value.split(/\n/).map(s => s.trim()).filter(Boolean) })} />
//             <textarea placeholder="Exclusions (one per line)" style={{ gridColumn: "1 / -1" }} value={(form.exclusions || []).join("\n")} onChange={(e) => setForm({ ...form, exclusions: e.target.value.split(/\n/).map(s => s.trim()).filter(Boolean) })} />
//             <textarea placeholder="FAQ (Q|A pairs per line)" style={{ gridColumn: "1 / -1" }} value={(form.faq || []).map(f => `${f.q}|${f.a}`).join("\n")} onChange={(e) => {
//               const faqs = e.target.value.split(/\n/).map(l => {
//                 const [q, a] = l.split("|");
//                 return q && a ? { q: q.trim(), a: a.trim() } : null;
//               }).filter(Boolean);
//               setForm({ ...form, faq: faqs });
//             }} />
//             <textarea placeholder="Itinerary (Day|Text per line)" style={{ gridColumn: "1 / -1" }} value={(form.itinerary || []).map(i => `${i.day}|${i.text}`).join("\n")} onChange={(e) => {
//               const itin = e.target.value.split(/\n/).map(l => {
//                 const [day, text] = l.split("|");
//                 return day && text ? { day: day.trim(), text: text.trim() } : null;
//               }).filter(Boolean);
//               setForm({ ...form, itinerary: itin });
//             }} />

//             {/* --- Highlights inside package --- */}
//             <div style={{ gridColumn: "1 / -1", marginTop: 12 }}>
//               <h3>Highlights</h3>
//               {(form.highlights || []).map((h, idx) => (
//                 <div key={idx} style={{ display: "grid", gridTemplateColumns: "1fr 1fr auto", gap: 10, marginBottom: 10, alignItems: "center" }}>
//                   <input type="text" placeholder="Title" value={h.title} onChange={(e) => {
//                     const arr = [...form.highlights];
//                     arr[idx].title = e.target.value;
//                     setForm(prev => ({ ...prev, highlights: arr }));
//                   }} />
//                   <input type="text" placeholder="Description" value={h.description} onChange={(e) => {
//                     const arr = [...form.highlights];
//                     arr[idx].description = e.target.value;
//                     setForm(prev => ({ ...prev, highlights: arr }));
//                   }} />
//                   <button type="button" onClick={() => {
//                     const arr = (form.highlights || []).filter((_, i) => i !== idx);
//                     setForm(prev => ({ ...prev, highlights: arr }));
//                   }} style={{ background: "transparent", color: "red", border: "none", cursor: "pointer", fontSize: 18 }}>✕</button>
//                 </div>
//               ))}
//               <button type="button" onClick={() => setForm(prev => ({ ...prev, highlights: [...(prev.highlights||[]), { title: "", description: "" }] }))} className="btn-small">+ Add Highlight</button>
//             </div>

//             <div className="form-actions">
//               <button type="submit" className="btn-primary">{editingSlug ? "Save" : "Add"}</button>
//               <button type="button" className="btn-tertiary" onClick={clearForm}>Cancel</button>
//             </div>
//           </form>
//         </div>
//       )}

//  <DashboardImageManager/>
//  <AddTripPage/>
//     </div>
//   </>
// );
// };

// export default AdminPanel;



import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  collection,
  getDocs,
  setDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
  signOut,
} from "firebase/auth";
import { auth, db } from "../../firebaseConfig";
import "../AdminPanel.css";
import DashboardImageManager from "./crousel";
import AddTripPage from "./international_data";
import HiddenGemsPage from "./hidden_gems_data";

import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import GalleryUploader from "./myGallery";


const initialForm = {
  image: "",        // will store image URL (not base64)
  title: "",
  subtitle: "Tour Packages",
  slug: "",
  destinationSlug: "",
  days: "",
  price: "",
  description: "",
  inclusions: [],
  exclusions: [],
  faq: [],
  itinerary: [],
  highlights: [], // <-- new dynamic titles+descriptions
  // galleryPhotos: [],
};

const initialDestForm = {
  slug: "",
  name: "",
  image: "",
  heroImage: "",
  heading: "",
  description: "",
  descriptionRich: "",
  monasteriesSection: null,
  highlights: [],
  extraPackages: [],
  galleryPhotos: [],

};

const AdminPanel = () => {
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(() => sessionStorage.getItem("admin.auth") === "yes");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [packages, setPackages] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingSlug, setEditingSlug] = useState("");
  const [destForm, setDestForm] = useState(initialDestForm);
  const [editingDestSlug, setEditingDestSlug] = useState("");
  const [showPkgForm, setShowPkgForm] = useState(false);
  const [showDestForm, setShowDestForm] = useState(false);
  const [openPreview, setOpenPreview] = useState("");

// track which destination's inline manager is open
const [openExtraManagerFor, setOpenExtraManagerFor] = useState(null);

// draft for the inline manager (single package at a time)
const [extraDraft, setExtraDraft] = useState({ title: "", image: "", highlights: [] , quillContent : ""});

// index when editing an existing extra inside a destination
const [editingExtraIndexFor, setEditingExtraIndexFor] = useState({ slug: null, index: null });

const storage = getStorage();

// ---------------------------
// Image compression utility
// ---------------------------
const compressImage = (file, maxWidth = 1600, quality = 0.8) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      let { width, height } = img;
      if (width > maxWidth) {
        const ratio = maxWidth / width;
        width = maxWidth;
        height = height * ratio;
      }
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, width, height);
      canvas.toBlob(
        (blob) => {
          URL.revokeObjectURL(url);
          if (blob) resolve(blob);
          else reject(new Error("Compression failed"));
        },
        "image/jpeg",
        quality
      );
    };
    img.onerror = (e) => {
      URL.revokeObjectURL(url);
      reject(e);
    };
    img.src = url;
  });
};

// Upload compressed image to Firebase Storage and return public URL
const uploadCompressedImage = async (file, folder = "packages") => {
  try {
    const blob = await compressImage(file, 1600, 0.8);
    const ref = storageRef(storage, `${folder}/${Date.now()}-${file.name.replace(/\s+/g, "_")}`);
    await uploadBytes(ref, blob);
    const url = await getDownloadURL(ref);
    return url;
  } catch (err) {
    console.error("uploadCompressedImage error", err);
    throw err;
  }
};

// ---------------------------
// Save (add or update) an extra package directly on a destination in Firestore
// ---------------------------
const saveExtraPackageForDestination = async (destSlug) => {
  if (!extraDraft.title) return alert("fill title");

  try {
    // if extraDraft.image is a File (object), upload it first
    let imageUrl = extraDraft.image;
    if (extraDraft.imageFile) {
      imageUrl = await uploadCompressedImage(extraDraft.imageFile, "extraPackages");
    }

    // find destination object from state
    const destination = destinations.find(d => d.slug === destSlug) || null;
    const current = destination?.extraPackages ? [...destination.extraPackages] : [];

    const newPkg = { title: extraDraft.title, image: imageUrl || "", highlights: extraDraft.highlights || []  , quillContent: extraDraft.quillContent || ""};

    // if editing, replace at index
    if (editingExtraIndexFor.slug === destSlug && editingExtraIndexFor.index !== null) {
      current[editingExtraIndexFor.index] = newPkg;
    } else {
      current.push(newPkg);
    }

    // write back to Firestore (merge)
    await setDoc(doc(db, "destinations", destSlug), { extraPackages: current }, { merge: true });

    // refresh local list
    await fetchDestinations();

    // reset UI
    setExtraDraft({ title: "", image: "", highlights: [] , quillContent: ""});
    setEditingExtraIndexFor({ slug: null, index: null });
    setOpenExtraManagerFor(null);
  } catch (err) {
    console.error("save extra pkg error", err);
    alert("Failed to save extra package");
  }
};

// start editing an existing extra package for a destination
const startEditExtraForDestination = (destSlug, index) => {
  const destination = destinations.find(d => d.slug === destSlug);
  if (!destination) return;
  const pkg = destination.extraPackages?.[index] || { title: "", image: "", highlights: [] };
  // populate draft
  setExtraDraft({ title: pkg.title || "", image: pkg.image || "", highlights: pkg.highlights || [] , quillContent: pkg.quillContent || ""});
  setEditingExtraIndexFor({ slug: destSlug, index });
  setOpenExtraManagerFor(destSlug);
};

// delete an extra package from a destination
const deleteExtraFromDestination = async (destSlug, index) => {
  if (!window.confirm("Remove this package?")) return;
  try {
    const destination = destinations.find(d => d.slug === destSlug);
    const current = destination?.extraPackages ? [...destination.extraPackages] : [];
    current.splice(index, 1);
    await setDoc(doc(db, "destinations", destSlug), { extraPackages: current }, { merge: true });
    await fetchDestinations();
  } catch (err) {
    console.error("delete extra pkg error", err);
    alert("Failed to delete extra package");
  }
};


const fetchPackages = async () => {
  const snapshot = await getDocs(collection(db, "packages"));
  setPackages(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
};

const fetchDestinations = async () => {
  const snapshot = await getDocs(collection(db, "destinations"));
  setDestinations(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
};

useEffect(() => {
  if (isAuth) {
    fetchPackages();
    fetchDestinations();
  }
}, [isAuth]);

const handleLogin = async (e) => {
  e.preventDefault();
  try {
    await setPersistence(auth, browserSessionPersistence);
    await signInWithEmailAndPassword(auth, email, password);
    sessionStorage.setItem("admin.auth", "yes");
    setIsAuth(true);
  } catch (error) {
    console.error(error);
    alert("Login failed! Check your email or password.");
  }
};

const handleLogout = async () => {
  await signOut(auth);
  sessionStorage.removeItem("admin.auth");
  setIsAuth(false);
};

const handlePackageSubmit = async (e) => {
  e.preventDefault();
  if (!form.slug) return alert("Slug is required!");
  try {
    // if form has an imageFile, upload and replace image field with URL
    let imageUrl = form.image;
    if (form.imageFile) {
      imageUrl = await uploadCompressedImage(form.imageFile, "packages");
    }

    const payload = { ...form, image: imageUrl };
    // remove transient fields (imageFile)
    delete payload.imageFile;

    const docRef = doc(db, "packages", form.slug);
    await setDoc(docRef, payload, { merge: true });
    alert(editingSlug ? "Package updated!" : "Package added!");
    clearForm();
    fetchPackages();
  } catch (err) {
    console.error(err);
    alert("Failed to save package");
  }
};

const handleDeletePackage = async (slug) => {
  if (!window.confirm("Delete this package?")) return;
  await deleteDoc(doc(db, "packages", slug));
  fetchPackages();
};

const clearForm = () => {
  setForm(initialForm);
  setEditingSlug("");
  setShowPkgForm(false);
};


const handleDestSubmit = async (e) => {
  e.preventDefault();
  if (!destForm.slug) return alert("Destination slug is required!");
  try {
    // upload dest images if present
    let imageUrl = destForm.image;
    let heroUrl = destForm.heroImage;
    if (destForm.imageFile) imageUrl = await uploadCompressedImage(destForm.imageFile, "destinations");
    if (destForm.heroImageFile) heroUrl = await uploadCompressedImage(destForm.heroImageFile, "destinations");

    const payload = { ...destForm, image: imageUrl, heroImage: heroUrl };
    delete payload.imageFile;
    delete payload.heroImageFile;

    const docRef = doc(db, "destinations", destForm.slug);
    await setDoc(docRef, payload, { merge: true });
    alert(editingDestSlug ? "Destination updated!" : "Destination added!");
    setDestForm(initialDestForm);
    setEditingDestSlug("");
    setShowDestForm(false);
    fetchDestinations();
  } catch (err) {
    console.error(err);
    alert("Failed to save destination");
  }
};

const handleDeleteDestination = async (slug) => {
  if (!window.confirm("Delete this destination?")) return;
  await deleteDoc(doc(db, "destinations", slug));
  fetchDestinations();
};

// ---------------------------
// File Input Handlers (compress & upload on save - we save files temporarily in state)
// ---------------------------
const handleImageFile = (e) => {
  const file = e.target.files?.[0];
  if (!file) return;
  // store file object in form for upload later
  setForm((prev) => ({ ...prev, imageFile: file }));
};

const handleDestImageFile = (e) => {
  const file = e.target.files?.[0];
  if (!file) return;
  setDestForm((prev) => ({ ...prev, imageFile: file }));
};

const handleDestHeroFile = (e) => {
  const file = e.target.files?.[0];
  if (!file) return;
  setDestForm((prev) => ({ ...prev, heroImageFile: file }));
};

const handleExtraDraftImageFile = (e) => {
  const file = e.target.files?.[0];
  if (!file) return;
  setExtraDraft((prev) => ({ ...prev, imageFile: file, image: "" }));
};

// ---------------------------
// Map Packages by Destination
// ---------------------------
const destinationPackages = useMemo(() => {
  const map = {};
  packages.forEach((pkg) => {
    if (pkg.destinationSlug) {
      (map[pkg.destinationSlug] = map[pkg.destinationSlug] || []).push(pkg);
    }
  });
  return map;
}, [packages]);

if (!isAuth) {
  return (
    <div className="login-card admin-card">
      <h2 className="login-title">Admin Login</h2>
      <form onSubmit={handleLogin} className="login-form">
        <input type="text" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" className="btn-primary">Login</button>
      </form>
    </div>
  );
}

return (
  <>
    <div className="admin-wrap">
      <div className="admin-header">
        <h1 className="admin-title">Admin Panel</h1>
        <div className="admin-actions">
          <button className="btn" onClick={handleLogout}>Logout</button>
          <button className="btn" onClick={() => navigate("/")}>Go Home</button>
        </div>
      </div>




      {/* --- Destinations --- */}
      <div className="admin-grid dests-only" style={{ marginTop: 24 }}>
        {showDestForm ? (
          <div className="admin-card dest-form-block">
            <div className="card-head-row">
              <h2>{editingDestSlug ? "Edit Destination" : "Add Destination"}</h2>
              <button
                className="btn-tertiary"
                onClick={() => {
                  setShowDestForm(false);
                  setDestForm(initialDestForm);
                  setEditingDestSlug("");
                }}
              >
                Close
              </button>
            </div>

            <form onSubmit={handleDestSubmit} className="form-grid">
              {/* Slug */}
              <input placeholder="Slug (unique)" value={destForm.slug} onChange={(e) => setDestForm({ ...destForm, slug: e.target.value })} />
              {/* Name */}
              <input placeholder="Name" value={destForm.name} onChange={(e) => setDestForm({ ...destForm, name: e.target.value })} />
              {/* Image + Hero */}
              <input placeholder="Image URL" value={destForm.image} onChange={(e) => setDestForm({ ...destForm, image: e.target.value })} />
              <input type="file" accept="image/*" onChange={handleDestImageFile} />
              <input placeholder="Hero Image URL" value={destForm.heroImage} onChange={(e) => setDestForm({ ...destForm, heroImage: e.target.value })} />
              <input type="file" accept="image/*" onChange={handleDestHeroFile} />

              <input placeholder="Heading" value={destForm.heading} onChange={(e) => setDestForm({ ...destForm, heading: e.target.value })} />
              {/* <textarea placeholder="Description" value={destForm.description} onChange={(e) => setDestForm({ ...destForm, description: e.target.value })} style={{ gridColumn: "1 / -1" }} /> */}

<textarea
  placeholder="Description"
  value={destForm.description}
  onChange={(e) =>
    setDestForm({ ...destForm, description: e.target.value })
  }
  style={{ gridColumn: "1 / -1" }}
/>

{/* ✅ Rich Text Editor */}
<div style={{ gridColumn: "1 / -1", marginTop: "10px" }}>
  <label style={{ fontWeight: 600, marginBottom: "6px", display: "block" }}>
    Detailed Description (Rich Text)
  </label>

  <ReactQuill
    theme="snow"
    value={destForm.descriptionRich}
    onChange={(value) =>
      setDestForm({ ...destForm, descriptionRich: value })
    }
    placeholder="Write detailed destination description..."
    modules={{
      toolbar: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline"],
        [{ color: [] }, { background: [] }],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ align: [] }],
        ["link"],
        ["clean"],
      ],
    }}
  />
</div>

{/* ✅ Destination Gallery Photos */}
<div style={{ gridColumn: "1 / -1", marginTop: 20 }}>
  <h3 style={{ marginBottom: 10 }}>Destination Gallery Photos</h3>

  {(destForm.galleryPhotos || []).map((photo, index) => (
    <div
      key={index}
      style={{
        display: "grid",
        gridTemplateColumns: "1fr auto auto",
        gap: 10,
        alignItems: "center",
        marginBottom: 10,
        background: "#f8fafc",
        padding: 12,
        borderRadius: 8,
        border: "1px solid #e2e8f0",
      }}
    >
      {/* Image URL */}
      <input
        type="text"
        placeholder="Image URL (optional)"
        value={photo.url}
        onChange={(e) => {
          const arr = [...destForm.galleryPhotos];
          arr[index].url = e.target.value;
          setDestForm({ ...destForm, galleryPhotos: arr });
        }}
        style={{
          padding: 8,
          borderRadius: 6,
          border: "1px solid #ccc",
        }}
      />

      {/* File Upload */}
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (!file) return;
          const arr = [...destForm.galleryPhotos];
          arr[index].file = file;
          arr[index].url = "";
          setDestForm({ ...destForm, galleryPhotos: arr });
        }}
      />

      {/* Remove */}
      <button
        type="button"
        onClick={() => {
          const arr = destForm.galleryPhotos.filter((_, i) => i !== index);
          setDestForm({ ...destForm, galleryPhotos: arr });
        }}
        style={{
          background: "transparent",
          border: "none",
          color: "red",
          fontSize: 18,
          cursor: "pointer",
        }}
      >
        ✕
      </button>
    </div>
  ))}

  {/* Add More Button */}
  <button
    type="button"
    onClick={() =>
      setDestForm({
        ...destForm,
        galleryPhotos: [
          ...(destForm.galleryPhotos || []),
          { url: "", file: null },
        ],
      })
    }
    style={{
      background: "#0f172a",
      color: "#fff",
      border: "none",
      borderRadius: 6,
      padding: "8px 14px",
      cursor: "pointer",
      fontWeight: 500,
    }}
  >
    + Add Photo
  </button>
</div>





                {/* ✅ Highlights Section */}
<div style={{ gridColumn: "1 / -1", marginTop: "10px" }}>
  <h3>Highlights</h3>

  {(destForm.highlights || []).map((h, index) => (
    <div
      key={index}
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr auto",
        gap: "10px",
        marginBottom: "10px",
        alignItems: "center",
      }}
    >
      <input
        type="text"
        placeholder="Highlight Title"
        value={h.title}
        onChange={(e) => {
          const newHighlights = [...destForm.highlights];
          newHighlights[index].title = e.target.value;
          setDestForm({ ...destForm, highlights: newHighlights });
        }}
      />

      <input
        type="text"
        placeholder="Highlight Description"
        value={h.description}
        onChange={(e) => {
          const newHighlights = [...destForm.highlights];
          newHighlights[index].description = e.target.value;
          setDestForm({ ...destForm, highlights: newHighlights });
        }}
      />

      <button
        type="button"
        onClick={() => {
          const newHighlights = destForm.highlights.filter((_, i) => i !== index);
          setDestForm({ ...destForm, highlights: newHighlights });
        }}
        style={{
          background: "transparent",
          color: "red",
          fontWeight: "bold",
          border: "none",
          cursor: "pointer",
          fontSize: "18px",
        }}
      >
        ✕
      </button>
    </div>
  ))}

  <button
    type="button"
    onClick={() =>
      setDestForm({
        ...destForm,
        highlights: [
          ...(destForm.highlights || []),
          { title: "", description: "" },
        ],
      })
    }
    style={{
      background: "#007bff",
      color: "white",
      border: "none",
      borderRadius: "5px",
      padding: "6px 12px",
      cursor: "pointer",
      fontWeight: 500,
    }}
  >
    + Add Highlight
  </button>
</div>



              {/* Buttons */}
              <div className="form-actions">
                <button type="submit" className="btn-primary">{editingDestSlug ? "Save" : "Add"}</button>
                <button type="button" className="btn-tertiary" onClick={() => { setShowDestForm(false); setDestForm(initialDestForm); }}>Cancel</button>
              </div>
            </form>
          </div>
        ) : (
          <div className="admin-card dests-list-card">
            <div className="card-head-row">
              <h2>Destinations</h2>
              <button className="btn-small" onClick={() => { setShowDestForm(true); setDestForm(initialDestForm); setEditingDestSlug(""); }}>+ Add Destination</button>
            </div>
            <div className="list">
              {destinations.map(d => (
                <div key={d.slug} className="list-item dest-item">
                  <img className="thumb" src={d.image} alt={d.name} />
                  <div>
                    <div className="item-title">{d.name}</div>
                    <div className="item-sub">{d.slug}</div>
                  </div>
                  <div className="item-actions">
                    <button className="btn-tertiary" onClick={() => { setShowDestForm(true); setDestForm(d); setEditingDestSlug(d.slug); }}>Edit</button>
                    <button className="btn-danger" onClick={() => handleDeleteDestination(d.slug)}>Delete</button>
                    <button className="btn-tertiary" onClick={() => setOpenPreview((s) => (s === d.slug ? "" : d.slug))}>{openPreview === d.slug ? "Hide" : "👁"}</button>
                  </div>

                  {/* --- Add Extra Package button for this destination --- */}
<div style={{ marginTop: 8 }}>
  <button
    className="btn-small"
    onClick={() => {
      // toggle manager open for this destination
      if (openExtraManagerFor === d.slug) {
        setOpenExtraManagerFor(null);
        setExtraDraft({ title: "", image: "", highlights: [] , quillContent: ""});
        setEditingExtraIndexFor({ slug: null, index: null });
      } else {
        setOpenExtraManagerFor(d.slug);
        setExtraDraft({ title: "", image: "", highlights: [] , quillContent: ""});
        setEditingExtraIndexFor({ slug: null, index: null });
      }
    }}
  >
    {openExtraManagerFor === d.slug ? "Close Add Package" : "+ Add Package"}
  </button>
</div>

{/* --- Inline Manager (only for this destination) --- */}
      {openExtraManagerFor === d.slug && (
        <div
          style={{
            marginTop: 16,
            padding: 20,
            borderRadius: 12,
            background: "#fff",
            boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
          }}
        >
          {/* Package Inputs */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
            <input
              type="text"
              placeholder="Package title"
              value={extraDraft.title}
              onChange={(e) =>
                setExtraDraft(prev => ({ ...prev, title: e.target.value }))
              }
              style={{
                flex: 1,
                minWidth: 200,
                padding: 10,
                borderRadius: 8,
                border: "1px solid #ccc",
              }}
            />
            <input
              type="text"
              placeholder="Image URL (or use upload)"
              value={extraDraft.image}
              onChange={(e) =>
                setExtraDraft(prev => ({ ...prev, image: e.target.value }))
              }
              style={{
                flex: 1,
                minWidth: 200,
                padding: 10,
                borderRadius: 8,
                border: "1px solid #ccc",
              }}
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                setExtraDraft(prev => ({ ...prev, imageFile: file, image: "" }));
              }}
              style={{
                padding: 6,
                borderRadius: 8,
                border: "1px solid #ccc",
              }}
            />
            <button
              className="btn-primary"
              style={{ padding: "10px 16px", borderRadius: 8, cursor: "pointer" }}
              onClick={() => saveExtraPackageForDestination(d.slug)}
            >
              {editingExtraIndexFor.slug === d.slug && editingExtraIndexFor.index !== null ? "Save" : "Add"}
            </button>
            <button
              className="btn-tertiary"
              style={{ padding: "10px 16px", borderRadius: 8, cursor: "pointer" }}
              onClick={() => {
                setOpenExtraManagerFor(null);
                setExtraDraft({ title: "", image: "", quillContent: "", highlights: [] });
                setEditingExtraIndexFor({ slug: null, index: null });
              }}
            >
              Cancel
            </button>
          </div>

          {/* React Quill Field (separate from highlights) */}
          <div style={{ marginTop: 24 }}>
            <strong style={{ display: "block", marginBottom: 8, fontSize: 16 }}>
              Package Details (Rich Text)
            </strong>
            <ReactQuill
              theme="snow"
              value={extraDraft.quillContent || ""}
              onChange={(value) =>
                setExtraDraft(prev => ({ ...prev, quillContent : value }))
              }
              placeholder="Enter package details here..."
              style={{
                background: "#fff",
                borderRadius: 8,
                minHeight: 150,
              }}
            />
          </div>

          {/* Highlights inside extra package */}
          <div style={{ marginTop: 24 }}>
            <strong style={{ display: "block", marginBottom: 12, fontSize: 16 }}>Highlights</strong>

            {(extraDraft.highlights || []).map((h, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  gap: 8,
                  marginBottom: 12,
                  flexWrap: "wrap",
                  alignItems: "center",
                  background: "#f8fafc",
                  padding: 12,
                  borderRadius: 8,
                  border: "1px solid #e2e8f0",
                }}
              >
                <input
                  type="text"
                  placeholder="Title"
                  value={h.title}
                  onChange={(e) => {
                    const arr = [...extraDraft.highlights];
                    arr[idx].title = e.target.value;
                    setExtraDraft(prev => ({ ...prev, highlights: arr }));
                  }}
                  style={{ flex: 1, padding: 8, borderRadius: 6, border: "1px solid #ccc" }}
                />
                <input
                  type="text"
                  placeholder="Description"
                  value={h.description}
                  onChange={(e) => {
                    const arr = [...extraDraft.highlights];
                    arr[idx].description = e.target.value;
                    setExtraDraft(prev => ({ ...prev, highlights: arr }));
                  }}
                  style={{ flex: 2, padding: 8, borderRadius: 6, border: "1px solid #ccc" }}
                />
                <button
                  className="btn-mini danger"
                  style={{ cursor: "pointer", padding: "4px 8px" }}
                  onClick={() => {
                    const arr = extraDraft.highlights.filter((_, i) => i !== idx);
                    setExtraDraft(prev => ({ ...prev, highlights: arr }));
                  }}
                >
                  ✕
                </button>
              </div>
            ))}

            <button
              className="btn-small"
              style={{ marginTop: 8, padding: "6px 12px", borderRadius: 6, cursor: "pointer" }}
              onClick={() =>
                setExtraDraft(prev => ({
                  ...prev,
                  highlights: [...(prev.highlights || []), { title: "", description: "" }],
                }))
              }
            >
              + Add Highlight
            </button>
          </div>

          {/* Existing Extra Packages */}
          {d.extraPackages?.length > 0 && (
            <div style={{ marginTop: 24 }}>
              <strong style={{ display: "block", marginBottom: 12 }}>Existing Packages</strong>
              {d.extraPackages.map((pkg, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    marginBottom: 10,
                    background: "#f1f5f9",
                    padding: 10,
                    borderRadius: 8,
                  }}
                >
                  {pkg.image && (
                    <img
                      src={pkg.image}
                      alt={pkg.title}
                      style={{ width: 80, height: 60, objectFit: "cover", borderRadius: 6 }}
                    />
                  )}
                  <div style={{ flex: 1, fontWeight: 600 }}>{pkg.title}</div>
                  <button
                    className="btn-mini"
                    style={{ cursor: "pointer" }}
                    onClick={() => startEditExtraForDestination(d.slug, idx)}
                  >
                    ✎ Edit
                  </button>
                  <button
                    className="btn-mini danger"
                    style={{ cursor: "pointer" }}
                    onClick={() => deleteExtraFromDestination(d.slug, idx)}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    
                  {/* Destination Preview */}
                  {openPreview === d.slug && (
                    <div className="dest-preview">
                      <div className="dest-preview-head">
                        <strong>Packages</strong>
                        <button className="btn-small add-inline" onClick={() => { setShowPkgForm(true); setForm({ ...initialForm, destinationSlug: d.slug }); }}>+ Add Tour Package</button>
                      </div>
                      <div className="dest-preview-list">
                        {(destinationPackages[d.slug] || []).map(p => (
                          <div key={p.slug} className="dest-preview-item">
                            {p.image && <img src={p.image} alt={p.title} />}
                            <div className="dp-text"><div className="dp-title">{p.title}</div></div>
                            <div className="dp-actions">
                              <button className="btn-mini" onClick={() => { setForm(p); setEditingSlug(p.slug); setShowPkgForm(true); }}>Edit</button>
                              <button className="btn-mini danger" onClick={() => handleDeletePackage(p.slug)}>Remove</button>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* ✅ Preview Extra Packages */}
                      {d.extraPackages?.length > 0 && (
                        <div style={{ marginTop: "15px" }}>
                          <strong>Extra Packages</strong>
                          <div className="dest-preview-list">
                            {d.extraPackages.map((pkg, i) => (
                              <div key={i} className="dest-preview-item">
                                {pkg.image && <img src={pkg.image} alt={pkg.title} />}
                                <div className="dp-text">
                                  <div className="dp-title">{pkg.title}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* --- Package Form --- */}
      {showPkgForm && (
        <div className="admin-card package-form-block" id="package-form">
          <div className="card-head-row">
            <h2>{editingSlug ? "Edit Package" : "Add Package"}</h2>
            <div className="item-actions">
              <button className="btn-tertiary" onClick={clearForm}>Close</button>
            </div>
          </div>
          <form onSubmit={handlePackageSubmit} className="form-grid">
            <input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            <input placeholder="Subtitle" value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} />
            <input placeholder="Slug (unique)" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
            <select value={form.destinationSlug} onChange={(e) => setForm({ ...form, destinationSlug: e.target.value })}>
              <option value="">-- Destination (optional) --</option>
              {(destinations || []).map(d => <option key={d.slug} value={d.slug}>{d.name}</option>)}
            </select>
            <input placeholder="Image URL" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
            <input type="file" accept="image/*" onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              setForm(prev => ({ ...prev, imageFile: file }));
            }} />
            <input placeholder="Days (e.g., 5N/6D)" value={form.days} onChange={(e) => setForm({ ...form, days: e.target.value })} />
            <input placeholder="Price" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
            <textarea placeholder="Description" style={{ gridColumn: "1 / -1" }} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            <textarea placeholder="Inclusions (one per line)" style={{ gridColumn: "1 / -1" }} value={(form.inclusions || []).join("\n")} onChange={(e) => setForm({ ...form, inclusions: e.target.value.split(/\n/).map(s => s.trim()).filter(Boolean) })} />
            <textarea placeholder="Exclusions (one per line)" style={{ gridColumn: "1 / -1" }} value={(form.exclusions || []).join("\n")} onChange={(e) => setForm({ ...form, exclusions: e.target.value.split(/\n/).map(s => s.trim()).filter(Boolean) })} />
            <textarea placeholder="FAQ (Q|A pairs per line)" style={{ gridColumn: "1 / -1" }} value={(form.faq || []).map(f => `${f.q}|${f.a}`).join("\n")} onChange={(e) => {
              const faqs = e.target.value.split(/\n/).map(l => {
                const [q, a] = l.split("|");
                return q && a ? { q: q.trim(), a: a.trim() } : null;
              }).filter(Boolean);
              setForm({ ...form, faq: faqs });
            }} />
            <textarea placeholder="Itinerary (Day|Text per line)" style={{ gridColumn: "1 / -1" }} value={(form.itinerary || []).map(i => `${i.day}|${i.text}`).join("\n")} onChange={(e) => {
              const itin = e.target.value.split(/\n/).map(l => {
                const [day, text] = l.split("|");
                return day && text ? { day: day.trim(), text: text.trim() } : null;
              }).filter(Boolean);
              setForm({ ...form, itinerary: itin });
            }} />

            {/* --- Highlights inside package --- */}
            <div style={{ gridColumn: "1 / -1", marginTop: 12 }}>
              <h3>Highlights</h3>
              {(form.highlights || []).map((h, idx) => (
                <div key={idx} style={{ display: "grid", gridTemplateColumns: "1fr 1fr auto", gap: 10, marginBottom: 10, alignItems: "center" }}>
                  <input type="text" placeholder="Title" value={h.title} onChange={(e) => {
                    const arr = [...form.highlights];
                    arr[idx].title = e.target.value;
                    setForm(prev => ({ ...prev, highlights: arr }));
                  }} />
                  <input type="text" placeholder="Description" value={h.description} onChange={(e) => {
                    const arr = [...form.highlights];
                    arr[idx].description = e.target.value;
                    setForm(prev => ({ ...prev, highlights: arr }));
                  }} />
                  <button type="button" onClick={() => {
                    const arr = (form.highlights || []).filter((_, i) => i !== idx);
                    setForm(prev => ({ ...prev, highlights: arr }));
                  }} style={{ background: "transparent", color: "red", border: "none", cursor: "pointer", fontSize: 18 }}>✕</button>
                </div>
              ))}
              <button type="button" onClick={() => setForm(prev => ({ ...prev, highlights: [...(prev.highlights||[]), { title: "", description: "" }] }))} className="btn-small">+ Add Highlight</button>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-primary">{editingSlug ? "Save" : "Add"}</button>
              <button type="button" className="btn-tertiary" onClick={clearForm}>Cancel</button>
            </div>
          </form>
        </div>
      )}

 <DashboardImageManager/>
 <AddTripPage/>
 <HiddenGemsPage/>
 <GalleryUploader/>
    </div>
  </>
);
};

export default AdminPanel;
