import React, { useState } from 'react';
import './ProductItemCard.css';

const ProductItemCard = ({
  title,
  image,
  price,
  originalPrice,
  savings,
  mrp,
  processor,
  motherboard,
  memory,
  storage,
  powerSupply,
  overview,
  onView,
  onAddToCart
}) => {
  const [activeTab, setActiveTab] = useState('specification');

  return (
    <div className="product-item-card">
      {/* Header */}
      <div className="product-header">
        <h3 className="product-title">{title}</h3>
      </div>

      {/* Product Image */}
      <div className="product-image-container">
        <img src={image} alt={title} className="product-image" />
      </div>

      {/* Price Section */}
      <div className="price-section">
        <div className="current-price">₹{price.toLocaleString()}</div>
        <div className="price-details">
          <span className="savings">Save ₹{savings}</span>
          <span className="mrp">MRP ₹{mrp.toLocaleString()}</span>
          <span className="tax-info">(Inc of all taxes)</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="product-tabs">
        <button 
          className={`tab ${activeTab === 'specification' ? 'active' : ''}`}
          onClick={() => setActiveTab('specification')}
        >
          Specification
        </button>
        <button 
          className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
      </div>

      {/* Content - Fixed Height Container */}
      <div className="tab-content">
        {activeTab === 'specification' && (
          <div className="specifications">
            <div className="spec-row">
              <div className="spec-label">Processor (CPU)</div>
              <div className="spec-value">{processor}</div>
            </div>
            <div className="spec-row">
              <div className="spec-label">Motherboard</div>
              <div className="spec-value">{motherboard}</div>
            </div>
            <div className="spec-row">
              <div className="spec-label">Memory (RAM)</div>
              <div className="spec-value">{memory}</div>
            </div>
            <div className="spec-row">
              <div className="spec-label">Solid State Drive (M.2 SSD)</div>
              <div className="spec-value">{storage}</div>
            </div>
            <div className="spec-row">
              <div className="spec-label">Power Supply Unit</div>
              <div className="spec-value">{powerSupply}</div>
            </div>
          </div>
        )}

        {activeTab === 'overview' && overview && (
          <div className="overview-content">
            <p className="overview-text">{overview}</p>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="action-buttons">
        <button className="view-btn" onClick={onView}>View</button>
        <button className="add-to-cart-btn" onClick={onAddToCart}>Add All To Cart</button>
      </div>
    </div>
  );
};

export default ProductItemCard;