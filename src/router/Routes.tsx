import App from "@/App";
import Dashboard from "@/components/dashboard/Dashboard";
import LandingPage from "@/components/layout/LandingPage";
import { createBrowserRouter } from "react-router";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [{ path: "/", element: <LandingPage /> }],
  },
  { path: "/dashboard", element: <Dashboard /> },
];

export const router = createBrowserRouter(routes);
