import { FC } from "react";
import c from "./BackButton.module.scss";

import Button from "../../../components/UI/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";


interface Props {
  onClick: () => any;
}

const BackButton: FC<Props> = (props) => {
  return (
    <Button className={c.backButton} onClick={props.onClick}>
      <FontAwesomeIcon className={c.icon} icon={faArrowLeftLong} />
      Back
    </Button>
  );
};

export default BackButton;
