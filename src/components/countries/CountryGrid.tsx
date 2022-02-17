import { FC, useContext, useEffect } from "react";
import { CountriesContext } from "../../context/countries-context";
// import { Country } from "../../context/types";
// import useHttp from "../../hooks/use-http";
import CountryCard from "./CountryCard";

import c from "./CountryGrid.module.scss";

interface Props {}

// const dataReducer = (raw: any): [Country] => {
//   return raw.map((country: any): Country => {
//     const nativeNames = country.name.nativeName
//       ? Object.values<{ common: string; official: string }>(
//           country.name.nativeName
//         ).map((name) => name.common)
//       : undefined;
//     return {
//       name: country.name.common,
//       nativeNames: nativeNames as [string],
//       capitals: country.capital,
//       languages: country.languages,
//       cca3: country.cca3,
//       borders: country.borders,
//       currencies: country.currencies,
//       region: country.region,
//       subRegion: country.subRegion,
//       population: country.population,
//       topLevelDomains: country.tld,
//       flagUrl: country.flags.png,
//     };
//   });
// };

const CountryGrid: FC<Props> = (props) => {
  // using local storage during developement
  // const {
  //   data: countries,
  //   error,
  //   isLoading,
  //   request,
  // } = useHttp(
  //   "https://restcountries.com/v3.1/all",
  //   dataReducer
  // );
  const ctx = useContext(CountriesContext);
  /* ###DELETE### */
  useEffect(() => {
    ctx.setCountries(JSON.parse(localStorage.getItem("countries")!));
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  /* ###/DELETE### */
  // using local storage during developement
  // useEffect(() => {
  //   request();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  // useEffect(() => {
  //   if (countries) ctx.setCountries(countries);
  // }, [countries, ctx]);

  // const content = isLoading ? (
  //   <h2>loading...</h2>
  // ) : error ? (
  //   <h2>something went wrong.</h2>
  // ) : (
  // );

  /* ###DELETE### */
  const content = ctx.countries.map((country) => (
    <CountryCard
      key={country.name}
      name={country.name}
      capital={country.capitals?.[0]}
      population={country.population}
      region={country.region}
      flagUrl={country.flagUrl}
    />
  ));
  /* ###/DELETE### */

  return <div className={c["country-grid"]}>{content}</div>;
};

export default CountryGrid;
