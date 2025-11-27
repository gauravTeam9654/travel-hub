// import React, { useEffect, useMemo, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { arunachalPackages, gangtokPackages, meghalayaPackages, darjeelingPackages, bhutanPackages as bhutanBase, sikkimPackages as sikkimBase } from "../data/packages";
// import { readUserPackages, upsertPackage, deletePackage, mergePackages } from "../data/packageStore";
// import { destinations as staticDestinations } from "../data/destinations";
// import { readUserDestinations, upsertDestination, deleteDestination, mergeDestinations } from "../data/destinationStore";
// import { readDestinationTabs, setTabsForDestination, removeTabsForDestination } from "../data/destinationTabs";
// import "../AdminPanel.css";
// import { createUserWithEmailAndPassword, signInWithEmailAndPassword, setPersistence, browserSessionPersistence } from "firebase/auth";

// import { auth,db } from "../../firebaseConfig";
// // import { db } from "../../firebaseConfig";
// import { collection, addDoc, setDoc, doc, deleteDoc, getDocs } from "firebase/firestore";


// const initialForm = { image: "", title: "", subtitle: "Tour Packages", slug: "", destinationSlug: "", days: "", price: "", description: "", inclusions: [], exclusions: [], faq: [], itinerary: [] };
// const initialDestForm = { slug: "", name: "", image: "", heroImage: "", heading: "", description: "", lakesSection: null, monasteriesSection: null, highlights: [] };

// const AdminPanel = () => {
//   const navigate = useNavigate();
//   const [authby, setAuth] = useState(() => sessionStorage.getItem("admin.auth") === "yes");
//   const [secret, setSecret] = useState("");

//   const staticAll = useMemo(() => (
//     [
//       ...bhutanBase,
//       ...sikkimBase,
//       ...darjeelingPackages,
//       ...meghalayaPackages,
//       ...arunachalPackages,
//       ...gangtokPackages,
//     ]
//   ), []);

//   // const [userList, setUserList] = useState(() => readUserPackages());
//   const [userList, setUserList] = useState([]);

// useEffect(() => {
//   const fetchPackages = async () => {
//     const snapshot = await getDocs(collection(db, "packages"));
//     const data = snapshot.docs.map(doc => doc.data());
//     setUserList(data);
//   };
//   fetchPackages();
// }, []);

//   const merged = useMemo(() => mergePackages(staticAll), [staticAll, userList]);

//   const [form, setForm] = useState(initialForm);
//   const [editingSlug, setEditingSlug] = useState("");

//   const [destForm, setDestForm] = useState(initialDestForm);
//   const [editingDestSlug, setEditingDestSlug] = useState("");
//   const [userDests, setUserDests] = useState(() => readUserDestinations());
//   const mergedDests = useMemo(() => mergeDestinations(staticDestinations), [userDests]);
//   const [openPreview, setOpenPreview] = useState("");
//   const [showPkgForm, setShowPkgForm] = useState(false);
//   const [showDestForm, setShowDestForm] = useState(false);
//   const [password, setPassword] = useState("");

//   // Map of destinationSlug -> [packages]

//   const [editingTabsSlug, setEditingTabsSlug] = useState("");
//   const [tabsForm, setTabsForm] = useState([]);
//   const [showTabsForm, setShowTabsForm] = useState(false);

//   const destinationPackages = useMemo(() => {
//     const map = {};

//     merged.forEach(pkg => {
//       if (pkg.destinationSlug) {
//         (map[pkg.destinationSlug] = map[pkg.destinationSlug] || []).push(pkg);
//       }
//     });

//     const legacy = merged.filter(p => !p.destinationSlug);

//     const lc = v => (v||'').toLowerCase();

//     legacy.forEach(p => {
//       const slugLC = lc(p.slug);
//       const titleLC = lc(p.title);

//       if (slugLC.includes('sikkim') || titleLC.includes('sikkim')) {
//         if (!titleLC.includes('bhutan') && !slugLC.includes('bhutan')) {
//           (map['north-sikkim'] = map['north-sikkim'] || []).push(p);
//         }
//       }
//       if ((slugLC.includes('gangtok') || titleLC.includes('gangtok')) && !titleLC.includes('bhutan')) {
//         (map['gangtok'] = map['gangtok'] || []).push(p);
//       }
//       if (slugLC.includes('darjeeling') || titleLC.includes('darjeeling')) {
//         (map['darjeeling'] = map['darjeeling'] || []).push(p);
//       }
//       if (slugLC.includes('bhutan') || titleLC.includes('bhutan')) {
//         (map['bhutan'] = map['bhutan'] || []).push(p);
//       }
//       if (slugLC.includes('meghalaya') || titleLC.includes('meghalaya')) {
//         (map['meghalaya'] = map['meghalaya'] || []).push(p);
//       }
//       if (slugLC.includes('arunachal') || titleLC.includes('arunachal')) {
//         (map['arunachal-pradesh'] = map['arunachal-pradesh'] || []).push(p);
//       }
//     });

//     Object.keys(map).forEach(key => {
//       const seen = new Set();
//       const arr = map[key];
//       map[key] = arr.filter(pkg => {
//         const id = pkg.slug;
//         if (seen.has(id)) return false;
//         seen.add(id); return true;
//       }).sort((a,b)=> (a.title||'').localeCompare(b.title||''));
//     });
//     return map;
//   }, [merged, mergedDests]);

//   const scrollToPackageForm = () => {
//     const el = document.querySelector('.admin-card form');
//     if (el) {
//       el.scrollIntoView({ behavior: 'smooth', block: 'start' });
//     }
//   };
//   const handleDestImageFile = (e) => {
//     const file = e.target.files && e.target.files[0];
//     if (!file) return;
//     const reader = new FileReader();
//     reader.onload = () => {
//       const dataUrl = reader.result;
//       setDestForm(prev => ({ ...prev, image: typeof dataUrl === 'string' ? dataUrl : prev.image }));
//     };
//     reader.readAsDataURL(file);
//   };
//   const handleDestHeroFile = (e) => {
//     const file = e.target.files && e.target.files[0];
//     if (!file) return;
//     const reader = new FileReader();
//     reader.onload = () => {
//       const dataUrl = reader.result;
//       setDestForm(prev => ({ ...prev, heroImage: typeof dataUrl === 'string' ? dataUrl : prev.heroImage }));
//     };
//     reader.readAsDataURL(file);
//   };

//     const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//         await setPersistence(auth, browserSessionPersistence);
//         console.log("Logging in with", secret, password);
//     const userCredential = await signInWithEmailAndPassword(auth, secret, password);
//     console.log("User Logged In:", userCredential.user);
//     sessionStorage.setItem("admin.auth", "yes");
//     setAuth(true);
    
//   }catch (error) {
//   const errorCode = error.code;
//   let msg = "Login failed!";
//   if (errorCode === "auth/invalid-email") msg = "Invalid email format.";
//   else if (errorCode === "auth/user-not-found") msg = "No user found with this email.";
//   else if (errorCode === "auth/wrong-password") msg = "Incorrect password.";
//   alert(msg);
// }

//     // if ((secret || "").trim() === (import.meta.env.VITE_ADMIN_KEY || "admin123")) {
//     //   sessionStorage.setItem("admin.auth", "yes");
//     //   setAuth(true);
//     // } else {
//     //   alert("Invalid admin key");
//     // }
//   };

//   const startEdit = (pkg) => {
//     setEditingSlug(pkg.slug);
//     setForm({
//       image: pkg.image || "",
//       title: pkg.title || "",
//       subtitle: pkg.subtitle || "Tour Packages",
//       slug: pkg.slug || "",
//       destinationSlug: pkg.destinationSlug || "",
//       days: pkg.days || "",
//       price: pkg.price || "",
//       description: pkg.description || "",
//       inclusions: Array.isArray(pkg.inclusions) ? pkg.inclusions : [],
//       exclusions: Array.isArray(pkg.exclusions) ? pkg.exclusions : [],
//       faq: Array.isArray(pkg.faq) ? pkg.faq : [],
//       itinerary: Array.isArray(pkg.itinerary) ? pkg.itinerary : [],
//     });
//     setShowPkgForm(true);
//     setTimeout(scrollToPackageForm, 50);
//   };

