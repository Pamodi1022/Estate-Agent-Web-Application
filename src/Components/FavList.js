import React from "react";
import { useDrop, useDrag } from "react-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useFavourites } from "../Context/FavouritesContext";
import "../Styles/FavList.css";

const FavList = () => {
  const { favourites, addToFavourites, removeFromFavourites } = useFavourites();

  // Use one drop function to handle both adding and removing
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "PROPERTY",  // Accept properties
    drop: (item) => {
      // Prevent duplicates by checking if the property is already in the favourites list
      if (!favourites.some((fav) => fav.id === item.property.id)) {
        addToFavourites(item.property);  // Add to favourites if not already present
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  // Draggable functionality for each property in the favourites
  const DraggableProperty = ({ property }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
      type: "PROPERTY",
      item: { property },  // Property being dragged
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }));

    // Toggle favourite status when the heart icon is clicked
    const toggleFavourite = () => {
      // Prevent duplicates by checking if the property is already in the favourites list
      if (!favourites.some((fav) => fav.id === property.id)) {
        addToFavourites(property);  // Add to favourites if not already present
      } else {
        removeFromFavourites(property.id);  // Remove from favourites if already there
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
          <FontAwesomeIcon
            icon={faHeart}
            className={`favourite-icon ${favourites.some((fav) => fav.id === property.id) ? "active" : ""}`}
            onClick={toggleFavourite}  // Toggle favourite on heart click
          />
        </div>
      </div>
    );
  };

  return (
    <div
      ref={drop}  // Attach drop functionality here
      className={`fav-list-container ${isOver ? "highlight" : ""}`}
    >
      <h2>Favourite Properties</h2>
      {favourites.length > 0 ? (
        <div className="property-list">
          {favourites.map((property) => (
            <DraggableProperty key={property.id} property={property} />
          ))}
        </div>
      ) : (
        <p>No favourite properties yet.</p>
      )}
    </div>
  );
};

export default FavList;
