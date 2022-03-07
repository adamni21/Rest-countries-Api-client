import { FC } from "react";
import c from "./CountryInfoGrid.module.scss";
import GridInfoRow from "./GridInfoRow";

interface Props {
  name: string;
  nativeNames: string[];
  population: number;
  region: string;
  subRegion?: string;
  capitals: string[];
  topLevelDomains: [string];
  currencies: [string];
  languages: [string];
  borders?: [string];
}

const CountryInfoGrid: FC<Props> = (props) => {
  return (
    <div className={c.infoGrid}>
      <h1 className={c.countryName}>{props.name}</h1>
      <div className={c.info1}>
        <GridInfoRow label="Native Name" value={props.nativeNames[0]} />
        <GridInfoRow
          label="Population"
          value={props.population?.toLocaleString("en-US")}
        />
        <GridInfoRow label="Region" value={props.region} />
        <GridInfoRow label="Sub Region" value={props.subRegion} />
        <GridInfoRow label="Capital" value={props.capitals[0]} />
      </div>
      <div className={c.info2}>
        <GridInfoRow
          label="Top Level Domain"
          value={props.topLevelDomains[0]}
        />
        <GridInfoRow label="Native Name" value={props.nativeNames[0]} />
        <GridInfoRow
          label="Language"
          value={Object.values(props.languages)[0]}
          hasOther={Object.values(props.languages).slice(1) }
        />
        <div className="infos"></div>
      </div>
    </div>
  );
};

export default CountryInfoGrid;
