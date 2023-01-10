import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import StaffSignup from "./pages/auth/staff/StaffSignup";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import axios from "axios";
import StaffLogin from "./pages/auth/staff/StaffLogin";
import StudentSignup from "./pages/auth/student/StudentSignup";
import StudentLogin from "./pages/auth/student/StudentLogin";
import Profile from "./pages/Profile";
import Send from "./pages/message/Send";
import Logout from "./pages/auth/Logout";
import { useAuthContext } from "./hooks/useAuthContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/auth/login/staff",
        element: <StaffLogin />,
      },
      {
        path: "/auth/signup/staff",
        element: <StaffSignup />,
      },
      {
        path: "/auth/signup/student",
        element: <StudentSignup />,
      },
      {
        path: "/auth/login/student",
        element: <StudentLogin />,
      },
      {
        path: "/auth/logout",
        element: <Logout />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/message",
        children: [
          {
            path: "send/",
            element: <Send />,
          },
        ],
      },
    ],
    errorElement: <NotFound />,
  },
]);

function App() {
  if (window.location.href.indexOf("localhost") !== -1)
    axios.defaults.baseURL = `http://localhost:5000`;
  else axios.defaults.baseURL = "/";
  return <RouterProvider router={router} />;
}

export default App;
