import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import propertiesData from '../properties.json'; // Adjust the path as necessary
import "../Styles/SearchBar.css";

const SearchBar = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');

  const handleFilter = (type) => {
    // Check if the area is entered or not
    const area = searchTerm.trim();

    if (!area) {
      alert('Please enter a location to search!');
      return;
    }

    // Filter properties based on Area and type (sale/rent)
    const filteredProperties = propertiesData.properties.filter(
      (property) =>
        property.Area.toLowerCase() === area.toLowerCase() &&
        property.search.toLowerCase() === type.toLowerCase()
    );

    if (filteredProperties.length > 0) {
      navigate(`/searchform?type=${type}&Area=${area}`);
    } else {
      alert(`No properties found for ${type} in ${area}. Please try another location.`);
    }
  };

  const handleRentClick = (e) => {
    e.preventDefault();
    setSelectedType('rent'); // Store the type selected by the user
    handleFilter('rent');    // Apply the filter for rent
  };

  const handleSaleClick = (e) => {
    e.preventDefault();
    setSelectedType('sale'); // Store the type selected by the user
    handleFilter('sale');    // Apply the filter for sale
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value); // Update the search term (area)
  };

  // Create a unique list of Areas
  const Areas = [...new Set(propertiesData.properties.map((property) => property.Area))];

  return (
    <div className="barcontainer">
      <h1 className="title">
        DREAMING OF YOUR PERFECT HOME ?<span className="highlight"><br />START YOUR SEARCH HERE!</span>
      </h1>
      <h3 className="subtitle">
        "Find your perfect space with ease! Whether you’re looking for a cozy apartment, a family home, or the ideal commercial property, our search page offers a curated selection tailored to your needs.<br />Explore detailed listings with high-quality photos, key features, and up-to-date pricing. Filter by location, budget, size, and amenities to discover the property that fits your lifestyle. Your dream home or business space is just a few clicks away!"
      </h3>

      <div className="search-bar">
        <input
          type="text"
          placeholder="e.g. Bath, NW3 or Leeds station"
          className="search-input"
          list="Areas"
          value={searchTerm}
          onChange={handleInputChange}
          required
        />
        <datalist id="Areas">
          {Areas.map((Area, index) => (
            <option key={index} value={Area} />
          ))}
        </datalist>
      </div>

      <div className="buttons">
        <button className="btn for-sale" onClick={handleSaleClick}>For sale</button>
        <button className="btn for-rent" onClick={handleRentClick}>To rent</button>
      </div>
    </div>
  );
};

export default SearchBar;