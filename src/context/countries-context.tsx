import { diceCoefficient } from "dice-coefficient";
import { nGram } from "n-gram";
import { createContext, FC, useState } from "react";
import { CountriesContextState, Country, Region } from "./types";

const countriesContextDefault: CountriesContextState = {
  countries: [],
  filteredCountries: [],
  filterCountries: () => {},
  setCountries: () => {},
};

const somePartialMatches = (str: string, query: string) => {
  if (
    str.includes(" ") &&
    str
      .split(" ")
      .slice(1)
      .some((partial) => partial.startsWith(query))
  )
    return true;
};

export const CountriesContext = createContext(countriesContextDefault);

const CountriesProvider: FC = ({ children }) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const filterCountriesHandler = (
    query: string,
    region: Region = Region.all
  ) => {
    if (!countries.length) return;
    const result: { country: Country; rating: number }[] = [];
    const lowerCaseQuery = query.toLowerCase();
    for (let i = 0; i < countries.length; i++) {
      // skips country if region is set and does'nt match;  startsWith due to typo in API ("Americas" instead of "America")
      if (region !== Region.all && !countries[i].region.startsWith(region))
        continue;

      // if country starts with query
      const name = countries[i].name.toLowerCase();
      if (name.startsWith(lowerCaseQuery)) {
        result.push({ country: countries[i], rating: 1.3 });
        continue;
      }

      // if query for example matches "States" in "United States"
      if (somePartialMatches(name, lowerCaseQuery)) {
        result.push({ country: countries[i], rating: 1.2 });
        continue;
      }

      let nativeNamesPartialMatches = false;
      const nativeNames = countries[i].nativeNames?.map((nativeName) => {
        const lowerName = nativeName.toLowerCase();
        // if native name partial matches
        if (somePartialMatches(nativeName, lowerCaseQuery))
          nativeNamesPartialMatches = true;
        // return lower case name
        return lowerName;
      });

      // if a native name starts with query
      if (nativeNames?.some((name) => name.startsWith(lowerCaseQuery))) {
        result.push({ country: countries[i], rating: 1.1 });
        continue;
      }

      if (nativeNamesPartialMatches) {
        result.push({ country: countries[i], rating: 1 });
        continue;
      }

      // default
      // nGrams of country name(s). one char longer than the query for the case that a char was missed
      const nGrams = [
        // adds name or nGrams of name if long enough
        ...(query.length + 1 < name.length
          ? nGram(query.length + 1)(name)
          : [name]),
      ];
      // adds native names or nGrams of long enough names
      if (nativeNames) {
        for (let i = 0; i < nativeNames.length; i++) {
          if (query.length + 1 < nativeNames[i].length)
            nGram(query.length + 1)(nativeNames[i]).forEach((gram) =>
              nGrams.push(gram)
            );
          else nGrams.push(nativeNames[i]);
        }
      }
      const highestRating = Math.max(
        ...nGrams.map((gram) => diceCoefficient(gram, lowerCaseQuery))
      );
      // pushes country to result if rating is greater than zero
      if (highestRating > 0)
        result.push({ country: countries[i], rating: highestRating });
    }
    // sets filteredCountries to sorted and mapped back to just countries result
    setFilteredCountries(
      result
        .sort((a, b) => b.rating - a.rating)
        .map((country) => country.country)
    );
  };

  return (
    <CountriesContext.Provider
      value={{
        countries: countries,
        filteredCountries: filteredCountries,
        filterCountries: filterCountriesHandler,
        setCountries: setCountries,
      }}
    >
      {children}
    </CountriesContext.Provider>
  );
};

export default CountriesProvider;
