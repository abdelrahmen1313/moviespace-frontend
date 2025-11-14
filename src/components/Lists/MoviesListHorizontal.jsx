import React from 'react'
import MovieCardHorizontal from '../Cards/MovieCardHorizontal';

const MoviesListHorizontal = ({filteredMovies, movieCardRefs, isTelevision, setFocusedMovieIndex}) => {
  return (
    <>
     {filteredMovies.map((film, idx) => (
          <div
            key={idx}
            ref={(el) => {
              movieCardRefs.current[idx] = el;
            }}
            tabIndex={isTelevision ? 0 : -1}
            onFocus={() => {
              if (isTelevision) setFocusedMovieIndex(idx);
            }}
            onBlur={() => {
              if (!isTelevision) return;
              // Only clear focus index if moving to another movie card
              setTimeout(() => {
                if (!movieCardRefs.current.some(ref => ref === document.activeElement)) {
                  setFocusedMovieIndex(-1);
                }
              }, 100);
            }}
            className={isTelevision ? 'focusable' : ''}
          >
            <MovieCardHorizontal movie={film} isTelevision={isTelevision} />
          </div>
        ))}
    </>
  )
}

export default MoviesListHorizontal