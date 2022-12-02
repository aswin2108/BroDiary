import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/homepage/homepage.component";
import Header from "./components/header/header.component";
import Authentication from "./pages/authentication/authentication";
import DiaryPage from "./pages/diarypage/diary.component";
import HistoryPage from "./pages/historypage/historyPage.component";

import "./App.css";
import { createContext, useState } from "react";

export const ThemeContext = createContext(null);

const App = () => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((current) => (current === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="App" id={theme}>
        <Header />
        <Routes>
          <Route index path="/" element={<HomePage />} />
          <Route path="/auth" element={<Authentication />} />
          <Route path="/diary" element={<DiaryPage />} />
          <Route path="/diary/history" element={<HistoryPage />} />
        </Routes>
      </div>
    </ThemeContext.Provider>
  );
};

export default App;
