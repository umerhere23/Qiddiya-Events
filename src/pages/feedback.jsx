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
      setMessage("All fields are required!");
      return;
    }

    if (submittedFeedbacks[selectedEvent]) {
      setMessage("You have already submitted feedback for this event.");
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
    setMessage("Feedback submitted successfully!");
  };

  return (
    <div className={styles.container}>
      <h2>Submit Your Feedback</h2>
      {message && <p className={styles.message}>{message}</p>}
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={styles.input}
          required
        />
        <input
          type="email"
          placeholder="Your Email"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          className={styles.input}
          required
        />
        <select
          value={selectedEvent}
          onChange={(e) => setSelectedEvent(e.target.value)}
          className={styles.select}
        >
          <option value="">Select an Event</option>
          {events.map((event) => (
            <option key={event.id} value={event.id}>{event.name}</option>
          ))}
        </select>
        <textarea
          placeholder="Your Feedback"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          className={styles.textarea}
        ></textarea>
        <div className={styles.starRating}>
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={star <= rating ? styles.filledStar : styles.emptyStar}
              onClick={() => setRating(star)}
            >
              ★
            </span>
          ))}
        </div>
        <button type="submit" className={styles.submitButton}>Submit Feedback</button>
      </form>
    </div>
  );
};

export default SubmitFeedback;
