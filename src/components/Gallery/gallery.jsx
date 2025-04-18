import { useState } from 'react';
import styles from '../../CSS/GalleryPage.module.css';
import overview from "../../assets/cityoverview.webp";
import speedPark from "../../assets/speedpark.jpg";
import waterPark from "../../assets/waterpark.webp";
import sixFlags from "../../assets/sixflags.webp";
import concert from "../../assets/concert.jpg";
import motorsport from "../../assets/motorsport.jpg";
import familyEvent from "../../assets/familyevent.webp";
import architecture from "../../assets/architecture.webp";
import { FaChevronRight, FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram, FaCalendarAlt, FaTicketAlt, FaUsers } from 'react-icons/fa';

const GalleryPage = () => {
  const galleryImages = [
    {
      id: 1,
      src: overview,
      alt: 'Qiddiya City Overview',
      category: 'venue'
    },
    {
      id: 2,
      src: speedPark,
      alt: 'Speed Park',
      category: 'attractions'
    },
    {
      id: 3,
      src: waterPark,
      alt: 'Water Park',
      category: 'attractions'
    },
    {
      id: 4,
      src: sixFlags,
      alt: 'Six Flags Qiddiya',
      category: 'attractions'
    },
    {
      id: 5,
      src: concert,
      alt: 'Concert Event',
      category: 'events'
    },
    {
      id: 6,
      src: motorsport,
      alt: 'Motorsport Event',
      category: 'events'
    },
    {
      id: 7,
      src: familyEvent,
      alt: 'Family Event',
      category: 'events'
    },
    {
      id: 8,
      src: architecture,
      alt: 'Architecture',
      category: 'venue'
    }
  ];

  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const filteredImages = activeCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory);

  const openLightbox = (index) => {
    setCurrentImage(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const navigateLightbox = (direction) => {
    let newIndex;
    if (direction === 'prev') {
      newIndex = (currentImage - 1 + filteredImages.length) % filteredImages.length;
    } else {
      newIndex = (currentImage + 1) % filteredImages.length;
    }
    setCurrentImage(newIndex);
  };

  return (
    <>
    <div className={styles.galleryPage}>
      <header className={styles.galleryHeader}>
        <h1>Qiddiya Gallery</h1>
        <p>Explore our world-class entertainment destination through stunning visuals</p>
      </header>

      <div className={styles.filterControls}>
        <button 
          className={`${styles.filterButton} ${activeCategory === 'all' ? styles.active : ''}`}
          onClick={() => setActiveCategory('all')}
        >
          All
        </button>
        <button 
          className={`${styles.filterButton} ${activeCategory === 'venue' ? styles.active : ''}`}
          onClick={() => setActiveCategory('venue')}
        >
          Venue
        </button>
        <button 
          className={`${styles.filterButton} ${activeCategory === 'attractions' ? styles.active : ''}`}
          onClick={() => setActiveCategory('attractions')}
        >
          Attractions
        </button>
        <button 
          className={`${styles.filterButton} ${activeCategory === 'events' ? styles.active : ''}`}
          onClick={() => setActiveCategory('events')}
        >
          Events
        </button>
      </div>

      <div className={styles.galleryGrid}>
        {filteredImages.map((image, index) => (
            
          <div 
            key={image.id} 
            className={styles.galleryItem}
            onClick={() => openLightbox(index)}
          >
            <img 
              src={image.src} 
              alt={image.alt} 
              className={styles.galleryImage}
              loading="lazy"
            />
            <div className={styles.imageOverlay}>
              <span>{image.alt}</span>
            </div>
          </div>
        ))}
      </div>

      {lightboxOpen && (
  <div className={styles.lightbox} onClick={closeLightbox}>
    <div
      className={styles.lightboxContent}
      onClick={(e) => e.stopPropagation()}
    >
         <button className={styles.closeButton} style={{display:"none"}}onClick={closeLightbox}>
              &times;
            </button>
      <button 
        className={styles.navButtonPrev} 
        onClick={() => navigateLightbox('prev')}
      >
        &#10094;
      </button>
      <img 
        src={filteredImages[currentImage].src} 
        alt={filteredImages[currentImage].alt} 
        className={styles.lightboxImage}
      />
      <button 
        className={styles.navButtonNext} 
        onClick={() => navigateLightbox('next')}
      >
        &#10095;
      </button>
      <div className={styles.imageCaption}>
        {filteredImages[currentImage].alt}
      </div>
    </div>
  </div>
)}

    </div> <footer className={styles.footer}>
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
            </footer></>
  );
};

export default GalleryPage;