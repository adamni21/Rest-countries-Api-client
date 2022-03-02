import { FC } from "react";
import CountryGrid from "../countries/CountryGrid";
import ListControls from "../countries/list-controls/ListControls";

import c from "./Home.module.scss"

const Home: FC = () => {
  return (
    <main className={c.main}>
      <ListControls />
      <CountryGrid />
    </main>
  );
};

export default Home;
