import React, { useEffect, useState } from "react";
import { db } from "../firebase"; 
import { ref, onValue } from "firebase/database";
import styles from "./GenerateReports.module.css";

const GenerateReports = () => {
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);

  // Fetch Users
  useEffect(() => {
    const usersRef = ref(db, "users");
    onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const userList = Object.entries(data).map(([id, userData]) => ({
          id,
          ...userData,
        }));
        setUsers(userList);
      }
    });
  }, []);

  // Fetch Events
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

  // Fetch Feedbacks
  useEffect(() => {
    const feedbackRef = ref(db, "feedback");
    onValue(feedbackRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const feedbackList = Object.entries(data).map(([id, feedbackData]) => ({
          id,
          ...feedbackData,
        }));
        setFeedbacks(feedbackList);
      }
    });
  }, []);

  return (
    <div className={styles.container}>
      <h2>Generate Reports</h2>

      {/* User Reports */}
      <div className={styles.section}>
        <h3>User Reports</h3>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Event Reports */}
      <div className={styles.section}>
        <h3>Event Reports</h3>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Event Name</th>
              <th>Date</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id}>
                <td>{event.name}</td>
                <td>{event.date}</td>
                <td>{event.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Feedback Reports */}
      <div className={styles.section}>
        <h3>Feedback Reports</h3>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>User Email</th>
              <th>Event ID</th>
              <th>Feedback</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map((feedback) => (
              <tr key={feedback.id}>
                <td>{feedback.email}</td>
                <td>{feedback.eventId}</td>
                <td>{feedback.feedback}</td>
                <td>{feedback.rating}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GenerateReports;
