import React, { useState } from "react";

const ThemeContext = React.createContext();

const defaultTheme = {
  theme: "light"
};

export const ThemeProvider = ({ children, theme }) => {
  const [currentTheme, setCurrentTheme] = useState(theme || defaultTheme);

  const saveTheme = values => {
    setCurrentTheme(values);
  };

  return (
    <ThemeContext.Provider value={{ theme: currentTheme, saveTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const ThemeConsumer = ThemeContext.Consumer;

export default ThemeContext;
