import { Link } from "react-router-dom";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import logo from "../../assets/logo.png";

const FooterSection = () => {
  const socialLinks = [
    { icon: <Facebook size={15} strokeWidth={2} />, key: "fb", href: "#" },
    { icon: <Twitter size={15} strokeWidth={2} />, key: "tw", href: "#" },
    { icon: <Linkedin size={15} strokeWidth={2} />, key: "in", href: "#" },
    { icon: <Instagram size={15} strokeWidth={2} />, key: "ig", href: "#" },
  ];

  return (
    <footer className="bg-gray-900 text-gray-50 pt-14 pb-8 px-4 sm:px-8 lg:px-12">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand column */}
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
  );
};

export default FooterSection;