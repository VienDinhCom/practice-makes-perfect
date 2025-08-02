import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./lessons/13-props-and-state.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
