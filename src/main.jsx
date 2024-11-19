import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import NotesContextProvider from "./Context/NotesContextProvider.jsx";

createRoot(document.getElementById("root")).render(
  <NotesContextProvider>
    <App />
  </NotesContextProvider>
);
