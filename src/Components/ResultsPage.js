import React from 'react';
import { useLocation } from 'react-router-dom';
import '../Styles/ResultsPage.css';

const ResultsPage = () => {
  const location = useLocation();
  const { results } = location.state || { results: [] };

  return (
    <div className="results-container">
      <h2>Search Results</h2>
      {results.length > 0 ? (
        <div className="property-list">
          {results.map((property, index) => (
            <div key={index} className="property-card">
              <h3>{property.description || property.location}</h3> {/* Change this line */}
              <p>Type: {property.type}</p>
              <p>Price: €{property.price}</p>
              <p>Bedrooms: {property.bedrooms}</p>
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
