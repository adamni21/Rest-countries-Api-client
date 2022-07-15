import { FC, SyntheticEvent, useContext, useEffect, useState } from "react";
import { CountriesContext } from "../../../context/countries-context";
import { Country } from "../../../context/types";
import CountryFlag from "./country-details/CountryFlag";
import CountryInfoGrid from "./country-details/CountryInfoGrid";
import c from "./CountryMain.module.scss";

interface Props {
  country: Country;
}

const CountryMain: FC<Props> = ({ country }) => {
  const ctx = useContext(CountriesContext);
  const [borders, setBorders] = useState<string[]>([]);
  const [hideImage, setHideImage] = useState(true);

  const imageLoadedHandler = (e: SyntheticEvent) =>
    setHideImage(!(e.target as HTMLImageElement).complete);

  console.log(hideImage);

  useEffect(() => setHideImage(true), [country]);

  // set borders when fetched
  useEffect(() => {
    const tempBorders: string[] = [];

    // checking wether missing an neighbouring country while pushing to tempBorders
    const allPresent = country.borders?.every((cca3) => {
      const result = ctx.countries.find((country) => country.cca3 === cca3);
      // if country was found push name
      if (result) return tempBorders.push(result.name);
      // country is missing
      else return false;
    });

    if (allPresent) setBorders(tempBorders);
    else setBorders(["one moment, already going along the border..."]);
  }, [ctx.countries, country]);

  return (
    <div className={c.main}>
      {country && (
        <>
          <CountryFlag
            hideImg={hideImage}
            onLoad={imageLoadedHandler}
            flagUrl={country.flagUrl.svg}
            countryName={country.name}
          />
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
