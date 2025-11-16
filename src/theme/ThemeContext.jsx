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
            const supportsMatchMedia = typeof window.matchMedia === "function" && window.matchMedia("(prefers-color-scheme: dark)").media !== "not all";

            if (supportsMatchMedia) {
                const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
                apply(mediaQuery.matches ? "dark" : "light");

                // Listen for system theme changes
                const handleChange = (e) => {
                    apply(e.matches ? "dark" : "light");
                };
                mediaQuery.addEventListener("change", handleChange);
                return () => mediaQuery.removeEventListener("change", handleChange);
            } else {
                // Browser doesn't support prefers-color-scheme — fall back to client time
                const now = new Date();
                const hour = now.getHours();
                const isNight = hour >= 21 || hour < 6; // 21:00 - 05:59 => dark
                apply(isNight ? "dark" : "light");
            }
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