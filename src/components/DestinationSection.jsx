import { Link } from 'react-router-dom'
import { Star, Calendar, Users, ChevronRight } from 'lucide-react'
import { getImageUrl } from '../utils/getImageUrl'
import destinations from '../data/destinations.json'

const DestinationsSection = () => {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Popular Destinations</h2>
          <p className="text-xl text-gray-600">Explore the world's most sought-after locations</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination) => (
            <div key={destination.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow group">
              <div className="relative h-64 overflow-hidden">
                <img
                  src={getImageUrl(destination.image)}
                  alt={destination.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full font-bold text-blue-600">
                  {destination.price}
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-900">{destination.name}</h3>
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="ml-1 text-gray-600">{destination.rating}</span>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{destination.description}</p>
                <div className="flex items-center gap-4 text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{destination.days} days</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{destination.reviews} reviews</span>
                  </div>
                </div>
                <Link to={`/destination/${destination.id}`} className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-800">
                  View Details <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default DestinationsSection