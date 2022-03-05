import { FC } from "react";
import c from "./GridInfoRow.module.scss";

interface Props {
  label: string;
  value: string;
  hasOther?: [string];
}

const GridInfoRow: FC<Props> = (props) => {
  const hasOther = props.hasOther && (
    <span className={c.tooltip}>, and other</span>
  );
  return (
    <div>
      <label className={c.label}>{`${props.label}${hasOther ? 's': ''}: `}</label>
      <p>{props.value}{hasOther}</p>
    </div>
  );
};

export default GridInfoRow;
