import React from "react";
import { useDrop, useDrag } from "react-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useFavourites } from "../Context/FavouritesContext";
import "../Styles/FavList.css";

const FavList = () => {
  const { favourites, addToFavourites, removeFromFavourites, clearFavourites } = useFavourites();

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "PROPERTY",
    drop: (item) => {
      if (!favourites.some((fav) => fav.id === item.property.id)) {
        addToFavourites(item.property);
      }
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


    return (
      <div
        ref={drag}
        className="fav-property-cards"
        style={{ opacity: isDragging ? 0.5 : 1 }}
      >
        <img
                src={property.picture}
                alt={property.description || property.location}
                className="fav-property-image"
              />
        <div className="fav-property-info">
                <h4>{property.location}</h4>
                <p><strong>Price:</strong> €{property.price}</p>
                <p>Type: {property.type}</p>
                <a href={property.url} className="view-detail">
                    View Details
                  </a>
                <FontAwesomeIcon
                  icon={faHeart}
                  className="fav-icon"
                  onClick={() => removeFromFavourites(property.id)}
                />
              </div>
      </div>
    );
  };

  return (
    <div
      ref={drop}
      className={`fav-list-container ${isOver ? "highlight" : ""}`}
    >
      <h2>Favourite Properties</h2>
      <button className="clear-button" onClick={clearFavourites}>
        Clear All
      </button>
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