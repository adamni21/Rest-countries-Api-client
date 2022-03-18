import { FC } from "react";
import c from "./CountryPage.module.scss";
import BackButton from "./components/BackButton";
import CountryMain from "./components/CountryMain";
import { useNavigate } from "react-router-dom";

interface Props {}

const CountryPage: FC<Props> = (props) => {
  const navigate = useNavigate();
  return (
    <main className={c.main}>
      <BackButton onClick={() => navigate("../")}/>
      <CountryMain/>

    </main>
  );
};

export default CountryPage;
