import Header from "./components/layout/Header";

import c from "./App.module.scss";
import { useState } from "react";

function App() {
  const [theme, setTheme] = useState("");
  const switchHandler = () => {
    setTheme(theme === "" ? "dark" : "");
  };
  return (
    <div className={c.App} data-theme={theme}>
      <Header onSwitch={switchHandler} theme={theme}></Header>
    </div>
  );
}

export default App;
