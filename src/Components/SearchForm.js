import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../Styles/SearchForm.css';

const SearchForm = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get('type');

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

    if (formData.bedroomsMin && Number(formData.bedroomsMin) <= 0) {
      newErrors.bedroomsMin = 'Minimum bedrooms must be greater than 0.';
    }

    if (formData.bedroomsMax && Number(formData.bedroomsMax) <= 0) {
      newErrors.bedroomsMax = 'Maximum bedrooms must be greater than 0.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Submit form data
      console.log('Form submitted:', formData);
    }
  };

  const generatePriceOptions = () => {
    const rentOptions = [
      { value: '500', label: 'Below 500 €' },
      { value: '1000', label: 'Below 1000 €' },
      { value: '2000', label: 'Below 2000 €' },
      { value: '5000', label: 'Below 5000 €' },
      { value: '5001', label: 'Above 5000 €' },
    ];

    const saleOptions = [
      { value: '100000', label: 'Below 100,000 €' },
      { value: '500000', label: 'Below 500,000 €' },
      { value: '1000000', label: 'Below 1,000,000 €' },
      { value: '1000001', label: 'Above 1,000,000 €' },
    ];

    const options = type === 'rent' ? rentOptions : saleOptions;

    return options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <h2>Properties to {type === 'rent' ? 'rent' : 'buy'} in Bathgate, West Lothian</h2>

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

      <button type="submit">Search</button>
    </form>
  );
};

export default SearchForm;