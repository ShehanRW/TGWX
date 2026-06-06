import { useState } from "react";
import {
  Search, Star, Calendar, Users, Heart, Check, MapPin,
  ChevronDown, ChevronUp, X, SlidersHorizontal,
  Grid3X3, List, Compass, Mountain, Waves, Leaf,
  Camera, Shield, Bus, Utensils, Bed, ArrowRight, Flame
} from "lucide-react";
import TOURS_DATA from "../data/tours.json";

/* ─────────────────────────────────────────────
   DATA - Imported from tours.json
───────────────────────────────────────────── */
const ALL_TOURS = TOURS_DATA;

const CATEGORIES  = ["All", "Cultural", "Beach", "Nature", "Adventure"];
const DURATIONS   = ["Any", "1–4 Days", "5–7 Days", "8+ Days"];
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

const Stars = ({ rating, size = 13 }) => (
  <span className="inline-flex gap-px">
    {[1, 2, 3, 4, 5].map(i => (
      <Star key={i} size={size} strokeWidth={0}
        fill={i <= Math.round(rating) ? "#00AA6C" : "#D1D5DB"} />
    ))}
  </span>
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
        {tour.locations.slice(0, 3).join(" → ")}
        {tour.locations.length > 3 && ` +${tour.locations.length - 3}`}
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
        <Stars rating={tour.rating} />
        <span className="text-xs font-bold text-gray-900">{tour.rating}</span>
        <span className="text-xs text-gray-400">({tour.reviews})</span>
      </div>
      <div className="flex gap-1.5 flex-wrap mb-3.5">
        {tour.includes.map(inc => (
          <span key={inc}
            className="bg-gray-100 text-gray-700 text-xs font-medium px-2 py-0.5 rounded
                       flex items-center gap-1">
            <Check size={10} strokeWidth={2.5} className="text-primary-500" /> {inc}
          </span>
        ))}
      </div>
      <div className="flex justify-between items-center pt-3.5 border-t border-gray-100">
        <div>
          {tour.oldPrice && <div className="text-xs text-gray-400 line-through">${tour.oldPrice}</div>}
          <div className="text-lg font-extrabold text-primary-500">
            ${tour.price}<span className="text-xs font-normal text-gray-400">/person</span>
          </div>
        </div>
        <button
          className="px-3.5 py-2 rounded-lg text-xs font-semibold text-white
                     bg-primary-500 border-none cursor-pointer
                     hover:bg-primary-600 transition-colors duration-200"
          onClick={e => { e.stopPropagation(); onSelect(tour); }}
        >
          Book Now
        </button>
      </div>
    </div>
  </div>
);

