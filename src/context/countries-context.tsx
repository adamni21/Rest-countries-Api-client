import { createContext, FC, useState } from "react";
import { CountriesContextState, Country } from "./types";

const countriesContextDefault: CountriesContextState = {
  countries: [],
  setCountries: () => {},
};

const CountriesContext = createContext(countriesContextDefault);

const CountriesProvider: FC = ({ children }) => {
  const [countries, setCountries] = useState<[Country?]>([]);
  return (
    <CountriesContext.Provider
      value={{ countries: countries, setCountries: setCountries }}
    >
      {children}
    </CountriesContext.Provider>
  );
};

export default CountriesProvider;
