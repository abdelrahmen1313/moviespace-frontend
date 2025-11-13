import React from 'react'
import MovieCardHorizontal from './Cards/MovieCardHorizontal'

const MoviesList = ({movies, title="All Movies"}) => {
    if (!movies || movies.length < 1) {
        console.log("no movies")
        return null
    }
  return (
    <div className="container mx-auto px-4 py-8">
     <h3>{title}</h3>
     {movies.map((movie, idx) => {
       <MovieCardHorizontal movie={movie} key={idx} />
     })}

    </div>
  )
}

export default MoviesList