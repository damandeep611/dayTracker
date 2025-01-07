import { NavLink } from "react-router";

export default function Navigation() {
  return (
    <header className="h-16 px-8 bg-gray-100 flex items-center justify-between">
      <div>
        <NavLink to="/" className="text-xl font-bold hover:text-gray-500">
          Tracker..
        </NavLink>
      </div>
      <nav className="flex items-center justify-between gap-8 text-lg font-medium">
        <a href="#">Blog</a>
        <a href="#">Demo</a>
        <a href="#">Pricing</a>
        <NavLink to="/dashboard">Dashboard</NavLink>
      </nav>
      <div>
        <button className="bg-gray-800 text-white p-2 px-6 rounded-md">
          Log In
        </button>
      </div>
    </header>
  );
}
