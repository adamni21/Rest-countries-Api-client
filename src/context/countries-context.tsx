import { createContext, FC, useEffect, useState } from "react";
import { CountriesContextState, Country, Region } from "./types";
import filterCountries from "./utils/filterCountries";

const countriesContextDefault: CountriesContextState = {
  countries: [],
  setCountries: () => {},
  filteredCountries: [],
  searchValue: "",
  setSearchValue: () => {},
  region: Region.all,
  setRegion: () => {},
};


export const CountriesContext = createContext(countriesContextDefault);

const CountriesProvider: FC = ({ children }) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [region, setRegion] = useState<Region>(Region.all);
  useEffect(() => {
    setFilteredCountries(filterCountries(searchValue, region, countries));
  }, [countries, searchValue, region]);

  return (
    <CountriesContext.Provider
      value={{
        countries: countries,
        setCountries: setCountries,
        filteredCountries: filteredCountries,
        searchValue: searchValue,
        setSearchValue: setSearchValue,
        region: region,
        setRegion: setRegion,
      }}
    >
      {children}
    </CountriesContext.Provider>
  );
};

export default CountriesProvider;
