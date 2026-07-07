import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft, X, ChevronLeft, ChevronRight, Play,
  Camera, Video, Quote, MapPin,
} from "lucide-react";

/* ─────────────────────────────────────────────
   PLACEHOLDER DATA
   Drop your real files into public/assets/gallery/
   and public/assets/gallery/reviews/ using these
   same filenames — the page will pick them up
   automatically. Anything missing falls back to
   a labelled placeholder so nothing looks broken.
───────────────────────────────────────────── */
const PHOTOS = [
  { id: 1,  src: "/assets/gallery/photo-01.jpg", alt: "Sigiriya Lion Rock",       tour: "Grand Circle Tour" },
  { id: 2,  src: "/assets/gallery/photo-02.jpg", alt: "Minneriya elephant safari", tour: "Grand Circle Tour" },
  { id: 3,  src: "/assets/gallery/photo-03.jpg", alt: "Temple of the Tooth, Kandy", tour: "Cultural Triangle Express" },
  { id: 4,  src: "/assets/gallery/photo-04.jpg", alt: "Nuwara Eliya tea plantations", tour: "Grand Circle Tour" },
  { id: 5,  src: "/assets/gallery/photo-05.jpg", alt: "Nine Arch Bridge, Ella",     tour: "Grand Sri Lanka Explorer" },
  { id: 6,  src: "/assets/gallery/photo-06.jpg", alt: "Yala National Park leopard", tour: "Grand Sri Lanka Explorer" },
  { id: 7,  src: "/assets/gallery/photo-07.jpg", alt: "Galle Dutch Fort ramparts",  tour: "Grand Circle Tour" },
  { id: 8,  src: "/assets/gallery/photo-08.jpg", alt: "Bentota beach sunset",       tour: "Classic Sri Lanka & Bentota" },
  { id: 9,  src: "/assets/gallery/photo-09.jpg", alt: "Polonnaruwa ancient ruins",  tour: "Cultural Triangle Express" },
  { id: 10, src: "/assets/gallery/photo-10.jpg", alt: "Village cooking experience", tour: "Grand Circle Tour" },
  { id: 11, src: "/assets/gallery/photo-11.jpg", alt: "Ramboda waterfall viewpoint", tour: "Grand Sri Lanka Explorer" },
  { id: 12, src: "/assets/gallery/photo-12.jpg", alt: "Colombo city skyline",       tour: "Classic Sri Lanka & Bentota" },
];

const VIDEOS = [
  { id: 1, src: "/assets/gallery/reviews/review-01.mp4", poster: "/assets/gallery/reviews/review-01.jpg", name: "Traveller Review", tour: "Grand Circle Tour" },
  { id: 2, src: "/assets/gallery/reviews/review-02.mp4", poster: "/assets/gallery/reviews/review-02.jpg", name: "Traveller Review", tour: "Cultural Triangle Express" },
  { id: 3, src: "/assets/gallery/reviews/review-03.mp4", poster: "/assets/gallery/reviews/review-03.jpg", name: "Traveller Review", tour: "Grand Sri Lanka Explorer" },
  { id: 4, src: "/assets/gallery/reviews/review-04.mp4", poster: "/assets/gallery/reviews/review-04.jpg", name: "Traveller Review", tour: "Classic Sri Lanka & Bentota" },
];

const placeholderImg = (label) => `https://placehold.co/700x500/e0f2fe/0284c7?text=${encodeURIComponent(label)}`;

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
        <img
          src={photo.src} alt={photo.alt}
          className="w-full max-h-[75vh] object-contain rounded-xl mx-auto"
          onError={e => { e.target.src = placeholderImg(photo.alt); }}
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
        src={video.src} poster={video.poster} controls autoPlay
        className="w-full max-h-[75vh] rounded-xl bg-black"
        onError={e => { e.target.poster = placeholderImg(video.name); }}
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
  const [tab, setTab] = useState("photos"); // photos | videos
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [activeVideo, setActiveVideo] = useState(null);

  const nav = (dir) => {
    setLightboxIndex(i => {
      const next = (i + dir + PHOTOS.length) % PHOTOS.length;
      return next;
    });
  };

  return (
    <div className="font-sans bg-white text-gray-900 overflow-x-hidden">
      <section className="py-16 sm:py-20 px-4 sm:px-8 lg:px-12 bg-white">
        <div className="max-w-[1200px] mx-auto">

          <Link to="/"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-500 hover:text-primary-600
                       no-underline mb-6 transition-colors">
            <ArrowLeft size={14} strokeWidth={2} /> Back to Home
          </Link>

          {/* Header */}
          <div className="text-center mb-10">
            <span className="bg-primary-100 text-primary-600 px-3.5 py-1.5 rounded-full text-sm font-semibold">
              From Our Travellers
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 mt-4 mb-3">
              Tour Photos & Review Gallery
            </h1>
            <p className="text-gray-500 text-base max-w-lg mx-auto">
              A look at the moments our travellers have captured on the road, and a few words
              straight from them about their trip with Insi Tours.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex justify-center mb-10">
            <div className="flex gap-1 bg-gray-100 p-1 rounded-xl">
              <button onClick={() => setTab("photos")}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold border-none cursor-pointer font-sans transition-all duration-200
                  ${tab === "photos" ? "bg-white text-primary-600 shadow-sm" : "bg-transparent text-gray-500 hover:text-gray-700"}`}>
                <Camera size={14} strokeWidth={2} /> Photos
              </button>
              <button onClick={() => setTab("videos")}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold border-none cursor-pointer font-sans transition-all duration-200
                  ${tab === "videos" ? "bg-white text-primary-600 shadow-sm" : "bg-transparent text-gray-500 hover:text-gray-700"}`}>
                <Video size={14} strokeWidth={2} /> Review Videos
              </button>
            </div>
          </div>

          {/* Photo grid */}
          {tab === "photos" && (
            <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 [column-fill:_balance]">
              {PHOTOS.map((photo, i) => (
                <button
                  key={photo.id}
                  onClick={() => setLightboxIndex(i)}
                  className="block w-full mb-3 rounded-xl overflow-hidden border-none p-0 cursor-pointer bg-gray-100
                             break-inside-avoid group relative"
                >
                  <img
                    src={photo.src} alt={photo.alt}
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={e => { e.target.src = placeholderImg(photo.alt); }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent
                                  opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end p-3">
                    <span className="text-white text-xs font-semibold text-left">{photo.alt}</span>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Video grid */}
          {tab === "videos" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {VIDEOS.map(video => (
                <button
                  key={video.id}
                  onClick={() => setActiveVideo(video)}
                  className="rounded-2xl overflow-hidden border border-gray-100 bg-white cursor-pointer p-0
                             text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group"
                >
                  <div className="relative h-48 bg-gray-900">
                    <img
                      src={video.poster} alt={video.name}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity duration-200"
                      onError={e => { e.target.src = placeholderImg(video.name); }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center
                                      group-hover:scale-110 transition-transform duration-200">
                        <Play size={22} strokeWidth={2} className="text-primary-600 ml-0.5" fill="currentColor" />
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-3.5">
                    <div className="flex items-start gap-2">
                      <Quote size={14} strokeWidth={2} className="text-primary-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-bold text-gray-900">{video.name}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{video.tour}</p>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* CTA */}
          <div className="text-center mt-14">
            <p className="text-sm text-gray-500 mb-4">Ready to make some memories of your own?</p>
            <Link to="/booking"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary-500 text-white
                         text-sm font-semibold no-underline hover:bg-primary-600 transition-colors duration-200">
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