import { ApiBaseUrl } from "../constants";
import { Country } from "../context/types";

interface RawCountry {
  name: {
    official: string;
    common: string;
    nativeName: { [key: string]: { official: string; common: string } };
  };
  capital?: string[];
  languages: { [key: string]: string };
  currencies: { name: string; symbol: string }[];
  region: string;
  subregion?: string;
  population: number;
  borders?: string[];
  tld?: string[];
  flags: { png: string; svg: string };
  cca3: string;
}

type ApiField = keyof RawCountry;

const allApiFields = [
  "capital",
  "languages",
  "currencies",
  "region",
  "subregion",
  "population",
  "borders",
  "tld",
  "flags",
  "cca3",
];

type Endpoint = "all" | "alpha";

interface Params {
  fields?: ApiField[];
  codes?: string[];
}

export const GetCountryData = (endpoint: Endpoint, params?: Params) => {
  let url = ApiBaseUrl + endpoint + "?fields=name,";

  if (params?.fields) url += params.fields.join(",");
  else url += allApiFields.join(",");

  if (endpoint !== "alpha") delete params?.codes;
  else if (!params?.codes)
    throw new Error('specified endpoint requires param "codes"');
  else url += "&codes=" + params.codes.join(",");

  return url;
};

type FieldReducer = (rawCountry: Partial<RawCountry>) => any;

const fieldReducer: { [key: string]: FieldReducer } = {
  capitals: (rawCountry) => rawCountry.capital,
  languages: (rawCountry) => (Object as any).values(rawCountry.languages),
  cca3: (rawCountry) => rawCountry.cca3,
  borders: (rawCountry) => rawCountry.borders,
  currencies: (rawCountry) =>
    (Object as any)
      .values(rawCountry.currencies)
      .map((curr: { name: string }) => curr.name),
  region: (rawCountry) => rawCountry.region,
  subRegion: (rawCountry) => rawCountry.subregion,
  population: (rawCountry) => rawCountry.population,
  topLevelDomains: (rawCountry) => rawCountry.tld,
  flagUrl: (rawCountry) => rawCountry.flags,
};

/* #TODO: 
  1) reduce "languages" and "currencies" from object to array;  
  2) fetch svgUrl additionally;
/* /TODO */
export const countryDataReducer = (raw: any) => {
  const reducer = { ...fieldReducer };
  // delete not needed reducerFields
  Object.keys(fieldReducer).forEach((field) => {
    if (!fieldReducer[field](raw[0])) delete fieldReducer[field];
  });

  return raw.map((rawCountry: Partial<RawCountry>): Partial<Country> => {
    const reducedCountry: Partial<Country> = {};

    // add name and distinct native name(s), since name is acting as id
    reducedCountry.name = rawCountry.name?.common;
    reducedCountry.nativeNames = rawCountry.name?.nativeName
      ? Object.values<{ common: string }>(rawCountry.name.nativeName)
          .map((name) => name.common)
          .reduce((a: string[], b) => (a.includes(b) ? a : [...a, b]), [])
      : undefined;

    // add all fields to reducedCountry
    Object.keys(reducer).forEach(
      (field) =>
        (reducedCountry[field as unknown as keyof Country] =
          reducer[field](rawCountry))
    );

    return reducedCountry;
  });
};
