import { useState, useEffect, useRef } from 'react';
import { useTheme } from "./theme/ThemeContext";
import { useTelevision } from "./television/TelevisionContext";
import { films } from './data/films';
import FilterDialog from './components/Modals/FilterDialog';
import AddMovieDialog from './components/Modals/AddMovieDialog';
import MoviesListHorizontal from './components/Lists/MoviesListHorizontal';
import AppBar from './components/Sections/AppBar';

import { handleKeyDown } from './utilities/handleKeyDown';



export default function App() {
  // const { theme, toggle } = useTheme();
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


  // Refs for focus management - TV mode utility
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
    <div className='min-h-screen bg-amber-50/80 overflow-y-auto '>
      {/* Header/Navbar Example */}
      <header className="bg-neutral-950 text-white  border-b border-border">

        <AppBar username={username} menuButtonRef={menuButtonRef} menuItemRef={menuItemRef}
          showMenu={showMenu} setShowMenu={setShowMenu}
          setShowForm={setShowForm} isTelevision={isTelevision}
        />


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
      </div>
      <div className="container mx-auto px-4 py-8">

        <h2 className="text-3xl font-bold text-primary mb-8">{searchEnabled ? "Search Results" : "All Movies"}</h2>
        <MoviesListHorizontal
          filteredMovies={filteredMovies}
          movieCardRefs={movieCardRefs}
          isTelevision={isTelevision}
          setFocusedMovieIndex={setFocusedMovieIndex}
        />


        {filterDialogOpen &&
          <FilterDialog
            dialogRef={dialogRef}
            filterDialogOpen={filterDialogOpen}
            setFilterDialogOpen={setFilterDialogOpen}
            filterButtonRef={filterButtonRef}
            isTelevision={isTelevision}
            minRating={minRating}
            setMinRating={setMinRating}
          />
        }

        {showForm &&
          <AddMovieDialog
            formDialogRef={formDialogRef}
            showForm={showForm}
            setShowForm={setShowForm}
            menuButtonRef={menuButtonRef}
            isTelevision={isTelevision}
            newMovie={newMovie}
            handleNewMovieChange={handleNewMovieChange}
            handleAddMovie={handleAddMovie}
          />
        }
      </div>
    </div>
  )


}
