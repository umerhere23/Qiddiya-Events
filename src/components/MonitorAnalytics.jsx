import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { ref, onValue } from "firebase/database";
import {
  BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend
} from "recharts";
import styles from "./MonitorAnalytics.module.css";

const MonitorAnalytics = () => {
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);
  const [venues, setVenues] = useState([]);
  const [organizers, setOrganizers] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    onValue(ref(db, "users"), (snapshot) => {
      setUsers(snapshot.val() ? Object.values(snapshot.val()) : []);
    });

    onValue(ref(db, "events"), (snapshot) => {
      setEvents(snapshot.val() ? Object.values(snapshot.val()) : []);
    });

    onValue(ref(db, "venues"), (snapshot) => {
      setVenues(snapshot.val() ? Object.values(snapshot.val()) : []);
    });

    onValue(ref(db, "organizers"), (snapshot) => {
      setOrganizers(snapshot.val() ? Object.values(snapshot.val()) : []);
    });

    onValue(ref(db, "feedback"), (snapshot) => {
      setFeedbacks(snapshot.val() ? Object.values(snapshot.val()) : []);
    });
  }, []);

  // User Role Distribution
  const userRoles = [
    { name: "Admins", value: users.filter((u) => u.role === "admin").length },
    { name: "Users", value: users.filter((u) => u.role === "user").length },
  ];

  // Event Type Distribution
  const eventTypes = [...new Set(events.map(event => event.type))].map(type => ({
    name: type,
    value: events.filter(event => event.type === type).length
  }));

  // Venue Usage (Assuming events are held in venues)
  const venueUsage = venues.map((venue) => ({
    name: venue.name,
    value: events.filter(event => event.venueID === venue.id).length,
  }));

  // Feedback Ratings Distribution
  const feedbackRatings = [1, 2, 3, 4, 5].map((rating) => ({
    name: `Rating ${rating}`,
    value: feedbacks.filter((f) => f.rating === rating).length,
  }));

  return (
    <div className={styles.container}>
      <h2>Analytics Dashboard 📊</h2>

      <div className={styles.grid}>
        {/* User Roles */}
        <div className={styles.chart}>
          <h3>User Roles</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={userRoles}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#007bff" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Event Types */}
        <div className={styles.chart}>
          <h3>Event Types</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={eventTypes}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#82ca9d"
                label
              />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Venue Usage */}
        <div className={styles.chart}>
          <h3>Venue Usage</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={venueUsage}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Feedback Ratings */}
        <div className={styles.chart}>
          <h3>Feedback Ratings</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={feedbackRatings}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#ff4d4d"
                label
              />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Organizer Count */}
        <div className={styles.chart}>
          <h3>Organizers Count</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={[{ name: "Organizers", value: organizers.length }]}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#28a745" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default MonitorAnalytics;
