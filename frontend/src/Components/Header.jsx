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
        {/* Top Bar with Social Media and Contact Info */}
        <div className="top-bar">
          <div className="social-icons">
            <a href="#" aria-label="Facebook" className="social-icon facebook">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a href="#" aria-label="Instagram" className="social-icon instagram">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a href="#" aria-label="YouTube" className="social-icon youtube">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
            <a href="#" aria-label="WhatsApp" className="social-icon whatsapp">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.888 3.488"/>
              </svg>
            </a>
          </div>
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
            <button className="search-button">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
              </svg>
            </button>
          </div>

          {/* Contact Info */}
          <div className="header-contact">
            <div className="phone-info">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
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
              <a href="#" className="nav-link">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{marginRight: '5px'}}>
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
                0 WISHLIST
              </a>
              <a href="#" className="nav-link">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{marginRight: '5px'}}>
                  <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                </svg>
                0 COMPARE
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="breadcrumb">
        <div className="breadcrumb-container">
          <Link to="/" className="breadcrumb-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
            </svg>
          </Link>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">{currentPage}</span>
        </div>
      </div>
    </>
  )
}

export default Header