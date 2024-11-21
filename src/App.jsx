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
import NotesView from "./Pages/NotesView";

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
  if (!isAuthenticated) alert("Please login first");
  return isAuthenticated ? children : <Navigate to={"/login"} />;
};

const router = createBrowserRouter([
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
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: (
          <PrivateRoute>
            <NotesView />
          </PrivateRoute>
        ),
      },
      {
        path: "notes/:noteId",
        element: (
          <PrivateRoute>
            <h1>Coming soon</h1>
          </PrivateRoute>
        ),
      },
      {
        path: "notes/new",
        element: (
          <PrivateRoute>
            <h1>Coming soon</h1>
          </PrivateRoute>
        ),
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
