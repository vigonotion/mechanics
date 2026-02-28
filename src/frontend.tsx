import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles.css";

const elem = document.getElementById("root")!;

if (import.meta.hot) {
  const root = (import.meta.hot.data.root ??= createRoot(elem));
  root.render(<App />);
} else {
  createRoot(elem).render(<App />);
}
