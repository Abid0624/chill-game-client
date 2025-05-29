import React, { useContext, useState, useEffect } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { Slide } from "react-awesome-reveal";

const AllReviews = () => {
  const games = useLoaderData();
  const { theme } = useContext(AuthContext);

  const [filteredGames, setFilteredGames] = useState([...games]);
  const [selectedGenre, setSelectedGenre] = useState("All");

  // 🔹 Extract unique genres
  const genres = ["All", ...new Set(games.map((game) => game.genre))];

  // 🔹 Filter games when genre changes
  useEffect(() => {
    if (selectedGenre === "All") {
      setFilteredGames(games);
    } else {
      const filtered = games.filter((game) => game.genre === selectedGenre);
      setFilteredGames(filtered);
    }
  }, [selectedGenre, games]);

  // 🔹 Sort by Rating (Descending)
  const handleSortByRating = () => {
    const sorted = [...filteredGames].sort((a, b) => b.rating - a.rating);
    setFilteredGames(sorted);
  };

  // 🔹 Sort by Year (Ascending)
  const handleSortByYear = () => {
    const sorted = [...filteredGames].sort((a, b) => a.year - b.year);
    setFilteredGames(sorted);
  };

  return (
    <div
      className={`mt-20 w-11/12 mx-auto ${
        theme === "dark" ? "text-white" : "text-gray-800"
      }`}
    >
      {/* 🔹 Header and Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-3xl font-bold text-center sm:text-left">
          All Reviews
        </h2>

        {/* 🔹 Genre Filter Dropdown */}
        <div className="flex items-center gap-2">
          <label htmlFor="genre" className="font-semibold">
            Filter by Genre:
          </label>
          <select
            id="genre"
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="select select-bordered"
          >
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 🔹 Sorting Buttons */}
      <div className="flex flex-wrap gap-4 justify-center sm:justify-end mb-6">
        <button
          onClick={handleSortByRating}
          className="btn btn-secondary"
          disabled={filteredGames.length === 0}
        >
          Sort by Rating (High to Low)
        </button>
        <button
          onClick={handleSortByYear}
          className="btn btn-accent"
          disabled={filteredGames.length === 0}
        >
          Sort by Year (Old to New)
        </button>
      </div>

      {/* 🔹 Game Cards */}
      {filteredGames.length === 0 ? (
        <p className="text-center text-gray-500">
          No games found for this genre.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredGames.map((game, index) => (
            <Slide
              key={game._id}
              direction={index % 2 === 0 ? "left" : "right"}
              damping={0.2}
              triggerOnce
            >
              <div
                className={`shadow-lg rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 ${
                  theme === "dark" ? "bg-gray-900" : "bg-white"
                }`}
              >
                <img
                  src={game.thumbnail}
                  alt={game.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold">{game.title}</h3>
                  <p
                    className={`${
                      theme === "dark" ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    Genre: {game.genre}
                  </p>
                  <p className="text-yellow-500 font-medium">
                    Rating: {game.rating}
                  </p>
                  <p className="text-sm">Year: {game.year}</p>
                  <Link to={`/review/${game._id}`}>
                    <button className="btn btn-primary mt-3">
                      Explore Details
                    </button>
                  </Link>
                </div>
              </div>
            </Slide>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllReviews;
