import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { ref, onValue, remove } from "firebase/database";
import styles from "./DeleteEvent.module.css";

const DeleteEvent = () => {
  const [events, setEvents] = useState([]);

  // Fetch all events from Firebase
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

  // Handle event deletion
  const handleDelete = async (eventId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this event?");
    if (confirmDelete) {
      await remove(ref(db, `events/${eventId}`));
      setEvents(events.filter(event => event.id !== eventId)); // Update state
    }
  };

  return (
    <div className={styles.container}>
      <h2>Manage Events</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Time</th>
            <th>Venue ID</th>
            <th>Ticket Price</th>
            <th>Organizer ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.id}>
              <td>{event.name}</td>
              <td>{event.date}</td>
              <td>{event.time}</td>
              <td>{event.venueID}</td>
              <td>${event.ticketPrice}</td>
              <td>{event.organizerID}</td>
              <td>
                <button className={styles.deleteBtn} onClick={() => handleDelete(event.id)}>
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

export default DeleteEvent;
