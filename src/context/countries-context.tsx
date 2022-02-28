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

const middleNameMatches = (name: string, searchValue: string) => {
  return (
    name.includes(" ") &&
    name
      .split(" ")
      .slice(1)
      .some((middleName) => middleName.startsWith(searchValue))
  );
};

const filterCountries = (
  searchValue: string,
  region: Region = Region.all,
  countries: Country[]
) => {
  if (!countries.length) return [];

  const countriesInRegion =
    region === Region.all
      ? countries
      : // startsWith() due to typo in API ("Americas" instead of "America")
        countries.filter((country) => country.region.startsWith(region));

  // "searchValue" is empty, skips search
  if (!searchValue) return countriesInRegion;

  const searchRatings: { country: Country; rating: number }[] = [];
  const lowerCaseSearchValue = searchValue.toLowerCase();
  for (let i = 0; i < countriesInRegion.length; i++) {
    // name of country starts with searchValue
    const name = countriesInRegion[i].name.toLowerCase();
    if (name.startsWith(lowerCaseSearchValue)) {
      searchRatings.push({ country: countriesInRegion[i], rating: 1.3 });
      continue;
    }

    // example: "States" in "United States" starts with "searchValue"
    if (middleNameMatches(name, lowerCaseSearchValue)) {
      searchRatings.push({ country: countriesInRegion[i], rating: 1.2 });
      continue;
    }

    // "nativeNames" to lower case
    const nativeNames = countriesInRegion[i].nativeNames?.map((name) =>
      name.toLowerCase()
    );
    // a native name starts with searchValue
    if (nativeNames?.some((name) => name.startsWith(lowerCaseSearchValue))) {
      searchRatings.push({ country: countriesInRegion[i], rating: 1.1 });
      continue;
    }

    if (
      nativeNames?.some((name) => middleNameMatches(name, lowerCaseSearchValue))
    ) {
      searchRatings.push({ country: countriesInRegion[i], rating: 1 });
      continue;
    }

    // default
    // nGrams of country name(s), grams are one char longer than the "searchValue" in case a char was missed
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
    // pushes country to searchRatings if rating is greater than zero
    if (highestRating > 0)
      searchRatings.push({
        country: countriesInRegion[i],
        rating: highestRating,
      });
  }

  // returns searchRatings sorted and mapped back to just countries
  return searchRatings
    .sort((a, b) => b.rating - a.rating)
    .map((country) => country.country);
};

export const CountriesContext = createContext(countriesContextDefault);

const CountriesProvider: FC = ({ children }) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [region, setRegion] = useState<Region>(Region.all);
  useEffect(() => {
    console.time();
    setFilteredCountries(filterCountries(searchValue, region, countries));
    console.timeEnd();
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
