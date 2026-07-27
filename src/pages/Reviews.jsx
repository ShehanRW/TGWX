import { useState, useEffect } from "react";
import { Star, ExternalLink, MapPin, Calendar, Users, ThumbsUp, MessageSquare, Award, ShieldCheck, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Seo from "../components/common/Seo";

<Seo
  title="Insi Tours | Reviews"
  description="Read authentic reviews from our satisfied customers about their experiences with Insi Tours Tour Guides. Discover what makes our Sri Lankan tours special."
  path="/reviews"
/>

// Mock Reviews Data
const getMockReviews = () => {
  return [
    {
      id: 1,
      reviewer: "Liz W",
      rating: 5,
      date: "March 2026",
      location: "United Kingdom",
      title: "Fantastic driver and lovely person",
      text: "We were so lucky to have Kamal as our driver guide. From the moment he picked us up from Negombo, to when he dropped us off in Tangalle a week later, we couldn't have asked for a nicer person to help us make the most of our travels in Sri Lanka. We were a party of 3 females (1 x 60+, 2x 20+) and he was always kind, courteous and attentive, helpfully adding suggestions to our plans and providing lots of knowledge about the flora, fauna and cultural life of the different areas we visited. He was also a very calm and capable driver, driving responsibly and making us feel safe and secure. His car is very comfortable and provides a very smooth ride. We were very sorry to say goodbye to him in Tangalle as he really felt a special part of our holiday! Please feel confident to book Kamal as your driver, he is a true gentleman whom you can totally rely on to provide an excellent service.",
      tour: "Custom Sri Lanka Tour",
      platform: "TripAdvisor",
      contributions: "2 contributions",
      tripadvisorLink: "https://www.tripadvisor.com/Attraction_Review-g293962-d34193720-Reviews-Insi_Tours-Colombo_Western_Province.html"
    },
    {
      id: 2,
      reviewer: "Jula N",
      rating: 5,
      date: "February 2026",
      location: "Germany",
      title: "If You Need a Driver in Sri Lanka – This Is Your Guy!",
      text: "If you're looking for a driver in Sri Lanka, honestly—stop searching, you've just found the one. From day one, Kamal was everything you could hope for and more: always on time (actually, usually early!), super reliable, and just genuinely kind. We felt completely safe and taken care of throughout the whole trip, which makes such a difference when you're traveling in a new country. But what really made the experience special was Kamal as a person. Always smiling, always calm, never any problems—just good vibes all the way. He didn't just drive us from A to B; he shared tips, local insights, stories about history, culture, and religion that you simply won't find in any guidebook. Need a good restaurant? He knows. Hidden spots? He knows. Want to understand what you're actually seeing? He'll explain it in a way that's interesting and easy to follow. And the best part? He does it all with such a relaxed, friendly attitude that you feel like you're traveling with someone you've known for years. 100% recommended. If we ever come back to Sri Lanka, we wouldn't even consider anyone else. Thanks for great trip Kamal. All the best. Julia and Maria xx",
      tour: "Custom Sri Lanka Tour",
      platform: "TripAdvisor",
      contributions: "5 contributions",
      tripadvisorLink: "https://www.tripadvisor.com/Attraction_Review-g293962-d34193720-Reviews-Insi_Tours-Colombo_Western_Province.html"
    },
    {
      id: 3,
      reviewer: "Michelle R",
      rating: 5,
      date: "January 2026",
      location: "United Kingdom",
      title: "Incredible trip with an even better tour guide/driver",
      text: "We had an incredible experience with Kamal. He was so friendly, kind, and genuinely caring making us feel completely at ease. The trip was seamless and stress-free thanks to his professionalism and thoughtful attention to detail. We loved having the flexibility to choose what we wanted to do and when, while still benefiting from his fantastic suggestions that truly enhanced our experience. He went above and beyond and made the whole journey so easy and enjoyable—we couldn't recommend him more highly! Thank you Kamal!",
      tour: "Custom Sri Lanka Tour",
      platform: "TripAdvisor",
      contributions: "4 contributions",
      tripadvisorLink: "https://www.tripadvisor.com/Attraction_Review-g293962-d34193720-Reviews-Insi_Tours-Colombo_Western_Province.html"
    },
    {
      id: 4,
      reviewer: "Stay51790330359",
      rating: 5,
      date: "December 2025",
      location: "United Kingdom",
      title: "Sri Lanka with Kamal",
      text: "I have just spent 10 days touring around Sri Lanka with Kamal as our driver and guide. Alongside being a brilliant driver, always on time and calm on sometimes busy roads Kamal has a wide ranging knowledge and passion for Sri Lanka. From history, religion to customs, food and topography Kamal knew so much. We also had great fun on the journey and were really sad to say goodbye. I would highly recommend Kamal for your trip to Sri Lanka",
      tour: "10-Day Sri Lanka Tour",
      platform: "TripAdvisor",
      contributions: "3 contributions",
      tripadvisorLink: "https://www.tripadvisor.com/Attraction_Review-g293962-d34193720-Reviews-Insi_Tours-Colombo_Western_Province.html"
    },
    {
      id: 5,
      reviewer: "Bevan A",
      rating: 5,
      date: "November 2025",
      location: "Australia",
      title: "Unforgettable Sri Lanka Tour with Exceptional Service",
      text: "An amazing experience and the perfect way to see the very best of Sri Lanka. Kamal was an incredibly patient, informative, and professional driver throughout our tour. He helped us make the most of every day, ensuring we saw as much as possible while always catering to our needs. If you are planning a trip to beautiful Sri Lanka, I highly recommend Insi Tours — they are absolutely the way to go!",
      tour: "Custom Sri Lanka Tour",
      platform: "TripAdvisor",
      contributions: "5 contributions",
      tripadvisorLink: "https://www.tripadvisor.com/Attraction_Review-g293962-d34193720-Reviews-Insi_Tours-Colombo_Western_Province.html"
    },
    {
      id: 6,
      reviewer: "Benjamin K",
      rating: 5,
      date: "October 2025",
      location: "London, United Kingdom",
      title: "Feedback on Kamal",
      text: "Kamal acted as guide and driver whilst we were in Sri Lanka. He drove well, was punctual and knew all the best sites and restaurants to go to. He was also kind and good company. He is very experienced and knows Sri Lanka well. Highly recommended",
      tour: "Custom Sri Lanka Tour",
      platform: "TripAdvisor",
      contributions: "23 contributions",
      tripadvisorLink: "https://www.tripadvisor.com/Attraction_Review-g293962-d34193720-Reviews-Insi_Tours-Colombo_Western_Province.html"
    }
  ];
};

// Stars Component
const Stars = ({ rating, size = 16 }) => (
  <span className="inline-flex gap-0.5">
    {[1, 2, 3, 4, 5].map((i) => (
      <Star
        key={i}
        size={size}
        strokeWidth={0}
        fill={i <= Math.round(rating) ? "#00AA6C" : "#D1D5DB"}
        className={i <= Math.round(rating) ? "text-[#00AA6C]" : "text-gray-300"}
      />
    ))}
  </span>
);

// TripAdvisor Write a Review Widget Component
const TripAdvisorWriteReviewWidget = () => {
  useEffect(() => {
    // Remove existing script if any
    const existingScript = document.querySelector('script[src*="cdswritereviewlgvi"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Create and add the widget script
    const script = document.createElement('script');
    script.src = "https://www.jscache.com/wejs?wtype=cdswritereviewlgvi&uniq=505&locationId=34193720&lang=en_US&lang=en_US&display_version=2";
    script.async = true;
    script.setAttribute('data-loadtrk', '');
    script.onload = () => {
      if (window.TA && window.TA.CDSWR) {
        window.TA.CDSWR.init();
      }
    };
    document.body.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="flex justify-center">
      <div id="TA_cdswritereviewlgvi505" className="TA_cdswritereviewlgvi" style={{ width: '100%', maxWidth: '500px' }}>
        <ul id="t6p4IXXAf" className="TA_links 6BxLSHhc">
          <li id="qzXaKSJGbb" className="GUUHlvCk">
            <a target="_blank" href="https://www.tripadvisor.com/">
              <img 
                src="https://static.tacdn.com/img2/brand_refresh/Tripadvisor_lockup_horizontal_secondary_registered.svg" 
                alt="TripAdvisor"
                className="h-6 sm:h-8"
              />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    const loadReviews = async () => {
      const mockReviews = getMockReviews();
      setReviews(mockReviews);
      setLoading(false);
    };
    loadReviews();
  }, []);

  const getStats = () => {
    const totalReviews = reviews.length;
    const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews;
    const fiveStarCount = reviews.filter(r => r.rating === 5).length;
    const recommendationRate = (fiveStarCount / totalReviews) * 100;
    return { totalReviews, averageRating, recommendationRate };
  };

  const stats = getStats();

  const filteredReviews = reviews.filter(review => {
    if (filter === "all") return true;
    return review.rating === parseInt(filter);
  });

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    if (sortBy === "newest") return new Date(b.date) - new Date(a.date);
    if (sortBy === "oldest") return new Date(a.date) - new Date(b.date);
    if (sortBy === "highest") return b.rating - a.rating;
    if (sortBy === "lowest") return a.rating - b.rating;
    return 0;
  });

  const renderStarsDetailed = (rating) => {
    return (
      <div className="flex items-center gap-1">
        <span className="text-yellow-400 text-base sm:text-lg">{'★'.repeat(rating)}</span>
        <span className="text-gray-300 text-base sm:text-lg">{'☆'.repeat(5 - rating)}</span>
        <span className="ml-2 text-xs sm:text-sm font-bold text-gray-700">{rating}.0</span>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-[140px] sm:pt-[160px] lg:pt-[180px]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500 text-lg">Loading reviews...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      {/* Hero Section - Fixed padding for navigation */}
      <section className="bg-gradient-to-br from-primary-500 to-primary-600 text-white px-4 pt-[140px] sm:pt-[160px] lg:pt-[180px] pb-12 sm:pb-16">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3 sm:mb-4">Customer Reviews</h1>
            <p className="text-sm sm:text-base md:text-lg text-white/90 max-w-2xl mx-auto px-2">
              Real experiences from real travelers. See what our customers have to say about their journeys with Insi Tours.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 sm:p-6 text-center">
              <div className="flex justify-center mb-2 sm:mb-3">
                <Star size={32} fill="#FFD700" strokeWidth={0} className="text-yellow-400 sm:w-10 sm:h-10" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold">{stats.averageRating.toFixed(1)}</div>
              <div className="text-xs sm:text-sm text-white/80 mt-1">Average Rating</div>
              <div className="flex justify-center mt-2">
                <Stars rating={stats.averageRating} size={12} />
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 sm:p-6 text-center">
              <div className="flex justify-center mb-2 sm:mb-3">
                <MessageSquare size={32} className="text-white sm:w-10 sm:h-10" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold">{stats.totalReviews}+</div>
              <div className="text-xs sm:text-sm text-white/80 mt-1">Verified Reviews</div>
              <div className="text-[10px] sm:text-xs text-white/60 mt-1">From TripAdvisor</div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 sm:p-6 text-center">
              <div className="flex justify-center mb-2 sm:mb-3">
                <ThumbsUp size={32} className="text-white sm:w-10 sm:h-10" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold">{Math.round(stats.recommendationRate)}%</div>
              <div className="text-xs sm:text-sm text-white/80 mt-1">Would Recommend</div>
              <div className="text-[10px] sm:text-xs text-white/60 mt-1">Based on real reviews</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Filters and Sort */}
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="flex flex-wrap gap-2 sm:gap-3">
              <button
                onClick={() => setFilter("all")}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-semibold text-xs sm:text-sm transition-all min-h-[36px] sm:min-h-[44px]
                  ${filter === "all"
                    ? "bg-primary-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
              >
                All Reviews
              </button>
              {[5, 4, 3, 2, 1].map(rating => (
                <button
                  key={rating}
                  onClick={() => setFilter(rating.toString())}
                  className={`px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg font-semibold text-xs sm:text-sm transition-all flex items-center gap-0.5 sm:gap-1 min-h-[36px] sm:min-h-[44px]
                    ${filter === rating.toString()
                      ? "bg-primary-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                >
                  {rating}★
                </button>
              ))}
            </div>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm min-h-[44px]"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="highest">Highest Rated</option>
              <option value="lowest">Lowest Rated</option>
            </select>
          </div>
        </div>

        {/* TripAdvisor Write a Review Widget */}
        <div className="bg-gradient-to-r from-blue-50 to-primary-50 rounded-2xl p-6 sm:p-8 mb-8 sm:mb-12 text-center">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">Share Your Experience</h3>
          <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">Help other travelers by sharing your own journey with Insi Tours</p>
          <TripAdvisorWriteReviewWidget />
          <p className="text-[10px] sm:text-xs text-gray-500 mt-4">Your review will appear on TripAdvisor</p>
        </div>

        {/* Reviews Grid */}
        <div className="space-y-4 sm:space-y-6">
          {sortedReviews.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl">
              <p className="text-gray-500">No reviews found with this rating.</p>
            </div>
          ) : (
            sortedReviews.map((review) => (
              <div key={review.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-4 sm:p-6">
                  {/* Header */}
                  <div className="flex flex-wrap justify-between items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary-500 flex items-center justify-center text-white font-bold text-base sm:text-lg flex-shrink-0">
                        {review.reviewer.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-base sm:text-lg">{review.reviewer}</h3>
                        <div className="flex flex-wrap items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1">
                          <span>{review.location}</span>
                          <span>•</span>
                          <span>{review.date}</span>
                          {review.contributions && (
                            <>
                              <span>•</span>
                              <span className="bg-gray-100 px-1.5 sm:px-2 py-0.5 rounded-full text-[10px] sm:text-xs">
                                {review.contributions}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <a
                      href={review.tripadvisorLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 sm:gap-2 text-primary-500 hover:text-primary-600 font-semibold text-xs sm:text-sm flex-shrink-0"
                    >
                      <img 
                        src="https://static.tacdn.com/img2/brand_refresh/Tripadvisor_lockup_horizontal_secondary_registered.svg" 
                        alt="TripAdvisor" 
                        className="h-4 sm:h-5"
                      />
                      <ExternalLink size={12} className="sm:w-[14px] sm:h-[14px]" />
                    </a>
                  </div>

                  {/* Rating */}
                  <div className="mb-2 sm:mb-3">
                    {renderStarsDetailed(review.rating)}
                  </div>

                  {/* Title */}
                  <h4 className="font-bold text-gray-900 text-base sm:text-xl mb-2 sm:mb-3">{review.title}</h4>

                  {/* Review Text */}
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-3 sm:mb-4">{review.text}</p>

                  {/* Footer */}
                  <div className="flex flex-wrap justify-between items-center gap-2 pt-3 sm:pt-4 border-t border-gray-100">
                    <span className="text-[10px] sm:text-sm text-primary-600 bg-primary-50 px-2 sm:px-3 py-1 rounded-full">
                      📋 {review.tour}
                    </span>
                    <div className="flex items-center gap-2 sm:gap-4 text-[10px] sm:text-sm text-gray-400">
                      <span className="flex items-center gap-0.5 sm:gap-1">
                        <ShieldCheck size={12} className="sm:w-[14px] sm:h-[14px]" />
                        Verified
                      </span>
                      <span className="flex items-center gap-0.5 sm:gap-1">
                        <Award size={12} className="sm:w-[14px] sm:h-[14px]" />
                        Authentic
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* View All on TripAdvisor Button */}
        <div className="text-center mt-8 sm:mt-12">
          <a
            href="https://www.tripadvisor.com/Attraction_Review-g293962-d34193720-Reviews-Insi_Tours-Colombo_Western_Province.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-primary-500 text-white rounded-xl font-semibold text-sm sm:text-base hover:bg-primary-600 transition-all duration-200 shadow-lg hover:shadow-xl min-h-[48px]"
          >
            View All Reviews on TripAdvisor
            <ExternalLink size={16} className="sm:w-[18px] sm:h-[18px]" />
          </a>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-gray-200">
          <div className="flex flex-wrap justify-center gap-4 sm:gap-8">
            <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-600">
              <ShieldCheck size={16} className="sm:w-[18px] sm:h-[18px] text-primary-500" />
              <span>100% Authentic Reviews</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-600">
              <Award size={16} className="sm:w-[18px] sm:h-[18px] text-primary-500" />
              <span>Verified by TripAdvisor</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-600">
              <Users size={16} className="sm:w-[18px] sm:h-[18px] text-primary-500" />
              <span>5000+ Happy Travelers</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Reviews;