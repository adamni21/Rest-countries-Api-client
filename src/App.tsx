import { FormEvent, useState } from "react";

import c from "./App.module.scss";
import Header from "./components/layout/Header";
import CountryGrid from "./components/countries/CountryGrid";
import CountrySearchBox from "./components/countries/SearchBox";
import RegionSelect from "./components/countries/controls/RegionSelect";

function App() {
  const [theme, setTheme] = useState("");

  const toggleThemeHandler = () => {
    setTheme(() => (theme === "" ? "dark" : ""));
  };

  // Homepage
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("");
  const searchChangeHandler = (e: FormEvent<HTMLInputElement>) => {
    setQuery(e.currentTarget.value)
  }
  const selectChangeHandler = (value: string) => setRegion(value)
  return (
    <div className={c.App} data-theme={theme}>
      <Header onSwitch={toggleThemeHandler} theme={theme}></Header>
      {/* <CountrySearchBox value={query} onChange={searchChangeHandler}/> */}
      <RegionSelect value={region} onChange={selectChangeHandler} placeholder="Filter by Region">
        <option>America</option>
        <option>Europe</option>
        <option>Africa</option>
        <option value="">Reset (All Regions)</option>
      </RegionSelect>
      <CountryGrid />
    </div>
  );
}

export default App;
