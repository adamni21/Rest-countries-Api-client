import { FC, MouseEventHandler, useContext, useEffect } from "react";
import { CountriesContext } from "../../../../context/countries-context";
// import { Country } from "../../context/types";
// import useHttp from "../../hooks/use-http";
import CountryCard from "./CountryCard";

import c from "./CountryGrid.module.scss";
import foreignC from "./CountryCard.module.scss";
import { useNavigate } from "react-router-dom";
import { countryDataReducer, GetCountryData } from "../../../../queries/GetCountryData";
import useHttp from "../../../../hooks/use-http";

interface Props {}



const CountryGrid: FC<Props> = (props) => {
  const { data: countries, error, isLoading, request } = useHttp(countryDataReducer);
  const navigate = useNavigate();
  const ctx = useContext(CountriesContext);
  useEffect(() => {
    request(GetCountryData("all"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (countries) ctx.setCountries(countries);
  }, [countries, ctx]);

  const content = isLoading ? (
    <h2>loading...</h2>
  ) : error ? (
    <h2>something went wrong.</h2>
  ) : (
    ctx.countries.map((country) => (
      <CountryCard
        key={country.name}
        name={country.name}
        capital={country.capitals?.[0]}
        population={country.population}
        region={country.region}
        flagUrl={country.flagUrl?.png}
      />
    ))
  );
  const gridClickHandler: MouseEventHandler = (e) => {
    const targetElement = e.target as HTMLElement;
    // click on a countryCard
    if (targetElement.closest("." + foreignC["country-card"])) {
      const countryName = targetElement
        .closest("." + foreignC["country-card"])
        ?.querySelector("div:nth-child(2) h2")?.textContent;

      navigate("/" + countryName?.replaceAll(" ", "_"));
    }
  };

  return (
    <div className={c["country-grid"]} onClick={gridClickHandler}>
      {content}
    </div>
  );
};

export default CountryGrid;
