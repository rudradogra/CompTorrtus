import React from 'react'
import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      {/* Top Features Section */}
      <div className="footer-features">
        <div className="feature-item">
          <div className="feature-icon">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <path d="M8 34h32v4H8v-4zm0-8h32v4H8v-4zm0-8h32v4H8v-4z" fill="#f39c12"/>
              <rect x="4" y="10" width="40" height="28" rx="4" stroke="#f39c12" strokeWidth="2" fill="none"/>
              <circle cx="12" cy="16" r="2" fill="#f39c12"/>
            </svg>
          </div>
          <div className="feature-content">
            <h3>Free Shipping.</h3>
            <p>Across india</p>
          </div>
        </div>

        <div className="feature-item">
          <div className="feature-icon">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <circle cx="24" cy="24" r="18" stroke="#f39c12" strokeWidth="2" fill="none"/>
              <path d="M24 12v12l8 8" stroke="#f39c12" strokeWidth="2"/>
              <circle cx="32" cy="16" r="4" fill="#f39c12"/>
            </svg>
          </div>
          <div className="feature-content">
            <h3>Customer Support</h3>
            <p>Expert is here to help</p>
          </div>
        </div>

        <div className="feature-item">
          <div className="feature-icon">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <rect x="8" y="12" width="32" height="24" rx="4" stroke="#f39c12" strokeWidth="2" fill="none"/>
              <path d="M16 12v-4a4 4 0 018 0v4M24 24v4" stroke="#f39c12" strokeWidth="2"/>
              <circle cx="24" cy="20" r="2" fill="#f39c12"/>
            </svg>
          </div>
          <div className="feature-content">
            <h3>Online Payment.</h3>
            <p>100% Secure & shop with confidence</p>
          </div>
        </div>

        <div className="feature-item">
          <div className="feature-icon">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <path d="M8 16l16-8 16 8v16l-16 8-16-8V16z" stroke="#f39c12" strokeWidth="2" fill="none"/>
              <path d="M8 16l16 8 16-8M24 24v16" stroke="#f39c12" strokeWidth="2"/>
              <circle cx="36" cy="12" r="4" fill="#f39c12"/>
            </svg>
          </div>
          <div className="feature-content">
            <h3>Fast Delivery.</h3>
            <p>Fast & reliable delivery options</p>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="footer-main">
        <div className="footer-container">
          {/* About Section */}
          <div className="footer-section">
            <h4>About</h4>
            <ul>
              <li><a href="#about-us">About Us</a></li>
              <li><a href="#bank-details">Bank Details</a></li>
              <li><a href="#contact-us">Contact Us</a></li>
              <li><a href="#our-presence">Our Presence</a></li>
            </ul>
          </div>

          {/* Information Section */}
          <div className="footer-section">
            <h4>Information</h4>
            <ul>
              <li><a href="#offer-zone">Offer Zone</a></li>
              <li><a href="#brands">Brands</a></li>
              <li><a href="#faq">FAQ</a></li>
              <li><a href="#gift-cards">Gift Cards</a></li>
            </ul>
          </div>

          {/* Account Section */}
          <div className="footer-section">
            <h4>Account</h4>
            <ul>
              <li><a href="#my-account">My Account</a></li>
              <li><a href="#order-history">Order History</a></li>
              <li><a href="#track-order">Track Order</a></li>
              <li><a href="#wish-list">Wish List</a></li>
            </ul>
          </div>

          {/* Policy Section */}
          <div className="footer-section">
            <h4>Policy</h4>
            <ul>
              <li><a href="#privacy-policy">Privacy Policy</a></li>
              <li><a href="#refund-policy">Refund Policy</a></li>
              <li><a href="#shipping-policy">Shipping Policy</a></li>
              <li><a href="#terms-conditions">Terms & Conditions</a></li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="footer-section contact-section">
            <h4>Contact Us:</h4>
            <div className="contact-info">
              <p>Email: info@techstore.com</p>
              <p>Whatsapp: 91234567890</p>
              <p>Phone No: 033-40-550-550</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="footer-bottom">
        <div className="footer-bottom-container">
          {/* Payment Methods */}
          <div className="payment-section">
            <h5>Payment System:</h5>
            <div className="payment-methods">
              <div className="payment-icon bank">
                <span>🏦</span>
              </div>
              <div className="payment-icon upi">
                <span>UPI</span>
              </div>
              <div className="payment-icon visa">
                <span>VISA</span>
              </div>
              <div className="payment-icon rupay">
                <span>RuPay</span>
              </div>
              <div className="payment-icon mastercard">
                <span>MC</span>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="social-section">
            <h5>Our Social Links:</h5>
            <div className="social-links">
              <a href="#facebook" className="social-link facebook">
                <span>📘</span>
              </a>
              <a href="#instagram" className="social-link instagram">
                <span>📷</span>
              </a>
              <a href="#youtube" className="social-link youtube">
                <span>📺</span>
              </a>
              <a href="#whatsapp" className="social-link whatsapp">
                <span>💬</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer