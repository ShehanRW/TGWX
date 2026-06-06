import React, { useState } from "react";
import { Tag, Star } from "lucide-react";
import destinationsData from "../data/destinations.json";
import DestinationModal from "../components/DestinationModal";

const Stars = ({ rating, size = 14 }) => {
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

const CATEGORIES = ["All", "Beach", "Cultural", "Heritage", "Adventure", "City", "Hill Station", "Mountains"];

function Destinations() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selected, setSelected] = useState(null);

  const filtered =
    activeCategory === "All"
      ? destinationsData
      : destinationsData.filter((d) => d.tag === activeCategory);

  return (
    <div style={{ padding: "120px 60px 60px" }}>

      {/* Modal */}
      <DestinationModal
        destination={selected}
        onClose={() => setSelected(null)}
      />

      {/* Header */}
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ fontSize: "2.2rem", fontWeight: 800, color: "#111827", marginBottom: "8px" }}>
          Popular Destinations
        </h1>
        <p style={{ color: "#6B7280", fontSize: "1rem" }}>
          Explore the best of Sri Lanka — from ancient heritage to pristine beaches.
        </p>
      </div>

      {/* Category Filter */}
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "32px" }}>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: "8px 18px",
              borderRadius: "999px",
              border: "1.5px solid",
              borderColor: activeCategory === cat ? "#00AA6C" : "#E5E7EB",
              background: activeCategory === cat ? "#00AA6C" : "#fff",
              color: activeCategory === cat ? "#fff" : "#374151",
              fontWeight: 500,
              fontSize: "0.85rem",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "24px",
        }}
      >
        {filtered.map((card) => (
          <div
            key={card.id}
            onClick={() => setSelected(card)}
            style={{
              borderRadius: "16px",
              overflow: "hidden",
              boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
              background: "#fff",
              transition: "transform 0.2s, box-shadow 0.2s",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-6px)";
              e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.13)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.08)";
            }}
          >
            {/* Image */}
            <div style={{ position: "relative", overflow: "hidden" }}>
              <img
                src={card.img}
                alt={card.name}
                style={{ width: "100%", height: "200px", objectFit: "cover", display: "block" }}
                onError={(e) => {
                  e.target.src = "https://placehold.co/600x400?text=" + encodeURIComponent(card.name);
                }}
              />
              {card.badge && card.badgeColor && (
                <span
                  style={{
                    position: "absolute",
                    top: "12px",
                    left: "12px",
                    background: card.badgeColor.bg,
                    color: card.badgeColor.color,
                    padding: "4px 10px",
                    borderRadius: "999px",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                  }}
                >
                  {card.badge}
                </span>
              )}
              <span
                style={{
                  position: "absolute",
                  bottom: "12px",
                  right: "12px",
                  background: "rgba(255,255,255,0.92)",
                  color: "#374151",
                  padding: "4px 10px",
                  borderRadius: "999px",
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <Tag size={11} />
                {card.tag}
              </span>
            </div>

            {/* Content */}
            <div style={{ padding: "16px 18px 20px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: "8px",
                }}
              >
                <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#111827", margin: 0 }}>
                  {card.name}
                </h3>
                {card.price && (
                  <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "#00AA6C", whiteSpace: "nowrap", marginLeft: "8px" }}>
                    {card.price}
                  </span>
                )}
              </div>

              {card.rating && (
                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "10px" }}>
                  <Stars rating={card.rating} />
                  <span style={{ fontSize: "0.82rem", fontWeight: 600, color: "#111827" }}>{card.rating}</span>
                  {card.reviews && (
                    <span style={{ fontSize: "0.82rem", color: "#9CA3AF" }}>({card.reviews})</span>
                  )}
                </div>
              )}

              <p
                style={{
                  fontSize: "0.83rem",
                  color: "#6B7280",
                  lineHeight: "1.55",
                  margin: 0,
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {card.description}
              </p>

              <div
                style={{
                  marginTop: "12px",
                  fontSize: "0.78rem",
                  fontWeight: 600,
                  color: "#00AA6C",
                }}
              >
                View details →
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Destinations;