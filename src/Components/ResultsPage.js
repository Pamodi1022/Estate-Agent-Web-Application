import React from "react";
import { useLocation } from "react-router-dom";
import { useDrag } from "react-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faShareAlt } from "@fortawesome/free-solid-svg-icons";
import { useFavourites } from "../Context/FavouritesContext";
import FavList from "./FavList";
import propertiesData from "../properties.json";
import "../Styles/ResultsPage.css";

const ResultsPage = () => {
  const location = useLocation();
  const { results } = location.state || { results: [] };
  const { favourites, addToFavourites } = useFavourites();

  const displayResults = results.length > 0 ? results : propertiesData;

  const shareProperty = (propertyUrl) => {
    const shareUrl = propertyUrl || window.location.href;
    if (navigator.share) {
      navigator.share({ title: "Property", url: shareUrl }).catch(console.error);
    } else {
      navigator.clipboard.writeText(shareUrl).then(() => alert("URL copied!"));
    }
  };

  const DraggableProperty = ({ property, shareProperty }) => {
    const isFavourite = favourites.some((fav) => fav.id === property.id);

    const [{ isDragging }, drag] = useDrag(() => ({
      type: "PROPERTY",
      item: { property },
      canDrag: !isFavourite,  // Prevent dragging if the property is already in favourites
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }));

    return (
      <div
        ref={drag}
        className="property-card"
        style={{ opacity: isDragging ? 0.5 : 1 }}
      >
        <img
          src={property.picture}
          alt={property.description || property.location}
          className="property-image"
        />
        <div className="property-info">
          <h3>{property.location}</h3>
          <p className="property-description">{property.description}</p>
          <p><strong>Price:</strong> €{property.price}</p>
          <p>Type: {property.type}</p>
          <div className="icons">
            <FontAwesomeIcon
              icon={faHeart}
              className={`favourite-icon ${isFavourite ? "active" : ""}`}
              onClick={() => !isFavourite && addToFavourites(property)} // Only add to favourites if not already there
            />
            <FontAwesomeIcon
              icon={faShareAlt}
              className="share-icon"
              onClick={() => shareProperty(property.url)}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="results-container">
      <h2>Search Results</h2>
      {displayResults.length > 0 ? (
        <div className="property-list">
          {displayResults.map((property) => (
            <DraggableProperty
              key={property.id}
              property={property}
              shareProperty={shareProperty}  // Pass shareProperty here
            />
          ))}
        </div>
      ) : (
        <p>No properties match your search criteria.</p>
      )}
      <div className="favourites-sidebar">
        <FavList />
      </div>
    </div>
  );
};

export default ResultsPage;
