import { useContext, useEffect, useState } from "react";
import useHttp from "./hooks/use-http";

import { Country } from "./context/types";

import c from "./App.module.scss";
import Header from "./components/layout/Header";
import { CountriesContext } from "./context/countries-context";
import CountryCard from "./components/countries/CountryCard";

const dataReducer = (raw: any): [Country] => {
  return raw.map((country: any): Country => {
    const nativeNames = country.name.nativeName
      ? Object.values<{ common: string; official: string }>(
          country.name.nativeName
        ).map((name) => name.common)
      : undefined;
    return {
      name: country.name.common,
      nativeNames: nativeNames as [string],
      capitals: country.capital,
      languages: country.languages,
      cca3: country.cca3,
      borders: country.borders,
      currencies: country.currencies,
      region: country.region,
      subRegion: country.subRegion,
      population: country.population,
      topLevelDomains: country.tld,
      flagUrl: country.flags.svg,
    };
  });
};


function App() {
  const [theme, setTheme] = useState("");
  const {
    data: countries,
    error,
    isLoading,
    request,
  } = useHttp("https://restcountries.com/v3.0/alpha?codes=aq,us", dataReducer);
  const ctx = useContext(CountriesContext);

  useEffect(() => {
    request();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (countries) ctx.setCountries(countries);
  }, [countries, ctx]);
console.log(ctx.countries);

  const toggleThemeHandler = () => {
    setTheme(() => (theme === "" ? "dark" : ""));
  };
  return (
    <div className={c.App} data-theme={theme}>
      <Header onSwitch={toggleThemeHandler} theme={theme}></Header>
      {isLoading && <h2>loading...</h2>}
      {ctx.countries.length  && <div className={c.flex}>
        <CountryCard
          name={ctx.countries[0].name}
          capital={ctx.countries[0].capitals?.[0]}
          population={ctx.countries[0].population}
          region={ctx.countries[0].region}
          flagUrl={ctx.countries[0].flagUrl}
        />
      </div>}
    </div>
  );
}

export default App;
