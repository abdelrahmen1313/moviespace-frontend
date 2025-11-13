/**
 * Example MovieCard Component
 * This demonstrates how to use the color palette across components
 */

import React from 'react';

export default function MovieCard({ title, rating, genres, description }) {
    // Determine rating color classes based on value
    const getRatingClasses = (rating) => {
        if (rating >= 7) return 'bg-rating-high/20 text-rating-high';
        if (rating >= 5) return 'bg-rating-medium/20 text-rating-medium';
        return 'bg-rating-low/20 text-rating-low';
    };

    // Map genre names to color classes
    const getGenreClasses = (genre) => {
        const genreMap = {
            action: 'bg-genre-action/20 text-genre-action',
            drama: 'bg-genre-drama/20 text-genre-drama',
            comedy: 'bg-genre-comedy/20 text-genre-comedy',
            horror: 'bg-genre-horror/20 text-genre-horror',
            'sci-fi': 'bg-genre-sciFi/20 text-genre-sciFi',
            scifi: 'bg-genre-sciFi/20 text-genre-sciFi',
        };
        return genreMap[genre.toLowerCase()] || 'bg-genre-action/20 text-genre-action';
    };

    return (
        <div className="bg-bg-card border border-border rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
            {/* Movie Poster Placeholder */}
            <div className="w-full h-64 bg-bg-tertiary rounded-lg mb-4 flex items-center justify-center">
                <span className="text-text-tertiary">Poster Image</span>
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-text-primary mb-2">
                {title}
            </h3>

            {/* Description */}
            <p className="text-text-secondary text-sm mb-4 line-clamp-2">
                {description}
            </p>

            {/* Rating Badge */}
            <div className="mb-4">
                <span className={`px-3 py-1 rounded-full ${getRatingClasses(rating)} text-sm font-semibold`}>
                    ⭐ {rating}/10
                </span>
            </div>

            {/* Genre Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
                {genres.map((genre, index) => (
                    <span
                        key={index}
                        className={`px-3 py-1 rounded-full ${getGenreClasses(genre)} text-xs font-medium`}
                    >
                        {genre}
                    </span>
                ))}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
                <button className="flex-1 px-4 py-2 rounded-lg bg-accent text-text-inverse hover:bg-accent-hover transition-colors font-medium">
                    View Details
                </button>
                <button className="px-4 py-2 rounded-lg border border-border text-text-primary hover:bg-bg-secondary transition-colors">
                    ⭐
                </button>
            </div>
        </div>
    );
}

// Usage example:
// <MovieCard
//     title="Interstellar"
//     rating={8.6}
//     genres={["Sci-Fi", "Drama"]}
//     description="A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival."
// />

