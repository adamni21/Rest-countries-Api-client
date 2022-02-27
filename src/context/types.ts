export interface Country {
  name: string;
  nativeNames?: [string];
  capitals?: [string];
  languages: [string];
  currencies: [string];
  region: string;
  subRegion?: string;
  population: number;
  borders: [string];
  topLevelDomains: [string];
  flagUrl: string;
  cca3: string;
}

export enum Region {
  America = "America",
  Europe = "Europe",
  Africa = "Africa",
  Asia = "Asia",
  Oceania = "Oceania",
  all = "all",
}

export type CountriesContextState = {
  countries: Country[];
  setCountries: (countries: [Country]) => void;
  filteredCountries: Country[];
  searchValue: string,
  setSearchValue: (searchValue: string) => void,
  region: Region,
  setRegion: (region: Region) => void,
};
