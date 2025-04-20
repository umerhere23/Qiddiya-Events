import React, { useState, useEffect } from "react";
import { db } from "../firebase.js";
import { ref, push, onValue } from "firebase/database";
import { Link } from "react-router-dom";
import styles from "./RegisterEvent.module.css";
import { FiCalendar, FiClock, FiDollarSign, FiMapPin, FiUser, FiPlus } from "react-icons/fi";

const RegisterEvent = () => {
  const [event, setEvent] = useState({
    name: "",
    description: "",
    date: "",
    time: "",
    venueID: "",
    ticketPrice: "",
    organizerID: "",
    imageUrl: ""
  });

  const [venues, setVenues] = useState([]);
  const [organizers, setOrganizers] = useState([]);
  const [newVenue, setNewVenue] = useState("");
  const [newOrganizer, setNewOrganizer] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

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
  

  const handleChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await push(ref(db, "events"), event);
      setEvent({
        name: "",
        description: "",
        date: "",
        time: "",
        venueID: "",
        ticketPrice: "",
        organizerID: "",
        imageUrl: ""
      });
      setSuccessMessage("Event registered successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Error registering event:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const addNewVenue = () => {
    if (newVenue.trim()) {
      const newVenueRef = push(ref(db, "venues"), { name: newVenue });
      setEvent({ ...event, venueID: newVenueRef.key });
      setNewVenue("");
    }
  };

  const addNewOrganizer = () => {
    if (newOrganizer.trim()) {
      const newOrganizerRef = push(ref(db, "organizers"), { name: newOrganizer });
      setEvent({ ...event, organizerID: newOrganizerRef.key });
      setNewOrganizer("");
    }
  };

  return (
    <div className={styles.registerPage}>
      <div className={styles.registerContainer}>
        <div className={styles.header}>
          <h1>Create Your Event</h1>
          <p>Fill out the form below to register your event with Qiddiya</p>
        </div>

        <div className={styles.formContainer}>
          <form onSubmit={handleSubmit} className={styles.eventForm}>
            <div className={styles.formSection}>
              <h2>Event Details</h2>
              <div className={styles.formGroup}>
                <label>Event Name</label>
                <div className={styles.inputWithIcon}>
                  <FiUser className={styles.icon} />
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter event name"
                    value={event.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>Description</label>
                <textarea
                  name="description"
                  placeholder="Tell us about your event"
                  value={event.description}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label>Image URL</label>
                <input
                  type="url"
                  name="imageUrl"
                  placeholder="Paste your event image URL"
                  value={event.imageUrl}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className={styles.formSection}>
              <h2>Date & Time</h2>
              <div className={styles.dateTimeGroup}>
                <div className={styles.formGroup}>
                  <label>Date</label>
                  <div className={styles.inputWithIcon}>
                    <FiCalendar className={styles.icon} />
                    <input
                      type="date"
                      name="date"
                      value={event.date}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label>Time</label>
                  <div className={styles.inputWithIcon}>
                    <FiClock className={styles.icon} />
                    <input
                      type="time"
                      name="time"
                      value={event.time}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.formSection}>
              <h2>Ticket Information</h2>
              <div className={styles.formGroup}>
                <label>Ticket Price (SAR)</label>
                <div className={styles.inputWithIcon}>
                  <FiDollarSign className={styles.icon} />
                  <input
                    type="number"
                    name="ticketPrice"
                    placeholder="Enter ticket price"
                    value={event.ticketPrice}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
              </div>
            </div>

            <div className={styles.formSection}>
              <h2>Location & Organizer</h2>
              <div className={styles.formGroup}>
                <label>Venue</label>
                <div className={styles.inputWithIcon}>
                  <FiMapPin className={styles.icon} />
                  <select
                    name="venueID"
                    value={event.venueID}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a venue</option>
                    {venues.map((venue) => (
                      <option key={venue.id} value={venue.id}>
                        {venue.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className={styles.addNewField}>
                  <input
                    type="text"
                    placeholder="New venue name"
                    value={newVenue}
                    onChange={(e) => setNewVenue(e.target.value)}
                  />
                  <button type="button" onClick={addNewVenue} className={styles.addButton}>
                    <FiPlus /> Add
                  </button>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>Organizer</label>
                <div className={styles.inputWithIcon}>
                  <FiUser className={styles.icon} />
                  <select
                    name="organizerID"
                    value={event.organizerID}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select an organizer</option>
                    {organizers.map((organizer) => (
                      <option key={organizer.id} value={organizer.id}>
                        {organizer.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className={styles.addNewField}>
                  <input
                    type="text"
                    placeholder="New organizer name"
                    value={newOrganizer}
                    onChange={(e) => setNewOrganizer(e.target.value)}
                  />
                  <button type="button" onClick={addNewOrganizer} className={styles.addButton}>
                    <FiPlus /> Add
                  </button>
                </div>
              </div>
            </div>

            {successMessage && (
              <div className={styles.successMessage}>
                {successMessage}
              </div>
            )}

            <div className={styles.formActions}>
              <button
                type="submit"
                className={styles.submitButton}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Registering...' : 'Register Event'}
              </button>
              <Link to="/events" className={styles.viewEventsLink}>
                View All Events
              </Link>
            </div>
          </form>

          <div className={styles.formIllustration}>
            <img src="/event-registration.svg" alt="Event registration" />
            <div className={styles.tips}>
              <h3>Quick Tips</h3>
              <ul>
                <li>Provide a clear, descriptive event name</li>
                <li>Upload high-quality images for better promotion</li>
                <li>Set ticket prices competitively</li>
                <li>Double-check date and time accuracy</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterEvent;