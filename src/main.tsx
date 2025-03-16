import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { HashRouter } from "react-router-dom";

import { store } from "./redux/store.js";
import { Provider } from "react-redux";

const rootElem = document.getElementById("root");

if (rootElem) {
  const root = createRoot(rootElem);
  root.render(
    // <StrictMode>
    <HashRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </HashRouter>
    // </StrictMode>
  );
}
