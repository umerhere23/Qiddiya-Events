import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { ref, onValue, update, remove, push } from "firebase/database";
import styles from "./ManageOrganizers.module.css";

const ManageOrganizers = () => {
  const [organizers, setOrganizers] = useState([]);
  const [editingOrganizerId, setEditingOrganizerId] = useState(null);
  const [editedOrganizer, setEditedOrganizer] = useState({});
  const [newOrganizer, setNewOrganizer] = useState({ name: "", email: "", role: "organizer" });

  // Fetch organizers from Firebase
  useEffect(() => {
    const organizersRef = ref(db, "organizers");
    onValue(organizersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const organizerList = Object.entries(data).map(([id, organizerData]) => ({
          id,
          ...organizerData,
        }));
        setOrganizers(organizerList);
      }
    });
  }, []);

  // Handle input change for editing
  const handleInputChange = (e, field) => {
    setEditedOrganizer({ ...editedOrganizer, [field]: e.target.value });
  };

  // Enable editing mode
  const handleEdit = (organizer) => {
    setEditingOrganizerId(organizer.id);
    setEditedOrganizer(organizer);
  };

  // Save updated details
  const handleSave = async () => {
    if (editingOrganizerId) {
      const organizerRef = ref(db, `organizers/${editingOrganizerId}`);
      await update(organizerRef, editedOrganizer);
      setEditingOrganizerId(null);
      alert("Organizer updated successfully!");
    }
  };

  // Delete organizer
  const handleDelete = async (organizerId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this organizer?");
    if (confirmDelete) {
      await remove(ref(db, `organizers/${organizerId}`));
      setOrganizers(organizers.filter((organizer) => organizer.id !== organizerId));
    }
  };

  // Handle new organizer input change
  const handleNewOrganizerChange = (e, field) => {
    setNewOrganizer({ ...newOrganizer, [field]: e.target.value });
  };

  // Add new organizer
  const handleAddOrganizer = async () => {
    if (newOrganizer.name && newOrganizer.email) {
      const organizersRef = ref(db, "organizers");
      const newOrganizerRef = push(organizersRef);
      await update(newOrganizerRef, newOrganizer);
      setNewOrganizer({ name: "", email: "", role: "organizer" });
      alert("Organizer added successfully!");
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <div className={styles.container}>
      <h2>Manage Organizers</h2>

      {/* Add Organizer Form */}
      <div className={styles.addForm}>
        <h3>Add New Organizer</h3>
        <input
          type="text"
          placeholder="Name"
          value={newOrganizer.name}
          onChange={(e) => handleNewOrganizerChange(e, "name")}
        />
        <input
          type="email"
          placeholder="Email"
          value={newOrganizer.email}
          onChange={(e) => handleNewOrganizerChange(e, "email")}
        />
        <select value={newOrganizer.role} onChange={(e) => handleNewOrganizerChange(e, "role")}>
          <option value="organizer">Organizer</option>
          <option value="admin">Admin</option>
        </select>
        <button className={styles.addBtn} onClick={handleAddOrganizer}>
          Add Organizer
        </button>
      </div>

      {/* Organizer List */}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {organizers.map((organizer) => (
            <tr key={organizer.id}>
              <td>
                {editingOrganizerId === organizer.id ? (
                  <input
                    type="text"
                    value={editedOrganizer.name || ""}
                    onChange={(e) => handleInputChange(e, "name")}
                  />
                ) : (
                  organizer.name
                )}
              </td>
              <td>{organizer.email}</td>
              <td>
                {editingOrganizerId === organizer.id ? (
                  <select
                    value={editedOrganizer.role || "organizer"}
                    onChange={(e) => handleInputChange(e, "role")}
                  >
                    <option value="organizer">Organizer</option>
                    <option value="admin">Admin</option>
                  </select>
                ) : (
                  organizer.role
                )}
              </td>
              <td>
                {editingOrganizerId === organizer.id ? (
                  <button className={styles.saveBtn} onClick={handleSave}>Save</button>
                ) : (
                  <button className={styles.editBtn} onClick={() => handleEdit(organizer)}>Edit</button>
                )}
                <button className={styles.deleteBtn} onClick={() => handleDelete(organizer.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageOrganizers;
