import { useState } from "react";

import c from "./App.module.scss";
import Header from "./components/layout/Header";
import CountryGrid from "./components/countries/CountryGrid";

function App() {
  const [theme, setTheme] = useState("");

  const toggleThemeHandler = () => {
    setTheme(() => (theme === "" ? "dark" : ""));
  };
  return (
    <div className={c.App} data-theme={theme}>
      <Header onSwitch={toggleThemeHandler} theme={theme}></Header>
      <main>
        <CountryGrid />
      </main>
    </div>
  );
}

export default App;
