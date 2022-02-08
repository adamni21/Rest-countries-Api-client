import Header from "./components/layout/Header";

import c from "./App.module.scss";
import { useEffect, useState } from "react";
import useHttp from "./hooks/use-http";

interface ProcessedData {
  name: string;
  continent: string;
  languages: [string];
  cca3: string;
  borders: [string];
}

const dataReducer = (raw: any): ProcessedData => {
  return {
    name: raw.name.common,
    continent: raw.continents[0],
    languages: raw.languages,
    cca3: raw.cca3,
    borders: raw.borders,
  }
};

function App() {
  const [theme, setTheme] = useState("");
  const { data, error, isLoading, request } = useHttp(
    "https://restcountries.com/v3.1/alpha/us",
    dataReducer
  );

  useEffect(() => {
    request()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  

  const switchHandler = () => {
    setTheme(() => (theme === "" ? "dark" : ""));
  };
  return (
    <div className={c.App} data-theme={theme}>
      <Header onSwitch={switchHandler} theme={theme}></Header>
      {isLoading && (
        <h2 style={{ textAlign: "center", padding: "2rem" }}>loading..</h2>
      )}
    </div>
  );
}

export default App;
