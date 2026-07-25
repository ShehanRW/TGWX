import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowLeft, Mail, ExternalLink, Shield } from "lucide-react";

const SECTIONS = [
  { id: "interpretation", label: "Interpretation & Definitions" },
  { id: "collecting", label: "Collecting Your Data" },
  { id: "use", label: "Use of Your Data" },
  { id: "retention", label: "Data Retention" },
  { id: "transfer", label: "Data Transfer" },
  { id: "delete", label: "Deleting Your Data" },
  { id: "disclosure", label: "Disclosure of Data" },
  { id: "security", label: "Security" },
  { id: "third-party", label: "Third-Party Services" },
  { id: "children", label: "Children's Privacy" },
  { id: "links", label: "Links to Other Sites" },
  { id: "changes", label: "Changes to This Policy" },
  { id: "contact", label: "Contact Us" },
];

const PrivacyPolicy = () => {
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
    <nav className="space-y-0.5 max-h-[60vh] lg:max-h-[calc(100vh-9rem)] overflow-y-auto">
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
      

      {/* Body */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8 lg:px-12 py-10 sm:py-14">
        <div className="flex gap-8 lg:gap-12 flex-col lg:flex-row items-start">

          {/* Table of contents */}
          {/* Mobile/tablet: normal flow, non-fixed */}
          <aside className="lg:hidden w-full order-2">
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 sm:p-5">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                On This Page
              </p>
              <TocNav />
            </div>
          </aside>

          {/* Large screens: fixed position, does not scroll with the page.
              Spacer below reserves the same width in the flex layout so the
              main content column doesn't slide underneath it. */}
          <div className="hidden lg:block w-64 flex-shrink-0 order-1" aria-hidden="true" />
          <aside
            className="hidden lg:block fixed top-28 w-64"
            style={{ left: "max(3rem, calc(50vw - 600px + 3rem))" }}
          >
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 sm:p-5">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                On This Page
              </p>
              <TocNav />
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1 w-full min-w-0 order-1 lg:order-2">
            <div className="bg-white border border-gray-100 rounded-2xl sm:rounded-3xl shadow-sm p-5 sm:p-8 lg:p-10">
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
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
                        Privacy Policy
                        </h1>
                    </div>
                    <p className="text-sm sm:text-base text-white/85 max-w-2xl">
                        Last updated: July 25, 2026
                    </p>
                    </div>
                </div>

              <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4">
                This Privacy Policy describes Our policies and procedures on the collection, use and
                disclosure of Your information when You use the Service and tells You about Your
                privacy rights and how the law protects You.
              </p>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-10 sm:mb-12">
                We use Your Personal Data to provide and improve the Service. By using the Service,
                You agree to the collection and use of information in accordance with this Privacy
                Policy.
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
                  For the purposes of this Privacy Policy:
                </p>
                <div className="space-y-3">
                  {[
                    ["Account", "means a unique account created for You to access our Service or parts of our Service."],
                    ["Affiliate", "means an entity that controls, is controlled by, or is under common control with a party, where \u201Ccontrol\u201D means ownership of 50% or more of the shares, equity interest or other securities entitled to vote for election of directors or other managing authority."],
                    ["Company", "(referred to as either \u201Cthe Company\u201D, \u201CWe\u201D, \u201CUs\u201D or \u201COur\u201D in this Privacy Policy) refers to Insi Tours."],
                    ["Cookies", "are small files that are placed on Your computer, mobile device or any other device by a website, containing the details of Your browsing history on that website among its many uses."],
                    ["Country", "refers to Sri Lanka."],
                    ["Device", "means any device that can access the Service such as a computer, a cell phone or a digital tablet."],
                    ["Personal Data", "(or \u201CPersonal Information\u201D) is any information that relates to an identified or identifiable individual. We use \u201CPersonal Data\u201D and \u201CPersonal Information\u201D interchangeably unless a law uses a specific term."],
                    ["Service", "refers to the Website."],
                    ["Service Provider", "means any natural or legal person who processes the data on behalf of the Company. It refers to third-party companies or individuals employed by the Company to facilitate the Service, to provide the Service on behalf of the Company, to perform services related to the Service or to assist the Company in analyzing how the Service is used."],
                    ["Usage Data", "refers to data collected automatically, either generated by the use of the Service or from the Service infrastructure itself (for example, the duration of a page visit)."],
                    ["Website", "refers to Insi Tours, accessible from https://insitours.com/."],
                    ["You", "means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable."],
                  ].map(([term, def]) => (
                    <div key={term} className="bg-gray-50 rounded-xl px-4 py-3">
                      <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                        <span className="font-bold text-gray-900">{term}</span> {def}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Collecting Your Data */}
              <section id="collecting" className="scroll-mt-28 mb-10 sm:mb-12">
                <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-4 pb-3 border-b border-gray-100">
                  Collecting and Using Your Personal Data
                </h2>

                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 mt-5">Personal Data</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-3">
                  While using Our Service, We may ask You to provide Us with certain personally
                  identifiable information that can be used to contact or identify You. This may
                  include, but is not limited to:
                </p>
                <ul className="space-y-2 mb-5">
                  {["Email address", "First name and last name", "Phone number", "Address, State, Province, ZIP/Postal code, City"].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm sm:text-base text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>

                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">Usage Data</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-3">
                  Usage Data is collected automatically when using the Service. This may include
                  information such as Your Device's IP address, browser type and version, the pages
                  of our Service that You visit, the time and date of Your visit, time spent on those
                  pages, unique device identifiers, and other diagnostic data.
                </p>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-5">
                  When You access the Service through a mobile device, We may also collect the type
                  of device, its unique ID, IP address, mobile operating system, and mobile browser
                  type, among other diagnostic data.
                </p>

                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">Tracking Technologies and Cookies</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-3">
                  We use Cookies and similar tracking technologies to track activity on Our Service
                  and store certain information. These include:
                </p>
                <ul className="space-y-2 mb-4">
                  <li className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    <span className="font-semibold text-gray-800">Cookies or Browser Cookies</span> — small files placed on Your device. You can instruct Your browser to refuse Cookies, though some parts of the Service may not function properly without them.
                  </li>
                  <li className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    <span className="font-semibold text-gray-800">Web Beacons</span> — small electronic files that permit Us to count visitors and gather related website statistics.
                  </li>
                </ul>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-5">
                  Where required by law, We use non-essential cookies (such as analytics, advertising,
                  and remarketing cookies) only with Your consent, which You may withdraw at any time
                  through Your browser or device settings.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-2">
                  {[
                    { type: "Necessary / Essential Cookies", kind: "Session", desc: "Authenticate users and prevent fraudulent use of accounts. Without these, requested services cannot be provided." },
                    { type: "Cookies Policy / Notice Acceptance", kind: "Persistent", desc: "Identify whether users have accepted the use of cookies on the Website." },
                    { type: "Functionality Cookies", kind: "Persistent", desc: "Remember choices You make, such as login details or language preference, for a more personal experience." },
                  ].map((c) => (
                    <div key={c.type} className="bg-primary-50 rounded-xl px-4 py-3.5">
                      <p className="text-xs font-bold text-primary-600 uppercase tracking-wide mb-1">{c.kind}</p>
                      <p className="text-sm font-bold text-gray-900 mb-1.5">{c.type}</p>
                      <p className="text-xs text-gray-600 leading-relaxed">{c.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Use of Your Data */}
              <section id="use" className="scroll-mt-28 mb-10 sm:mb-12">
                <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-4 pb-3 border-b border-gray-100">
                  Use of Your Personal Data
                </h2>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4">
                  The Company may use Personal Data for the following purposes:
                </p>
                <ul className="space-y-2.5 mb-6">
                  {[
                    ["To provide and maintain our Service", "including to monitor the usage of our Service."],
                    ["To manage Your Account", "to manage Your registration as a user of the Service."],
                    ["For the performance of a contract", "the development, compliance and undertaking of the purchase contract for tours or services You have purchased."],
                    ["To contact You", "by email, phone, SMS, or other electronic means regarding updates or informative communications, including security updates."],
                    ["To provide You with news and offers", "about goods, services and events We offer, similar to those You've purchased or inquired about, unless You've opted out."],
                    ["To manage Your requests", "to attend to and manage Your requests to Us."],
                    ["For business transfers", "to evaluate or conduct a merger, divestiture, restructuring, or sale of assets."],
                    ["For other purposes", "such as data analysis, identifying usage trends, and improving our Service, products, and marketing."],
                  ].map(([title, desc]) => (
                    <li key={title} className="flex items-start gap-2.5 text-sm sm:text-base text-gray-600 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2 flex-shrink-0" />
                      <span><span className="font-semibold text-gray-800">{title}:</span> {desc}</span>
                    </li>
                  ))}
                </ul>

                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-3">
                  We may share Your Personal Data in the following situations:
                </p>
                <ul className="space-y-2.5">
                  {[
                    ["With Service Providers", "to monitor and analyze use of our Service, and to contact You."],
                    ["For business transfers", "in connection with a merger, sale of assets, financing, or acquisition."],
                    ["With Affiliates", "who will be required to honor this Privacy Policy."],
                    ["With business partners", "to offer You certain products, services, or promotions."],
                    ["With Your consent", "for any other purpose with Your consent."],
                  ].map(([title, desc]) => (
                    <li key={title} className="flex items-start gap-2.5 text-sm sm:text-base text-gray-600 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2 flex-shrink-0" />
                      <span><span className="font-semibold text-gray-800">{title}:</span> {desc}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Retention */}
              <section id="retention" className="scroll-mt-28 mb-10 sm:mb-12">
                <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-4 pb-3 border-b border-gray-100">
                  Retention of Your Personal Data
                </h2>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-5">
                  The Company will retain Your Personal Data only for as long as necessary for the
                  purposes set out in this Privacy Policy, to comply with legal obligations, resolve
                  disputes, and enforce our agreements. Where possible, We apply shorter retention
                  periods and reduce identifiability by deleting, aggregating, or anonymizing data.
                </p>

                <div className="space-y-3 mb-5">
                  {[
                    { label: "Account Information", desc: "Retained for the duration of your account relationship, plus up to 24 months after closure." },
                    { label: "Customer Support Data", desc: "Support tickets and chat transcripts retained up to 24 months for follow-up, quality assurance, and training." },
                    { label: "Usage Data", desc: "Website analytics and server logs retained up to 24 months for security, troubleshooting, and trend analysis." },
                  ].map((r) => (
                    <div key={r.label} className="bg-gray-50 rounded-xl px-4 py-3.5">
                      <p className="text-sm font-bold text-gray-900 mb-1">{r.label}</p>
                      <p className="text-sm text-gray-600 leading-relaxed">{r.desc}</p>
                    </div>
                  ))}
                </div>

                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-3">
                  We may retain data beyond these periods for legal obligations, legal claims, at
                  Your explicit request, or due to technical backup limitations. When retention
                  periods expire, We securely delete, anonymize, or retain residual encrypted backup
                  copies only where necessary for security or legal compliance.
                </p>
              </section>

              {/* Transfer */}
              <section id="transfer" className="scroll-mt-28 mb-10 sm:mb-12">
                <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-4 pb-3 border-b border-gray-100">
                  Transfer of Your Personal Data
                </h2>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4">
                  Your information, including Personal Data, is processed at the Company's operating
                  offices and in any other places where the parties involved in processing are
                  located. This means Your information may be transferred to and maintained on
                  computers located outside of Your jurisdiction, where data protection laws may
                  differ.
                </p>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  Where required by applicable law, We will ensure international transfers of Your
                  Personal Data are subject to appropriate safeguards, and no transfer will take
                  place unless adequate controls are in place to protect Your data.
                </p>
              </section>

              {/* Delete */}
              <section id="delete" className="scroll-mt-28 mb-10 sm:mb-12">
                <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-4 pb-3 border-b border-gray-100">
                  Delete Your Personal Data
                </h2>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4">
                  You have the right to delete or request that We assist in deleting the Personal
                  Data We have collected about You. Our Service may allow You to delete certain
                  information directly, or You may update, amend, or delete Your information by
                  signing in to Your Account and visiting the account settings section.
                </p>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  You may also contact Us to request access to, correct, or delete any Personal Data
                  You have provided. Please note We may need to retain certain information where We
                  have a legal obligation or lawful basis to do so.
                </p>
              </section>

              {/* Disclosure */}
              <section id="disclosure" className="scroll-mt-28 mb-10 sm:mb-12">
                <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-4 pb-3 border-b border-gray-100">
                  Disclosure of Your Personal Data
                </h2>

                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 mt-5">Business Transactions</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-5">
                  If the Company is involved in a merger, acquisition, or asset sale, Your Personal
                  Data may be transferred. We will provide notice before Your Personal Data becomes
                  subject to a different Privacy Policy.
                </p>

                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">Law Enforcement</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-5">
                  Under certain circumstances, the Company may be required to disclose Your Personal
                  Data if required to do so by law or in response to valid requests by public
                  authorities.
                </p>

                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3">Other Legal Requirements</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-3">
                  The Company may disclose Your Personal Data in the good faith belief that such
                  action is necessary to:
                </p>
                <ul className="space-y-2">
                  {[
                    "Comply with a legal obligation",
                    "Protect and defend the rights or property of the Company",
                    "Prevent or investigate possible wrongdoing in connection with the Service",
                    "Protect the personal safety of Users of the Service or the public",
                    "Protect against legal liability",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm sm:text-base text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>

              {/* Security */}
              <section id="security" className="scroll-mt-28 mb-10 sm:mb-12">
                <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-4 pb-3 border-b border-gray-100">
                  Security of Your Personal Data
                </h2>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  The security of Your Personal Data is important to Us, but remember that no method
                  of transmission over the Internet, or method of electronic storage, is 100% secure.
                  While We strive to use commercially reasonable means to protect Your Personal Data,
                  We cannot guarantee its absolute security.
                </p>
              </section>

              {/* Third-party */}
              <section id="third-party" className="scroll-mt-28 mb-10 sm:mb-12">
                <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-4 pb-3 border-b border-gray-100">
                  Third-Party Services
                </h2>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4">
                  The Service Providers We use may have access to Your Personal Data. These
                  third-party vendors collect, store, use, process, and transfer information about
                  Your activity on Our Service in accordance with their own privacy policies.
                </p>
                <div className="bg-primary-50 border border-primary-100 rounded-xl px-4 py-4">
                  <p className="text-sm font-bold text-gray-900 mb-1.5">Google Places</p>
                  <p className="text-sm text-gray-600 leading-relaxed mb-2">
                    Google Places is a service that returns information about places using HTTP
                    requests, operated by Google. It may collect information from You and Your
                    Device for security purposes.
                  </p>
                  <a
                    href="https://www.google.com/intl/en/policies/privacy/"
                    target="_blank"
                    rel="external nofollow noopener"
                    className="inline-flex items-center gap-1 text-sm font-semibold text-primary-600 hover:text-primary-700"
                  >
                    Google Privacy Policy <ExternalLink size={13} strokeWidth={2} />
                  </a>
                </div>
              </section>

              {/* Children */}
              <section id="children" className="scroll-mt-28 mb-10 sm:mb-12">
                <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-4 pb-3 border-b border-gray-100">
                  Children's Privacy
                </h2>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4">
                  Our Service does not address anyone under the age of 16. We do not knowingly
                  collect personally identifiable information from anyone under the age of 16. If
                  You are a parent or guardian and are aware that Your child has provided Us with
                  Personal Data, please contact Us. If We become aware that We have collected
                  Personal Data from anyone under 16 without verification of parental consent, We
                  take steps to remove that information from Our servers.
                </p>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  If We need to rely on consent as a legal basis for processing Your information and
                  Your country requires consent from a parent, We may require Your parent's consent
                  before We collect and use that information.
                </p>
              </section>

              {/* Links */}
              <section id="links" className="scroll-mt-28 mb-10 sm:mb-12">
                <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-4 pb-3 border-b border-gray-100">
                  Links to Other Websites
                </h2>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  Our Service may contain links to other websites that are not operated by Us. If You
                  click on a third-party link, You will be directed to that third party's site. We
                  strongly advise You to review the Privacy Policy of every site You visit. We have
                  no control over, and assume no responsibility for, the content, privacy policies,
                  or practices of any third-party sites or services.
                </p>
              </section>

              {/* Changes */}
              <section id="changes" className="scroll-mt-28 mb-10 sm:mb-12">
                <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-4 pb-3 border-b border-gray-100">
                  Changes to This Privacy Policy
                </h2>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4">
                  We may update Our Privacy Policy from time to time. We will notify You of any
                  changes by posting the new Privacy Policy on this page, and will let You know via
                  email and/or a prominent notice on Our Service prior to the change becoming
                  effective, updating the "Last updated" date at the top of this page.
                </p>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  You are advised to review this Privacy Policy periodically for any changes. Changes
                  to this Privacy Policy are effective when they are posted on this page.
                </p>
              </section>

              {/* Contact */}
              <section id="contact" className="scroll-mt-28">
                <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-4 pb-3 border-b border-gray-100">
                  Contact Us
                </h2>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-5">
                  If you have any questions about this Privacy Policy, You can contact us:
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

export default PrivacyPolicy;