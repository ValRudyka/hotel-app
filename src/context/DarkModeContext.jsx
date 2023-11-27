import { createContext, useContext, useEffect, useState } from "react";

const DarkModeContext = createContext();

function DarkModeToggle({ children }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark-mode");
  }, [isDark]);

  const toggle = function () {
    setIsDark((dark) => !dark);
  };

  return (
    <DarkModeContext.Provider value={{ isDark, toggle }}>
      {children}
    </DarkModeContext.Provider>
  );
}

export const useDarkMode = function () {
  const context = useContext(DarkModeContext);

  if (!context) {
    throw new Error("The hook was used outside of DarkModeContext scope");
  }

  return context;
};

export default DarkModeToggle;
