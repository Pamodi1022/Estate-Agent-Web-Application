import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
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
        <h1 className="logo-text">QuickNest</h1>
      </div>
      <button className="menu-toggle" onClick={toggleMenu}>
        ☰
      </button>
      <ul className={menuActive ? 'active' : ''}>
        <li>
          <Link to="/signup" onClick={() => setMenuActive(false)}>Sign up</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;