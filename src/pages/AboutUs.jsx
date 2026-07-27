import { Link } from "react-router-dom";
import {
  ArrowLeft, ArrowRight, Heart, Shield, Award, Users,
  MapPin, Clock, Star, Compass, Car, Leaf, CheckCircle,
  Mail, MessageCircle,
} from "lucide-react";
import Seo from "../components/common/Seo";

<Seo
  title="Insi Tours | About Us"
  description="Learn about Insi Tours, a local Sri Lankan tour company offering private tours with experienced driver-guides. Discover our story, values, and why travelers choose us for their Sri Lanka adventures."
  path="/about-us"
/>

const STATS = [
  { icon: <Users size={22} strokeWidth={2} />, value: "10,000+", label: "Happy Travelers" },
  { icon: <Star size={22} strokeWidth={2} />, value: "4.9/5", label: "Average Rating" },
  { icon: <MapPin size={22} strokeWidth={2} />, value: "25+", label: "Destinations Covered" },
  { icon: <Clock size={22} strokeWidth={2} />, value: "8+", label: "Years of Experience" },
];

const VALUES = [
  {
    icon: <Heart size={22} strokeWidth={2} />,
    title: "Genuine Hospitality",
    desc: "Every itinerary is built around real Sri Lankan warmth — not a script. We want you to leave feeling like you made a friend, not just booked a driver.",
  },
  {
    icon: <Shield size={22} strokeWidth={2} />,
    title: "Safety First",
    desc: "Licensed, experienced guides, well-maintained vehicles, and calm, responsible driving on every route — so you can relax and enjoy the journey.",
  },
  {
    icon: <Compass size={22} strokeWidth={2} />,
    title: "Local Expertise",
    desc: "Our guides grew up here. They know the hidden viewpoints, the best roadside food stops, and the stories that guidebooks leave out.",
  },
  {
    icon: <Leaf size={22} strokeWidth={2} />,
    title: "Responsible Travel",
    desc: "We work with local communities and small businesses along our routes, so your trip supports the places you visit, not just the places you stay.",
  },
];

const WHY_US = [
  "Private, English-speaking driver-guide for your entire trip",
  "Flexible itineraries built around your interests and pace",
  "Transparent, per-day vehicle pricing — no hidden fees",
  "Free cancellation up to 30 days before your tour",
  "24-hour response time on every enquiry",
  "Instant PDF confirmation and booking reference for your records",
];

