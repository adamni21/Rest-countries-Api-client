import { FC, HTMLAttributes } from "react";
import c from "./CountryFlag.module.scss"

interface Props {
  flagUrl: string;
  countryName: string;
}

const CountryFlag: FC<Props> = (props) => {
  return (
    <div className={c.flagContainer} >
      <img className={c.flag} src={props.flagUrl} alt={`${props.countryName}'s Flag`} />
    </div>
  );
};

export default CountryFlag;
