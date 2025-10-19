import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Header.css'

const Header = ({ currentPage = "PRE BUILD PC" }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <>
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
            <Link to="/" className="logo-text">techstore<span className="logo-highlight">.com</span></Link>
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
              
              {/* Dropdown Menu */}
              <div className="categories-dropdown">
                <div className="dropdown-item-container">
                  <a href="#" className="dropdown-item">
                    <span>Custom Cooling</span>
                    <span className="arrow">{'>'}</span>
                  </a>
                  <div className="sub-dropdown">
                    <div className="sub-dropdown-content">
                      <div className="sub-dropdown-header">DIY COOLING</div>
                      <div className="sub-dropdown-columns">
                        <div className="sub-dropdown-column">
                          <a href="#" className="sub-dropdown-item">CPU Water Block</a>
                          <a href="#" className="sub-dropdown-item">GPU Water Block</a>
                          <a href="#" className="sub-dropdown-item">Pump & Reservoir</a>
                          <a href="#" className="sub-dropdown-item">Fitting Adapter</a>
                          <a href="#" className="sub-dropdown-item">Tubing</a>
                        </div>
                        <div className="sub-dropdown-column">
                          <a href="#" className="sub-dropdown-item">Coolant</a>
                          <a href="#" className="sub-dropdown-item">Radiator</a>
                          <a href="#" className="sub-dropdown-item">Distro Plate</a>
                          <a href="#" className="sub-dropdown-item">Accessories</a>
                        </div>
                      </div>
                      <div className="sub-dropdown-brands">
                        <div className="brand-logo">EKWB</div>
                        <div className="brand-logo">HYDROX SERIES</div>
                        <div className="brand-logo">BYKSKI</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="dropdown-item-container">
                  <a href="#" className="dropdown-item">
                    <span>Processor</span>
                    <span className="arrow">{'>'}</span>
                  </a>
                  <div className="sub-dropdown">
                    <div className="sub-dropdown-content">
                      <div className="sub-dropdown-header">PROCESSORS</div>
                      <div className="sub-dropdown-columns">
                        <div className="sub-dropdown-column">
                          <a href="#" className="sub-dropdown-item">Intel Core i3</a>
                          <a href="#" className="sub-dropdown-item">Intel Core i5</a>
                          <a href="#" className="sub-dropdown-item">Intel Core i7</a>
                          <a href="#" className="sub-dropdown-item">Intel Core i9</a>
                        </div>
                        <div className="sub-dropdown-column">
                          <a href="#" className="sub-dropdown-item">AMD Ryzen 3</a>
                          <a href="#" className="sub-dropdown-item">AMD Ryzen 5</a>
                          <a href="#" className="sub-dropdown-item">AMD Ryzen 7</a>
                          <a href="#" className="sub-dropdown-item">AMD Ryzen 9</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="dropdown-item-container">
                  <a href="#" className="dropdown-item">
                    <span>CPU Cooler</span>
                    <span className="arrow">{'>'}</span>
                  </a>
                </div>

                <div className="dropdown-item-container">
                  <a href="#" className="dropdown-item">
                    <span>Motherboard</span>
                    <span className="arrow">{'>'}</span>
                  </a>
                </div>

                <div className="dropdown-item-container">
                  <a href="#" className="dropdown-item">
                    <span>Graphics Card</span>
                    <span className="arrow">{'>'}</span>
                  </a>
                </div>

                <div className="dropdown-item-container">
                  <a href="#" className="dropdown-item">
                    <span>RAM</span>
                    <span className="arrow">{'>'}</span>
                  </a>
                </div>

                <div className="dropdown-item-container">
                  <a href="#" className="dropdown-item">
                    <span>Storage</span>
                    <span className="arrow">{'>'}</span>
                  </a>
                </div>

                <div className="dropdown-item-container">
                  <a href="#" className="dropdown-item">
                    <span>SMPS</span>
                    <span className="arrow">{'>'}</span>
                  </a>
                </div>

                <div className="dropdown-item-container">
                  <a href="#" className="dropdown-item">
                    <span>Cabinet</span>
                    <span className="arrow">{'>'}</span>
                  </a>
                </div>

                <div className="dropdown-item-container">
                  <a href="#" className="dropdown-item">
                    <span>Monitor</span>
                    <span className="arrow">{'>'}</span>
                  </a>
                </div>

                <div className="dropdown-item-container">
                  <a href="#" className="dropdown-item">
                    <span>Peripherals</span>
                    <span className="arrow">{'>'}</span>
                  </a>
                </div>
                <a href="#" className="dropdown-item">
                  <span>Laptop</span>
                  <span className="arrow">{'>'}</span>
                </a>
                <a href="#" className="dropdown-item">
                  <span>Mini PC</span>
                  <span className="arrow">{'>'}</span>
                </a>
              </div>
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
          <Link to="/" className="breadcrumb-link">🏠</Link>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">{currentPage}</span>
        </div>
      </div>
    </>
  )
}

export default Header