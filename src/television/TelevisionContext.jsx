import { createContext, useContext, useEffect, useState } from "react";

const TelevisionContext = createContext();

// TV detection logic: typically TVs are large screens (1920px+ width)
// and have a low pixel density (pointer: coarse indicates remote control)
const detectTelevision = () => {
  if (typeof window === "undefined") return false;
  
  // Check for manual override in localStorage
  const manualMode = localStorage.getItem("televisionMode");
  if (manualMode === "enabled") return true;
  if (manualMode === "disabled") return false;
  
  // Auto-detect: large screen width (typically 1920px+) and coarse pointer (remote control)
  const isLargeScreen = window.innerWidth >= 1920;
  const hasCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
  const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
  
  // TV is likely if: large screen AND (coarse pointer OR not a touch device)
  // This helps distinguish TVs from large desktop monitors
  return isLargeScreen && (hasCoarsePointer || !isTouchDevice);
};

export function TelevisionProvider({ children }) {
  const [isTelevision, setIsTelevision] = useState(() => {
    return detectTelevision();
  });

  // Listen for window resize to update TV detection
  useEffect(() => {
    const handleResize = () => {
      setIsTelevision(detectTelevision());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Apply television class to document root for CSS targeting
  useEffect(() => {
    const root = document.documentElement;
    if (isTelevision) {
      root.classList.add("television-mode");
    } else {
      root.classList.remove("television-mode");
    }
  }, [isTelevision]);

  // Manual toggle function for testing/override
  const toggleTelevisionMode = () => {
    const newMode = !isTelevision;
    setIsTelevision(newMode);
    localStorage.setItem("televisionMode", newMode ? "enabled" : "disabled");
  };

  const value = { 
    isTelevision, 
    setIsTelevision,
    toggleTelevisionMode 
  };

  return (
    <TelevisionContext.Provider value={value}>
      {children}
    </TelevisionContext.Provider>
  );
}

export function useTelevision() {
  const context = useContext(TelevisionContext);
  if (!context) {
    throw new Error("useTelevision must be used within a TelevisionProvider");
  }
  return context;
}

