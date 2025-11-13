export default function MovieCard({ movie }) {
    return (
      <div className="flex flex-col w-full h-full rounded-lg shadow-lg overflow-hidden border border-border hover:shadow-xl transition-shadow">
        <img 
          src={movie.posterURL} 
          alt={movie.title}
          className="w-full h-64 object-cover shrink-0"
        />
        <div className="flex flex-col flex-1 p-4 min-h-0">
          <h3 className="text-lg font-semibold text-black mb-2 line-clamp-2">
            {movie.title}
          </h3>
          <p className="text-secondary text-sm mb-2 line-clamp-3">
            {movie.description} 
          </p>
          <div className="flex items-center justify-between mt-auto pt-2">
            <span className="text-black font-bold">
              ⭐ {movie.rating}
            </span>
            <button className="bg-accent text-black px-3 py-1 rounded text-sm hover:bg-blue-600 transition-colors">
              Watch
            </button>
          </div>
        </div>
      </div>
    );
  }