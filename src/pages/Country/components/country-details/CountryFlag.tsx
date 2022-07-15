import { EventHandler, FC, SyntheticEvent } from "react";
import c from "./CountryFlag.module.scss";

interface Props {
  flagUrl: string;
  hideImg: boolean;
  onLoad: EventHandler<SyntheticEvent<HTMLImageElement>>;
  countryName: string;
}

const CountryFlag: FC<Props> = ({ flagUrl, hideImg, onLoad, countryName }) => (
  <div className={c.flagContainer}>
    <img
      className={`${c.flag} ${hideImg && c.hide}`}
      onLoad={onLoad}
      src={flagUrl}
      alt={`${countryName}'s Flag`}
    />
  </div>
);

export default CountryFlag;
