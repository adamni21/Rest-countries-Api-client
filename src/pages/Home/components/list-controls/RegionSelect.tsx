import { FC, MouseEventHandler, useEffect, useRef, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import c from "./RegionSelect.module.scss";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { Region } from "../../../../context/types";

interface Props {
  value: string;
  defaultValue?: string;
  placeholder?: string;
  className?: string;
  // for custom coloring
  headerClass?: string;
  optionsBoxClass?: string;

  onChange: (value: string) => any;
}

const RegionSelect: FC<Props> = ({
  children,
  onChange,
  placeholder,
  value,
  //for dimensions
  className,
  //for custom coloring
  headerClass,
  optionsBoxClass,
}) => {
  const [showOptions, setShowOptions] = useState(false);
  const selectRef = useRef<HTMLDivElement | null>(null);
  const handleOutsideClick = (e: MouseEvent) => {
    if (!selectRef.current?.contains(e.target as Node)) setShowOptions(false);
  };
  useEffect(() => {
    window.addEventListener("click", handleOutsideClick);
    return () => window.removeEventListener("click", handleOutsideClick);
  }, []);
  const selectHandler: MouseEventHandler = (e) => {
    if (e.target instanceof HTMLOptionElement) {
      if (onChange)
        onChange(
          e.target.hasAttribute("value") ? e.target.value : e.target.innerText
        );
      setShowOptions(false);
    }
  };
  const options = (
    <ul
      className={`${c.options} ${showOptions ? c.active : ""} ${
        optionsBoxClass ? optionsBoxClass : ""
      }`}
      onClick={selectHandler}
    >
      {children}
    </ul>
  );
  return (
    <div ref={selectRef} className={`${c.dropdown} ${className}`}>
      <div
        className={`${c.header} ${headerClass ? headerClass : ""}`}
        onClick={() => setShowOptions(!showOptions)}
      >
        <div className={c["value-container"]}>
          <div>{value === Region.all ? placeholder : value}</div>
        </div>
        <button className={`${c.button} ${showOptions ? c.active : ""}`}>
          <FontAwesomeIcon icon={faChevronDown} />
        </button>
      </div>
      {options}
    </div>
  );
};

export default RegionSelect;
