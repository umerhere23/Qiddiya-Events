import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import styles from "./AdminPanel.module.css";

const AdminPanel = () => {
  return (
    <div className={styles.adminContainer}>
      <Sidebar />
      <div className={styles.content}>
        <div className={styles.main}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;