import { useEffect, useState } from "react";
import useHttp from "./hooks/use-http";

import { Country } from "./context/types";

import c from "./App.module.scss";
import Header from "./components/layout/Header";
import CountriesProvider from "./context/countries-context";

const dataReducer = (raw: any): [Country] => {
  return raw.map((country: any) => ({
    name: country.name.common,
    nativeNames: country.name.nativeName.slice(0, 4),
    capitals: country.capitals,
    languages: country.languages,
    cca3: country.cca3,
    borders: country.borders,
    currencies: country.currencies,
    region: country.region,
    subRegion: country.subRegion,
    population: country.population,
    topLevelDomains: country.tld,
    flagDomain: country.flagDomain,
  }));
};

function App() {
  const [theme, setTheme] = useState("");
  const {
    data: countries,
    error,
    isLoading,
    request,
  } = useHttp("https://restcountries.com/v3.1/alpha/us", dataReducer);

  useEffect(() => {
    request();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleThemeHandler = () => {
    setTheme(() => (theme === "" ? "dark" : ""));
  };
  return (
    <CountriesProvider>
      <div className={c.App} data-theme={theme}>
        <Header onSwitch={toggleThemeHandler} theme={theme}></Header>
      </div>
    </CountriesProvider>
  );
}

export default App;
