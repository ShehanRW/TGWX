// Tours.jsx
import { useState } from "react";
import {
  Search, Star, Calendar, Users, Heart, Check, MapPin,
  ChevronDown, ChevronUp, X, SlidersHorizontal,
  Grid3X3, List, Compass, Mountain, Waves, Leaf,
  Camera, Car, Bus, ArrowRight, Flame, Luggage, UserCheck
} from "lucide-react";
import TOURS_DATA from "../data/tours.json";
import TourDetailModal from "../components/modals/TourDetailModal";

/* ─────────────────────────────────────────────
   DATA - Imported from tours.json
───────────────────────────────────────────── */
const ALL_TOURS = TOURS_DATA;

/* ── Pricing: private tours are quoted per vehicle, per day —
   not per person. We provide two vehicle types. ── */
export const VEHICLE_RATES = { car: 65, van: 110 };

const priceFor = (days, vehicleKey) => days * VEHICLE_RATES[vehicleKey];

const CATEGORIES  = ["All", "Cultural", "Beach", "Nature", "Adventure"];
const DURATIONS   = ["Any", "1–7 Days", "8–10 Days", "11+ Days"];
const DIFFICULTIES = ["Any", "Easy", "Moderate", "Challenging"];

/* ── helpers ── */
const categoryIcon = (cat) => {
  const map = {
    Cultural:  <Camera size={13} strokeWidth={2} />,
    Beach:     <Waves size={13} strokeWidth={2} />,
    Nature:    <Leaf size={13} strokeWidth={2} />,
    Adventure: <Mountain size={13} strokeWidth={2} />,
  };
  return map[cat] || <Compass size={13} strokeWidth={2} />;
};

const difficultyColor = (d) => {
  if (d === "Easy")     return "bg-green-100 text-green-700";
  if (d === "Moderate") return "bg-amber-100 text-amber-700";
  return "bg-red-100 text-red-700";
};

const includeIcon = (inc) => {
  const map = {
    Transport:   <Car size={10} strokeWidth={2.5} className="text-primary-500" />,
    Guide:       <UserCheck size={10} strokeWidth={2.5} className="text-primary-500" />,
    Sightseeing: <Camera size={10} strokeWidth={2.5} className="text-primary-500" />,
    Activities:  <Compass size={10} strokeWidth={2.5} className="text-primary-500" />,
    Luggage:     <Luggage size={10} strokeWidth={2.5} className="text-primary-500" />,
  };
  return map[inc] || <Check size={10} strokeWidth={2.5} className="text-primary-500" />;
};

const Stars = ({ rating, size = 13 }) => (
  <span className="inline-flex gap-px">
    {[1, 2, 3, 4, 5].map(i => (
      <Star key={i} size={size} strokeWidth={0}
        fill={i <= Math.round(rating) ? "#00AA6C" : "#D1D5DB"} />
    ))}
  </span>
);

/* Price block shared between grid card & row — shows both vehicle options */
const PriceBlock = ({ days, align = "left" }) => (
  <div className={align === "right" ? "text-right" : ""}>
    <div className="text-base sm:text-lg font-extrabold text-primary-500 leading-tight">
      ${priceFor(days, "car")}
      <span className="text-[10px] sm:text-xs font-normal text-gray-400"> total (car)</span>
    </div>
    <div className="text-[10px] sm:text-xs text-gray-400">${priceFor(days, "van")} total (van)</div>
  </div>
);

