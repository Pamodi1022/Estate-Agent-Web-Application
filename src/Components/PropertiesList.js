import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faShareAlt } from "@fortawesome/free-solid-svg-icons";
import propertiesData from "../properties.json";
import "../Styles/Properties.css";

function PropertyList() {
  const [favourites, setFavourites] = useState([]);

  // Function to handle adding/removing from favourites
  const handleAddToFavourites = (propertyId) => {
    setFavourites((prevFavourites) => {
      if (prevFavourites.includes(propertyId)) {
        // Remove from favourites if already added
        return prevFavourites.filter((id) => id !== propertyId);
      } else {
        // Add to favourites
        return [...prevFavourites, propertyId];
      }
    });
  };

  // Function to handle sharing the property URL
  const shareProperty = (propertyUrl) => {
    const shareUrl = propertyUrl || window.location.href; // Use provided URL or current page URL
    if (navigator.share) {
      // Web Share API
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
      // Fallback for browsers that don't support Web Share API
      const tempInput = document.createElement("input");
      document.body.appendChild(tempInput);
      tempInput.value = shareUrl;
      tempInput.select();
      document.execCommand("copy");
      document.body.removeChild(tempInput);
      alert("URL copied to clipboard");
    }
  };

  return (
    <div className="property-list">
      {propertiesData.properties.map((property) => (
        <div key={property.id} className="property-card">
          <img
            src={property.picture}
            alt={property.type}
            className="property-image"
          />
          <div className="property-info">
            <h3>{property.location}</h3>
            <p>Price: £{property.price.toLocaleString()}</p>
            <p>Type: {property.type}</p>
            <a href={property.url} className="view-details">
              View Details
            </a>
            <div className="icons">
              <FontAwesomeIcon
                icon={faHeart}
                className={`favourite-icon ${favourites.includes(property.id) ? "active" : ""}`}
                onClick={() => handleAddToFavourites(property.id)}
              />
              <FontAwesomeIcon
                icon={faShareAlt}
                className="share-icon"
                onClick={() => shareProperty(property.url)}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PropertyList;
