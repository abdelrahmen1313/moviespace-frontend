import React from 'react'

const SearchBar = ({searchInputRef, searchQuery, setSearchQuery, handleSearch, filterButtonRef, searchButtonRef, isTelevision, setFilterDialogOpen}) => {
  return (
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
  )
}

export default SearchBar