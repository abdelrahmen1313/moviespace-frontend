import React from 'react'

const AppExample = () => {

    return (
        <div className="min-h-screen transition-colors bg-bg-primary text-text-primary">
          {/* Header/Navbar Example */}
          <header className="bg-bg-secondary border-b border-border">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
              <h1 className="text-2xl font-bold text-text-primary">Space Movies</h1>
              <button
                onClick={toggle}
                className="px-4 py-2 rounded-lg bg-accent text-text-inverse hover:bg-accent-hover transition-colors"
              >
                {theme === 'dark' ? '☀️' : '🌙'} Toggle Theme
              </button>
            </div>
          </header>
    
          {/* Main Content Area */}
          <main className="container mx-auto px-4 py-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-text-primary mb-2">
                Color Palette Examples
              </h2>
              <p className="text-text-secondary">
                Current Theme: <span className="font-mono text-accent">{theme}</span>
              </p>
            </div>
    
            {/* Movie Card Example */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div className="bg-bg-card border border-border rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="mb-4">
                  <div className="w-full h-48 bg-bg-tertiary rounded mb-4 flex items-center justify-center">
                    <span className="text-text-tertiary">Movie Poster</span>
                  </div>
                  <h3 className="text-xl font-semibold text-text-primary mb-2">
                    Example Movie Title
                  </h3>
                  <p className="text-text-secondary text-sm mb-4">
                    This is an example movie card showing how to use the color palette across components.
                  </p>
                </div>
    
                {/* Rating Badge */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full bg-rating-high/20 text-rating-high text-sm font-medium">
                    ⭐ 8.5
                  </span>
                  <span className="px-3 py-1 rounded-full bg-rating-medium/20 text-rating-medium text-sm font-medium">
                    ⭐ 6.0
                  </span>
                  <span className="px-3 py-1 rounded-full bg-rating-low/20 text-rating-low text-sm font-medium">
                    ⭐ 4.0
                  </span>
                </div>
    
                {/* Genre Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full bg-genre-action/20 text-genre-action text-xs font-medium">
                    Action
                  </span>
                  <span className="px-3 py-1 rounded-full bg-genre-drama/20 text-genre-drama text-xs font-medium">
                    Drama
                  </span>
                  <span className="px-3 py-1 rounded-full bg-genre-comedy/20 text-genre-comedy text-xs font-medium">
                    Comedy
                  </span>
                  <span className="px-3 py-1 rounded-full bg-genre-horror/20 text-genre-horror text-xs font-medium">
                    Horror
                  </span>
                  <span className="px-3 py-1 rounded-full bg-genre-sciFi/20 text-genre-sciFi text-xs font-medium">
                    Sci-Fi
                  </span>
                </div>
    
                <button className="w-full px-4 py-2 rounded-lg bg-accent text-text-inverse hover:bg-accent-hover transition-colors">
                  View Details
                </button>
              </div>
    
              {/* Second Card */}
              <div className="bg-bg-card border border-border rounded-lg p-6 shadow-lg">
                <h3 className="text-xl font-semibold text-text-primary mb-4">
                  Background Colors
                </h3>
                <div className="space-y-2">
                  <div className="p-3 rounded bg-bg-primary border border-border">
                    <span className="text-text-primary text-sm">bg-primary</span>
                  </div>
                  <div className="p-3 rounded bg-bg-secondary border border-border">
                    <span className="text-text-primary text-sm">bg-secondary</span>
                  </div>
                  <div className="p-3 rounded bg-bg-tertiary border border-border">
                    <span className="text-text-primary text-sm">bg-tertiary</span>
                  </div>
                  <div className="p-3 rounded bg-bg-card border border-border">
                    <span className="text-text-primary text-sm">bg-card</span>
                  </div>
                </div>
              </div>
    
              {/* Third Card */}
              <div className="bg-bg-card border border-border rounded-lg p-6 shadow-lg">
                <h3 className="text-xl font-semibold text-text-primary mb-4">
                  Text Colors
                </h3>
                <div className="space-y-2">
                  <p className="text-text-primary">Primary Text</p>
                  <p className="text-text-secondary">Secondary Text</p>
                  <p className="text-text-tertiary">Tertiary Text</p>
                  <div className="p-3 rounded bg-accent">
                    <p className="text-text-inverse">Inverse Text (on accent)</p>
                  </div>
                </div>
              </div>
            </div>
    
            {/* Button Examples */}
            <div className="bg-bg-secondary rounded-lg p-6 mb-8">
              <h3 className="text-xl font-semibold text-text-primary mb-4">
                Button Examples
              </h3>
              <div className="flex flex-wrap gap-4">
                <button className="px-6 py-2 rounded-lg bg-accent text-text-inverse hover:bg-accent-hover transition-colors">
                  Primary Button
                </button>
                <button className="px-6 py-2 rounded-lg bg-bg-tertiary text-text-primary hover:bg-bg-tertiary/80 transition-colors border border-border">
                  Secondary Button
                </button>
                <button className="px-6 py-2 rounded-lg border-2 border-accent text-accent hover:bg-accent-light transition-colors">
                  Outline Button
                </button>
              </div>
            </div>
    
            {/* Usage Guide */}
            <div className="bg-bg-card border border-border rounded-lg p-6">
              <h3 className="text-xl font-semibold text-text-primary mb-4">
                How to Use Colors
              </h3>
              <div className="space-y-3 text-text-secondary">
                <div>
                  <code className="text-accent">bg-bg-primary</code> - Main background
                </div>
                <div>
                  <code className="text-accent">text-text-primary</code> - Main text color
                </div>
                <div>
                  <code className="text-accent">bg-accent</code> - Primary accent color
                </div>
                <div>
                  <code className="text-accent">border-border</code> - Border color
                </div>
                <div>
                  <code className="text-accent">bg-rating-high</code> - High rating color
                </div>
                <div>
                  <code className="text-accent">bg-genre-action</code> - Genre tag colors
                </div>
                <p className="mt-4 text-text-tertiary text-sm">
                  All colors automatically adapt to light/dark theme based on the ThemeContext!
                </p>
              </div>
            </div>
          </main>
        </div>
      );  
}

export default AppExample