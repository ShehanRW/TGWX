import { Link } from "react-router-dom";
import { BadgeCheck, Award, Languages, MapPin, Images, ArrowRight } from "lucide-react";

/* ─────────────────────────────────────────────
   LEAD GUIDE — Kamal Edirisinghe
───────────────────────────────────────────── */
const GuideSection = () => {
  const credentials = [
    { icon: BadgeCheck, text: "SLTDA Licensed National Tour Guide" },
    { icon: Award,      text: "5+ Years of Professional Guiding Experience" },
    { icon: Languages,  text: "Fluent English-Speaking Guide" },
    { icon: MapPin,     text: "Island-wide Route & Site Expertise" },
  ];

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-8 lg:px-12 bg-gray-50">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-12 animate-on-scroll">
          <span className="bg-primary-100 text-primary-600 px-3.5 py-1.5 rounded-full text-sm font-semibold">
            Meet Your Guide
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 mt-4 mb-3">
            Meet Our Lead Tour Guide And Insi Tours Founder
          </h2>
          <p className="text-gray-500 text-base max-w-md mx-auto">
            Every Insi Tours journey is personally led by our lead guide
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden animate-on-scroll">
          <div className="flex flex-col md:flex-row items-stretch">
            {/* Photo - fixed to show full image without cropping */}
            <div className="order-1 w-full md:w-80 lg:w-96 flex-shrink-0 relative overflow-hidden">
              <img
                src="/assets/kamal.jpg"
                alt="Kamal Edirisinghe — Lead Tour Guide"
                className="w-full h-auto md:h-full object-cover object-center"
                onError={e => { e.target.src = "https://placehold.co/400x600?text=Kamal+Edirisinghe"; }}
              />
            </div>

            {/* Details */}
            <div className="order-2 flex-1 p-9 sm:p-12 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-3">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900">Kamal Edirisinghe</h3>
                <BadgeCheck className="w-6 h-6 text-primary-500" strokeWidth={2} />
              </div>
              <p className="text-base font-semibold text-primary-600 mb-5">Lead Tour Guide, Insi Tours</p>

              <p className="text-base text-gray-500 leading-relaxed mb-6 max-w-2xl">
                Kamal is a fully qualified national tour guide, certified by the Sri Lanka Tourism
                Development Authority (SLTDA), with over five years of experience guiding travellers
                across the island. From the ancient cities of the Cultural Triangle to the hill country
                tea trails and southern beaches, Kamal brings deep local knowledge, careful route
                planning, and genuine hospitality to every tour.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {credentials.map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary-50 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-primary-500" strokeWidth={2} />
                    </div>
                    <span className="text-sm font-medium text-gray-700">{text}</span>
                  </div>
                ))}
              </div>

              <Link
                to="/gallery"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary-500 text-white
                           text-sm font-semibold no-underline hover:bg-primary-600 transition-colors duration-200
                           w-fit"
              >
                <Images size={16} strokeWidth={2} />
                See Tour Photos & Traveller Reviews
                <ArrowRight size={15} strokeWidth={2} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GuideSection;