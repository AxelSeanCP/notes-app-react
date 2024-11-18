import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";
import { useContext } from "react";
import { NotesContext } from "./Context/NotesContext";
import PropType from "prop-types";

import Navbar from "./Components/Navbar/Navbar";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import Logout from "./Pages/Logout";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useContext(NotesContext);
  return isAuthenticated ? children : <Navigate to={"/login"} />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: (
          <PrivateRoute>
            <h1>Welcome to Notes App</h1>
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/logout",
        element: <Logout />,
      },
      {
        path: "/about",
      },
    ],
  },
]);

PrivateRoute.propTypes = {
  children: PropType.node.isRequired,
};

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
