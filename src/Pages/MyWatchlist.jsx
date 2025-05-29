import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import emptyWatchlistAnimation from "../assets/Animation - 1748511260033.json";
import Swal from "sweetalert2";
import Loading from "../Components/Loading";
import { Player } from "@lottiefiles/react-lottie-player";

const MyWatchlist = () => {
  const { user, loading, setLoading, theme } = useContext(AuthContext);

  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:5000/watchlist?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setWatchlist(data);
          setLoading(false);
        });
    }
  }, [user]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This game will be removed from your watchlist.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/watchlist/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire("Deleted!", "Game removed from watchlist.", "success");
              setWatchlist(watchlist.filter((item) => item._id !== id));
            }
          });
      }
    });
  };

  if (loading) {
    return <Loading />;
  }

  if (watchlist.length === 0) {
    return (
      <div className="flex flex-col items-center mt-24">
        <Player
          autoplay
          loop
          src={emptyWatchlistAnimation}
          style={{ height: "300px", width: "300px" }}
        />
        <div
          className={`text-3xl font-bold mt-4 ${
            theme === "dark" ? "text-white" : "text-gray-800"
          }`}
        >
          Your watchlist is empty.
        </div>
      </div>
    );
  }

  return (
    <div
      className={`max-w-5xl mx-auto mt-24 p-6 shadow-md rounded-lg ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-800"
      }`}
    >
      <h2 className="text-3xl font-bold mb-6 text-center">My Watchlist</h2>
      <div className="overflow-x-auto space-y-2">
        <table className="table w-full">
          <thead>
            <tr
              className={`${
                theme === "dark" ? "bg-gray-800" : "bg-gray-100"
              } text-left`}
            >
              <th className="p-3">Image</th>
              <th className="p-3">Title</th>
              <th className="p-3">Genre</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {watchlist.map((game) => (
              <tr
                key={game._id}
                className={`border-t ${
                  theme === "dark" ? "border-gray-700" : "border-gray-300"
                }`}
              >
                <td className="p-3">
                  <img
                    src={game.thumbnail}
                    alt={game.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="p-3">{game.title}</td>
                <td className="p-3">{game.genre}</td>
                <td className="p-3">
                  <button
                    onClick={() => handleDelete(game._id)}
                    className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyWatchlist;
