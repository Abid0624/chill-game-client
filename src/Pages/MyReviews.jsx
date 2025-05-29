import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../providers/AuthProvider";
import Lottie from "lottie-react";
import noDataAnimation from "../assets/Animation - 1748511260033.json";

const MyReviews = () => {
  const { user, theme } = useContext(AuthContext);
  const [myReviews, setMyReviews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.email) {
      fetch(
        `https://chill-game-server-zeta.vercel.app/game?email=${user.email}`
      )
        .then((res) => res.json())
        .then((data) => setMyReviews(data))
        .catch((err) => console.error("Error fetching reviews:", err));
    }
  }, [user]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://chill-game-server-zeta.vercel.app/game/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire("Deleted!", "Your review has been deleted.", "success");
              const remaining = myReviews.filter((myRev) => myRev._id !== id);
              setMyReviews(remaining);
            }
          });
      }
    });
  };

  return (
    <div
      className={`max-w-6xl mx-auto mt-24 p-4 md:p-6 rounded shadow ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-800"
      }`}
    >
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
        My Reviews
      </h2>

      {myReviews.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-10">
          <Lottie
            animationData={noDataAnimation}
            loop={true}
            className="w-48 h-48 md:w-64 md:h-64"
          />
          <p className="text-center text-gray-500 mt-4">No reviews found.</p>
        </div>
      ) : (
        <>
          {/* Desktop Table (hidden on mobile) */}
          <div className="hidden md:block">
            <table
              className={`table-auto w-full border-collapse ${
                theme === "dark"
                  ? "border border-gray-700"
                  : "border border-gray-300"
              }`}
            >
              <thead>
                <tr
                  className={theme === "dark" ? "bg-gray-800" : "bg-gray-100"}
                >
                  <th
                    className={`p-2 ${
                      theme === "dark"
                        ? "border border-gray-700"
                        : "border border-gray-300"
                    }`}
                  >
                    Game Title
                  </th>
                  <th
                    className={`p-2 ${
                      theme === "dark"
                        ? "border border-gray-700"
                        : "border border-gray-300"
                    }`}
                  >
                    Rating
                  </th>
                  <th
                    className={`p-2 ${
                      theme === "dark"
                        ? "border border-gray-700"
                        : "border border-gray-300"
                    }`}
                  >
                    Year
                  </th>
                  <th
                    className={`p-2 ${
                      theme === "dark"
                        ? "border border-gray-700"
                        : "border border-gray-300"
                    }`}
                  >
                    Genre
                  </th>
                  <th
                    className={`p-2 ${
                      theme === "dark"
                        ? "border border-gray-700"
                        : "border border-gray-300"
                    }`}
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {myReviews.map((review) => (
                  <tr
                    key={review._id}
                    className={
                      theme === "dark" ? "text-white" : "text-gray-800"
                    }
                  >
                    <td
                      className={`p-2 ${
                        theme === "dark"
                          ? "border border-gray-700"
                          : "border border-gray-300"
                      }`}
                    >
                      {review.title}
                    </td>
                    <td
                      className={`p-2 ${
                        theme === "dark"
                          ? "border border-gray-700"
                          : "border border-gray-300"
                      }`}
                    >
                      {review.rating}
                    </td>
                    <td
                      className={`p-2 ${
                        theme === "dark"
                          ? "border border-gray-700"
                          : "border border-gray-300"
                      }`}
                    >
                      {review.year}
                    </td>
                    <td
                      className={`p-2 ${
                        theme === "dark"
                          ? "border border-gray-700"
                          : "border border-gray-300"
                      }`}
                    >
                      {review.genre}
                    </td>
                    <td
                      className={`p-2 ${
                        theme === "dark"
                          ? "border border-gray-700"
                          : "border border-gray-300"
                      }`}
                    >
                      <div className="flex justify-center space-x-2">
                        <Link to={`/updateReview/${review._id}`}>
                          <button className="btn btn-sm btn-accent">
                            Update
                          </button>
                        </Link>
                        <button
                          onClick={() => handleDelete(review._id)}
                          className="btn btn-sm btn-error"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards (shown on mobile) */}
          <div className="md:hidden space-y-4">
            {myReviews.map((review) => (
              <div
                key={review._id}
                className={`p-4 rounded-lg shadow ${
                  theme === "dark" ? "bg-gray-800" : "bg-gray-50"
                }`}
              >
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div>
                    <p className="font-semibold">Game Title</p>
                    <p>{review.title}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Rating</p>
                    <p>{review.rating}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Year</p>
                    <p>{review.year}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Genre</p>
                    <p>{review.genre}</p>
                  </div>
                </div>
                <div className="flex justify-center space-x-2 pt-2 border-t border-gray-300">
                  <Link to={`/updateReview/${review._id}`} className="flex-1">
                    <button className="btn btn-sm btn-accent w-full">
                      Update
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(review._id)}
                    className="btn btn-sm btn-error flex-1"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MyReviews;
