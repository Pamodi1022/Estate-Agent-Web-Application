import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Navbar.css';
import logo from './logo.png';

const Navbar = () => {
  const [menuActive, setMenuActive] = useState(false);

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  return (
    <div className="navbar">
      <div className="logo-container">
        <Link to="/" onClick={() => setMenuActive(false)}>
          <img src={logo} alt="Logo" className="logo-img" />
        </Link>
      </div>
      <button className="menu-toggle" onClick={toggleMenu}>
        ☰
      </button>
      <ul className={menuActive ? 'active' : ''}>
        <li>
          <Link to="/search" onClick={() => setMenuActive(false)}>Search</Link>
        </li>
        <li>
          <Link to="/ads" onClick={() => setMenuActive(false)}>Advertisements</Link>
        </li>
        <li>
          <Link to="/signup" onClick={() => setMenuActive(false)}>Sign up</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;