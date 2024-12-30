import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../Styles/SearchBar.css";

const SearchBar = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleRentClick = (e) => {
    e.preventDefault();
    if (searchTerm) {
      navigate(`/searchform?type=rent&location=${searchTerm}`);
    }
  };

  const handleSaleClick = (e) => {
    e.preventDefault();
    if (searchTerm) {
      navigate(`/searchform?type=sale&location=${searchTerm}`);
    }
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const locations = [
    'Bath', 'NW3', 'Leeds station', 'London', 'Manchester', 'Birmingham', 'Liverpool', 'Bristol', 'Sheffield', 'Glasgow', 'Leicester', 'Edinburgh', 'Leeds', 'Cardiff', 'Coventry', 'Nottingham', 'Newcastle', 'Sunderland', 'Brighton', 'Hull', 'Plymouth', 'Stoke-on-Trent', 'Wolverhampton', 'Derby', 'Swansea', 'Southampton', 'Salford', 'Aberdeen', 'Westminster', 'Portsmouth', 'York', 'Peterborough', 'Dundee', 'Lancaster', 'Oxford', 'Newport', 'Preston', 'St Albans', 'Norwich', 'Chester', 'Cambridge', 'Salisbury', 'Exeter', 'Gloucester', 'Lisburn', 'Chichester', 'Winchester', 'Lichfield', 'Hereford', 'Armagh', 'Wells', 'Stirling', 'Canterbury', 'Londonderry', 'Carlisle', 'Durham', 'Bangor', 'Truro', 'Ripon', 'Newry'
  ];

  
  return (
    <div className="barcontainer">
      <h1 className="title">
        DREAMING OF YOUR PERFECT HOME ?<span className="highlight"><br></br>START YOUR SEARCH HERE!</span>
      </h1>
      <h3 className="subtitle">" Find your perfect space with ease! Whether you’re looking for a cozy apartment, a family home, or the ideal commercial property, our search page offers a curated selection tailored to your needs. <br></br>Explore detailed listings with high-quality photos, key features, and up-to-date pricing. Filter by location, budget, size, and amenities to discover the property that fits your lifestyle. Your dream home or business space is just a few clicks away! "</h3>
      
      <div className="search-bar">
        <input
          type="text"
          placeholder="e.g. Bath, NW3 or Leeds station"
          className="search-input"
          list="locations"
              value={searchTerm}
              onChange={handleInputChange}
              required
        />
        <datalist id="locations">
          {locations.map((location, index) => (
          <option key={index} value={location} />
        ))}
        </datalist>

      </div>
      <div className="buttons">
          <button className="btn for-sale" onClick={handleSaleClick}> For sale</button>
          <button className="btn for-rent" onClick={handleRentClick}>To rent</button>
      </div>  
    </div>
  );
};

export default SearchBar;
