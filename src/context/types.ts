export interface Country {
  name: string;
  nativeNames: [string];
  capital: [string];
  languages: [string];
  currencies: [string];
  region: string;
  subRegion: string;
  population: number;
  borders: [string];
  topLevelDomain: [string];
  flagDomain: string;
  cca3: string;
}

export type CountriesContextState = {
  countries: [Country?],
  setCountries: (countries: [Country]) => void
}