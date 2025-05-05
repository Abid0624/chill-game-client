import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Link, useLoaderData } from "react-router-dom";
import banner1 from "../assets/banner-1.avif";
import banner2 from "../assets/banner-2.avif";
import banner3 from "../assets/banner-3.avif";
import AOS from "aos";
import "aos/dist/aos.css";

const Home = () => {
  const games = useLoaderData();

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  return (
    <div className="mt-20 px-4 space-y-12">
      {/* Swiper Banner */}
      <section>
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper rounded-xl"
        >
          <SwiperSlide>
            <img
              src={banner1}
              alt="Banner 1"
              className="w-full h-64 md:h-96 object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src={banner2}
              alt="Banner 2"
              className="w-full h-64 md:h-96 object-cover"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src={banner3}
              alt="Banner 3"
              className="w-full h-64 md:h-96 object-cover"
            />
          </SwiperSlide>
        </Swiper>
      </section>

      {/* Highest Rated Game Section */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-8">
          Highest Rated Games
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...games]
            .sort((a, b) => b.rating - a.rating)
            .slice(0, 6)
            .map((game) => (
              <div
                key={game._id}
                className="bg-white shadow-lg rounded-lg overflow-hidden"
              >
                <img
                  src={game.thumbnail}
                  alt={game.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold">{game.title}</h3>
                  <p className="text-gray-600">Genre: {game.genre}</p>
                  <p className="text-yellow-600 font-medium">
                    Rating: {game.rating}
                  </p>
                  <Link to={`/review/${game._id}`}>
                    <button className="btn btn-primary mt-3">
                      Explore Details
                    </button>
                  </Link>
                </div>
              </div>
            ))}
        </div>
        <div className="my-3">
          <Link
            to="all-reviews"
            className="btn btn-accent my-3 mx-4 text-black"
          >
            Show More
          </Link>
        </div>
      </section>

      {/* Extra Section 1: Trending Genres */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-6">Trending Genres</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {["RPG", "Action", "Open World", "Shooter", "Strategy"].map(
            (genre, idx) => (
              <span
                key={idx}
                className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold shadow"
              >
                {genre}
              </span>
            )
          )}
        </div>
      </section>

      {/* Extra Section 2: Why GameReviewHub? */}
      <section
        className="bg-gradient-to-r from-teal-600 to-slate-800 text-white p-10 rounded-2xl shadow-xl"
        data-aos="fade-up"
      >
        <h2
          className="text-4xl font-bold text-center mb-6"
          data-aos="fade-down"
          data-aos-delay="100"
        >
          Why GameReviewHub?
        </h2>
        <ul className="list-none pl-0 max-w-2xl mx-auto space-y-5 text-lg">
          <li
            className="flex items-start gap-3"
            data-aos="fade-right"
            data-aos-delay="200"
          >
            <span className="text-green-300 text-xl">✅</span>
            <span>Unbiased user reviews and ratings</span>
          </li>
          <li
            className="flex items-start gap-3"
            data-aos="fade-left"
            data-aos-delay="300"
          >
            <span className="text-green-300 text-xl">✅</span>
            <span>Track your watchlist and personal favorites</span>
          </li>
          <li
            className="flex items-start gap-3"
            data-aos="fade-right"
            data-aos-delay="400"
          >
            <span className="text-green-300 text-xl">✅</span>
            <span>Explore by genre and popularity</span>
          </li>
          <li
            className="flex items-start gap-3"
            data-aos="fade-left"
            data-aos-delay="500"
          >
            <span className="text-green-300 text-xl">✅</span>
            <span>Stay up-to-date with latest releases</span>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default Home;
