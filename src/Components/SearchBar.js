import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/SearchBar.css';

const SearchBar = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleRentClick = (e) => {
    e.preventDefault();
    if (searchTerm) {
      navigate(`/search?type=rent&location=${searchTerm}`);
    }
  };

  const handleSaleClick = (e) => {
    e.preventDefault();
    if (searchTerm) {
      navigate(`/search?type=sale&location=${searchTerm}`);
    }
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const locations = [
    'Bath', 'NW3', 'Leeds station', 'London', 'Manchester', 'Birmingham', 'Liverpool', 'Bristol', 'Sheffield', 'Glasgow', 'Leicester', 'Edinburgh', 'Leeds', 'Cardiff', 'Coventry', 'Nottingham', 'Newcastle', 'Sunderland', 'Brighton', 'Hull', 'Plymouth', 'Stoke-on-Trent', 'Wolverhampton', 'Derby', 'Swansea', 'Southampton', 'Salford', 'Aberdeen', 'Westminster', 'Portsmouth', 'York', 'Peterborough', 'Dundee', 'Lancaster', 'Oxford', 'Newport', 'Preston', 'St Albans', 'Norwich', 'Chester', 'Cambridge', 'Salisbury', 'Exeter', 'Gloucester', 'Lisburn', 'Chichester', 'Winchester', 'Lichfield', 'Hereford', 'Armagh', 'Wells', 'Stirling', 'Canterbury', 'Londonderry', 'Carlisle', 'Durham', 'Bangor', 'Truro', 'Ripon', 'Newry'
  ];

  return (
    <div className="search-form-container">
      <div className="search-banner">
        <h1>
          <span className="highlight">believe</span> in finding it
        </h1>
        <p>with the UK's largest choice of homes</p>
        <div className="search-box">
          <h3>Search Properties for Sale and Rent</h3>
          <form>
            <input
              type="text"
              placeholder="e.g. Bath, NW3, or Leeds station"
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
            <button className="search-button for-sale" onClick={handleSaleClick}>For sale</button>
            <button className="search-button to-rent" onClick={handleRentClick}>To rent</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;