import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold tracking-tight text-gray-900"
        >
          ✈️ TravelAI
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">

          <Link
            to="/"
            className="text-sm font-medium text-gray-700 transition hover:text-black"
          >
            Home
          </Link>

          <Link
            to="/planner"
            className="text-sm font-medium text-gray-700 transition hover:text-black"
          >
            Plan Trip
          </Link>

          <Link
            to="/dashboard"
            className="text-sm font-medium text-gray-700 transition hover:text-black"
          >
            Dashboard
          </Link>

        </div>

        {/* Desktop Auth */}
        <div className="hidden items-center gap-3 md:flex">

          <Link
            to="/login"
            className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
          >
            Sign Up
          </Link>

        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="rounded-lg p-2 hover:bg-gray-100 md:hidden"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t border-gray-200 bg-white px-6 py-5 md:hidden">

          <div className="flex flex-col gap-4">

            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className="font-medium text-gray-700"
            >
              Home
            </Link>

            <Link
              to="/planner"
              onClick={() => setIsMenuOpen(false)}
              className="font-medium text-gray-700"
            >
              Plan Trip
            </Link>

            <Link
              to="/dashboard"
              onClick={() => setIsMenuOpen(false)}
              className="font-medium text-gray-700"
            >
              Dashboard
            </Link>

            <div className="flex gap-3 border-t border-gray-100 pt-4">

              <Link
                to="/login"
                className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-center text-sm font-medium"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="flex-1 rounded-lg bg-black px-4 py-2 text-center text-sm font-medium text-white"
              >
                Sign Up
              </Link>

            </div>

          </div>

        </div>
      )}

    </nav>
  );
}

export default Navbar;