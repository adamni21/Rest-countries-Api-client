import { FC } from "react";
import c from "./InfoHasMultiple.module.scss";

interface Props {
  additional?: string[];
}


const InfoHasMultiple: FC<Props> = (props) => {
  if (!props.additional) return null

  // removes duplicates
  const additional = props.additional.reduce((prev: string[], curr) => {
    if(!prev.includes(curr)) prev.push(curr)
    return prev
  }, [])

  const len = additional.length
  
  return (
    <span
    className={`${len > 1 && c.tooltip}`}
    data-other={
      additional.slice(0, -1).join(", ") +
      " and " +
      additional.slice(-1)
    }
    >
      {len === 1 && " and " + additional[0]}

      {len > 1 && ", "}
      {len > 1 && <span className={c.dotted}>and other</span>}
    </span>
  );
};


export default InfoHasMultiple;