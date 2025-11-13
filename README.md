### MOVIESPACE



A Movies App with TV-friendly navigation features
1. Keyboard navigation
Arrow keys: Navigate between elements
Up/Down: Navigate movie cards and dialog items
Left/Right: Navigate header/search controls
Enter: Activate buttons and menu items
Escape: Close dialogs and menus
2. Focus management
All interactive elements are focusable with tabIndex={0}
Focus automatically moves to dialogs when they open
Focus restores to the previous element when dialogs close
Movie cards track focus state for smooth navigation
3. Enhanced focus visibility
Stronger focus indicators with purple glow
Focused elements scale slightly (1.05x) for visibility
Multiple shadow layers for better contrast on TV screens
4. Dialog accessibility
Filter dialog: Arrow keys navigate options, Enter selects, Escape closes
Add Movie form: All inputs are keyboard accessible, Escape closes
Focus is trapped within dialogs
5. Menu navigation
Dropdown menu is keyboard accessible
Enter/Space activates menu items
Escape closes the menu
6. Movie card navigation
Arrow Up/Down navigates between movie cards
Each card is wrapped in a focusable container
Cards show clear focus indicators when selected
7. Add a New Movie
8. Search and filter Movies