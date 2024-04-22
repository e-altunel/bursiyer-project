import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

import { Provider } from "react-redux";
import { store } from "./store";

import { AuthProvider } from "./context/AuthContext";

import i18next from "i18next";
import { I18nextProvider } from "react-i18next";
import global_tr from "./translations/tr/global.json";

import "bootstrap/dist/css/bootstrap.min.css";

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
    <Provider store={store}>
      <AuthProvider>
        <I18nextProvider i18n={i18next}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </I18nextProvider>
      </AuthProvider>
    </Provider>
  </React.StrictMode>
);
