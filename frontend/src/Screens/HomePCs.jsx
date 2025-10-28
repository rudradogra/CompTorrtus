import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import ProductItemCard from '../Widget/ProductItemCard';
import './CategoryScreen.css';

const HomePCs = () => {
  const navigate = useNavigate();

  const homeProducts = [
    {
      id: 1,
      title: "BASIC HOME PC I",
      image: "/images/placeholder-pc.svg",
      price: 25999,
      originalPrice: 28999,
      savings: 3000,
      mrp: 28999,
      processor: "Intel Core i3-12100 Processor",
      motherboard: "MSI H610M-A WiFi Motherboard",
      memory: "Corsair Value 8GB 2400MHz DDR4 RAM",
      storage: "Kingston NV2 250GB NVMe Gen4 SSD",
      powerSupply: "Cooler Master MWE 450W 80+ Bronze PSU",
      overview: "Upgrade your daily computing with the Basic Home PC I a perfect blend of efficiency, affordability, and reliability. Designed for home users and students who need a responsive system for basic operations, web browsing, and light productivity tasks, this PC features the reliable Intel Core i3-12100 Processor and fast NVMe SSD storage for a smooth experience. Whether you're browsing the web, managing documents, streaming HD content, or attending online classes, the Basic Home PC I is built to deliver consistent performance in a compact, sleek cabinet. Perfect for families looking for their first computer or as a secondary system for basic computing needs."
    },
    {
      id: 2,
      title: "BASIC HOME PC II",
      image: "/images/placeholder-pc.svg",
      price: 32499,
      originalPrice: 35999,
      savings: 3500,
      mrp: 35999,
      processor: "Intel Core i5-12400 Processor",
      motherboard: "ASRock B560M-HDV Motherboard",
      memory: "G.Skill Ripjaws V 16GB 3200MHz DDR4 RAM",
      storage: "WD Blue SN570 500GB NVMe SSD",
      powerSupply: "Corsair CV550 550W 80+ Bronze PSU",
      overview: "Upgrade your daily computing with the Basic Home PC II a perfect blend of power, performance, and exceptional value. Designed for families and users who want a responsive system for multitasking, entertainment, and productivity workflows, this PC features the powerful Intel Core i5-12400 Processor with 6 cores and fast NVMe SSD storage for an ultra-smooth experience. Whether you're working from home, casual gaming, managing family photos and videos, or running multiple applications simultaneously, the Basic Home PC II is built to deliver consistent performance in a compact, sleek cabinet. Ideal for users who need more power than basic computing but don't require high-end specifications."
    },
    {
      id: 3,
      title: "COMFORT HOME PC I",
      image: "/images/placeholder-pc.svg",
      price: 42999,
      originalPrice: 47999,
      savings: 5000,
      mrp: 47999,
      processor: "AMD Ryzen 5 5600G Processor",
      motherboard: "ASUS Prime B450M-A WiFi Motherboard",
      memory: "Corsiar Vengeance LPX 16GB 3200MHz DDR4 RAM",
      storage: "Samsung 980 1TB NVMe SSD",
      powerSupply: "Seasonic Focus GX-650 650W 80+ Gold PSU",
      overview: "Upgrade your daily computing with the Comfort Home PC I a perfect blend of substantial power, impressive speed, and rock-solid reliability. Designed for enthusiast home users who want a responsive system for advanced multitasking, content creation, and light gaming experiences, this PC features the powerful AMD Ryzen 5 5600G Processor with integrated Radeon Graphics and fast NVMe SSD storage for an ultra-smooth experience. Whether you're editing family photos and videos, streaming 4K content, working on creative projects, or enjoying casual gaming sessions, the Comfort Home PC I is built to deliver consistent high performance in a compact, sleek cabinet. Perfect for users transitioning from basic computing to more demanding applications."
    },
    {
      id: 4,
      title: "COMFORT HOME PC II",
      image: "/images/placeholder-pc.svg",
      price: 55999,
      originalPrice: 61999,
      savings: 6000,
      mrp: 61999,
      processor: "Intel Core i7-12700K Processor",
      motherboard: "MSI MAG B660M Mortar WiFi Motherboard",
      memory: "G.Skill Trident Z 32GB 3600MHz DDR4 RAM",
      storage: "WD Black SN850 1TB NVMe Gen4 SSD",
      powerSupply: "Cooler Master V750 SFX Gold 750W PSU",
      overview: "Upgrade your daily computing with the Comfort Home PC II a perfect blend of premium power, exceptional speed, and enterprise-grade reliability. Designed for power users and content creators who demand a high-performance system for intensive multitasking, professional content creation, and serious gaming capabilities, this PC features the powerful Intel Core i7-12700K Processor with 12 cores and lightning-fast Gen4 NVMe SSD storage for an ultra-smooth experience. Whether you're video editing in 4K, 3D rendering, running virtual machines, streaming while gaming, or handling demanding creative workflows, the Comfort Home PC II is built to deliver outstanding performance in a compact, sleek cabinet. Ideal for prosumers who need workstation-class performance at home."
    },
    {
      id: 5,
      title: "PREMIUM HOME PC I",
      image: "/images/placeholder-pc.svg",
      price: 68999,
      originalPrice: 75999,
      savings: 7000,
      mrp: 75999,
      processor: "AMD Ryzen 7 5800X Processor",
      motherboard: "ASUS ROG Strix B550-F Gaming WiFi",
      memory: "Corsair Dominator Platinum 32GB 3600MHz DDR4",
      storage: "Samsung 980 Pro 2TB NVMe Gen4 SSD",
      powerSupply: "EVGA SuperNOVA 850W 80+ Gold Modular PSU",
      overview: "Upgrade your daily computing with the Premium Home PC I a perfect blend of ultimate power, blazing speed, and uncompromising reliability. Designed for enthusiast users and semi-professional creators who want a top-tier system for intensive multitasking, professional content creation, and high-end gaming experiences, this PC features the powerful AMD Ryzen 7 5800X Processor with 8 cores/16 threads and ultra-fast Gen4 NVMe SSD storage for an exceptional experience. Whether you're professional video editing, 3D modeling and rendering, game development, live streaming with multiple applications, or running the most demanding creative software, the Premium Home PC I is built to deliver outstanding performance in a compact, sleek cabinet. Perfect for creators who demand professional results from their home setup."
    },
    {
      id: 6,
      title: "PREMIUM HOME PC II",
      image: "/images/placeholder-pc.svg",
      price: 85999,
      originalPrice: 94999,
      savings: 9000,
      mrp: 94999,
      processor: "Intel Core i9-12900K Processor",
      motherboard: "ASUS ProArt Z690-Creator WiFi Motherboard",
      memory: "G.Skill Trident Z5 RGB 64GB 5600MHz DDR5",
      storage: "WD Black SN850X 4TB NVMe Gen4 SSD",
      powerSupply: "Corsair HX1000 1000W 80+ Platinum PSU",
      overview: "Upgrade your daily computing with the Premium Home PC II a perfect blend of flagship power, extreme speed, and absolute reliability. Designed for professional power users and creative professionals who demand the ultimate system for the most intensive workflows, content creation, and enthusiast gaming experiences, this PC features the flagship Intel Core i9-12900K Processor with 16 cores/24 threads and cutting-edge Gen4 NVMe SSD storage for an unmatched experience. Whether you're professional video editing in 8K, advanced 3D rendering and animation, software development with multiple IDEs, running complex simulations, or streaming while gaming at maximum settings, the Premium Home PC II is built to deliver exceptional performance in a compact, sleek cabinet. The ultimate choice for professionals who refuse to compromise on performance and need workstation-class power at home."
    }
  ];

  const handleView = (product) => {
    console.log('View product:', product);
  };

  const handleAddToCart = (product) => {
    console.log('Add to cart:', product);
  };

  return (
    <div className="category-screen">
      <Header />
      
      <div className="breadcrumb">
        <div className="container">
          <span onClick={() => navigate('/')} className="breadcrumb-home">🏠</span>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">HOME PCS</span>
        </div>
      </div>

      <div className="main-content">
        <div className="container">
          <div className="category-header">
            <h1>HOME PCS</h1>
          </div>

          <div className="products-grid">
            {homeProducts.map((product) => (
              <ProductItemCard
                key={product.id}
                title={product.title}
                image={product.image}
                price={product.price}
                originalPrice={product.originalPrice}
                savings={product.savings}
                mrp={product.mrp}
                processor={product.processor}
                motherboard={product.motherboard}
                memory={product.memory}
                storage={product.storage}
                powerSupply={product.powerSupply}
                overview={product.overview}
                onView={() => handleView(product)}
                onAddToCart={() => handleAddToCart(product)}
              />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HomePCs;