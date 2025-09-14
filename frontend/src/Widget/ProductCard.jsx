import React from 'react'
import './ProductCard.css'

const ProductCard = ({ 
  title, 
  description, 
  buttonText, 
  buttonAction,
  imageUrl,
  imageAlt,
  category 
}) => {
  return (
    <div className="product-card">
      <div className="product-image">
        <img src={imageUrl} alt={imageAlt} />
      </div>
      <div className="product-content">
        <h3 className="product-title">{title}</h3>
        <p className="product-description">{description}</p>
        <button 
          className="product-button"
          onClick={buttonAction}
        >
          {buttonText}
        </button>
      </div>
    </div>
  )
}

export default ProductCard