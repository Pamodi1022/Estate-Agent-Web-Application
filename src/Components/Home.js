import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/Home.css'; // Add your CSS file for styling

const HomePage = () => {
  const navigate = useNavigate();

  const handleArrowClick = () => {
    navigate('/search'); // Navigate to the search page when the arrow is clicked
  };

  return (
    <div className="home-page-container">
      <div className="text-container">
        <h1 className="home-title">Real Estate</h1>
        <h1 className="home">Agency</h1><br />
        <p className="home-description">
          Discover your perfect home with us - your ultimate destination for comfort and convenience. Whether you're searching for a cozy apartment, a spacious family home, or a luxurious retreat, we offer a curated selection of properties designed to meet your unique lifestyle. Let us help you find a place where you can truly feel at home.
        </p>
      </div>
      
      <div className="circle-container"></div>

      <div className="image-container">
        <img src="/images/background.png" alt="Banner" className="home-image" />
          <div className="arrow-container" onClick={handleArrowClick}>
            <span className="arrows">&#8594;</span> {/* You can use an arrow icon here */}
          </div>
      </div>
    </div>
  );
};

export default HomePage;
