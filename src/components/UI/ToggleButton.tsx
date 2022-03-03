import { FC, ReactElement } from "react";

import c from "./Button.module.scss"


interface Props {
    isSwitched?: boolean
    switchedInner: string | ReactElement
    className?: string
    onClick: () => void
}


const ToggleButton: FC<Props> = props => {
    const btnInner = props.isSwitched ? props.switchedInner : props.children
  return (
        <button onClick={props.onClick}className={`${c.button} ${props.className}`}>{btnInner}</button>
  );
};


export default ToggleButton;