import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";

function App() {
  const [t,] = useTranslation("global");

  return (
    <Routes>
      <Route path="/" element={<h1>{t("home.title")}</h1>} />
      <Route path="/about" element={<h1>About</h1>} />
    </Routes>
  );
}

export default App;
