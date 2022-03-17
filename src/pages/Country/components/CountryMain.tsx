import { FC, useContext, useEffect } from "react";
import { CountriesContext } from "../../../context/countries-context";
import CountryFlag from "./country-details/CountryFlag";
import CountryInfoGrid from "./country-details/CountryInfoGrid";
import c from "./CountryMain.module.scss";

interface Props {}

const CountryMain: FC<Props> = (props) => {
  const ctx = useContext(CountriesContext);
  const country = ctx.countries.find((country) => country.name === "Australia"); // Sonna come from urlParams
  const borders = country?.borders?.map(cca3 => ctx.countries.find(country => country.cca3 === cca3)!.name) as [string] | undefined
  
  useEffect(() => {
    ctx.setCountries(JSON.parse(localStorage.getItem("countries")!));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // TODO: fetch svgurl from api, when not using local data anymore
  const svgUrl = country?.flagUrl.replaceAll(/\/w320|png/g, "") + "svg";

  return (
    <div className={c.main}>
      {country && (
        <>
          <CountryFlag flagUrl={svgUrl} countryName={country.name} />
          <CountryInfoGrid
            name={country.name}
            nativeNames={country.nativeNames}
            population={country.population}
            region={country.region}
            subRegion={country.subRegion}
            capitals={country.capitals}
            topLevelDomains={country.topLevelDomains}
            currencies={country.currencies}
            languages={country.languages}
            borders={borders}
          />
        </>
      )}
    </div>
  );
};

export default CountryMain;
