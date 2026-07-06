import servicesData from "../../../data/services.json";
import { Map, Hotel, Backpack, Plane, ShieldCheck, PhoneCall } from "lucide-react";

const iconMap = { Map, Hotel, Backpack, Plane, ShieldCheck, PhoneCall };

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

const ServicesSection = () => {
  const services = servicesData;

  return (
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
  );
};

export default ServicesSection;