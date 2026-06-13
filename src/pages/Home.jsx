import { useState, useEffect, useRef } from "react";
import {
  Search, Star, MapPin, Calendar, Users, Heart,
  Check, Mail, Lock, Globe, Facebook, Twitter,
  Linkedin, Instagram, Smartphone, Tag, Flame,
  ThumbsUp, MessageSquare, Award, Plane, Send,
  Apple, PlayCircle, Map, Hotel, Backpack, ShieldCheck, PhoneCall, ExternalLink, X,
  ChevronDown, ChevronUp, Compass, Mountain, Waves, Leaf,
  Camera, Shield, Bus, Utensils, Bed, ArrowRight, ChevronLeft, ChevronRight
} from "lucide-react";
import destinationsData from "../data/destinations.json";
import toursData from "../data/tours.json";
import servicesData from "../data/services.json";

import { Link } from "react-router-dom";

import heroMain from "../assets/hero-main.jpg";
import heroTop from "../assets/hero-top.jpg";
import heroBottom from "../assets/hero-bottom.jpg";
import logo from "../assets/logo.png";                                 // ← logo

const useScrollAnimation = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    const elements = document.querySelectorAll(".animate-on-scroll");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
};

const AnimationStyles = () => (
  <style>{`
    /* Base hidden state */
    .animate-on-scroll {
      opacity: 0;
      transform: translateY(28px);
      transition: opacity 0.55s cubic-bezier(.4,0,.2,1), transform 0.55s cubic-bezier(.4,0,.2,1);
    }
    /* Visible state */
    .animate-on-scroll.animate-visible {
      opacity: 1;
      transform: translateY(0);
    }
    /* Stagger delays for grid children */
    .animate-stagger > *:nth-child(1) { transition-delay: 0ms; }
    .animate-stagger > *:nth-child(2) { transition-delay: 80ms; }
    .animate-stagger > *:nth-child(3) { transition-delay: 160ms; }
    .animate-stagger > *:nth-child(4) { transition-delay: 240ms; }
    .animate-stagger > *:nth-child(5) { transition-delay: 320ms; }
    .animate-stagger > *:nth-child(6) { transition-delay: 400ms; }

    /* Fade in only (no slide) */
    .animate-fade {
      opacity: 0;
      transition: opacity 0.6s ease;
    }
    .animate-fade.animate-visible {
      opacity: 1;
    }

    /* Slide from left */
    .animate-left {
      opacity: 0;
      transform: translateX(-32px);
      transition: opacity 0.55s cubic-bezier(.4,0,.2,1), transform 0.55s cubic-bezier(.4,0,.2,1);
    }
    .animate-left.animate-visible {
      opacity: 1;
      transform: translateX(0);
    }

    /* Hide scrollbar on review carousel */
    .reviews-scroll::-webkit-scrollbar { display: none; }
  `}</style>
);