//   const clearForm = () => {
//     setEditingSlug("");
//     setForm(initialForm);
//     setShowPkgForm(false);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!form.slug) {
//       alert("Slug is required and must be unique");
//       return;
//     }
//      try {
//     const packagesRef = collection(db, "packages");
//     const docRef = doc(packagesRef, form.slug); // use slug as ID for easy editing
//     await setDoc(docRef, form, { merge: true });

//     alert(editingSlug ? "Package updated!" : "Package added!");
//     clearForm();
//   } catch (error) {
//     console.error("Error adding package:", error);
//     alert("Failed to save package.");
//   }
//     upsertPackage({ ...form });
//     setUserList(readUserPackages());
//     clearForm();
//   };

//   const handleImageFile = (e) => {
//     const file = e.target.files && e.target.files[0];
//     if (!file) return;
//     const reader = new FileReader();
//     reader.onload = () => {
//       const dataUrl = reader.result;
//       setForm(prev => ({ ...prev, image: typeof dataUrl === 'string' ? dataUrl : prev.image }));
//     };
//     reader.readAsDataURL(file);
//   };

//   const handleDelete = (slug) => {
//     if (!window.confirm("Delete this package?")) return;
//     deletePackage(slug);
//     setUserList(readUserPackages());
//     if (editingSlug === slug) clearForm();
//   };

//   const handleEditTabs = (slug, destName) => {
//     setEditingTabsSlug(slug);
//     setTabsForm(readDestinationTabs()[slug] || [
//       { label: 'Tour Packages' },
//       { label: `About ${destName}` },
//       { label: 'Places to visit' },
//       { label: 'Exploring the Tranquil Lakes' },
//       { label: 'Monasteries' },
//       { label: 'Offbeat Places' },
//       { label: 'Full Tour Guide' },
//     ]);
//     setShowTabsForm(true);
//   };

//   const handleTabsFormChange = (idx, value) => {
//     setTabsForm(tabsForm.map((tab, i) => i === idx ? { ...tab, label: value } : tab));
//   };
//   const handleAddTab = () => setTabsForm([...tabsForm, { label: '' }]);
//   const handleRemoveTab = idx => setTabsForm(tabsForm.filter((_, i) => i !== idx));
//   const handleSaveTabs = () => {
//     setTabsForDestination(editingTabsSlug, tabsForm.filter(t => t.label.trim()));
//     setShowTabsForm(false);
//     setEditingTabsSlug("");
//   };
//   const handleDeleteTabs = () => {
//     removeTabsForDestination(editingTabsSlug);
//     setShowTabsForm(false);
//     setEditingTabsSlug("");
//   };

//   console.log("Merged Dests:", auth);
//   if (!authby) {
//     return (
//       <div className="login-card admin-card">
//         <h2 className="login-title">Admin Login</h2>
//         <form onSubmit={handleLogin} className="login-form">
//           <input type="text" placeholder="Enter email" value={secret} onChange={(e) => setSecret(e.target.value)} />
//           <input type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
//           <button type="submit" className="btn-primary">Login</button>
//         </form>
//       </div>
//     );
//   }

//   return (
//     <div className="admin-wrap">
//       <div className="admin-header">
//         <h1 className="admin-title">Admin Panel</h1>
//         <div className="admin-actions">
//           <button className="btn" onClick={() => { auth.signOut(); sessionStorage.removeItem("admin.auth"); setAuth(false); }}>Logout</button>
//           <button className="btn" onClick={() => navigate("/")}>Go Home</button>
//         </div>
//       </div>

//       {showPkgForm && (
//         <div className="admin-card package-form-block" id="package-form">
//           <div className="card-head-row">
//             <h2>{editingSlug ? "Edit Package" : "Add Package"}</h2>
//             <div className="item-actions">
//               <button className="btn-tertiary" onClick={() => { clearForm(); }}>Close</button>
//             </div>
//           </div>
//           <form onSubmit={handleSubmit} className="form-grid">
//             <input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
//             <input placeholder="Subtitle" value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} />
//             <input placeholder="Slug (unique)" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
//             <select value={form.destinationSlug} onChange={(e)=> setForm({ ...form, destinationSlug: e.target.value })}>
//               <option value="">-- Destination (optional) --</option>
//               {mergedDests.map(d => <option key={d.slug} value={d.slug}>{d.name}</option>)}
//             </select>
//             <input placeholder="Image URL" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
//             <input type="file" accept="image/*" onChange={handleImageFile} />
//             <input placeholder="Days (e.g., 5N/6D)" value={form.days} onChange={(e) => setForm({ ...form, days: e.target.value })} />
//             <input placeholder="Price" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
//             <textarea placeholder="Description" style={{ gridColumn: "1 / -1" }} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
//             <textarea placeholder="Inclusions (one per line)" style={{ gridColumn: "1 / -1" }}
//               value={(form.inclusions || []).join("\n")} onChange={(e) => setForm({ ...form, inclusions: e.target.value.split(/\n/).map(s => s.trim()).filter(Boolean) })} />
//             <textarea placeholder="Exclusions (one per line)" style={{ gridColumn: "1 / -1" }}
//               value={(form.exclusions || []).join("\n")} onChange={(e) => setForm({ ...form, exclusions: e.target.value.split(/\n/).map(s => s.trim()).filter(Boolean) })} />
//             <textarea placeholder='FAQ JSON (e.g., [{"q":"","a":""}])' style={{ gridColumn: "1 / -1" }}
//               value={JSON.stringify(form.faq || [])}
//               onChange={(e) => { try { const v = JSON.parse(e.target.value); setForm({ ...form, faq: Array.isArray(v) ? v : [] }); } catch { /* ignore */ } }} />
//             <textarea placeholder='Itinerary JSON (e.g., [{"day":"Day 1","details":["..."]}])' style={{ gridColumn: "1 / -1" }}
//               value={JSON.stringify(form.itinerary || [])}
//               onChange={(e) => { try { const v = JSON.parse(e.target.value); setForm({ ...form, itinerary: Array.isArray(v) ? v : [] }); } catch { /* ignore */ } }} />
//             <div className="form-actions">
//               <button type="submit" className="btn-primary">{editingSlug ? "Save" : "Add"}</button>
//               <button type="button" className="btn-tertiary" onClick={clearForm}>Cancel</button>
//             </div>
//           </form>
//         </div>
//       )}

