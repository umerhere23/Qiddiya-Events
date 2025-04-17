import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { ref, onValue, update } from "firebase/database";
import styles from "./EditEvent.module.css";

const EditEvent = () => {
  const [events, setEvents] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState("");
  const [editedEvent, setEditedEvent] = useState({
    name: "",
    description: "",
    date: "",
    time: "",
    venueID: "",
    ticketPrice: "",
    organizerID: "",
  });

  // Fetch events from Firebase
  useEffect(() => {
    const eventsRef = ref(db, "events");
    onValue(eventsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const eventList = Object.entries(data).map(([id, eventData]) => ({
          id,
          ...eventData,
        }));
        setEvents(eventList);
      }
    });
  }, []);

  // Handle event selection
  const handleEventSelect = (eventId) => {
    const event = events.find((e) => e.id === eventId);
    if (event) {
      setSelectedEventId(eventId);
      setEditedEvent(event);
    }
  };

  // Handle input changes
  const handleInputChange = (e, field) => {
    setEditedEvent({ ...editedEvent, [field]: e.target.value });
  };

  // Save updated event details
  const handleSave = async () => {
    if (selectedEventId) {
      const eventRef = ref(db, `events/${selectedEventId}`);
      await update(eventRef, editedEvent);
      alert("Event updated successfully!");
      setSelectedEventId("");
    }
  };

  return (
    <div className={styles.container}>
      <h2>Edit Event</h2>

      {/* Event Selection */}
      <select
        className={styles.select}
        value={selectedEventId}
        onChange={(e) => handleEventSelect(e.target.value)}
      >
        <option value="">Select an Event</option>
        {events.map((event) => (
          <option key={event.id} value={event.id}>
            {event.name}
          </option>
        ))}
      </select>

      {/* Edit Form */}
      {selectedEventId && (
        <div className={styles.form}>
          <label>Event Name:</label>
          <input
            type="text"
            value={editedEvent.name}
            onChange={(e) => handleInputChange(e, "name")}
          />

          <label>Description:</label>
          <textarea
            value={editedEvent.description}
            onChange={(e) => handleInputChange(e, "description")}
          />

          <label>Date:</label>
          <input
            type="date"
            value={editedEvent.date}
            onChange={(e) => handleInputChange(e, "date")}
          />

          <label>Time:</label>
          <input
            type="time"
            value={editedEvent.time}
            onChange={(e) => handleInputChange(e, "time")}
          />

          <label>Venue ID:</label>
          <input
            type="text"
            value={editedEvent.venueID}
            onChange={(e) => handleInputChange(e, "venueID")}
          />

          <label>Ticket Price:</label>
          <input
            type="number"
            value={editedEvent.ticketPrice}
            onChange={(e) => handleInputChange(e, "ticketPrice")}
          />

          <label>Organizer ID:</label>
          <input
            type="text"
            value={editedEvent.organizerID}
            onChange={(e) => handleInputChange(e, "organizerID")}
          />

          <button className={styles.saveBtn} onClick={handleSave}>
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
};

export default EditEvent;
