import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './App.css'; // Import the CSS file
import icon from './mountainviewlogo.PNG'
import { Map, MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk';
import axios from 'axios';



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
      <Map center={{ lat: 37.5665, lng: 126.9780 }} style={{ marginTop: '150px', height: '500px', flex: 1 }}>
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
      <div className="main-text" style={{ display: 'flex', flexDirection: 'column' }}>
        <h1 style={{ fontSize: '8rem', marginBottom: '0' }}>Let's Go</h1>
        <h1 style={{ fontSize: '10rem', marginTop: '0' }}><span>Mountain</span></h1>
      </div>
    </div>
  );
}
function LoginContainer() {
  const [isLoginSuccess, setIsLoginSuccess] = useState(false);

  return <Login isLoginSuccess={isLoginSuccess} setIsLoginSuccess={setIsLoginSuccess} />;
}

const Login = ({ isLoginSuccess, setIsLoginSuccess }) => {
  const REST_API_KEY = '65d7d41f6c724b09645939d238c0b75f'; // 카카오 개발자 사이트에서 발급받은 REST API KEY
  const REDIRECT_URI = 'http://localhost:3000/login'; // 카카오 개발자 사이트에서 등록한 Redirect URI
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const handleLogin = () => {
    axios.get('/auth/kakao')
      .then(res => {
        console.log(res.data);
        setIsLoginSuccess(true); // 로그인 성공 시 상태 변수를 true로 변경
      })
      .catch(err => {
        console.log(err);
        setIsLoginSuccess(false); // 로그인 실패 시 상태 변수를 false로 변경
      })
  }

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
      <div>
        {isLoginSuccess ? ( // 로그인 성공 시 나타날 화면
          <h1 style={{ marginTop: '150px', flex: 1, textAlign: 'center' }}>
            로그인이 완료되었습니다.
          </h1>
        ) : ( // 로그인 실패 시 나타날 화면
          <h1 center={{ lat: 37.5665, lng: 126.9780 }} style={{ marginTop: '150px', flex: 1, textAlign: 'center' }}>
            <a href={KAKAO_AUTH_URL} onClick={handleLogin}>Kakao Login</a>
          </h1>
        )}
      </div>
    </div>
  )
};

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