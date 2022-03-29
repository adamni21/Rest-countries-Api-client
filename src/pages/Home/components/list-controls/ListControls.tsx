import { FC, FormEvent, useContext, useState } from "react";
import RegionSelect from "./RegionSelect";
import SearchBox from "./SearchBox";

import c from "./ListControls.module.scss";
import { CountriesContext } from "../../../../context/countries-context";
import { Region } from "../../../../context/types";

interface Props {}

const ListControls: FC<Props> = (props) => {
  const ctx = useContext(CountriesContext);
  const [searchValue, setSearchValue] = useState(ctx.searchValue);
  const [region, setRegion] = useState<Region>(ctx.region);
  const searchValueChangeHandler = (e: FormEvent<HTMLInputElement>) => {
    setSearchValue(e.currentTarget.value);
    ctx.setSearchValue(e.currentTarget.value);
  };
  const regionChangeHandler = (value: string) => {
    if (Object.values(Region).includes(value as Region)) {
      setRegion(value as Region);
      ctx.setRegion(value as Region);
    } else throw new TypeError(`value "${value}" is'nt of type Region`);
  };
  return (
    <div className={c.controls}>
      <SearchBox
        className={c.search}
        onChange={searchValueChangeHandler}
        value={searchValue}
      />
      <RegionSelect
        className={c.select}
        value={region}
        onChange={regionChangeHandler}
        placeholder="Filter by Region"
      >
        <option>America</option>
        <option>Europe</option>
        <option>Africa</option>
        <option>Asia</option>
        <option>Oceania</option>
        {region !== Region.all && (
          <option value="all">Reset (All Regions)</option>
        )}
      </RegionSelect>
    </div>
  );
};

export default ListControls;
