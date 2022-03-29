import { useContext, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import c from "./App.module.scss";
import Header from "./components/layout/Header";
import { CountriesContext } from "./context/countries-context";
import CountryPage from "./pages/Country/CountryPage";
import Home from "./pages/Home/Home";


function App() {
  const [theme, setTheme] = useState("");

  const toggleThemeHandler = () => {
    setTheme(() => (theme === "" ? "dark" : ""));
  };
  const ctx = useContext(CountriesContext);
  useEffect(() => {
    ctx.setCountries(JSON.parse(localStorage.getItem("countries")!));
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BrowserRouter>
      <div className={c.App} data-theme={theme}>
        <Header onSwitch={toggleThemeHandler} theme={theme}></Header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:country" element={<CountryPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
