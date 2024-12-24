// HomePage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/Home.css'; // Add your CSS file for styling
import back from '../Components/back.png'; // Import the image

const HomePage = () => {
  const navigate = useNavigate();

  const handleArrowClick = () => {
    navigate('/search'); // Navigate to the search page when the arrow is clicked
  };

  return (
    <div className="home-page-container">
      <div className="image-container">
        <img src={back} alt="Banner" className="home-image" />
        <div className="arrow-container" onClick={handleArrowClick}>
          <span className="arrow">&#8594;</span> {/* You can use an arrow icon here */}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
