import { FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-teal-600 to-slate-800 text-white shadow-md mt-20">
      <div className="container mx-auto px-4 py-10">
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Brand Info */}
          <div className="text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold">🎮 GameReviewHub</h2>
            <p className="font-semibold mt-2">Level up your game discovery!</p>
          </div>

          {/* Navigation Links - Stack on mobile, row on desktop */}
          <div className="grid grid-cols-2 md:grid-flow-col gap-4 md:gap-8 text-center">
            <a
              href="/about"
              className="link link-hover hover:text-teal-300 transition"
            >
              About
            </a>
            <a
              href="/all-reviews"
              className="link link-hover hover:text-teal-300 transition"
            >
              All reviews
            </a>
            <a
              href="/my-reviews"
              className="link link-hover hover:text-teal-300 transition"
            >
              My Reviews
            </a>
            <a
              href="/myWatchlist"
              className="link link-hover hover:text-teal-300 transition"
            >
              Watchlist
            </a>
          </div>

          {/* Social Icons - Center on mobile, flex on desktop */}
          <div className="flex justify-center space-x-6 md:space-x-4 text-2xl">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-400 transition"
            >
              <FaFacebook />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-sky-300 transition"
            >
              <FaTwitter />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-red-400 transition"
            >
              <FaYoutube />
            </a>
          </div>
        </div>

        {/* Copyright - Full width at bottom */}
        <div className="mt-8 pt-6 border-t border-teal-500 text-center">
          <p className="text-sm md:text-base">
            &copy; {new Date().getFullYear()} GameReviewHub — All rights
            reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
