const AnimationStyles = () => (
  <style>{`
    /* Base hidden state - slide up animation */
    .animate-on-scroll {
      opacity: 0;
      transform: translateY(28px);
      transition: opacity 0.55s cubic-bezier(.4,0,.2,1), transform 0.55s cubic-bezier(.4,0,.2,1);
    }
    
    /* Visible state */
    .animate-on-scroll.animate-visible {
      opacity: 1;
      transform: translateY(0);
    }
    
    /* Stagger delays for grid children */
    .animate-stagger > *:nth-child(1) { transition-delay: 0ms; }
    .animate-stagger > *:nth-child(2) { transition-delay: 80ms; }
    .animate-stagger > *:nth-child(3) { transition-delay: 160ms; }
    .animate-stagger > *:nth-child(4) { transition-delay: 240ms; }
    .animate-stagger > *:nth-child(5) { transition-delay: 320ms; }
    .animate-stagger > *:nth-child(6) { transition-delay: 400ms; }
    .animate-stagger > *:nth-child(7) { transition-delay: 480ms; }
    .animate-stagger > *:nth-child(8) { transition-delay: 560ms; }
    .animate-stagger > *:nth-child(9) { transition-delay: 640ms; }
    .animate-stagger > *:nth-child(10) { transition-delay: 720ms; }

    /* Fade in only (no slide) */
    .animate-fade {
      opacity: 0;
      transition: opacity 0.6s ease;
    }
    .animate-fade.animate-visible {
      opacity: 1;
    }

    /* Slide from left */
    .animate-left {
      opacity: 0;
      transform: translateX(-32px);
      transition: opacity 0.55s cubic-bezier(.4,0,.2,1), transform 0.55s cubic-bezier(.4,0,.2,1);
    }
    .animate-left.animate-visible {
      opacity: 1;
      transform: translateX(0);
    }

    /* Slide from right */
    .animate-right {
      opacity: 0;
      transform: translateX(32px);
      transition: opacity 0.55s cubic-bezier(.4,0,.2,1), transform 0.55s cubic-bezier(.4,0,.2,1);
    }
    .animate-right.animate-visible {
      opacity: 1;
      transform: translateX(0);
    }

    /* Scale animation */
    .animate-scale {
      opacity: 0;
      transform: scale(0.9);
      transition: opacity 0.5s cubic-bezier(.4,0,.2,1), transform 0.5s cubic-bezier(.4,0,.2,1);
    }
    .animate-scale.animate-visible {
      opacity: 1;
      transform: scale(1);
    }

    /* Hide scrollbar on review carousel */
    .reviews-scroll::-webkit-scrollbar { 
      display: none; 
    }
    .reviews-scroll {
      scrollbar-width: none;
      -ms-overflow-style: none;
    }

    /* Smooth scroll behavior */
    .smooth-scroll {
      scroll-behavior: smooth;
    }

    /* Line clamp utilities */
    .line-clamp-2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    
    .line-clamp-3 {
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    
    .line-clamp-4 {
      display: -webkit-box;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  `}</style>
);

export default AnimationStyles;