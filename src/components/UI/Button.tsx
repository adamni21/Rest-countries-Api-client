import { FC } from "react";

import c from "./Button.module.scss"


interface Props {
    className?: string
    onClick: () => void
}


const Button: FC<Props> = props => {
  return (
        <button onClick={props.onClick}className={`${c.button} ${props.className}`}>{props.children}</button>
  );
};


export default Button;