import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './App.css'; // Import the CSS file
import icon from './mountainviewlogo.PNG'
import { Map, MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk';
import axios from 'axios';
import mountainImage from './mountain.jpg'; // 산 이미지를 import 합니다.



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
          <li style={{ display: 'inline-block' }}><a href="/mountain_info" style={{ textDecoration: 'none', color: 'black' }}>Contact</a></li>
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
          <li style={{ display: 'inline-block' }}><a href="/mountain_info" style={{ textDecoration: 'none', color: 'black' }}>Contact</a></li>
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
          <li style={{ display: 'inline-block' }}><a href="/mountain_info" style={{ textDecoration: 'none', color: 'black' }}>Contact</a></li>
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




function Mountain_info() {
  // 백엔드로부터 산 정보를 받아온다고 가정
  const mountainData = {
    name: "한라산",
    difficulty: "상",
    height: "1,950m",
    trails: [
      {
        name: "성산일출봉 코스",
        distance: "9.6km",
        estimatedTime: "5시간 30분",
        difficulty: "상",
      },
      {
        name: "연화봉 코스",
        distance: "7.4km",
        estimatedTime: "4시간",
        difficulty: "중",
      },
      // 추가적인 등산로 정보
    ],
    features:
      "한라산은 한국에서 가장 높은 산으로, 제주도에 위치해 있습니다. 제주도의 대표적인 관광지 중 하나이며, 산 정상에서는 아름다운 경치를 감상할 수 있습니다.",
    description:
      "한라산은 대한민국에서 가장 높은 산으로, 해발 고도 1950m에 위치해 있습니다. 자연보호구역이 지정되어 있으며, 국가지정자연재해위험지역으로 지정되어 있습니다. 등산로는 여러 코스가 있으며, 산 정상에서는 아름다운 경치를 감상할 수 있습니다.",
    transportation:
      "한라산 국립공원 본부에서 운영하는 산악버스와 택시를 이용할 수 있습니다.",
  };

  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const favoriteButtonStyle = {
    backgroundColor: isFavorite ? "yellow" : "white",
    color: isFavorite ? "black" : "gray",
    borderRadius: "5px",
    border: "2px solid black",
    padding: "10px",
    margin: "10px",
    cursor: "pointer",
    transition: "all 0.2s ease-in-out",
    fontWeight: "bold",
    outline: "none",
  };

  const linkStyle = {
    textDecoration: "none",
    color: "white",
    backgroundColor: "black",
    borderRadius: "5px",
    padding: "10px",
    fontWeight: "bold",
    transition: "all 0.2s ease-in-out",
    outline: "none",
    border: "none",
    marginLeft: "10px",
    cursor: "pointer",
  };

  const trailItemStyle = {
    marginBottom: "20px",
    padding: "20px",
    backgroundColor: "white",
    borderRadius: "10px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
  };

  const contentStyle = {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "50px",
    backgroundColor: "#f2f22",
    borderRadius: "20px",
    boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.3)",
  };

  return (
    <div style={contentStyle}>
      <h1>{mountainData.name}</h1>
      <p>{mountainData.features}</p>
      <h2>등산로</h2>
      {mountainData.trails.map((trail, index) => (
        <div key={index} style={trailItemStyle}>
          <h3>{trail.name}</h3>
          <p>길이: {trail.distance}</p>
          <p>소요 시간: {trail.estimatedTime}</p>
          <p>난이도: {trail.difficulty}</p>
        </div>
      ))}
      <h2>설명</h2>
      <p>{mountainData.description}</p>
      <h2>교통</h2>
      <p>{mountainData.transportation}</p>
      <button style={favoriteButtonStyle} onClick={handleFavorite}>
        {isFavorite ? "즐겨찾기 해제" : "즐겨찾기 추가"}
      </button>
      <Link to="/main" style={linkStyle}>
        다른 산 보러 가기
      </Link>
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
        <Route path="/mountain_info" element={<Mountain_info />} />
      </Routes>
    </Router>
  );
}



export default App;