import { useState } from 'react'
import ProductCard from '../Widget/ProductCard'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import HomePCs from './HomePCs'
import OfficePCs from './OfficePCs'
import GamingPCs from './GamingPCs'
import ProfessionalPCs from './ProfessionalPCs'
import './Home.css'

function Home() {
  const [currentScreen, setCurrentScreen] = useState('home')

  // Navigation functions for different PC categories
  const navigateToHomePCs = () => {
    setCurrentScreen('home-pcs')
  }

  const navigateToOfficePCs = () => {
    setCurrentScreen('office-pcs')
  }

  const navigateToGamingPCs = () => {
    setCurrentScreen('gaming-pcs')
  }

  const navigateToProfessionalPCs = () => {
    setCurrentScreen('professional-pcs')
  }

  const navigateToHome = () => {
    setCurrentScreen('home')
  }

  // Render different screens based on current state
  if (currentScreen === 'home-pcs') {
    return <HomePCs onNavigateBack={navigateToHome} />
  }
  
  if (currentScreen === 'office-pcs') {
    return <OfficePCs onNavigateBack={navigateToHome} />
  }
  
  if (currentScreen === 'gaming-pcs') {
    return <GamingPCs onNavigateBack={navigateToHome} />
  }
  
  if (currentScreen === 'professional-pcs') {
    return <ProfessionalPCs onNavigateBack={navigateToHome} />
  }

  // Default home screen
  return (
    <div className="Home">
      <Header currentPage="PRE BUILD PC" />

      {/* Main Content */}
      <main className="main-content">
        <div className="container">
          <h1>PRE BUILD PC</h1>
          
          {/* Product Cards Section */}
          <div className="products-grid">
            <ProductCard
              title="Home PCs"
              description="You can use a Home PC when you need to do basic operations. You will find three different price categories to proceed with."
              buttonText="View All Products"
              buttonAction={navigateToHomePCs}
              imageUrl="/images/home-pc.svg"
              imageAlt="Home PC illustration"
              category="home"
            />
            
            <ProductCard
              title="Office PCs"
              description="You can use an Office PC when there is a need for official operations to get done. You will find three different price categories to proceed with."
              buttonText="View All Products"
              buttonAction={navigateToOfficePCs}
              imageUrl="/images/office-pc.svg"
              imageAlt="Office PC illustration"
              category="office"
            />
            
            <ProductCard
              title="Gaming PCs"
              description="This range of entry-level gaming PCs feature Radeon VEGA and NVIDIA GeForce GTX 1650 SUPER graphics. This makes them ideal for playing casual eSports games such as Fortnite, DOTA 2 and League of Le...."
              buttonText="View All Products"
              buttonAction={navigateToGamingPCs}
              imageUrl="/images/gaming-pc.svg"
              imageAlt="Gaming PC illustration"
              category="gaming"
            />
            
            <ProductCard
              title="Professional PCs"
              description="Work on these workstations with no delay. These computers are designed for technical or scientific applications."
              buttonText="View All Products"
              buttonAction={navigateToProfessionalPCs}
              imageUrl="/images/professional-pc.svg"
              imageAlt="Professional PC illustration"
              category="professional"
            />
            
            <ProductCard
              title="Custom PCs"
              description="Build your dream PC with our custom configuration service. Choose your components and let us assemble the perfect machine for your specific needs and budget."
              buttonText="Start Building"
              buttonAction={() => console.log('Custom PCs clicked')}
              imageUrl="/images/custom-pc.svg"
              imageAlt="Custom PC illustration"
              category="custom"
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default Home