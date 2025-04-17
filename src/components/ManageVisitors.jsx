import React, { useEffect, useState } from "react";
import { db } from "../firebase"; 
import { ref, onValue, update, remove } from "firebase/database";
import styles from "./ManageVisitors.module.css"; // Add CSS for table styling

const ManageVisitors = () => {
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editedUser, setEditedUser] = useState({});

  // Fetch users from Firebase
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

  // Handle input change for editing
  const handleInputChange = (e, field) => {
    setEditedUser({ ...editedUser, [field]: e.target.value });
  };

  // Enable editing mode
  const handleEdit = (user) => {
    setEditingUserId(user.id);
    setEditedUser(user);
  };

  // Save updated details
  const handleSave = async () => {
    if (editingUserId) {
      const userRef = ref(db, `users/${editingUserId}`);
      await update(userRef, editedUser);
      setEditingUserId(null);
    }
  };

  // Delete user
  const handleDelete = async (userId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (confirmDelete) {
      await remove(ref(db, `users/${userId}`));
      setUsers(users.filter(user => user.id !== userId));
    }
  };

  return (
    <div className={styles.container}>
      <h2>Manage Visitors</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                {editingUserId === user.id ? (
                  <input
                    type="text"
                    value={editedUser.name || ""}
                    onChange={(e) => handleInputChange(e, "name")}
                  />
                ) : (
                  user.name
                )}
              </td>
              <td>{user.email}</td>
              <td>
                {editingUserId === user.id ? (
                  <select
                    value={editedUser.role || "user"}
                    onChange={(e) => handleInputChange(e, "role")}
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                ) : (
                  user.role
                )}
              </td>
              <td>
                {editingUserId === user.id ? (
                  <button onClick={handleSave}>Save</button>
                ) : (
                  <button onClick={() => handleEdit(user)}>Edit</button>
                )}
                <button className={styles.deleteBtn} onClick={() => handleDelete(user.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageVisitors;
