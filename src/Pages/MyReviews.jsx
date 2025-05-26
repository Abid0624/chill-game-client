import { useEffect, useState, useContext } from "react";

import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../providers/AuthProvider";

const MyReviews = () => {
  const { user } = useContext(AuthContext);
  const [myReviews, setMyReviews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:5000/game?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => setMyReviews(data))
        .catch((err) => console.error("Error fetching reviews:", err));
    }
  }, [user]);

  const handleDelete = (id) => {
    console.log(id);
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
        fetch(`http://localhost:5000/game/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your review has been deleted.",
                icon: "success",
              });
              const remaining = myReviews.filter((myRev) => myRev._id !== id);
              setMyReviews(remaining);
            }
          });
      }
    });
  };

  return (
    <div className="max-w-6xl mx-auto mt-24 p-6 bg-white rounded shadow">
      <h2 className="text-3xl font-bold mb-6 text-center">My Reviews</h2>
      {myReviews.length === 0 ? (
        <p className="text-center text-gray-500">No reviews found.</p>
      ) : (
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2">Game Title</th>
              <th className="border border-gray-300 p-2">Rating</th>
              <th className="border border-gray-300 p-2">Year</th>
              <th className="border border-gray-300 p-2">Genre</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {myReviews.map((review) => (
              <tr key={review._id} className="text-center">
                <td className="border border-gray-300 p-2">{review.title}</td>
                <td className="border border-gray-300 p-2">{review.rating}</td>
                <td className="border border-gray-300 p-2">{review.year}</td>
                <td className="border border-gray-300 p-2">{review.genre}</td>
                <td className="border border-gray-300 p-2 space-x-2">
                  <Link to={`/updateReview/${review._id}`}>
                    <button
                      // onClick={() => handleUpdate(review._id)}
                      className="btn btn-sm btn-accent"
                    >
                      Update
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(review._id)}
                    className="btn btn-sm btn-error"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyReviews;
