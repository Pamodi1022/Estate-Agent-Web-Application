import React from "react";
import { useLocation } from "react-router-dom";
import { useDrag, useDrop } from "react-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faShareAlt } from "@fortawesome/free-solid-svg-icons";
import { useFavourites } from "../Context/FavouritesContext";
import FavList from "./FavList";
import propertiesData from "../properties.json";
import "../Styles/ResultsPage.css";

const ResultsPage = () => {
  const location = useLocation();
  const { results } = location.state || { results: [] };
  const { favourites, addToFavourites, removeFromFavourites } = useFavourites();

  const displayResults = results.length > 0 ? results : propertiesData;

  const shareProperty = (propertyUrl) => {
    const shareUrl = propertyUrl || window.location.href;
    if (navigator.share) {
      navigator.share({ title: "Property", url: shareUrl }).catch(console.error);
    } else {
      navigator.clipboard.writeText(shareUrl).then(() => alert("URL copied!"));
    }
  };

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "PROPERTY",
    drop: (item) => {
      removeFromFavourites(item.property.id);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const DraggableProperty = ({ property }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
      type: "PROPERTY",
      item: { property },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }));

    const handleFavouriteToggle = (property) => {
      if (favourites.some((fav) => fav.id === property.id)) {
        removeFromFavourites(property.id);
      } else {
        addToFavourites(property);
      }
    };
    

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
          <a href={property.url} className="view-detail">
              View Details
            </a>
          <div className="icons">
            <FontAwesomeIcon
              icon={faHeart}
              className={`favourite-icon ${favourites.some((fav) => fav.id === property.id) ? "active" : ""}`}
              onClick={() => handleFavouriteToggle(property)}
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
    <div className="results-page">
      <div className="results-container">
        <h2>Search Results</h2>
        {displayResults.length > 0 ? (
          <div className="property-list" ref={drop} style={{ background: isOver ? "#f0f0f0" : "" }}>
            {displayResults.map((property) => (
              <DraggableProperty
                key={property.id}
                property={property}
              />
            ))}
          </div>
        ) : (
          <p>No properties match your search criteria.</p>
        )}
      </div>
      <FavList />
    </div>
  );
};

export default ResultsPage;