// Footer.js

import React from 'react';
import './Footer.css'; // Make sure to create a corresponding CSS file for styling

const Footer = () => {
  return (
    <footer className="footer" id='footer'>
      <div className="footer-content">
        <div className="footer-section about">
          <h3>About Us</h3>
          <p>We are a team dedicated to providing the best service.Our mission is to happy our customers...</p>
        </div>
        <div className="footer-section links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a >About Us</a></li>
            <li><a >Services</a></li>
            <li><a >Contact Us</a></li>
          </ul>
        </div>
        <div className="footer-section contact-form">
          <h3>Contact Us</h3>
          <form>
            <input type="email" name="email" placeholder="Your email address" />
            <textarea name="message" placeholder="Your message"></textarea>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2024 My Awesome Company | All rights reserved | <a href="/terms">Terms of Service</a> | <a href="/privacy">Privacy Policy</a></p>
      </div>
    </footer>
  );
};

export default Footer;
