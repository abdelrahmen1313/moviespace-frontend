import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from "./theme/ThemeContext";
import { useTelevision } from "./television/TelevisionContext";
import MovieGrid from './components/Sections/MovieGrid';
import { films, TopRatedMovies } from './data/films';
import MovieCarousel from './components/Cards/MoviesCarousel';
import MoviesList from './components/MoviesList';
import MovieCardHorizontal from './components/Cards/MovieCardHorizontal';
import MovieCard from './components/Cards/MovieCard';
import Modal from './components/Modal';
import ReactStars from 'react-stars';
import { Circle, CircleCheckBig, ChevronDown, ChevronUp } from 'lucide-react';

const ratingFilters = [
  { minValue: 2, starValue: 1 },
  { minValue: 4, starValue: 2 },
  { minValue: 6, starValue: 3 },
  { minValue: 8, starValue: 4 },

]

export default function App() {
  const { theme, toggle } = useTheme();
  const { isTelevision } = useTelevision();
  const [username, setUsername] = useState(() => {
    if (window.localStorage.getItem("username")) {
      return window.localStorage.getItem("username")
    }
    return ""
  });
  const [usernameSet, setUsernameSet] = useState(username != "")
  const [showWelcome, setShowWelcome] = useState(true);
  const [fadeUpWelcome, setFadeUpWelcome] = useState(false);
  const [showInput, setShowInput] = useState(false);

  const [filteredMovies, setFilteredMovies] = useState(films);
  const [searchEnabled, setSearchEnabled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [filterDialogOpen, setFilterDialogOpen] = useState(false)
  const [minRating, setMinRating] = useState(0)
  const handleSearch = () => {
    if (searchQuery === "" && minRating === 0) {
      setSearchEnabled(false)
      setFilteredMovies(films);
    } else {
      setSearchEnabled(true);
      setFilteredMovies(films.filter((m) => m.title.toLowerCase().includes(searchQuery.toLowerCase()) && m.rating > minRating))
      setSearchQuery("")
    }

  }

  const [showMenu, setShowMenu] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [focusedMovieIndex, setFocusedMovieIndex] = useState(-1)

  // Refs for focus management
  const movieCardRefs = useRef([])
  const searchInputRef = useRef(null)
  const filterButtonRef = useRef(null)
  const searchButtonRef = useRef(null)
  const menuButtonRef = useRef(null)
  const menuItemRef = useRef(null)
  const usernameInputRef = useRef(null)
  const okButtonRef = useRef(null)
  const dialogRef = useRef(null)
  const formDialogRef = useRef(null)
  const firstFormInputRef = useRef(null)

  const [newMovie, setNewMovie] = useState({
    title: "",
    description: "",
    posterURL: "",
    rating: ""
  })

  const handleNewMovieChange = (e) => {
    const { name, value } = e.target;
    setNewMovie((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    console.log(JSON.stringify(newMovie))
  }

  const handleAddMovie = (e) => {
    e.preventDefault();
    console.log(JSON.stringify(newMovie));
    filteredMovies.push(newMovie);
    setNewMovie({
      title: "",
      description: "",
      posterURL: "",
      rating: ""
    });
    setShowForm(false);
  }

  useEffect(() => {
    // Typewriter animation takes 4s + 1s delay = 5s total
    // Then fadeUp animation takes 0.8s
    const timer = setTimeout(() => {
      setFadeUpWelcome(true);
      // Hide welcome and show input after fadeUp completes
      setTimeout(() => {
        setShowWelcome(false);
        setShowInput(true);
        // Focus username input when it appears
        // Only auto-focus in TV mode
        if (isTelevision) {
          setTimeout(() => usernameInputRef.current?.focus(), 100);
        }
      }, 777);
    }, 5000);

    return () => clearTimeout(timer);
  }, [isTelevision]);

  // Focus management for dialogs (only in TV mode)
  useEffect(() => {
    if (!isTelevision) return;
    
    if (filterDialogOpen && dialogRef.current) {
      // Focus first interactive element in dialog
      const firstButton = dialogRef.current.querySelector('button, input, select, textarea');
      firstButton?.focus();
    }
  }, [filterDialogOpen, isTelevision]);

  useEffect(() => {
    if (!isTelevision) return;
    
    if (showForm && formDialogRef.current) {
      // Focus first input in form
      setTimeout(() => firstFormInputRef.current?.focus(), 100);
    }
  }, [showForm, isTelevision]);

  // Keyboard navigation handler (only in TV mode)
  useEffect(() => {
    if (!isTelevision) return;
    
    const handleKeyDown = (e) => {
      // Don't interfere with input fields
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        // Allow Escape to close dialogs even when in input
        if (e.key === 'Escape') {
          if (filterDialogOpen) {
            setFilterDialogOpen(false);
            filterButtonRef.current?.focus();
            e.preventDefault();
          } else if (showForm) {
            setShowForm(false);
            menuButtonRef.current?.focus();
            e.preventDefault();
          }
        }
        return;
      }

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          if (filterDialogOpen || showForm) {
            // Navigate within dialog
            const focusableElements = (filterDialogOpen ? dialogRef.current : formDialogRef.current)
              ?.querySelectorAll('button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
            if (focusableElements && focusableElements.length > 0) {
              const currentIndex = Array.from(focusableElements).indexOf(document.activeElement);
              const nextIndex = currentIndex < focusableElements.length - 1 ? currentIndex + 1 : 0;
              focusableElements[nextIndex]?.focus();
            }
          } else if (focusedMovieIndex < filteredMovies.length - 1) {
            // Navigate to next movie card
            const nextIndex = focusedMovieIndex + 1;
            setFocusedMovieIndex(nextIndex);
            movieCardRefs.current[nextIndex]?.focus();
          } else if (focusedMovieIndex === -1 && filteredMovies.length > 0) {
            // Start navigation from first movie
            setFocusedMovieIndex(0);
            movieCardRefs.current[0]?.focus();
          }
          break;

        case 'ArrowUp':
          e.preventDefault();
          if (filterDialogOpen || showForm) {
            // Navigate within dialog
            const focusableElements = (filterDialogOpen ? dialogRef.current : formDialogRef.current)
              ?.querySelectorAll('button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
            if (focusableElements && focusableElements.length > 0) {
              const currentIndex = Array.from(focusableElements).indexOf(document.activeElement);
              const prevIndex = currentIndex > 0 ? currentIndex - 1 : focusableElements.length - 1;
              focusableElements[prevIndex]?.focus();
            }
          } else if (focusedMovieIndex > 0) {
            // Navigate to previous movie card
            const prevIndex = focusedMovieIndex - 1;
            setFocusedMovieIndex(prevIndex);
            movieCardRefs.current[prevIndex]?.focus();
          } else if (focusedMovieIndex === 0) {
            // Move focus back to search area
            setFocusedMovieIndex(-1);
            searchInputRef.current?.focus();
          }
          break;

        case 'ArrowRight':
          e.preventDefault();
          if (!filterDialogOpen && !showForm) {
            // Navigate to next interactive element in header/search area
            const headerElements = [
              menuButtonRef.current,
              searchInputRef.current,
              filterButtonRef.current,
              searchButtonRef.current
            ].filter(Boolean);
            const currentIndex = headerElements.indexOf(document.activeElement);
            if (currentIndex < headerElements.length - 1) {
              headerElements[currentIndex + 1]?.focus();
            } else if (filteredMovies.length > 0) {
              setFocusedMovieIndex(0);
              movieCardRefs.current[0]?.focus();
            }
          }
          break;

        case 'ArrowLeft':
          e.preventDefault();
          if (!filterDialogOpen && !showForm) {
            // Navigate to previous interactive element
            if (focusedMovieIndex >= 0) {
              // Move from movie cards back to search area
              setFocusedMovieIndex(-1);
              searchButtonRef.current?.focus();
            } else {
              const headerElements = [
                menuButtonRef.current,
                searchInputRef.current,
                filterButtonRef.current,
                searchButtonRef.current
              ].filter(Boolean);
              const currentIndex = headerElements.indexOf(document.activeElement);
              if (currentIndex > 0) {
                headerElements[currentIndex - 1]?.focus();
              }
            }
          }
          break;

        case 'Enter':
          if (e.target === menuButtonRef.current) {
            setShowMenu(!showMenu);
            if (!showMenu) {
              setTimeout(() => menuItemRef.current?.focus(), 100);
            }
          } else if (e.target === menuItemRef.current) {
            setShowForm(true);
            setShowMenu(false);
          }
          break;

        case 'Escape':
          if (filterDialogOpen) {
            setFilterDialogOpen(false);
            filterButtonRef.current?.focus();
            e.preventDefault();
          } else if (showForm) {
            setShowForm(false);
            menuButtonRef.current?.focus();
            e.preventDefault();
          } else if (showMenu) {
            setShowMenu(false);
            menuButtonRef.current?.focus();
            e.preventDefault();
          }
          break;

        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [filterDialogOpen, showForm, showMenu, focusedMovieIndex, filteredMovies.length, isTelevision]);

  const registerUser = () => {
    localStorage.setItem("username", username);
    setUsernameSet(true)
  }

  if (!usernameSet) {
    return (
      <div className='flex min-h-screen items-center justify-center bg-neutral-800 text-white'>
        {showWelcome && (
          <p className={`line-1 anim-typewriter ${fadeUpWelcome ? 'fade-up' : ''}`}>
            Welcome to MovieSpace!
          </p>
        )}

        {showInput && (
          <div className="flex flex-col items-center gap-4">
            <p className="text-xl">Enter your username</p>
            <div className='px-4 py-2 bg-neutral-800 border border-neutral-700 rounded flex-row'>
              <input
                ref={usernameInputRef}
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    registerUser();
                  }
                }}
                className={`px-1 py-1 text-white focus:outline-none focus:border-blue-500 ${isTelevision ? 'focusable' : ''}`}
                placeholder="Username"
                tabIndex={0}
              />
              <button 
                ref={okButtonRef}
                className={`p-2 border border-neutral-400 rounded ${isTelevision ? 'focusable' : ''}`} 
                onClick={registerUser}
                tabIndex={0}
              >
                Ok
              </button>
            </div>

          </div>
        )}
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-amber-50 overflow-y-auto '>
      {/* Header/Navbar Example */}
      <header className="bg-neutral-950 text-white  border-b border-border">

        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-text-primary">Space Movies</h1>

          <div className='flex flex-row items-center gap-2 relative'>
            <p>Hello {username}</p>
            <button
              ref={menuButtonRef}
              onClick={() => {
                setShowMenu(!showMenu);
                if (!showMenu) {
                  setTimeout(() => menuItemRef.current?.focus(), 100);
                }
              }}
              onKeyDown={(e) => {
                if (e.key === 'Escape' && showMenu) {
                  setShowMenu(false);
                }
              }}
              className={`cursor-pointer hover:text-amber-300 transition-colors ${isTelevision ? 'focusable' : ''}`}
              tabIndex={0}
              aria-expanded={showMenu}
              aria-haspopup="true"
            >
              {showMenu ? <ChevronUp /> : <ChevronDown />}
            </button>

            <ul id='menu' hidden={!showMenu} className='dropdown-menu' role="menu">
              <li 
                ref={menuItemRef}
                className={`dropdown-item ${isTelevision ? 'focusable' : ''}`} 
                onClick={() => {
                  setShowForm(true);
                  setShowMenu(false);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setShowForm(true);
                    setShowMenu(false);
                    e.preventDefault();
                  }
                }}
                role="menuitem"
                tabIndex={showMenu ? 0 : -1}
              >
                Create New Post
              </li>
            </ul>
          </div>

        </div>

      </header>

      <div className="bg-white/75 text-black inset-0  backdrop-filter backdrop-blur-sm bg-opacity-10  p-8 shadow-xl relative z-10">
        <div className='flex flex-row space-x-4'>
          <input 
            ref={searchInputRef}
            type='text' 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch();
                searchInputRef.current?.blur();
              }
            }}
            placeholder='Search for a movie' 
            className={`p-4 border border-gray-400 w-full ${isTelevision ? 'focusable' : ''}`}
            tabIndex={0}
          />
          <button
            ref={filterButtonRef}
            onClick={() => {
              setFilterDialogOpen(true);
            }}
            className={`px-4 py-2 bg-white border-neutral-800 border text-black rounded hover:border-xl hover:bg-amber-300 ${isTelevision ? 'focusable' : ''}`}
            tabIndex={0}
          >
            Filter
          </button>
          <button 
            ref={searchButtonRef}
            onClick={handleSearch} 
            className={`p-4 border-neutral-800 border text-white bg-neutral-800 hover:hover:bg-amber-300 hover:text-neutral-900 ${isTelevision ? 'focusable' : ''}`}
            tabIndex={0}
          >
            Search
          </button>
        </div>
        {/* 
       <section>
          <MovieCarousel movies={TopRatedMovies} />
        </section>
       <section>
          <MovieGrid movies={films} />
        </section>
       */}


      </div>
      <div className="container mx-auto px-4 py-8">

        <h2 className="text-3xl font-bold text-primary mb-8">{searchEnabled ? "Search Results" : "All Movies"}</h2>
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


        {filterDialogOpen &&
          <dialog
            ref={dialogRef}
            id="myDialog"
            className="fixed inset-0 z-50 w-screen h-screen bg-transparent flex items-center  border-none justify-center p-4 m-0 rounded-none "
            open={filterDialogOpen}
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                setFilterDialogOpen(false);
                filterButtonRef.current?.focus();
              }
            }}
          >
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 space-y-4  border-8 border-neutral-500">
              <div className='flex flex-row  justify-between'>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Filter Ratings</h3>
                <button 
                  onClick={() => setMinRating(0)} 
                  className={`hover:underline ${isTelevision ? 'focusable' : ''}`}
                  tabIndex={0}
                >
                  Clear all
                </button>
              </div>

              <div>
                {ratingFilters.map((_r) =>
                  <div 
                    key={_r.minValue}
                    className={`flex flex-row items-center justify-between border border-black rounded-md p-2 mb-2 bg-neutral-100 cursor-pointer ${isTelevision ? 'focusable' : ''}`}
                    onClick={() => setMinRating(_r.minValue)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        setMinRating(_r.minValue);
                        e.preventDefault();
                      }
                    }}
                    tabIndex={0}
                    role="button"
                    aria-pressed={minRating === _r.minValue}
                  >
                    <div className='flex flex-row'>
                      <ReactStars key={_r.minValue} value={_r.starValue} edit={false} size={24} />
                      <p style={{ fontSize: 24 }}>&nbsp;& Up</p>
                    </div>
                    {minRating == _r.minValue ? <CircleCheckBig size={24} className='mr-2' /> : <Circle size={24} className='mr-2' />}
                  </div>
                )}
              </div>






              <button
                className={`w-full px-4 py-2 bg-neutral-600 text-white rounded hover:bg-blue-700 ${isTelevision ? 'focusable' : ''}`}
                onClick={() => {
                  setFilterDialogOpen(false);
                  filterButtonRef.current?.focus();
                }}
                tabIndex={0}
              >
                Confirm
              </button>
            </div>
          </dialog>
        }

        {showForm &&
          <dialog 
            ref={formDialogRef}
            className="fixed inset-0 z-50 w-screen h-screen bg-transparent flex items-center  border-none justify-center p-4 m-0 rounded-none "
            open={showForm}
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                setShowForm(false);
                menuButtonRef.current?.focus();
              }
            }}
          >
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 space-y-4  border-8 border-neutral-500 flex-col">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Add New Movie</h3>
              <form className='p-4'>

                <label htmlFor='title' >Movie Title</label>
                <input 
                  ref={firstFormInputRef}
                  type='text' 
                  id='title' 
                  value={newMovie.title} 
                  name='title' 
                  onChange={handleNewMovieChange} 
                  placeholder='title'
                  className={`w-full mb-1.5 px-3 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-500 bg-white text-sm ${isTelevision ? 'focusable' : ''}`}
                  tabIndex={0}
                />

                <label htmlFor='description'>Description</label>
                <textarea 
                  id='description' 
                  value={newMovie.description} 
                  name='description' 
                  onChange={handleNewMovieChange} 
                  placeholder='description'
                  className={`w-full mb-1.5 px-3 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-500 bg-white text-sm ${isTelevision ? 'focusable' : ''}`}
                  tabIndex={0}
                />

                <label htmlFor='posterURL'>Cover Image</label>
                <input 
                  type='text' 
                  id='posterURL' 
                  value={newMovie.posterURL} 
                  name='posterURL' 
                  onChange={handleNewMovieChange} 
                  placeholder='https://fake.Ur/l/coolImage'
                  className={`w-full mb-1.5 px-3 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-500 bg-white text-sm ${isTelevision ? 'focusable' : ''}`}
                  tabIndex={0}
                />

                <label htmlFor='rating'>Rating</label>
                <input 
                  type='number' 
                  min={1} 
                  max={10} 
                  step={0.1} 
                  id='rating' 
                  value={newMovie.rating} 
                  name='rating' 
                  onChange={handleNewMovieChange} 
                  placeholder='rating'
                  className={`w-full mb-1.5 px-3 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-500 bg-white text-sm ${isTelevision ? 'focusable' : ''}`}
                  tabIndex={0}
                />

                <button
                  type='submit'
                  className={`w-full mt-5 px-4 py-2 bg-neutral-600 text-white rounded hover:bg-amber-700 ${isTelevision ? 'focusable' : ''}`}
                  onClick={(e) => {
                    handleAddMovie(e);
                    menuButtonRef.current?.focus();
                  }}
                  tabIndex={0}
                >
                  Confirm
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault(); 
                    setShowForm(false);
                    menuButtonRef.current?.focus();
                  }}
                  className={`w-full mt-2 px-4 py-2 bg-white-600 text-neutral-600 border-neutral-600 border rounded hover:bg-amber-700 hover:text-white ${isTelevision ? 'focusable' : ''}`}
                  tabIndex={0}
                >
                  Cancel
                </button>
          
              </form>
       

            </div>

          </dialog>
        }




      </div>
 

    </div>
  )


}
