import { useState } from "react";
import { X, Heart, ChevronDown, ChevronUp, Check, ArrowRight, Calendar, Users, MapPin } from "lucide-react";
import Stars from "../Stars";

const difficultyColor = (d) =>
  d === "Easy" ? "bg-green-100 text-green-700"
  : d === "Moderate" ? "bg-amber-100 text-amber-700"
  : "bg-red-100 text-red-700";

const TourDetailModal = ({ tour, onClose, wished, onWish }) => {
  const [openDay, setOpenDay] = useState(1);
  const [tab, setTab] = useState("itinerary");
  const savings = tour?.oldPrice ? tour.oldPrice - tour.price : null;
  
  if (!tour) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 overflow-y-auto py-8 px-4">
      <div className="bg-white rounded-3xl w-full max-w-3xl shadow-2xl overflow-hidden">
        <div className="relative h-60">
          <img 
            src={tour.img} 
            alt={tour.title} 
            className="w-full h-full object-cover"
            onError={e => { 
              e.target.src = `https://placehold.co/800x400?text=${encodeURIComponent(tour.title)}`; 
            }} 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 bg-white/90 rounded-full border-none flex items-center justify-center cursor-pointer hover:bg-white transition-colors"
          >
            <X size={16} strokeWidth={2} className="text-gray-700" />
          </button>
          <button 
            onClick={() => onWish && onWish(tour.id)}
            className="absolute top-4 right-16 w-9 h-9 bg-white/90 rounded-full border-none flex items-center justify-center cursor-pointer hover:bg-white transition-colors"
          >
            <Heart 
              size={15} 
              strokeWidth={2} 
              fill={wished ? "#EF4444" : "none"} 
              className={wished ? "text-red-500" : "text-gray-600"} 
            />
          </button>
          <div className="absolute bottom-5 left-6">
            <div className="flex gap-2 mb-2">
              <span className="px-2.5 py-1 rounded-full text-xs font-bold text-white" style={{ background: tour.tagBg }}>
                {tour.tag}
              </span>
              <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${difficultyColor(tour.difficulty)}`}>
                {tour.difficulty}
              </span>
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
              <button 
                key={t} 
                onClick={() => setTab(t)}
                className={`px-4 py-1.5 rounded-lg text-sm font-semibold border-none cursor-pointer font-sans capitalize transition-all duration-200
                  ${tab === t ? "bg-white text-primary-600 shadow-sm" : "bg-transparent text-gray-500 hover:text-gray-700"}`}
              >
                {t}
              </button>
            ))}
          </div>
          
          {tab === "itinerary" && (
            <div className="space-y-2 mb-6 max-h-96 overflow-y-auto">
              <p className="text-sm text-gray-500 leading-relaxed mb-4">{tour.description}</p>
              {tour.itinerary?.map(item => (
                <div key={item.day} className="border border-gray-100 rounded-xl overflow-hidden">
                  <button 
                    className="w-full flex items-center justify-between px-4 py-3 bg-white border-none cursor-pointer font-sans hover:bg-primary-50 transition-colors duration-150"
                    onClick={() => setOpenDay(openDay === item.day ? null : item.day)}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-primary-500 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                        {item.day}
                      </span>
                      <span className="text-sm font-semibold text-gray-900 text-left">{item.title}</span>
                    </div>
                    {openDay === item.day ? 
                      <ChevronUp size={15} strokeWidth={2} className="text-gray-400 flex-shrink-0" /> : 
                      <ChevronDown size={15} strokeWidth={2} className="text-gray-400 flex-shrink-0" />
                    }
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
                    <span className="bg-white border border-gray-200 text-gray-700 text-xs font-semibold px-3 py-1.5 rounded-full">
                      {loc}
                    </span>
                    {i < tour.locations.length - 1 && 
                      <ArrowRight size={11} strokeWidth={2} className="text-primary-400" />
                    }
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
              <button className="px-5 py-2.5 rounded-lg border-2 border-primary-500 text-primary-600 font-semibold text-sm cursor-pointer bg-transparent hover:bg-primary-50 transition-colors duration-200 font-sans">
                Enquire
              </button>
              <button className="px-6 py-2.5 rounded-lg bg-primary-500 text-white font-semibold text-sm cursor-pointer border-none hover:bg-primary-600 transition-colors duration-200 font-sans">
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourDetailModal;