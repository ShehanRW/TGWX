import AnimationStyles from "../../components/AnimationStyles";
import { useScrollAnimation } from "./hooks/useScrollAnimation";
import HeroSection from "./sections/HeroSection";
import ServicesSection from "./sections/ServicesSection";
import DestinationsSection from "./sections/DestinationsSection";
import ToursSection from "./sections/ToursSection";
import ReviewsSection from "./sections/ReviewsSection";
import FooterSection from "../../components/layouts/Footer";
import GuideSection from "./sections/GuideSection";

const Home = () => {
  useScrollAnimation();

  return (
    <div className="font-sans bg-white text-gray-900 overflow-x-hidden">
      <AnimationStyles />
      
      <HeroSection />
      <GuideSection />
      <ServicesSection />
      <DestinationsSection />
      <ToursSection />
      <ReviewsSection />
      <FooterSection />
    </div>
  );
};

export default Home;