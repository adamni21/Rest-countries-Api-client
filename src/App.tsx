import { FormEvent, useState } from "react";

import c from "./App.module.scss";
import Header from "./components/layout/Header";
import CountryGrid from "./components/countries/CountryGrid";
import CountrySearchBox from "./components/countries/SearchBox";

function App() {
  const [theme, setTheme] = useState("");

  const toggleThemeHandler = () => {
    setTheme(() => (theme === "" ? "dark" : ""));
  };

  // Homepage
  const [query, setQuery] = useState("");
  const searchChangeHandler = (e: FormEvent<HTMLInputElement>) => {
    setQuery(e.currentTarget.value)
  }
  return (
    <div className={c.App} data-theme={theme}>
      <Header onSwitch={toggleThemeHandler} theme={theme}></Header>
      <CountrySearchBox value={query} onChange={searchChangeHandler}/>
      <CountryGrid />
    </div>
  );
}

export default App;
