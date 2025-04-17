import React, { useState, useEffect } from "react";
import { db } from "../firebase.js";
import { ref, push, onValue } from "firebase/database";
import { Link } from "react-router-dom";
import styles from "./RegisterEvent.module.css";

const RegisterEvent = () => {
  const [event, setEvent] = useState({
    name: "",
    description: "",
    date: "",
    time: "",
    venueID: "",
    ticketPrice: "",
    organizerID: "",
  });

  const [venues, setVenues] = useState([]);
  const [organizers, setOrganizers] = useState([]);
  const [newVenue, setNewVenue] = useState("");
  const [newOrganizer, setNewOrganizer] = useState("");

  // Fetch venues and organizers
  useEffect(() => {
    const venuesRef = ref(db, "venues");
    const organizersRef = ref(db, "organizers");

    onValue(venuesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setVenues(Object.entries(data).map(([id, venue]) => ({ id, ...venue })));
      }
    });

    onValue(organizersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setOrganizers(Object.entries(data).map(([id, organizer]) => ({ id, ...organizer })));
      }
    });
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  // Handle event submission
  const handleSubmit = (e) => {
    e.preventDefault();
    push(ref(db, "events"), event);
    setEvent({
      name: "",
      description: "",
      date: "",
      time: "",
      venueID: "",
      ticketPrice: "",
      organizerID: "",
    });
  };

  // Add new venue
  const addNewVenue = () => {
    if (newVenue.trim()) {
      const newVenueRef = push(ref(db, "venues"), { name: newVenue });
      setEvent({ ...event, venueID: newVenueRef.key });
      setNewVenue("");
    }
  };

  // Add new organizer
  const addNewOrganizer = () => {
    if (newOrganizer.trim()) {
      const newOrganizerRef = push(ref(db, "organizers"), { name: newOrganizer });
      setEvent({ ...event, organizerID: newOrganizerRef.key });
      setNewOrganizer("");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.left}>
          <div className={styles.overlay}></div>
          <div className={styles.text}>
            <h3>Bring Your Music Along</h3>
            <p>Try Unlimited</p>
            <strong>$9.99 / Month</strong>
          </div>
        </div>
        <div className={styles.right}>
          <h2>Register Event</h2>
          <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Event Name" value={event.name} onChange={handleChange} required />
            <textarea name="description" placeholder="Description" value={event.description} onChange={handleChange} required />
            <input type="date" name="date" value={event.date} onChange={handleChange} required />
            <input type="time" name="time" value={event.time} onChange={handleChange} required />
            <input type="number" name="ticketPrice" placeholder="Ticket Price" value={event.ticketPrice} onChange={handleChange} required />

            {/* Venue Selection */}
            <label>Venue:</label>
            <select name="venueID" value={event.venueID} onChange={handleChange} required>
              <option value="">Select a Venue</option>
              {venues.map((venue) => (
                <option key={venue.id} value={venue.id}>
                  {venue.name}
                </option>
              ))}
            </select>

            <input
              type="text"
              placeholder="New Venue Name"
              value={newVenue}
              onChange={(e) => setNewVenue(e.target.value)}
            />
            <button type="button" onClick={addNewVenue}>
              Add Venue
            </button>

            {/* Organizer Selection */}
            <label>Organizer:</label>
            <select name="organizerID" value={event.organizerID} onChange={handleChange} required>
              <option value="">Select an Organizer</option>
              {organizers.map((organizer) => (
                <option key={organizer.id} value={organizer.id}>
                  {organizer.name}
                </option>
              ))}
            </select>

            <input
              type="text"
              placeholder="New Organizer Name"
              value={newOrganizer}
              onChange={(e) => setNewOrganizer(e.target.value)}
            />
            <button type="button" onClick={addNewOrganizer}>
              Add Organizer
            </button>

            <button type="submit">Register Event</button>
          </form>
          <Link to="/events" className={styles.link}>
            View Events
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterEvent;
