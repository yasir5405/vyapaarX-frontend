import React, { useEffect, useState, useRef } from "react";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface HomePageCarouselProps {
  desktop: string;
  mobile: string;
}

const HomePageCarousel = () => {
  const slides: HomePageCarouselProps[] = [
    {
      desktop: "/homeCarousel1.avif",
      mobile:
        "https://assets.myntassets.com/f_webp,dpr_1.5,q_auto:eco,w_299,c_limit,fl_progressive/w_299,h_274,q_50,dpr_3,fl_progressive,f_webp/assets/images/2026/FEBRUARY/2/LKjohbgJ_c4b8ab9c253d4b3e82af502bd50c0d12.png",
    },
    {
      desktop: "/homeCarousel2.avif",
      mobile:
        "https://assets.myntassets.com/f_webp,dpr_1.5,q_auto:eco,w_299,c_limit,fl_progressive/w_299,h_274,q_50,dpr_3,fl_progressive,f_webp/assets/images/2026/JANUARY/30/FuRi40j7_d10ac7de1061483497f094975b33d0cd.png",
    },
    {
      desktop: "/homeCarousel3.avif",
      mobile:
        "https://assets.myntassets.com/f_webp,dpr_1.5,q_auto:eco,w_299,c_limit,fl_progressive/w_299,h_274,q_50,dpr_3,fl_progressive,f_webp/assets/images/2026/JANUARY/31/q9DIXf2x_cc881cb62a674a11993c124630b11bf6.jpg",
    },
    {
      desktop: "/homeCarousel4.avif",
      mobile:
        "https://assets.myntassets.com/f_webp,dpr_1.5,q_auto:eco,w_299,c_limit,fl_progressive/w_299,h_274,q_50,dpr_3,fl_progressive,f_webp/assets/images/2026/JANUARY/30/PK4kaNpH_cf7277a85c7e4f6cba4b2ff8b801d325.png",
    },
    {
      desktop: "/homeCarousel5.avif",
      mobile:
        "https://assets.myntassets.com/f_webp,dpr_1.5,q_auto:eco,w_299,c_limit,fl_progressive/w_299,h_274,q_50,dpr_3,fl_progressive,f_webp/assets/images/2026/FEBRUARY/2/JeXL4GEs_5de3114c45f046f48afc5849c715a094.png",
    },
  ];

  const [index, setIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const timerRef = useRef<number | null>(null);
  const isTransitioningRef = useRef(false);

  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const touchEndX = useRef<number | null>(null);

  const SWIPE_THRESHOLD = 50;

  const extendedSlides = [slides[slides.length - 1], ...slides, slides[0]];

  const resetTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    timerRef.current = setInterval(() => {
      if (isTransitioningRef.current) return;
      isTransitioningRef.current = true;
      setIsTransitioning(true);
      setIndex((prev) => prev + 1);
    }, 4000);
  };

  useEffect(() => {
    resetTimer();

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        // Tab became visible - reset transition state
        isTransitioningRef.current = false;

        // If we're on a clone slide, jump to the real slide
        if (index === 0) {
          setIsTransitioning(false);
          setIndex(slides.length);
        } else if (index === extendedSlides.length - 1) {
          setIsTransitioning(false);
          setIndex(1);
        }

        resetTimer();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [index, slides.length, extendedSlides.length]);

  const handleTransitionEnd = () => {
    if (index === extendedSlides.length - 1) {
      setIsTransitioning(false);
      setIndex(1);
    }

    if (index === 0) {
      setIsTransitioning(false);
      setIndex(slides.length);
    }

    isTransitioningRef.current = false;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;

    touchEndX.current = e.touches[0].clientX;
  };

  const resetTouch = () => {
    touchStartX.current = null;
    touchStartY.current = null;
    touchEndX.current = null;
  };

  const handleTouchEnd = () => {
    if (
      touchStartX.current === null ||
      touchEndX.current === null ||
      isTransitioningRef.current
    ) {
      resetTouch();
      return;
    }

    const diff = touchStartX.current - touchEndX.current;

    if (Math.abs(diff) > SWIPE_THRESHOLD) {
      isTransitioningRef.current = true;
      setIsTransitioning(true);

      setIndex((prev) => (diff > 0 ? prev + 1 : prev - 1));
      resetTimer();
    }

    resetTouch();
  };

  return (
    <div className="w-full">
      {/* MOBILE WRAPPER (only active below md) */}
      <div className="md:hidden">
        <div className="px-3">
          <div
            className="
          relative
          overflow-hidden
          rounded-xl
          aspect-299/274
          bg-muted
        "
          >
            {/* Slides */}
            <div
              className={`flex h-full w-full will-change-transform ${
                isTransitioning
                  ? "transition-transform duration-700 ease-in-out"
                  : ""
              }`}
              style={{ transform: `translateX(-${index * 100}%)` }}
              onTransitionEnd={handleTransitionEnd}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {extendedSlides.map((slide, idx) => (
                <div key={idx} className="min-w-full shrink-0 relative">
                  <img
                    src={slide.mobile}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              ))}
            </div>

            {/* Dots */}
            <div
              className="
            absolute
            bottom-3
            left-1/2
            -translate-x-1/2
            flex gap-2
            bg-black/30
            backdrop-blur
            rounded-full
            px-3 py-1.5
          "
            >
              {slides.map((_, idx) => {
                const realIndex = idx + 1;
                const isActive =
                  index === realIndex ||
                  (index === 0 && idx === slides.length - 1) ||
                  (index === extendedSlides.length - 1 && idx === 0);

                return (
                  <button
                    key={idx}
                    onClick={() => {
                      if (isTransitioningRef.current) return;
                      isTransitioningRef.current = true;
                      setIsTransitioning(true);
                      setIndex(realIndex);
                      resetTimer();
                    }}
                    className={`h-1.5 w-1.5 rounded-full ${
                      isActive ? "bg-white" : "bg-white/50"
                    }`}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* DESKTOP VERSION (UNCHANGED) */}
      <div className="hidden md:block">
        <div className="w-full rounded-md md:rounded-2xl border-0 md:border-2 aspect-video md:h-96 relative overflow-hidden">
          <div
            className={`flex h-full w-full ${
              isTransitioning
                ? "transition-transform duration-700 ease-in-out"
                : ""
            }`}
            style={{ transform: `translateX(-${index * 100}%)` }}
            onTransitionEnd={handleTransitionEnd}
          >
            {extendedSlides.map((slide, idx) => (
              <div key={idx} className="min-w-full relative">
                <img
                  src={slide.desktop}
                  className="w-full h-full object-cover object-center"
                />
              </div>
            ))}
          </div>

          {/* Buttons (desktop only) */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              if (isTransitioningRef.current) return;
              isTransitioningRef.current = true;
              setIsTransitioning(true);
              setIndex((prev) => prev - 1);
              resetTimer();
            }}
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 rounded-full bg-white w-8 h-8 md:w-10 md:h-10"
          >
            <ChevronLeft className="w-4 h-4 md:w-6 md:h-6" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              if (isTransitioningRef.current) return;
              isTransitioningRef.current = true;
              setIsTransitioning(true);
              setIndex((prev) => prev + 1);
              resetTimer();
            }}
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 rounded-full bg-white w-8 h-8 md:w-10 md:h-10"
          >
            <ChevronRight className="w-4 h-4 md:w-6 md:h-6" />
          </Button>

          {/* Dots */}
          <div
            className="
            absolute
            bottom-3
            left-1/2
            -translate-x-1/2
            flex gap-2
            bg-black/30
            backdrop-blur
            rounded-full
            px-3 py-1.5
          "
          >
            {slides.map((_, idx) => {
              const realIndex = idx + 1;
              const isActive =
                index === realIndex ||
                (index === 0 && idx === slides.length - 1) ||
                (index === extendedSlides.length - 1 && idx === 0);

              return (
                <button
                  key={idx}
                  onClick={() => {
                    if (isTransitioningRef.current) return;
                    isTransitioningRef.current = true;
                    setIsTransitioning(true);
                    setIndex(realIndex);
                    resetTimer();
                  }}
                  className={`h-1.5 w-1.5 rounded-full ${
                    isActive ? "bg-white" : "bg-white/50"
                  }`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePageCarousel;
