import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css";
import Header from "../src/components/Header/Header";
import Footer from "../src/components/Footer/Footer";
import Container from "./components/Container/Container";

const Home = (props) => {
  return (
    <div id="wrap">
      <Header/>
        {props.children}
      <section>
        <Container/>
      </section>
      <Footer/>
    </div>
  );
};

function A(){
  
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
