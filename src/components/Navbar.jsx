import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"; 
import { logout } from "../redux/userSlice"; // Assuming you have a logout action
import { useState } from "react";
import styles from "./Navbar.module.css"; 
import logo from "../assets/logo.jpg";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated); // 👈 get auth status

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/"); // after logout, send to homepage
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
        

         <div className={styles.mobileAuthButtons}>
          {isAuthenticated ? (
            <button 
              className={styles.authButton} 
              onClick={() => { handleLogout(); setMenuOpen(false); }}
            >
              Logout
            </button>
          ) : (
            <>
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
            </>
          )}
        </div>
      </ul>

      {/* Desktop auth buttons */}
      <div className={styles.authButtons}>
        {isAuthenticated ? (
          <button 
            className={styles.authButton} 
            onClick={handleLogout}
          >
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" className={styles.authButton}>Login</Link>
            <Link to="/regUser" className={`${styles.authButton} ${styles.signUpButton}`}>Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
