import { Routes, Route } from 'react-router-dom'
import Home from './Screens/Home'
import HomePCs from './Screens/HomePCs'
import OfficePCs from './Screens/OfficePCs'
import GamingPCs from './Screens/GamingPCs'
import ProfessionalPCs from './Screens/ProfessionalPCs'
import './App.css'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home-pcs" element={<HomePCs />} />
        <Route path="/office-pcs" element={<OfficePCs />} />
        <Route path="/gaming-pcs" element={<GamingPCs />} />
        <Route path="/professional-pcs" element={<ProfessionalPCs />} />
      </Routes>
    </div>
  )
}

export default App
