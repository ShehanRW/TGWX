import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowLeft, Mail, ExternalLink, Cookie } from "lucide-react";

const SECTIONS = [
  { id: "interpretation", label: "Interpretation & Definitions" },
  { id: "usage", label: "The Use of Cookies" },
  { id: "choices", label: "Your Choices" },
  { id: "changes", label: "Changes to This Policy" },
  { id: "contact", label: "Contact Us" },
];

const BROWSER_LINKS = [
  { name: "Chrome", url: "https://support.google.com/accounts/answer/32050" },
  { name: "Microsoft Edge", url: "https://support.microsoft.com/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" },
  { name: "Firefox", url: "https://support.mozilla.org/en-US/kb/delete-cookies-remove-info-websites-stored" },
  { name: "Safari", url: "https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" },
];

const CookiesPolicy = () => {
  const [activeSection, setActiveSection] = useState("interpretation");

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
              <Cookie size={22} strokeWidth={2} className="text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
              Cookies Policy
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
                This Cookies Policy explains what Cookies are and how We use them. You should read
                this policy so You can understand what type of Cookies We use, the information We
                collect using Cookies, and how that information is used.
              </p>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4">
                Cookies do not typically contain any information that personally identifies a
                user, but personal information that We store about You may be linked to the
                information stored in and obtained from Cookies. For further information on how
                We use, store, and keep Your personal data secure, see our{" "}
                <Link to="/privacy-policy" className="font-semibold text-primary-600 hover:text-primary-700">
                  Privacy Policy
                </Link>
                .
              </p>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-10 sm:mb-12">
                We do not store sensitive personal information, such as mailing addresses or
                account passwords, in the Cookies We use.
              </p>

              {/* Interpretation & Definitions */}
              <section id="interpretation" className="scroll-mt-28 mb-10 sm:mb-12">
                <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-4 pb-3 border-b border-gray-100">
                  Interpretation and Definitions
                </h2>

                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 mt-5">Interpretation</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-5">
                  The words whose initial letters are capitalized have meanings defined under the
                  following conditions. The following definitions shall have the same meaning
                  regardless of whether they appear in singular or in plural.
                </p>

                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3">Definitions</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4">
                  For the purposes of this Cookies Policy:
                </p>
                <div className="space-y-3">
                  {[
                    ["Company", "(referred to as either \u201Cthe Company\u201D, \u201CWe\u201D, \u201CUs\u201D or \u201COur\u201D in this Cookies Policy) refers to Insi Tours."],
                    ["Cookies", "means small files that are placed on Your computer, mobile device or any other device by a website, containing details of Your browsing history on that website among its many uses."],
                    ["Website", "refers to Insi Tours, accessible from https://insitours.com/."],
                    ["You", "means the individual accessing or using the Website, or a company, or any legal entity on behalf of which such individual is accessing or using the Website, as applicable."],
                  ].map(([term, def]) => (
                    <div key={term} className="bg-gray-50 rounded-xl px-4 py-3">
                      <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                        <span className="font-bold text-gray-900">{term}</span> {def}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* The Use of Cookies */}
              <section id="usage" className="scroll-mt-28 mb-10 sm:mb-12">
                <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-4 pb-3 border-b border-gray-100">
                  The Use of the Cookies
                </h2>

                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 mt-5">Type of Cookies We Use</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-3">
                  Cookies can be "Persistent" or "Session" Cookies. Persistent Cookies remain on
                  Your personal computer or mobile device when You go offline, while Session
                  Cookies are deleted as soon as You close Your web browser.
                </p>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-5">
                  Where required by law, We will request Your consent before using Cookies that
                  are not strictly necessary. Strictly necessary Cookies are used to provide the
                  Website and cannot be switched off in Our systems.
                </p>

                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4">
                  We use both Session and Persistent Cookies for the purposes set out below:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    {
                      type: "Necessary / Essential Cookies",
                      kind: "Session",
                      desc: "Essential to provide You with services available through the Website and to enable You to use some of its features. They help authenticate users and prevent fraudulent use of user accounts. Without these Cookies, the services You have asked for cannot be provided.",
                    },
                    {
                      type: "Functionality Cookies",
                      kind: "Persistent",
                      desc: "Allow Us to remember choices You make when You use the Website, such as remembering Your login details or language preference, for a more personal experience and to avoid re-entering preferences every time.",
                    },
                  ].map((c) => (
                    <div key={c.type} className="bg-primary-50 rounded-xl px-4 py-3.5">
                      <p className="text-xs font-bold text-primary-600 uppercase tracking-wide mb-1">{c.kind} Cookie</p>
                      <p className="text-sm font-bold text-gray-900 mb-1.5">{c.type}</p>
                      <p className="text-xs text-gray-600 leading-relaxed">{c.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Your Choices */}
              <section id="choices" className="scroll-mt-28 mb-10 sm:mb-12">
                <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-4 pb-3 border-b border-gray-100">
                  Your Choices Regarding Cookies
                </h2>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4">
                  If You prefer to avoid the use of Cookies on the Website, You must first disable
                  the use of Cookies in Your browser and then delete the Cookies saved in Your
                  browser associated with this Website. You may use this option to prevent the use
                  of Cookies at any time.
                </p>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-6">
                  If You do not accept Our Cookies, You may experience some inconvenience in Your
                  use of the Website, and some features may not function properly.
                </p>

                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4">
                  If You'd like to delete Cookies or instruct Your web browser to delete or refuse
                  Cookies, please visit the help pages of Your web browser:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                  {BROWSER_LINKS.map((b) => (
                    <a
                      key={b.name}
                      href={b.url}
                      target="_blank"
                      rel="external nofollow noopener"
                      className="flex items-center justify-between gap-2 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3
                                 text-sm font-semibold text-gray-700 hover:bg-gray-100 hover:text-primary-600 transition-colors no-underline"
                    >
                      {b.name}
                      <ExternalLink size={14} strokeWidth={2} className="flex-shrink-0 text-gray-400" />
                    </a>
                  ))}
                </div>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  For any other web browser, please visit your web browser's official web pages.
                </p>
              </section>

              {/* Changes */}
              <section id="changes" className="scroll-mt-28 mb-10 sm:mb-12">
                <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-4 pb-3 border-b border-gray-100">
                  Changes to This Cookies Policy
                </h2>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  We may update this Cookies Policy from time to time. The "Last updated" date at
                  the top of this page indicates when it was last revised. You are advised to
                  review this Cookies Policy periodically for any changes — changes are effective
                  when they are posted on this page.
                </p>
              </section>

              {/* Contact */}
              <section id="contact" className="scroll-mt-28">
                <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-4 pb-3 border-b border-gray-100">
                  Contact Us
                </h2>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-5">
                  If you have any questions about this Cookies Policy, You can contact us:
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

export default CookiesPolicy;