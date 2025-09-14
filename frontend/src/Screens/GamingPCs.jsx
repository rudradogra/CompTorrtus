import React from 'react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import ProductCard from '../Widget/ProductCard'
import './CategoryScreen.css'

const GamingPCs = () => {
  // Placeholder data for Gaming PC products
  const gamingProducts = [
    {
      title: "Entry Level Gaming PC",
      description: "Perfect for casual gaming and eSports titles. Features GTX 1650 SUPER and reliable performance for popular games.",
      buttonText: "View Details",
      buttonAction: () => console.log('Entry Gaming PC clicked'),
      imageUrl: "/images/entry-gaming-pc.svg",
      imageAlt: "Entry Level Gaming PC",
      category: "entry-gaming"
    },
    {
      title: "Mid-Range Gaming PC",
      description: "Balanced performance for 1080p gaming. RTX 3060 graphics with smooth gameplay at high settings.",
      buttonText: "View Details",
      buttonAction: () => console.log('Mid-Range Gaming PC clicked'),
      imageUrl: "/images/mid-gaming-pc.svg",
      imageAlt: "Mid-Range Gaming PC",
      category: "mid-gaming"
    },
    {
      title: "High-End Gaming PC",
      description: "Ultimate gaming experience with RTX 4070. 1440p gaming at ultra settings with ray tracing support.",
      buttonText: "View Details",
      buttonAction: () => console.log('High-End Gaming PC clicked'),
      imageUrl: "/images/high-gaming-pc.svg",
      imageAlt: "High-End Gaming PC",
      category: "high-gaming"
    },
    {
      title: "Extreme Gaming PC",
      description: "Top-tier performance for 4K gaming and content creation. RTX 4090 with latest Intel/AMD processors.",
      buttonText: "View Details",
      buttonAction: () => console.log('Extreme Gaming PC clicked'),
      imageUrl: "/images/extreme-gaming-pc.svg",
      imageAlt: "Extreme Gaming PC",
      category: "extreme-gaming"
    }
  ]

  return (
    <div className="category-screen">
      <Header currentPage="GAMING PCS" />
      
      <main className="category-content">
        <div className="container">
          <h1>Gaming PCs</h1>
          <p className="category-description">
            Experience the ultimate in gaming performance. From casual eSports to 4K gaming, we have the perfect gaming rig for every gamer.
          </p>
          
          <div className="products-grid">
            {gamingProducts.map((product, index) => (
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

export default GamingPCs