//       <div className="admin-grid dests-only" style={{ marginTop: 24 }}>
//         {showDestForm && (
//           <div className="admin-card dest-form-block">
//             <div className="card-head-row">
//               <h2>{editingDestSlug ? "Edit Destination" : "Add Destination"}</h2>
//               <div className="item-actions">
//                 <button className="btn-tertiary" onClick={()=> { setShowDestForm(false); setEditingDestSlug(""); setDestForm(initialDestForm); }}>Close</button>
//               </div>
//             </div>
//             <form className="form-grid" onSubmit={(e) => {
//               e.preventDefault();
//               if (!destForm.slug) { alert("Destination slug required"); return; }
//               upsertDestination({ ...destForm });
//               setUserDests(readUserDestinations());
//               setEditingDestSlug("");
//               setDestForm(initialDestForm);
//               setShowDestForm(false);
//             }}>
//               <input placeholder="Slug (unique)" value={destForm.slug} onChange={(e) => setDestForm({ ...destForm, slug: e.target.value })} />
//               <input placeholder="Name" value={destForm.name} onChange={(e) => setDestForm({ ...destForm, name: e.target.value })} />
//               <input placeholder="Image URL" value={destForm.image} onChange={(e) => setDestForm({ ...destForm, image: e.target.value })} />
//               <input type="file" accept="image/*" onChange={handleDestImageFile} />
//               <input placeholder="Hero Image URL" value={destForm.heroImage} onChange={(e) => setDestForm({ ...destForm, heroImage: e.target.value })} />
//               <input type="file" accept="image/*" onChange={handleDestHeroFile} />
//               <input placeholder="Heading" value={destForm.heading} onChange={(e) => setDestForm({ ...destForm, heading: e.target.value })} />
//               <textarea placeholder="Description" style={{ gridColumn: "1 / -1" }} value={destForm.description} onChange={(e) => setDestForm({ ...destForm, description: e.target.value })} />
//               <textarea placeholder='' style={{ gridColumn: "1 / -1" }} value={destForm.lakesSection ? JSON.stringify(destForm.lakesSection) : ""}
//                 onChange={(e) => { try { const v = e.target.value ? JSON.parse(e.target.value) : null; setDestForm({ ...destForm, lakesSection: v }); } catch {} }} />
//               <textarea placeholder='Monasteries Section JSON or leave blank' style={{ gridColumn: "1 / -1" }} value={destForm.monasteriesSection ? JSON.stringify(destForm.monasteriesSection) : ""}
//                 onChange={(e) => { try { const v = e.target.value ? JSON.parse(e.target.value) : null; setDestForm({ ...destForm, monasteriesSection: v }); } catch {} }} />
//               <textarea placeholder='Highlights JSON (e.g., [{"title":"","content":""}])' style={{ gridColumn: "1 / -1" }} value={JSON.stringify(destForm.highlights || [])}
//                 onChange={(e) => { try { const v = JSON.parse(e.target.value); setDestForm({ ...destForm, highlights: Array.isArray(v) ? v : [] }); } catch {} }} />
//               <div className="form-actions" style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: 10, position: 'relative' }}>
//                 <div style={{ display: 'flex', gap: 10 }}>
//                   <button type="submit" className="btn-primary">{editingDestSlug ? "Save" : "Add"}</button>
//                   <button type="button" className="btn-tertiary" onClick={() => { setEditingDestSlug(""); setDestForm(initialDestForm); setShowDestForm(false); }}>Cancel</button>
//                 </div>
//                 {editingDestSlug && (
//                   <button type="button" className="btn-tertiary" style={{ position: 'absolute', right: 0 }} onClick={() => { handleEditTabs(editingDestSlug, destForm.name); setShowDestForm(false); setEditingDestSlug(""); }}>Edit Tabs</button>
//                 )}
//               </div>
//             </form>
//           </div>
//         )}

//         <div className="admin-card dests-list-card">
//           <div className="card-head-row">
//             <h2>Destinations</h2>
//             <div className="item-actions">
//               <button className="btn-small" onClick={()=> { setShowDestForm(true); setEditingDestSlug(""); setDestForm(initialDestForm); }}>+ Add Destination</button>
//             </div>
//           </div>
//           <div className="list">
//             {mergedDests.map((d) => (
//               <div key={d.slug} className={`list-item dest-item ${openPreview===d.slug? 'open-preview':''}`}>
//                 <img className="thumb" src={d.image} alt={d.name} />
//                 <div>
//                   <div className="item-title">{d.name}</div>
//                   <div className="item-sub">{d.slug}</div>
//                 </div>
//                 <div className="item-actions">
//                   <button className="btn-tertiary" onClick={e => {
//                     e.preventDefault();
//                     setShowDestForm(true);
//                     setEditingDestSlug(d.slug);
//                     setDestForm({ slug: d.slug || "", name: d.name || "", image: d.image || "", heroImage: d.heroImage || "", heading: d.heading || "", description: d.description || "", lakesSection: d.lakesSection || null, monasteriesSection: d.monasteriesSection || null, highlights: Array.isArray(d.highlights) ? d.highlights : [] });
//                     setTimeout(()=> { document.querySelector('.dest-form-block')?.scrollIntoView({behavior:'smooth'}); }, 30);
//                   }}>Edit</button>
//                   <button className="btn-danger" onClick={() => { if (!window.confirm("Delete this destination?")) return; deleteDestination(d.slug); setUserDests(readUserDestinations()); if (editingDestSlug === d.slug) { setEditingDestSlug(""); setDestForm(initialDestForm); } }}>Delete</button>
//                   <button className="btn-tertiary eye-btn" title="Preview Packages" onClick={()=> setOpenPreview(s => s===d.slug? "": d.slug)}>{openPreview===d.slug? 'Hide':'👁'}</button>
//                 </div>
//                 {openPreview===d.slug && (
//                   <div className="dest-preview">
//                     <div className="dest-preview-head">
//                       <strong>Packages</strong>
//                       <button className="btn-small add-inline" onClick={()=> { clearForm(); setForm(f=> ({...f, destinationSlug: d.slug, subtitle: 'Tour Packages'})); setShowPkgForm(true); setTimeout(scrollToPackageForm, 40); }}>+ Add Tour Package</button>
//                     </div>
//                     <div className="dest-preview-list">
//                       {(destinationPackages[d.slug]||[]).map(p => (
//                         <div key={p.slug} className="dest-preview-item">
//                           <div className="dp-left">
//                             {p.image ? <img src={p.image} alt={p.title} />: null}
//                             <div className="dp-text">
//                               <div className="dp-title">{p.title}</div>
//                               <div className="dp-sub">{p.slug}</div>
//                             </div>
//                           </div>
//                           <div className="dp-actions">
//                             <button className="btn-mini" onClick={()=> startEdit(p)}>Edit</button>
//                             <button className="btn-mini danger" onClick={()=> handleDelete(p.slug)}>Remove</button>
//                           </div>
//                         </div>
//                       ))}
//                       {(destinationPackages[d.slug]||[]).length===0 && <div className="empty-note">No packages linked.</div>}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ))}
//             {mergedDests.length === 0 ? <div>No destinations.</div> : null}
//           </div>
//         </div>
//       </div>

//       {/* Tabs Edit Modal (above Destinations section) */}
//       {showTabsForm && (
//         <div style={{ position: 'fixed', left: 0, right: 0, top: 0, zIndex: 2000, display: 'flex', justifyContent: 'center', alignItems: 'flex-start', minHeight: '100vh', pointerEvents: 'none' }}>
//           <div className="admin-card tabs-form-block" style={{ marginTop: 48, pointerEvents: 'auto' }}>
//             <div className="card-head-row">
//               <h2>Edit Destination Tabs</h2>
//               <div className="item-actions">
//                 <button className="btn-tertiary" onClick={() => { setShowTabsForm(false); setEditingTabsSlug(""); }}>Close</button>
//               </div>
//             </div>
//             <form className="form-grid" onSubmit={e => { e.preventDefault(); handleSaveTabs(); }}>
//               {tabsForm.map((tab, idx) => (
//                 <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
//                   <input value={tab.label} onChange={e => handleTabsFormChange(idx, e.target.value)} placeholder={`Tab ${idx+1} label`} style={{ flex: 1 }} />
//                   <button type="button" className="btn-mini danger" onClick={() => handleRemoveTab(idx)} disabled={tabsForm.length <= 1}>Remove</button>
//                 </div>
//               ))}
//               <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
//                 <button type="button" className="btn-mini" onClick={handleAddTab}>+ Add Tab</button>
//                 <button type="submit" className="btn-primary">Save</button>
//                 <button type="button" className="btn-danger" onClick={handleDeleteTabs}>Delete All</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminPanel;


// import React, { useEffect, useMemo, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   collection,
//   setDoc,
//   doc,
//   deleteDoc,
//   getDocs,
// } from "firebase/firestore";
// import {
//   signInWithEmailAndPassword,
//   setPersistence,
//   browserSessionPersistence,
//   signOut,
// } from "firebase/auth";
// import { auth, db } from "../../firebaseConfig";
// import "../AdminPanel.css";

// const initialForm = {
//   image: "",
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
// };

// const initialDestForm = {
//   slug: "",
//   name: "",
//   image: "",
//   heroImage: "",
//   heading: "",
//   description: "",
//   lakesSection: null,
//   monasteriesSection: null,
//   highlights: [],
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

