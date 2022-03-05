import { FC } from "react";
import c from "./CountryPage.module.scss";
import BackButton from "./components/BackButton";
import CountryMain from "./components/CountryMain";

interface Props {}

const CountryPage: FC<Props> = (props) => {
  return (
    <main className={c.main}>
      <BackButton onClick={() => console.log("navigate to home")}/>
      <CountryMain/>

    </main>
  );
};

export default CountryPage;
