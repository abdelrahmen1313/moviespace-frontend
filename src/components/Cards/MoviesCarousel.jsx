// components/MovieCarousel.jsx
import { useState, useRef } from 'react';
import MovieCard from './MovieCard';

export default function MovieCarousel({ movies, title = "Top Rated Movies" }) {
  const scrollContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = container.clientWidth * 0.8;
    const newScrollLeft = container.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
    
    container.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth'
    });
  };

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;
    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
  };

  return (
    <section className="bg-primary py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-primary">
            {title}
          </h2>
          
          {/* Navigation Arrows - Desktop */}
          <div className="hidden md:flex space-x-2">
            <button
              onClick={() => scroll('left')}
              className={`p-3 rounded-full bg-secondary border border-border text-primary hover:bg-accent hover:text-white transition-all duration-300 ${
                !showLeftArrow ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
              }`}
              disabled={!showLeftArrow}
            >
              ←
            </button>
            <button
              onClick={() => scroll('right')}
              className={`p-3 rounded-full bg-secondary border border-border text-primary hover:bg-accent hover:text-white transition-all duration-300 ${
                !showRightArrow ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
              }`}
              disabled={!showRightArrow}
            >
              →
            </button>
          </div>
        </div>

        {/* Scroll Container */}
        <div className="relative">
          {/* Left Gradient Overlay */}
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-linear-to-r from-bg-black to-transparent z-10 pointer-events-none" />
          
          {/* Scroll Container */}
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex space-x-4 overflow-x-auto scrollbar-hide py-4 px-2 scroll-smooth items-stretch"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          >
            {movies.map((movie, index) => (
              <div
                key={movie.id}
                className="flex-none transition-transform duration-300 hover:scale-105 h-full"
                style={{
                  width: 'clamp(320px, 30vw, 320px)',
                  minWidth: '320px',
                  height: '100%'
                }}
              >
                <MovieCard movie={movie} index={index} />
              </div>
            ))}
          </div>

          {/* Right Gradient Overlay */}
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-linear-to-l from-bg-primary to-transparent z-10 pointer-events-none" />

          {/* Mobile Navigation Dots */}
          <div className="flex justify-center space-x-2 mt-6 md:hidden">
            {movies.map((_, index) => (
              <button
                key={index}
                className="w-2 h-2 rounded-full bg-border transition-all duration-300"
                onClick={() => {
                  const container = scrollContainerRef.current;
                  if (container) {
                    const scrollAmount = container.clientWidth * index;
                    container.scrollTo({ left: scrollAmount, behavior: 'smooth' });
                  }
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}