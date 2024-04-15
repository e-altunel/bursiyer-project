import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import i18next from "i18next";
import { I18nextProvider } from "react-i18next";
import global_tr from "./translations/tr/global.json";

i18next.init({
  interpolation: { escapeValue: false },
  lng: "tr",
  resources: {
    tr: {
      global: global_tr,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18next}>
        <App />
    </I18nextProvider>
  </React.StrictMode>
);
