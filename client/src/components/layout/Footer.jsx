
// FOOTER 

import { Link } from "react-router-dom";
import {
  MapPin,
  Mail,
  Phone,
  ArrowUpRight,
} from "lucide-react";
import travelLogo from "../../assets/travel-logo.png";

function Footer() {
  return (
    <footer className="w-full overflow-hidden bg-gray-950 text-white">
      {/*  MAIN FOOTER  */}
      <div className="mx-auto w-full max-w-7xl px-5 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        <div className="grid w-full grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-16">
          {/* BRAND */}
          <div className="min-w-0">
            <Link
              to="/"
              className="inline-flex items-center gap-3"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white p-1.5 shadow-sm">
                <img
                  src={travelLogo}
                  alt="AI Travel Planner logo"
                  className="h-full w-full object-contain"
                />
              </div>

              <span className="text-xl font-bold tracking-tight text-white">
                AI Travel Planner
              </span>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-6 text-gray-400 sm:text-base sm:leading-7">
              Plan smarter, organize your journey and create personalized
              travel experiences in one simple platform.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="text-base font-bold text-white sm:text-lg">
              Quick Links
            </h3>

            <nav className="mt-4 flex flex-col items-start gap-3 text-sm text-gray-400 sm:text-base">
              <Link
                to="/"
                className="inline-flex items-center gap-1.5 transition-colors duration-200 hover:text-white"
              >
                Home
              </Link>

              <Link
                to="/planner"
                className="inline-flex items-center gap-1.5 transition-colors duration-200 hover:text-white"
              >
                Plan Trip
                <ArrowUpRight size={14} />
              </Link>

              <Link
                to="/dashboard"
                className="inline-flex items-center gap-1.5 transition-colors duration-200 hover:text-white"
              >
                Dashboard
              </Link>

              <Link
                to="/login"
                className="inline-flex items-center gap-1.5 transition-colors duration-200 hover:text-white"
              >
                Login
              </Link>
            </nav>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="text-base font-bold text-white sm:text-lg">
              Travel Support
            </h3>

            <div className="mt-4 flex flex-col gap-3 text-sm text-gray-400 sm:text-base">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="mt-0.5 shrink-0 text-indigo-400" />
                <span>Travel planning platform · India</span>
              </div>

              <div className="flex items-start gap-3">
                <Mail size={18} className="mt-0.5 shrink-0 text-indigo-400" />
                <span>Personalized trip planning</span>
              </div>

              <div className="flex items-start gap-3">
                <Phone size={18} className="mt-0.5 shrink-0 text-indigo-400" />
                <span>Plan, save and explore your trips</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="border-t border-gray-800">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 px-5 py-5 text-xs text-gray-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:text-sm lg:px-8">
          <p>© 2026 AI Travel Planner. All Rights Reserved.</p>
          <p>Plan smarter. Travel better.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
