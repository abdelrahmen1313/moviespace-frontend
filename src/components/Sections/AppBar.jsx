import React from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react';

const AppBar = ({username, menuButtonRef, menuItemRef, showMenu, setShowMenu, setShowForm, isTelevision}) => {
  return (
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
  )
}

export default AppBar