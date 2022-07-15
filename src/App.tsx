import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import c from "./App.module.scss";
import Header from "./components/layout/Header";
import CountryPage from "./pages/Country/CountryPage";
import Home from "./pages/Home/Home";

function App() {
  const [theme, setTheme] = useState("");

  const toggleThemeHandler = () => {
    setTheme(() => (theme === "" ? "dark" : ""));
  };

  return (
    <BrowserRouter>
      <div className={c.App} data-theme={theme}>
        <Header onSwitch={toggleThemeHandler} theme={theme}></Header>
        <Routes>
          <Route path="Rest-countries-Api-client" element={<Home />} />
          <Route
            path="Rest-countries-Api-client/:country"
            element={<CountryPage />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
