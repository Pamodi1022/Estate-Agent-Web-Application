import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../Styles/SearchForm.css';

const SearchForm = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const type = queryParams.get('type');


  const [formData, setFormData] = useState({
    searchRadius: "This area only",
    propertyType: "Any",
    priceMin: "",
    priceMax: "",
    bedroomsMin: "",
    bedroomsMax: "",
    addedToSite: "Anytime",
    includeLetAgreed: false,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Adjust form data based on the type (rent or sale)
    if (type === 'rent') {
      setFormData((prevData) => ({
        ...prevData,
        propertyType: 'Rent',
      }));
    } else if (type === 'sale') {
      setFormData((prevData) => ({
        ...prevData,
        propertyType: 'Sale',
      }));
    }
  }, [type]);

  const validate = () => {
    const newErrors = {};

    if (formData.priceMin && formData.priceMax && Number(formData.priceMin) > Number(formData.priceMax)) {
      newErrors.priceRange = "Minimum price cannot be greater than maximum price.";
    }

    if (formData.bedroomsMin && formData.bedroomsMax && Number(formData.bedroomsMin) > Number(formData.bedroomsMax)) {
      newErrors.bedrooms = "Minimum bedrooms cannot be greater than maximum bedrooms.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      console.log("Form submitted:", formData);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <h2>Properties to rent in Bathgate, West Lothian</h2>

      <div className="form-group">
        <label>Search radius</label>
        <select name="searchRadius" value={formData.searchRadius} onChange={handleChange}>
          <option value="This area only">This area only</option>
          <option value="Within 1 mile">Within 1 mile</option>
          <option value="Within 5 miles">Within 5 miles</option>
          <option value="Within 10 miles">Within 10 miles</option>
        </select>
      </div>

      <div className="form-group">
        <label>Property types</label>
        <select name="propertyType" value={formData.propertyType} onChange={handleChange}>
          <option value="Any">Any</option>
          <option value="Houses">Houses</option>
          <option value="Flats">Flats</option>
          <option value="Bungalows">Bungalows</option>
        </select>
      </div>

      <div className="form-group">
        <label>Price range (£)</label>
        <input
          type="number"
          name="priceMin"
          placeholder="No min"
          value={formData.priceMin}
          onChange={handleChange}
        />
        <span> - </span>
        <input
          type="number"
          name="priceMax"
          placeholder="No max"
          value={formData.priceMax}
          onChange={handleChange}
        />
        {errors.priceRange && <span className="error">{errors.priceRange}</span>}
      </div>

      <div className="form-group">
        <label>No. of bedrooms</label>
        <input
          type="number"
          name="bedroomsMin"
          placeholder="No min"
          value={formData.bedroomsMin}
          onChange={handleChange}
        />
        <span> - </span>
        <input
          type="number"
          name="bedroomsMax"
          placeholder="No max"
          value={formData.bedroomsMax}
          onChange={handleChange}
        />
        {errors.bedrooms && <span className="error">{errors.bedrooms}</span>}
      </div>

      <div className="form-group">
        <label>Added to site</label>
        <select name="addedToSite" value={formData.addedToSite} onChange={handleChange}>
          <option value="Anytime">Anytime</option>
          <option value="Last 24 hours">Last 24 hours</option>
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
          Include Let Agreed properties
        </label>
      </div>

      <button type="submit" className="search-btn">
        Search properties
      </button>
    </form>
  );
};

export default SearchForm;
