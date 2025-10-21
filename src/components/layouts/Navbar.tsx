import { NavLink } from "react-router";
import logo from "@/assets/Logo.png";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-30 py-4 shadow-sm bg-white">
      <div className="flex items-center gap-2">
        <img src={logo} alt="SIMS PPOB Logo" className="w-6 h-6" />
        <h1 className="font-semibold text-lg">SIMS PPOB</h1>
      </div>

      <div className="flex gap-8 text-sm font-medium">
        <NavLink
          to="/topup"
          className={({ isActive }) =>
            isActive ? "text-red-600" : "hover:text-red-600"
          }
        >
          Top Up
        </NavLink>
        <NavLink
          to="/transaction"
          className={({ isActive }) =>
            isActive ? "text-red-600" : "hover:text-red-600"
          }
        >
          Transaction
        </NavLink>
        <NavLink
          to="/akun"
          className={({ isActive }) =>
            isActive ? "text-red-600" : "hover:text-red-600"
          }
        >
          Akun
        </NavLink>
      </div>
    </nav>
  );
}
