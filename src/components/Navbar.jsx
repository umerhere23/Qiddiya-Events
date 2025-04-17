import { Link } from "react-router-dom";
import styles from "./Navbar.module.css"; 

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <span>◆</span>  
      </div>
      <ul className={styles.navLinks}>
        <Link to="/" style={{ textDecoration: "none" }} className={styles.navLink}>Home</Link>
        <Link to="/events" style={{ textDecoration: "none" }} className={styles.navLink}>Events</Link>
        <Link to="/register-event" style={{ textDecoration: "none" }} className={styles.navLink}>Register Event</Link>
      </ul>
      <div className={styles.authButtons}>
        <Link to="/login" className={styles.authButton}>Login</Link>
        <Link to="/regUser" className={styles.authButton}>Sign Up</Link>
      </div>
    </nav>
  );
};

export default Navbar;
