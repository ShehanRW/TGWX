import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft, X, ChevronLeft, ChevronRight, Play,
  Camera, Video, Quote, MapPin,
} from "lucide-react";
import Seo from "../components/common/Seo";

<Seo
  title="Insi Tours | Gallery"
  description="Browse our gallery of stunning photos and videos from our Sri Lankan tours. See the beauty of the country through our travelers' eyes."
  path="/gallery"
/>

/* ─────────────────────────────────────────────
   IMAGE PATHS
   Photos: public/assets/reviews/pic00001 … pic00023
   Videos: public/assets/reviews/vid00001 … vid00011
───────────────────────────────────────────── */
const generatePhotos = () => {
  const photos = [];
  const totalPhotos = 23;
  const tourNames = [
    "Grand Circle Tour",
    "Cultural Triangle Express",
    "Grand Sri Lanka Explorer",
    "Classic Sri Lanka & Bentota",
    "Wildlife Safari Adventure",
    "Hill Country Escape",
    "Beach & Culture Tour",
    "Heritage Discovery Tour"
  ];

  for (let i = 1; i <= totalPhotos; i++) {
    const num = String(i).padStart(5, '0');
    photos.push({
      id: i,
      base: `/assets/reviews/pic${num}`, // extension resolved at load time
      alt: `Travel photo ${i}`,
      tour: tourNames[i % tourNames.length],
    });
  }
  return photos;
};

const generateVideos = () => {
  const videos = [];
  const totalVideos = 11;
  const videoNames = [
    "Amazing Sri Lanka Experience",
    "Cultural Heritage Tour",
    "Wildlife Adventure",
    "Beach Paradise",
    "Hill Country Journey",
    "Temple & Culture Tour",
    "Wildlife Safari",
    "Historic Sites Tour",
    "Nature & Wildlife",
    "Cultural Immersion",
    "Grand Sri Lanka Tour"
  ];
  const tourNames = [
    "Grand Circle Tour",
    "Cultural Triangle Express",
    "Grand Sri Lanka Explorer",
    "Classic Sri Lanka & Bentota",
    "Wildlife Safari Adventure",
    "Hill Country Escape",
    "Beach & Culture Tour",
    "Heritage Discovery Tour"
  ];

  for (let i = 1; i <= totalVideos; i++) {
    const num = String(i).padStart(5, '0');
    videos.push({
      id: i,
      src: `/assets/reviews/vid${num}.mp4`,
      posterBase: `/assets/reviews/pic${num}`, // extension resolved at load time
      name: videoNames[i % videoNames.length],
      tour: tourNames[i % tourNames.length]
    });
  }
  return videos;
};

const PHOTOS = generatePhotos();
const VIDEOS = generateVideos();

const placeholderImg = (label) => `https://placehold.co/700x500/e0f2fe/0284c7?text=${encodeURIComponent(label)}`;

/* Extensions to try, in order, for any given photo "base" path */
const CANDIDATE_EXTENSIONS = ["jpg", "jpeg", "JPG", "JPEG", "png", "PNG", "webp", "WEBP"];

/* ─────────────────────────────────────────────
   SAFE IMAGE — tries each candidate extension in
   turn before falling back to a placeholder. This
   removes any dependency on knowing the exact
   extension the files were saved with.
───────────────────────────────────────────── */
const SafeImage = ({ base, alt, className, onClick, fallbackLabel }) => {
  const [extIndex, setExtIndex] = useState(0);
  const [failed, setFailed] = useState(false);

  const src = failed
    ? placeholderImg(fallbackLabel || alt)
    : `${base}.${CANDIDATE_EXTENSIONS[extIndex]}`;

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onClick={onClick}
      loading="lazy"
      onError={() => {
        if (extIndex < CANDIDATE_EXTENSIONS.length - 1) {
          setExtIndex((i) => i + 1);
        } else if (!failed) {
          console.warn(`Gallery image failed for all extensions: ${base}.*`);
          setFailed(true);
        }
      }}
    />
  );
};

