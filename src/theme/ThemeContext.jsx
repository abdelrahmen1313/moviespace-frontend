import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(() => {
        // read from localStorage or default to system mode
        if (typeof window !== "undefined") {
            return localStorage.getItem("theme") || "system";
        }
        return "system";
    })

    // Apply visual theme to <html>
    useEffect(() => {
        const root = document.documentElement;
        const apply = (mode) => {
            root.classList.toggle("dark", mode === "dark");
        };

        if (theme === "system") {
            const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
            const isDark = mediaQuery.matches;
            apply(isDark ? "dark" : "light");

            // Listen for system theme changes
            const handleChange = (e) => {
                apply(e.matches ? "dark" : "light");
            };
            mediaQuery.addEventListener("change", handleChange);
            return () => mediaQuery.removeEventListener("change", handleChange);
        } else {
            apply(theme);
        }

        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggle = () => {
        setTheme((prev) => {
            if (prev === "light") return "dark";
            if (prev === "dark") return "system";
            return "light";
        });
    };

    const value = { theme, setTheme, toggle };

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;


}


export function useTheme() {
    return useContext(ThemeContext);
}