import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import App from "./App.jsx";
import NotesContextProvider from "./Context/NotesContextProvider.jsx";

createRoot(document.getElementById("root")).render(
  <NotesContextProvider>
    <App />
  </NotesContextProvider>
);
