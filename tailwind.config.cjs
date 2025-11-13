/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
        "./public/index.html",
        "./src/**/*.{js,jsx,ts,tsx}"
    ],
    theme: {
        extend: {
            colors: {
                // Background colors
                bg: {
                    primary: 'rgb(var(--color-bg-primary) / <alpha-value>)',
                    secondary: 'rgb(var(--color-bg-secondary) / <alpha-value>)',
                    tertiary: 'rgb(var(--color-bg-tertiary) / <alpha-value>)',
                    card: 'rgb(var(--color-bg-card) / <alpha-value>)',
                    overlay: 'rgb(var(--color-bg-overlay) / <alpha-value>)',
                },
                // Text colors
                text: {
                    primary: 'rgb(var(--color-text-primary) / <alpha-value>)',
                    secondary: 'rgb(var(--color-text-secondary) / <alpha-value>)',
                    tertiary: 'rgb(var(--color-text-tertiary) / <alpha-value>)',
                    inverse: 'rgb(var(--color-text-inverse) / <alpha-value>)',
                },
                // Accent/Brand colors
                accent: {
                    DEFAULT: 'rgb(var(--color-accent) / <alpha-value>)',
                    hover: 'rgb(var(--color-accent-hover) / <alpha-value>)',
                    light: 'rgb(var(--color-accent-light) / <alpha-value>)',
                },
                // Border colors
                border: {
                    DEFAULT: 'rgb(var(--color-border) / <alpha-value>)',
                    light: 'rgb(var(--color-border-light) / <alpha-value>)',
                    dark: 'rgb(var(--color-border-dark) / <alpha-value>)',
                },
                // Rating colors
                rating: {
                    high: 'rgb(var(--color-rating-high) / <alpha-value>)',
                    medium: 'rgb(var(--color-rating-medium) / <alpha-value>)',
                    low: 'rgb(var(--color-rating-low) / <alpha-value>)',
                },
                // Genre colors (for tags/badges)
                genre: {
                    action: 'rgb(var(--color-genre-action) / <alpha-value>)',
                    drama: 'rgb(var(--color-genre-drama) / <alpha-value>)',
                    comedy: 'rgb(var(--color-genre-comedy) / <alpha-value>)',
                    horror: 'rgb(var(--color-genre-horror) / <alpha-value>)',
                    sciFi: 'rgb(var(--color-genre-scifi) / <alpha-value>)',
                },
            },
            keyframes: {
                typing: {
                  "0%": { width: "0%" },
                  "100%": { width: "100%" },
                },
                blink: {
                  "0%, 100%": { opacity: "1" },
                  "50%": { opacity: "0" },
                },
              },

              animation: {
                typing: "typing 2s steps(20) forwards", // Adjust duration and steps as needed
                blink: "blink .7s infinite step-end",
              },
        }
    },
    plugins: [require("tailwindcss-animate")]
};
