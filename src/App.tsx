import { useState } from "react";

import c from "./App.module.scss";
import Header from "./components/layout/Header";
import Home from "./components/pages/Home";

function App() {
  const [theme, setTheme] = useState("");

  const toggleThemeHandler = () => {
    setTheme(() => (theme === "" ? "dark" : ""));
  };

  return (
    <div className={c.App} data-theme={theme}>
      <Header onSwitch={toggleThemeHandler} theme={theme}></Header>
      <Home />
    </div>
  );
}

export default App;
