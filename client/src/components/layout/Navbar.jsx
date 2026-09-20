import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  Plane,
  LogOut,
  LayoutDashboard,
  Map,
  LogIn,
  UserPlus,
} from "lucide-react";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Frontend-only login state
  const isLoggedIn =
    localStorage.getItem("isLoggedIn") === "true";

  const closeMenu = () => {
    setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUser");

    setMobileMenuOpen(false);

    alert("Logged out successfully! 👋");
    navigate("/");
  };

  const navLinks = [
    {
      name: "Home",
      path: "/",
      icon: null,
    },
    {
      name: "Plan Trip",
      path: "/planner",
      icon: Map,
    },
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 shadow-sm backdrop-blur-md">
      <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* ================= LOGO ================= */}
        <Link
          to="/"
          onClick={closeMenu}
          className="flex min-w-0 items-center gap-2.5"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm transition duration-200 hover:scale-105">
            <Plane size={20} />
          </div>

          <span className="truncate text-base font-bold tracking-tight text-gray-900 sm:text-lg">
            AI Travel Planner
          </span>
        </Link>

        {/* ================= DESKTOP NAV ================= */}
        <div className="hidden items-center gap-1 md:flex">

          {navLinks.map((link) => {
            const active = location.pathname === link.path;
            const Icon = link.icon;

            return (
              <Link
                key={link.path}
                to={link.path}
                className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition duration-200 ${
                  active
                    ? "bg-indigo-50 text-indigo-600"
                    : "text-gray-600 hover:bg-gray-50 hover:text-indigo-600"
                }`}
              >
                {Icon && <Icon size={16} />}
                {link.name}
              </Link>
            );
          })}

          <div className="ml-2 h-6 w-px bg-gray-200" />

          {/* Logged in */}
          {isLoggedIn ? (
            <button
              type="button"
              onClick={handleLogout}
              className="ml-2 inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition duration-200 hover:border-red-200 hover:bg-red-50 hover:text-red-600"
            >
              <LogOut size={16} />
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="ml-1 inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-600 transition duration-200 hover:bg-gray-50 hover:text-indigo-600"
              >
                <LogIn size={16} />
                Login
              </Link>

              <Link
                to="/register"
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-md"
              >
                <UserPlus size={16} />
                Register
              </Link>
            </>
          )}
        </div>

        {/* ================= MOBILE BUTTON ================= */}
        <button
          type="button"
          onClick={() =>
            setMobileMenuOpen((prev) => !prev)
          }
          className="flex h-10 w-10 items-center justify-center rounded-xl text-gray-700 transition hover:bg-gray-100 md:hidden"
          aria-label={
            mobileMenuOpen
              ? "Close navigation menu"
              : "Open navigation menu"
          }
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? (
            <X size={23} />
          ) : (
            <Menu size={23} />
          )}
        </button>
      </nav>

      {/* ================= MOBILE NAV ================= */}
      {mobileMenuOpen && (
        <div className="border-t border-gray-200 bg-white shadow-lg md:hidden">
          <div className="mx-auto w-full max-w-7xl px-4 py-4 sm:px-6">

            <div className="flex flex-col gap-2">

              {navLinks.map((link) => {
                const active =
                  location.pathname === link.path;

                const Icon = link.icon;

                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={closeMenu}
                    className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                      active
                        ? "bg-indigo-50 text-indigo-600"
                        : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
                    }`}
                  >
                    {Icon ? (
                      <Icon size={18} />
                    ) : (
                      <Plane size={18} />
                    )}

                    {link.name}
                  </Link>
                );
              })}

              <div className="my-1 h-px bg-gray-100" />

              {/* Mobile logged-in state */}
              {isLoggedIn ? (
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              ) : (
                <div className="grid grid-cols-2 gap-2">

                  <Link
                    to="/login"
                    onClick={closeMenu}
                    className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                  >
                    <LogIn size={17} />
                    Login
                  </Link>

                  <Link
                    to="/register"
                    onClick={closeMenu}
                    className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
                  >
                    <UserPlus size={17} />
                    Register
                  </Link>

                </div>
              )}

            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;