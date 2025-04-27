import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { ref, push, onValue } from "firebase/database";
import styles from "./SubmitFeedback.module.css";

const SubmitFeedback = () => {
  const [userEmail, setUserEmail] = useState("");
  const [name, setName] = useState("");
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState("");
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");
  const [submittedFeedbacks, setSubmittedFeedbacks] = useState({});
  const [hoverRating, setHoverRating] = useState(0);

  useEffect(() => {
    const eventsRef = ref(db, "events");
    onValue(eventsRef, (snapshot) => {
      const data = snapshot.val();
      const eventList = data ? Object.entries(data).map(([id, val]) => ({ id, ...val })) : [];
      setEvents(eventList);
    });
  }, []);

  useEffect(() => {
    if (userEmail) {
      const feedbackRef = ref(db, "feedback");
      onValue(feedbackRef, (snapshot) => {
        const data = snapshot.val() || {};
        const userFeedbacks = Object.values(data).reduce((acc, feedback) => {
          if (feedback.email === userEmail) {
            acc[feedback.eventId] = true;
          }
          return acc;
        }, {});
        setSubmittedFeedbacks(userFeedbacks);
      });
    }
  }, [userEmail]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userEmail || !name || !selectedEvent || !feedback || rating === 0) {
      setMessage({ text: "All fields are required!", type: "error" });
      return;
    }

    if (submittedFeedbacks[selectedEvent]) {
      setMessage({ text: "You have already submitted feedback for this event.", type: "error" });
      return;
    }

    const feedbackRef = ref(db, "feedback");
    push(feedbackRef, {
      eventId: selectedEvent,
      email: userEmail,
      name,
      feedback,
      rating,
      timestamp: new Date().toISOString(),
    });

    setFeedback("");
    setRating(0);
    setMessage({ text: "Feedback submitted successfully!", type: "success" });
  };

  return (
    <div className={styles.container}>
      <div className={styles.backgroundOverlay}></div>
      <div className={styles.content}>
        <div className={styles.card}>
          <h2 className={styles.title}>Share Your Experience</h2>
          <p className={styles.subtitle}>We value your feedback to improve our events</p>
          
          {message && (
            <div className={`${styles.message} ${styles[message.type]}`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.label}>Your Name</label>
              <input
                type="text"
                id="name"
                placeholder="Alsahar"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={styles.input}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>Email Address</label>
              <input
                type="email"
                id="email"
                placeholder="your@email.com"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                className={styles.input}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="event" className={styles.label}>Select Event</label>
              <select
                id="event"
                value={selectedEvent}
                onChange={(e) => setSelectedEvent(e.target.value)}
                className={styles.select}
                required
              >
                <option value="">Choose an event...</option>
                {events.map((event) => (
                  <option key={event.id} value={event.id}>{event.name}</option>
                ))}
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="feedback" className={styles.label}>Your Feedback</label>
              <textarea
                id="feedback"
                placeholder="Share your thoughts about the event..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className={styles.textarea}
                rows="4"
                required
              ></textarea>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Rating</label>
              <div className={styles.starRating}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`${styles.star} ${
                      star <= (hoverRating || rating) ? styles.filled : styles.empty
                    }`}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                  >
                    ★
                  </span>
                ))}
                <span className={styles.ratingText}>
                  {rating ? `${rating} star${rating !== 1 ? 's' : ''}` : "Select rating"}
                </span>
              </div>
            </div>

            <button type="submit" className={styles.submitButton}>
              Submit Feedback
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SubmitFeedback;