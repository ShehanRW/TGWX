import React, { useEffect, useRef } from "react";
import { X, MapPin, Tag, Star, DollarSign, Users, Info } from "lucide-react";

/* ── helpers ── */
const Stars = ({ rating, size = 15 }) => {
  if (!rating) return null;
  return (
    <span style={{ display: "inline-flex", gap: "2px" }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={size}
          strokeWidth={0}
          fill={i <= Math.round(rating) ? "#00AA6C" : "#D1D5DB"}
        />
      ))}
    </span>
  );
};

const Pill = ({ bg, color, children }) => (
  <span
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: "5px",
      background: bg || "#F3F4F6",
      color: color || "#374151",
      padding: "5px 13px",
      borderRadius: "999px",
      fontSize: "0.75rem",
      fontWeight: 700,
      letterSpacing: "0.02em",
    }}
  >
    {children}
  </span>
);

/* ══════════════════════════════════════════════
   DestinationModal — universal reusable component
   Props:
     destination  – object from destinations.json (or null/undefined to close)
     onClose      – () => void
   ══════════════════════════════════════════════ */
const DestinationModal = ({ destination, onClose }) => {
  const overlayRef = useRef(null);
  const panelRef   = useRef(null);

  /* lock body scroll while open */
  useEffect(() => {
    if (!destination) return;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [destination]);

  /* close on Escape */
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  /* animate in */
  useEffect(() => {
    if (!destination) return;
    requestAnimationFrame(() => {
      if (overlayRef.current) overlayRef.current.style.opacity = "1";
      if (panelRef.current)   panelRef.current.style.transform = "translateY(0) scale(1)";
    });
  }, [destination]);

  if (!destination) return null;

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) onClose();
  };

  /* sentence-split for richer layout */
  const sentences = destination.description
    ? destination.description.match(/[^.!?]+[.!?]*/g)?.map((s) => s.trim()).filter(Boolean) || []
    : [];
  const lead      = sentences.slice(0, 2).join(" ");
  const rest      = sentences.slice(2).join(" ");

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      style={{
        position:        "fixed",
        inset:           0,
        background:      "rgba(10,20,15,0.72)",
        backdropFilter:  "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        zIndex:          1000,
        display:         "flex",
        alignItems:      "center",
        justifyContent:  "center",
        padding:         "24px 16px",
        opacity:         0,
        transition:      "opacity 0.28s ease",
      }}
    >
      <div
        ref={panelRef}
        style={{
          background:    "#fff",
          borderRadius:  "24px",
          width:         "100%",
          maxWidth:      "780px",
          maxHeight:     "90vh",
          overflowY:     "auto",
          boxShadow:     "0 32px 80px rgba(0,0,0,0.28)",
          transform:     "translateY(28px) scale(0.97)",
          transition:    "transform 0.32s cubic-bezier(0.34,1.56,0.64,1)",
          position:      "relative",
          scrollbarWidth: "none",
        }}
      >
        {/* ── Hero image ── */}
        <div style={{ position: "relative", height: "300px", flexShrink: 0 }}>
          <img
            src={destination.img}
            alt={destination.name}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            onError={(e) => {
              e.target.src =
                "https://placehold.co/780x300?text=" + encodeURIComponent(destination.name);
            }}
          />

          {/* gradient overlay */}
          <div
            style={{
              position:   "absolute",
              inset:      0,
              background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 55%)",
              borderRadius: "24px 24px 0 0",
            }}
          />

          {/* badge top-left */}
          {destination.badge && destination.badgeColor && (
            <div style={{ position: "absolute", top: "18px", left: "20px" }}>
              <Pill bg={destination.badgeColor.bg} color={destination.badgeColor.color}>
                {destination.badge}
              </Pill>
            </div>
          )}

          {/* close button */}
          <button
            onClick={onClose}
            style={{
              position:      "absolute",
              top:           "16px",
              right:         "16px",
              width:         "36px",
              height:        "36px",
              borderRadius:  "50%",
              border:        "none",
              background:    "rgba(255,255,255,0.18)",
              backdropFilter:"blur(8px)",
              cursor:        "pointer",
              display:       "flex",
              alignItems:    "center",
              justifyContent:"center",
              color:         "#fff",
              transition:    "background 0.2s",
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.35)"}
            onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.18)"}
            aria-label="Close"
          >
            <X size={18} strokeWidth={2.5} />
          </button>

          {/* title + tag on image bottom */}
          <div style={{ position: "absolute", bottom: "20px", left: "24px", right: "24px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
              <span
                style={{
                  background:    "rgba(255,255,255,0.18)",
                  backdropFilter:"blur(6px)",
                  color:         "#fff",
                  padding:       "3px 10px",
                  borderRadius:  "999px",
                  fontSize:      "0.72rem",
                  fontWeight:    600,
                  display:       "flex",
                  alignItems:    "center",
                  gap:           "4px",
                }}
              >
                <Tag size={10} />
                {destination.tag}
              </span>
            </div>
            <h2
              style={{
                margin:      0,
                fontSize:    "1.75rem",
                fontWeight:  800,
                color:       "#fff",
                textShadow:  "0 2px 12px rgba(0,0,0,0.4)",
                lineHeight:  1.15,
              }}
            >
              {destination.name}
            </h2>
          </div>
        </div>

        {/* ── Body ── */}
        <div style={{ padding: "28px 30px 36px" }}>

          {/* Meta row */}
          <div
            style={{
              display:        "flex",
              alignItems:     "center",
              gap:            "16px",
              flexWrap:       "wrap",
              marginBottom:   "24px",
              paddingBottom:  "20px",
              borderBottom:   "1px solid #F3F4F6",
            }}
          >
            {destination.rating && (
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <Stars rating={destination.rating} />
                <span style={{ fontSize: "0.9rem", fontWeight: 700, color: "#111827" }}>
                  {destination.rating}
                </span>
                {destination.reviews && (
                  <span style={{ fontSize: "0.85rem", color: "#9CA3AF" }}>
                    ({destination.reviews} reviews)
                  </span>
                )}
              </div>
            )}

            {destination.price && (
              <div
                style={{
                  display:       "flex",
                  alignItems:    "center",
                  gap:           "5px",
                  background:    "#ECFDF5",
                  color:         "#059669",
                  padding:       "5px 12px",
                  borderRadius:  "10px",
                  fontSize:      "0.85rem",
                  fontWeight:    700,
                }}
              >
                <DollarSign size={13} strokeWidth={2.5} />
                {destination.price}
              </div>
            )}

            <div
              style={{
                display:      "flex",
                alignItems:   "center",
                gap:          "5px",
                color:        "#6B7280",
                fontSize:     "0.82rem",
              }}
            >
              <MapPin size={13} strokeWidth={2} />
              Sri Lanka
            </div>
          </div>

          {/* About section */}
          {destination.description && (
            <div style={{ marginBottom: "28px" }}>
              <div
                style={{
                  display:      "flex",
                  alignItems:   "center",
                  gap:          "7px",
                  marginBottom: "12px",
                }}
              >
                <Info size={15} strokeWidth={2} color="#00AA6C" />
                <h3
                  style={{
                    margin:     0,
                    fontSize:   "0.78rem",
                    fontWeight: 700,
                    color:      "#00AA6C",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                  }}
                >
                  About this destination
                </h3>
              </div>

              {/* Lead paragraph — larger */}
              {lead && (
                <p
                  style={{
                    fontSize:    "0.97rem",
                    lineHeight:  "1.75",
                    color:       "#374151",
                    fontWeight:  500,
                    margin:      "0 0 12px",
                  }}
                >
                  {lead}
                </p>
              )}

              {/* Rest — regular */}
              {rest && (
                <p
                  style={{
                    fontSize:   "0.875rem",
                    lineHeight: "1.75",
                    color:      "#6B7280",
                    margin:     0,
                  }}
                >
                  {rest}
                </p>
              )}
            </div>
          )}

          {/* Quick facts strip */}
          <div
            style={{
              display:       "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
              gap:           "12px",
              background:    "#F9FAFB",
              borderRadius:  "16px",
              padding:       "20px",
              marginBottom:  "24px",
            }}
          >
            {[
              { label: "Category",  value: destination.tag,    icon: <Tag size={14} strokeWidth={2} color="#00AA6C" /> },
              { label: "Rating",    value: destination.rating ? `${destination.rating} / 5` : "—", icon: <Star size={14} strokeWidth={0} fill="#00AA6C" /> },
              { label: "Reviews",   value: destination.reviews || "—", icon: <Users size={14} strokeWidth={2} color="#00AA6C" /> },
              { label: "Starting",  value: destination.price   || "Contact us", icon: <DollarSign size={14} strokeWidth={2} color="#00AA6C" /> },
            ].map(({ label, value, icon }) => (
              <div key={label}>
                <div
                  style={{
                    display:      "flex",
                    alignItems:   "center",
                    gap:          "5px",
                    fontSize:     "0.7rem",
                    fontWeight:   600,
                    color:        "#9CA3AF",
                    textTransform:"uppercase",
                    letterSpacing:"0.06em",
                    marginBottom: "4px",
                  }}
                >
                  {icon}
                  {label}
                </div>
                <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "#111827" }}>
                  {value}
                </div>
              </div>
            ))}
          </div>

          {/* CTA buttons */}
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <button
              style={{
                flex:          "1 1 160px",
                padding:       "14px 24px",
                borderRadius:  "12px",
                border:        "none",
                background:    "#00AA6C",
                color:         "#fff",
                fontSize:      "0.9rem",
                fontWeight:    700,
                cursor:        "pointer",
                transition:    "background 0.2s, transform 0.15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#009960";
                e.currentTarget.style.transform  = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#00AA6C";
                e.currentTarget.style.transform  = "translateY(0)";
              }}
            >
              Book This Destination
            </button>
            <button
              style={{
                flex:          "1 1 120px",
                padding:       "14px 24px",
                borderRadius:  "12px",
                border:        "2px solid #E5E7EB",
                background:    "#fff",
                color:         "#374151",
                fontSize:      "0.9rem",
                fontWeight:    600,
                cursor:        "pointer",
                transition:    "border-color 0.2s, color 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#00AA6C";
                e.currentTarget.style.color       = "#00AA6C";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#E5E7EB";
                e.currentTarget.style.color       = "#374151";
              }}
              onClick={onClose}
            >
              Keep Exploring
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationModal;