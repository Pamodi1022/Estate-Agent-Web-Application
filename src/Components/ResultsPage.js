import React from 'react'; 
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon
import { faHeart, faShareAlt } from '@fortawesome/free-solid-svg-icons'; // Import required icons
import propertiesData from '../properties.json'; // Import the JSON data
import '../Styles/ResultsPage.css';

const ResultsPage = () => {
  const location = useLocation();
  const { results } = location.state || { results: [] };

  // If results are empty, fall back to propertiesData
  const displayResults = results.length > 0 ? results : propertiesData;

  // Example favourite state for demonstration
  const [favourites, setFavourites] = React.useState([]);

  // Add to favourites handler
  const handleAddToFavourites = (propertyId) => {
    setFavourites((prev) =>
      prev.includes(propertyId)
        ? prev.filter((id) => id !== propertyId)
        : [...prev, propertyId]
    );
  };

  // Function to handle sharing the property URL
  const shareProperty = (propertyUrl) => {
    const shareUrl = propertyUrl || window.location.href; // Use provided URL or current page URL
    if (navigator.share) {
      // Web Share API
      navigator
        .share({
          title: document.title,
          url: shareUrl,
        })
        .then(() => {
          console.log("Thanks for sharing!");
        })
        .catch((error) => {
          console.error("Error sharing", error);
        });
    } else {
      // Fallback for browsers that don't support Web Share API
      const tempInput = document.createElement("input");
      document.body.appendChild(tempInput);
      tempInput.value = shareUrl;
      tempInput.select();
      document.execCommand("copy");
      document.body.removeChild(tempInput);
      alert("URL copied to clipboard");
    }
  };

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
                <a href={property.url} className="view-details">
                  View Details
                </a>
                <div className="icons">
                  <FontAwesomeIcon
                    icon={faHeart}
                    className={`favourite-icon ${favourites.includes(property.id) ? 'active' : ''}`}
                    onClick={() => handleAddToFavourites(property.id)}
                  />
                  <FontAwesomeIcon
                    icon={faShareAlt}
                    className="share-icon"
                    onClick={() => shareProperty(property.url)}
                  />
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
