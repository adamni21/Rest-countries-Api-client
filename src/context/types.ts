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

export type CountriesContextState = {
  countries: Country[],
  setCountries: (countries: [Country]) => void
}