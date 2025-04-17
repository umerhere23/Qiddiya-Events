import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { ref, onValue } from "firebase/database";
import { Link } from "react-router-dom";
import styles from "./EventList.module.css";

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [feedbacks, setFeedbacks] = useState({});
  const [averageRatings, setAverageRatings] = useState({});

  // Fetch events
  useEffect(() => {
    const eventsRef = ref(db, "events");
    onValue(eventsRef, (snapshot) => {
      const data = snapshot.val();
      const eventList = data ? Object.entries(data).map(([id, val]) => ({ id, ...val })) : [];
      setEvents(eventList);
      setFilteredEvents(eventList);
    });
  }, []);

  // Fetch feedback and calculate average ratings
  useEffect(() => {
    const feedbackRef = ref(db, "feedback");
    onValue(feedbackRef, (snapshot) => {
      const data = snapshot.val() || {};
      const feedbackList = Object.values(data);
      
      // Group feedback by eventId
      const groupedFeedbacks = feedbackList.reduce((acc, feedback) => {
        if (!acc[feedback.eventId]) acc[feedback.eventId] = [];
        acc[feedback.eventId].push(feedback);
        return acc;
      }, {});

      setFeedbacks(groupedFeedbacks);

      // Calculate average rating per event
      const ratings = {};
      Object.keys(groupedFeedbacks).forEach((eventId) => {
        const totalRating = groupedFeedbacks[eventId].reduce((sum, f) => sum + f.rating, 0);
        ratings[eventId] = (totalRating / groupedFeedbacks[eventId].length).toFixed(1);
      });

      setAverageRatings(ratings);
    });
  }, []);

  useEffect(() => {
    setFilteredEvents(
      events.filter((event) =>
        event.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, events]);

  const handleShow = (event) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedEvent(null);
  };

  return (
    <div className={styles.container}>
      <h2>Upcoming Events</h2>
      <input
        type="text"
        placeholder="Search events..."
        className={styles.searchBar}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className={styles.eventGrid}>
        {filteredEvents.map((evt) => (
          <div key={evt.id} className={styles.card} onClick={() => handleShow(evt)}>
            <div className={styles.cardTitle}>{evt.name}</div>
            <div className={styles.cardDetails}>
              {evt.description} <br />
              📅 {evt.date} | 🕒 {evt.time} <br />
              🎟 Ticket: ${evt.ticketPrice} <br />
              ⭐ {averageRatings[evt.id] ? `${averageRatings[evt.id]}/5` : "No ratings yet"}
            </div>
          </div>
        ))}
      </div>
      <Link to="register-event" className={styles.registerLink}>Register Event</Link>

      {/* Modal for event details */}
      {showModal && (
        <div className={styles.modalOverlay} onClick={handleClose}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={handleClose}>&times;</button>
            <h3>{selectedEvent?.name}</h3>
            <p>{selectedEvent?.description}</p>
            <p>📅 {selectedEvent?.date} | 🕒 {selectedEvent?.time}</p>
            <p>🎟 Ticket Price: ${selectedEvent?.ticketPrice}</p>
            <h4>Feedbacks:</h4>
            {feedbacks[selectedEvent?.id]?.length > 0 ? (
              <ul className={styles.feedbackList}>
                {feedbacks[selectedEvent?.id].map((fb, index) => (
                  <li key={index} className={styles.feedbackItem}>
                    <strong>{fb.name}</strong>: {fb.feedback} ⭐ {fb.rating}/5
                  </li>
                ))}
              </ul>
            ) : (
              <p>No feedback available for this event.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EventList;
