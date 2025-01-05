import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import propertiesData from '../properties.json';
import { TextField, Select, MenuItem, InputLabel, FormControl, Checkbox, FormControlLabel, Button, Grid, FormHelperText } from '@mui/material';
import '../Styles/SearchForm.css';

const SearchForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get('type');
  const area = queryParams.get('Area');  // Extract the Area parameter from the URL

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
    let minPrice = type === 'rent' ? 500 : 50000;  // Rent starts from 500, sale starts from 50,000
    let step = type === 'rent' ? 1000 : 50000;     // Rent steps by 1000, sale steps by 50,000
    let maxPrice = type === 'rent' ? 10000 : 1000000;  // Max price for rent is 10,000, for sale is 1,000,000
    
    for (let i = minPrice; i <= maxPrice; i += step) {
      options.push(<MenuItem key={i} value={i}>€{i.toLocaleString()}</MenuItem>);
    }
    
    return options;
  };
  
  
  

  return (
    <div className="container">
      <h2>Properties to {type === 'rent' ? 'rent' : 'buy'} in {area ? area : 'Bathgate, West Lothian'}</h2> {/* Dynamically display area */}
      <form onSubmit={handleSubmit} className="search-form">
        <Grid container spacing={2}>
          {/* Search Radius Select */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Search Radius</InputLabel>
              <Select
                name="searchRadius"
                value={formData.searchRadius}
                onChange={handleChange}
                label="Search Radius"
              >
                <MenuItem value="This area only">This area only</MenuItem>
                <MenuItem value="1 mile">1 mile</MenuItem>
                <MenuItem value="5 miles">5 miles</MenuItem>
                <MenuItem value="10 miles">10 miles</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Property Type Select */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Property Type</InputLabel>
              <Select
                name="propertyType"
                value={formData.propertyType}
                onChange={handleChange}
                label="Property Type"
              >
                <MenuItem value="Any">Any</MenuItem>
                <MenuItem value="House">House</MenuItem>
                <MenuItem value="Flat">Flat</MenuItem>
                <MenuItem value="Bungalow">Bungalow</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Price Range Select */}
          <Grid item xs={12} sm={6}>
            <div className="price-range">
              <FormControl fullWidth>
                <InputLabel>Min Price (€)</InputLabel>
                <Select
                  name="priceMin"
                  value={formData.priceMin}
                  onChange={handleChange}
                  label="Min Price"
                >
                  <MenuItem value="">Min Price</MenuItem>
                  {generatePriceOptions()}
                </Select>
              </FormControl>
            </div>
          </Grid>

          <Grid item xs={12} sm={6}>
            <div className="price-range">
              <FormControl fullWidth>
                <InputLabel>Max Price (€)</InputLabel>
                <Select
                  name="priceMax"
                  value={formData.priceMax}
                  onChange={handleChange}
                  label="Max Price"
                >
                  <MenuItem value="">Max Price</MenuItem>
                  {generatePriceOptions()}
                </Select>
              </FormControl>
            </div>
          </Grid>

          {/* Bedrooms Range */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Min Bedrooms"
              type="number"
              name="bedroomsMin"
              value={formData.bedroomsMin}
              onChange={handleChange}
              error={!!errors.bedrooms}
              helperText={errors.bedrooms}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Max Bedrooms"
              type="number"
              name="bedroomsMax"
              value={formData.bedroomsMax}
              onChange={handleChange}
              error={!!errors.bedrooms}
              helperText={errors.bedrooms}
            />
          </Grid>

          {/* Added to Site Select */}
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Added to site</InputLabel>
              <Select
                name="addedToSite"
                value={formData.addedToSite}
                onChange={handleChange}
                label="Added to site"
              >
                <MenuItem value="Anytime">Anytime</MenuItem>
                <MenuItem value="Last 24 hours">Last 24 hours</MenuItem>
                <MenuItem value="Last 3 days">Last 3 days</MenuItem>
                <MenuItem value="Last 7 days">Last 7 days</MenuItem>
                <MenuItem value="Last 14 days">Last 14 days</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Include Let Agreed Checkbox */}
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  name="includeLetAgreed"
                  checked={formData.includeLetAgreed}
                  onChange={handleChange}
                />
              }
              label="Include Let Agreed"
            />
          </Grid>
          
          {/* Submit Button */}
          <Grid item xs={12}>
            <Button type="submit" fullWidth variant="contained" color="primary">
              Search
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default SearchForm;
