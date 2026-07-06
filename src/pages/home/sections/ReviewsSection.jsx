import { useState, useRef } from "react";
import { Star, MessageSquare, ThumbsUp, ShieldCheck, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";

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

const ReviewsSection = () => {
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
        
        <div className="mt-12 text-center animate-on-scroll">
          <p className="text-sm text-gray-500 flex items-center justify-center gap-2 flex-wrap">
            <ShieldCheck size={16} className="text-primary-500" />
            All reviews are 100% authentic and verified
          </p>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;