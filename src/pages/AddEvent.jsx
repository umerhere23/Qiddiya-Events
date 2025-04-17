import { useState } from "react";
import { db } from "../firebase"; // Import Firestore instance
import { collection, addDoc } from "firebase/firestore";

const CreateEvent = () => {
  const [eventData, setEventData] = useState({
    name: "",
    description: "",
    date: "",
    time: "",
    venueID: "",
    ticketPrice: "",
    organizerID: "",
  });

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "events"), eventData);
      alert("Event Created Successfully!");
      setEventData({
        name: "",
        description: "",
        date: "",
        time: "",
        venueID: "",
        ticketPrice: "",
        organizerID: "",
      });
    } catch (error) {
      console.error("Error creating event:", error);
      alert("Failed to create event!");
    }
  };

  return (
    <div>
      <h1>Create Event</h1>
      <form onSubmit={handleSubmit}>
        <label>Event Name:</label>
        <input type="text" name="name" value={eventData.name} onChange={handleChange} required />

        <label>Description:</label>
        <textarea name="description" value={eventData.description} onChange={handleChange} required />

        <label>Date:</label>
        <input type="date" name="date" value={eventData.date} onChange={handleChange} required />

        <label>Time:</label>
        <input type="time" name="time" value={eventData.time} onChange={handleChange} required />

        <label>Venue ID:</label>
        <input type="text" name="venueID" value={eventData.venueID} onChange={handleChange} required />

        <label>Ticket Price:</label>
        <input type="number" name="ticketPrice" value={eventData.ticketPrice} onChange={handleChange} required />

        <label>Organizer ID:</label>
        <input type="text" name="organizerID" value={eventData.organizerID} onChange={handleChange} required />

        <button type="submit">Create Event</button>
      </form>
    </div>
  );
};

export default CreateEvent;
