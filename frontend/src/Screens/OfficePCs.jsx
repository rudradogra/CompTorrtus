import React from 'react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import ProductCard from '../Widget/ProductCard'
import './CategoryScreen.css'

const OfficePCs = () => {
  // Placeholder data for Office PC products
  const officeProducts = [
    {
      title: "Business Desktop",
      description: "Professional desktop for business operations. Reliable performance for office applications and multitasking.",
      buttonText: "View Details",
      buttonAction: () => console.log('Business Desktop clicked'),
      imageUrl: "/images/business-desktop.svg",
      imageAlt: "Business Desktop",
      category: "business"
    },
    {
      title: "Executive Workstation",
      description: "Premium workstation for executives and managers. Enhanced security and professional features.",
      buttonText: "View Details",
      buttonAction: () => console.log('Executive Workstation clicked'),
      imageUrl: "/images/executive-pc.svg",
      imageAlt: "Executive Workstation",
      category: "executive"
    },
    {
      title: "Small Business PC",
      description: "Cost-effective solution for small businesses. Optimized for productivity and budget-conscious buyers.",
      buttonText: "View Details",
      buttonAction: () => console.log('Small Business PC clicked'),
      imageUrl: "/images/small-business-pc.svg",
      imageAlt: "Small Business PC",
      category: "small-business"
    },
    {
      title: "Corporate Bulk PC",
      description: "Bulk ordering solution for corporations. Standardized configurations with enterprise support.",
      buttonText: "View Details",
      buttonAction: () => console.log('Corporate PC clicked'),
      imageUrl: "/images/corporate-pc.svg",
      imageAlt: "Corporate PC",
      category: "corporate"
    }
  ]

  return (
    <div className="category-screen">
      <Header currentPage="OFFICE PCS" />
      
      <main className="category-content">
        <div className="container">
          <h1>Office PCs</h1>
          <p className="category-description">
            Professional computers designed for business environments. Enhance productivity with our reliable office PC solutions.
          </p>
          
          <div className="products-grid">
            {officeProducts.map((product, index) => (
              <ProductCard
                key={index}
                title={product.title}
                description={product.description}
                buttonText={product.buttonText}
                buttonAction={product.buttonAction}
                imageUrl={product.imageUrl}
                imageAlt={product.imageAlt}
                category={product.category}
              />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default OfficePCs