//   // ---------------------------
//   // Fetch Data
//   // ---------------------------
//   const fetchPackages = async () => {
//     const snapshot = await getDocs(collection(db, "packages"));
//     setPackages(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
//   };

//   const fetchDestinations = async () => {
//     const snapshot = await getDocs(collection(db, "destinations"));
//     setDestinations(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
//   };

//   useEffect(() => {
//     if (isAuth) {
//       fetchPackages();
//       fetchDestinations();
//     }
//   }, [isAuth]);

//   // ---------------------------
//   // LOGIN
//   // ---------------------------
//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       await setPersistence(auth, browserSessionPersistence);
//       const userCredential = await signInWithEmailAndPassword(auth, email, password);
//       console.log("Logged in:", userCredential.user);
//       sessionStorage.setItem("admin.auth", "yes");
//       setIsAuth(true);
//     } catch (error) {
//       console.error(error);
//       alert("Login failed! Check your email or password.");
//     }
//   };

//   // ---------------------------
//   // LOGOUT
//   // ---------------------------
//   const handleLogout = async () => {
//     await signOut(auth);
//     sessionStorage.removeItem("admin.auth");
//     setIsAuth(false);
//   };

//   // ---------------------------
//   // CRUD: PACKAGES
//   // ---------------------------
//   const handlePackageSubmit = async (e) => {
//     e.preventDefault();
//     if (!form.slug) return alert("Slug is required!");
//     try {
//       const docRef = doc(db, "packages", form.slug);
//       await setDoc(docRef, form, { merge: true });
//       alert(editingSlug ? "Package updated!" : "Package added!");
//       clearForm();
//       fetchPackages();
//     } catch (err) {
//       console.error(err);
//       alert("Failed to save package");
//     }
//   };

//   const handleDeletePackage = async (slug) => {
//     if (!window.confirm("Delete this package?")) return;
//     await deleteDoc(doc(db, "packages", slug));
//     fetchPackages();
//   };

//   const clearForm = () => {
//     setForm(initialForm);
//     setEditingSlug("");
//     setShowPkgForm(false);
//   };

//   // ---------------------------
//   // CRUD: DESTINATIONS
//   // ---------------------------
//   const handleDestSubmit = async (e) => {
//     e.preventDefault();
//     if (!destForm.slug) return alert("Destination slug is required!");
//     try {
//       const docRef = doc(db, "destinations", destForm.slug);
//       await setDoc(docRef, destForm, { merge: true });
//       alert(editingDestSlug ? "Destination updated!" : "Destination added!");
//       setDestForm(initialDestForm);
//       setEditingDestSlug("");
//       setShowDestForm(false);
//       fetchDestinations();
//     } catch (err) {
//       console.error(err);
//       alert("Failed to save destination");
//     }
//   };

//   const handleDeleteDestination = async (slug) => {
//     if (!window.confirm("Delete this destination?")) return;
//     await deleteDoc(doc(db, "destinations", slug));
//     fetchDestinations();
//   };

//   // ---------------------------
//   // File Input Handler
//   // ---------------------------
//   const handleImageFile = (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     const reader = new FileReader();
//     reader.onload = () => setForm((prev) => ({ ...prev, image: reader.result }));
//     reader.readAsDataURL(file);
//   };

//   // ---------------------------
//   // Map Packages by Destination
//   // ---------------------------
//   const destinationPackages = useMemo(() => {
//     const map = {};
//     packages.forEach((pkg) => {
//       if (pkg.destinationSlug) {
//         (map[pkg.destinationSlug] = map[pkg.destinationSlug] || []).push(pkg);
//       }
//     });
//     return map;
//   }, [packages]);

//   if (!isAuth) {
//     return (
//       <div className="login-card admin-card">
//         <h2 className="login-title">Admin Login</h2>
//         <form onSubmit={handleLogin} className="login-form">
//           <input type="text" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
//           <input type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
//           <button type="submit" className="btn-primary">Login</button>
//         </form>
//       </div>
//     );
//   }

//   return (
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
//               <button className="btn-tertiary" onClick={() => { setShowDestForm(false); setDestForm(initialDestForm); setEditingDestSlug(""); }}>Close</button>
//             </div>
//             <form onSubmit={handleDestSubmit} className="form-grid">
//               <input placeholder="Slug (unique)" value={destForm.slug} onChange={(e) => setDestForm({ ...destForm, slug: e.target.value })} />
//               <input placeholder="Name" value={destForm.name} onChange={(e) => setDestForm({ ...destForm, name: e.target.value })} />
//               <input placeholder="Image URL" value={destForm.image} onChange={(e) => setDestForm({ ...destForm, image: e.target.value })} />
//               <input type="file" accept="image/*" onChange={(e) => {
//                 const file = e.target.files?.[0];
//                 if (!file) return;
//                 const reader = new FileReader();
//                 reader.onload = () => setDestForm(prev => ({ ...prev, image: reader.result }));
//                 reader.readAsDataURL(file);
//               }} />
//               <textarea placeholder="Description" value={destForm.description} onChange={(e) => setDestForm({ ...destForm, description: e.target.value })} />
//               <button type="submit" className="btn-primary">{editingDestSlug ? "Save" : "Add"}</button>
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
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>

//       {/* --- Package Form --- */}
//      {showPkgForm && (
//   <div className="admin-card package-form-block" id="package-form">
//     <div className="card-head-row">
//       <h2>{editingSlug ? "Edit Package" : "Add Package"}</h2>
//       <div className="item-actions">
//         <button className="btn-tertiary" onClick={clearForm}>Close</button>
//       </div>
//     </div>
//     <form onSubmit={handlePackageSubmit} className="form-grid">
//       <input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
//       <input placeholder="Subtitle" value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} />
//       <input placeholder="Slug (unique)" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
//       <select value={form.destinationSlug} onChange={(e) => setForm({ ...form, destinationSlug: e.target.value })}>
//         <option value="">-- Destination (optional) --</option>
//         {(destinations || []).map(d => <option key={d.slug} value={d.slug}>{d.name}</option>)}
//       </select>
//       <input placeholder="Image URL" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
//       <input type="file" accept="image/*" onChange={handleImageFile} />
//       <input placeholder="Days (e.g., 5N/6D)" value={form.days} onChange={(e) => setForm({ ...form, days: e.target.value })} />
//       <input placeholder="Price" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
//       <textarea placeholder="Description" style={{ gridColumn: "1 / -1" }} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
//       <textarea placeholder="Inclusions (one per line)" style={{ gridColumn: "1 / -1" }} value={(form.inclusions || []).join("\n")} onChange={(e) => setForm({ ...form, inclusions: e.target.value.split(/\n/).map(s => s.trim()).filter(Boolean) })} />
//       <textarea placeholder="Exclusions (one per line)" style={{ gridColumn: "1 / -1" }} value={(form.exclusions || []).join("\n")} onChange={(e) => setForm({ ...form, exclusions: e.target.value.split(/\n/).map(s => s.trim()).filter(Boolean) })} />
//       <textarea placeholder='FAQ JSON (e.g., [{"q":"","a":""}])' style={{ gridColumn: "1 / -1" }} value={JSON.stringify(form.faq || [])} onChange={(e) => { try { const v = JSON.parse(e.target.value); setForm({ ...form, faq: Array.isArray(v) ? v : [] }); } catch { } }} />
//       <textarea placeholder='Itinerary JSON (e.g., [{"day":"Day 1","details":["..."]}])' style={{ gridColumn: "1 / -1" }} value={JSON.stringify(form.itinerary || [])} onChange={(e) => { try { const v = JSON.parse(e.target.value); setForm({ ...form, itinerary: Array.isArray(v) ? v : [] }); } catch { } }} />
//       <div className="form-actions">
//         <button type="submit" className="btn-primary">{editingSlug ? "Save" : "Add"}</button>
//         <button type="button" className="btn-tertiary" onClick={clearForm}>Cancel</button>
//       </div>
//     </form>
//   </div>
// )}

//     </div>
//   );
// };

// export default AdminPanel;



