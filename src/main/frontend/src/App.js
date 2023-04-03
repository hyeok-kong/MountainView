import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'; // Import the CSS file
import icon from './mountainviewlogo.PNG'
import { Map, MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk';

function Main() {
  const [markerPosition, setMarkerPosition] = useState({ lat: 37.5665, lng: 126.9780 });
  const [overlayPosition, setOverlayPosition] = useState({ lat: 37.5665, lng: 126.9780 });
  const [overlayVisibility, setOverlayVisibility] = useState(false);

  const handleMarkerClick = () => {
    setOverlayVisibility(true);
  };

  const handleOverlayCloseClick = () => {
    setOverlayVisibility(false);
  };

  return (
    <div className="home-page" style={{ backgroundColor: '#f2f2f2' }}>
      <div className="logo" style={{ textAlign: 'center' }}>
        <img className="logo-img" src={icon} alt="Logo Image" style={{ width: '150px' }} />
      </div>
      <div className="menu" style={{ textAlign: 'center', marginTop: '50px' }}>
        <ul style={{ listStyle: 'none', display: 'inline-block', padding: '0' }}>
          <li style={{ display: 'inline-block', marginRight: '20px' }}><a href="/" style={{ textDecoration: 'none', color: 'black' }}>Home</a></li>
          <li style={{ display: 'inline-block', marginRight: '20px' }}><a href="/login" style={{ textDecoration: 'none', color: 'black' }}>Login</a></li>
          <li style={{ display: 'inline-block', marginRight: '20px' }}><a href="/main" style={{ textDecoration: 'none', color: 'black' }}>Services</a></li>
          <li style={{ display: 'inline-block' }}><a href="#" style={{ textDecoration: 'none', color: 'black' }}>Contact</a></li>
        </ul>
      </div>
      <Map center={{ lat: 37.5665, lng: 126.9780 }} style={{ marginTop:'150px', height: '500px', flex: 1  }}>
        <MapMarker position={markerPosition} onClick={handleMarkerClick} />
        <CustomOverlayMap
          position={overlayPosition}
          visible={overlayVisibility}
          onClick={handleOverlayCloseClick}
        >
          <div style={{ backgroundColor: 'white', padding: '10px', border: '1px solid black' }}>
            <p>Hiking Trail Information</p>
            <p>Difficulty: Medium</p>
            <p>Length: 5km</p>
          </div>
        </CustomOverlayMap>
      </Map>
    </div>
  );
}
function Home() {
  return (
    <div className="home-page">
      <div className="logo">
        <img className="logo-img" src={icon} alt="로고 이미지" />
      </div>
      <div className="main-text">
        <h1>Let's Go</h1>
        <h1><span>Mountain</span></h1>
      </div>
      <div className="menu">
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/login">Login</a></li>
          <li><a href="/main">Services</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </div>
    </div>
  );
}
function Login() {
  const [message, setMessage] = useState("");
  useEffect(() => {
    fetch('/api/hello')
      .then(response => response.text())
      .then(message => {
        setMessage(message);
      });
  }, []);
  return (
    <div>
      <h2>Login Page</h2>
      <p>{message}</p>
    </div>
  );
}
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/main" element={<Main />} />
      </Routes>
    </Router>
  );
}

export default App;
