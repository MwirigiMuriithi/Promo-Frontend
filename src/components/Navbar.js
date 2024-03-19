import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

const Navbar = () => {
  const { logout } = useLogout()
  const { user } = useAuthContext()

  const handleClick = () => {
    logout()
  }
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>PromoPay</h1>
          <h6>Earning Redefined!</h6>
        </Link>
        <nav>
          {user && (
            <div>
              {/* Check if the user is an admin */}
              <span>Hello {user.isAdmin ? `Admin ${user.name}` : `User ${user.name}`}!</span>
              <button onClick={handleClick} className='nav-button'>Log out</button>
            </div>
          )}
          {!user && (
            <div>
              <Link to="/login" className="auths">
                Login
              </Link>
              <Link to="/signup" className="auths">
                Signup
              </Link>
            </div>
          )}
        </nav>
        <div className={`menu-toggle ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
        <nav className={`menu ${menuOpen ? 'open' : ''}`}>
          <ul>
            <li><Link to="/" onClick={closeMenu}>Home</Link></li>
            <li><Link to="/about" onClick={closeMenu}>About</Link></li>
            <li><Link to="/dashboard" onClick={closeMenu}>Dashboard</Link></li>
            <li><Link to="/contact" onClick={closeMenu}>Contact Us</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;