// import React, { useEffect, useMemo, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   collection,
//   setDoc,
//   doc,
//   deleteDoc,
//   getDocs,
// } from "firebase/firestore";
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
//   image: "",
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

//   // ---------------------------
//   // Fetch Data
//   // ---------------------------
//   const fetchPackages = async () => {
//     const snapshot = await getDocs(collection(db, "packages"));
//     setPackages(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
//   };

//   const fetchDestinations = async () => {
//     const snapshot = await getDocs(collection(db, "destinations"));
//     setDestinations(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
//   };

//   useEffect(() => {
//     if (isAuth) {
//       fetchPackages();
//       fetchDestinations();
//     }
//   }, [isAuth]);

//   // ---------------------------
//   // LOGIN
//   // ---------------------------
//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       await setPersistence(auth, browserSessionPersistence);
//       const userCredential = await signInWithEmailAndPassword(auth, email, password);
//       sessionStorage.setItem("admin.auth", "yes");
//       setIsAuth(true);
//     } catch (error) {
//       console.error(error);
//       alert("Login failed! Check your email or password.");
//     }
//   };

//   // ---------------------------
//   // LOGOUT
//   // ---------------------------
//   const handleLogout = async () => {
//     await signOut(auth);
//     sessionStorage.removeItem("admin.auth");
//     setIsAuth(false);
//   };

//   // ---------------------------
//   // CRUD: PACKAGES
//   // ---------------------------
//   const handlePackageSubmit = async (e) => {
//     e.preventDefault();
//     if (!form.slug) return alert("Slug is required!");
//     try {
//       const docRef = doc(db, "packages", form.slug);
//       await setDoc(docRef, form, { merge: true });
//       alert(editingSlug ? "Package updated!" : "Package added!");
//       clearForm();
//       fetchPackages();
//     } catch (err) {
//       console.error(err);
//       alert("Failed to save package");
//     }
//   };

//   const handleDeletePackage = async (slug) => {
//     if (!window.confirm("Delete this package?")) return;
//     await deleteDoc(doc(db, "packages", slug));
//     fetchPackages();
//   };

//   const clearForm = () => {
//     setForm(initialForm);
//     setEditingSlug("");
//     setShowPkgForm(false);
//   };

//   // ---------------------------
//   // CRUD: DESTINATIONS
//   // ---------------------------
//   const handleDestSubmit = async (e) => {
//     e.preventDefault();
//     if (!destForm.slug) return alert("Destination slug is required!");
//     try {
//       const docRef = doc(db, "destinations", destForm.slug);
//       await setDoc(docRef, destForm, { merge: true });
//       alert(editingDestSlug ? "Destination updated!" : "Destination added!");
//       setDestForm(initialDestForm);
//       setEditingDestSlug("");
//       setShowDestForm(false);
//       fetchDestinations();
//     } catch (err) {
//       console.error(err);
//       alert("Failed to save destination");
//     }
//   };

//   const handleDeleteDestination = async (slug) => {
//     if (!window.confirm("Delete this destination?")) return;
//     await deleteDoc(doc(db, "destinations", slug));
//     fetchDestinations();
//   };

//   // ---------------------------
//   // File Input Handler
//   // ---------------------------
//   const handleImageFile = (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     const reader = new FileReader();
//     reader.onload = () => setForm((prev) => ({ ...prev, image: reader.result }));
//     reader.readAsDataURL(file);
//   };

//   // ---------------------------
//   // Map Packages by Destination
//   // ---------------------------
//   const destinationPackages = useMemo(() => {
//     const map = {};
//     packages.forEach((pkg) => {
//       if (pkg.destinationSlug) {
//         (map[pkg.destinationSlug] = map[pkg.destinationSlug] || []).push(pkg);
//       }
//     });
//     return map;
//   }, [packages]);

//   if (!isAuth) {
//     return (
//       <div className="login-card admin-card">
//         <h2 className="login-title">Admin Login</h2>
//         <form onSubmit={handleLogin} className="login-form">
//           <input type="text" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
//           <input type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
//           <button type="submit" className="btn-primary">Login</button>
//         </form>
//       </div>
//     );
//   }

//   return (
//     <>
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
//      {showDestForm ? (
//   <div className="admin-card dest-form-block">
//     <div className="card-head-row">
//       <h2>{editingDestSlug ? "Edit Destination" : "Add Destination"}</h2>
//       <button
//         className="btn-tertiary"
//         onClick={() => {
//           setShowDestForm(false);
//           setDestForm(initialDestForm);
//           setEditingDestSlug("");
//         }}
//       >
//         Close
//       </button>
//     </div>

//     <form onSubmit={handleDestSubmit} className="form-grid">
//       {/* Slug */}
//       <input
//         placeholder="Slug (unique)"
//         value={destForm.slug}
//         onChange={(e) => setDestForm({ ...destForm, slug: e.target.value })}
//       />

//       {/* Name */}
//       <input
//         placeholder="Name"
//         value={destForm.name}
//         onChange={(e) => setDestForm({ ...destForm, name: e.target.value })}
//       />

//       {/* Image URL + Upload */}
//       <input
//         placeholder="Image URL"
//         value={destForm.image}
//         onChange={(e) => setDestForm({ ...destForm, image: e.target.value })}
//       />
//       <input
//         type="file"
//         accept="image/*"
//         onChange={(e) => {
//           const file = e.target.files?.[0];
//           if (!file) return;
//           const reader = new FileReader();
//           reader.onload = () =>
//             setDestForm((prev) => ({ ...prev, image: reader.result }));
//           reader.readAsDataURL(file);
//         }}
//       />

//       {/* Hero Image URL + Upload */}
//       <input
//         placeholder="Hero Image URL"
//         value={destForm.heroImage}
//         onChange={(e) =>
//           setDestForm({ ...destForm, heroImage: e.target.value })
//         }
//       />
//       <input
//         type="file"
//         accept="image/*"
//         onChange={(e) => {
//           const file = e.target.files?.[0];
//           if (!file) return;
//           const reader = new FileReader();
//           reader.onload = () =>
//             setDestForm((prev) => ({ ...prev, heroImage: reader.result }));
//           reader.readAsDataURL(file);
//         }}
//       />

//       {/* Heading */}
//       <input
//         placeholder="Heading"
//         value={destForm.heading}
//         onChange={(e) => setDestForm({ ...destForm, heading: e.target.value })}
//       />

//       {/* Description */}
//       <textarea
//         placeholder="Description"
//         value={destForm.description}
//         onChange={(e) =>
//           setDestForm({ ...destForm, description: e.target.value })
//         }
//         style={{ gridColumn: "1 / -1" }}
//       />

//       {/* Monasteries Section JSON */}
//       {/* <textarea
//         placeholder="Monasteries Section JSON or leave blank"
//         value={
//           destForm.monasteriesSection
//             ? JSON.stringify(destForm.monasteriesSection, null, 2)
//             : ""
//         }
//         onChange={(e) => {
//           try {
//             const parsed = JSON.parse(e.target.value);
//             setDestForm({
//               ...destForm,
//             monasteriesSection:
//                 typeof parsed === "object" ? parsed : null,
//             });
//           } catch {
//             // if invalid JSON, just store raw text so user can fix it
//             setDestForm({
//               ...destForm,
//               monasteriesSectionText: e.target.value,
//             });
//           }
//         }}
//         style={{ gridColumn: "1 / -1", height: "120px" }}
//       /> */}

//       {/* ✅ Fixed Highlights JSON (works correctly now) */}
//      <div style={{ gridColumn: "1 / -1" }}>
//   <h3>Packages</h3>
//   {destForm.highlights?.map((h, index) => (
//     <div key={index} style={{
//       display: "grid",
//       gridTemplateColumns: "1fr 1fr auto",
//       gap: "10px",
//       marginBottom: "10px",
//       alignItems: "center",
//     }}>
//       <input
//         type="text"
//         placeholder="Title"
//         value={h.title}
//         onChange={(e) => {
//           const newHighlights = [...destForm.highlights];
//           newHighlights[index].title = e.target.value;
//           setDestForm({ ...destForm, highlights: newHighlights });
//         }}
//       />
//       <input
//         type="text"
//         placeholder="Description"
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
//         highlights: [...(destForm.highlights || []), { title: "", description: "" }],
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
//     + Add Packages
//   </button>
// </div>


