import { Link } from "react-router-dom";
import { useState } from "react";
import styles from "./Navbar.module.css"; 
import logo from "../assets/logo.jpg";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logoContainer}>
        <Link to="/" className={styles.logoLink}>
          <img 
            src={logo} 
            alt="Company Logo" 
            className={styles.logoImage}
          />
        </Link>
      </div>
      
      {/* Hamburger menu icon */}
      <div 
        className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`} 
        onClick={toggleMenu}
      >
        <div></div>
        <div></div>
        <div></div>
      </div>
      
      {/* Navigation Links */}
      <ul className={`${styles.navLinks} ${menuOpen ? styles.active : ''}`}>
        <li className={styles.navItem}>
          <Link to="/" className={styles.navLink} onClick={() => setMenuOpen(false)}>Home</Link>
        </li>
        <li className={styles.navItem}>
          <Link to="/gallery" className={styles.navLink} onClick={() => setMenuOpen(false)}>Gallery</Link>
        </li>
        <li className={styles.navItem}>
          <Link to="/about-us" className={styles.navLink} onClick={() => setMenuOpen(false)}>About Us</Link>
        </li>
        <li className={styles.navItem}>
          <Link to="/contact-us" className={styles.navLink} onClick={() => setMenuOpen(false)}>Contact Us</Link>
        </li>
        <li className={styles.navItem}>
          <Link to="/events" className={styles.navLink} onClick={() => setMenuOpen(false)}>Events</Link>
        </li>
        <li className={styles.navItem}>
          <Link to="/register-event" className={styles.navLink} onClick={() => setMenuOpen(false)}>Register Event</Link>
        </li>
        
        {/* Mobile-only auth buttons */}
        <div className={styles.mobileAuthButtons}>
          <Link 
            to="/login" 
            className={styles.authButton}
            onClick={() => setMenuOpen(false)}
          >
            Login
          </Link>
          <Link 
            to="/regUser" 
            className={`${styles.authButton} ${styles.signUpButton}`}
            onClick={() => setMenuOpen(false)}
          >
            Sign Up
          </Link>
        </div>
      </ul>
      
       <div className={styles.authButtons}>
        <Link to="/login" className={styles.authButton}>Login</Link>
        <Link to="/regUser" className={`${styles.authButton} ${styles.signUpButton}`}>Sign Up</Link>
      </div>
    </nav>
  );
};

export default Navbar;