import { FC, FormEvent, useState } from "react";
import RegionSelect from "./RegionSelect";
import SearchBox from "./SearchBox";

import c from "./ListControls.module.scss"

interface Props {
  
}


const ListControls: FC<Props> = props => {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("");
  const queryChangeHandler = (e: FormEvent<HTMLInputElement>) => {
    setQuery(e.currentTarget.value)
  }
  const selectChangeHandler = (value: string) => setRegion(value)
  return (
    <div className={c.controls}>
      <SearchBox className={c.search} onChange={queryChangeHandler} value={query}/>
      <RegionSelect className={c.select} value={region} onChange={selectChangeHandler} placeholder="Filter by Region">
        <option>America</option>
        <option>Europe</option>
        <option>Africa</option>
        <option>Asia</option>
        <option>Oceania</option>
        {region !== "" && <option value="">Reset (All Regions)</option>}
      </RegionSelect>
    </div>
  );
};


export default ListControls;