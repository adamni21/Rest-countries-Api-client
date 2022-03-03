import { FC } from "react";
import CountryGrid from "./components/countries/CountryGrid";
import ListControls from "./components/list-controls/ListControls";

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
