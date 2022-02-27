import { diceCoefficient } from "dice-coefficient";
import { nGram } from "n-gram";
import { createContext, FC, useEffect, useState } from "react";
import { CountriesContextState, Country, Region } from "./types";

const countriesContextDefault: CountriesContextState = {
  countries: [],
  setCountries: () => {},
  filteredCountries: [],
  searchValue: "",
  setSearchValue: () => {},
  region: Region.all,
  setRegion: () => {},
};

const somePartialMatches = (name: string, searchValue: string) => {
  if (
    name.includes(" ") &&
    name
      .split(" ")
      .slice(1)
      .some((partial) => partial.startsWith(searchValue))
  )
    return true;
};

const filterCountries = (
  searchValue: string,
  region: Region = Region.all,
  countries: Country[]
) => {
  if (!countries.length) return [];
  const result: { country: Country; rating: number }[] = [];
  const lowerCaseSearchValue = searchValue.toLowerCase();
  for (let i = 0; i < countries.length; i++) {
    // skips country if region is set and does'nt match;  startsWith due to typo in API ("Americas" instead of "America")
    if (region !== Region.all && !countries[i].region.startsWith(region))
      continue;

    // if country starts with searchValue
    const name = countries[i].name.toLowerCase();
    if (name.startsWith(lowerCaseSearchValue)) {
      result.push({ country: countries[i], rating: 1.3 });
      continue;
    }

    // if searchValue for example matches "States" in "United States"
    if (somePartialMatches(name, lowerCaseSearchValue)) {
      result.push({ country: countries[i], rating: 1.2 });
      continue;
    }

    let nativeNamesPartialMatches = false;
    const nativeNames = countries[i].nativeNames?.map((nativeName) => {
      const lowerName = nativeName.toLowerCase();
      // if native name partial matches
      if (somePartialMatches(nativeName, lowerCaseSearchValue))
        nativeNamesPartialMatches = true;
      // return lower case name
      return lowerName;
    });

    // if a native name starts with searchValue
    if (nativeNames?.some((name) => name.startsWith(lowerCaseSearchValue))) {
      result.push({ country: countries[i], rating: 1.1 });
      continue;
    }

    if (nativeNamesPartialMatches) {
      result.push({ country: countries[i], rating: 1 });
      continue;
    }

    // default
    // nGrams of country name(s). one char longer than the searchValue for the case that a char was missed
    const nGrams = [
      // adds name or nGrams of name if long enough
      ...(searchValue.length + 1 < name.length
        ? nGram(searchValue.length + 1)(name)
        : [name]),
    ];
    // adds native names or nGrams of long enough names
    if (nativeNames) {
      for (let i = 0; i < nativeNames.length; i++) {
        if (searchValue.length + 1 < nativeNames[i].length)
          nGram(searchValue.length + 1)(nativeNames[i]).forEach((gram) =>
            nGrams.push(gram)
          );
        else nGrams.push(nativeNames[i]);
      }
    }
    const highestRating = Math.max(
      ...nGrams.map((gram) => diceCoefficient(gram, lowerCaseSearchValue))
    );
    // pushes country to result if rating is greater than zero
    if (highestRating > 0)
      result.push({ country: countries[i], rating: highestRating });
  }
  // returns result sorted and mapped back to just countries
  return result
    .sort((a, b) => b.rating - a.rating)
    .map((country) => country.country);
};

export const CountriesContext = createContext(countriesContextDefault);

const CountriesProvider: FC = ({ children }) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [region, setRegion] = useState<Region>(Region.all);
  useEffect(()=>{
    setFilteredCountries(filterCountries(searchValue, region, countries))
  }, [countries, searchValue, region])

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
