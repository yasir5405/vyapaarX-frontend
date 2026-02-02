import { useEffect, useState, useRef } from "react";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const HomePageCarousel = () => {
  const slides: string[] = [
    "/homeCarousel1.avif",
    "/homeCarousel2.avif",
    "/homeCarousel3.avif",
    "/homeCarousel4.avif",
    "/homeCarousel5.avif",
  ];

  const [index, setIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const timerRef = useRef<number | null>(null);
  const isTransitioningRef = useRef(false);

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
  return (
    <div className="w-full rounded-md md:rounded-2xl border-0 md:border-2 h-64 md:h-96 relative overflow-hidden">
      {/* Slides */}
      <div
        className={`flex h-full w-full ${isTransitioning ? "transition-transform duration-700 ease-in-out" : ""} `}
        style={{ transform: `translateX(-${index * 100}%)` }}
        onTransitionEnd={handleTransitionEnd}
      >
        {extendedSlides.map((slide, idx) => (
          <div key={idx} className="min-w-full relative">
            <img src={slide} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>

      {/* Buttons */}
      <Button
        variant={"ghost"}
        size={"icon"}
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
        variant={"ghost"}
        size={"icon"}
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
      <div className="absolute bottom-2 md:bottom-4 left-1/2 -translate-x-1/2 flex  gap-1.5 md:gap-2 bg-white/50 rounded-full py-1.5 px-1.5 md:py-2 md:px-2">
        {slides.map((_, idx) => {
          const realIndex = idx + 1;
          const isActive =
            index === realIndex ||
            (index === 0 && idx === slides.length - 1) ||
            (index === extendedSlides.length - 1 && idx === 0);

          return (
            <Button
              size={"icon-xs"}
              key={idx}
              onClick={() => {
                if (isTransitioningRef.current) return;
                isTransitioningRef.current = true;
                setIsTransitioning(true);
                setIndex(realIndex);
                resetTimer();
              }}
              className={`h-1.5 w-1.5 md:h-2 md:w-2 rounded-full ${isActive ? "bg-primary" : "bg-white"}`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default HomePageCarousel;