/* ─────────────────────────────────────────────
   TOUR LIST ROW
───────────────────────────────────────────── */
const TourRow = ({ tour, onSelect, wished, onWish }) => (
  <div
    className="flex bg-white border border-gray-100 rounded-2xl overflow-hidden cursor-pointer
               hover:shadow-lg hover:border-transparent transition-all duration-300"
    onClick={() => onSelect(tour)}
  >
    <div className="relative w-48 flex-shrink-0 overflow-hidden">
      <img
        src={tour.img} alt={tour.title}
        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        onError={e => { e.target.src = `https://placehold.co/800x400?text=${encodeURIComponent(tour.title)}`; }}
      />
      <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full text-xs font-bold text-white"
        style={{ background: tour.tagBg }}>{tour.tag}</span>
    </div>
    <div className="flex-1 px-5 py-4 flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-start mb-1">
          <h3 className="text-base font-bold text-gray-900">{tour.title}</h3>
          <button className="border-none bg-transparent cursor-pointer hover:bg-red-50 rounded-full w-8 h-8 flex items-center justify-center"
            onClick={e => { e.stopPropagation(); onWish(tour.id); }}>
            <Heart size={14} strokeWidth={2} fill={wished ? "#EF4444" : "none"} className={wished ? "text-red-500" : "text-gray-400"} />
          </button>
        </div>
        <p className="text-xs text-gray-500 mb-2 leading-relaxed line-clamp-2">{tour.description}</p>
        <div className="flex items-center gap-1 text-gray-400 text-xs mb-2">
          <MapPin size={10} strokeWidth={2} /> {tour.locations.join(" → ")}
        </div>
      </div>
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex gap-3.5 flex-wrap items-center">
          <span className="text-xs text-gray-500 flex items-center gap-1"><Calendar size={10} strokeWidth={2} /> {tour.days}D/{tour.nights}N</span>
          <span className="text-xs text-gray-500 flex items-center gap-1"><Users size={10} strokeWidth={2} /> Max {tour.groupSize}</span>
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${difficultyColor(tour.difficulty)}`}>{tour.difficulty}</span>
          <div className="flex items-center gap-1">
            <Stars rating={tour.rating} size={11} />
            <span className="text-xs font-bold text-gray-800">{tour.rating}</span>
            <span className="text-xs text-gray-400">({tour.reviews})</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div>
            {tour.oldPrice && <div className="text-xs text-gray-400 line-through">${tour.oldPrice}</div>}
            <div className="text-lg font-extrabold text-primary-500">${tour.price}<span className="text-xs font-normal text-gray-400">/person</span></div>
          </div>
          <button
            className="px-3.5 py-2 rounded-lg text-xs font-semibold text-white bg-primary-500 border-none cursor-pointer hover:bg-primary-600 transition-colors duration-200"
            onClick={e => { e.stopPropagation(); onSelect(tour); }}
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  </div>
);

/* ─────────────────────────────────────────────
   TOUR DETAIL MODAL
───────────────────────────────────────────── */
const TourDetail = ({ tour, onClose, wished, onWish }) => {
  const [openDay, setOpenDay] = useState(1);
  const [tab, setTab]         = useState("itinerary");
  const savings = tour.oldPrice ? tour.oldPrice - tour.price : null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 overflow-y-auto py-8 px-4">
      <div className="bg-white rounded-3xl w-full max-w-3xl shadow-2xl overflow-hidden">

        {/* Hero image */}
        <div className="relative h-60">
          <img src={tour.img} alt={tour.title}
            className="w-full h-full object-cover"
            onError={e => { e.target.src = `https://placehold.co/800x400?text=${encodeURIComponent(tour.title)}`; }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
          <button onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 bg-white/90 rounded-full border-none
                       flex items-center justify-center cursor-pointer hover:bg-white transition-colors">
            <X size={16} strokeWidth={2} className="text-gray-700" />
          </button>
          <button onClick={() => onWish(tour.id)}
            className="absolute top-4 right-16 w-9 h-9 bg-white/90 rounded-full border-none
                       flex items-center justify-center cursor-pointer hover:bg-white transition-colors">
            <Heart size={15} strokeWidth={2}
              fill={wished ? "#EF4444" : "none"}
              className={wished ? "text-red-500" : "text-gray-600"} />
          </button>
          <div className="absolute bottom-5 left-6">
            <div className="flex gap-2 mb-2">
              <span className="px-2.5 py-1 rounded-full text-xs font-bold text-white" style={{ background: tour.tagBg }}>{tour.tag}</span>
              <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${difficultyColor(tour.difficulty)}`}>{tour.difficulty}</span>
            </div>
            <h2 className="text-2xl font-extrabold text-white">{tour.title}</h2>
            <div className="flex items-center gap-1.5 mt-1">
              <Stars rating={tour.rating} size={13} />
              <span className="text-white font-bold text-sm">{tour.rating}</span>
              <span className="text-white/70 text-xs">({tour.reviews} reviews)</span>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Quick stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {[
              { label: "Duration",   val: `${tour.days}D / ${tour.nights}N` },
              { label: "Group Size", val: `Max ${tour.groupSize}` },
              { label: "Locations",  val: `${tour.locations.length} stops` },
              { label: "Difficulty", val: tour.difficulty },
            ].map(({ label, val }) => (
              <div key={label} className="bg-primary-50 rounded-xl px-3 py-2.5 text-center">
                <div className="text-xs text-gray-400 mb-0.5">{label}</div>
                <div className="text-sm font-bold text-gray-900">{val}</div>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mb-5 bg-gray-100 p-1 rounded-xl w-fit">
            {["itinerary", "highlights", "includes"].map(t => (
              <button key={t} onClick={() => setTab(t)}
                className={`px-4 py-1.5 rounded-lg text-sm font-semibold border-none cursor-pointer font-sans capitalize transition-all duration-200
                  ${tab === t ? "bg-white text-primary-600 shadow-sm" : "bg-transparent text-gray-500 hover:text-gray-700"}`}>
                {t}
              </button>
            ))}
          </div>

          {/* Itinerary */}
          {tab === "itinerary" && (
            <div className="space-y-2 mb-6">
              <p className="text-sm text-gray-500 leading-relaxed mb-4">{tour.description}</p>
              {tour.itinerary.map(item => (
                <div key={item.day} className="border border-gray-100 rounded-xl overflow-hidden">
                  <button
                    className="w-full flex items-center justify-between px-4 py-3 bg-white border-none
                               cursor-pointer font-sans hover:bg-primary-50 transition-colors duration-150"
                    onClick={() => setOpenDay(openDay === item.day ? null : item.day)}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-primary-500 text-white text-xs font-bold
                                       flex items-center justify-center flex-shrink-0">
                        {item.day}
                      </span>
                      <span className="text-sm font-semibold text-gray-900 text-left">{item.title}</span>
                    </div>
                    {openDay === item.day
                      ? <ChevronUp size={15} strokeWidth={2} className="text-gray-400 flex-shrink-0" />
                      : <ChevronDown size={15} strokeWidth={2} className="text-gray-400 flex-shrink-0" />}
                  </button>
                  {openDay === item.day && (
                    <div className="px-4 pb-3.5 pt-1 bg-primary-50 border-t border-primary-100">
                      <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Highlights */}
          {tab === "highlights" && (
            <div className="mb-6">
              <p className="text-sm text-gray-500 leading-relaxed mb-4">{tour.description}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-5">
                {tour.highlights.map(h => (
                  <div key={h} className="flex items-center gap-2.5 bg-primary-50 rounded-xl px-4 py-3">
                    <div className="w-5 h-5 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check size={10} strokeWidth={3} className="text-white" />
                    </div>
                    <span className="text-sm font-semibold text-gray-800">{h}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-1.5 flex-wrap">
                {tour.locations.map((loc, i) => (
                  <div key={loc} className="flex items-center gap-1.5">
                    <span className="bg-white border border-gray-200 text-gray-700 text-xs font-semibold px-3 py-1.5 rounded-full">{loc}</span>
                    {i < tour.locations.length - 1 && <ArrowRight size={11} strokeWidth={2} className="text-primary-400" />}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Includes */}
          {tab === "includes" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {[
                { icon: <Bed size={15} strokeWidth={2} className="text-primary-500" />, label: "Accommodation", desc: "Hand-picked hotels, guesthouses, and eco-lodges." },
                { icon: <Utensils size={15} strokeWidth={2} className="text-primary-500" />, label: "Meals", desc: "Daily breakfast; most lunches and dinners included." },
                { icon: <Bus size={15} strokeWidth={2} className="text-primary-500" />, label: "Transport", desc: "All transfers, domestic travel, and airport pick-up." },
                { icon: <Compass size={15} strokeWidth={2} className="text-primary-500" />, label: "Expert Guide", desc: "English-speaking licensed tour guide throughout." },
                { icon: <Shield size={15} strokeWidth={2} className="text-primary-500" />, label: "Travel Insurance", desc: "Basic travel and accident insurance included." },
                { icon: <Camera size={15} strokeWidth={2} className="text-primary-500" />, label: "Entry Tickets", desc: "All monument and national park entry fees covered." },
              ].map(({ icon, label, desc }) => (
                <div key={label} className="flex gap-3 bg-gray-50 rounded-xl px-4 py-3">
                  <div className="mt-0.5 flex-shrink-0">{icon}</div>
                  <div>
                    <div className="text-sm font-bold text-gray-900">{label}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Booking footer */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between
                          gap-4 pt-4 border-t border-gray-100">
            <div>
              {tour.oldPrice && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-400 line-through">${tour.oldPrice}</span>
                  {savings && (
                    <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-0.5 rounded-full">
                      Save ${savings}
                    </span>
                  )}
                </div>
              )}
              <div className="text-2xl font-extrabold text-primary-500">
                ${tour.price}<span className="text-sm font-normal text-gray-400 ml-1">/ person</span>
              </div>
              <div className="text-xs text-gray-400 mt-0.5">All inclusive · Free cancellation 30 days prior</div>
            </div>
            <div className="flex gap-3">
              <button className="px-5 py-2.5 rounded-lg border-2 border-primary-500 text-primary-600 font-semibold
                                 text-sm cursor-pointer bg-transparent hover:bg-primary-50 transition-colors duration-200 font-sans">
                Enquire
              </button>
              <button className="px-6 py-2.5 rounded-lg bg-primary-500 text-white font-semibold
                                 text-sm cursor-pointer border-none hover:bg-primary-600 transition-colors duration-200 font-sans">
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

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
  const [selected,    setSelected]    = useState(null);
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
        if (duration === "1–4 Days" && t.days > 4) return false;
        if (duration === "5–7 Days" && (t.days < 5 || t.days > 7)) return false;
        if (duration === "8+ Days" && t.days < 8) return false;
      }
      if (difficulty !== "Any" && t.difficulty !== difficulty) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "price-asc")  return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
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
    <div className="font-sans bg-white text-gray-900 overflow-x-hidden">
      <section className="py-20 px-12 bg-white">
        <div className="max-w-[1200px] mx-auto">

          {/* ── Section header — identical to Home ── */}
          <div className="flex justify-between items-end mb-7 flex-wrap gap-4">
            <div>
              <span className="bg-red-100 text-red-600 px-3.5 py-1.5 rounded-full text-sm font-semibold
                               flex items-center gap-1.5 w-fit">
                <Flame size={13} strokeWidth={2} /> Hot Deals
              </span>
              <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 mt-3">
                Tours & Itineraries
              </h2>
              <p className="text-gray-500 text-base mt-1">
                Expertly crafted journeys across Sri Lanka
              </p>
            </div>

            {/* Search */}
            <div className="flex bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
              <div className="flex items-center px-3 gap-2">
                <Search size={15} strokeWidth={2} className="text-gray-400" />
                <input
                  type="text"
                  placeholder="Search tours or destinations..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="border-none outline-none py-2.5 text-sm font-sans text-gray-900
                             placeholder-gray-400 bg-transparent w-52"
                />
                {search && (
                  <button onClick={() => setSearch("")}
                    className="border-none bg-transparent cursor-pointer text-gray-400 hover:text-gray-600">
                    <X size={13} strokeWidth={2} />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* ── Filter bar ── */}
          <div className="flex flex-wrap items-center gap-2.5 mb-5">
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium border cursor-pointer
                            whitespace-nowrap transition-all duration-200 font-sans flex items-center gap-1.5
                            ${category === cat
                              ? "bg-primary-500 text-white border-primary-500"
                              : "bg-white text-gray-700 border-gray-200 hover:border-primary-500 hover:text-primary-500"}`}>
                {cat !== "All" && categoryIcon(cat)} {cat}
              </button>
            ))}

            <div className="flex-1" />

            {/* Advanced filters toggle */}
            <button onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium border cursor-pointer font-sans transition-all duration-200
                ${showFilters || activeFilterCount > 0
                  ? "bg-primary-500 text-white border-primary-500"
                  : "bg-white text-gray-700 border-gray-200 hover:border-primary-500 hover:text-primary-500"}`}>
              <SlidersHorizontal size={13} strokeWidth={2} /> Filters
              {activeFilterCount > 0 && (
                <span className="w-4 h-4 bg-white text-primary-600 rounded-full text-xs font-bold flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>

            {/* Sort */}
            <select value={sortBy} onChange={e => setSortBy(e.target.value)}
              className="px-4 py-2 rounded-full text-sm font-medium border border-gray-200 bg-white
                         text-gray-700 cursor-pointer font-sans outline-none
                         hover:border-primary-500 transition-colors">
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
              <option value="duration">Shortest First</option>
            </select>

            {/* View toggle */}
            <div className="flex bg-white border border-gray-200 rounded-full overflow-hidden">
              <button onClick={() => setViewMode("grid")}
                className={`px-3 py-2 border-none cursor-pointer transition-colors duration-150
                  ${viewMode === "grid" ? "bg-primary-500 text-white" : "bg-transparent text-gray-500 hover:text-gray-700"}`}>
                <Grid3X3 size={14} strokeWidth={2} />
              </button>
              <button onClick={() => setViewMode("list")}
                className={`px-3 py-2 border-none cursor-pointer transition-colors duration-150
                  ${viewMode === "list" ? "bg-primary-500 text-white" : "bg-transparent text-gray-500 hover:text-gray-700"}`}>
                <List size={14} strokeWidth={2} />
              </button>
            </div>
          </div>

          {/* Advanced filter panel */}
          {showFilters && (
            <div className="bg-gray-50 border border-gray-100 rounded-2xl px-6 py-5 mb-5 flex flex-wrap gap-6">
              <div>
                <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2.5">Duration</div>
                <div className="flex gap-2 flex-wrap">
                  {DURATIONS.map(d => (
                    <button key={d} onClick={() => setDuration(d)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border cursor-pointer font-sans transition-all duration-200
                        ${duration === d ? "bg-primary-500 text-white border-primary-500" : "bg-white text-gray-600 border-gray-200 hover:border-primary-500"}`}>
                      {d}
                    </button>
                  ))}
                </div>
              </div>
              <div className="w-px bg-gray-200 self-stretch hidden sm:block" />
              <div>
                <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2.5">Difficulty</div>
                <div className="flex gap-2 flex-wrap">
                  {DIFFICULTIES.map(d => (
                    <button key={d} onClick={() => setDifficulty(d)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border cursor-pointer font-sans transition-all duration-200
                        ${difficulty === d ? "bg-primary-500 text-white border-primary-500" : "bg-white text-gray-600 border-gray-200 hover:border-primary-500"}`}>
                      {d}
                    </button>
                  ))}
                </div>
              </div>
              {activeFilterCount > 0 && (
                <button onClick={() => { setDuration("Any"); setDifficulty("Any"); }}
                  className="ml-auto self-center text-xs text-red-500 font-semibold border-none bg-transparent cursor-pointer hover:text-red-700 flex items-center gap-1">
                  <X size={11} strokeWidth={2.5} /> Clear
                </button>
              )}
            </div>
          )}

          {/* Result count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-gray-500">
              Showing <span className="font-bold text-gray-900">{filtered.length}</span> tours
              {category !== "All" && <> in <span className="font-bold text-primary-600">{category}</span></>}
            </p>
            {wishlist.length > 0 && (
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <Heart size={11} fill="#EF4444" strokeWidth={0} /> {wishlist.length} saved
              </span>
            )}
          </div>

          {/* Tours */}
          {filtered.length === 0 ? (
            <div className="text-center py-24">
              <Compass size={44} strokeWidth={1} className="text-gray-300 mx-auto mb-4" />
              <p className="text-base font-bold text-gray-400">No tours match your filters</p>
              <button
                onClick={() => { setSearch(""); setCategory("All"); setDuration("Any"); setDifficulty("Any"); }}
                className="mt-4 px-5 py-2.5 rounded-lg bg-primary-500 text-white font-semibold text-sm border-none cursor-pointer font-sans hover:bg-primary-600 transition-colors">
                Reset All
              </button>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map(tour => (
                <TourCard key={tour.id} tour={tour} onSelect={setSelected}
                  wished={wishlist.includes(tour.id)} onWish={toggleWish} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {filtered.map(tour => (
                <TourRow key={tour.id} tour={tour} onSelect={setSelected}
                  wished={wishlist.includes(tour.id)} onWish={toggleWish} />
              ))}
            </div>
          )}

        </div>
      </section>

      {/* Detail modal */}
      {selected && (
        <TourDetail
          tour={selected}
          onClose={() => setSelected(null)}
          wished={wishlist.includes(selected.id)}
          onWish={toggleWish}
        />
      )}
    </div>
  );
};

export default Tours;