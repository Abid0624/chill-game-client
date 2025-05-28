import { FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer footer-center p-10  bg-gradient-to-r from-teal-600 to-slate-800 text-white shadow-md  rounded mt-20">
      <div>
        <h2 className="text-3xl font-bold text-primary">🎮 GameReviewHub</h2>
        <p className="font-semibold">Level up your game discovery!</p>
        <div className="grid grid-flow-col gap-4">
          <a href="/about" className="link link-hover">
            About
          </a>
          <a href="/all-reviews" className="link link-hover">
            All reviews
          </a>
          <a href="/my-reviews" className="link link-hover">
            My Reviews
          </a>
          <a href="/myWatchlist" className="link link-hover">
            Watchlist
          </a>
        </div>
      </div>

      <div className="grid grid-flow-col gap-6 text-2xl">
        <a href="https://facebook.com" target="_blank" rel="noreferrer">
          <FaFacebook className="hover:text-blue-600 transition" />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noreferrer">
          <FaTwitter className="hover:text-sky-500 transition" />
        </a>
        <a href="https://youtube.com" target="_blank" rel="noreferrer">
          <FaYoutube className="hover:text-red-600 transition" />
        </a>
      </div>

      <div>
        <p>
          &copy; {new Date().getFullYear()} GameReviewHub — All rights reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
