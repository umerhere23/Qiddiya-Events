import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { ref, onValue, update, remove } from "firebase/database";
import styles from "./ManageVisitors.module.css";

const ManageVisitors = () => {
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editedUser, setEditedUser] = useState({});

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

  const handleInputChange = (e, field) => {
    setEditedUser({ ...editedUser, [field]: e.target.value });
  };

  const handleEdit = (user) => {
    setEditingUserId(user.id);
    setEditedUser(user);
  };

  const handleSave = async () => {
    if (editingUserId) {
      const userRef = ref(db, `users/${editingUserId}`);
      await update(userRef, editedUser);
      setEditingUserId(null);
    }
  };

  const handleDelete = async (userId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (confirmDelete) {
      await remove(ref(db, `users/${userId}`));
      setUsers(users.filter(user => user.id !== userId));
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Manage Visitors</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}>Name</th>
            <th className={styles.th}>Email</th>
            <th className={styles.th}>Role</th>
            <th className={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className={styles.tr}>
              <td className={styles.td}>
                {editingUserId === user.id ? (
                  <input
                    type="text"
                    value={editedUser.name || ""}
                    onChange={(e) => handleInputChange(e, "name")}
                    className={styles.input}
                  />
                ) : (
                  user.name
                )}
              </td>
              <td className={styles.td}>{user.email}</td>
              <td className={styles.td}>
                {editingUserId === user.id ? (
                  <select
                    value={editedUser.role || "user"}
                    onChange={(e) => handleInputChange(e, "role")}
                    className={styles.select}
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                ) : (
                  user.role
                )}
              </td>
              <td className={styles.td}>
                {editingUserId === user.id ? (
                  <button className={styles.button} onClick={handleSave}>Save</button>
                ) : (
                  <button className={styles.button} onClick={() => handleEdit(user)}>Edit</button>
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
