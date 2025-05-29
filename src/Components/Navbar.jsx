import { Link, NavLink } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import {
  FiMenu,
  FiX,
  FiHome,
  FiPlus,
  FiList,
  FiStar,
  FiInfo,
} from "react-icons/fi";
import logo from "../assets/logo.png";
import AOS from "aos";
import "aos/dist/aos.css";
import { AuthContext } from "../providers/AuthProvider";
import Loading from "../Components/Loading";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout, loading } = useContext(AuthContext);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  if (loading) return <Loading></Loading>;

  return (
    <div className="fixed top-0 w-full z-50 bg-gradient-to-r from-teal-600 to-slate-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 relative">
          {/* Left: Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center">
            <img
              className="w-10 h-10 rounded-full shadow-lg"
              src={logo}
              alt="Logo"
            />
            <span className="text-xl font-bold text-white ml-2">
              GameReviewHub
            </span>
          </Link>

          {/* Center: Navigation links - hidden on mobile */}
          <div className="hidden md:flex md:items-center md:space-x-6 mx-4">
            <NavLink
              to="/"
              className="hover:text-gray-200 flex items-center px-3 py-2"
            >
              <FiHome className="mr-1" /> Home
            </NavLink>
            <NavLink
              to="/add-review"
              className="hover:text-gray-200 flex items-center px-3 py-2"
            >
              <FiPlus className="mr-1" /> Add Review
            </NavLink>
            <NavLink
              to="/my-reviews"
              className="hover:text-gray-200 flex items-center px-3 py-2"
            >
              <FiList className="mr-1" /> My Reviews
            </NavLink>
            <NavLink
              to="/watchlist"
              className="hover:text-gray-200 flex items-center px-3 py-2"
            >
              <FiStar className="mr-1" /> Watchlist
            </NavLink>
          </div>

          {/* Right: Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user?.email ? (
              <div className="flex items-center space-x-3">
                <img
                  src={user.photoURL || "/default-avatar.png"}
                  alt="User"
                  className="w-8 h-8 rounded-full border-2 border-white object-cover"
                />
                <button
                  onClick={logout}
                  className="bg-amber-500 hover:bg-amber-600 px-3 py-1 rounded text-sm"
                >
                  Log Out
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login">
                  <button className="bg-amber-500 hover:bg-amber-600 px-3 py-1 rounded text-sm">
                    Login
                  </button>
                </Link>
                <Link to="/register">
                  <button className="bg-teal-500 hover:bg-teal-600 px-3 py-1 rounded text-sm">
                    Register
                  </button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-gray-200 focus:outline-none"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${menuOpen ? "block" : "hidden"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-slate-900">
          <NavLink
            to="/"
            className="hover:text-gray-200 flex items-center px-3 py-2"
            onClick={() => setMenuOpen(false)}
          >
            <FiHome className="mr-2" /> Home
          </NavLink>
          <NavLink
            to="/add-review"
            className="hover:text-gray-200 flex items-center px-3 py-2"
            onClick={() => setMenuOpen(false)}
          >
            <FiPlus className="mr-2" /> Add Review
          </NavLink>
          <NavLink
            to="/my-reviews"
            className="hover:text-gray-200 flex items-center px-3 py-2"
            onClick={() => setMenuOpen(false)}
          >
            <FiList className="mr-2" /> My Reviews
          </NavLink>
          <NavLink
            to="/watchlist"
            className="hover:text-gray-200 flex items-center px-3 py-2"
            onClick={() => setMenuOpen(false)}
          >
            <FiStar className="mr-2" /> Watchlist
          </NavLink>

          {user?.email ? (
            <div className="pt-4 border-t border-gray-700">
              <div className="flex items-center px-3 py-2">
                <img
                  src={user.photoURL || "/default-avatar.png"}
                  alt="User"
                  className="w-8 h-8 rounded-full border-2 border-white object-cover mr-3"
                />
                <div>
                  <p className="text-sm font-medium">
                    {user.displayName || "User"}
                  </p>
                  <p className="text-xs text-gray-400">{user.email}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
                className="w-full mt-2 bg-amber-500 hover:bg-amber-600 px-3 py-2 rounded text-left flex items-center"
              >
                Log Out
              </button>
            </div>
          ) : (
            <div className="pt-4 border-t border-gray-700 space-y-2">
              <Link
                to="/login"
                className="block bg-amber-500 hover:bg-amber-600 px-3 py-2 rounded text-center"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block bg-teal-500 hover:bg-teal-600 px-3 py-2 rounded text-center"
                onClick={() => setMenuOpen(false)}
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
