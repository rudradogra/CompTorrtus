import React from 'react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import ProductCard from '../Widget/ProductCard'
import './CategoryScreen.css'

const ProfessionalPCs = () => {
  // Placeholder data for Professional PC products
  const professionalProducts = [
    {
      title: "CAD Workstation",
      description: "Optimized for CAD applications and 3D modeling. Professional graphics cards and certified drivers for reliability.",
      buttonText: "View Details",
      buttonAction: () => console.log('CAD Workstation clicked'),
      imageUrl: "/images/cad-workstation.svg",
      imageAlt: "CAD Workstation",
      category: "cad"
    },
    {
      title: "Video Editing Workstation",
      description: "High-performance system for video editing and rendering. Multi-core processors with ample RAM and storage.",
      buttonText: "View Details",
      buttonAction: () => console.log('Video Editing Workstation clicked'),
      imageUrl: "/images/video-editing-pc.svg",
      imageAlt: "Video Editing Workstation",
      category: "video-editing"
    },
    {
      title: "Scientific Computing PC",
      description: "Specialized for research and scientific applications. High compute power for simulations and data analysis.",
      buttonText: "View Details",
      buttonAction: () => console.log('Scientific PC clicked'),
      imageUrl: "/images/scientific-pc.svg",
      imageAlt: "Scientific Computing PC",
      category: "scientific"
    },
    {
      title: "Server Workstation",
      description: "Enterprise-grade workstation for server applications. Redundancy features and 24/7 operation capability.",
      buttonText: "View Details",
      buttonAction: () => console.log('Server Workstation clicked'),
      imageUrl: "/images/server-workstation.svg",
      imageAlt: "Server Workstation",
      category: "server"
    }
  ]

  return (
    <div className="category-screen">
      <Header currentPage="PROFESSIONAL PCS" />
      
      <main className="category-content">
        <div className="container">
          <h1>Professional PCs</h1>
          <p className="category-description">
            Workstations designed for professional applications. From CAD to video editing, our systems deliver the performance professionals demand.
          </p>
          
          <div className="products-grid">
            {professionalProducts.map((product, index) => (
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

export default ProfessionalPCs