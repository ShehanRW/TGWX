import { useState } from "react";
import {
  Mail, Phone, MapPin, Clock, Send, MessageCircle, 
  Facebook, Twitter, Linkedin, Instagram, Youtube,
  CheckCircle, Award, Shield, Globe, Smartphone, 
  Users, Star
} from "lucide-react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: ""
  });
  
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      setFormStatus({
        submitted: true,
        success: true,
        message: "Thank you for your message! We'll get back to you within 24 hours."
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
      setLoading(false);
      
      setTimeout(() => {
        setFormStatus({ submitted: false, success: false, message: "" });
      }, 5000);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: <Mail size={24} />,
      title: "Email Us",
      details: "insitours@gmail.com",
      link: "mailto:insitours@gmail.com",
      bgClass: "bg-blue-500",
      description: "We'll respond within 24 hours"
    },
    {
      icon: <Phone size={24} />,
      title: "Call Us",
      details: "+94 77 146 8477",
      link: "tel:+94771468477",
      bgClass: "bg-green-500",
      description: "Mon-Sat, 9AM - 6PM"
    },
    {
      icon: <MessageCircle size={24} />,
      title: "WhatsApp",
      details: "+94 77 146 8477",
      link: "https://wa.me/94771468477",
      bgClass: "bg-green-600",
      description: "Quick replies on WhatsApp"
    }
  ];

  const faqs = [
    {
      q: "How do I book a tour?",
      a: "You can book directly through our website by selecting your preferred tour and clicking 'Book Now', or contact us via email or WhatsApp for personalized assistance."
    },
    {
      q: "What payment methods do you accept?",
      a: "We accept credit/debit cards, bank transfers, and cash payments. A deposit is required to confirm your booking."
    },
    {
      q: "Can I customize my tour itinerary?",
      a: "Absolutely! We specialize in creating custom itineraries tailored to your preferences, group size, and budget."
    },
    {
      q: "What is your cancellation policy?",
      a: "Free cancellation up to 30 days before the tour. Cancellations within 30 days may incur a fee depending on the circumstances."
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-500 to-primary-600 pt-32 pb-16 px-12">
        <div className="max-w-[1200px] mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Get In Touch
          </h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Have questions about your Sri Lanka adventure? We're here to help you plan the perfect journey.
          </p>
        </div>
      </div>

      {/* Contact Info Cards */}
      <div className="max-w-[1200px] mx-auto px-12 -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {contactInfo.map((info, index) => (
            <a
              key={index}
              href={info.link}
              target={info.title === "WhatsApp" ? "_blank" : "_self"}
              rel="noopener noreferrer"
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 
                         hover:-translate-y-1 border border-gray-100 group block"
            >
              <div className={`${info.bgClass} w-14 h-14 rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                {info.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{info.title}</h3>
              <p className="text-primary-500 font-semibold mb-2">{info.details}</p>
              <p className="text-sm text-gray-500">{info.description}</p>
            </a>
          ))}
        </div>
      </div>

      {/* Contact Form & Info Section */}
      <div className="max-w-[1200px] mx-auto px-12 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Send Us a Message</h2>
              <p className="text-gray-500">Fill out the form below and we'll get back to you shortly.</p>
            </div>

            {formStatus.submitted && formStatus.success && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3">
                <CheckCircle size={20} className="text-green-500 flex-shrink-0" />
                <p className="text-green-700 text-sm">{formStatus.message}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none 
                               focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none 
                               focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none 
                               focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
                    placeholder="+94 XX XXX XXXX"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none 
                               focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
                    placeholder="Tour Inquiry"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none 
                             focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 resize-none"
                  placeholder="Tell us about your travel plans..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary-500 text-white py-3 rounded-xl font-semibold
                           hover:bg-primary-600 transition-all duration-200 flex items-center justify-center gap-2
                           disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right Side Info */}
          <div className="space-y-6">
            {/* Office Hours */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <div className="flex items-center gap-3 mb-6">
                <Clock size={28} className="text-primary-500" />
                <h3 className="text-xl font-bold text-gray-900">Office Hours</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Monday - Friday</span>
                  <span className="font-semibold text-gray-900">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Saturday</span>
                  <span className="font-semibold text-gray-900">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Sunday</span>
                  <span className="font-semibold text-gray-400">Closed</span>
                </div>
              </div>
            </div>

            {/* WhatsApp Section */}
            <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <MessageCircle size={28} className="text-primary-500" />
                <h3 className="text-xl font-bold text-gray-900">Quick Response</h3>
              </div>
              <p className="text-gray-600 mb-4">
                For urgent inquiries, reach out to us on WhatsApp. We typically respond within minutes!
              </p>
              <a
                href="https://wa.me/94771468477"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-xl
                           font-semibold hover:bg-green-600 transition-all duration-200"
              >
                <MessageCircle size={18} />
                Chat on WhatsApp
              </a>
            </div>

            {/* Social Media */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Connect With Us</h3>
              <p className="text-gray-500 mb-4">Follow us for travel inspiration</p>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-primary-500 hover:text-white transition-all">
                  <Facebook size={18} />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-primary-500 hover:text-white transition-all">
                  <Twitter size={18} />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-primary-500 hover:text-white transition-all">
                  <Instagram size={18} />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-primary-500 hover:text-white transition-all">
                  <Linkedin size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-gray-50 py-16 px-12">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Find quick answers to common questions about booking tours with us
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <h3 className="font-bold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-600 text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="py-12 px-12 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <Award size={32} className="text-primary-500 mx-auto mb-2" />
              <div className="font-bold text-gray-900">Award Winning</div>
              <div className="text-sm text-gray-500">Top Rated 2025</div>
            </div>
            <div>
              <Users size={32} className="text-primary-500 mx-auto mb-2" />
              <div className="font-bold text-gray-900">Happy Travelers</div>
              <div className="text-sm text-gray-500">10,000+</div>
            </div>
            <div>
              <Star size={32} className="text-primary-500 mx-auto mb-2" />
              <div className="font-bold text-gray-900">5-Star Reviews</div>
              <div className="text-sm text-gray-500">4.9/5 Rating</div>
            </div>
            <div>
              <Shield size={32} className="text-primary-500 mx-auto mb-2" />
              <div className="font-bold text-gray-900">Secure Booking</div>
              <div className="text-sm text-gray-500">100% Protected</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;