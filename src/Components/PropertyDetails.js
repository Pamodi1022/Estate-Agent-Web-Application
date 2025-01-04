import React, { useState } from "react";
import '../Styles/Property.css';
import propertyData from '../properties.json'; 
import { FaTimes, FaChevronLeft, FaChevronRight, FaHeart, FaShareAlt } from 'react-icons/fa';

const PropertyDetails = () => {
  const [isFullDescription, setIsFullDescription] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("description"); // Track the active tab
  const property = propertyData.properties[0]; // Assuming there's only one property in the array

  const handleToggleDescription = () => {
    setIsFullDescription(!isFullDescription);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
  };

  const navigateImage = (direction) => {
    setCurrentImageIndex((prevIndex) => {
      const newIndex = prevIndex + direction;
      if (newIndex < 0) return property.images.length - 1;
      if (newIndex >= property.images.length) return 0;
      return newIndex;
    });
  };

  const openImageViewer = () => {
    document.getElementById('image-viewer').style.display = 'block';
  };

  const closeImageViewer = () => {
    document.getElementById('image-viewer').style.display = 'none';
  };

  const shareProperty = () => {
    alert('Property shared!');
  };

  const toggleFavorite = () => {
    alert('Property added to favorites!');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "description":
        return (
          <div className="description">
            <h3>Description</h3>
            <p>{property.descriptionDetails.short}</p>
            {isFullDescription ? (
              <div>
                <p>{property.descriptionDetails.full}</p>
              </div>
            ) : (
              <button onClick={handleToggleDescription}>Read Full Description</button>
            )}
          </div>
        );
      case "floor-plan":
        return (
          <div className="floor-plan">
            <img src="../images/floor-plan.jpg" alt="Floor Plan" />
          </div>
        );
      case "map":
        return (
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=..."
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="property-details-container">
      {/* Navbar */}
      <div className="navbar">
        <div className="logo-container">
          <a href="/" onClick={closeMenu}>
            <img src="../images/logo.png" alt="Logo" className="logo-img" />
          </a>
        </div>
        <button className="menu-toggle" onClick={toggleMenu}>☰</button>
        <ul id="navbar-links" className={isMenuOpen ? 'open' : ''}>
          <li><a href="/search" onClick={closeMenu}>Search</a></li>
          <li><a href="/ads" onClick={closeMenu}>Advertisements</a></li>
          <li><a href="/signup" onClick={closeMenu}>Sign up</a></li>
        </ul>
      </div>

      {/* Property Details */}
      <div className="property-details">
        <div className="gallery-container">
          <div className="main-image" onClick={openImageViewer}>
            <img src={property.images[currentImageIndex]} alt="House" />
          </div>
          <div className="thumbnail-container">
            {property.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Property Image ${index + 1}`}
                onClick={() => handleImageClick(index)}
              />
            ))}
          </div>
        </div>

        {/* Fullscreen Image Viewer */}
        <div id="image-viewer">
          <FaTimes className="close-btn" onClick={closeImageViewer} />
          <FaChevronLeft className="arrow left" onClick={() => navigateImage(-1)} />
          <img id="viewer-image" src={property.images[currentImageIndex]} alt="Fullscreen Image" />
          <FaChevronRight className="arrow right" onClick={() => navigateImage(1)} />
        </div>

        <div className="property-info">
          <h2>{property.title}</h2>
          <div className="price">£{property.price.toLocaleString()}</div>
          <div className="letting-details">
            <div><strong>PROPERTY TYPE:</strong> {property.details.propertyType}</div>
            <div><strong>BEDROOMS:</strong> {property.details.bedrooms}</div>
            <div><strong>BATHROOMS:</strong> {property.details.bathrooms}</div>
            <div><strong>RECEPTIONS:</strong> {property.details.receptions}</div>
            <div><strong>TENURE:</strong> {property.details.tenure}</div>
            <div><strong>COUNCIL TAX:</strong> {property.details.councilTax}</div>
            <div><strong>PARKING:</strong> {property.details.parking}</div>
            <div><strong>GARDEN:</strong> {property.details.garden}</div>
            <div><strong>ACCESSIBILITY:</strong> {property.details.accessibility}</div>
            <div><strong>SIZE:</strong> {property.details.size}</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="tabs">
          <button onClick={() => setActiveTab("description")} className={activeTab === "description" ? "active" : ""}>Description</button>
          <button onClick={() => setActiveTab("floor-plan")} className={activeTab === "floor-plan" ? "active" : ""}>Floor Plan</button>
          <button onClick={() => setActiveTab("map")} className={activeTab === "map" ? "active" : ""}>Google Map</button>
        </div>

        {/* Tab Content */}
        {renderTabContent()}

        {/* Agent Details */}
        <div className="agent-card">
          <h2>Marketed By: {property.agent.name}</h2>
          <p>{property.agent.address}</p>
          <div className="agent-contact">
            <button onClick={() => alert("Calling agent...")}>Call agent</button>
            <button onClick={() => alert("Requesting property details...")}>Request Details</button>
          </div>
        </div>

        {/* Favorite and Share Icons */}
        <div className="icons">
          <FaShareAlt id="share-icon" onClick={shareProperty} />
          <FaHeart id="favorite-icon" onClick={toggleFavorite} />
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
