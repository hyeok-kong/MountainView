import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

function Home() {
  return (
    <div>
      <div className="logo">
        <img id="mountainimg" src="mountainviewlogo.PNG" alt="로고 이미지" />
      </div>
      <div className="main-text">
        <h1>Let's Go</h1>
        <h1><span>Mountain</span></h1>
      </div>
      <div className="menu">
        <ul>
          <li><a href="/Home">Home</a></li>
          <li><a href="/login">Login</a></li>
          <li><a href="#">Services</a></li>
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
      </Routes>
    </Router>
  );
}

export default App;
