// ThemeContext.jsx
import React, { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => setIsDark(!isDark);

  const theme = {
    isDark,
    toggleTheme,
    colors: {
      primary: isDark ? "bg-slate-900" : "bg-white",
      secondary: isDark ? "bg-slate-800" : "bg-gray-50",
      accent: "bg-blue-600 hover:bg-blue-700",
      text: isDark ? "text-white" : "text-gray-900",
      textSecondary: isDark ? "text-gray-300" : "text-gray-600",
      border: isDark ? "border-slate-700" : "border-gray-200",
      card: isDark ? "bg-slate-800" : "bg-white",
      input: isDark ? "bg-slate-700 text-white" : "bg-white text-gray-900",
    },
  };

  return (
    <ThemeContext.Provider value={theme}>
      <div className={isDark ? "dark" : ""}>{children}</div>
    </ThemeContext.Provider>
  );
};

// ✅ Export this hook too
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};
