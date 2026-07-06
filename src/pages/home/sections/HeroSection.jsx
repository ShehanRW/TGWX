import { Link } from "react-router-dom";
import heroMain from "../../../assets/hero-main.jpg";
import heroTop from "../../../assets/hero-top.jpg";
import heroBottom from "../../../assets/hero-bottom.jpg";

const HeroSection = () => {
  return (
    <section className="min-h-screen pt-24 pb-16 px-4 sm:px-8 lg:px-12 flex items-center relative overflow-hidden
                      bg-gradient-to-br from-primary-50 via-[#e8f9f2] to-[#f5f7ff]">
      <div className="absolute -top-24 -right-24 w-[520px] h-[520px] rounded-full bg-primary-500/[0.07] pointer-events-none" />
      <div className="absolute -bottom-20 -left-10 w-[360px] h-[360px] rounded-full bg-indigo-500/[0.04] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto w-full flex items-center gap-14 flex-wrap lg:flex-nowrap">
        {/* Hero text */}
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
  );
};

export default HeroSection;