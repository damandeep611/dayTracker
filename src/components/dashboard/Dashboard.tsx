import { Outlet } from "react-router";
import Sidebar from "./Sidebar";

export default function Dashboard() {
  return (
    <div className="flex  h-screen bg-gray-50">
      <Sidebar />
      <main className="w-full">
        <Outlet />
      </main>
    </div>
  );
}
