import React from "react";
import { Link, useLoaderData } from "react-router-dom";

const AllReviews = () => {
  const games = useLoaderData();

  return (
    <div className="mt-20 w-11/12 mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">All Reviews</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {games.map((game) => (
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
    </div>
  );
};

export default AllReviews;