// Mock Reviews Data
const getMockReviews = () => [
  {
    id: 1,
    reviewer: "Liz W",
    rating: 5,
    date: "March 2026",
    location: "United Kingdom",
    title: "Fantastic driver and lovely person",
    text: "We were so lucky to have Kamal as our driver guide. From the moment he picked us up from Negombo, to when he dropped us off in Tangalle a week later, we couldn't have asked for a nicer person to help us make the most of our travels in Sri Lanka. We were a party of 3 females (1 x 60+, 2x 20+) and he was always kind, courteous and attentive.",
    tour: "Custom Sri Lanka Tour",
    platform: "TripAdvisor",
    contributions: "2 contributions"
  },
  {
    id: 2,
    reviewer: "Jula N",
    rating: 5,
    date: "February 2026",
    location: "Germany",
    title: "If You Need a Driver in Sri Lanka – This Is Your Guy!",
    text: "If you're looking for a driver in Sri Lanka, honestly—stop searching, you've just found the one. From day one, Kamal was everything you could hope for and more: always on time, super reliable, and just genuinely kind. We felt completely safe and taken care of throughout the whole trip.",
    tour: "Custom Sri Lanka Tour",
    platform: "TripAdvisor",
    contributions: "5 contributions"
  },
  {
    id: 3,
    reviewer: "Michelle R",
    rating: 5,
    date: "January 2026",
    location: "United Kingdom",
    title: "Incredible trip with an even better tour guide/driver",
    text: "We had an incredible experience with Kamal. He was so friendly, kind, and genuinely caring making us feel completely at ease. The trip was seamless and stress-free thanks to his professionalism and thoughtful attention to detail.",
    tour: "Custom Sri Lanka Tour",
    platform: "TripAdvisor",
    contributions: "4 contributions"
  },
  {
    id: 4,
    reviewer: "Stay51790330359",
    rating: 5,
    date: "December 2025",
    location: "United Kingdom",
    title: "Sri Lanka with Kamal",
    text: "I have just spent 10 days touring around Sri Lanka with Kamal as our driver and guide. Alongside being a brilliant driver, always on time and calm on sometimes busy roads Kamal has a wide ranging knowledge and passion for Sri Lanka.",
    tour: "10-Day Sri Lanka Tour",
    platform: "TripAdvisor",
    contributions: "3 contributions"
  },
  {
    id: 5,
    reviewer: "Bevan A",
    rating: 5,
    date: "November 2025",
    location: "Australia",
    title: "Unforgettable Sri Lanka Tour with Exceptional Service",
    text: "An amazing experience and the perfect way to see the very best of Sri Lanka. Kamal was an incredibly patient, informative, and professional driver throughout our tour.",
    tour: "Custom Sri Lanka Tour",
    platform: "TripAdvisor",
    contributions: "5 contributions"
  },
  {
    id: 6,
    reviewer: "Benjamin K",
    rating: 5,
    date: "October 2025",
    location: "London, United Kingdom",
    title: "Feedback on Kamal",
    text: "Kamal acted as guide and driver whilst we were in Sri Lanka. He drove well, was punctual and knew all the best sites and restaurants to go to. He was also kind and good company. Highly recommended.",
    tour: "Custom Sri Lanka Tour",
    platform: "TripAdvisor",
    contributions: "23 contributions"
  }
];

const iconMap = { Map, Hotel, Backpack, Plane, ShieldCheck, PhoneCall };

/* ── Stars ── */
const Stars = ({ rating, size = 14 }) => (
  <span className="inline-flex gap-px">
    {[1, 2, 3, 4, 5].map((i) => (
      <Star key={i} size={size} strokeWidth={0} fill={i <= Math.round(rating) ? "#00AA6C" : "#D1D5DB"} />
    ))}
  </span>
);

const difficultyColor = (d) =>
  d === "Easy" ? "bg-green-100 text-green-700"
  : d === "Moderate" ? "bg-amber-100 text-amber-700"
  : "bg-red-100 text-red-700";

const categoryIcon = (cat) => {
  const map = {
    Cultural: <Camera size={13} strokeWidth={2} />,
    Beach: <Waves size={13} strokeWidth={2} />,
    Nature: <Leaf size={13} strokeWidth={2} />,
    Adventure: <Mountain size={13} strokeWidth={2} />,
  };
  return map[cat] || <Compass size={13} strokeWidth={2} />;
};

