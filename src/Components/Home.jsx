// src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';


function Home() {
  return (
    <div>
      <h1>Welcome to Swiggy</h1>
      <p>Your favorite food delivered to your doorstep!</p>
      
      {/* Navigation Links */}
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/restaurant-list">Restaurant List</Link></li>
          <li><Link to="/cart">Cart</Link></li>
          <li><Link to="/checkout">Checkout</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Register</Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default Home;

