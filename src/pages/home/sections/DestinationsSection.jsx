import { useState } from "react";
import { Star, Tag } from "lucide-react";
import destinationsData from "../../../data/destinations.json";
import DestinationModal from "../../../components/modals/DestinationModal";

const Stars = ({ rating, size = 14 }) => (
  <span className="inline-flex gap-px">
    {[1, 2, 3, 4, 5].map((i) => (
      <Star key={i} size={size} strokeWidth={0} fill={i <= Math.round(rating) ? "#00AA6C" : "#D1D5DB"} />
    ))}
  </span>
);

const DestinationCard = ({ destination, onClick }) => (
  <div className="rounded-2xl overflow-hidden shadow-md bg-white cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
    onClick={onClick}>
    <div className="relative overflow-hidden">
      <img src={destination.img} alt={destination.name}
        className="w-full h-48 object-cover transition-transform duration-500 hover:scale-105"
        onError={(e) => { e.target.src = "https://placehold.co/600x400?text=" + encodeURIComponent(destination.name); }} />
      {destination.badge && destination.badgeColor && (
        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-bold"
          style={{ background: destination.badgeColor.bg, color: destination.badgeColor.color }}>
          {destination.badge}
        </span>
      )}
      <span className="absolute bottom-3 right-3 bg-white/90 px-2.5 py-1 rounded-full text-xs font-semibold text-gray-700 flex items-center gap-1">
        <Tag size={11} strokeWidth={2} />{destination.tag}
      </span>
    </div>
    <div className="px-4 pt-4 pb-5">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-base font-bold text-gray-900">{destination.name}</h3>
        {destination.price && <span className="text-sm font-bold text-primary-500 ml-2 whitespace-nowrap">{destination.price}</span>}
      </div>
      {destination.rating && (
        <div className="flex items-center gap-1.5">
          <Stars rating={destination.rating} />
          <span className="text-sm font-semibold text-gray-900">{destination.rating}</span>
          {destination.reviews && <span className="text-sm text-gray-400">({destination.reviews})</span>}
        </div>
      )}
      {destination.description && <p className="text-xs text-gray-500 mt-2 leading-relaxed line-clamp-2">{destination.description}</p>}
      <div className="mt-3 text-xs font-semibold text-primary-500">View details →</div>
    </div>
  </div>
);

const DestinationsSection = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedDestination, setSelectedDestination] = useState(null);

  const categories = ["All", "Beach", "Cultural", "Heritage", "Adventure", "City", "Hill Station", "Mountains"];
  const destinations = destinationsData;
  const filtered = (
    activeCategory === "All" ? destinations : destinations.filter(d => d.tag === activeCategory)
  ).slice(0, 6);

  return (
    <>
      <section className="py-16 sm:py-20 px-4 sm:px-8 lg:px-12 bg-gray-50">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex justify-between items-end mb-7 flex-wrap gap-4 animate-on-scroll">
            <div>
              <span className="bg-primary-100 text-primary-600 px-3.5 py-1.5 rounded-full text-sm font-semibold">Top Picks</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 mt-3">Popular Destinations</h2>
            </div>
            <button className="px-5 py-2.5 rounded-lg text-sm font-semibold text-primary-500 border-2 border-primary-500 bg-transparent cursor-pointer hover:bg-primary-500 hover:text-white transition-all duration-200">
              View All →
            </button>
          </div>
          <div className="flex gap-2.5 mb-8 overflow-x-auto pb-1 animate-on-scroll">
            {categories.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium border cursor-pointer whitespace-nowrap transition-all duration-200 font-sans
                            ${activeCategory === cat ? "bg-primary-500 text-white border-primary-500" : "bg-white text-gray-700 border-gray-200 hover:border-primary-500 hover:text-primary-500"}`}>
                {cat}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-on-scroll animate-stagger">
            {filtered.map((destination, i) => (
              <DestinationCard key={i} destination={destination} onClick={() => setSelectedDestination(destination)} />
            ))}
          </div>
        </div>
      </section>
      <DestinationModal destination={selectedDestination} onClose={() => setSelectedDestination(null)} />
    </>
  );
};

export default DestinationsSection;