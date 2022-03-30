import { FC } from "react";

import c from "./CountryCard.module.scss";

interface Props {
  name: string;
  population: number;
  region: string;
  capital?: string;
  flagUrl: string;
}

const CountryCard: FC<Props> = ({
  name,
  population,
  region,
  capital,
  flagUrl,
}) => {
  return (
    <div className={c["country-card"]}>
      <div className={c.flagContainer}>
        <img className={c.background} src={flagUrl} alt="" />
        <img className={c.flag} src={flagUrl} alt={`flag of ${name}`} />
      </div>
      <div className={c.info}>
        <h2>{name}</h2>
        <p>
          <span>Population: </span>
          {population}
        </p>
        <p>
          <span>Region: </span>
          {region}
        </p>
        <p>
          <span>Capital: </span>
          {capital || "Has no capital."}
        </p>
      </div>
    </div>
  );
};

export default CountryCard;
