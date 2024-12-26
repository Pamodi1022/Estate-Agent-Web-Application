import React from "react";
import propertiesData from "../properties.json";
import "../Styles/Properties.css";

function PropertyList() {
  return (
    <div className="property-list">
      {propertiesData.properties.map((property) => (
        <div key={property.id} className="property-card">
          <img src={property.picture} alt={property.type} className="property-image" />
          <div className="property-info">
            <h3>{property.location}</h3>
            <p>Price: £{property.price.toLocaleString()}</p>
            <p>Type: {property.type}</p>
            <a href={property.url} target="_blank" rel="noopener noreferrer" className="view-details">
              View Details
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PropertyList;
