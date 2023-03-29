import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetch('/api/hello')
            .then(response => response.text())
            .then(message => {
                setMessage(message);
            });
    },[])
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
            <li><a href="index0.html">Home</a></li>
            <li><a href="login.html">Login</a></li>
            <li><a href="#">Services</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>
      </div>
    );
}

export default App;
