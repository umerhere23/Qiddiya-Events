import React from 'react';
import styles from '../../CSS/About.module.css';
import teamImage from '../../assets/about-team.jpg';
import visionImage from '../../assets/architecture.webp';
import valuesImage from '../../assets/about-values.jpg';
import bgImage from "../../assets/lanscape2.jpg";  

import { FaChevronRight, FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram, FaCalendarAlt, FaTicketAlt, FaUsers } from 'react-icons/fa';

const AboutUs = () => {
  return (
    <div className={styles.aboutPage}>
    <section className={styles.heroSection}>
      <div
        className={styles.bgOverlay}
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      <div className={styles.heroContent}>
        <h1>About Qiddiya Events</h1>
        <p>
          Creating unforgettable experiences in Saudi Arabia's premier
          entertainment destination
        </p>
      </div>
    </section>

       <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.textContent}>
            <h2>Our Story</h2>
            <p>
              Founded in 2023, Qiddiya Events has quickly become the leading organizer of world-class entertainment 
              experiences in Saudi Arabia. Born from the vision of the Qiddiya project, we specialize in creating 
              extraordinary moments that bring people together through music, sports, culture, and family entertainment.
            </p>
            <p>
              What started as a small team with big dreams has grown into a powerhouse of event professionals dedicated 
              to pushing the boundaries of live experiences in the region.
            </p>
          </div>
          <div className={styles.imageContainer}>
            <img src={teamImage} alt="Our team working together" className={styles.aboutImage} />
          </div>
        </div>
      </section>

       <section className={`${styles.section} ${styles.darkSection}`}>
        <div className={styles.container}>
          <div className={styles.imageContainer}>
            <img src={visionImage} alt="Qiddiya vision" className={styles.aboutImage} />
          </div>
          <div className={styles.textContent}>
            <h2>Our Vision</h2>
            <p>
              To transform Saudi Arabia into a global hub for entertainment and leisure, creating a vibrant society 
              where people can experience the joy of world-class events right in their backyard.
            </p>
            <p>
              We envision Qiddiya as the Middle East's premier destination for entertainment, where cutting-edge 
              facilities meet unparalleled experiences that celebrate both international and local culture.
            </p>
          </div>
        </div>
      </section>

       <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.textContent}>
            <h2>Our Values</h2>
            <div className={styles.valuesGrid}>
              <div className={styles.valueCard}>
                <h3>Excellence</h3>
                <p>We strive for perfection in every event, delivering world-class experiences that exceed expectations.</p>
              </div>
              <div className={styles.valueCard}>
                <h3>Innovation</h3>
                <p>We push boundaries and embrace new ideas to create unique, memorable experiences.</p>
              </div>
              <div className={styles.valueCard}>
                <h3>Community</h3>
                <p>We build connections and celebrate the rich diversity of our society through shared experiences.</p>
              </div>
              <div className={styles.valueCard}>
                <h3>Sustainability</h3>
                <p>We commit to environmentally responsible events that protect our planet for future generations.</p>
              </div>
            </div>
          </div>
          <div className={styles.imageContainer}>
            <img src={valuesImage} alt="Our values in action" className={styles.aboutImage} />
          </div>
        </div>
      </section>

       <section className={`${styles.section} ${styles.teamSection}`}>
        <h2>Meet Our Leadership</h2>
        <div className={styles.teamGrid}>
     
          <div className={styles.teamMember}>
            <div className={styles.memberPhoto}></div>
            <h3>Yazeed Almahmud</h3>
            <p>Chief Executive Officer</p>
          </div>
          <div className={styles.teamMember}>
            <div className={styles.memberPhoto}></div>
            <h3>Fahad Alhmoudi</h3>
            <p>Website Manager</p>
          </div>
         
        
        </div>
      </section>

       <section className={styles.ctaSection}>
        <h2>Ready to Experience Qiddiya?</h2>
        <p>Join us for our next unforgettable event</p>
        <button className={styles.ctaButton}>View Upcoming Events</button>
      </section>
          <footer className={styles.footer}>
              <div className={styles.footerContent}>
                <div className={styles.footerSection}>
                  <h3>Qiddiya<span>Events</span></h3>
                  <p>Saudi Arabia's premier entertainment destination offering world-class events and attractions.</p>
                  <div className={styles.socialIcons}>
                    <a href="#"><FaFacebook /></a>
                    <a href="#"><FaTwitter /></a>
                    <a href="#"><FaInstagram /></a>
                  </div>
                </div>
                <div className={styles.footerSection}>
                  <h4>Quick Links</h4>
                  <ul>
                    <li><a href="#home">Home</a></li>
                    <li><a href="#events">Events</a></li>
                    <li><a href="#attractions">Attractions</a></li>
                    <li><a href="#about">About Us</a></li>
                    <li><a href="#contact">Contact</a></li>
                  </ul>
                </div>
                <div className={styles.footerSection}>
                  <h4>Contact Info</h4>
                  <ul className={styles.contactInfo}>
                    <li><FaPhone /> +966 11 123 4567</li>
                    <li><FaEnvelope /> events@qiddiya.com</li>
                    <li><FaMapMarkerAlt /> Qiddiya City, Riyadh, Saudi Arabia</li>
                  </ul>
                </div>
              </div>
              <div className={styles.footerBottom}>
                <p>&copy; {new Date().getFullYear()} Qiddiya Events. All rights reserved.</p>
              </div>
            </footer>
    </div>
  );
};

export default AboutUs;