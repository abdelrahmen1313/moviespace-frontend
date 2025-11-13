import MovieCard from "../Cards/MovieCard";
import { useState } from "react";

export default function MovieGrid({movies, title="All Movies"}) {
  
    return (
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-primary mb-8">{title}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
          {movies.map((movie, idx) => (
            <MovieCard key={idx} movie={movie} />
          ))}
        </div>
      </div>
    );
  }