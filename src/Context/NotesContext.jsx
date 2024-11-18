import { createContext, useState } from "react";
import PropType from "prop-types";

export const NotesContext = createContext(null);

function NotesContextProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  const contextValue = { isAuthenticated, login, logout };

  return (
    <NotesContext.Provider value={contextValue}>
      {children}
    </NotesContext.Provider>
  );
}

NotesContextProvider.propTypes = {
  children: PropType.node.isRequired,
};

export default NotesContextProvider;
