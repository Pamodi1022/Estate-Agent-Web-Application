import React, { useState } from 'react';
import { useFavourites } from '../Context/FavouritesContext';
import { useLocation } from 'react-router-dom';
import '../Styles/Property.css';
import propertyData from '../properties.json';
import { FaTimes, FaChevronLeft, FaChevronRight, FaHeart, FaShareAlt, FaBed, FaBath, FaCar, FaRegBuilding, FaTree, FaChair, FaDoorOpen, FaRulerCombined } from 'react-icons/fa';

const PropertyDetails = () => {
  const { addToFavourites, removeFromFavourites, favourites } = useFavourites();
  const [isFullDescription, setIsFullDescription] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("description");
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const propertyId = queryParams.get('id'); 

  const property = propertyData.properties.find(p => p.id === propertyId);
  const isFavorite = favourites.some((fav) => fav.id === property.id);

  const handleToggleDescription = () => {
    setIsFullDescription(!isFullDescription);
  };

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      removeFromFavourites(property.id);
    } else {
      addToFavourites(property);
    }
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
    const shareUrl = window.location.href;
    if (navigator.share) {
      navigator
        .share({
          title: document.title,
          url: shareUrl,
        })
        .then(() => {
          console.log("Thanks for sharing!");
        })
        .catch((error) => {
          console.error("Error sharing", error);
        });
    } else {
      const tempInput = document.createElement("input");
      document.body.appendChild(tempInput);
      tempInput.value = shareUrl;
      tempInput.select();
      document.execCommand("copy");
      document.body.removeChild(tempInput);
      alert("URL copied to clipboard");
    }
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
                <button onClick={handleToggleDescription}>Read Less</button>
              </div>
            ) : (
              <button onClick={handleToggleDescription}>Read Full Description</button>
            )}
          </div>
        );
      case "floor-plan":
        return (
          <div className="floor-plan">
            <img src={property.floor} alt="Floor Plan" />
          </div>
        );
        case "map":
          return (
            <div className="map-container">
              <iframe
                src={property.mapLink} // Using the mapLink directly from the JSON data
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
          {/* Favorite and Share Icons */}
          <div className="icons">
            <FaShareAlt id="share-icon" onClick={shareProperty} />
            <FaHeart
              id="favorite-icon"
              className={isFavorite ? 'fas' : 'far'}
              onClick={handleFavoriteToggle}
            />
          </div>

          <div className="price">£{property.price.toLocaleString()}</div>
          
          <div class="separator"></div>
          <div className="common">
            <div className="letting-container">
              <div className="letting-details">
                <div><FaRegBuilding /> <strong>PROPERTY TYPE:</strong> {property.details.propertyType}</div>
                <div><FaBed /> <strong>BEDROOMS:</strong> {property.details.bedrooms}</div>
                <div><FaBath /> <strong>BATHROOMS:</strong> {property.details.bathrooms}</div>
                <div><FaChair /> <strong>RECEPTIONS:</strong> {property.details.receptions}</div>
              </div>

              

              <div className="letting-detail">
                <div><FaCar /> <strong>PARKING:</strong> {property.details.parking}</div>
                <div><FaTree /><strong>GARDEN:</strong> {property.details.garden}</div>
                <div><FaDoorOpen /><strong>ACCESSIBILITY:</strong> {property.details.accessibility}</div>
                <div><FaRulerCombined /><strong>SIZE:</strong> {property.details.size}</div>
              </div>

              <div className="agent-card-container">
                <div className="agent-card">
                  <h2>Marketed By: {property.agent.name}</h2>
                  <p>{property.agent.address}</p>
                  <div className="agent-contact">
                    <button onClick={() => alert("Calling agent...")}>Call agent</button>
                    <button onClick={() => alert("Requesting property details...")}>Request Details</button>
                  </div>
                </div>
          </div>    
        </div>
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

        
      </div>
    </div>
  );
};

export default PropertyDetails;
