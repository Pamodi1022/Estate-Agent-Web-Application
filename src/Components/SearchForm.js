import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import propertiesData from '../properties.json';
import '../Styles/SearchForm.css';

const SearchForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get('type');
  const area = queryParams.get('Area');

  const [formData, setFormData] = useState({
    searchRadius: 'This area only',
    propertyType: 'Any',
    priceMin: '',
    priceMax: '',
    bedroomsMin: '',
    bedroomsMax: '',
    addedToSite: 'Anytime',
    includeLetAgreed: false,
  });

  const [filteredProperties, setFilteredProperties] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Initial filtering based on `type` and `Area`
    const initialFilteredProperties = propertiesData.properties.filter((property) => {
      const matchesType =
        !type || (property.search && property.search.toLowerCase() === type.toLowerCase());
      const matchesArea =
        !area || (property.Area && property.Area.toLowerCase() === area.toLowerCase());
  
      return matchesType && matchesArea;
    });
  
    setFilteredProperties(initialFilteredProperties);
  }, [type, area]);
  

  const validate = () => {
    const newErrors = {};

    if (formData.priceMin && formData.priceMax && Number(formData.priceMin) > Number(formData.priceMax)) {
      newErrors.priceRange = 'Minimum price cannot be greater than maximum price.';
    }

    if (formData.priceMin && Number(formData.priceMin) <= 0) {
      newErrors.priceMin = 'Minimum price must be greater than 0.';
    }

    if (formData.priceMax && Number(formData.priceMax) <= 0) {
      newErrors.priceMax = 'Maximum price must be greater than 0.';
    }

    if (formData.bedroomsMin && formData.bedroomsMax && Number(formData.bedroomsMin) > Number(formData.bedroomsMax)) {
      newErrors.bedrooms = 'Minimum bedrooms cannot be greater than maximum bedrooms.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (validate()) {
      const furtherFiltered = filteredProperties.filter((property) => {
        const matchesSearchType = type === 'any' || property.search === type;
        const matchesPropertyType =
          formData.propertyType === 'Any' || property.type === formData.propertyType;
  
        const matchesPrice =
          (!formData.priceMin || property.price >= Number(formData.priceMin)) &&
          (!formData.priceMax || property.price <= Number(formData.priceMax));
  
        const matchesBedrooms =
          (!formData.bedroomsMin || property.bedrooms >= Number(formData.bedroomsMin)) &&
          (!formData.bedroomsMax || property.bedrooms <= Number(formData.bedroomsMax));
  
        const matchesAddedToSite =
          formData.addedToSite === 'Anytime' || checkDateMatch(property.added);
  
        return matchesSearchType && matchesPropertyType && matchesPrice && matchesBedrooms && matchesAddedToSite;
      });
  
      navigate('/result', { state: { results: furtherFiltered } });
    }
  };
  

  const checkDateMatch = (added) => {
    const currentDate = new Date();
    const propertyDate = new Date(`${added.month} ${added.day}, ${added.year}`);
    const timeDiff = (currentDate - propertyDate) / (1000 * 3600 * 24); // Convert to days

    switch (formData.addedToSite) {
      case 'Last 24 hours':
        return timeDiff <= 1;
      case 'Last 3 days':
        return timeDiff <= 3;
      case 'Last 7 days':
        return timeDiff <= 7;
      case 'Last 14 days':
        return timeDiff <= 14;
      default:
        return true;
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const generatePriceOptions = () => {
    const options = [];
    for (let i = 500; i <= 10000; i += 500) {
      options.push(<option key={i} value={i}>€{i.toLocaleString()}</option>);
    }
    return options;
  };

  return (
    <div className="container">
      <h2>Properties to {type === 'rent' ? 'rent' : 'buy'} in Bathgate, West Lothian</h2>
      <form onSubmit={handleSubmit} className="search-form">
        <div className="form-group">
          <label htmlFor="searchRadius">Search Radius:</label>
          <select name="searchRadius" id="searchRadius" value={formData.searchRadius} onChange={handleChange}>
            <option value="This area only">This area only</option>
            <option value="1 mile">1 mile</option>
            <option value="5 miles">5 miles</option>
            <option value="10 miles">10 miles</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="propertyType">Property Type:</label>
          <select name="propertyType" id="propertyType" value={formData.propertyType} onChange={handleChange}>
            <option value="Any">Any</option>
            <option value="House">House</option>
            <option value="Flat">Flat</option>
            <option value="Bungalow">Bungalow</option>
          </select>
        </div>

        <div className="form-group">
          <label>Price range (€)</label>
          <div className="price-range">
            <select
              name="priceMin"
              value={formData.priceMin}
              onChange={handleChange}
            >
              <option value="">Min Price</option>
              {generatePriceOptions()}
            </select>
            <select
              name="priceMax"
              value={formData.priceMax}
              onChange={handleChange}
            >
              <option value="">Max Price</option>
              {generatePriceOptions()}
            </select>
            {errors.priceRange && <span className="error">{errors.priceRange}</span>}
          </div>
        </div>

        <div className="form-group">
          <label>No. of bedrooms</label>
          <div className="bedrooms-range">
            <input
              type="number"
              name="bedroomsMin"
              placeholder="Min No"
              value={formData.bedroomsMin}
              onChange={handleChange}
            />
            <span> - </span>
            <input
              type="number"
              name="bedroomsMax"
              placeholder="Max No"
              value={formData.bedroomsMax}
              onChange={handleChange}
            />
            {errors.bedrooms && <span className="error">{errors.bedrooms}</span>}
          </div>
        </div>

        <div className="form-group">
          <label>Added to site</label>
          <select name="addedToSite" value={formData.addedToSite} onChange={handleChange}>
            <option value="Anytime">Anytime</option>
            <option value="Last 24 hours">Last 24 hours</option>
            <option value="Last 3 days">Last 3 days</option>
            <option value="Last 7 days">Last 7 days</option>
            <option value="Last 14 days">Last 14 days</option>
          </select>
        </div>

        <div className="form-group">
          <label>
            <input
              type="checkbox"
              name="includeLetAgreed"
              checked={formData.includeLetAgreed}
              onChange={handleChange}
            />
            Include Let Agreed
          </label>
        </div>

        {errors.priceRange && <p className="error">{errors.priceRange}</p>}
        {errors.bedrooms && <p className="error">{errors.bedrooms}</p>}

        <button type="submit" className="btnt">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchForm;
