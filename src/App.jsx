import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/layouts/NavBar'
import Home from './pages/Home'
import Destinations from './pages/Destinations'
import Tours from './pages/Tours'
import ContactUs from './pages/ContactUs'
import Reviews from './pages/Reviews'
import Booking from './pages/Booking'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/tours" element={<Tours />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/booking" element={<Booking />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App