const AboutUs = () => {
  return (
    <div className="font-sans bg-white text-gray-900 overflow-x-hidden min-h-screen">

      {/* Hero */}
      <div className="bg-gradient-to-br from-primary-500 to-primary-600 pt-24 sm:pt-28 lg:pt-32 pb-14 sm:pb-20 px-4 sm:px-8 lg:px-12">
        <div className="max-w-[1200px] mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-white/80 hover:text-white
                       no-underline mb-6 transition-colors"
          >
            <ArrowLeft size={14} strokeWidth={2} /> Back to Home
          </Link>

          <div className="max-w-2xl">
            <span className="bg-white/15 text-white px-3.5 py-1.5 rounded-full text-sm font-semibold">
              About Insi Tours
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-4 mb-4 leading-tight">
              Sri Lanka, shown to you by people who call it home
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-white/90 leading-relaxed">
              We're a small, local team of driver-guides putting together private tours across
              Sri Lanka — from ancient cities to tea country to golden coastline — built around
              how you actually want to travel.
            </p>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8 lg:px-12 -mt-8 sm:-mt-10">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5 sm:p-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-primary-50 text-primary-500
                                flex items-center justify-center mx-auto mb-2.5">
                  {s.icon}
                </div>
                <div className="text-xl sm:text-2xl font-extrabold text-gray-900">{s.value}</div>
                <div className="text-xs sm:text-sm text-gray-500 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Our story */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8 lg:px-12 py-14 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div>
            <span className="bg-primary-100 text-primary-600 px-3.5 py-1.5 rounded-full text-sm font-semibold">
              Our Story
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-4 mb-5 leading-tight">
              Started with one car, a lot of local knowledge, and a simple idea
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-gray-600 leading-relaxed">
              <p>
                Insi Tours began the way most good travel stories do — with a few too many
                questions from friends and family visiting the island, and no good way to answer
                them all at once. What started as informal advice turned into full itineraries,
                and eventually into a proper private touring service.
              </p>
              <p>
                We kept it small on purpose. No call centers, no anonymous drivers you meet for
                the first time at the airport — just a tight team who plan every trip personally
                and drive it themselves, so the person who built your itinerary is often the same
                person behind the wheel.
              </p>
              <p>
                Today we run private tours across the Cultural Triangle, the hill country, the
                south coast, and the wildlife parks in between — always tailored, always with a
                real person who knows the roads, the timing, and the places worth stopping for.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {[
              { img: "/assets/reviews/pic00003.jpg", label: "Cultural Triangle" },
              { img: "/assets/reviews/pic00006.jpg", label: "Wildlife Safaris" },
              { img: "/assets/reviews/pic00008.jpg", label: "South Coast" },
              { img: "/assets/reviews/pic00004.jpg", label: "Hill Country" },
            ].map((item, i) => (
              <div
                key={item.label}
                className={`relative rounded-2xl overflow-hidden ${i % 2 === 1 ? "mt-6 sm:mt-8" : ""}`}
              >
                <img
                  src={item.img}
                  alt={item.label}
                  className="w-full h-36 sm:h-44 object-cover"
                  onError={(e) => { e.target.src = `https://placehold.co/400x300/e0f2fe/0284c7?text=${encodeURIComponent(item.label)}`; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <span className="absolute bottom-2.5 left-2.5 text-white text-xs sm:text-sm font-bold">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="bg-gray-50 py-14 sm:py-20 px-4 sm:px-8 lg:px-12">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-10 sm:mb-12">
            <span className="bg-primary-100 text-primary-600 px-3.5 py-1.5 rounded-full text-sm font-semibold">
              What We Stand For
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-4 mb-3">
              The values behind every itinerary
            </h2>
            <p className="text-sm sm:text-base text-gray-500 max-w-2xl mx-auto">
              These aren't slogans on a wall — they're what we actually check ourselves against
              before every tour goes out.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {VALUES.map((v) => (
              <div
                key={v.title}
                className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 hover:shadow-lg
                           hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-primary-50 text-primary-500
                                flex items-center justify-center mb-4">
                  {v.icon}
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-2">{v.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Meet the guide */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8 lg:px-12 py-14 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-2">
            <div className="relative rounded-3xl overflow-hidden">
              <img
                src="/assets/team/kamal-edirisinghe.jpg"
                alt="Kamal Edirisinghe, lead guide at Insi Tours"
                className="w-full h-72 sm:h-80 lg:h-96 object-cover object-top"
                onError={(e) => { e.target.src = "https://placehold.co/500x600/e0f2fe/0284c7?text=Kamal+Edirisinghe"; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5">
                <p className="text-white font-extrabold text-lg">Kamal Edirisinghe</p>
                <p className="text-white/80 text-sm">Lead Guide & Driver</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <span className="bg-primary-100 text-primary-600 px-3.5 py-1.5 rounded-full text-sm font-semibold">
              Meet Your Guide
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-4 mb-4">
              The person behind the wheel — and the itinerary
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4">
              Kamal has driven and guided travellers across every corner of Sri Lanka — from
              first-time visitors wanting the classics, to families and small groups after
              something more personal. Travellers consistently mention the same things: he's
              punctual, calm on the road, and genuinely knowledgeable about the history, food,
              and culture along the way.
            </p>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-6">
              Beyond driving, Kamal helps shape each itinerary in real time — adjusting for
              weather, energy levels, or a good recommendation that comes up along the road. It's
              the kind of flexibility a fixed group tour simply can't offer.
            </p>
            <div className="flex flex-wrap gap-2.5">
              {["10,000+ km driven yearly", "5-star average rating", "Fluent English", "Licensed & insured"].map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1.5 bg-primary-50 text-primary-600 text-xs sm:text-sm font-semibold px-3 py-1.5 rounded-full"
                >
                  <CheckCircle size={13} strokeWidth={2} /> {tag}
                </span>
              ))}
            </div>
            <Link
              to="/reviews"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 hover:text-primary-700 mt-5 no-underline"
            >
              Read traveller reviews <ArrowRight size={14} strokeWidth={2} />
            </Link>
          </div>
        </div>
      </div>

      {/* Why choose us */}
      <div className="bg-gradient-to-br from-primary-500 to-primary-600 py-14 sm:py-20 px-4 sm:px-8 lg:px-12">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <div>
              <span className="bg-white/15 text-white px-3.5 py-1.5 rounded-full text-sm font-semibold">
                Why Travel With Us
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-4 mb-4 leading-tight">
                Private touring, done the way it should be
              </h2>
              <p className="text-sm sm:text-base text-white/85 leading-relaxed mb-6">
                No shared vans, no rigid group schedules — just your trip, planned around you,
                with a driver-guide who's invested in making it a good one.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to="/tours"
                  className="inline-flex items-center justify-center gap-2 bg-white text-primary-600 px-6 py-3
                             rounded-xl font-semibold text-sm hover:bg-gray-50 transition-colors no-underline"
                >
                  Browse Our Tours <ArrowRight size={16} strokeWidth={2} />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 text-white px-6 py-3
                             rounded-xl font-semibold text-sm hover:bg-white/20 transition-colors no-underline border border-white/20"
                >
                  Talk to Us
                </Link>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 sm:p-7 border border-white/10">
              <div className="space-y-3">
                {WHY_US.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle size={13} strokeWidth={2.5} className="text-primary-600" />
                    </div>
                    <span className="text-sm sm:text-base text-white leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8 lg:px-12 py-14 sm:py-20 text-center">
        <Award size={36} strokeWidth={1.5} className="text-primary-500 mx-auto mb-4" />
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-3">
          Ready to plan your Sri Lanka trip?
        </h2>
        <p className="text-sm sm:text-base text-gray-500 max-w-xl mx-auto mb-7">
          Tell us what you're after and we'll put together an itinerary that fits — or pick one
          of our ready-made tours as a starting point.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-sm sm:max-w-none mx-auto">
          <Link
            to="/booking"
            className="inline-flex items-center justify-center gap-2 bg-primary-500 text-white px-6 py-3
                       rounded-xl font-semibold text-sm hover:bg-primary-600 transition-colors no-underline min-h-[48px]"
          >
            Start Booking <ArrowRight size={16} strokeWidth={2} />
          </Link>

          <a
            href="https://wa.me/94771468477"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-green-500 text-white px-6 py-3
                       rounded-xl font-semibold text-sm hover:bg-green-600 transition-colors no-underline min-h-[48px]"
          >
            <MessageCircle size={16} strokeWidth={2} /> Chat on WhatsApp
          </a>

          <a
            href="mailto:insitours@gmail.com"
            className="inline-flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-6 py-3
                       rounded-xl font-semibold text-sm hover:bg-gray-200 transition-colors no-underline min-h-[48px]"
          >
            <Mail size={16} strokeWidth={2} /> Email Us
          </a>
        </div>
      </div>

    </div>
  );
};

export default AboutUs;