import { FC, MouseEventHandler } from "react";
import { useNavigate } from "react-router-dom";
import c from "./CountryInfoGrid.module.scss";
import GridInfoRow from "./GridInfoRow";

interface Props {
  name: string;
  nativeNames?: string[];
  population: number;
  region: string;
  subRegion?: string;
  capitals?: string[];
  topLevelDomains?: string[];
  currencies?: string[];
  languages: string[];
  borders?: string[];
}

const CountryInfoGrid: FC<Props> = (props) => {
  const navigate = useNavigate();
  const borderCountryClickHandler: MouseEventHandler = (e) => {
    if (e.target instanceof HTMLSpanElement)
      navigate("./../" + e.target.textContent?.replaceAll(" ", "_"));
  };

  return (
    <div className={c.infoGrid}>
      <h1 className={c.countryName}>{props.name}</h1>
      <div className={c.info1}>
        <GridInfoRow
          label="Native Name"
          value={props.nativeNames?.[0]}
          hasOther={props.nativeNames?.slice(1)}
        />
        <GridInfoRow
          label="Population"
          value={props.population?.toLocaleString("en-US")}
        />
        <GridInfoRow label="Region" value={props.region} />
        <GridInfoRow label="Sub Region" value={props.subRegion} />
        <GridInfoRow
          label="Capital"
          value={props.capitals![0]}
          hasOther={props.capitals!.slice(1)}
        />
      </div>
      <div className={c.info2}>
        <GridInfoRow
          label="Top Level Domain"
          value={props.topLevelDomains?.[0]}
          hasOther={props.topLevelDomains?.slice(1)}
        />
        <GridInfoRow
          label="Currency"
          value={props.currencies?.[0]}
          hasOther={props.currencies?.slice(1)}
        />
        <GridInfoRow
          label="Language"
          value={Object.values(props.languages)[0]}
          hasOther={Object.values(props.languages).slice(1)}
        />
        <div className="infos"></div>
      </div>
      <div className={c.adjacent} onClick={borderCountryClickHandler}>
        <label>Border Countries:</label>
        {props.borders?.length ? (
          props.borders?.map((name) => (
            <span key={name}>
              {/* replace with router links */}
              {name}
            </span>
          ))
        ) : (
          <p>has no shared Border</p>
        )}
      </div>
    </div>
  );
};

export default CountryInfoGrid;
