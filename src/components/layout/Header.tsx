import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";
import ToggleButton from "../UI/ToggleButton";
import { faMoon, faLightbulb } from "@fortawesome/free-regular-svg-icons";

import c from "./Header.module.scss";
import { useNavigate } from "react-router-dom";

interface Props {
  onSwitch: () => void;
  theme: string;
}

const Header: FC<Props> = (props) => {
  const navigate = useNavigate();
  const navigateHome = () => navigate("/");
  return (
    <header className={c.header}>
      <h1 onClick={navigateHome}>Where in the World?</h1>
      <ToggleButton
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
      </ToggleButton>
    </header>
  );
};

export default Header;
