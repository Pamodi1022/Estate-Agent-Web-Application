import React from "react";
import "../Styles/SearchForm.css";

const SearchForm = () => {
  return (
    <div className="search-form-container">
      <div className="search-banner">
        <h1>
          <span className="highlight">believe</span> in finding it
        </h1>
        <p>with the UK's largest choice of homes</p>
        <div className="search-box">
          <h3>Search Properties for Sale and Rent</h3>
          <input
            type="text"
            placeholder="e.g. Bath, NW3, or Leeds station"
            className="search-input"
          />
          <button className="search-button for-sale">For sale</button>
          <button className="search-button to-rent">To rent</button>
        </div>
      </div>
    </div>
  );
};

export default SearchForm;
