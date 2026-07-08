import React, { useEffect, useState } from "react";
import { MapPin } from "lucide-react";

// --- CLIENT SIDE WRAPPER TO PREVENT SSR BREAKAGE & HANDLE CSS ---
const LeafletMapWrapper = ({ points, polylinePositions }) => {
  const [MapComponents, setMapComponents] = useState(null);

  useEffect(() => {
    // Dynamically import Leaflet modules only on the browser client
    Promise.all([
      import("leaflet"),
      import("react-leaflet"),
      import("leaflet/dist/leaflet.css")
    ]).then(([L, reactLeaflet]) => {
      setMapComponents({ L, ...reactLeaflet });
    }).catch((err) => {
      console.error("Failed to load Leaflet:", err);
    });
  }, []);

  // Performance Loader View while Leaflet assets load asynchronously
  if (!MapComponents) {
    return (
      <div className="w-full h-full bg-slate-50 flex flex-col items-center justify-center gap-2 text-gray-400 text-sm">
        <div className="w-6 h-6 border-2 border-sky-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="font-medium animate-pulse">Loading Map Layer...</p>
      </div>
    );
  }

  const { MapContainer, TileLayer, Marker, Polyline, Popup, useMap } = MapComponents;
  const L = MapComponents.L;

  // Internal Hook: Dynamically centers and scales the bounding viewport based on coordinates
  const ChangeMapView = () => {
    const map = useMap();
    useEffect(() => {
      if (points.length > 0) {
        const bounds = L.latLngBounds(points.map((p) => p.coords));
        map.fitBounds(bounds, { padding: [50, 50], maxZoom: 12 });
      }
    }, [map, points, L]); // Added dependencies
    return null;
  };

  // Custom DOM-based pin icon injecting Tailwind markers natively into Leaflet layers
  const createNumberedIcon = (number) => {
    return L.divIcon({
      html: `<div class="flex items-center justify-center w-7 h-7 bg-sky-600 border-2 border-white text-white rounded-full font-bold shadow-md text-xs">${number}</div>`,
      className: "custom-leaflet-icon",
      iconSize: [28, 28],
      iconAnchor: [14, 14],
    });
  };

  return (
    <div className="w-full h-full relative isolate">
      {/* Self-contained styling sheet injection overrides to force cross-origin grid alignment */}
      <style>{`
        .leaflet-container { font-family: inherit; }
        .leaflet-grab { cursor: grab !important; }
        .leaflet-dragging .leaflet-grab { cursor: grabbing !important; }
        .leaflet-popup-content-wrapper { border-radius: 0.5rem; padding: 2px; }
        .leaflet-popup-content { margin: 8px 12px; }
        .custom-leaflet-icon { background: transparent; border: none; }
      `}</style>

      <MapContainer
        center={[7.8731, 80.7718]} // Default Sri Lanka Center
        zoom={7.5}
        dragging={true}          // Enables hand cursor panning dragging
        zoomControl={true}       // Enables explicit UI zoom controllers (+ / -)
        scrollWheelZoom={false}  // Stops annoying accidental scrolling while reading page content
        doubleClickZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        {/* Beautiful, responsive Map Tile canvas */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          keepBuffer={12} // Performance tweak: Prefetches 12 adjacent grids for lag-free panning
          updateWhenZooming={false}
          updateWhenIdle={true}
        />

        {/* Dynamic focus logic */}
        <ChangeMapView />

        {/* Dynamic Route Polyline path */}
        {polylinePositions.length > 1 && (
          <Polyline
            positions={polylinePositions}
            pathOptions={{
              color: "#0284c7",
              weight: 3.5,
              dashArray: "6, 8",
              lineCap: "round",
            }}
          />
        )}

        {/* Pin Location Markers */}
        {points.map((p) => (
          <Marker
            key={`${p.name}-${p.order}`}
            position={p.coords}
            icon={createNumberedIcon(p.order)}
          >
            <Popup closeButton={false} offset={[0, -5]}>
              <div className="px-1 py-0.5 text-center">
                <p className="text-[10px] uppercase tracking-wider font-semibold text-sky-600">Stop {p.order}</p>
                <p className="text-xs font-bold text-slate-800 capitalize">{p.name}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

// --- MAIN INTERACTIVE MAP MODULE ---
const LOCATION_COORDS = {
  "colombo": [6.93, 79.85],
  "negombo": [7.21, 79.84],
  "kandy": [7.29, 80.63],
  "nuwara eliya": [6.97, 80.77],
  "ella": [6.87, 81.05],
  "yala": [6.37, 81.52],
  "yala national park": [6.37, 81.52],
  "udawalawe": [6.44, 80.90],
  "galle": [6.03, 80.22],
  "mirissa": [5.95, 80.46],
  "bentota": [6.42, 79.99],
  "hikkaduwa": [6.14, 80.10],
  "unawatuna": [6.01, 80.25],
  "weligama": [5.97, 80.43],
  "tangalle": [6.02, 80.79],
  "sigiriya": [7.96, 80.76],
  "dambulla": [7.86, 80.65],
  "anuradhapura": [8.31, 80.40],
  "polonnaruwa": [7.94, 81.00],
  "habarana": [8.03, 80.75],
  "trincomalee": [8.58, 81.23],
  "jaffna": [9.66, 80.02],
  "arugam bay": [6.85, 81.83],
  "batticaloa": [7.72, 81.70],
  "wilpattu": [8.45, 80.05],
  "wilpattu national park": [8.45, 80.05],
  "horton plains": [6.80, 80.80],
  "adam's peak": [6.81, 80.50],
  "kitulgala": [6.99, 80.42],
  "pinnawala": [7.30, 80.39],
  "matara": [5.95, 80.54],
  "dondra": [5.92, 80.60],
  "ratnapura": [6.68, 80.40],
  "kalutara": [6.58, 79.96],
  "mannar": [9.05, 79.75],
  "puttalam": [8.03, 79.83],
};

const resolveCoords = (name) => {
  const key = name.toLowerCase().trim();
  if (LOCATION_COORDS[key]) return LOCATION_COORDS[key];
  const match = Object.keys(LOCATION_COORDS).find(
    (k) => key.includes(k) || k.includes(key)
  );
  return match ? LOCATION_COORDS[match] : null;
};

const SriLankaMap = ({ locations = [] }) => {
  const points = locations
    .map((name, i) => {
      const coords = resolveCoords(name);
      return coords ? { name, coords, order: i + 1 } : null;
    })
    .filter(Boolean);

  const unresolved = locations.length - points.length;
  const polylinePositions = points.map((p) => p.coords);

  return (
    <div className="w-full max-w-4xl mx-auto p-2 sm:p-4">
      {/* Map Window Container */}
      <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm h-[480px] w-full relative z-0">
        <LeafletMapWrapper points={points} polylinePositions={polylinePositions} />
      </div>

      {/* Sequential Route Badge Legend */}
      <div className="flex flex-wrap gap-2 mt-4">
        {points.map((point) => (
          <div
            key={`${point.name}-${point.order}`}
            className="bg-white border border-slate-200 text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-xs capitalize"
          >
            <span className="w-4 h-4 rounded-full bg-sky-600 text-white text-[10px] font-bold flex items-center justify-center">
              {point.order}
            </span>
            {point.name}
          </div>
        ))}
      </div>

      {/* Exception Fallback notice */}
      {unresolved > 0 && (
        <p className="text-xs text-amber-500 font-medium mt-3 flex items-center gap-1.5 bg-amber-50 border border-amber-100 p-2 rounded-xl">
          <MapPin size={14} className="flex-shrink-0" />
          <span>
            {unresolved} out of {locations.length} stop(s) couldn't be plotted. Double-check your spelling array matching keys in <code>LOCATION_COORDS</code>.
          </span>
        </p>
      )}
    </div>
  );
};

export default SriLankaMap;