//       {/* Buttons */}
//       <div className="form-actions">
//         <button type="submit" className="btn-primary">
//           {editingDestSlug ? "Save" : "Add"}
//         </button>
//         <button
//           type="button"
//           className="btn-tertiary"
//           onClick={() => {
//             setShowDestForm(false);
//             setDestForm(initialDestForm);
//           }}
//         >
//           Cancel
//         </button>
//       </div>
//     </form>
//   </div>
// ) : (
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
//             <input type="file" accept="image/*" onChange={handleImageFile} />
//             <input placeholder="Days (e.g., 5N/6D)" value={form.days} onChange={(e) => setForm({ ...form, days: e.target.value })} />
//             <input placeholder="Price" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
//             <textarea placeholder="Description" style={{ gridColumn: "1 / -1" }} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
//             <textarea placeholder="Inclusions (one per line)" style={{ gridColumn: "1 / -1" }} value={(form.inclusions || []).join("\n")} onChange={(e) => setForm({ ...form, inclusions: e.target.value.split(/\n/).map(s => s.trim()).filter(Boolean) })} />
//             <textarea placeholder="Exclusions (one per line)" style={{ gridColumn: "1 / -1" }} value={(form.exclusions || []).join("\n")} onChange={(e) => setForm({ ...form, exclusions: e.target.value.split(/\n/).map(s => s.trim()).filter(Boolean) })} />
//             <textarea placeholder='FAQ JSON (e.g., [{"q":"","a":""}])' style={{ gridColumn: "1 / -1" }} value={JSON.stringify(form.faq || [])} onChange={(e) => { try { const v = JSON.parse(e.target.value); setForm({ ...form, faq: Array.isArray(v) ? v : [] }); } catch { } }} />
//             <textarea placeholder='Itinerary JSON (e.g., [{"day":"Day 1","details":["..."]}])' style={{ gridColumn: "1 / -1" }} value={JSON.stringify(form.itinerary || [])} onChange={(e) => { try { const v = JSON.parse(e.target.value); setForm({ ...form, itinerary: Array.isArray(v) ? v : [] }); } catch { } }} />
//             <div className="form-actions">
//               <button type="submit" className="btn-primary">{editingSlug ? "Save" : "Add"}</button>
//               <button type="button" className="btn-tertiary" onClick={clearForm}>Cancel</button>
//             </div>
//           </form>
//         </div>
//       )}
//     </div>
//     <DashboardImageManager/>
//     <AddTripPage/>
//     </>
//   );
// };

// export default AdminPanel;



// import React, { useEffect, useMemo, useState } from "react";
// import { useNavigate } from "react-router-dom";
// // import {
// //   collection,
// //   setDoc,
// //   doc,
// //   deleteDoc,
// //   getDocs,
// // } from "firebase/firestore";


// import {
//   collection,
//   addDoc,
//   updateDoc,
//   getDocs,
//   setDoc,
//   doc,
//   deleteDoc,
// } from "firebase/firestore";
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
//   image: "",
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
//   extraPackages: [], // ✅ new field
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
// const [extraDraft, setExtraDraft] = useState({ title: "", image: "" });

// // index when editing an existing extra inside a destination
// const [editingExtraIndexFor, setEditingExtraIndexFor] = useState({ slug: null, index: null });


// // Save (add or update) an extra package directly on a destination in Firestore
// const saveExtraPackageForDestination = async (destSlug) => {
//   if (!extraDraft.title || !extraDraft.image) return alert("fill title and image");

//   try {
//     // find destination object from state
//     const destination = destinations.find(d => d.slug === destSlug) || null;
//     const current = destination?.extraPackages ? [...destination.extraPackages] : [];

//     // if editing (editingExtraIndexFor.slug === destSlug), replace at index
//     if (editingExtraIndexFor.slug === destSlug && editingExtraIndexFor.index !== null) {
//       current[editingExtraIndexFor.index] = { ...extraDraft };
//     } else {
//       current.push({ ...extraDraft });
//     }

//     // write back to Firestore (merge)
//     await setDoc(doc(db, "destinations", destSlug), { extraPackages: current }, { merge: true });

//     // refresh local list
//     await fetchDestinations();

//     // reset UI
//     setExtraDraft({ title: "", image: "" });
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
//   const pkg = destination.extraPackages?.[index] || { title: "", image: "" };
//   setExtraDraft({ title: pkg.title || "", image: pkg.image || "" });
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


//   // ---------------------------
//   // Fetch Data
//   // ---------------------------
//   const fetchPackages = async () => {
//     const snapshot = await getDocs(collection(db, "packages"));
//     setPackages(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
//   };

//   const fetchDestinations = async () => {
//     const snapshot = await getDocs(collection(db, "destinations"));
//     setDestinations(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
//   };

//   useEffect(() => {
//     if (isAuth) {
//       fetchPackages();
//       fetchDestinations();
//     }
//   }, [isAuth]);

//   // ---------------------------
//   // LOGIN
//   // ---------------------------
//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       await setPersistence(auth, browserSessionPersistence);
//       const userCredential = await signInWithEmailAndPassword(auth, email, password);
//       sessionStorage.setItem("admin.auth", "yes");
//       setIsAuth(true);
//     } catch (error) {
//       console.error(error);
//       alert("Login failed! Check your email or password.");
//     }
//   };

//   // ---------------------------
//   // LOGOUT
//   // ---------------------------
//   const handleLogout = async () => {
//     await signOut(auth);
//     sessionStorage.removeItem("admin.auth");
//     setIsAuth(false);
//   };

//   // ---------------------------
//   // CRUD: PACKAGES
//   // ---------------------------
//   const handlePackageSubmit = async (e) => {
//     e.preventDefault();
//     if (!form.slug) return alert("Slug is required!");
//     try {
//       const docRef = doc(db, "packages", form.slug);
//       await setDoc(docRef, form, { merge: true });
//       alert(editingSlug ? "Package updated!" : "Package added!");
//       clearForm();
//       fetchPackages();
//     } catch (err) {
//       console.error(err);
//       alert("Failed to save package");
//     }
//   };

//   const handleDeletePackage = async (slug) => {
//     if (!window.confirm("Delete this package?")) return;
//     await deleteDoc(doc(db, "packages", slug));
//     fetchPackages();
//   };

//   const clearForm = () => {
//     setForm(initialForm);
//     setEditingSlug("");
//     setShowPkgForm(false);
//   };

//   // ---------------------------
//   // CRUD: DESTINATIONS
//   // ---------------------------
//   const handleDestSubmit = async (e) => {
//     e.preventDefault();
//     if (!destForm.slug) return alert("Destination slug is required!");
//     try {
//       const docRef = doc(db, "destinations", destForm.slug);
//       await setDoc(docRef, destForm, { merge: true });
//       alert(editingDestSlug ? "Destination updated!" : "Destination added!");
//       setDestForm(initialDestForm);
//       setEditingDestSlug("");
//       setShowDestForm(false);
//       fetchDestinations();
//     } catch (err) {
//       console.error(err);
//       alert("Failed to save destination");
//     }
//   };

//   const handleDeleteDestination = async (slug) => {
//     if (!window.confirm("Delete this destination?")) return;
//     await deleteDoc(doc(db, "destinations", slug));
//     fetchDestinations();
//   };

//   // ---------------------------
//   // File Input Handler
//   // ---------------------------
//   const handleImageFile = (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     const reader = new FileReader();
//     reader.onload = () => setForm((prev) => ({ ...prev, image: reader.result }));
//     reader.readAsDataURL(file);
//   };

//   // ---------------------------
//   // Map Packages by Destination
//   // ---------------------------
//   const destinationPackages = useMemo(() => {
//     const map = {};
//     packages.forEach((pkg) => {
//       if (pkg.destinationSlug) {
//         (map[pkg.destinationSlug] = map[pkg.destinationSlug] || []).push(pkg);
//       }
//     });
//     return map;
//   }, [packages]);

