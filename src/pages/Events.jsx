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

  useEffect(() => {
    const eventsRef = ref(db, "events");
    onValue(eventsRef, (snapshot) => {
      const data = snapshot.val();
      const eventList = data ? Object.entries(data).map(([id, val]) => ({ id, ...val })) : [];
      setEvents(eventList);
      setFilteredEvents(eventList);
    });
  }, []);

  useEffect(() => {
    const feedbackRef = ref(db, "feedback");
    onValue(feedbackRef, (snapshot) => {
      const data = snapshot.val() || {};
      const feedbackList = Object.values(data);
      
      const groupedFeedbacks = feedbackList.reduce((acc, feedback) => {
        if (!acc[feedback.eventId]) acc[feedback.eventId] = [];
        acc[feedback.eventId].push(feedback);
        return acc;
      }, {});

      setFeedbacks(groupedFeedbacks);

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

  // Function to generate a placeholder image based on event name
  const getPlaceholderImage = (name) => {
    const colors = ['#4299e1', '#48bb78', '#9f7aea', '#ed8936', '#e53e3e'];
    const color = colors[name.length % colors.length];
    return (
      <div className={styles.cardImage} style={{ backgroundColor: color }}>
        {name.charAt(0).toUpperCase()}
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Upcoming Events</h1>
        <input
          type="text"
          placeholder="Search events..."
          className={styles.searchBar}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className={styles.eventGrid}>
        {filteredEvents.map((evt) => (
          <div key={evt.id} className={styles.card} onClick={() => handleShow(evt)}>
            {getPlaceholderImage(evt.name)}
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>{evt.name}</h3>
              <p className={styles.cardDetails}>
                {evt.description.length > 100 
                  ? `${evt.description.substring(0, 100)}...` 
                  : evt.description}
              </p>
              <div className={styles.cardMeta}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 7V3M16 7V3M7 11H17M5 21H19C20.1046 21 21 20.1046 21 19V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V19C3 20.1046 3.89543 21 5 21Z" stroke="#718096" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {evt.date} | 
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: '8px' }}>
                  <path d="M12 8V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#718096" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {evt.time}
              </div>
              <div className={styles.cardMeta}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 8V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#718096" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                ${evt.ticketPrice}
              </div>
              {averageRatings[evt.id] && (
                <div className={styles.ratingBadge}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" fill="currentColor"/>
                  </svg>
                  {averageRatings[evt.id]}/5
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

   

      {showModal && (
        <div className={styles.modalOverlay} onClick={handleClose}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={handleClose}>&times;</button>
            <h2 className={styles.modalTitle}>{selectedEvent?.name}</h2>
            <p className={styles.modalDetails}>{selectedEvent?.description}</p>
            
            <div className={styles.cardMeta}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 7V3M16 7V3M7 11H17M5 21H19C20.1046 21 21 20.1046 21 19V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V19C3 20.1046 3.89543 21 5 21Z" stroke="#718096" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {selectedEvent?.date} | 
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: '8px' }}>
                <path d="M12 8V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#718096" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {selectedEvent?.time} | 
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: '8px' }}>
                <path d="M12 8V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#718096" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              ${selectedEvent?.ticketPrice}
            </div>

            <h4 className={styles.modalSectionTitle}>Event Feedback</h4>
            {feedbacks[selectedEvent?.id]?.length > 0 ? (
              <ul className={styles.feedbackList}>
                {feedbacks[selectedEvent?.id].map((fb, index) => (
                  <li key={index} className={styles.feedbackItem}>
                    <div className={styles.feedbackAuthor}>{fb.name}</div>
                    <div className={styles.feedbackText}>{fb.feedback}</div>
                    <div className={styles.feedbackRating}>
                      Rating: {Array(fb.rating).fill('⭐').join('')} ({fb.rating}/5)
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className={styles.noFeedback}>No feedback available for this event.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EventList;