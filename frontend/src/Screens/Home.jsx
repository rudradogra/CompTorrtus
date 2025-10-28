import { useNavigate } from 'react-router-dom'
import ProductCard from '../Widget/ProductCard'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import './Home.css'

function Home() {
  const navigate = useNavigate()

  return (
    <div className="Home">
      <Header currentPage="PRE BUILD PC" />

      {/* Main Content */}
      <main className="main-content">
        <div className="container">
          {/* Product Cards Container with darker background */}
          <div className="product-cards-container">
            {/* Heading Card */}
            <div className="heading-card">
              <h2 className="section-heading">PRE BUILD PC</h2>
            </div>
            
            {/* Product Cards Wrapper */}
            <div className="product-cards-wrapper">
              <div className="row text-center row_1">
                <div className="col-md col-xs byp-responsive-div">
                  <ProductCard
                    title="Home PCs"
                    description="You can use a Home PC when you need to do basic operations. You will find three different price categories to proceed with."
                    buttonText="View All Products"
                    buttonAction={() => navigate('/home-pcs')}
                    imageUrl="/images/home-pc.svg"
                    imageAlt="Home PC illustration"
                    category="home"
                  />
                </div>
                
                <div className="col-md col-xs byp-responsive-div">
                  <ProductCard
                    title="Office PCs"
                    description="You can use an Office PC when there is a need for official operations to get done. You will find three different price categories to proceed with."
                    buttonText="View All Products"
                    buttonAction={() => navigate('/office-pcs')}
                    imageUrl="/images/office-pc.svg"
                    imageAlt="Office PC illustration"
                    category="office"
                  />
                </div>
                
                <div className="col-md col-xs byp-responsive-div">
                  <ProductCard
                    title="Gaming PCs"
                    description="This range of entry-level gaming PCs feature Radeon VEGA and NVIDIA GeForce GTX 1650 SUPER graphics. This makes them ideal for playing casual eSports games such as Fortnite, DOTA 2 and League of Le...."
                    buttonText="View All Products"
                    buttonAction={() => navigate('/gaming-pcs')}
                    imageUrl="/images/gaming-pc.svg"
                    imageAlt="Gaming PC illustration"
                    category="gaming"
                  />
                </div>
                
                <div className="col-md col-xs byp-responsive-div">
                  <ProductCard
                    title="Professional PCs"
                    description="Work on these workstations with no delay. These computers are designed for technical or scientific applications."
                    buttonText="View All Products"
                    buttonAction={() => navigate('/professional-pcs')}
                    imageUrl="/images/professional-pc.svg"
                    imageAlt="Professional PC illustration"
                    category="professional"
                  />
                </div>
                
                <div className="col-md col-xs byp-responsive-div">
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
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default Home