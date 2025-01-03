import React, { createContext, useContext, useState } from "react";

const FavouritesContext = createContext();

export const useFavourites = () => {
  return useContext(FavouritesContext);
};

export const FavouritesProvider = ({ children }) => {
  const [favourites, setFavourites] = useState([]);

  // Add a property to favourites, but only if it's not already in the list
  const addToFavourites = (property) => {
    if (!favourites.some((fav) => fav.id === property.id)) {
      setFavourites((prev) => [...prev, property]);
    }
  };

  // Remove a property from favourites
  const removeFromFavourites = (propertyId) => {
    setFavourites((prev) => prev.filter((fav) => fav.id !== propertyId));
  };

  return (
    <FavouritesContext.Provider
      value={{ favourites, addToFavourites, removeFromFavourites }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};
