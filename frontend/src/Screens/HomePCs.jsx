import React from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import ProductCard from '../Widget/ProductCard'
import './CategoryScreen.css'

const HomePCs = () => {
  const navigate = useNavigate()
  // Placeholder data for Home PC products
  const homeProducts = [
    {
      title: "Basic Home PC",
      description: "Perfect for everyday tasks like browsing, email, and basic office work. Reliable and affordable.",
      buttonText: "View Details",
      buttonAction: () => console.log('Basic Home PC clicked'),
      imageUrl: "/images/basic-home-pc.svg",
      imageAlt: "Basic Home PC",
      category: "basic-home"
    },
    {
      title: "Family Entertainment PC",
      description: "Great for streaming, photo editing, and family entertainment. Includes multimedia capabilities.",
      buttonText: "View Details",
      buttonAction: () => console.log('Family PC clicked'),
      imageUrl: "/images/family-pc.svg",
      imageAlt: "Family Entertainment PC",
      category: "family"
    },
    {
      title: "Home Office PC",
      description: "Designed for remote work and productivity. Includes webcam, good audio, and reliable performance.",
      buttonText: "View Details",
      buttonAction: () => console.log('Home Office PC clicked'),
      imageUrl: "/images/home-office-pc.svg",
      imageAlt: "Home Office PC",
      category: "home-office"
    },
    {
      title: "Student PC",
      description: "Budget-friendly option for students. Perfect for research, assignments, and online learning.",
      buttonText: "View Details",
      buttonAction: () => console.log('Student PC clicked'),
      imageUrl: "/images/student-pc.svg",
      imageAlt: "Student PC",
      category: "student"
    }
  ]

  return (
    <div className="category-screen">
      <Header currentPage="HOME PCS" />
      
      <main className="category-content">
        <div className="container">
          <h1>Home PCs</h1>
          <p className="category-description">
            Discover our range of home computers designed for everyday use. From basic computing needs to family entertainment, we have the perfect PC for your home.
          </p>
          
          <div className="products-grid">
            {homeProducts.map((product, index) => (
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

export default HomePCs