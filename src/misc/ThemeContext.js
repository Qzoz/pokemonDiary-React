import React from 'react';

const themeContext = React.createContext();

const ThemeConsumer = themeContext.Consumer;
const ThemeProvider = themeContext.Provider;

export { ThemeConsumer, ThemeProvider };