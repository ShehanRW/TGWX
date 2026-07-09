import React, { useState } from "react";
import { Tag, Star } from "lucide-react";
import destinationsData from "../data/destinations.json";
import DestinationModal from "../components/modals/DestinationModal";

const Stars = ({ rating, size = 14 }) => {
  if (!rating) return null;
  return (
    <span style={{ display: "inline-flex", gap: "2px" }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={size}
          strokeWidth={0}
          fill={i <= Math.round(rating) ? "#00AA6C" : "#D1D5DB"}
        />
      ))}
    </span>
  );
};

const CATEGORIES = ["All", "Beach", "Cultural", "Heritage", "Adventure", "City", "Hill Station", "Mountains"];

function Destinations() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selected, setSelected] = useState(null);

  const filtered =
    activeCategory === "All"
      ? destinationsData
      : destinationsData.filter((d) => d.tag === activeCategory);

  return (
    <div className="bg-white min-h-screen overflow-x-hidden">
      {/* Modal */}
      <DestinationModal
        destination={selected}
        onClose={() => setSelected(null)}
      />

      {/* Main Content with proper padding for navigation */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-[140px] sm:pt-[160px] lg:pt-[180px] pb-10 sm:pb-16">
        
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 mb-2">
            Popular Destinations
          </h1>
          <p className="text-sm sm:text-base text-gray-500">
            Explore the best of Sri Lanka — from ancient heritage to pristine beaches.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 sm:gap-3 flex-wrap mb-6 sm:mb-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 sm:px-5 py-2 rounded-full border-2 font-medium text-xs sm:text-sm transition-all duration-200 min-h-[40px] sm:min-h-[44px]
                ${activeCategory === cat 
                  ? "bg-[#00AA6C] border-[#00AA6C] text-white" 
                  : "bg-white border-gray-200 text-gray-700 hover:border-[#00AA6C] hover:text-[#00AA6C]"}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filtered.map((card) => (
            <div
              key={card.id}
              onClick={() => setSelected(card)}
              className="rounded-2xl overflow-hidden shadow-md bg-white cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  src={card.img}
                  alt={card.name}
                  className="w-full h-[180px] sm:h-[200px] object-cover block"
                  onError={(e) => {
                    e.target.src = "https://placehold.co/600x400?text=" + encodeURIComponent(card.name);
                  }}
                />
                {card.badge && card.badgeColor && (
                  <span
                    className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-bold"
                    style={{
                      background: card.badgeColor.bg,
                      color: card.badgeColor.color,
                    }}
                  >
                    {card.badge}
                  </span>
                )}
                <span className="absolute bottom-3 right-3 bg-white/92 text-gray-700 px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-semibold flex items-center gap-1.5">
                  <Tag size={11} />
                  {card.tag}
                </span>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-5">
                <div className="flex justify-between items-start gap-2 mb-2">
                  <h3 className="text-sm sm:text-base font-bold text-gray-900 m-0 flex-1">
                    {card.name}
                  </h3>
                  {card.price && (
                    <span className="text-xs sm:text-sm font-bold text-[#00AA6C] whitespace-nowrap">
                      {card.price}
                    </span>
                  )}
                </div>

                {card.rating && (
                  <div className="flex items-center gap-1.5 sm:gap-2 mb-2.5">
                    <Stars rating={card.rating} />
                    <span className="text-xs sm:text-sm font-semibold text-gray-900">{card.rating}</span>
                    {card.reviews && (
                      <span className="text-xs sm:text-sm text-gray-400">({card.reviews})</span>
                    )}
                  </div>
                )}

                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed m-0 line-clamp-3">
                  {card.description}
                </p>

                <div className="mt-3 text-xs sm:text-sm font-semibold text-[#00AA6C]">
                  View details →
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Destinations;