/* ── Destination Modal ── */
const DestinationModal = ({ destination, onClose }) => {
  if (!destination) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 overflow-y-auto py-8 px-4">
      <div className="bg-white rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
        <div className="relative h-72">
          <img src={destination.img} alt={destination.name} className="w-full h-full object-cover"
            onError={(e) => { e.target.src = "https://placehold.co/1200x600?text=" + encodeURIComponent(destination.name); }} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <button onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors">
            <X size={20} className="text-gray-700" />
          </button>
          {destination.badge && destination.badgeColor && (
            <span className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-bold"
              style={{ background: destination.badgeColor.bg, color: destination.badgeColor.color }}>
              {destination.badge}
            </span>
          )}
          <div className="absolute bottom-6 left-6">
            <span className="inline-flex items-center gap-1.5 bg-white/90 px-3 py-1.5 rounded-full text-xs font-semibold text-gray-700 mb-2">
              <Tag size={12} /> {destination.tag}
            </span>
            <h2 className="text-3xl font-extrabold text-white mt-2">{destination.name}</h2>
          </div>
        </div>
        <div className="p-8">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <Stars rating={destination.rating} size={18} />
              <span className="text-lg font-bold text-gray-900">{destination.rating}</span>
              <span className="text-gray-400">({destination.reviews} reviews)</span>
            </div>
            {destination.price && (
              <div className="text-right">
                <div className="text-sm text-gray-500">Starting from</div>
                <div className="text-2xl font-extrabold text-primary-500">{destination.price}</div>
              </div>
            )}
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-3">About {destination.name}</h3>
            <p className="text-gray-600 leading-relaxed">{destination.description}</p>
          </div>
          {destination.highlights && (
            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Highlights</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {destination.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-center gap-2.5">
                    <div className="w-5 h-5 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check size={10} strokeWidth={3} className="text-white" />
                    </div>
                    <span className="text-sm text-gray-700">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="flex gap-4 pt-6 border-t border-gray-100">
            <button className="flex-1 px-6 py-3 bg-primary-500 text-white rounded-xl font-semibold hover:bg-primary-600 transition-colors">
              Book This Destination
            </button>
            <button className="px-6 py-3 border-2 border-primary-500 text-primary-500 rounded-xl font-semibold hover:bg-primary-50 transition-colors">
              Save to Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ── Tour Detail Modal ── */
const TourDetailModal = ({ tour, onClose, wished, onWish }) => {
  const [openDay, setOpenDay] = useState(1);
  const [tab, setTab] = useState("itinerary");
  const savings = tour?.oldPrice ? tour.oldPrice - tour.price : null;
  if (!tour) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 overflow-y-auto py-8 px-4">
      <div className="bg-white rounded-3xl w-full max-w-3xl shadow-2xl overflow-hidden">
        <div className="relative h-60">
          <img src={tour.img} alt={tour.title} className="w-full h-full object-cover"
            onError={e => { e.target.src = `https://placehold.co/800x400?text=${encodeURIComponent(tour.title)}`; }} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
          <button onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 bg-white/90 rounded-full border-none flex items-center justify-center cursor-pointer hover:bg-white transition-colors">
            <X size={16} strokeWidth={2} className="text-gray-700" />
          </button>
          <button onClick={() => onWish && onWish(tour.id)}
            className="absolute top-4 right-16 w-9 h-9 bg-white/90 rounded-full border-none flex items-center justify-center cursor-pointer hover:bg-white transition-colors">
            <Heart size={15} strokeWidth={2} fill={wished ? "#EF4444" : "none"} className={wished ? "text-red-500" : "text-gray-600"} />
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
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {[
              { label: "Duration", val: `${tour.days}D / ${tour.nights}N` },
              { label: "Group Size", val: `Max ${tour.groupSize}` },
              { label: "Locations", val: `${tour.locations?.length || 0} stops` },
              { label: "Difficulty", val: tour.difficulty },
            ].map(({ label, val }) => (
              <div key={label} className="bg-primary-50 rounded-xl px-3 py-2.5 text-center">
                <div className="text-xs text-gray-400 mb-0.5">{label}</div>
                <div className="text-sm font-bold text-gray-900">{val}</div>
              </div>
            ))}
          </div>
          <div className="flex gap-1 mb-5 bg-gray-100 p-1 rounded-xl w-fit">
            {["itinerary", "highlights", "includes"].map(t => (
              <button key={t} onClick={() => setTab(t)}
                className={`px-4 py-1.5 rounded-lg text-sm font-semibold border-none cursor-pointer font-sans capitalize transition-all duration-200
                  ${tab === t ? "bg-white text-primary-600 shadow-sm" : "bg-transparent text-gray-500 hover:text-gray-700"}`}>
                {t}
              </button>
            ))}
          </div>
          {tab === "itinerary" && (
            <div className="space-y-2 mb-6 max-h-96 overflow-y-auto">
              <p className="text-sm text-gray-500 leading-relaxed mb-4">{tour.description}</p>
              {tour.itinerary?.map(item => (
                <div key={item.day} className="border border-gray-100 rounded-xl overflow-hidden">
                  <button className="w-full flex items-center justify-between px-4 py-3 bg-white border-none cursor-pointer font-sans hover:bg-primary-50 transition-colors duration-150"
                    onClick={() => setOpenDay(openDay === item.day ? null : item.day)}>
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-primary-500 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">{item.day}</span>
                      <span className="text-sm font-semibold text-gray-900 text-left">{item.title}</span>
                    </div>
                    {openDay === item.day ? <ChevronUp size={15} strokeWidth={2} className="text-gray-400 flex-shrink-0" /> : <ChevronDown size={15} strokeWidth={2} className="text-gray-400 flex-shrink-0" />}
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
          {tab === "highlights" && (
            <div className="mb-6">
              <p className="text-sm text-gray-500 leading-relaxed mb-4">{tour.description}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-5">
                {tour.highlights?.map(h => (
                  <div key={h} className="flex items-center gap-2.5 bg-primary-50 rounded-xl px-4 py-3">
                    <div className="w-5 h-5 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check size={10} strokeWidth={3} className="text-white" />
                    </div>
                    <span className="text-sm font-semibold text-gray-800">{h}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-1.5 flex-wrap">
                {tour.locations?.map((loc, i) => (
                  <div key={loc} className="flex items-center gap-1.5">
                    <span className="bg-white border border-gray-200 text-gray-700 text-xs font-semibold px-3 py-1.5 rounded-full">{loc}</span>
                    {i < tour.locations.length - 1 && <ArrowRight size={11} strokeWidth={2} className="text-primary-400" />}
                  </div>
                ))}
              </div>
            </div>
          )}
          {tab === "includes" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {tour.includes?.map(inc => (
                <div key={inc} className="flex gap-3 bg-gray-50 rounded-xl px-4 py-3">
                  <Check size={15} className="text-primary-500 mt-0.5 flex-shrink-0" />
                  <div className="text-sm font-bold text-gray-900">{inc}</div>
                </div>
              ))}
            </div>
          )}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-gray-100">
            <div>
              {tour.oldPrice && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-400 line-through">${tour.oldPrice}</span>
                  {savings && <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-0.5 rounded-full">Save ${savings}</span>}
                </div>
              )}
              <div className="text-2xl font-extrabold text-primary-500">${tour.price}<span className="text-sm font-normal text-gray-400 ml-1">/ person</span></div>
              <div className="text-xs text-gray-400 mt-0.5">All inclusive · Free cancellation 30 days prior</div>
            </div>
            <div className="flex gap-3">
              <button className="px-5 py-2.5 rounded-lg border-2 border-primary-500 text-primary-600 font-semibold text-sm cursor-pointer bg-transparent hover:bg-primary-50 transition-colors duration-200 font-sans">Enquire</button>
              <button className="px-6 py-2.5 rounded-lg bg-primary-500 text-white font-semibold text-sm cursor-pointer border-none hover:bg-primary-600 transition-colors duration-200 font-sans">Book Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ── Reviews Section ── */
const LiveReviewsSection = () => {
  const [reviews] = useState(getMockReviews());
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const scrollContainerRef = useRef(null);

  const checkScroll = () => {
    const c = scrollContainerRef.current;
    if (c) {
      setShowLeftArrow(c.scrollLeft > 0);
      setShowRightArrow(c.scrollLeft < c.scrollWidth - c.clientWidth - 10);
    }
  };

  const scroll = (dir) => {
    const c = scrollContainerRef.current;
    if (c) c.scrollTo({ left: c.scrollLeft + (dir === "left" ? -400 : 400), behavior: "smooth" });
  };

  const renderStars = (r) => "★".repeat(r) + "☆".repeat(5 - r);

  const stats = { averageRating: 5.0, totalReviews: 6, recommendationRate: 100 };

  return (
    <div>
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10 animate-on-scroll animate-stagger">
        {[
          { icon: <Star size={32} className="text-yellow-400 fill-yellow-400" />, val: stats.averageRating.toFixed(1), label: "Overall Rating", sub: renderStars(stats.averageRating) },
          { icon: <MessageSquare size={32} className="text-primary-500" />, val: `${stats.totalReviews}+`, label: "Verified Reviews", sub: "From TripAdvisor" },
          { icon: <ThumbsUp size={32} className="text-primary-500" />, val: `${stats.recommendationRate}%`, label: "Would Recommend", sub: "Based on real reviews" },
        ].map(({ icon, val, label, sub }) => (
          <div key={label} className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100">
            <div className="flex justify-center mb-2">{icon}</div>
            <div className="text-3xl font-bold text-gray-900">{val}</div>
            <div className="text-sm text-gray-500 mt-1">{label}</div>
            <div className="text-xs text-gray-400 mt-1">{sub}</div>
          </div>
        ))}
      </div>

      {/* Carousel */}
      <div className="relative mb-8 animate-on-scroll">
        {showLeftArrow && (
          <button onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-lg border border-gray-200
                       flex items-center justify-center cursor-pointer hover:bg-primary-500 hover:text-white hover:border-primary-500 transition-all duration-200">
            <ChevronLeft size={20} strokeWidth={2} />
          </button>
        )}
        {showRightArrow && (
          <button onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-lg border border-gray-200
                       flex items-center justify-center cursor-pointer hover:bg-primary-500 hover:text-white hover:border-primary-500 transition-all duration-200">
            <ChevronRight size={20} strokeWidth={2} />
          </button>
        )}
        <div ref={scrollContainerRef} onScroll={checkScroll}
          className="reviews-scroll overflow-x-auto scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
          <div className="flex gap-6 pb-4 px-1" style={{ minWidth: "max-content" }}>
            {reviews.map((review) => (
              <div key={review.id}
                className="w-[340px] sm:w-[380px] flex-shrink-0 bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="p-5 pb-3 border-b border-gray-100">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                        {review.reviewer.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 text-sm">{review.reviewer}</h4>
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                          <span>{review.location}</span><span>•</span><span>{review.date}</span>
                        </div>
                      </div>
                    </div>
                    {review.contributions && (
                      <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full whitespace-nowrap">{review.contributions}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-yellow-400 text-sm">{renderStars(review.rating)}</span>
                    <span className="text-xs font-bold text-gray-700">{review.rating}.0</span>
                  </div>
                  <h3 className="font-bold text-gray-900 text-base leading-tight">{review.title}</h3>
                </div>
                <div className="p-5 pt-3">
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-4">{review.text}</p>
                </div>
                <div className="px-5 pb-5 pt-2 flex items-center justify-between">
                  <span className="text-xs text-primary-500 bg-primary-50 px-2 py-1 rounded-full">{review.tour}</span>
                  <img src="https://static.tacdn.com/img2/brand_refresh/Tripadvisor_lockup_horizontal_secondary_registered.svg" alt="TripAdvisor" className="h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="text-center mt-6 animate-on-scroll">
        <a href="https://www.tripadvisor.com/Attraction_Review-g293962-d34193720-Reviews-Insi_Tours-Colombo_Western_Province.html"
          target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 text-white rounded-xl font-semibold hover:bg-primary-600 transition-all duration-200 shadow-md hover:shadow-lg">
          View All Reviews on TripAdvisor
          <ExternalLink size={18} />
        </a>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   MAIN HOME COMPONENT
───────────────────────────────────────────── */
const Home = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [selectedTour, setSelectedTour] = useState(null);
  const [wishlist, setWishlist] = useState([]);

  // Attach scroll animation observer
  useScrollAnimation();

  const toggleWish = (id) =>
    setWishlist(w => w.includes(id) ? w.filter(x => x !== id) : [...w, id]);

  const categories = ["All", "Beach", "Cultural", "Heritage", "Adventure", "City", "Hill Station", "Mountains"];
  const destinations = destinationsData;
  const featuredTours = toursData.slice(0, 6);
  const services = servicesData;

  const filtered = (
    activeCategory === "All" ? destinations : destinations.filter(d => d.tag === activeCategory)
  ).slice(0, 6);

  /* ── Destination Card ── */
  const DestinationCard = ({ destination }) => (
    <div className="rounded-2xl overflow-hidden shadow-md bg-white cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
      onClick={() => setSelectedDestination(destination)}>
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

  /* ── Tour Card ── */
  const TourCard = ({ tour }) => (
    <div className="rounded-2xl overflow-hidden border border-gray-100 bg-white cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:border-transparent group"
      onClick={() => setSelectedTour(tour)}>
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
            {categoryIcon(tour.category)} {tour.category}
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

  /* ── Service Card ── */
  const ServiceCard = ({ service }) => {
    const Icon = iconMap[service.icon];
    return (
      <div className="p-7 rounded-2xl border border-gray-100 bg-white transition-all duration-300 cursor-default hover:border-primary-500 hover:shadow-[0_8px_28px_rgba(0,170,108,0.1)] hover:-translate-y-1">
        <div className="mb-3.5 text-primary-500">{Icon && <Icon className="w-7 h-7" />}</div>
        <h3 className="text-base font-bold text-gray-900 mb-2">{service.title}</h3>
        <p className="text-sm text-gray-500 leading-relaxed">{service.desc}</p>
      </div>
    );
  };

  const socialLinks = [
    { icon: <Facebook size={15} strokeWidth={2} />, key: "fb", href: "#" },
    { icon: <Twitter size={15} strokeWidth={2} />, key: "tw", href: "#" },
    { icon: <Linkedin size={15} strokeWidth={2} />, key: "in", href: "#" },
    { icon: <Instagram size={15} strokeWidth={2} />, key: "ig", href: "#" },
  ];

  return (
    <div className="font-sans bg-white text-gray-900 overflow-x-hidden">
      <AnimationStyles />

      {/* Modals */}
      <DestinationModal destination={selectedDestination} onClose={() => setSelectedDestination(null)} />
      <TourDetailModal tour={selectedTour} onClose={() => setSelectedTour(null)}
        wished={selectedTour ? wishlist.includes(selectedTour.id) : false} onWish={toggleWish} />

      {/* ── HERO ── */}
      <section className="min-h-screen pt-24 pb-16 px-4 sm:px-8 lg:px-12 flex items-center relative overflow-hidden
                          bg-gradient-to-br from-primary-50 via-[#e8f9f2] to-[#f5f7ff]">
        <div className="absolute -top-24 -right-24 w-[520px] h-[520px] rounded-full bg-primary-500/[0.07] pointer-events-none" />
        <div className="absolute -bottom-20 -left-10 w-[360px] h-[360px] rounded-full bg-indigo-500/[0.04] pointer-events-none" />

        <div className="max-w-[1200px] mx-auto w-full flex items-center gap-14 flex-wrap lg:flex-nowrap">
          {/* Hero text — no animation here so it's immediately visible */}
          <div className="flex-1 min-w-0 w-full">
            <div className="inline-block bg-primary-100 text-primary-600 px-3.5 py-1.5 rounded-full text-sm font-semibold mb-5">
              Trusted Sri Lankan Experts
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight text-gray-900 mb-4">
              Your Island Story<br />
              <span className="text-primary-500">Starts Here</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-500 leading-relaxed mb-9 max-w-md">
              Honest reviews, unbeatable deals, and breathtaking destinations. We handle the details, you make the memories.
            </p>
            <Link to="/booking">
              <button className="px-8 py-4 rounded-xl text-lg font-semibold text-white bg-primary-500 border-none cursor-pointer
                                hover:bg-primary-600 transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] mb-8">
                Book a Trip
              </button>
            </Link>

            {/* Stats 
            <div className="flex gap-8 sm:gap-10 flex-wrap">
              {[
                ["2M+", "Happy Travellers", <Users size={16} className="text-primary-500" />],
                ["150+", "Destinations", <MapPin size={16} className="text-primary-500" />],
                ["4.9", "App Rating", <Star size={16} fill="#00AA6C" strokeWidth={0} />],
              ].map(([n, l, icon]) => (
                <div key={l} className="flex items-start gap-2">
                  <div className="mt-1">{icon}</div>
                  <div>
                    <div className="text-2xl font-extrabold text-gray-900">{n}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{l}</div>
                  </div>
                </div>
              ))}
            </div>
*/}
          </div>

          {/* Hero images */}
          <div className="hidden lg:grid flex-1 min-w-[340px] grid-cols-2 gap-3" style={{ gridTemplateRows: "230px 190px" }}>
            <div className="row-span-2 rounded-[22px] overflow-hidden shadow-[0_16px_48px_rgba(0,0,0,0.14)]">
              <img src={heroMain} alt="Sri Lanka" className="w-full h-full object-cover" />
            </div>
            <div className="rounded-[22px] overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.1)]">
              <img src={heroTop} alt="Sri Lanka" className="w-full h-full object-cover" />
            </div>
            <div className="rounded-[22px] overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.1)]">
              <img src={heroBottom} alt="Sri Lanka" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="py-16 sm:py-20 px-4 sm:px-8 lg:px-12 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12 animate-on-scroll">
            <span className="bg-primary-100 text-primary-600 px-3.5 py-1.5 rounded-full text-sm font-semibold">
              Everything You Need
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 mt-4 mb-3">
              We Make Travel Easy
            </h2>
            <p className="text-gray-500 text-base max-w-md mx-auto">Enjoy your journey — We do the rest for you</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 animate-on-scroll animate-stagger">
            {services.map((service, i) => <ServiceCard key={i} service={service} />)}
          </div>
        </div>
      </section>

      {/* ── DESTINATIONS ── */}
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
            {filtered.map((destination, i) => <DestinationCard key={i} destination={destination} />)}
          </div>
        </div>
      </section>

      {/* ── FEATURED TOURS ── */}
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
            {featuredTours.map((tour, i) => <TourCard key={i} tour={tour} />)}
          </div>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section className="py-16 sm:py-20 px-4 sm:px-8 lg:px-12 bg-primary-50">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12 animate-on-scroll">
            <span className="bg-primary-100 text-primary-600 px-3.5 py-1.5 rounded-full text-sm font-semibold">Real Reviews</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 mt-4 mb-2">What Travellers Say</h2>
            <p className="text-gray-500 text-base">Live reviews from TripAdvisor</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-6 sm:px-8 py-7 mb-10 flex flex-col sm:flex-row items-center justify-between gap-6 animate-on-scroll">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-[#34E0A1]/10 flex items-center justify-center flex-shrink-0">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <circle cx="16" cy="16" r="16" fill="#34E0A1" fillOpacity="0.15"/>
                  <text x="16" y="21" textAnchor="middle" fontSize="18" fill="#00AA6C">✓</text>
                </svg>
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900 mb-0.5">Verified Reviews from TripAdvisor</p>
                <p className="text-xs text-gray-500 max-w-xs">All reviews are from real customers who booked through our verified partners.</p>
              </div>
            </div>
            <img src="https://static.tacdn.com/img2/brand_refresh/Tripadvisor_lockup_horizontal_secondary_registered.svg" alt="TripAdvisor" className="h-8" />
          </div>
          <LiveReviewsSection />
          <div className="mt-12 text-center animate-on-scroll">
            <p className="text-sm text-gray-500 flex items-center justify-center gap-2 flex-wrap">
              <ShieldCheck size={16} className="text-primary-500" />
              All reviews are 100% authentic and verified
            </p>
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ── 
      <section className="py-16 sm:py-20 px-4 sm:px-8 lg:px-12 bg-gradient-to-br from-primary-500 to-primary-600 relative overflow-hidden">
        <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full bg-white/[0.08] pointer-events-none" />
        <div className="absolute -bottom-20 left-20 w-60 h-60 rounded-full bg-white/[0.05] pointer-events-none" />
        <div className="max-w-[640px] mx-auto text-center relative z-10 animate-on-scroll">
          <div className="flex justify-center mb-4"><Plane size={48} strokeWidth={1.5} className="text-white" /></div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">Get Travel Deals in Your Inbox</h2>
          <p className="text-white/85 text-base leading-relaxed mb-8">
            Join 500,000+ travellers getting exclusive deals, hidden gems & travel tips every week.
          </p>
          {subscribed ? (
            <div className="bg-white/20 rounded-xl px-8 py-5 text-white text-base font-semibold flex items-center justify-center gap-2">
              <Send size={18} strokeWidth={2} /> You're in! Welcome gift incoming.
            </div>
          ) : (
            <div className="flex rounded-xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.15)] max-w-[480px] mx-auto">
              <div className="flex-1 flex items-center bg-white px-4">
                <Mail size={16} strokeWidth={2} className="text-gray-400 flex-shrink-0 mr-2" />
                <input type="email" placeholder="Enter your email address" value={email} onChange={e => setEmail(e.target.value)}
                  className="flex-1 border-none outline-none py-4 text-sm font-sans text-gray-900 placeholder-gray-400 bg-transparent" />
              </div>
              <button onClick={() => { if (email) setSubscribed(true); }}
                className="bg-gray-900 text-white border-none px-4 sm:px-6 py-4 text-sm font-bold cursor-pointer font-sans whitespace-nowrap hover:bg-gray-800 transition-colors duration-200">
                Subscribe Free
              </button>
            </div>
          )}
          <p className="text-white/55 text-xs mt-3.5 flex items-center justify-center gap-1">
            <Lock size={11} strokeWidth={2} /> No spam. Unsubscribe anytime.
          </p>
        </div>
      </section>
      */}

      {/* ── FOOTER ── */}
      <footer className="bg-gray-900 text-gray-50 pt-14 pb-8 px-4 sm:px-8 lg:px-12">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

            {/* Brand column — uses actual logo */}
            <div>
              <Link to="/" className="flex items-center gap-2.5 no-underline mb-5">
                <img src={logo} alt="Insi Tours" className="h-35 w-auto object-contain" />
              </Link>
              <p className="text-sm text-gray-400 leading-relaxed max-w-[260px] mb-6">
                Your trusted Sri Lanka travel partner — crafting unforgettable journeys with expert local knowledge since 2015.
              </p>
              <div className="flex gap-2.5">
                {socialLinks.map(({ icon, key, href }) => (
                  <a key={key} href={href}
                    className="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400
                               hover:bg-primary-500 hover:text-white transition-all duration-200 no-underline">
                    {icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Link columns */}
            {[
              {
                title: "Explore",
                links: [
                  { label: "Destinations", path: "/destinations" },
                  { label: "Tours & Packages", path: "/tours" },
                  { label: "Reviews", path: "/reviews" },
                  { label: "Contact Us", path: "/contact" },
                ]
              },
              {
                title: "Company",
                links: [
                  { label: "About Us", path: "#" },
                  { label: "Blog", path: "#" },
                  { label: "Press Room", path: "#" },
                  { label: "Partnerships", path: "#" },
                ]
              },
              {
                title: "Support",
                links: [
                  { label: "Help Center", path: "#" },
                  { label: "Cancellation Policy", path: "#" },
                  { label: "Travel Insurance", path: "#" },
                  { label: "Safety Tips", path: "#" },
                ]
              },
            ].map(col => (
              <div key={col.title}>
                <h4 className="text-xs font-bold tracking-widest uppercase text-gray-50 mb-5">{col.title}</h4>
                <ul className="list-none space-y-3">
                  {col.links.map(link => (
                    <li key={link.label}>
                      {link.path.startsWith("/") && link.path !== "#" ? (
                        <Link to={link.path} className="text-sm text-gray-400 no-underline hover:text-primary-500 transition-colors">
                          {link.label}
                        </Link>
                      ) : (
                        <a href={link.path} className="text-sm text-gray-400 no-underline hover:text-primary-500 transition-colors">
                          {link.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Insi Tours" className="h-6 w-auto object-contain opacity-60" />
              <p className="text-sm text-gray-500">© 2026 Insi Tours. All rights reserved.</p>
            </div>
            <div className="flex gap-4 sm:gap-6 flex-wrap justify-center">
              {["Privacy Policy", "Terms of Service", "Cookie Settings"].map(item => (
                <a key={item} href="#" className="text-sm text-gray-500 no-underline hover:text-primary-500 transition-colors">
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;