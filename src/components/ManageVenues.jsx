import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { ref, onValue, update, remove, push } from "firebase/database";
import styles from "./ManageVenues.module.css";

const ManageVenues = () => {
  const [venues, setVenues] = useState([]);
  const [editingVenueId, setEditingVenueId] = useState(null);
  const [editedVenue, setEditedVenue] = useState({});
  const [newVenue, setNewVenue] = useState({ name: "", location: "", capacity: "" });

  // Fetch venues from Firebase
  useEffect(() => {
    const venuesRef = ref(db, "venues");
    onValue(venuesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const venueList = Object.entries(data).map(([id, venueData]) => ({
          id,
          ...venueData,
        }));
        setVenues(venueList);
      }
    });
  }, []);

  // Handle input change for editing
  const handleInputChange = (e, field) => {
    setEditedVenue({ ...editedVenue, [field]: e.target.value });
  };

  // Enable editing mode
  const handleEdit = (venue) => {
    setEditingVenueId(venue.id);
    setEditedVenue(venue);
  };

  // Save updated details
  const handleSave = async () => {
    if (editingVenueId) {
      const venueRef = ref(db, `venues/${editingVenueId}`);
      await update(venueRef, editedVenue);
      setEditingVenueId(null);
      alert("Venue updated successfully!");
    }
  };

  // Delete venue
  const handleDelete = async (venueId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this venue?");
    if (confirmDelete) {
      await remove(ref(db, `venues/${venueId}`));
      setVenues(venues.filter((venue) => venue.id !== venueId));
    }
  };

  // Handle new venue input change
  const handleNewVenueChange = (e, field) => {
    setNewVenue({ ...newVenue, [field]: e.target.value });
  };

  // Add new venue
  const handleAddVenue = async () => {
    if (newVenue.name && newVenue.location && newVenue.capacity) {
      const venuesRef = ref(db, "venues");
      const newVenueRef = push(venuesRef);
      await update(newVenueRef, newVenue);
      setNewVenue({ name: "", location: "", capacity: "" });
      alert("Venue added successfully!");
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <div className={styles.container}>
      <h2>Manage Venues</h2>

      {/* Add Venue Form */}
      <div className={styles.addForm}>
        <h3>Add New Venue</h3>
        <input
          type="text"
          placeholder="Venue Name"
          value={newVenue.name}
          onChange={(e) => handleNewVenueChange(e, "name")}
        />
        <input
          type="text"
          placeholder="Location"
          value={newVenue.location}
          onChange={(e) => handleNewVenueChange(e, "location")}
        />
        <input
          type="number"
          placeholder="Capacity"
          value={newVenue.capacity}
          onChange={(e) => handleNewVenueChange(e, "capacity")}
        />
        <button className={styles.addBtn} onClick={handleAddVenue}>
          Add Venue
        </button>
      </div>

      {/* Venue List */}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Capacity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {venues.map((venue) => (
            <tr key={venue.id}>
              <td>
                {editingVenueId === venue.id ? (
                  <input
                    type="text"
                    value={editedVenue.name || ""}
                    onChange={(e) => handleInputChange(e, "name")}
                  />
                ) : (
                  venue.name
                )}
              </td>
              <td>
                {editingVenueId === venue.id ? (
                  <input
                    type="text"
                    value={editedVenue.location || ""}
                    onChange={(e) => handleInputChange(e, "location")}
                  />
                ) : (
                  venue.location
                )}
              </td>
              <td>
                {editingVenueId === venue.id ? (
                  <input
                    type="number"
                    value={editedVenue.capacity || ""}
                    onChange={(e) => handleInputChange(e, "capacity")}
                  />
                ) : (
                  venue.capacity
                )}
              </td>
              <td>
                {editingVenueId === venue.id ? (
                  <button className={styles.saveBtn} onClick={handleSave}>
                    Save
                  </button>
                ) : (
                  <button className={styles.editBtn} onClick={() => handleEdit(venue)}>
                    Edit
                  </button>
                )}
                <button className={styles.deleteBtn} onClick={() => handleDelete(venue.id)}>
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

export default ManageVenues;
