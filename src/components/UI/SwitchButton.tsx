import { FC, ReactElement } from "react";

import c from "./SwitchButton.module.scss"


interface Props {
    isSwitched?: boolean
    switchedInner: string | ReactElement
    className?: string
    onClick: () => void
}


const SwitchModeButton: FC<Props> = props => {
    const btnInner = props.isSwitched ? props.switchedInner : props.children
  return (
        <button onClick={props.onClick}className={`${c["switch-button"]} ${props.className}`}>{btnInner}</button>
  );
};


export default SwitchModeButton;