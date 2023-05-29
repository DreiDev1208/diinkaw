import React from 'react';
import Navbar from './Navbar';
import Map from './Map';
import './Main.css';

const App = () => {
  return (
    <div className="app-container">
      <div className="navbar-container">
        <Navbar />
      </div>
      <div className="map-container">
        <Map />
      </div>
    </div>
  );
};

export default App;
