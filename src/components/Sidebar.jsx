import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import styles from "./Sidebar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faChartLine,
  faEdit,
  faTrash,
  faUsersCog,
  faMapMarkerAlt,
  faChartBar,
  faSignOutAlt,
  faBars,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  return (
    <>
      <div className={styles.toggleButton} onClick={() => setCollapsed(!collapsed)}>
        <FontAwesomeIcon icon={faBars} />
      </div>
      <div className={`${styles.sidebar} ${collapsed ? styles.collapsed : ""}`}>
        <h2 className={styles.heading}>Admin Panel</h2>
        <ul className={styles.menu}>
          <li><Link to="/admin/manage-visitors" className={styles.link}><FontAwesomeIcon icon={faUser} /> {!collapsed && "Manage Visitors"}</Link></li>
          <li><Link to="/admin/generate-reports" className={styles.link}><FontAwesomeIcon icon={faChartLine} /> {!collapsed && "Generate Reports"}</Link></li>
          <li><Link to="/admin/edit-event" className={styles.link}><FontAwesomeIcon icon={faEdit} /> {!collapsed && "Edit Event"}</Link></li>
          <li><Link to="/admin/delete-event" className={styles.link}><FontAwesomeIcon icon={faTrash} /> {!collapsed && "Delete Event"}</Link></li>
          <li><Link to="/admin/manage-organizers" className={styles.link}><FontAwesomeIcon icon={faUsersCog} /> {!collapsed && "Manage Organizers"}</Link></li>
          <li><Link to="/admin/manage-venues" className={styles.link}><FontAwesomeIcon icon={faMapMarkerAlt} /> {!collapsed && "Manage Venues"}</Link></li>
          <li><Link to="/admin/analytics" className={styles.link}><FontAwesomeIcon icon={faChartBar} /> {!collapsed && "Monitor Analytics"}</Link></li>
          <li>
            <button onClick={handleLogout} className={styles.link}>
              <FontAwesomeIcon icon={faSignOutAlt} /> {!collapsed && "Logout"}
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
