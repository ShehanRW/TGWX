import React, { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";
import { jsPDF } from "jspdf";
import {
  User, Mail, Phone, Calendar, Users, MapPin, Car,
  ChevronDown, ChevronUp, Check, Send,
  Loader, AlertCircle, CheckCircle, ArrowRight, Info,
  Clock, Layers, Shield, Star, Download,
} from "lucide-react";

/* ─────────────────────────────────────────────
   ★  EMAILJS CREDENTIALS  ★
   One email is sent per booking.
   In your EmailJS template, set the "To" field to:
     {{to_email}}
   And set the "CC" field to:
     {{cc_email}}
   This delivers one email to the company AND
   a CC copy to the traveller — single send.
───────────────────────────────────────────── */
const EMAILJS_SERVICE_ID  = "service_s6qet0u";
const EMAILJS_TEMPLATE_ID = "template_97ai673";
const EMAILJS_PUBLIC_KEY  = "hnMexV2XIaKhzRV6G";

/* ─────────────────────────────────────────────
   ITINERARIES
───────────────────────────────────────────── */
const ITINERARIES = [
  {
    id: 1,
    title: "Cultural Triangle Explorer",
    days: 7, nights: 6, price: 899,
    category: "Cultural", difficulty: "Easy",
    locations: ["Colombo", "Sigiriya", "Dambulla", "Polonnaruwa", "Anuradhapura"],
    highlights: ["Sigiriya Rock Fortress", "Dambulla Cave Temple", "Polonnaruwa Ruins", "Anuradhapura Sacred City"],
  },
  {
    id: 2,
    title: "Southern Beach Paradise",
    days: 8, nights: 7, price: 1099,
    category: "Beach", difficulty: "Easy",
    locations: ["Colombo", "Galle", "Unawatuna", "Mirissa", "Yala", "Tangalle"],
    highlights: ["Mirissa Whale Watching", "Galle Fort", "Unawatuna Beach", "Yala National Park Safari"],
  },
  {
    id: 3,
    title: "Hill Country Tea Trail",
    days: 5, nights: 4, price: 649,
    category: "Nature", difficulty: "Moderate",
    locations: ["Kandy", "Nuwara Eliya", "Horton Plains", "Ella", "Colombo"],
    highlights: ["Nuwara Eliya Tea Estates", "Horton Plains & World's End", "Ella Rock Hike", "Nine Arch Bridge"],
  },
  {
    id: 4,
    title: "Wildlife Safari Adventure",
    days: 6, nights: 5, price: 849,
    category: "Adventure", difficulty: "Moderate",
    locations: ["Colombo", "Udawalawe", "Yala", "Sinharaja", "Galle"],
    highlights: ["Yala Leopard Safari", "Udawalawe Elephants", "Sinharaja Rainforest", "Bundala Bird Sanctuary"],
  },
  {
    id: 5,
    title: "Heritage & Temples Deep Dive",
    days: 9, nights: 8, price: 1249,
    category: "Cultural", difficulty: "Easy",
    locations: ["Colombo", "Kelaniya", "Kandy", "Adam's Peak", "Galle"],
    highlights: ["Kelaniya Temple", "Gadaladeniya Temple", "Embekka Devale", "Adam's Peak Pilgrimage"],
  },
  {
    id: 6,
    title: "Adventure & Surf Circuit",
    days: 7, nights: 6, price: 799,
    category: "Adventure", difficulty: "Challenging",
    locations: ["Colombo", "Kitulgala", "Knuckles", "Arugam Bay", "Kalpitiya"],
    highlights: ["Arugam Bay Surfing", "Kitulgala White Water Rafting", "Knuckles Mountain Trek", "Kalpitiya Kite Surfing"],
  },
];

/* ─────────────────────────────────────────────
   VEHICLES
───────────────────────────────────────────── */
const VEHICLES = [
  { id: "tuk",  name: "Tuk Tuk",  capacity: "1–2 pax",  icon: "Tuk Tuk", emoji: "🛺", desc: "Fun & authentic Sri Lankan experience for solo or couple travel.", priceNote: "Budget" },
  { id: "car",  name: "AC Car",   capacity: "1–3 pax",  icon: "AC Car",  emoji: "🚗", desc: "Comfortable air-conditioned sedan for couples or small families.", priceNote: "Standard" },
  { id: "suv",  name: "AC SUV",   capacity: "1–5 pax",  icon: "AC SUV",  emoji: "🚙", desc: "Spacious SUV, ideal for families or small groups with luggage.", priceNote: "Comfort" },
  { id: "van",  name: "AC Van",   capacity: "6–10 pax", icon: "AC Van",  emoji: "🚐", desc: "Full-size van for larger groups with ample luggage space.", priceNote: "Group" },
  { id: "bus",  name: "Minibus",  capacity: "10–20 pax",icon: "Minibus", emoji: "🚌", desc: "Ideal for corporate groups and large tour parties.", priceNote: "Large group" },
];

/* ─────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────── */
const generateBookingRef = () =>
  `INSI-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;

const fmtDate = (d) =>
  d ? new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }) : "—";

const calcEndDate = (startDate, days) =>
  startDate
    ? new Date(new Date(startDate).getTime() + (days - 1) * 86400000)
        .toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })
    : "—";

const diffColor = (d) =>
  d === "Easy" ? "bg-green-100 text-green-700"
  : d === "Moderate" ? "bg-amber-100 text-amber-700"
  : "bg-red-100 text-red-700";

const catColor = (c) => {
  const m = {
    Cultural: "bg-purple-100 text-purple-700",
    Beach:    "bg-blue-100 text-blue-700",
    Nature:   "bg-green-100 text-green-700",
    Adventure:"bg-orange-100 text-orange-700",
  };
  return m[c] || "bg-gray-100 text-gray-600";
};

const inputBase = (err) =>
  `w-full border rounded-xl px-3.5 py-3 text-sm font-sans outline-none transition-colors duration-150 min-h-[44px]
   ${err ? "border-red-400 bg-red-50 focus:border-red-500" : "border-gray-200 bg-white focus:border-primary-500"}`;

/* ─────────────────────────────────────────────
   LOCAL STORAGE HELPERS
───────────────────────────────────────────── */
const LS_KEY = "insi_bookings";

const getAllBookings = () => {
  try { return JSON.parse(localStorage.getItem(LS_KEY) || "[]"); }
  catch { return []; }
};

const saveBookingToLocalStorage = (booking) => {
  try {
    const all = getAllBookings();
    all.push(booking);
    localStorage.setItem(LS_KEY, JSON.stringify(all, null, 2));
  } catch (e) { console.error("localStorage save failed:", e); }
};

/* ─────────────────────────────────────────────
   PDF GENERATION — Pure jsPDF (no DOM / canvas)
   This is fully programmatic and works reliably
   in all environments including sandboxed iframes.
───────────────────────────────────────────── */
const generatePDF = (form, itin, vehicle, bookingRef) => {
  try {
    const doc = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });
    const pw = doc.internal.pageSize.getWidth(); // 210
    const total = itin.price * parseInt(form.adults || 1);

    // ── Header band ──────────────────────────────
    doc.setFillColor(2, 132, 199);
    doc.rect(0, 0, pw, 54, "F");

    doc.setFontSize(7.5);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(186, 230, 253);
    doc.text("INSI TOURS  ·  BOOKING CONFIRMATION", pw / 2, 13, { align: "center" });

    doc.setFontSize(20);
    doc.setTextColor(255, 255, 255);
    doc.text(bookingRef, pw / 2, 26, { align: "center" });

    // confirmed pill
    doc.setFillColor(255, 255, 255, 50);
    doc.roundedRect(pw / 2 - 20, 31, 40, 10, 3, 3, "F");
    doc.setFontSize(8);
    doc.setTextColor(255, 255, 255);
    doc.text("✓  CONFIRMED", pw / 2, 38, { align: "center" });

    let y = 64;

    // ── Section helpers ───────────────────────────
    const sectionTitle = (label) => {
      doc.setFontSize(7);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(150, 150, 150);
      doc.text(label.toUpperCase(), 14, y);
      y += 5;
    };

    const fieldPair = (label, value, x, fy) => {
      doc.setFontSize(7);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(170, 170, 170);
      doc.text(label.toUpperCase(), x, fy);
      doc.setFontSize(9.5);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(30, 30, 30);
      const lines = doc.splitTextToSize(String(value || "—"), pw / 2 - 20);
      doc.text(lines, x, fy + 5);
    };

    const divider = () => {
      doc.setDrawColor(240, 240, 240);
      doc.setLineWidth(0.3);
      doc.line(14, y, pw - 14, y);
      y += 8;
    };

    // ── Tour Package ──────────────────────────────
    sectionTitle("Tour Package");
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(10, 10, 10);
    doc.text(itin.title, 14, y);
    y += 7;

    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 100, 100);
    doc.text(`${itin.days} Days / ${itin.nights} Nights  ·  ${itin.category}  ·  ${itin.difficulty}`, 14, y);
    y += 5;

    doc.setFontSize(8);
    doc.setTextColor(140, 140, 140);
    const routeLines = doc.splitTextToSize(itin.locations.join(" → "), pw - 28);
    doc.text(routeLines, 14, y);
    y += routeLines.length * 4.5 + 6;

    divider();

    // ── Traveller Information ─────────────────────
    sectionTitle("Traveller Information");
    fieldPair("Full Name",    `${form.firstName} ${form.lastName}`, 14,       y);
    fieldPair("Nationality",  form.nationality,                      pw/2 + 4, y);
    y += 13;
    fieldPair("Email Address", form.email,  14,       y);
    fieldPair("Phone Number",  form.phone,  pw/2 + 4, y);
    y += 13;
    if (form.passportNo) {
      fieldPair("Passport / NIC", form.passportNo, 14, y);
      y += 13;
    }

    divider();

    // ── Booking Details ───────────────────────────
    sectionTitle("Booking Details");
    fieldPair("Start Date", fmtDate(form.startDate),                              14,       y);
    fieldPair("End Date",   calcEndDate(form.startDate, itin.days),               pw/2 + 4, y);
    y += 13;
    fieldPair("Vehicle",    `${vehicle.emoji} ${vehicle.name} (${vehicle.capacity})`, 14,  y);
    fieldPair("Adults / Children", `${form.adults} / ${form.children || "0"}`,    pw/2 + 4, y);
    y += 13;
    if (form.pickupLocation) {
      fieldPair("Pickup Location", form.pickupLocation, 14, y);
      y += 13;
    }

    // ── Special Requests ──────────────────────────
    if (form.specialRequests) {
      divider();
      sectionTitle("Special Requests");
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(80, 80, 80);
      const srLines = doc.splitTextToSize(form.specialRequests, pw - 28);
      doc.text(srLines, 14, y);
      y += srLines.length * 5 + 6;
    }

    divider();

    // ── Tour Highlights ───────────────────────────
    sectionTitle("Tour Highlights");
    itin.highlights.forEach((h, i) => {
      const col = i % 2 === 0 ? 14 : pw / 2 + 4;
      const row = Math.floor(i / 2);
      const hy  = y + row * 8;
      doc.setFillColor(2, 132, 199);
      doc.circle(col + 2.5, hy - 1.5, 2.2, "F");
      doc.setFontSize(8.5);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(60, 60, 60);
      doc.text(h, col + 7, hy);
    });
    y += Math.ceil(itin.highlights.length / 2) * 8 + 6;

    divider();

    // ── Price ─────────────────────────────────────
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 100, 100);
    doc.text("Estimated Total", 14, y);
    doc.setFontSize(9);
    doc.setTextColor(140, 140, 140);
    doc.text("(Final price confirmed by our team)", 14, y + 5);

    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(2, 132, 199);
    doc.text(`$${total.toLocaleString()} USD`, pw - 14, y + 4, { align: "right" });
    y += 18;

    divider();

    // ── Footer ────────────────────────────────────
    doc.setFontSize(7.5);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(160, 160, 160);
    doc.text("insitours@gmail.com", 14, y);
    doc.text(
      `Submitted ${new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}`,
      pw - 14, y, { align: "right" }
    );
    y += 8;

    doc.setFillColor(248, 250, 252);
    doc.roundedRect(14, y, pw - 28, 12, 3, 3, "F");
    doc.setFontSize(7);
    doc.setTextColor(100, 116, 139);
    doc.text(
      "This is an automated booking confirmation. Our team will contact you within 24 hours.",
      pw / 2, y + 7, { align: "center" }
    );

    doc.save(`insi-tours-booking-${bookingRef}.pdf`);
    return true;
  } catch (err) {
    console.error("PDF generation failed:", err);
    return false;
  }
};

/* ─────────────────────────────────────────────
   FIELD WRAPPER
───────────────────────────────────────────── */
const Field = ({ label, required, error, children }) => (
  <div>
    <label className="block text-xs font-bold text-gray-700 mb-1.5">
      {label}{required && <span className="text-red-500 ml-0.5">*</span>}
    </label>
    {children}
    {error && (
      <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
        <AlertCircle size={11} strokeWidth={2} />{error}
      </p>
    )}
  </div>
);

/* ─────────────────────────────────────────────
   STEP INDICATOR
───────────────────────────────────────────── */
const StepIndicator = ({ step }) => {
  const steps = ["Tour & Vehicle", "Your Details", "Review & Book"];
  return (
    <div className="flex items-center justify-center gap-0 mb-8">
      {steps.map((label, i) => {
        const n = i + 1, done = step > n, cur = step === n;
        return (
          <div key={label} className="flex items-center">
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-200
                ${done ? "bg-primary-500 border-primary-500 text-white"
                : cur  ? "bg-white border-primary-500 text-primary-600"
                :        "bg-white border-gray-200 text-gray-400"}`}>
                {done ? <Check size={14} strokeWidth={3} /> : n}
              </div>
              <span className={`hidden sm:block text-xs mt-1.5 font-semibold whitespace-nowrap
                ${cur ? "text-primary-600" : done ? "text-primary-500" : "text-gray-400"}`}>
                {label}
              </span>
              <span className={`block sm:hidden text-[10px] mt-1 font-semibold
                ${cur ? "text-primary-600" : done ? "text-primary-500" : "text-gray-400"}`}>
                {["Tour", "Details", "Review"][i]}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={`w-8 sm:w-14 h-0.5 mb-5 mx-1 sm:mx-2 transition-all duration-300
                ${step > n ? "bg-primary-500" : "bg-gray-200"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
};

/* ─────────────────────────────────────────────
   STEP 1 — ITINERARY + VEHICLE
───────────────────────────────────────────── */
const Step1 = ({ selItin, setSelItin, selVehicle, setSelVehicle, onNext }) => {
  const [expanded, setExpanded] = useState(null);
  const ok = selItin && selVehicle;

  return (
    <div>
      {/* Itineraries */}
      <div className="mb-6 sm:mb-8">
        <h3 className="text-base font-bold text-gray-900 mb-0.5">Choose Your Itinerary</h3>
        <p className="text-sm text-gray-500 mb-4 sm:mb-5">Select from our available Sri Lanka tour packages</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {ITINERARIES.map(itin => {
            const sel = selItin?.id === itin.id;
            const exp = expanded === itin.id;
            return (
              <div key={itin.id}
                onClick={() => setSelItin(itin)}
                className={`rounded-2xl border-2 cursor-pointer transition-all duration-200 overflow-hidden
                  ${sel ? "border-primary-500 bg-primary-50" : "border-gray-100 bg-white hover:border-primary-300 hover:shadow-md"}`}
              >
                <div className="px-4 py-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex gap-1.5 mb-1.5 flex-wrap">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${catColor(itin.category)}`}>{itin.category}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${diffColor(itin.difficulty)}`}>{itin.difficulty}</span>
                      </div>
                      <h4 className="text-sm font-bold text-gray-900 leading-snug">{itin.title}</h4>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-1 transition-all
                      ${sel ? "bg-primary-500 border-primary-500" : "border-gray-300"}`}>
                      {sel && <Check size={10} strokeWidth={3} className="text-white" />}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 flex-wrap">
                    <span className="text-xs text-gray-500 flex items-center gap-1"><Clock size={11} strokeWidth={2} />{itin.days}D/{itin.nights}N</span>
                    <span className="text-xs text-gray-500 flex items-center gap-1"><MapPin size={11} strokeWidth={2} />{itin.locations.length} stops</span>
                    <span className="text-sm font-extrabold text-primary-500 ml-auto">${itin.price}<span className="text-xs font-normal text-gray-400">/pax</span></span>
                  </div>
                  <p className="text-xs text-gray-400 mb-2 leading-relaxed">
                    {itin.locations.slice(0, 3).join(" → ")}{itin.locations.length > 3 ? " …" : ""}
                  </p>
                  <button
                    className="flex items-center gap-1 text-xs text-primary-600 font-semibold border-none bg-transparent cursor-pointer font-sans p-0 min-h-[32px]"
                    onClick={e => { e.stopPropagation(); setExpanded(exp ? null : itin.id); }}
                  >
                    {exp ? <><ChevronUp size={12} strokeWidth={2} />Hide highlights</> : <><ChevronDown size={12} strokeWidth={2} />View highlights</>}
                  </button>
                  {exp && (
                    <div className="mt-2.5 pt-2.5 border-t border-gray-100 space-y-1">
                      {itin.highlights.map(h => (
                        <div key={h} className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded-full bg-primary-500 flex items-center justify-center flex-shrink-0">
                            <Check size={8} strokeWidth={3} className="text-white" />
                          </div>
                          <span className="text-xs text-gray-700">{h}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Vehicles */}
      <div className="mb-6 sm:mb-8">
        <h3 className="text-base font-bold text-gray-900 mb-0.5">Choose Your Vehicle</h3>
        <p className="text-sm text-gray-500 mb-4 sm:mb-5">All private vehicles with experienced drivers. Price discussed on confirmation.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {VEHICLES.map(v => {
            const sel = selVehicle?.id === v.id;
            return (
              <div key={v.id} onClick={() => setSelVehicle(v)}
                className={`rounded-2xl border-2 px-4 py-4 cursor-pointer transition-all duration-200
                  ${sel ? "border-primary-500 bg-primary-50" : "border-gray-100 bg-white hover:border-primary-300 hover:shadow-md"}`}
              >
                <div className="flex items-center gap-3 sm:block">
                  <span className="text-3xl leading-none flex-shrink-0">{v.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="sm:flex sm:items-start sm:justify-between sm:mb-2 w-full">
                      <div>
                        <div className="font-bold text-gray-900 text-sm">{v.name}</div>
                        <div className="text-xs text-primary-600 font-semibold">{v.capacity}</div>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all
                        ${sel ? "bg-primary-500 border-primary-500" : "border-gray-300"}`}>
                        {sel && <Check size={10} strokeWidth={3} className="text-white" />}
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 leading-relaxed hidden sm:block mb-2">{v.desc}</div>
                    <span className="inline-block bg-gray-100 text-gray-500 text-xs px-2 py-0.5 rounded-full">{v.priceNote}</span>
                  </div>
                </div>
                <div className="text-xs text-gray-500 leading-relaxed mt-2 sm:hidden">{v.desc}</div>
              </div>
            );
          })}
        </div>
      </div>

      <button onClick={onNext} disabled={!ok}
        className={`w-full py-3.5 rounded-xl text-sm font-bold border-none cursor-pointer font-sans
                    flex items-center justify-center gap-2 transition-all duration-200 min-h-[48px]
          ${ok ? "bg-primary-500 text-white hover:bg-primary-600 shadow-md" : "bg-gray-100 text-gray-400 cursor-not-allowed"}`}>
        Continue to Your Details <ArrowRight size={16} strokeWidth={2.5} />
      </button>
      {!ok && (
        <p className="text-center text-xs text-gray-400 mt-2 flex items-center justify-center gap-1">
          <Info size={12} strokeWidth={2} /> Select both a tour and a vehicle to continue
        </p>
      )}
    </div>
  );
};

/* ─────────────────────────────────────────────
   STEP 2 — TRAVELLER DETAILS
───────────────────────────────────────────── */
const Step2 = ({ form, setForm, onNext, onBack }) => {
  const [errors, setErrors] = useState({});

  const upd = (k, v) => {
    setForm(f => ({ ...f, [k]: v }));
    if (errors[k]) setErrors(e => ({ ...e, [k]: null }));
  };

  const validate = () => {
    const e = {};
    if (!form.firstName?.trim()) e.firstName = "Required";
    if (!form.lastName?.trim()) e.lastName = "Required";
    if (!form.email?.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required";
    if (!form.phone?.trim()) e.phone = "Required";
    if (!form.nationality?.trim()) e.nationality = "Required";
    if (!form.startDate) e.startDate = "Required";
    if (!form.adults || parseInt(form.adults) < 1) e.adults = "At least 1 adult required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  return (
    <div>
      <h3 className="text-base font-bold text-gray-900 mb-0.5">Your Details</h3>
      <p className="text-sm text-gray-500 mb-5">All fields marked <span className="text-red-500">*</span> are required.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <Field label="First Name" required error={errors.firstName}>
          <div className="relative">
            <User size={14} strokeWidth={2} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <input className={`${inputBase(errors.firstName)} pl-9`} placeholder="John" autoComplete="given-name"
              value={form.firstName || ""} onChange={e => upd("firstName", e.target.value)} />
          </div>
        </Field>

        <Field label="Last Name" required error={errors.lastName}>
          <div className="relative">
            <User size={14} strokeWidth={2} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <input className={`${inputBase(errors.lastName)} pl-9`} placeholder="Smith" autoComplete="family-name"
              value={form.lastName || ""} onChange={e => upd("lastName", e.target.value)} />
          </div>
        </Field>

        <Field label="Email Address" required error={errors.email}>
          <div className="relative">
            <Mail size={14} strokeWidth={2} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <input type="email" inputMode="email" className={`${inputBase(errors.email)} pl-9`} placeholder="john@example.com" autoComplete="email"
              value={form.email || ""} onChange={e => upd("email", e.target.value)} />
          </div>
        </Field>

        <Field label="Phone Number" required error={errors.phone}>
          <div className="relative">
            <Phone size={14} strokeWidth={2} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <input type="tel" inputMode="tel" className={`${inputBase(errors.phone)} pl-9`} placeholder="+1 234 567 8900" autoComplete="tel"
              value={form.phone || ""} onChange={e => upd("phone", e.target.value)} />
          </div>
        </Field>

        <Field label="Nationality" required error={errors.nationality}>
          <div className="relative">
            <MapPin size={14} strokeWidth={2} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <input className={`${inputBase(errors.nationality)} pl-9`} placeholder="e.g. British" autoComplete="country-name"
              value={form.nationality || ""} onChange={e => upd("nationality", e.target.value)} />
          </div>
        </Field>

        <Field label="Passport / NIC No." error={errors.passportNo}>
          <input className={inputBase(false)} placeholder="Optional but recommended"
            value={form.passportNo || ""} onChange={e => upd("passportNo", e.target.value)} />
        </Field>

        <Field label="Tour Start Date" required error={errors.startDate}>
          <div className="relative">
            <Calendar size={14} strokeWidth={2} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <input type="date" className={`${inputBase(errors.startDate)} pl-9`}
              min={new Date().toISOString().split("T")[0]}
              value={form.startDate || ""} onChange={e => upd("startDate", e.target.value)} />
          </div>
        </Field>

        <Field label="Pickup Location / Hotel">
          <div className="relative">
            <MapPin size={14} strokeWidth={2} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <input className={`${inputBase(false)} pl-9`} placeholder="Hotel name or address"
              value={form.pickupLocation || ""} onChange={e => upd("pickupLocation", e.target.value)} />
          </div>
        </Field>

        <Field label="Number of Adults" required error={errors.adults}>
          <div className="relative">
            <Users size={14} strokeWidth={2} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <input type="number" inputMode="numeric" min="1" max="50" className={`${inputBase(errors.adults)} pl-9`} placeholder="1"
              value={form.adults || ""} onChange={e => upd("adults", e.target.value)} />
          </div>
        </Field>

        <Field label="Children (under 12)">
          <div className="relative">
            <Users size={14} strokeWidth={2} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <input type="number" inputMode="numeric" min="0" max="20" className={`${inputBase(false)} pl-9`} placeholder="0"
              value={form.children || ""} onChange={e => upd("children", e.target.value)} />
          </div>
        </Field>
      </div>

      <Field label="Special Requests / Notes">
        <textarea rows={3} className={`${inputBase(false)} resize-none`}
          placeholder="Dietary needs, accessibility, special occasions, preferences…"
          value={form.specialRequests || ""} onChange={e => upd("specialRequests", e.target.value)} />
      </Field>

      <div className="flex gap-3 mt-6">
        <button onClick={onBack}
          className="px-4 sm:px-6 py-3 rounded-xl border-2 border-gray-200 text-gray-700 font-semibold
                     text-sm cursor-pointer bg-white hover:border-gray-300 transition-colors font-sans min-h-[48px]">
          ← Back
        </button>
        <button onClick={() => { if (validate()) onNext(); }}
          className="flex-1 py-3 rounded-xl bg-primary-500 text-white font-bold text-sm border-none
                     cursor-pointer hover:bg-primary-600 transition-colors font-sans flex items-center justify-center gap-2 min-h-[48px]">
          Review Booking <ArrowRight size={16} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   STEP 3 — REVIEW + SUBMIT
───────────────────────────────────────────── */
const Step3 = ({ form, itin, vehicle, onBack, onSubmit, submitting, submitError }) => {
  const total    = itin.price * parseInt(form.adults || 1);
  const startStr = fmtDate(form.startDate);
  const endStr   = calcEndDate(form.startDate, itin.days);

  const Row = ({ label, val }) => (
    <div className="flex justify-between items-start py-2 border-b border-gray-50 last:border-0 gap-2">
      <span className="text-xs text-gray-500 flex-shrink-0">{label}</span>
      <span className="text-xs font-semibold text-gray-900 text-right break-all">{val}</span>
    </div>
  );

  return (
    <div>
      <h3 className="text-base font-bold text-gray-900 mb-0.5">Review Your Booking</h3>
      <p className="text-sm text-gray-500 mb-5">Please check everything before confirming.</p>

      {/* Tour Summary */}
      <div className="bg-primary-50 border border-primary-100 rounded-2xl p-4 mb-4">
        <div className="flex gap-2 mb-2 flex-wrap">
          <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${catColor(itin.category)}`}>{itin.category}</span>
          <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${diffColor(itin.difficulty)}`}>{itin.difficulty}</span>
        </div>
        <h4 className="text-sm font-extrabold text-gray-900 mb-1">{itin.title}</h4>
        <div className="flex gap-3 text-xs text-gray-500 mb-1.5 flex-wrap">
          <span className="flex items-center gap-1"><Clock size={11} strokeWidth={2} />{itin.days}D / {itin.nights}N</span>
          <span className="flex items-center gap-1"><Car size={11} strokeWidth={2} />{vehicle.emoji} {vehicle.name} ({vehicle.capacity})</span>
        </div>
        <p className="text-xs text-gray-400 flex items-start gap-1">
          <MapPin size={11} strokeWidth={2} className="flex-shrink-0 mt-0.5" /><span>{itin.locations.join(" → ")}</span>
        </p>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div className="bg-white border border-gray-100 rounded-2xl p-4">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2.5">Traveller</p>
          <Row label="Full Name"    val={`${form.firstName} ${form.lastName}`} />
          <Row label="Email"        val={form.email} />
          <Row label="Phone"        val={form.phone} />
          <Row label="Nationality"  val={form.nationality} />
          {form.passportNo && <Row label="Passport/NIC" val={form.passportNo} />}
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl p-4">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2.5">Booking</p>
          <Row label="Start Date"   val={startStr} />
          <Row label="End Date"     val={endStr} />
          <Row label="Adults"       val={form.adults} />
          <Row label="Children"     val={form.children || "0"} />
          <Row label="Vehicle"      val={`${vehicle.emoji} ${vehicle.name}`} />
          {form.pickupLocation && <Row label="Pickup" val={form.pickupLocation} />}
        </div>
      </div>

      {form.specialRequests && (
        <div className="bg-amber-50 border border-amber-100 rounded-xl px-4 py-3 mb-4">
          <p className="text-xs font-bold text-amber-700 mb-0.5">Special Requests</p>
          <p className="text-xs text-amber-800 leading-relaxed">{form.specialRequests}</p>
        </div>
      )}

      {/* Price */}
      <div className="bg-white border-2 border-primary-100 rounded-2xl p-4 sm:p-5 mb-5">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Price Estimate</p>
        <div className="flex justify-between py-1.5 text-sm text-gray-600">
          <span>${itin.price} × {form.adults} adult{parseInt(form.adults) > 1 ? "s" : ""}</span>
          <span className="font-bold text-gray-900">${total.toLocaleString()}</span>
        </div>
        <div className="border-t border-gray-100 mt-2 pt-2.5 flex justify-between items-center">
          <span className="text-sm font-bold text-gray-900">Estimated Total</span>
          <span className="text-xl font-extrabold text-primary-500">${total.toLocaleString()} <span className="text-xs font-normal text-gray-400">USD</span></span>
        </div>
        <p className="text-xs text-gray-400 mt-2 flex items-start gap-1 leading-relaxed">
          <Info size={11} strokeWidth={2} className="flex-shrink-0 mt-0.5" />
          Final price confirmed by our team after availability check.
        </p>
      </div>

      {/* What happens next */}
      <div className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-4 mb-5">
        <p className="text-xs font-bold text-gray-600 mb-2.5">What happens when you click "Confirm Booking":</p>
        <div className="space-y-1.5">
          {[
            ["📧", `Booking email sent to insitours@gmail.com (CC'd to ${form.email})`],
            ["📄", "PDF confirmation slip auto-downloaded to your device"],
            ["💾", "Booking saved in your browser as a backup"],
            ["📞", "Our team will contact you within 24 hours to confirm"],
          ].map(([icon, text]) => (
            <div key={text} className="flex items-start gap-2">
              <span className="text-sm leading-none mt-0.5 flex-shrink-0">{icon}</span>
              <span className="text-xs text-gray-600">{text}</span>
            </div>
          ))}
        </div>
      </div>

      {submitError && (
        <div className="mb-4 bg-red-50 border border-red-200 rounded-xl px-4 py-3 flex items-center gap-2">
          <AlertCircle size={15} strokeWidth={2} className="text-red-500 flex-shrink-0" />
          <p className="text-sm text-red-700">{submitError}</p>
        </div>
      )}

      <div className="flex gap-3">
        <button onClick={onBack} disabled={submitting}
          className="px-4 sm:px-6 py-3 rounded-xl border-2 border-gray-200 text-gray-700 font-semibold text-sm
                     cursor-pointer bg-white hover:border-gray-300 transition-colors font-sans disabled:opacity-50 min-h-[48px]">
          ← Back
        </button>
        <button onClick={onSubmit} disabled={submitting}
          className="flex-1 py-3.5 rounded-xl bg-primary-500 text-white font-bold text-sm border-none
                     cursor-pointer hover:bg-primary-600 transition-colors font-sans shadow-md
                     flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed min-h-[48px]">
          {submitting
            ? <><Loader size={15} strokeWidth={2} className="animate-spin" />Processing…</>
            : <><Send size={15} strokeWidth={2} />Confirm Booking</>}
        </button>
      </div>
      <p className="text-center text-xs text-gray-400 mt-3">
        Free cancellation up to 30 days prior · No payment required now
      </p>
    </div>
  );
};

/* ─────────────────────────────────────────────
   SUCCESS SCREEN
───────────────────────────────────────────── */
const SuccessScreen = ({ form, itin, vehicle, onReset, bookingRef, pdfStatus, onManualDownload }) => {
  const total = itin.price * parseInt(form.adults || 1);

  return (
    <div className="py-6 px-2">
      {/* PDF status banner */}
      <div className={`max-w-md mx-auto mb-5 rounded-xl px-4 py-3 flex items-center gap-3 transition-all duration-300
        ${pdfStatus === "generating" ? "bg-blue-50 border border-blue-100"
        : pdfStatus === "done"       ? "bg-green-50 border border-green-100"
        :                              "bg-amber-50 border border-amber-100"}`}>
        {pdfStatus === "generating" && (
          <>
            <Loader size={16} strokeWidth={2} className="text-blue-500 animate-spin flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold text-blue-800">Generating your PDF…</p>
              <p className="text-xs text-blue-600">Your confirmation slip is being prepared.</p>
            </div>
          </>
        )}
        {pdfStatus === "done" && (
          <>
            <CheckCircle size={16} strokeWidth={2} className="text-green-500 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold text-green-800">PDF downloaded successfully!</p>
              <p className="text-xs text-green-600">Check your Downloads folder for <strong>insi-tours-booking-{bookingRef}.pdf</strong></p>
            </div>
          </>
        )}
        {pdfStatus === "error" && (
          <>
            <AlertCircle size={16} strokeWidth={2} className="text-amber-500 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold text-amber-800">Auto-download failed</p>
              <p className="text-xs text-amber-600">Use the button below to download manually.</p>
            </div>
          </>
        )}
      </div>

      {/* Confirmation card */}
      <div className="max-w-md mx-auto mb-5">
        <div style={{
          backgroundColor: "#ffffff",
          borderRadius: "20px",
          border: "1px solid #e5e7eb",
          padding: "28px 24px 24px",
          fontFamily: "system-ui, -apple-system, sans-serif",
          boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
        }}>
          <div style={{
            background: "linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)",
            borderRadius: "12px",
            padding: "18px 20px",
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "8px",
          }}>
            <div>
              <div style={{ color: "#bae6fd", fontSize: "11px", fontWeight: "600", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "4px" }}>
                Insi Tours · Booking Confirmation
              </div>
              <div style={{ color: "#ffffff", fontSize: "20px", fontWeight: "800", letterSpacing: "0.5px" }}>
                {bookingRef}
              </div>
            </div>
            <div style={{
              background: "rgba(255,255,255,0.2)",
              borderRadius: "10px",
              padding: "6px 12px",
              color: "#ffffff",
              fontSize: "12px",
              fontWeight: "700",
            }}>
              ✓ Confirmed
            </div>
          </div>

          <div style={{ marginBottom: "16px" }}>
            <div style={{ color: "#6b7280", fontSize: "10px", fontWeight: "700", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "6px" }}>Tour Package</div>
            <div style={{ color: "#111827", fontSize: "15px", fontWeight: "800", marginBottom: "4px" }}>{itin.title}</div>
            <div style={{ color: "#6b7280", fontSize: "12px" }}>{itin.days} Days / {itin.nights} Nights · {itin.category} · {itin.difficulty}</div>
          </div>

          <div style={{ borderTop: "1px solid #f3f4f6", marginBottom: "16px" }} />

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 16px", marginBottom: "16px" }}>
            {[
              ["Traveller",        `${form.firstName} ${form.lastName}`],
              ["Nationality",      form.nationality],
              ["Email",            form.email],
              ["Phone",            form.phone],
              ["Vehicle",          `${vehicle.emoji} ${vehicle.name}`],
              ["Adults/Children",  `${form.adults} / ${form.children || "0"}`],
            ].map(([label, val]) => (
              <div key={label}>
                <div style={{ color: "#9ca3af", fontSize: "10px", fontWeight: "600", textTransform: "uppercase", marginBottom: "2px" }}>{label}</div>
                <div style={{ fontSize: "12px", fontWeight: "600", wordBreak: "break-all" }}>{val}</div>
              </div>
            ))}
          </div>

          <div style={{ borderTop: "1px solid #f3f4f6", marginBottom: "14px" }} />

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ color: "#6b7280", fontSize: "10px", fontWeight: "700", textTransform: "uppercase" }}>Estimated Total</div>
              <div style={{ color: "#9ca3af", fontSize: "10px", marginTop: "2px" }}>Final price confirmed by team</div>
            </div>
            <div style={{ color: "#0284c7", fontSize: "22px", fontWeight: "800" }}>
              ${total.toLocaleString()} <span style={{ fontSize: "11px", color: "#9ca3af", fontWeight: "400" }}>USD</span>
            </div>
          </div>

          <div style={{ marginTop: "16px", borderTop: "1px solid #f3f4f6", paddingTop: "12px", textAlign: "center" }}>
            <div style={{ color: "#9ca3af", fontSize: "10px" }}>insitours@gmail.com</div>
          </div>
        </div>
      </div>

      {/* Status chips */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-5 max-w-md mx-auto">
        {[
          { icon: "📧", label: "Email sent + CC'd", val: "company & you" },
          { icon: "📄", label: "PDF downloaded",    val: "Auto-downloaded" },
          { icon: "💾", label: "Saved locally",     val: "Browser backup" },
        ].map(({ icon, label, val }) => (
          <div key={label} className="bg-gray-50 rounded-xl px-2 sm:px-3 py-3 text-center">
            <div className="text-lg sm:text-xl mb-1">{icon}</div>
            <div className="text-xs font-bold text-gray-700 leading-tight">{label}</div>
            <div className="text-xs text-gray-400 hidden sm:block truncate">{val}</div>
          </div>
        ))}
      </div>

      <p className="text-sm text-gray-500 mb-5 max-w-sm mx-auto leading-relaxed px-2 text-center">
        Our team will reach out within <span className="font-semibold text-gray-700">24 hours</span> to
        confirm availability and share payment details.
      </p>
      <p className="text-sm text-gray-500 mb-5 max-w-sm mx-auto leading-relaxed px-2 text-center">
        The booking procedure makes detailed connection and we will connect you to <span className="font-semibold text-gray-700">confirm</span> your booking to prepare your tour.
      </p>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto">
        <button onClick={onManualDownload} disabled={pdfStatus === "generating"}
          className="flex-1 py-3 rounded-xl border-2 border-primary-500 text-primary-600 font-bold text-sm
                     cursor-pointer bg-white hover:bg-primary-50 transition-colors font-sans
                     flex items-center justify-center gap-2 min-h-[48px] disabled:opacity-60 disabled:cursor-not-allowed">
          {pdfStatus === "generating"
            ? <><Loader size={15} strokeWidth={2} className="animate-spin" />Generating…</>
            : <><Download size={15} strokeWidth={2.5} />Download PDF Again</>}
        </button>
        <button onClick={onReset}
          className="flex-1 py-3 rounded-xl bg-primary-500 text-white font-bold text-sm border-none
                     cursor-pointer hover:bg-primary-600 transition-colors font-sans min-h-[48px]
                     flex items-center justify-center gap-2">
          Book Another Tour
        </button>
      </div>
      <p className="text-center text-xs text-gray-400 mt-3">
        Saved as <span className="font-mono">insi-tours-booking-{bookingRef}.pdf</span>
      </p>
    </div>
  );
};

/* ─────────────────────────────────────────────
   MAIN BOOKING COMPONENT
───────────────────────────────────────────── */
const Booking = () => {
  const [step,       setStep]       = useState(1);
  const [selItin,    setSelItin]    = useState(null);
  const [selVehicle, setSelVehicle] = useState(null);
  const [form,       setForm]       = useState({
    firstName: "", lastName: "", email: "", phone: "", nationality: "",
    passportNo: "", startDate: "", adults: "1", children: "0",
    pickupLocation: "", specialRequests: "",
  });
  const [submitting,  setSubmitting]  = useState(false);
  const [done,        setDone]        = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [bookingRef,  setBookingRef]  = useState("");
  const [pdfStatus,   setPdfStatus]   = useState("idle"); // idle | generating | done | error

  useEffect(() => {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  /* ── Build shared email params ─────────────────── */
  const buildEmailParams = (ref, overrides = {}) => {
    const total = selItin.price * parseInt(form.adults || 1);
    return {
      booking_ref:     ref,
      tour_title:      selItin.title,
      tour_category:   selItin.category,
      tour_duration:   `${selItin.days} Days / ${selItin.nights} Nights`,
      tour_difficulty: selItin.difficulty,
      tour_route:      selItin.locations.join(" → "),
      tour_highlights: selItin.highlights.join(", "),
      traveller_name:  `${form.firstName} ${form.lastName}`,
      traveller_email: form.email,
      traveller_phone: form.phone,
      nationality:     form.nationality,
      passport_no:     form.passportNo || "Not provided",
      start_date:      fmtDate(form.startDate),
      end_date:        calcEndDate(form.startDate, selItin.days),
      adults:          form.adults,
      children:        form.children || "0",
      vehicle:         `${selVehicle.name} (${selVehicle.capacity})`,
      pickup:          form.pickupLocation || "To be confirmed",
      special_requests:form.specialRequests || "None",
      estimated_total: `$${total.toLocaleString()} USD`,
      price_per_person:`$${selItin.price}`,
      submitted_at:    new Date().toLocaleString("en-GB"),
      ...overrides,
    };
  };

  /* ── Trigger PDF generation ────────────────────── */
  const triggerPDF = (ref) => {
    setPdfStatus("generating");
    // Small delay ensures React has re-rendered the done screen first
    setTimeout(() => {
      const ok = generatePDF(form, selItin, selVehicle, ref);
      setPdfStatus(ok ? "done" : "error");
    }, 500);
  };

  /* ── Manual re-download ────────────────────────── */
  const handleManualDownload = () => {
    setPdfStatus("generating");
    setTimeout(() => {
      const ok = generatePDF(form, selItin, selVehicle, bookingRef);
      setPdfStatus(ok ? "done" : "error");
    }, 200);
  };

  /* ── Submit handler ────────────────────────────── */
  const handleSubmit = async () => {
    setSubmitting(true);
    setSubmitError(null);

    const ref   = generateBookingRef();
    const total = selItin.price * parseInt(form.adults || 1);

    const bookingData = {
      bookingRef: ref,
      createdAt:  new Date().toISOString(),
      itinerary:  {
        id: selItin.id, title: selItin.title, days: selItin.days, nights: selItin.nights,
        price: selItin.price, category: selItin.category, difficulty: selItin.difficulty,
        locations: selItin.locations, highlights: selItin.highlights,
      },
      vehicle:           { id: selVehicle.id, name: selVehicle.name, capacity: selVehicle.capacity },
      traveller:         { ...form },
      estimatedTotalUSD: total,
      status:            "pending",
    };

    try {
      // ── Single email send ─────────────────────────
      // "To"  → insitours@gmail.com  (set {{to_email}} as recipient in EmailJS template)
      // "CC"  → traveller's email    (set {{cc_email}} as CC field in EmailJS template)
      // This produces ONE email transaction, no duplicate sends.
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        buildEmailParams(ref, {
          to_email:  "insitours@gmail.com",
          cc_email:  form.email,
          from_name: `${form.firstName} ${form.lastName}`,
          reply_to:  form.email,
          message:   `New booking received from ${form.firstName} ${form.lastName}. Booking ref: ${ref}. A copy of this confirmation has been CC'd to the traveller at ${form.email}.`,
        })
      );

      // ── 2. Save to localStorage ───────────────────
      saveBookingToLocalStorage(bookingData);

      // ── 4. Transition to success + trigger PDF ────
      setBookingRef(ref);
      setDone(true);
      setSubmitting(false);
      triggerPDF(ref);

    } catch (err) {
      console.error("Booking submission error:", err);
      setSubmitError(err?.text || err?.message || "Failed to complete booking. Please check your connection and try again.");
      setSubmitting(false);
    }
  };

  /* ── Reset ─────────────────────────────────────── */
  const reset = () => {
    setStep(1);
    setSelItin(null);
    setSelVehicle(null);
    setForm({
      firstName: "", lastName: "", email: "", phone: "", nationality: "",
      passportNo: "", startDate: "", adults: "1", children: "0",
      pickupLocation: "", specialRequests: "",
    });
    setSubmitting(false);
    setDone(false);
    setSubmitError(null);
    setBookingRef("");
    setPdfStatus("idle");
  };

  const estTotal = selItin && form.adults ? selItin.price * parseInt(form.adults || 1) : null;

  return (
    <div className="font-sans bg-white text-gray-900 overflow-x-hidden">
      <style>{`
        .bg-primary-500   { background-color: #0284c7; }
        .bg-primary-50    { background-color: #f0f9ff; }
        .bg-primary-100   { background-color: #e0f2fe; }
        .border-primary-500 { border-color: #0284c7; }
        .border-primary-100 { border-color: #e0f2fe; }
        .border-primary-300 { border-color: #7dd3fc; }
        .text-primary-500 { color: #0284c7; }
        .text-primary-600 { color: #0369a1; }
        .hover\\:bg-primary-600:hover  { background-color: #0369a1; }
        .hover\\:bg-primary-50:hover   { background-color: #f0f9ff; }
        .hover\\:border-primary-300:hover { border-color: #7dd3fc; }
        .focus\\:border-primary-500:focus { border-color: #0284c7; }
      `}</style>

      <section className="py-10 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-12 bg-white">
        <div className="max-w-[1200px] mx-auto">
          {!done && (
            <div className="mb-6 sm:mb-10">
              <span className="bg-primary-100 text-primary-600 px-3.5 py-1.5 rounded-full text-sm font-semibold">
                Book Online
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-gray-900 mt-3">
                Book Your Sri Lanka Tour
              </h2>
              <p className="text-gray-500 text-sm sm:text-base mt-1">
                Fill in the form and our team will confirm your booking within 24 hours. No payment required now.
              </p>
            </div>
          )}

          <div className="flex gap-6 lg:gap-10 flex-col lg:flex-row items-start">
            {/* Main form area */}
            <div className="flex-1 w-full min-w-0">
              <div className="bg-white border border-gray-100 rounded-2xl sm:rounded-3xl shadow-sm p-4 sm:p-6 lg:p-8">
                {done ? (
                  <SuccessScreen
                    form={form}
                    itin={selItin}
                    vehicle={selVehicle}
                    onReset={reset}
                    bookingRef={bookingRef}
                    pdfStatus={pdfStatus}
                    onManualDownload={handleManualDownload}
                  />
                ) : (
                  <>
                    <StepIndicator step={step} />
                    {step === 1 && (
                      <Step1
                        selItin={selItin}     setSelItin={setSelItin}
                        selVehicle={selVehicle} setSelVehicle={setSelVehicle}
                        onNext={() => setStep(2)}
                      />
                    )}
                    {step === 2 && (
                      <Step2
                        form={form} setForm={setForm}
                        onNext={() => setStep(3)}
                        onBack={() => setStep(1)}
                      />
                    )}
                    {step === 3 && (
                      <Step3
                        form={form} itin={selItin} vehicle={selVehicle}
                        onBack={() => setStep(2)}
                        onSubmit={handleSubmit}
                        submitting={submitting}
                        submitError={submitError}
                      />
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Sidebar */}
            {!done && (
              <div className="lg:w-72 w-full flex-shrink-0">
                <div className="lg:sticky lg:top-28 space-y-4">
                  {selItin ? (
                    <div className="bg-primary-50 border border-primary-100 rounded-2xl p-4 sm:p-5">
                      <p className="text-xs font-bold text-primary-600 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                        <Layers size={12} strokeWidth={2} /> Selected Tour
                      </p>
                      <h4 className="text-sm font-bold text-gray-900 mb-2.5">{selItin.title}</h4>
                      <div className="space-y-1.5 text-xs text-gray-600">
                        <div className="flex items-center gap-2">
                          <Clock size={11} strokeWidth={2} className="text-primary-500 flex-shrink-0" />
                          {selItin.days} Days / {selItin.nights} Nights
                        </div>
                        <div className="flex items-start gap-2">
                          <MapPin size={11} strokeWidth={2} className="text-primary-500 flex-shrink-0 mt-0.5" />
                          <span>{selItin.locations.join(" → ")}</span>
                        </div>
                        {selVehicle && (
                          <div className="flex items-center gap-2">
                            <Car size={11} strokeWidth={2} className="text-primary-500 flex-shrink-0" />
                            {selVehicle.emoji} {selVehicle.name} ({selVehicle.capacity})
                          </div>
                        )}
                        {form.startDate && (
                          <div className="flex items-center gap-2">
                            <Calendar size={11} strokeWidth={2} className="text-primary-500 flex-shrink-0" />
                            From {fmtDate(form.startDate)}
                          </div>
                        )}
                      </div>
                      {estTotal && (
                        <div className="mt-3 pt-3 border-t border-primary-200 flex justify-between items-center">
                          <span className="text-xs text-gray-500">Est. Total</span>
                          <span className="text-lg font-extrabold text-primary-600">${estTotal.toLocaleString()}</span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 text-center">
                      <Layers size={26} strokeWidth={1.5} className="text-gray-300 mx-auto mb-2" />
                      <p className="text-xs text-gray-400">Your selected tour will appear here</p>
                    </div>
                  )}

                  <div className="bg-white border border-gray-100 rounded-2xl p-4 sm:p-5">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Why Book With Us</p>
                    {[
                      [<Shield size={13} strokeWidth={2} className="text-primary-500" />, "Free cancellation 30 days prior"],
                      [<Star   size={13} strokeWidth={2} className="text-primary-500" />, "Licensed local expert guides"],
                      [<Check  size={13} strokeWidth={2} className="text-primary-500" />, "Best price guarantee"],
                      [<Download size={13} strokeWidth={2} className="text-primary-500" />, "Auto PDF confirmation slip"],
                      [<Mail  size={13} strokeWidth={2} className="text-primary-500" />, "Instant email to your inbox"],
                    ].map(([icon, text]) => (
                      <div key={text} className="flex items-center gap-2.5 py-1.5">
                        {icon}
                        <span className="text-xs text-gray-600">{text}</span>
                      </div>
                    ))}
                  </div>

                  <div className="bg-white border border-gray-100 rounded-2xl p-4 sm:p-5">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Need Help?</p>
                    <a href="mailto:insitours@gmail.com"
                      className="flex items-center gap-2.5 text-sm font-semibold text-primary-600 hover:text-primary-700 no-underline">
                      <Mail size={15} strokeWidth={2} /> insitours@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Booking;