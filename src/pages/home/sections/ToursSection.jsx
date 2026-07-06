import { useState } from "react";
import { Flame, MapPin, Calendar, Users, Star, Check, Heart } from "lucide-react";
import toursData from "../../../data/tours.json";
import TourDetailModal from "../../../components/modals/TourDetailModal";

const difficultyColor = (d) =>
  d === "Easy" ? "bg-green-100 text-green-700"
  : d === "Moderate" ? "bg-amber-100 text-amber-700"
  : "bg-red-100 text-red-700";

const Stars = ({ rating, size = 14 }) => (
  <span className="inline-flex gap-px">
    {[1, 2, 3, 4, 5].map((i) => (
      <Star key={i} size={size} strokeWidth={0} fill={i <= Math.round(rating) ? "#00AA6C" : "#D1D5DB"} />
    ))}
  </span>
);

const TourCard = ({ tour, onClick }) => (
  <div className="rounded-2xl overflow-hidden border border-gray-100 bg-white cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:border-transparent group"
    onClick={onClick}>
    <div className="relative overflow-hidden">
      <img src={tour.img} alt={tour.title}
        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
        onError={(e) => { e.target.src = "https://placehold.co/600x400?text=" + encodeURIComponent(tour.title); }} />
      {tour.tag && (
        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-bold text-white" style={{ background: tour.tagBg }}>{tour.tag}</span>
      )}
      <button className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full border-none shadow-sm flex items-center justify-center cursor-pointer hover:bg-red-50 transition-colors duration-200"
        onClick={(e) => e.stopPropagation()}>
        <Heart size={15} strokeWidth={2} className="text-gray-400" />
      </button>
      <div className="absolute bottom-3 left-3 flex gap-1.5">
        <span className="bg-white/90 px-2 py-0.5 rounded-full text-xs font-semibold text-gray-700 flex items-center gap-1">
          {tour.category}
        </span>
        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${difficultyColor(tour.difficulty)}`}>{tour.difficulty}</span>
      </div>
    </div>
    <div className="px-4 pt-4 pb-5">
      <h3 className="text-base font-bold text-gray-900 mb-2.5 leading-snug">{tour.title}</h3>
      <div className="flex items-center gap-1 mb-2.5 text-gray-400 text-xs">
        <MapPin size={11} strokeWidth={2} />
        {tour.locations?.slice(0, 3).join(" → ")}{tour.locations?.length > 3 && ` +${tour.locations.length - 3}`}
      </div>
      <div className="flex gap-3.5 mb-2.5">
        <span className="text-xs text-gray-500 flex items-center gap-1"><Calendar size={12} strokeWidth={2} /> {tour.days} days</span>
        <span className="text-xs text-gray-500 flex items-center gap-1"><Users size={12} strokeWidth={2} /> Max {tour.groupSize}</span>
      </div>
      <div className="flex items-center gap-1.5 mb-3">
        <Stars rating={tour.rating} size={12} />
        <span className="text-xs font-bold text-gray-900">{tour.rating}</span>
        <span className="text-xs text-gray-400">({tour.reviews})</span>
      </div>
      <div className="flex gap-1.5 flex-wrap mb-3.5">
        {(tour.includes || []).slice(0, 3).map(inc => (
          <span key={inc} className="bg-gray-100 text-gray-700 text-xs font-medium px-2 py-0.5 rounded flex items-center gap-1">
            <Check size={10} strokeWidth={2.5} className="text-primary-500" />{inc}
          </span>
        ))}
      </div>
      <div className="flex justify-between items-center">
        <div>
          {tour.oldPrice && <div className="text-xs text-gray-400 line-through">${tour.oldPrice}</div>}
          <div className="text-lg font-extrabold text-primary-500">${tour.price}<span className="text-xs font-normal text-gray-400">/person</span></div>
        </div>
        <button className="px-3.5 py-2 rounded-lg text-xs font-semibold text-white bg-primary-500 border-none cursor-pointer hover:bg-primary-600 transition-colors duration-200"
          onClick={(e) => e.stopPropagation()}>
          Book Now
        </button>
      </div>
    </div>
  </div>
);

const ToursSection = () => {
  const [selectedTour, setSelectedTour] = useState(null);
  const featuredTours = toursData.slice(0, 6);

  return (
    <>
      <section className="py-16 sm:py-20 px-4 sm:px-8 lg:px-12 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex justify-between items-end mb-9 flex-wrap gap-4 animate-on-scroll">
            <div>
              <span className="bg-red-100 text-red-600 px-3.5 py-1.5 rounded-full text-sm font-semibold flex items-center gap-1.5 w-fit">
                <Flame size={13} strokeWidth={2} /> Hot Deals
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 mt-3">Featured Tours</h2>
              <p className="text-gray-500 text-sm mt-2">Our most popular hand-crafted journeys</p>
            </div>
            <button className="px-5 py-2.5 rounded-lg text-sm font-semibold text-primary-500 border-2 border-primary-500 bg-transparent cursor-pointer hover:bg-primary-500 hover:text-white transition-all duration-200">
              Browse All →
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 animate-on-scroll animate-stagger">
            {featuredTours.map((tour, i) => (
              <TourCard key={i} tour={tour} onClick={() => setSelectedTour(tour)} />
            ))}
          </div>
        </div>
      </section>
      <TourDetailModal tour={selectedTour} onClose={() => setSelectedTour(null)} />
    </>
  );
};

export default ToursSection;