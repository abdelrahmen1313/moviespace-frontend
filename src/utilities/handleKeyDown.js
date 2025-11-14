export const handleKeyDown = (e) => {
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