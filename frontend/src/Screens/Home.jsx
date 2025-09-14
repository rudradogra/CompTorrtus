import { useState } from 'react'
import './Home.css'

function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="Home">
      {/* Navigation Bar */}
      <nav className="navbar">
        {/* Social Media Icons */}
        <div className="social-icons">
          <a href="#" aria-label="Facebook">📘</a>
          <a href="#" aria-label="Instagram">📷</a>
          <a href="#" aria-label="YouTube">📺</a>
          <a href="#" aria-label="WhatsApp">💬</a>
        </div>

        {/* Top Bar with Contact Info */}
        <div className="top-bar">
          <div className="contact-info">
            <span>CONTACT US</span>
            <span>AFFILIATE</span>
          </div>
        </div>
      </nav>

      {/* Main Header */}
      <header className="main-header">
        <div className="header-container">
          {/* Logo */}
          <div className="logo">
            <span className="logo-text">techstore<span className="logo-highlight">.com</span></span>
          </div>

          {/* Search Bar */}
          <div className="search-container">
            <input 
              type="text" 
              placeholder="Search" 
              className="search-input"
            />
            <button className="search-button">🔍</button>
          </div>

          {/* Contact Info */}
          <div className="header-contact">
            <div className="phone-info">
              <span>📞</span>
              <div>
                <div>Call Us : <strong>1234567890</strong></div>
                <div>Email: info@techstore.com</div>
              </div>
            </div>
            <div className="cart-info">
              <span>₹0</span>
              <span>Items (0)</span>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="main-nav">
          <div className="nav-container">
            {/* Categories Menu */}
            <div className="categories-menu">
              <button 
                className="categories-btn"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                ☰ CATEGORIES
              </button>
            </div>

            {/* Navigation Links */}
            <div className="nav-links">
              <a href="#" className="nav-link">GAMING GEARS</a>
              <a href="#" className="nav-link">STORE</a>
              <a href="#" className="nav-link">BUILD YOUR PC</a>
              <a href="#" className="nav-link">MERCHANDISE</a>
            </div>

            {/* Right Side Navigation */}
            <div className="nav-right">
              <a href="#" className="nav-link">LOGIN / REGISTER</a>
              <a href="#" className="nav-link">❤️ 0 WISHLIST</a>
              <a href="#" className="nav-link">⚖️ 0 COMPARE</a>
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="breadcrumb">
        <div className="breadcrumb-container">
          <a href="#" className="breadcrumb-link">🏠</a>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">PRE BUILD PC</span>
        </div>
      </div>

      {/* Main Content */}
      <main className="main-content">
        <div className="container">
          <h1>Welcome to TechStore</h1>
          <p>Your one-stop destination for all tech needs!</p>
        </div>
      </main>
    </div>
  )
}

export default Home