//   if (!isAuth) {
//     return (
//       <div className="login-card admin-card">
//         <h2 className="login-title">Admin Login</h2>
//         <form onSubmit={handleLogin} className="login-form">
//           <input type="text" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
//           <input type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
//           <button type="submit" className="btn-primary">Login</button>
//         </form>
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className="admin-wrap">
//         <div className="admin-header">
//           <h1 className="admin-title">Admin Panel</h1>
//           <div className="admin-actions">
//             <button className="btn" onClick={handleLogout}>Logout</button>
//             <button className="btn" onClick={() => navigate("/")}>Go Home</button>
//           </div>
//         </div>




//         {/* --- Destinations --- */}
//         <div className="admin-grid dests-only" style={{ marginTop: 24 }}>
//           {showDestForm ? (
//             <div className="admin-card dest-form-block">
//               <div className="card-head-row">
//                 <h2>{editingDestSlug ? "Edit Destination" : "Add Destination"}</h2>
//                 <button
//                   className="btn-tertiary"
//                   onClick={() => {
//                     setShowDestForm(false);
//                     setDestForm(initialDestForm);
//                     setEditingDestSlug("");
//                   }}
//                 >
//                   Close
//                 </button>
//               </div>

//               <form onSubmit={handleDestSubmit} className="form-grid">
//                 {/* Slug */}
//                 <input placeholder="Slug (unique)" value={destForm.slug} onChange={(e) => setDestForm({ ...destForm, slug: e.target.value })} />
//                 {/* Name */}
//                 <input placeholder="Name" value={destForm.name} onChange={(e) => setDestForm({ ...destForm, name: e.target.value })} />
//                 {/* Image + Hero */}
//                 <input placeholder="Image URL" value={destForm.image} onChange={(e) => setDestForm({ ...destForm, image: e.target.value })} />
//                 <input type="file" accept="image/*" onChange={(e) => {
//                   const file = e.target.files?.[0];
//                   if (!file) return;
//                   const reader = new FileReader();
//                   reader.onload = () => setDestForm((prev) => ({ ...prev, image: reader.result }));
//                   reader.readAsDataURL(file);
//                 }} />
//                 <input placeholder="Hero Image URL" value={destForm.heroImage} onChange={(e) => setDestForm({ ...destForm, heroImage: e.target.value })} />
//                 <input type="file" accept="image/*" onChange={(e) => {
//                   const file = e.target.files?.[0];
//                   if (!file) return;
//                   const reader = new FileReader();
//                   reader.onload = () => setDestForm((prev) => ({ ...prev, heroImage: reader.result }));
//                   reader.readAsDataURL(file);
//                 }} />

//                 <input placeholder="Heading" value={destForm.heading} onChange={(e) => setDestForm({ ...destForm, heading: e.target.value })} />
//                 <textarea placeholder="Description" value={destForm.description} onChange={(e) => setDestForm({ ...destForm, description: e.target.value })} style={{ gridColumn: "1 / -1" }} />

//                   {/* ✅ Highlights Section */}
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



//                 {/* Buttons */}
//                 <div className="form-actions">
//                   <button type="submit" className="btn-primary">{editingDestSlug ? "Save" : "Add"}</button>
//                   <button type="button" className="btn-tertiary" onClick={() => { setShowDestForm(false); setDestForm(initialDestForm); }}>Cancel</button>
//                 </div>
//               </form>
//             </div>
//           ) : (
//             <div className="admin-card dests-list-card">
//               <div className="card-head-row">
//                 <h2>Destinations</h2>
//                 <button className="btn-small" onClick={() => { setShowDestForm(true); setDestForm(initialDestForm); setEditingDestSlug(""); }}>+ Add Destination</button>
//               </div>
//               <div className="list">
//                 {destinations.map(d => (
//                   <div key={d.slug} className="list-item dest-item">
//                     <img className="thumb" src={d.image} alt={d.name} />
//                     <div>
//                       <div className="item-title">{d.name}</div>
//                       <div className="item-sub">{d.slug}</div>
//                     </div>
//                     <div className="item-actions">
//                       <button className="btn-tertiary" onClick={() => { setShowDestForm(true); setDestForm(d); setEditingDestSlug(d.slug); }}>Edit</button>
//                       <button className="btn-danger" onClick={() => handleDeleteDestination(d.slug)}>Delete</button>
//                       <button className="btn-tertiary" onClick={() => setOpenPreview((s) => (s === d.slug ? "" : d.slug))}>{openPreview === d.slug ? "Hide" : "👁"}</button>
//                     </div>

//                     {/* --- Add Extra Package button for this destination --- */}
// <div style={{ marginTop: 8 }}>
//   <button
//     className="btn-small"
//     onClick={() => {
//       // toggle manager open for this destination
//       if (openExtraManagerFor === d.slug) {
//         setOpenExtraManagerFor(null);
//         setExtraDraft({ title: "", image: "" });
//         setEditingExtraIndexFor({ slug: null, index: null });
//       } else {
//         setOpenExtraManagerFor(d.slug);
//         setExtraDraft({ title: "", image: "" });
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
//           const reader = new FileReader();
//           reader.onload = () => setExtraDraft(prev => ({ ...prev, image: reader.result }));
//           reader.readAsDataURL(file);
//         }}
//       />
//       <button className="btn-primary" onClick={() => saveExtraPackageForDestination(d.slug)}>
//         {editingExtraIndexFor.slug === d.slug && editingExtraIndexFor.index !== null ? "Save" : "Add"}
//       </button>
//       <button className="btn-tertiary" onClick={() => { setOpenExtraManagerFor(null); setExtraDraft({ title: "", image: "" }); setEditingExtraIndexFor({ slug: null, index: null }); }}>
//         Cancel
//       </button>
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


//                     {/* Destination Preview */}
//                     {openPreview === d.slug && (
//                       <div className="dest-preview">
//                         <div className="dest-preview-head">
//                           <strong>Packages</strong>
//                           <button className="btn-small add-inline" onClick={() => { setShowPkgForm(true); setForm({ ...initialForm, destinationSlug: d.slug }); }}>+ Add Tour Package</button>
//                         </div>
//                         <div className="dest-preview-list">
//                           {(destinationPackages[d.slug] || []).map(p => (
//                             <div key={p.slug} className="dest-preview-item">
//                               {p.image && <img src={p.image} alt={p.title} />}
//                               <div className="dp-text"><div className="dp-title">{p.title}</div></div>
//                               <div className="dp-actions">
//                                 <button className="btn-mini" onClick={() => { setForm(p); setEditingSlug(p.slug); setShowPkgForm(true); }}>Edit</button>
//                                 <button className="btn-mini danger" onClick={() => handleDeletePackage(p.slug)}>Remove</button>
//                               </div>
//                             </div>
//                           ))}
//                         </div>

//                         {/* ✅ Preview Extra Packages */}
//                         {d.extraPackages?.length > 0 && (
//                           <div style={{ marginTop: "15px" }}>
//                             <strong>Extra Packages</strong>
//                             <div className="dest-preview-list">
//                               {d.extraPackages.map((pkg, i) => (
//                                 <div key={i} className="dest-preview-item">
//                                   {pkg.image && <img src={pkg.image} alt={pkg.title} />}
//                                   <div className="dp-text">
//                                     <div className="dp-title">{pkg.title}</div>
//                                   </div>
//                                 </div>
//                               ))}
//                             </div>
//                           </div>
//                         )}
//                       </div>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>

