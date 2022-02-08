import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";
import SwitchButton from "../UI/SwitchButton";
import { faMoon, faLightbulb } from "@fortawesome/free-regular-svg-icons";

import c from "./Header.module.scss";

interface Props {
  onSwitch: () => void;
  theme: string;
}

const Header: FC<Props> = (props) => {
  return (
    <header className={c.header}>
      <h1>Where in the World?</h1>
      <SwitchButton
        onClick={props.onSwitch}
        className={c.switch}
        switchedInner={
          <>
            <FontAwesomeIcon className={c.icon} icon={faLightbulb} />
            Bright Mode{" "}
          </>
        }
        isSwitched={props.theme === "dark"}
      >
        <FontAwesomeIcon className={c.icon} icon={faMoon} />
        Dark Mode
      </SwitchButton>
    </header>
  );
};

export default Header;
