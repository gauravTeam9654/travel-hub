import React, { useState, useEffect } from "react";
import { db } from "../../firebaseConfig";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  orderBy,
  query,
} from "firebase/firestore";

const TopMessagesManager = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const fetchMessages = async () => {
    try {
      const q = query(collection(db, "top_messages"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleAddString = async () => {
    if (!newMessage.trim()) return;
    try {
      await addDoc(collection(db, "top_messages"), {
        text: newMessage,
        isActive: true, // default active
        createdAt: serverTimestamp(),
      });
      setNewMessage("");
      fetchMessages();
    } catch (error) {
      console.error("Error adding message:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this message?")) return;
    try {
      await deleteDoc(doc(db, "top_messages", id));
      fetchMessages();
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  const toggleActive = async (msg) => {
    try {
      await updateDoc(doc(db, "top_messages", msg.id), {
        isActive: !msg.isActive,
      });
      fetchMessages();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const startEdit = (msg) => {
    setEditingId(msg.id);
    setEditText(msg.text);
  };

  const saveEdit = async () => {
    try {
      await updateDoc(doc(db, "top_messages", editingId), {
        text: editText,
      });
      setEditingId(null);
      setEditText("");
      fetchMessages();
    } catch (error) {
      console.error("Error saving edit:", error);
    }
  };

  return (
    <div className="admin-card" style={{ marginTop: 24 }}>
      <h2>Top Bar Messages</h2>
      <p style={{ fontSize: "0.9rem", color: "#666", marginBottom: 16 }}>
        Messages that will auto-swipe above the Hero section.
      </p>

      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Enter new message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          style={{ flex: 1, padding: 10 }}
        />
        <button className="btn-primary" onClick={handleAddString}>
          Add Message
        </button>
      </div>

      <div className="list">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className="list-item"
            style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}
          >
            {editingId === msg.id ? (
              <div style={{ flex: 1, display: "flex", gap: 10 }}>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  style={{ flex: 1 }}
                />
                <button className="btn-small" onClick={saveEdit}>
                  Save
                </button>
                <button className="btn-tertiary" onClick={() => setEditingId(null)}>
                  Cancel
                </button>
              </div>
            ) : (
              <>
                <div style={{ flex: 1 }}>
                  <span
                    style={{
                      display: "inline-block",
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      background: msg.isActive ? "#28a745" : "#ccc",
                      marginRight: 10,
                    }}
                    title={msg.isActive ? "Active" : "Inactive"}
                  ></span>
                  {msg.text}
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button className="btn-small" onClick={() => toggleActive(msg)}>
                    {msg.isActive ? "Disable" : "Enable"}
                  </button>
                  <button className="btn-tertiary" onClick={() => startEdit(msg)}>
                    Edit
                  </button>
                  <button className="btn-danger" onClick={() => handleDelete(msg.id)}>
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
        {messages.length === 0 && <div style={{ color: "#999" }}>No messages found.</div>}
      </div>
    </div>
  );
};

export default TopMessagesManager;
