import { useState } from "react";
import {
  Flame, MapPin, Calendar, Users, Heart, Check,
  Compass, Mountain, Waves, Leaf, Camera, Car, UserCheck,
} from "lucide-react";
import toursData from "../../../data/tours.json";
import TourDetailModal from "../../../components/modals/TourDetailModal";
import Stars from "../../../components/common/Stars";

/* Pricing: private tours are quoted per vehicle, per day — not per person */
export const VEHICLE_RATES = { car: 65, van: 110 };
const priceFor = (days, vehicleKey) => days * VEHICLE_RATES[vehicleKey];

const categoryIcon = (cat) => {
  const map = {
    Cultural: <Camera size={13} strokeWidth={2} />,
    Beach: <Waves size={13} strokeWidth={2} />,
    Nature: <Leaf size={13} strokeWidth={2} />,
    Adventure: <Mountain size={13} strokeWidth={2} />,
  };
  return map[cat] || <Compass size={13} strokeWidth={2} />;
};

const difficultyColor = (d) =>
  d === "Easy" ? "bg-green-100 text-green-700"
  : d === "Moderate" ? "bg-amber-100 text-amber-700"
  : "bg-red-100 text-red-700";

const includeIcon = (inc) => {
  const map = {
    Transport: <Car size={10} strokeWidth={2.5} className="text-primary-500" />,
    Guide: <UserCheck size={10} strokeWidth={2.5} className="text-primary-500" />,
    Sightseeing: <Camera size={10} strokeWidth={2.5} className="text-primary-500" />,
    Activities: <Compass size={10} strokeWidth={2.5} className="text-primary-500" />,
  };
  return map[inc] || <Check size={10} strokeWidth={2.5} className="text-primary-500" />;
};

/* Price block shared between grid card & row — shows both vehicle options */
const PriceBlock = ({ days }) => (
  <div>
    <div className="text-lg font-extrabold text-primary-500 leading-tight">
      ${priceFor(days, "car")}
      <span className="text-xs font-normal text-gray-400"> total (car)</span>
    </div>
    <div className="text-xs text-gray-400">${priceFor(days, "van")} total (van)</div>
  </div>
);

/* Tour card — matches the Tours page TourCard exactly */
const TourCard = ({ tour, onSelect, wished, onWish }) => (
  <div
    className="rounded-2xl overflow-hidden border border-gray-100 bg-white cursor-pointer
               transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:border-transparent group"
    onClick={() => onSelect(tour)}
  >
    <div className="relative overflow-hidden">
      <img
        src={tour.img}
        alt={tour.title}
        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
        onError={(e) => { e.target.src = `https://placehold.co/600x400?text=${encodeURIComponent(tour.title)}`; }}
      />
      {tour.tag && (
        <span
          className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-bold text-white"
          style={{ background: tour.tagBg }}
        >
          {tour.tag}
        </span>
      )}
      <button
        className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full border-none shadow-sm
                   flex items-center justify-center cursor-pointer hover:bg-red-50 transition-colors duration-200"
        onClick={(e) => { e.stopPropagation(); onWish(tour.id); }}
      >
        <Heart
          size={15}
          strokeWidth={2}
          fill={wished ? "#EF4444" : "none"}
          className={wished ? "text-red-500" : "text-gray-400"}
        />
      </button>
      <div className="absolute bottom-3 left-3 flex gap-1.5">
        <span className="bg-white/90 px-2 py-0.5 rounded-full text-xs font-semibold text-gray-700 flex items-center gap-1">
          {categoryIcon(tour.category)} {tour.category}
        </span>
        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${difficultyColor(tour.difficulty)}`}>
          {tour.difficulty}
        </span>
      </div>
    </div>

    <div className="px-4 pt-4 pb-5">
      <h3 className="text-base font-bold text-gray-900 mb-2.5 leading-snug">{tour.title}</h3>
      <div className="flex items-center gap-1 mb-2.5 text-gray-400 text-xs">
        <MapPin size={11} strokeWidth={2} />
        {tour.locations?.slice(0, 3).join(" → ")}
        {tour.locations?.length > 3 && ` +${tour.locations.length - 3}`}
      </div>
      <div className="flex gap-3.5 mb-2.5">
        <span className="text-xs text-gray-500 flex items-center gap-1">
          <Calendar size={12} strokeWidth={2} /> {tour.days} days
        </span>
        <span className="text-xs text-gray-500 flex items-center gap-1">
          <Users size={12} strokeWidth={2} /> Max {tour.groupSize}
        </span>
      </div>
      <div className="flex items-center gap-1.5 mb-3">
        {tour.reviews > 0 ? (
          <>
            <Stars rating={tour.rating} />
            <span className="text-xs font-bold text-gray-900">{tour.rating}</span>
            <span className="text-xs text-gray-400">({tour.reviews})</span>
          </>
        ) : (
          <span className="bg-primary-50 text-primary-600 text-xs font-bold px-2 py-0.5 rounded-full">
            New Tour
          </span>
        )}
      </div>
      <div className="flex gap-1.5 flex-wrap mb-3.5">
        {(tour.includes || []).slice(0, 3).map((inc) => (
          <span
            key={inc}
            className="bg-gray-100 text-gray-700 text-xs font-medium px-2 py-0.5 rounded flex items-center gap-1"
          >
            {includeIcon(inc)} {inc}
          </span>
        ))}
      </div>
      <div className="flex justify-between items-center pt-3.5 border-t border-gray-100">
        <PriceBlock days={tour.days} />
        
      </div>
    </div>
  </div>
);

const ToursSection = () => {
  const [selectedTour, setSelectedTour] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const featuredTours = toursData.slice(0, 6);

  const toggleWish = (id) =>
    setWishlist((w) => (w.includes(id) ? w.filter((x) => x !== id) : [...w, id]));

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
            <a
              href="/tours"
              className="text-sm font-semibold text-primary-600 hover:text-primary-700 flex items-center gap-1"
            >
              View All Tours →
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 animate-on-scroll animate-stagger">
            {featuredTours.map((tour) => (
              <TourCard
                key={tour.id}
                tour={tour}
                onSelect={setSelectedTour}
                wished={wishlist.includes(tour.id)}
                onWish={toggleWish}
              />
            ))}
          </div>
        </div>
      </section>
      <TourDetailModal
        tour={selectedTour}
        onClose={() => setSelectedTour(null)}
        wished={selectedTour ? wishlist.includes(selectedTour.id) : false}
        onWish={toggleWish}
      />
    </>
  );
};

export default ToursSection;