import { FC, useContext, useEffect } from "react";
import c from "./CountryPage.module.scss";
import BackButton from "./components/BackButton";
import CountryMain from "./components/CountryMain";
import { useNavigate, useParams } from "react-router-dom";
import filterCountries from "../../context/utils/filterCountries";
import { Region } from "../../context/types";
import { CountriesContext } from "../../context/countries-context";

interface Props {}

const CountryPage: FC<Props> = (props) => {
  const ctx = useContext(CountriesContext);
  const params = useParams();
  const navigate = useNavigate();
  // test from localStorage
  const countries = JSON.parse(localStorage.getItem("countries")!);
  useEffect(() => {
    // does not match any country name exact (case sensitive), I.e. is not a for a country "reserved" route
    if (!countries.find((country: any) => country.name.replaceAll(" ", "_") === params.country)) {
      // replace " " I.e. "%20" with "_" if necessary
      if (params.country?.includes(" "))
        navigate("../" + params.country.replaceAll(" ", "_"));

      const searchResult = filterCountries(
        params.country!,
        Region.all,
        countries,
        true
      );
      if (searchResult[0].rating === searchResult[1].rating) {
        ctx.setSearchValue(params.country!);
        ctx.setRegion(Region.all)
        navigate("../", { replace: true });
      } else {
        navigate("../" + searchResult[0].country.name.replaceAll(" ", "_"), {
          replace: true,
        });
      }
    }
  }, []);
  return (
    <main className={c.main}>
      <BackButton onClick={() => navigate("../")} />
      <CountryMain />
    </main>
  );
};

export default CountryPage;
