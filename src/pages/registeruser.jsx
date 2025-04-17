import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase"; // Importing auth & db correctly
import { ref, set } from "firebase/database"; // Importing Firebase database functions

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [profileData, setProfileData] = useState("");
  const [role, setRole] = useState("visitor"); // Default role
  const [isActive, setIsActive] = useState(true); // Default active status
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Register user with Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Store additional user data in Firebase Database
      await set(ref(db, `users/${user.uid}`), {
        username,
        email,
        profileData,
        role,
        isActive,
      });

      alert("Registration successful");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleRegister}>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <input type="text" placeholder="Profile Data" value={profileData} onChange={(e) => setProfileData(e.target.value)} />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="visitor">Visitor</option>
          <option value="organizer">Organizer</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
