import React from 'react'; 
import { useLocation } from 'react-router-dom';
import propertiesData from '../properties.json'; // Import the JSON data
import '../Styles/ResultsPage.css';

const ResultsPage = () => {
  const location = useLocation();
  const { results } = location.state || { results: [] };

  // If results are empty, fall back to propertiesData
  const displayResults = results.length > 0 ? results : propertiesData;

  return (
    <div className="results-container">
      <h2>Search Results</h2>
      {displayResults.length > 0 ? (
        <div className="property-list">
          {displayResults.map((property, index) => (
            <div key={index} className="property-card">
              <img
                src={property.picture} // Assuming the 'picture' field contains the image URL
                alt={property.description || property.location}
                className="property-image"
              />
              <div className="property-info">
                <h3>{property.location}</h3>
                <p className="property-description">{property.description}</p>
                <div className="property-details">
                  <p><strong>Type:</strong> {property.type}</p>
                  <p><strong>Price:</strong> €{property.price}</p>
                  <p><strong>Bedrooms:</strong> {property.bedrooms}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No properties match your search criteria.</p>
      )}
    </div>
  );
};

export default ResultsPage;
