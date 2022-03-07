import { FC } from "react";
import c from "./GridInfoRow.module.scss";

interface Props {
  label: string;
  value: string | undefined;
  hasOther?: string[];
}

const GridInfoRow: FC<Props> = (props) => {
  const hasOther = props.hasOther?.length ? (
    <span className={c.tooltip} data-other={props.hasOther.join(", ")} >, <span className={c.dotted}>and other</span></span>
  ) : undefined;
  return (
    <div className={c.wrapper}>
      <label className={c.label}>
        {`${props.label}${hasOther ? "s" : ""}: `}
      </label>
      <p>
        {props.value ? props.value : "has no " + props.label}
        {hasOther}
      </p>
    </div>
  );
};

export default GridInfoRow;
