import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import TopBar from './components/layouts/TopBar'
import Navbar from './components/layouts/NavBar'
import Home from './pages/home/Home'
import Destinations from './pages/Destinations'
import Tours from './pages/Tours'
import ContactUs from './pages/ContactUs'
import Reviews from './pages/Reviews'
import Booking from './pages/Booking'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <TopBar />
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