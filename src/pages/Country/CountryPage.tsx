import { FC, useContext, useEffect } from "react";
import c from "./CountryPage.module.scss";
import BackButton from "./components/BackButton";
import CountryMain from "./components/CountryMain";
import { useNavigate, useParams } from "react-router-dom";
import { Country, Region } from "../../context/types";
import { CountriesContext } from "../../context/countries-context";
import useHttp from "../../hooks/use-http";
import {
  countryDataReducer,
  GetCountryData,
} from "../../queries/GetCountryData";

const getMissingBorderCca3 = (
  countriesPresent: Country[],
  neededCca3s: string[]
) => {
  countriesPresent.every(({ cca3 }) => {
    neededCca3s.every((neededCca, i) => {
      if (neededCca === cca3) {
        neededCca3s.splice(i, 1);
        return false;
      } else return true;
    });
    // quit when neededCca3s is empty
    return neededCca3s.length;
  });

  return neededCca3s;
};

interface Props {}

const CountryPage: FC<Props> = (props) => {
  const ctx = useContext(CountriesContext);
  const params = useParams();
  const navigate = useNavigate();
  const {
    data: responseData,
    error,
    isLoading,
    request,
  } = useHttp(countryDataReducer);
  const apiCountryName = params.country!.replaceAll("_", " ");
  const urlCountryName = params.country!.replaceAll(" ", "_");

  // redirect to correct url format
  useEffect(() => {
    // replace " " I.e. "%20" with "_" if necessary
    if (params.country!.includes(" ")) navigate("./../" + urlCountryName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const currentCountry = ctx.countries.find(
    (country) => apiCountryName === country?.name
  );
  // onMount: fetch data of country if not already present in countriesContext
  useEffect(() => {
    // if it's not a valid "country-url" or is'nt yet present in "CountriesContext"
    if (!currentCountry) {
      request(
        GetCountryData("name", {
          subRoute: apiCountryName,
        })
      );
    }
    // onMount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const missingCountryData = getMissingBorderCca3(
    ctx.countries,
    currentCountry ? [...currentCountry.borders!] : [] || []
  );
  // fetch missing neighbouring countries
  useEffect(() => {
    if (currentCountry) {
      if (missingCountryData.length && !isLoading) {
        request(GetCountryData("alpha", { codes: missingCountryData }));
      }
    }
  }, [currentCountry, ctx.countries, request, isLoading, missingCountryData]);
  // handle fetch responses
  useEffect(() => {
    if (error?.status === 404) {
      ctx.setSearchValue(apiCountryName);
      ctx.setRegion(Region.all);
      navigate("./..", { replace: true });
    }
    if (responseData) {
      // handling search response
      if (!currentCountry) {
        // matches more than one country
        if (responseData.length > 1) {
          ctx.setSearchValue(apiCountryName);
          ctx.setRegion(Region.all);
          navigate("./..", { replace: true });
        }
        // found a single country, redirect to appropriate url
        else {
          ctx.setCountries(responseData);
          navigate("./../" + responseData[0].name.replaceAll(" ", "_"), {
            replace: true,
          });
        }
      }
      // handling missing border responseData response
      else if (missingCountryData.length) {
        // "push" responseData only if it's not currentCountry and therefore the response with the missing countries
        if (responseData[0].name !== currentCountry.name)
          ctx.setCountries(ctx.countries.concat(responseData));
      }
    }
  }, [
    responseData,
    error,
    apiCountryName,
    currentCountry,
    navigate,
    missingCountryData,
    ctx,
  ]);

  if (error) return <h2>Something went wrong, please try again.</h2>;
  if (isLoading || !currentCountry)
    return <h2>Looking for country with that name...</h2>;
  return (
    <main className={c.main}>
      <BackButton onClick={() => navigate("./..")} />
      <CountryMain country={currentCountry!} />
    </main>
  );
};

export default CountryPage;
