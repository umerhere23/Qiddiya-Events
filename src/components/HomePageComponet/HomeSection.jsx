import React, { useState } from 'react';
import styles from '../../CSS/LandingPage.module.css';
import { FaChevronRight, FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram, FaCalendarAlt, FaTicketAlt, FaUsers } from 'react-icons/fa';

const LandingPage = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you for subscribing with ${email}`);
    setEmail('');
  };

  return (
    <div className={styles.container}>
      {/* Navigation */}
      <nav className={styles.navbar}>
        <div className={styles.logo}>Qiddiya<span>Events</span></div>
        <ul className={styles.navLinks}>
          <li><a href="#home">Home</a></li>
          <li><a href="#events">Events</a></li>
          <li><a href="#attractions">Attractions</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <button className={styles.menuButton}>☰</button>
      </nav>

      {/* Hero Section */}
      <header className={styles.hero} id="home">
        <div className={styles.heroContent}>
          <h1>Experience Qiddiya's Thrilling Events</h1>
          <p>Your gateway to unforgettable entertainment in Saudi Arabia's premier entertainment destination</p>
          <div className={styles.heroButtons}>
            <button className={styles.primaryButton}>View Events</button>
            <button className={styles.secondaryButton}>Book Tickets</button>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className={styles.features}>
        <div className={styles.sectionHeader}>
          <h2>Why Choose Qiddiya Events?</h2>
          <p>World-class entertainment experiences</p>
        </div>
        <div className={styles.featureGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}><FaCalendarAlt size={40} /></div>
            <h3>Diverse Events</h3>
            <p>From concerts to motorsports, we host events for every taste</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}><FaTicketAlt size={40} /></div>
            <h3>Easy Booking</h3>
            <p>Simple online ticket reservation with instant confirmation</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}><FaUsers size={40} /></div>
            <h3>Family Friendly</h3>
            <p>Enjoy events designed for visitors of all ages</p>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className={styles.destinations} id="events">
        <div className={styles.sectionHeader}>
          <h2>Upcoming Events</h2>
          <p>Don't miss these exciting experiences</p>
        </div>
        <div className={styles.destinationGrid}>
          <div className={styles.destinationCard}>
            <img src="https://www.qiddiya.com/wp-content/uploads/2023/05/Qiddiya-City-Entertainment-Destination.jpg" alt="Concert Series" />
            <div className={styles.destinationInfo}>
              <h3>International Concert Series</h3>
              <p>World-famous artists performing live at our state-of-the-art venue</p>
              <div className={styles.eventDate}>June 15-30, 2023</div>
              <button className={styles.destinationButton}>
                New Event <FaChevronRight />
              </button>
            </div>
          </div>
          <div className={styles.destinationCard}>
            <img src="https://www.qiddiya.com/wp-content/uploads/2023/05/Qiddiya-Speed-Park.jpg" alt="Motorsport Event" />
            <div className={styles.destinationInfo}>
              <h3>Qiddiya Grand Prix</h3>
              <p>High-octane motorsport action at our world-class Speed Park</p>
              <div className={styles.eventDate}>July 10-12, 2023</div>
              <button className={styles.destinationButton}>
                New Event <FaChevronRight />
              </button>
            </div>
          </div>
          <div className={styles.destinationCard}>
            <img src="https://www.qiddiya.com/wp-content/uploads/2023/05/Qiddiya-Water-Park.jpg" alt="Family Festival" />
            <div className={styles.destinationInfo}>
              <h3>Family Fun Festival</h3>
              <p>Interactive shows, games, and activities for the whole family</p>
              <div className={styles.eventDate}>August 5-20, 2023</div>
              <button className={styles.destinationButton}>
                New Event <FaChevronRight />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Attractions Section */}
      <section className={styles.features} id="attractions">
        <div className={styles.sectionHeader}>
          <h2>Qiddiya Attractions</h2>
          <p>Explore our world-class facilities</p>
        </div>
        <div className={styles.featureGrid}>
          <div className={styles.featureCard}>
            <img src="https://www.qiddiya.com/wp-content/uploads/2023/05/Qiddiya-Speed-Park.jpg" alt="Speed Park" />
            <h3>Speed Park</h3>
            <p>Middle East's premier motorsport destination with thrilling races</p>
          </div>
          <div className={styles.featureCard}>
            <img src="https://www.qiddiya.com/wp-content/uploads/2023/05/Qiddiya-Water-Park.jpg" alt="Water Park" />
            <h3>Aqua Adventure</h3>
            <p>Massive water park with record-breaking slides and attractions</p>
          </div>
          <div className={styles.featureCard}>
            <img src="https://www.qiddiya.com/wp-content/uploads/2023/05/Qiddiya-Six-Flags.jpg" alt="Six Flags" />
            <h3>Six Flags Qiddiya</h3>
            <p>First Six Flags theme park in the region with extreme rides</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className={styles.ctaContent}>
          <h2>Ready for an Unforgettable Experience?</h2>
          <p>Subscribe for event updates and exclusive offers</p>
          <form onSubmit={handleSubmit} className={styles.newsletterForm}>
            <input 
              type="email" 
              placeholder="Your email address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </section>

      {/* Footer */}
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

export default LandingPage;