/* ─────────────────────────────────────────────
   PHOTO LIGHTBOX
───────────────────────────────────────────── */
const PhotoLightbox = ({ photos, index, onClose, onNav }) => {
  const photo = photos[index];

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNav(1);
      if (e.key === "ArrowLeft") onNav(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onNav]);

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center px-4" onClick={onClose}>
      <button onClick={onClose}
        className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border-none
                   flex items-center justify-center cursor-pointer transition-colors">
        <X size={18} strokeWidth={2} className="text-white" />
      </button>

      <button onClick={e => { e.stopPropagation(); onNav(-1); }}
        className="absolute left-3 sm:left-6 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 border-none
                   flex items-center justify-center cursor-pointer transition-colors">
        <ChevronLeft size={22} strokeWidth={2} className="text-white" />
      </button>

      <div className="max-w-3xl w-full" onClick={e => e.stopPropagation()}>
        <SafeImage
          base={photo.base}
          alt={photo.alt}
          className="w-full max-h-[75vh] object-contain rounded-xl mx-auto"
        />
        <div className="text-center mt-4">
          <p className="text-white font-semibold text-sm">{photo.alt}</p>
          <p className="text-white/50 text-xs mt-1 flex items-center justify-center gap-1">
            <MapPin size={11} strokeWidth={2} /> {photo.tour}
          </p>
        </div>
      </div>

      <button onClick={e => { e.stopPropagation(); onNav(1); }}
        className="absolute right-3 sm:right-6 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 border-none
                   flex items-center justify-center cursor-pointer transition-colors">
        <ChevronRight size={22} strokeWidth={2} className="text-white" />
      </button>
    </div>
  );
};

/* ─────────────────────────────────────────────
   VIDEO MODAL
───────────────────────────────────────────── */
const VideoModal = ({ video, onClose }) => (
  <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center px-4" onClick={onClose}>
    <button onClick={onClose}
      className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border-none
                 flex items-center justify-center cursor-pointer transition-colors">
      <X size={18} strokeWidth={2} className="text-white" />
    </button>
    <div className="max-w-2xl w-full" onClick={e => e.stopPropagation()}>
      <video
        src={video.src}
        controls
        autoPlay
        className="w-full max-h-[75vh] rounded-xl bg-black"
        onError={() => console.warn(`Failed to load video: ${video.src}`)}
      />
      <div className="text-center mt-4">
        <p className="text-white font-semibold text-sm">{video.name}</p>
        <p className="text-white/50 text-xs mt-1 flex items-center justify-center gap-1">
          <MapPin size={11} strokeWidth={2} /> {video.tour}
        </p>
      </div>
    </div>
  </div>
);

