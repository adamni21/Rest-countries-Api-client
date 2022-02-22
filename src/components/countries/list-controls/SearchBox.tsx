import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, FormEvent, useRef } from "react";

import c from "./SearchBox.module.scss";

interface Props {
  onChange: (event: FormEvent<HTMLInputElement>) => void;
  className?: string;
  value: string;
}

const SearchBox: FC<Props> = (props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div className={`${c.box} ${props.className}`} onClick={() => {inputRef.current?.focus()}} >
      <span>
        <FontAwesomeIcon icon={faMagnifyingGlass}></FontAwesomeIcon>
      </span>
      <input ref={inputRef} value={props.value} onChange={props.onChange} className={c.input}></input>
    </div>
  );
};

export default SearchBox;
