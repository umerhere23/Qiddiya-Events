import React, { useState } from 'react';
import styles from './ContactUs.module.css';
import locationIcon from '../../assets/location-icon.svg';
import phoneIcon from '../assets/phone-icon.svg';
import emailIcon from '../assets/email-icon.svg';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className={styles.contactPage}>
      <div className={styles.contactHeader}>
        <h1>Contact Us</h1>
        <p>Get in touch with our team for any inquiries or feedback</p>
      </div>

      <div className={styles.contactContainer}>
        <div className={styles.contactInfo}>
          <div className={styles.infoCard}>
            <img src={locationIcon} alt="Location" />
            <h3>Our Location</h3>
            <p>Qiddiya City, Riyadh, Saudi Arabia</p>
          </div>

          <div className={styles.infoCard}>
            <img src={phoneIcon} alt="Phone" />
            <h3>Phone Number</h3>
            <p>+966 12 345 6789</p>
          </div>

          <div className={styles.infoCard}>
            <img src={emailIcon} alt="Email" />
            <h3>Email Address</h3>
            <p>info@qiddiya-events.com</p>
          </div>
        </div>

        <form className={styles.contactForm} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="message">Your Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <button type="submit" className={styles.submitButton}>
            Send Message
          </button>
        </form>
      </div>

      <div className={styles.mapContainer}>
        <iframe
          title="Qiddiya Location Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1ddummy!2d46.672882!3d24.713552!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDQyJzQ4LjgiTiA0NsKwNDAnMjIuMyJF!5e0!3m2!1sen!2ssa!4v1234567890123!5m2!1sen!2ssa"
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default ContactUs;