import { FC } from "react";
import c from "./GridInfoRow.module.scss";
import InfoHasMultiple from "./InfoHasMultiple";

interface Props {
  label: string;
  value: string | undefined;
  hasOther?: string[];
}

const GridInfoRow: FC<Props> = (props) => {
  
  
  return (
    <div className={c.wrapper}>
      <label className={c.label}>
        {`${
          !props.hasOther?.length
            ? props.label
            : props.label.slice(-1) === "y"
            ? props.label.slice(0, -1) + "ies"
            : props.label + "s"
        }: `}
      </label>
      <p className={c.value}>
        {props.value ? props.value : "has no " + props.label}
        <InfoHasMultiple additional={props.hasOther} />
      </p>
    </div>
  );
};

export default GridInfoRow;
