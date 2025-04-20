import React, { useState, useEffect } from "react";
import { db } from "../firebase.js";
import { ref, push, onValue } from "firebase/database";
import { Link } from "react-router-dom";
import styles from "./RegisterEvent.module.css";
import { FiCalendar, FiClock, FiDollarSign, FiMapPin, FiUser, FiPlus, FiImage } from "react-icons/fi";
import { FaRegCheckCircle } from "react-icons/fa";

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
      <div className={styles.gradientBackground}></div>
      
      <div className={styles.registerContainer}>
        <div className={styles.header}>
          <h1>Create Your Event</h1>
          <p>Bring your vision to life at Qiddiya - Saudi Arabia's premier entertainment destination</p>
        </div>

        <div className={styles.formWrapper}>
          <form onSubmit={handleSubmit} className={styles.eventForm}>
            <div className={styles.formSection}>
              <div className={styles.sectionHeader}>
                <div className={styles.sectionIcon}></div>
                <h2>Event Details</h2>
              </div>
              
              <div className={styles.formGroup}>
                <label>
                  <FiUser className={styles.labelIcon} />
                  Event Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="e.g. Summer Music Festival 2023"
                  value={event.name}
                  onChange={handleChange}
                  required
                  className={styles.inputField}
                />
              </div>

              <div className={styles.formGroup}>
                <label>
                  <FiUser className={styles.labelIcon} />
                  Description
                </label>
                <textarea
                  name="description"
                  placeholder="Describe your event in detail..."
                  value={event.description}
                  onChange={handleChange}
                  required
                  className={styles.textareaField}
                />
              </div>

              <div className={styles.formGroup}>
                <label>
                  <FiImage className={styles.labelIcon} />
                  Event Image URL
                </label>
                <input
                  type="url"
                  name="imageUrl"
                  placeholder="https://example.com/event-image.jpg"
                  value={event.imageUrl}
                  onChange={handleChange}
                  className={styles.inputField}
                />
              </div>
            </div>

            <div className={styles.formSection}>
              <div className={styles.sectionHeader}>
                <div className={styles.sectionIcon}></div>
                <h2>Date & Time</h2>
              </div>
              
              <div className={styles.dateTimeRow}>
                <div className={styles.formGroup}>
                  <label>
                    <FiCalendar className={styles.labelIcon} />
                    Event Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={event.date}
                    onChange={handleChange}
                    required
                    className={styles.inputField}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>
                    <FiClock className={styles.labelIcon} />
                    Start Time
                  </label>
                  <input
                    type="time"
                    name="time"
                    value={event.time}
                    onChange={handleChange}
                    required
                    className={styles.inputField}
                  />
                </div>
              </div>
            </div>

            <div className={styles.formSection}>
              <div className={styles.sectionHeader}>
                <div className={styles.sectionIcon}></div>
                <h2>Ticket Information</h2>
              </div>
              
              <div className={styles.formGroup}>
                <label>
                  <FiDollarSign className={styles.labelIcon} />
                  Ticket Price (SAR)
                </label>
                <div className={styles.priceInputContainer}>
                  <input
                    type="number"
                    name="ticketPrice"
                    placeholder="0.00"
                    value={event.ticketPrice}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    required
                    className={styles.inputField}
                  />
                  <span className={styles.currency}>SAR</span>
                </div>
              </div>
            </div>

            <div className={styles.formSection}>
              <div className={styles.sectionHeader}>
                <div className={styles.sectionIcon}></div>
                <h2>Location & Organizer</h2>
              </div>
              
              <div className={styles.formGroup}>
                <label>
                  <FiMapPin className={styles.labelIcon} />
                  Venue
                </label>
                <div className={styles.selectContainer}>
                  <select
                    name="venueID"
                    value={event.venueID}
                    onChange={handleChange}
                    required
                    className={styles.selectField}
                  >
                    <option value="">Select a venue</option>
                    {venues.map((venue) => (
                      <option key={venue.id} value={venue.id}>
                        {venue.name}
                      </option>
                    ))}
                  </select>
                  <div className={styles.selectArrow}></div>
                </div>
                
                <div className={styles.addNewContainer}>
                  <input
                    type="text"
                    placeholder="Add new venue"
                    value={newVenue}
                    onChange={(e) => setNewVenue(e.target.value)}
                    className={styles.addNewInput}
                  />
                  <button 
                    type="button" 
                    onClick={addNewVenue} 
                    className={styles.addNewButton}
                    disabled={!newVenue.trim()}
                  >
                    <FiPlus /> Add
                  </button>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>
                  <FiUser className={styles.labelIcon} />
                  Organizer
                </label>
                <div className={styles.selectContainer}>
                  <select
                    name="organizerID"
                    value={event.organizerID}
                    onChange={handleChange}
                    required
                    className={styles.selectField}
                  >
                    <option value="">Select an organizer</option>
                    {organizers.map((organizer) => (
                      <option key={organizer.id} value={organizer.id}>
                        {organizer.name}
                      </option>
                    ))}
                  </select>
                  <div className={styles.selectArrow}></div>
                </div>
                
                <div className={styles.addNewContainer}>
                  <input
                    type="text"
                    placeholder="Add new organizer"
                    value={newOrganizer}
                    onChange={(e) => setNewOrganizer(e.target.value)}
                    className={styles.addNewInput}
                  />
                  <button 
                    type="button" 
                    onClick={addNewOrganizer} 
                    className={styles.addNewButton}
                    disabled={!newOrganizer.trim()}
                  >
                    <FiPlus /> Add
                  </button>
                </div>
              </div>
            </div>

            {successMessage && (
              <div className={styles.successMessage}>
                <FaRegCheckCircle className={styles.successIcon} />
                {successMessage}
              </div>
            )}

            <div className={styles.formActions}>
              <button
                type="submit"
                className={styles.submitButton}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className={styles.spinner}></span>
                ) : (
                  "Register Event"
                )}
              </button>
              <Link to="/events" className={styles.viewEventsLink}>
                Browse Existing Events
              </Link>
            </div>
          </form>

          <div className={styles.sidePanel}>
            <div className={styles.previewCard}>
              <h3>Event Preview</h3>
              {event.imageUrl ? (
                <div 
                  className={styles.previewImage}
                  style={{ backgroundImage: `url(${event.imageUrl})` }}
                ></div>
              ) : (
                <div className={styles.previewPlaceholder}>
                  <FiImage className={styles.placeholderIcon} />
                  <p>Image preview will appear here</p>
                </div>
              )}
              <div className={styles.previewDetails}>
                <h4>{event.name || "Your Event Name"}</h4>
                <p className={styles.previewDate}>
                  {event.date ? new Date(event.date).toLocaleDateString() : "Date not set"} • {event.time || "Time not set"}
                </p>
                <p className={styles.previewPrice}>
                  {event.ticketPrice ? `SAR ${parseFloat(event.ticketPrice).toFixed(2)}` : "Price not set"}
                </p>
              </div>
            </div>

            <div className={styles.tipsSection}>
              <h3>Event Creation Tips</h3>
              <ul className={styles.tipsList}>
                <li>
                  <div className={styles.tipBullet}></div>
                  <span>Use high-quality images (min. 1200×800px)</span>
                </li>
                <li>
                  <div className={styles.tipBullet}></div>
                  <span>Detailed descriptions get 30% more engagement</span>
                </li>
                <li>
                  <div className={styles.tipBullet}></div>
                  <span>Early bird pricing boosts ticket sales</span>
                </li>
                <li>
                  <div className={styles.tipBullet}></div>
                  <span>Weekend events typically perform better</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterEvent;