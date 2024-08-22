import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Profile from "./components/Profile";
import { useEffect } from "react";
import { auth } from "./firebase";
import { useState } from "react";

const App = () => {
  const [user, setUser] = useState();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  });
  const router = createBrowserRouter([
    {
      path: "/",
      element: user ? <Navigate to="/profile" /> : <Login />,
    },

    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signUp",
      element: <SignUp />,
    },
    {
      path: "/profile",
      element: <Profile />,
    },
  ]);
  return (
    <div className="h-[100svh] overflow-hidden">
      <RouterProvider router={router}> </RouterProvider>;
    </div>
  );
};

export default App;
