import React, { createContext, useContext, useState } from "react";

const FavouritesContext = createContext();

export const useFavourites = () => {
  return useContext(FavouritesContext);
};

export const FavouritesProvider = ({ children }) => {
  const [favourites, setFavourites] = useState([]);

  const addToFavourites = (property) => {
    if (!favourites.some((fav) => fav.id === property.id)) {
      setFavourites((prev) => [...prev, property]);
    }
  };

  const removeFromFavourites = (propertyId) => {
    setFavourites((prev) => prev.filter((fav) => fav.id !== propertyId));
  };

  const clearFavourites = () => {
    setFavourites([]); // Clear all properties
  };

  return (
    <FavouritesContext.Provider
      value={{ favourites, addToFavourites, removeFromFavourites, clearFavourites }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};
