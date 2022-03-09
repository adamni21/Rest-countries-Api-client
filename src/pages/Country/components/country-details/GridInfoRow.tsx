import { FC } from "react";
import c from "./GridInfoRow.module.scss";

interface Props {
  label: string;
  value: string | undefined;
  hasOther?: string[];
}

const GridInfoRow: FC<Props> = (props) => {
  const hasOther = props.hasOther?.length ? (
    <span
      className={c.tooltip}
      data-other={
        props.hasOther.slice(0, -1).join(", ") +
        " and " +
        props.hasOther.slice(-1)
      }
    >
      , <span className={c.dotted}>and other</span>
    </span>
  ) : undefined;
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
        {hasOther}
      </p>
    </div>
  );
};

export default GridInfoRow;
