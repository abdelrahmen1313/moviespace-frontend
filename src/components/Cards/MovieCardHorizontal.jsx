import ReactStars from 'react-stars'
import { Link } from 'react-router-dom';


export default function MovieCardHorizontal({ movie, isTelevision = false }) {
    if (!movie) {
        return null;
    }

    return (
        <Link to={`/movie/${movie.id}`}>
            <article className={`glass-card flex flex-col md:flex-row w-full rounded-lg border border-border
     shadow-lg overflow-hidden hover:shadow-xl transition-shadow bg-transparant mb-3 ${isTelevision ? 'focusable' : ''}`}
            >

                <div className="md:w-48  lg:w-56 xl:w-64  aspect-auto">
                    <img
                        src={movie.posterURL}
                        alt={movie.title}
                        height={480}
                        width={320}
                        className={window.screen.availWidth > 768 ? "w-full h-48 md:h-56 lg:h-64 xl:h-72 object-cover object-center" : "h-1/2"}
                    />
                </div>

                <div className="flex flex-col flex-1 p-4 gap-3">
                    <header className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                        <h3 className="text-xl font-semibold text-black line-clamp-2">
                            {movie.title}
                        </h3>

                    </header>

                    <p className="text-secondary text-sm leading-relaxed line-clamp-3 md:line-clamp-4">
                        {movie.description}
                    </p>


                    <div className='sm:flex flex-row spacing-2 items-center mt-auto  center md:hidden'>


                        <ReactStars
                            count={5}
                            value={Number(movie.rating)}
                            size={24}
                            color1="#e4e5e9"
                            color2="#ffd700"
                            edit={false}
                        />
                        &nbsp;
                        <p className='hidden md:flex'>{movie.rating}</p>

                    </div>

                    <footer className="sm:flex md:flex flex-row mt-auto justify-between  gap-3 border-t  ">
                        <div className='mt-2 space-x-2.5 flex flex-row'>

                            <button
                                className={`bg-accent text-black px-4 py-2 rounded text-sm font-medium hover:bg-blue-600 transition-colors ${isTelevision ? 'focusable' : ''}`}
                                tabIndex={isTelevision ? 0 : -1}
                            >
                                Watch
                            </button>
                            <button
                                className={`text-sm text-secondary underline-offset-4 hover:underline transition-colors ${isTelevision ? 'focusable' : ''}`}
                                tabIndex={isTelevision ? 0 : -1}
                            >
                                Add to Watchlist
                            </button>
                        </div>
                        <div className='hidden md:flex flex-row spacing-2 items-center mt-auto  center '>


                            <ReactStars
                                count={5}
                                value={Number(movie.rating)}
                                size={24}
                                color1="#e4e5e9"
                                color2="#ffd700"
                                edit={false}
                            />
                            &nbsp;

                        </div>




                    </footer>
                </div>
            </article>
        </Link>

    );
}