import { Country } from "../context/types";

interface RawCountry
  extends Omit<
    Country,
    "name" | "currencies" | "topLevelDomains" | "flagUrl" | "nativeNames"
  > {
  name: {
    official: string;
    common: string;
    nativeName: { [key: string]: { official: string; common: string } };
  };
  currencies?: { name: string; symbol: string }[];
  tld?: string[];
  flags?: { png: string; svg: string };
}

type ApiField = keyof RawCountry;

const allApiFields: Omit<ApiField, "name">[] = [
  "capitals",
  "languages",
  "currencies",
  "region",
  "subRegion",
  "population",
  "borders",
  "tld",
  "flagUrl",
  "cca3",
];

type Endpoint = "all" | "alpha";

interface Params {
  fields?: ApiField[];
  codes?: string[];
}

export const GetCountryData = (endpoint: Endpoint, params?: Params) => {
  let url = "https://restcountries.com/v3.1/" + endpoint + "?fields=name,";

  if (params?.fields) url += params.fields.join(",");
  else allApiFields.join(",");

  if (endpoint !== "alpha") delete params?.codes;
  else if (!params?.codes)
    throw new Error('specified endpoint requires param "codes"');
  else url += "&codes=" + params.codes.join(",");

  return url;
};

// const CountryDataReducer = (raw: any): Partial<Country>[] => {
//   return raw.map((country: any): Country => {
//     const nativeNames = country.name.nativeName
//       ? Object.values<{ common: string; official: string }>(
//           country.name.nativeName
//         ).map((name) => name.common)
//       : undefined;
//     const reducedCountry = {
//       name: country.name.common,
//       nativeNames: nativeNames as string[]
//     }
//     return reducedCountry;
//   });
// };
// name: name.common,
// nativeNames: nativeNames as string[],

export const CountryDataReducer = (raw: any) => {
  const fieldReducer = {
    capitals: (
      country: Partial<RawCountry>,
      reducedCountry: Partial<Country>
    ) => (reducedCountry.capitals = country.capitals),
    languages: (
      country: Partial<RawCountry>,
      reducedCountry: Partial<Country>
    ) => (reducedCountry.languages = country.languages),
    cca3: (country: Partial<RawCountry>, reducedCountry: Partial<Country>) =>
      (reducedCountry.cca3 = country.cca3),
    borders: (country: Partial<RawCountry>, reducedCountry: Partial<Country>) =>
      (reducedCountry.borders = country.borders),
    currencies: (
      country: Partial<RawCountry>,
      reducedCountry: Partial<Country>
    ) =>
      (reducedCountry.currencies = country.currencies!.map(
        (curr) => curr.name
      )),
    region: (country: Partial<RawCountry>, reducedCountry: Partial<Country>) =>
      (reducedCountry.region = country.region),
    subRegion: (
      country: Partial<RawCountry>,
      reducedCountry: Partial<Country>
    ) => (reducedCountry.subRegion = country.subRegion),
    population: (
      country: Partial<RawCountry>,
      reducedCountry: Partial<Country>
    ) => (reducedCountry.population = country.population),
    topLevelDomains: (
      country: Partial<RawCountry>,
      reducedCountry: Partial<Country>
    ) => (reducedCountry.topLevelDomains = country.tld),
    flagUrl: (country: Partial<RawCountry>, reducedCountry: Partial<Country>) =>
      (reducedCountry.flagUrl = country.flags!.png),
  };

  return raw.map((country: Partial<RawCountry>): Partial<Country> => {
    const reducedCountry: Partial<Country> = {};
    // add name and distinct native name(s), since name is acting as id
    reducedCountry.name = country.name?.common;
    reducedCountry.nativeNames = country.name?.nativeName
      ? Object.values<{ common: string }>(country.name.nativeName)
          .map((name) => name.common)
          .reduce((a: string[], b) => (a.includes(b) ? a : [...a]), [])
      : undefined;

    //convert rawCountry to contextCountry
    Object.keys(country).forEach((field) =>
      fieldReducer[field as unknown as keyof typeof fieldReducer](
        country,
        reducedCountry
      )
    );
    return reducedCountry;
  });
};