/* ─────────────────────────────────────────────
   TOUR CARD  (matches Home TourCard exactly)
───────────────────────────────────────────── */
const TourCard = ({ tour, onSelect, wished, onWish }) => (
  <div
    className="rounded-2xl overflow-hidden border border-gray-100 bg-white cursor-pointer
               transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:border-transparent group"
    onClick={() => onSelect(tour)}
  >
    <div className="relative overflow-hidden">
      <img
        src={tour.img} alt={tour.title}
        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
        onError={e => { e.target.src = `https://placehold.co/800x400?text=${encodeURIComponent(tour.title)}`; }}
      />
      <span
        className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-bold text-white"
        style={{ background: tour.tagBg }}
      >
        {tour.tag}
      </span>
      <button
        className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full border-none
                   shadow-sm flex items-center justify-center cursor-pointer
                   hover:bg-red-50 transition-colors duration-200"
        onClick={e => { e.stopPropagation(); onWish(tour.id); }}
      >
        <Heart size={15} strokeWidth={2}
          fill={wished ? "#EF4444" : "none"}
          className={wished ? "text-red-500" : "text-gray-400"} />
      </button>
      <div className="absolute bottom-3 left-3 flex gap-1.5 flex-wrap">
        <span className="bg-white/90 px-2 py-0.5 rounded-full text-xs font-semibold text-gray-700 flex items-center gap-1">
          {categoryIcon(tour.category)} {tour.category}
        </span>
        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${difficultyColor(tour.difficulty)}`}>
          {tour.difficulty}
        </span>
      </div>
    </div>

    <div className="px-3 sm:px-4 pt-3 sm:pt-4 pb-4 sm:pb-5">
      <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-2 leading-snug">{tour.title}</h3>
      <div className="flex items-center gap-1 mb-2 text-gray-400 text-[10px] sm:text-xs">
        <MapPin size={11} strokeWidth={2} />
        {tour.locations.slice(0, 3).join(" → ")}
        {tour.locations.length > 3 && ` +${tour.locations.length - 3}`}
      </div>
      <div className="flex gap-3 mb-2 flex-wrap">
        <span className="text-[10px] sm:text-xs text-gray-500 flex items-center gap-1">
          <Calendar size={12} strokeWidth={2} /> {tour.days} days
        </span>
        <span className="text-[10px] sm:text-xs text-gray-500 flex items-center gap-1">
          <Users size={12} strokeWidth={2} /> Up to {tour.groupSize}
        </span>
      </div>
      <div className="flex items-center gap-1.5 mb-3 flex-wrap">
        {tour.reviews > 0 ? (
          <>
            <Stars rating={tour.rating} />
            <span className="text-xs font-bold text-gray-900">{tour.rating}</span>
            <span className="text-[10px] sm:text-xs text-gray-400">({tour.reviews})</span>
          </>
        ) : (
          <span className="bg-primary-50 text-primary-600 text-xs font-bold px-2 py-0.5 rounded-full">New Tour</span>
        )}
      </div>
      <div className="flex gap-1.5 flex-wrap mb-3">
        {tour.includes.slice(0, 3).map(inc => (
          <span key={inc}
            className="bg-gray-100 text-gray-700 text-[10px] sm:text-xs font-medium px-2 py-0.5 rounded
                       flex items-center gap-1">
            {includeIcon(inc)} {inc}
          </span>
        ))}
        {tour.includes.length > 3 && (
          <span className="bg-gray-100 text-gray-700 text-[10px] sm:text-xs font-medium px-2 py-0.5 rounded">
            +{tour.includes.length - 3}
          </span>
        )}
      </div>
      <div className="flex justify-between items-center pt-3 border-t border-gray-100">
        <PriceBlock days={tour.days} />
      </div>
    </div>
  </div>
);

/* ─────────────────────────────────────────────
   TOUR LIST ROW
───────────────────────────────────────────── */
const TourRow = ({ tour, onSelect, wished, onWish }) => (
  <div
    className="flex flex-col sm:flex-row bg-white border border-gray-100 rounded-2xl overflow-hidden cursor-pointer
               hover:shadow-lg hover:border-transparent transition-all duration-300"
    onClick={() => onSelect(tour)}
  >
    <div className="relative w-full sm:w-48 h-48 sm:h-auto flex-shrink-0 overflow-hidden">
      <img
        src={tour.img} alt={tour.title}
        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        onError={e => { e.target.src = `https://placehold.co/800x400?text=${encodeURIComponent(tour.title)}`; }}
      />
      <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full text-xs font-bold text-white"
        style={{ background: tour.tagBg }}>{tour.tag}</span>
    </div>
    <div className="flex-1 px-4 sm:px-5 py-4 flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-start mb-1 gap-2">
          <h3 className="text-sm sm:text-base font-bold text-gray-900">{tour.title}</h3>
          <button className="border-none bg-transparent cursor-pointer hover:bg-red-50 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0"
            onClick={e => { e.stopPropagation(); onWish(tour.id); }}>
            <Heart size={14} strokeWidth={2} fill={wished ? "#EF4444" : "none"} className={wished ? "text-red-500" : "text-gray-400"} />
          </button>
        </div>
        <p className="text-[10px] sm:text-xs text-gray-500 mb-2 leading-relaxed line-clamp-2">{tour.description}</p>
        <div className="flex items-center gap-1 text-gray-400 text-[10px] sm:text-xs mb-2">
          <MapPin size={10} strokeWidth={2} /> {tour.locations.join(" → ")}
        </div>
      </div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2 sm:gap-3 items-center">
          <span className="text-[10px] sm:text-xs text-gray-500 flex items-center gap-1"><Calendar size={10} strokeWidth={2} /> {tour.days}D/{tour.nights}N</span>
          <span className="text-[10px] sm:text-xs text-gray-500 flex items-center gap-1"><Users size={10} strokeWidth={2} /> Up to {tour.groupSize}</span>
          <span className={`text-[10px] sm:text-xs px-2 py-0.5 rounded-full font-medium ${difficultyColor(tour.difficulty)}`}>{tour.difficulty}</span>
          {tour.reviews > 0 ? (
            <div className="flex items-center gap-1">
              <Stars rating={tour.rating} size={11} />
              <span className="text-[10px] sm:text-xs font-bold text-gray-800">{tour.rating}</span>
              <span className="text-[10px] sm:text-xs text-gray-400">({tour.reviews})</span>
            </div>
          ) : (
            <span className="bg-primary-50 text-primary-600 text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-full">New Tour</span>
          )}
        </div>
        <div className="w-full sm:w-auto">
          <PriceBlock days={tour.days} align="right" />
        </div>
      </div>
    </div>
  </div>
);

