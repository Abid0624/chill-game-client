import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Link } from "react-router-dom";
import banner1 from "../assets/banner-1.avif";
import banner2 from "../assets/banner-2.avif";
import banner3 from "../assets/banner-3.avif";

const Home = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fakeGames = [
      {
        _id: "1",
        title: "Elden Ring",
        image: "https://i.ibb.co/7jBbwPk/elden-ring.jpg",
        rating: 9.8,
        genre: "Action RPG",
      },
      {
        _id: "2",
        title: "The Witcher 3",
        image: "https://i.ibb.co/b31TRQs/witcher-3.jpg",
        rating: 9.6,
        genre: "RPG",
      },
      {
        _id: "3",
        title: "Red Dead Redemption 2",
        image: "https://i.ibb.co/DKnLshj/red-dead.jpg",
        rating: 9.7,
        genre: "Adventure",
      },
      {
        _id: "4",
        title: "God of War",
        image: "https://i.ibb.co/6BJz1vc/god-of-war.jpg",
        rating: 9.5,
        genre: "Action",
      },
      {
        _id: "5",
        title: "Hollow Knight",
        image: "https://i.ibb.co/bL4ntcF/hollow-knight.jpg",
        rating: 9.4,
        genre: "Metroidvania",
      },
      {
        _id: "6",
        title: "Breath of the Wild",
        image: "https://i.ibb.co/B3h6wDw/zelda.jpg",
        rating: 9.6,
        genre: "Open World",
      },
    ];
    setGames(fakeGames);
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
          {games.map((game) => (
            <div
              key={game._id}
              className="bg-white shadow-lg rounded-lg overflow-hidden"
            >
              <img
                src={game.image}
                alt={game.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold">{game.title}</h3>
                <p className="text-gray-600">Genre: {game.genre}</p>
                <p className="text-yellow-600 font-medium">
                  Rating: {game.rating}
                </p>
                <Link to={`/game/${game._id}`}>
                  <button className="btn btn-primary mt-3">
                    Explore Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
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
      <section className="bg-gray-100 p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-4 text-center">
          Why GameReviewHub?
        </h2>
        <ul className="list-disc pl-5 text-gray-700 space-y-2">
          <li>Unbiased user reviews and ratings</li>
          <li>Track your watchlist and personal favorites</li>
          <li>Explore by genre and popularity</li>
          <li>Stay up-to-date with latest releases</li>
        </ul>
      </section>
    </div>
  );
};

export default Home;