//         {/* --- Package Form --- */}
//         {showPkgForm && (
//           <div className="admin-card package-form-block" id="package-form">
//             <div className="card-head-row">
//               <h2>{editingSlug ? "Edit Package" : "Add Package"}</h2>
//               <div className="item-actions">
//                 <button className="btn-tertiary" onClick={clearForm}>Close</button>
//               </div>
//             </div>
//             <form onSubmit={handlePackageSubmit} className="form-grid">
//               <input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
//               <input placeholder="Subtitle" value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} />
//               <input placeholder="Slug (unique)" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
//               <select value={form.destinationSlug} onChange={(e) => setForm({ ...form, destinationSlug: e.target.value })}>
//                 <option value="">-- Destination (optional) --</option>
//                 {(destinations || []).map(d => <option key={d.slug} value={d.slug}>{d.name}</option>)}
//               </select>
//               <input placeholder="Image URL" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
//               <input type="file" accept="image/*" onChange={handleImageFile} />
//               <input placeholder="Days (e.g., 5N/6D)" value={form.days} onChange={(e) => setForm({ ...form, days: e.target.value })} />
//               <input placeholder="Price" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
//               <textarea placeholder="Description" style={{ gridColumn: "1 / -1" }} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
//               <textarea placeholder="Inclusions (one per line)" style={{ gridColumn: "1 / -1" }} value={(form.inclusions || []).join("\n")} onChange={(e) => setForm({ ...form, inclusions: e.target.value.split(/\n/).map(s => s.trim()).filter(Boolean) })} />
//               <textarea placeholder="Exclusions (one per line)" style={{ gridColumn: "1 / -1" }} value={(form.exclusions || []).join("\n")} onChange={(e) => setForm({ ...form, exclusions: e.target.value.split(/\n/).map(s => s.trim()).filter(Boolean) })} />
//               <textarea placeholder="FAQ (Q|A pairs per line)" style={{ gridColumn: "1 / -1" }} value={(form.faq || []).map(f => `${f.q}|${f.a}`).join("\n")} onChange={(e) => {
//                 const faqs = e.target.value.split(/\n/).map(l => {
//                   const [q, a] = l.split("|");
//                   return q && a ? { q: q.trim(), a: a.trim() } : null;
//                 }).filter(Boolean);
//                 setForm({ ...form, faq: faqs });
//               }} />
//               <textarea placeholder="Itinerary (Day|Text per line)" style={{ gridColumn: "1 / -1" }} value={(form.itinerary || []).map(i => `${i.day}|${i.text}`).join("\n")} onChange={(e) => {
//                 const itin = e.target.value.split(/\n/).map(l => {
//                   const [day, text] = l.split("|");
//                   return day && text ? { day: day.trim(), text: text.trim() } : null;
//                 }).filter(Boolean);
//                 setForm({ ...form, itinerary: itin });
//               }} />
//               <div className="form-actions">
//                 <button type="submit" className="btn-primary">{editingSlug ? "Save" : "Add"}</button>
//                 <button type="button" className="btn-tertiary" onClick={clearForm}>Cancel</button>
//               </div>
//             </form>
//           </div>
//         )}
        
//      <DashboardImageManager/>
//      <AddTripPage/>
//       </div>
//     </>
//   );
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

// -------------------------
// Initial Forms
// -------------------------
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
};

const initialDestForm = {
  slug: "",
  name: "",
  image: "",
  heroImage: "",
  heading: "",
  description: "",
  monasteriesSection: null,
  highlights: [],
  extraPackages: [],
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
const [extraDraft, setExtraDraft] = useState({ title: "", image: "", highlights: [] });

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

    const newPkg = { title: extraDraft.title, image: imageUrl || "", highlights: extraDraft.highlights || [] };

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
    setExtraDraft({ title: "", image: "", highlights: [] });
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
  setExtraDraft({ title: pkg.title || "", image: pkg.image || "", highlights: pkg.highlights || [] });
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


// ---------------------------
// Fetch Data
// ---------------------------
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

// ---------------------------
// LOGIN
// ---------------------------
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

// ---------------------------
// LOGOUT
// ---------------------------
const handleLogout = async () => {
  await signOut(auth);
  sessionStorage.removeItem("admin.auth");
  setIsAuth(false);
};

// ---------------------------
// CRUD: PACKAGES
// ---------------------------
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

// ---------------------------
// CRUD: DESTINATIONS
// ---------------------------
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
              <textarea placeholder="Description" value={destForm.description} onChange={(e) => setDestForm({ ...destForm, description: e.target.value })} style={{ gridColumn: "1 / -1" }} />

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
        setExtraDraft({ title: "", image: "", highlights: [] });
        setEditingExtraIndexFor({ slug: null, index: null });
      } else {
        setOpenExtraManagerFor(d.slug);
        setExtraDraft({ title: "", image: "", highlights: [] });
        setEditingExtraIndexFor({ slug: null, index: null });
      }
    }}
  >
    {openExtraManagerFor === d.slug ? "Close Add Package" : "+ Add Package"}
  </button>
</div>

{/* --- Inline Manager (only for this destination) --- */}
{openExtraManagerFor === d.slug && (
  <div style={{
    marginTop: 12,
    padding: 12,
    borderRadius: 8,
    background: "#fff",
    boxShadow: "0 2px 6px rgba(0,0,0,0.04)"
  }}>
    <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
      <input
        type="text"
        placeholder="Package title"
        value={extraDraft.title}
        onChange={(e) => setExtraDraft(prev => ({ ...prev, title: e.target.value }))}
      />
      <input
        type="text"
        placeholder="Image URL (or use upload)"
        value={extraDraft.image}
        onChange={(e) => setExtraDraft(prev => ({ ...prev, image: e.target.value }))}
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (!file) return;
          setExtraDraft(prev => ({ ...prev, imageFile: file, image: "" }));
        }}
      />
      <button className="btn-primary" onClick={() => saveExtraPackageForDestination(d.slug)}>
        {editingExtraIndexFor.slug === d.slug && editingExtraIndexFor.index !== null ? "Save" : "Add"}
      </button>
      <button className="btn-tertiary" onClick={() => { setOpenExtraManagerFor(null); setExtraDraft({ title: "", image: "", highlights: [] }); setEditingExtraIndexFor({ slug: null, index: null }); }}>
        Cancel
      </button>
    </div>

    {/* Highlights inside extra package */}
    <div style={{ marginTop: 12 }}>
      <strong>Highlights</strong>
      {(extraDraft.highlights || []).map((h, idx) => (
        <div key={idx} style={{ display: "flex", gap: 8, marginTop: 8 }}>
          <input type="text" placeholder="Title" value={h.title} onChange={(e) => {
            const arr = [...extraDraft.highlights];
            arr[idx].title = e.target.value;
            setExtraDraft(prev => ({ ...prev, highlights: arr }));
          }} />
          <input type="text" placeholder="Description" value={h.description} onChange={(e) => {
            const arr = [...extraDraft.highlights];
            arr[idx].description = e.target.value;
            setExtraDraft(prev => ({ ...prev, highlights: arr }));
          }} />
          <button className="btn-mini danger" onClick={() => {
            const arr = extraDraft.highlights.filter((_, i) => i !== idx);
            setExtraDraft(prev => ({ ...prev, highlights: arr }));
          }}>✕</button>
        </div>
      ))}

      <div style={{ marginTop: 8 }}>
        <button className="btn-small" onClick={() => setExtraDraft(prev => ({ ...prev, highlights: [...(prev.highlights||[]), { title: "", description: "" }] }))}>+ Add Highlight</button>
      </div>
    </div>

    {/* list existing extras for this destination with edit & delete */}
    {d.extraPackages?.length > 0 && (
      <div style={{ marginTop: 12 }}>
        <strong>Existing Packages</strong>
        {d.extraPackages.map((pkg, idx) => (
          <div key={idx} style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 8 }}>
            {pkg.image && <img src={pkg.image} alt={pkg.title} style={{ width: 70, height: 50, objectFit: "cover", borderRadius: 6 }} />}
            <div style={{ flex: 1 }}>{pkg.title}</div>
            <button className="btn-mini" onClick={() => startEditExtraForDestination(d.slug, idx)}>✎ Edit</button>
            <button className="btn-mini danger" onClick={() => deleteExtraFromDestination(d.slug, idx)}>✕</button>
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
    </div>
  </>
);
};

export default AdminPanel;