/* ─────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────── */
const Tours = () => {
  const [search,      setSearch]      = useState("");
  const [category,    setCategory]    = useState("All");
  const [duration,    setDuration]    = useState("Any");
  const [difficulty,  setDifficulty]  = useState("Any");
  const [sortBy,      setSortBy]      = useState("popular");
  const [viewMode,    setViewMode]    = useState("grid");
  const [selectedTour, setSelectedTour] = useState(null);
  const [wishlist,    setWishlist]    = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  const toggleWish = (id) =>
    setWishlist(w => w.includes(id) ? w.filter(x => x !== id) : [...w, id]);

  const filtered = ALL_TOURS
    .filter(t => {
      const q = search.toLowerCase();
      if (q && !t.title.toLowerCase().includes(q) &&
               !t.description.toLowerCase().includes(q) &&
               !t.locations.some(l => l.toLowerCase().includes(q))) return false;
      if (category !== "All" && t.category !== category) return false;
      if (duration !== "Any") {
        if (duration === "1–7 Days" && t.days > 7) return false;
        if (duration === "8–10 Days" && (t.days < 8 || t.days > 10)) return false;
        if (duration === "11+ Days" && t.days < 11) return false;
      }
      if (difficulty !== "Any" && t.difficulty !== difficulty) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "price-asc")  return priceFor(a.days, "car") - priceFor(b.days, "car");
      if (sortBy === "price-desc") return priceFor(b.days, "car") - priceFor(a.days, "car");
      if (sortBy === "rating")     return b.rating - a.rating;
      if (sortBy === "duration")   return a.days - b.days;
      return b.reviews - a.reviews;
    });

  const activeFilterCount = [
    category !== "All",
    duration !== "Any",
    difficulty !== "Any",
  ].filter(Boolean).length;

  return (
    <div className="font-sans bg-white text-gray-900 overflow-x-hidden min-h-screen">
      <section className="pt-[140px] sm:pt-[160px] lg:pt-[180px] pb-10 sm:pb-16 px-4 sm:px-6 lg:px-12 bg-white">
        <div className="max-w-[1200px] mx-auto">

          {/* ── Section header ── */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6 sm:mb-7 gap-4">
            <div>
              <span className="bg-red-100 text-red-600 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-[10px] sm:text-sm font-semibold
                               flex items-center gap-1.5 w-fit">
                <Flame size={13} strokeWidth={2} /> Private Tours
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-gray-900 mt-2 sm:mt-3">
                Tours & Itineraries
              </h2>
              <p className="text-xs sm:text-sm lg:text-base text-gray-500 mt-0.5 sm:mt-1">
                Expertly crafted private journeys across Sri Lanka
              </p>
            </div>

            {/* Search */}
            <div className="w-full sm:w-auto flex bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
              <div className="flex items-center px-3 gap-2 flex-1">
                <Search size={15} strokeWidth={2} className="text-gray-400 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Search tours..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="border-none outline-none py-2.5 text-xs sm:text-sm font-sans text-gray-900
                             placeholder-gray-400 bg-transparent w-full sm:w-48"
                />
                {search && (
                  <button onClick={() => setSearch("")}
                    className="border-none bg-transparent cursor-pointer text-gray-400 hover:text-gray-600 flex-shrink-0">
                    <X size={13} strokeWidth={2} />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* ── Filter bar ── */}
          <div className="flex flex-wrap items-center gap-2 mb-4 sm:mb-5">
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setCategory(cat)}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-sm font-medium border cursor-pointer
                            whitespace-nowrap transition-all duration-200 font-sans flex items-center gap-1 min-h-[36px] sm:min-h-[44px]
                            ${category === cat
                              ? "bg-primary-500 text-white border-primary-500"
                              : "bg-white text-gray-700 border-gray-200 hover:border-primary-500 hover:text-primary-500"}`}>
                {cat !== "All" && categoryIcon(cat)} {cat}
              </button>
            ))}

            <div className="flex-1 min-w-[8px]" />

            {/* Advanced filters toggle */}
            <button onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-sm font-medium border cursor-pointer font-sans transition-all duration-200 min-h-[36px] sm:min-h-[44px]
                ${showFilters || activeFilterCount > 0
                  ? "bg-primary-500 text-white border-primary-500"
                  : "bg-white text-gray-700 border-gray-200 hover:border-primary-500 hover:text-primary-500"}`}>
              <SlidersHorizontal size={13} strokeWidth={2} /> <span className="hidden sm:inline">Filters</span>
              {activeFilterCount > 0 && (
                <span className="w-4 h-4 bg-white text-primary-600 rounded-full text-xs font-bold flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>

            {/* Sort */}
            <select value={sortBy} onChange={e => setSortBy(e.target.value)}
              className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-sm font-medium border border-gray-200 bg-white
                         text-gray-700 cursor-pointer font-sans outline-none min-h-[36px] sm:min-h-[44px]
                         hover:border-primary-500 transition-colors">
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
              <option value="duration">Shortest First</option>
            </select>

            {/* View toggle */}
            <div className="flex bg-white border border-gray-200 rounded-full overflow-hidden flex-shrink-0">
              <button onClick={() => setViewMode("grid")}
                className={`px-2.5 sm:px-3 py-1.5 sm:py-2 border-none cursor-pointer transition-colors duration-150 min-h-[36px] sm:min-h-[44px]
                  ${viewMode === "grid" ? "bg-primary-500 text-white" : "bg-transparent text-gray-500 hover:text-gray-700"}`}>
                <Grid3X3 size={14} strokeWidth={2} />
              </button>
              <button onClick={() => setViewMode("list")}
                className={`px-2.5 sm:px-3 py-1.5 sm:py-2 border-none cursor-pointer transition-colors duration-150 min-h-[36px] sm:min-h-[44px]
                  ${viewMode === "list" ? "bg-primary-500 text-white" : "bg-transparent text-gray-500 hover:text-gray-700"}`}>
                <List size={14} strokeWidth={2} />
              </button>
            </div>
          </div>

          {/* Advanced filter panel */}
          {showFilters && (
            <div className="bg-gray-50 border border-gray-100 rounded-2xl px-4 sm:px-6 py-4 sm:py-5 mb-4 sm:mb-5 flex flex-wrap gap-4 sm:gap-6">
              <div className="w-full sm:w-auto">
                <div className="text-[10px] sm:text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Duration</div>
                <div className="flex gap-2 flex-wrap">
                  {DURATIONS.map(d => (
                    <button key={d} onClick={() => setDuration(d)}
                      className={`px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-semibold border cursor-pointer font-sans transition-all duration-200 min-h-[32px] sm:min-h-[36px]
                        ${duration === d ? "bg-primary-500 text-white border-primary-500" : "bg-white text-gray-600 border-gray-200 hover:border-primary-500"}`}>
                      {d}
                    </button>
                  ))}
                </div>
              </div>
              <div className="w-full sm:w-auto">
                <div className="text-[10px] sm:text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Difficulty</div>
                <div className="flex gap-2 flex-wrap">
                  {DIFFICULTIES.map(d => (
                    <button key={d} onClick={() => setDifficulty(d)}
                      className={`px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-semibold border cursor-pointer font-sans transition-all duration-200 min-h-[32px] sm:min-h-[36px]
                        ${difficulty === d ? "bg-primary-500 text-white border-primary-500" : "bg-white text-gray-600 border-gray-200 hover:border-primary-500"}`}>
                      {d}
                    </button>
                  ))}
                </div>
              </div>
              {activeFilterCount > 0 && (
                <button onClick={() => { setDuration("Any"); setDifficulty("Any"); }}
                  className="w-full sm:w-auto ml-auto self-center text-xs text-red-500 font-semibold border-none bg-transparent cursor-pointer hover:text-red-700 flex items-center justify-center gap-1 min-h-[32px]">
                  <X size={11} strokeWidth={2.5} /> Clear
                </button>
              )}
            </div>
          )}

          {/* Result count */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4 sm:mb-6">
            <p className="text-[10px] sm:text-sm text-gray-500">
              Showing <span className="font-bold text-gray-900">{filtered.length}</span> tours
              {category !== "All" && <> in <span className="font-bold text-primary-600">{category}</span></>}
            </p>
            {wishlist.length > 0 && (
              <span className="text-[10px] sm:text-xs text-gray-400 flex items-center gap-1">
                <Heart size={11} fill="#EF4444" strokeWidth={0} /> {wishlist.length} saved
              </span>
            )}
          </div>

          {/* Tours */}
          {filtered.length === 0 ? (
            <div className="text-center py-16 sm:py-24">
              <Compass size={44} strokeWidth={1} className="text-gray-300 mx-auto mb-4" />
              <p className="text-base font-bold text-gray-400">No tours match your filters</p>
              <button
                onClick={() => { setSearch(""); setCategory("All"); setDuration("Any"); setDifficulty("Any"); }}
                className="mt-4 px-5 py-2.5 rounded-lg bg-primary-500 text-white font-semibold text-sm border-none cursor-pointer font-sans hover:bg-primary-600 transition-colors min-h-[44px]">
                Reset All
              </button>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {filtered.map(tour => (
                <TourCard key={tour.id} tour={tour} onSelect={setSelectedTour}
                  wished={wishlist.includes(tour.id)} onWish={toggleWish} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-3 sm:gap-4">
              {filtered.map(tour => (
                <TourRow key={tour.id} tour={tour} onSelect={setSelectedTour}
                  wished={wishlist.includes(tour.id)} onWish={toggleWish} />
              ))}
            </div>
          )}

        </div>
      </section>

      {/* Detail modal - using the imported component */}
      <TourDetailModal
        tour={selectedTour}
        onClose={() => setSelectedTour(null)}
        wished={selectedTour ? wishlist.includes(selectedTour.id) : false}
        onWish={toggleWish}
      />
    </div>
  );
};

export default Tours;