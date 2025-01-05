import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faShareAlt } from "@fortawesome/free-solid-svg-icons";
import { useFavourites } from "../Context/FavouritesContext";
import propertiesData from "../properties.json";
import { Link } from "react-router-dom"; // Use Link for navigation
import "../Styles/PropertiesList.css";

function PropertyList() {
  const { favourites, addToFavourites, removeFromFavourites } = useFavourites();

  const isFavourite = (propertyId) =>
    favourites.some((fav) => fav.id === propertyId);

  const handleToggleFavourite = (property) => {
    if (isFavourite(property.id)) {
      removeFromFavourites(property.id);
    } else {
      addToFavourites(property);
    }
  };

  const shareProperty = (propertyUrl) => {
    const shareUrl = propertyUrl || window.location.href;
    if (navigator.share) {
      navigator
        .share({
          title: document.title,
          url: shareUrl,
        })
        .then(() => console.log("Shared successfully"))
        .catch((error) => console.error("Error sharing", error));
    } else {
      navigator.clipboard.writeText(shareUrl);
      alert("URL copied to clipboard");
    }
  };

  return (
    <div className="property-lists">
      {propertiesData.properties.map((property) => (
        <div key={property.id} className="property-cards">
          <img
            src={property.picture}
            alt={property.type}
            className="property-image"
          />
          <div className="property-info">
            <h3>{property.location}</h3>
            <p className="property-description">{property.description}</p>
            <p>Price: £{property.price.toLocaleString()}</p>
            <p>Type: {property.type}</p>
            {/* Use Link to navigate to property details */}
            <Link to={property.url} className="view-detail">
              View Details
            </Link>
            <div className="icon">
              <FontAwesomeIcon
                icon={faHeart}
                className={`favourite-icon ${
                  isFavourite(property.id) ? "active" : ""
                }`}
                onClick={() => handleToggleFavourite(property)}
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
