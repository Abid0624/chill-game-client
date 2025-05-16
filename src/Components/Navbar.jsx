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
    <div>
      <nav className="fixed top-0 w-full z-50 bg-gradient-to-r from-teal-600 to-slate-800 text-white shadow-md p-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
          {/* Left: Logo */}
          <Link to="/" className="flex flex-wrap items-center mb-4 md:mb-0">
            <img
              className="w-10 h-10 rounded-full shadow-lg"
              src={logo}
              alt="Logo"
            />
            <span className="text-xl font-bold text-white ml-2">
              GameReviewHub
            </span>
          </Link>

          {/* Center: Navigation links */}
          <div
            className={`flex-col md:flex md:flex-row md:items-center md:space-x-6 ${
              menuOpen ? "flex" : "hidden"
            }`}
          >
            <NavLink
              to="/"
              className="hover:text-gray-200 flex items-center my-1 md:my-0"
            >
              <FiHome className="mr-1" /> Home
            </NavLink>
            <NavLink
              to="/add-review"
              className="hover:text-gray-200 flex items-center my-1 md:my-0"
            >
              <FiPlus className="mr-1" /> Add Review
            </NavLink>
            <NavLink
              to="/my-reviews"
              className="hover:text-gray-200 flex items-center my-1 md:my-0"
            >
              <FiList className="mr-1" /> My Reviews
            </NavLink>
            <NavLink
              to="/watchlist"
              className="hover:text-gray-200 flex items-center my-1 md:my-0"
            >
              <FiStar className="mr-1" /> Watchlist
            </NavLink>
            <NavLink
              to="/about"
              className="hover:text-gray-200 flex items-center my-1 md:my-0"
            >
              <FiInfo className="mr-1" /> About Dev
            </NavLink>
          </div>

          {/* Right: Auth Buttons */}
          {user?.email ? (
            <div className="flex items-center gap-4">
              <img
                src={user.photoURL || "/default-avatar.png"}
                alt="User"
                className="w-10 h-10 rounded-full border-2 border-white object-cover"
              />
              <div className="flex flex-col">
                <span className="font-bold">{user.displayName || "User"}</span>
                <span className="text-sm">{user.email}</span>
              </div>
              <button onClick={logout} className="btn btn-warning px-4 py-2">
                Log Out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <button className="btn btn-warning px-4 py-2">Login</button>
              </Link>
              <Link to="/register">
                <button className="btn btn-accent px-4 py-2">Register</button>
              </Link>
            </div>
          )}

          {/* Hamburger Toggle for Mobile */}
          <button
            className="md:hidden absolute top-4 right-4 text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
