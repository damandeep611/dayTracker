import App from "@/App";
import Dashboard from "@/components/dashboard/Dashboard";
import DashboardHero from "@/components/dashboard/HomeSection/DashboardHero";
import LandingPage from "@/components/layout/LandingPage";
import { createBrowserRouter } from "react-router";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [{ path: "/", element: <LandingPage /> }],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [{ path: "/dashboard/home", element: <DashboardHero /> }],
  },
];

export const router = createBrowserRouter(routes);
