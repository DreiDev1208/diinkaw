import React, { useState, useEffect } from 'react';
import { FaUserCircle, FaBars } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 420);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const toggleAccountMenu = () => {
    setShowAccountMenu(!showAccountMenu);
  };

  const closeAccountMenu = () => {
    setShowAccountMenu(false);
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm('Are you sure you want to logout?');
    if (confirmLogout) {
      navigate('/');
    }
  };

  const handleAccountSettings = () => {
    navigate('/settings');
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        {isMobile && (
          <FaBars className="burger-icon" onClick={toggleSidebar} />
        )}
        {!isMobile && (
          <ul className="navigation">
            <li>Public</li>
            <li>Group</li>
            <li>Friends</li>
          </ul>
        )}
      </div>
      <div className="navbar-right">
        <div
          className="account-menu-wrapper"
          onMouseEnter={toggleAccountMenu}
          onMouseLeave={closeAccountMenu}
          onClick={toggleAccountMenu}
        >
          <FaUserCircle className="profile-icon" />
          {showAccountMenu && (
            <div className="account-menu">
              <ul className="navigation">
                <li className='settings' onClick={handleAccountSettings}>Account Settings</li>
                <li>
                  <button className='logout' onClick={handleLogout}>Logout</button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      {isMobile && showSidebar && (
        <div className="navbar-menu">
          <ul className="navigation">
            <li>Public</li>
            <li>Group</li>
            <li>Friends</li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
