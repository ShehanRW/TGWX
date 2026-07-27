import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowLeft, Mail, ExternalLink, FileText } from "lucide-react";
import Seo from "../components/common/Seo";

<Seo
  title="Insi Tours | Terms Of Services"
  description=""
  path="/terms"
/>

const SECTIONS = [
  { id: "acknowledgment", label: "Acknowledgment" },
  { id: "bookings", label: "Bookings & Payment" },
  { id: "cancellations", label: "Cancellations & Refunds" },
  { id: "conduct", label: "Traveller Conduct" },
  { id: "responsibilities", label: "Our Responsibilities" },
  { id: "liability", label: "Limitation of Liability" },
  { id: "ip", label: "Intellectual Property" },
  { id: "links", label: "Links to Other Websites" },
  { id: "termination", label: "Termination" },
  { id: "governing-law", label: "Governing Law" },
  { id: "disputes", label: "Dispute Resolution" },
  { id: "changes", label: "Changes to These Terms" },
  { id: "contact", label: "Contact Us" },
];

const TermsOfService = () => {
  const [activeSection, setActiveSection] = useState("acknowledgment");

  useEffect(() => {
    const onScroll = () => {
      let current = SECTIONS[0].id;
      for (const s of SECTIONS) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= 140) {
          current = s.id;
        }
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const TocNav = () => (
    <nav className="space-y-0.5 max-h-[60vh] lg:max-h-[calc(100vh-8rem)] overflow-y-auto">
      {SECTIONS.map((s) => (
        <button
          key={s.id}
          onClick={() => scrollTo(s.id)}
          className={`block w-full text-left px-3 py-2 rounded-lg text-xs sm:text-sm font-medium
                      border-none cursor-pointer font-sans transition-colors duration-150
            ${activeSection === s.id
              ? "bg-primary-500 text-white"
              : "bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900"}`}
        >
          {s.label}
        </button>
      ))}
    </nav>
  );

  return (
    <div className="font-sans bg-white text-gray-900 overflow-x-hidden min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-to-br from-primary-500 to-primary-600 pt-24 sm:pt-28 lg:pt-32 pb-10 sm:pb-14 px-4 sm:px-8 lg:px-12">
        <div className="max-w-[1200px] mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-white/80 hover:text-white
                       no-underline mb-5 transition-colors"
          >
            <ArrowLeft size={14} strokeWidth={2} /> Back to Home
          </Link>

          <div className="flex items-center gap-3 mb-3">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0">
              <FileText size={22} strokeWidth={2} className="text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
              Terms of Service
            </h1>
          </div>
          <p className="text-sm sm:text-base text-white/85 max-w-2xl">
            Last updated: July 25, 2026
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8 lg:px-12 py-10 sm:py-14">
        <div className="flex gap-8 lg:gap-12 flex-col lg:flex-row items-start">

          {/* Table of contents — sticky on large screens */}
          <aside className="lg:w-64 w-full flex-shrink-0 order-2 lg:order-1">
            <div className="lg:sticky lg:top-28 bg-gray-50 border border-gray-100 rounded-2xl p-4 sm:p-5">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                On This Page
              </p>
              <TocNav />
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1 w-full min-w-0 order-1 lg:order-2">
            <div className="bg-white border border-gray-100 rounded-2xl sm:rounded-3xl shadow-sm p-5 sm:p-8 lg:p-10">

              <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4">
                Please read these Terms of Service carefully before using the Insi Tours website
                or booking a tour with us. These Terms govern Your access to and use of the
                Service, including any bookings, payments, and communications made through it.
              </p>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-10 sm:mb-12">
                By accessing the Service or completing a booking, You agree to be bound by these
                Terms. If You disagree with any part of these Terms, please do not use the
                Service or make a booking.
              </p>

              {/* Acknowledgment */}
              <section id="acknowledgment" className="scroll-mt-28 mb-10 sm:mb-12">
                <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-4 pb-3 border-b border-gray-100">
                  Acknowledgment
                </h2>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4">
                  These Terms of Service constitute the entire agreement between You and Insi
                  Tours ("the Company", "We", "Us", "Our") regarding Your use of the Service. This
                  agreement applies to all visitors, users, and travellers who access or book a
                  tour through the Service.
                </p>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4">
                  Your access to and use of the Service is conditioned on Your acceptance of and
                  compliance with these Terms. By using the Service, You represent that You are at
                  least 18 years of age, or are booking with the consent and involvement of a
                  parent or legal guardian.
                </p>
                <div className="bg-primary-50 border border-primary-100 rounded-xl px-4 py-3.5">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Your use of the Service is also governed by Our{" "}
                    <Link to="/privacy-policy" className="font-semibold text-primary-600 hover:text-primary-700">
                      Privacy Policy
                    </Link>
                    , which describes how We collect, use, and protect Your personal information.
                  </p>
                </div>
              </section>

              {/* Bookings & Payment */}
              <section id="bookings" className="scroll-mt-28 mb-10 sm:mb-12">
                <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-4 pb-3 border-b border-gray-100">
                  Bookings and Payment
                </h2>

                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 mt-5">Making a Booking</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-5">
                  When You submit a booking through the Service, You are sending Us a request to
                  reserve a private tour. A booking is not confirmed until Our team has reviewed
                  Your request and contacted You directly, which We aim to do within 24 hours of
                  submission. Submitting a booking request does not guarantee availability of the
                  selected tour, vehicle, or travel dates.
                </p>

                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">Pricing</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-5">
                  Our private tours are priced per vehicle, per day, and cover private transport,
                  an English-speaking driver-guide, sightseeing, and included activities as listed
                  in each itinerary. Accommodation, meals, and entrance tickets are quoted
                  separately unless explicitly stated otherwise. Prices displayed on the Service
                  are estimates based on the information You provide and are subject to
                  confirmation by Our team.
                </p>

                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">Accuracy of Information</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-5">
                  You are responsible for ensuring that all information provided during booking —
                  including traveller names, contact details, passport or identification numbers,
                  travel dates, and group size — is accurate and complete. We are not liable for
                  any issues arising from incorrect or incomplete information You provide.
                </p>

                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">Payment</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  No payment is required at the time of submitting a booking request through the
                  Service. Payment terms, including any deposit required to confirm Your booking,
                  will be communicated directly by Our team once availability is confirmed.
                </p>
              </section>

              {/* Cancellations & Refunds */}
              <section id="cancellations" className="scroll-mt-28 mb-10 sm:mb-12">
                <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-4 pb-3 border-b border-gray-100">
                  Cancellations and Refunds
                </h2>
                <div className="space-y-3 mb-5">
                  <div className="bg-gray-50 rounded-xl px-4 py-3.5">
                    <p className="text-sm font-bold text-gray-900 mb-1">30+ Days Before Tour Start</p>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Free cancellation. Any deposit or payment made will be refunded in full.
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-xl px-4 py-3.5">
                    <p className="text-sm font-bold text-gray-900 mb-1">Within 30 Days of Tour Start</p>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Cancellations may incur a fee depending on how close to the tour start date
                      the cancellation is made, and any non-recoverable costs already committed on
                      Your behalf (such as accommodation deposits). Our team will advise the
                      applicable fee, if any, at the time of cancellation.
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-xl px-4 py-3.5">
                    <p className="text-sm font-bold text-gray-900 mb-1">Changes to Your Itinerary</p>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      We will do Our best to accommodate date changes, itinerary adjustments, or
                      group size changes where possible, subject to availability. Some changes may
                      affect the total price of Your tour.
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-xl px-4 py-3.5">
                    <p className="text-sm font-bold text-gray-900 mb-1">Cancellations by Us</p>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      In the rare event We must cancel a confirmed tour (for example, due to
                      safety concerns, extreme weather, or circumstances beyond Our control), We
                      will notify You as early as possible and offer a full refund or the option
                      to reschedule.
                    </p>
                  </div>
                </div>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  To cancel or amend a booking, please contact Us using the details in the{" "}
                  <button
                    onClick={() => scrollTo("contact")}
                    className="font-semibold text-primary-600 hover:text-primary-700 border-none bg-transparent cursor-pointer p-0 font-sans"
                  >
                    Contact Us
                  </button>{" "}
                  section below, quoting Your booking reference.
                </p>
              </section>

              {/* Traveller Conduct */}
              <section id="conduct" className="scroll-mt-28 mb-10 sm:mb-12">
                <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-4 pb-3 border-b border-gray-100">
                  Traveller Conduct
                </h2>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4">
                  While on tour, You agree to:
                </p>
                <ul className="space-y-2 mb-5">
                  {[
                    "Follow reasonable instructions from Your guide regarding safety, timing, and local customs",
                    "Treat Your guide, other travellers, and local communities with respect",
                    "Arrive at agreed pickup times and locations to the best of Your ability",
                    "Disclose any medical conditions, mobility requirements, or allergies that may affect the tour in advance",
                    "Take responsibility for Your own belongings and personal safety during free time or independent activities",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm sm:text-base text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  We reserve the right to end a tour early, without refund, if a traveller's
                  behavior puts the safety of themselves, other travellers, or Our guide at risk,
                  or is abusive or unlawful.
                </p>
              </section>

              {/* Our Responsibilities */}
              <section id="responsibilities" className="scroll-mt-28 mb-10 sm:mb-12">
                <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-4 pb-3 border-b border-gray-100">
                  Our Responsibilities
                </h2>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4">
                  We commit to providing:
                </p>
                <ul className="space-y-2">
                  {[
                    "A licensed, experienced driver-guide for the duration of Your confirmed tour",
                    "A well-maintained, air-conditioned vehicle appropriate to Your group size",
                    "An itinerary that reasonably reflects what was agreed upon at booking",
                    "Timely communication regarding any changes that may affect Your tour",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm sm:text-base text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>

              {/* Liability */}
              <section id="liability" className="scroll-mt-28 mb-10 sm:mb-12">
                <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-4 pb-3 border-b border-gray-100">
                  Limitation of Liability
                </h2>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4">
                  While We take reasonable care to plan safe and enjoyable tours, travel involves
                  inherent risks. To the fullest extent permitted by applicable law, Insi Tours
                  shall not be liable for:
                </p>
                <ul className="space-y-2 mb-5">
                  {[
                    "Delays, cancellations, or itinerary changes caused by weather, road conditions, political events, or other circumstances beyond Our reasonable control",
                    "Loss, theft, or damage to personal belongings during the tour",
                    "Injury, illness, or death arising from activities not directly operated by Us (such as third-party excursions, water sports, or optional activities)",
                    "Indirect or consequential losses, including missed connections or lost enjoyment",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm sm:text-base text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4">
                  We strongly recommend that all travellers obtain comprehensive travel insurance
                  covering medical expenses, trip cancellation, and personal belongings before
                  travelling.
                </p>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  Nothing in these Terms excludes or limits Our liability for death or personal
                  injury caused by Our negligence, fraud, or any other liability that cannot be
                  excluded under applicable law.
                </p>
              </section>

              {/* Intellectual Property */}
              <section id="ip" className="scroll-mt-28 mb-10 sm:mb-12">
                <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-4 pb-3 border-b border-gray-100">
                  Intellectual Property
                </h2>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4">
                  The Service and its original content — including text, itineraries, photographs,
                  graphics, and logos — are and remain the exclusive property of Insi Tours and
                  its licensors, unless otherwise credited. Our trademarks and trade dress may not
                  be used in connection with any product or service without Our prior written
                  consent.
                </p>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  Photos and videos submitted by travellers (for example, through reviews or the
                  gallery) remain the property of their respective owners, but by submitting them
                  You grant Us a non-exclusive, royalty-free license to display them on the
                  Service and in Our marketing materials, with attribution where reasonably
                  possible.
                </p>
              </section>

              {/* Links */}
              <section id="links" className="scroll-mt-28 mb-10 sm:mb-12">
                <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-4 pb-3 border-b border-gray-100">
                  Links to Other Websites
                </h2>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  Our Service may contain links to third-party websites or services that are not
                  owned or controlled by Us, including payment processors, review platforms, and
                  map services. We have no control over, and assume no responsibility for, the
                  content, privacy policies, or practices of any third-party websites or services.
                  You acknowledge and agree that We are not liable for any damage or loss caused
                  by Your use of any such content, goods, or services.
                </p>
              </section>

              {/* Termination */}
              <section id="termination" className="scroll-mt-28 mb-10 sm:mb-12">
                <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-4 pb-3 border-b border-gray-100">
                  Termination
                </h2>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  We may suspend or restrict Your access to the Service immediately, without prior
                  notice, for any breach of these Terms. Upon termination, Your right to use the
                  Service will cease immediately. Provisions of these Terms which by their nature
                  should survive termination — including ownership provisions, warranty
                  disclaimers, and limitations of liability — will survive.
                </p>
              </section>

              {/* Governing Law */}
              <section id="governing-law" className="scroll-mt-28 mb-10 sm:mb-12">
                <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-4 pb-3 border-b border-gray-100">
                  Governing Law
                </h2>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  These Terms shall be governed and construed in accordance with the laws of Sri
                  Lanka, without regard to its conflict of law provisions. Our failure to enforce
                  any right or provision of these Terms will not be considered a waiver of those
                  rights.
                </p>
              </section>

              {/* Disputes */}
              <section id="disputes" className="scroll-mt-28 mb-10 sm:mb-12">
                <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-4 pb-3 border-b border-gray-100">
                  Dispute Resolution
                </h2>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  If You have any concern or dispute about the Service or a completed tour, You
                  agree to first try to resolve the dispute informally by contacting Us directly.
                  We aim to acknowledge and address any concerns raised in good faith as promptly
                  as possible.
                </p>
              </section>

              {/* Changes */}
              <section id="changes" className="scroll-mt-28 mb-10 sm:mb-12">
                <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-4 pb-3 border-b border-gray-100">
                  Changes to These Terms
                </h2>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4">
                  We reserve the right, at Our sole discretion, to modify or replace these Terms
                  at any time. If a revision is material, We will make reasonable efforts to
                  provide notice prior to any new terms taking effect, and will update the "Last
                  updated" date at the top of this page.
                </p>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  By continuing to access or use Our Service after any revisions become effective,
                  You agree to be bound by the revised Terms. If You do not agree to the new
                  Terms, You should stop using the Service.
                </p>
              </section>

              {/* Contact */}
              <section id="contact" className="scroll-mt-28">
                <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-4 pb-3 border-b border-gray-100">
                  Contact Us
                </h2>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-5">
                  If you have any questions about these Terms of Service, You can contact us:
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="mailto:insitours@gmail.com"
                    className="flex items-center gap-2.5 bg-primary-50 border border-primary-100 rounded-xl px-4 py-3.5
                               text-sm font-semibold text-primary-600 hover:bg-primary-100 transition-colors no-underline flex-1"
                  >
                    <Mail size={16} strokeWidth={2} className="flex-shrink-0" />
                    insitours@gmail.com
                  </a>
                  <Link
                    to="/contact"
                    className="flex items-center gap-2.5 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3.5
                               text-sm font-semibold text-gray-700 hover:bg-gray-100 transition-colors no-underline flex-1"
                  >
                    <ExternalLink size={16} strokeWidth={2} className="flex-shrink-0" />
                    Visit our Contact page
                  </Link>
                </div>
              </section>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;