/* ─────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────── */
const Gallery = () => {
  const [tab, setTab] = useState("photos");
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [activeVideo, setActiveVideo] = useState(null);

  const nav = (dir) => {
    setLightboxIndex(i => {
      const next = (i + dir + PHOTOS.length) % PHOTOS.length;
      return next;
    });
  };

  return (
    <div className="font-sans bg-white text-gray-900 overflow-x-hidden min-h-screen">
      <section className="pt-24 sm:pt-28 lg:pt-32 pb-10 sm:pb-16 px-4 sm:px-6 lg:px-12 bg-white">
        <div className="max-w-[1200px] mx-auto">

          <Link to="/"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-500 hover:text-primary-600
                       no-underline mb-6 transition-colors">
            <ArrowLeft size={14} strokeWidth={2} /> Back to Home
          </Link>

          {/* Header */}
          <div className="text-center mb-8 sm:mb-10">
            <span className="bg-primary-100 text-primary-600 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-[10px] sm:text-sm font-semibold">
              From Our Travellers
            </span>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-gray-900 mt-3 sm:mt-4 mb-2 sm:mb-3">
              Tour Photos & Review Gallery
            </h1>
            <p className="text-xs sm:text-sm lg:text-base text-gray-500 max-w-lg mx-auto px-2">
              A look at the moments our travellers have captured on the road, and a few words
              straight from them about their trip with Insi Tours.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex justify-center mb-8 sm:mb-10">
            <div className="flex gap-1 bg-gray-100 p-1 rounded-xl">
              <button onClick={() => setTab("photos")}
                className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg text-[11px] sm:text-sm font-semibold border-none cursor-pointer font-sans transition-all duration-200 min-h-[40px] sm:min-h-[44px]
                  ${tab === "photos" ? "bg-white text-primary-600 shadow-sm" : "bg-transparent text-gray-500 hover:text-gray-700"}`}>
                <Camera size={14} strokeWidth={2} /> Photos ({PHOTOS.length})
              </button>
              <button onClick={() => setTab("videos")}
                className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg text-[11px] sm:text-sm font-semibold border-none cursor-pointer font-sans transition-all duration-200 min-h-[40px] sm:min-h-[44px]
                  ${tab === "videos" ? "bg-white text-primary-600 shadow-sm" : "bg-transparent text-gray-500 hover:text-gray-700"}`}>
                <Video size={14} strokeWidth={2} /> Videos ({VIDEOS.length})
              </button>
            </div>
          </div>

          {/* Photo grid */}
          {tab === "photos" && (
            <div className="columns-2 sm:columns-3 lg:columns-4 gap-2 sm:gap-3 [column-fill:_balance]">
              {PHOTOS.map((photo, i) => (
                <button
                  key={photo.id}
                  onClick={() => setLightboxIndex(i)}
                  className="block w-full mb-2 sm:mb-3 rounded-xl overflow-hidden border-none p-0 cursor-pointer bg-gray-100
                             break-inside-avoid group relative"
                >
                  <SafeImage
                    base={photo.base}
                    alt={photo.alt}
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent
                                  opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end p-2 sm:p-3">
                    <span className="text-white text-[10px] sm:text-xs font-semibold text-left line-clamp-2">
                      {photo.alt}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Video grid */}
          {tab === "videos" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {VIDEOS.map(video => (
                <button
                  key={video.id}
                  onClick={() => setActiveVideo(video)}
                  className="rounded-2xl overflow-hidden border border-gray-100 bg-white cursor-pointer p-0
                             text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group"
                >
                  <div className="relative h-48 sm:h-52 bg-gray-900">
                    <SafeImage
                      base={video.posterBase}
                      alt={video.name}
                      fallbackLabel={video.name}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity duration-200"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/90 flex items-center justify-center
                                      group-hover:scale-110 transition-transform duration-200">
                        <Play size={20} strokeWidth={2} className="text-primary-600 ml-0.5" fill="currentColor" />
                      </div>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3">
                      <span className="bg-black/50 backdrop-blur-sm text-white text-[10px] sm:text-xs px-2 py-1 rounded-full">
                        {video.name}
                      </span>
                    </div>
                  </div>
                  <div className="px-3 sm:px-4 py-3 sm:py-3.5">
                    <div className="flex items-start gap-1.5 sm:gap-2">
                      <Quote size={14} strokeWidth={2} className="text-primary-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs sm:text-sm font-bold text-gray-900 line-clamp-1">{video.name}</p>
                        <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5">{video.tour}</p>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 sm:mt-16">
            <div className="bg-primary-50 rounded-2xl p-4 sm:p-6 text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-primary-600">{PHOTOS.length}</div>
              <div className="text-[10px] sm:text-xs text-gray-500 mt-1">Photos</div>
            </div>
            <div className="bg-primary-50 rounded-2xl p-4 sm:p-6 text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-primary-600">{VIDEOS.length}</div>
              <div className="text-[10px] sm:text-xs text-gray-500 mt-1">Videos</div>
            </div>
            <div className="bg-primary-50 rounded-2xl p-4 sm:p-6 text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-primary-600">8+</div>
              <div className="text-[10px] sm:text-xs text-gray-500 mt-1">Tour Packages</div>
            </div>
            <div className="bg-primary-50 rounded-2xl p-4 sm:p-6 text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-primary-600">5★</div>
              <div className="text-[10px] sm:text-xs text-gray-500 mt-1">Average Rating</div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-10 sm:mt-14">
            <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">Ready to make some memories of your own?</p>
            <Link to="/booking"
              className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg bg-primary-500 text-white
                         text-xs sm:text-sm font-semibold no-underline hover:bg-primary-600 transition-colors duration-200 min-h-[44px]">
              Book Your Tour
            </Link>
          </div>

        </div>
      </section>

      {lightboxIndex !== null && (
        <PhotoLightbox
          photos={PHOTOS}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNav={nav}
        />
      )}

      {activeVideo && (
        <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />
      )}
    </div>
  );
};

export default Gallery;