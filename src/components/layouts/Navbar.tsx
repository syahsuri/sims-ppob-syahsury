import { NavLink } from "react-router";
import { useState, useEffect } from "react";
import logo from "@/assets/Logo.png";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", isOpen);
    return () => document.body.classList.remove("overflow-hidden");
  }, [isOpen]);

  return (
    <nav className="bg-white shadow-sm px-4 py-4 md:px-22 flex items-center justify-between relative">
      {/* Logo */}
      <NavLink to="/home" className="flex items-center gap-2 hover:opacity-90">
        <img src={logo} alt="SIMS PPOB Logo" className="w-6 h-6" />
        <h1 className="font-semibold text-lg text-gray-900">SIMS PPOB</h1>
      </NavLink>

      {/* Desktop Links */}
      <div className="hidden md:flex gap-8 text-sm font-medium">
        <NavLink to="/topup" className={({ isActive }) => isActive ? "text-red-600" : "hover:text-red-600"}>Top Up</NavLink>
        <NavLink to="/transaction" className={({ isActive }) => isActive ? "text-red-600" : "hover:text-red-600"}>Transaction</NavLink>
        <NavLink to="/akun" className={({ isActive }) => isActive ? "text-red-600" : "hover:text-red-600"}>Akun</NavLink>
      </div>

      {/* Mobile Hamburger */}
      <button className="md:hidden focus:outline-none z-20" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-10 ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex flex-col mt-20 px-6 gap-6">
          <NavLink to="/home" className={({ isActive }) => isActive ? "text-red-600" : "text-gray-700 hover:text-red-600"} onClick={() => setIsOpen(false)}>Home</NavLink>
          <NavLink to="/topup" className={({ isActive }) => isActive ? "text-red-600" : "text-gray-700 hover:text-red-600"} onClick={() => setIsOpen(false)}>Top Up</NavLink>
          <NavLink to="/transaction" className={({ isActive }) => isActive ? "text-red-600" : "text-gray-700 hover:text-red-600"} onClick={() => setIsOpen(false)}>Transaction</NavLink>
          <NavLink to="/akun" className={({ isActive }) => isActive ? "text-red-600" : "text-gray-700 hover:text-red-600"} onClick={() => setIsOpen(false)}>Akun</NavLink>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black opacity-30 z-5" onClick={() => setIsOpen(false)} />}
    </nav>
  );
}
