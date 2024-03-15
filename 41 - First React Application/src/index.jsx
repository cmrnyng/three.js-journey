import "./style.css";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

const root = createRoot(document.querySelector("#root"));

const toto = "there";

root.render(
  <App clickersCount={3}>
    <h1>My Second React App</h1>
    <h2>And a fancy subtitle</h2>
  </App>
);
