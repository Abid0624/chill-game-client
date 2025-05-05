import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

const ReviewDetails = () => {
  const review = useLoaderData(); // Loader already gives us the review data
  console.log(review);

  // Fake user (replace with actual user context when ready)
  const user = {
    email: "test@example.com",
    displayName: "Demo User",
  };

  const handleAddToWatchlist = () => {
    if (!user) {
      return Swal.fire("You need to log in to add to Watchlist");
    }

    const watchData = {
      reviewId: review._id,
      title: review.title,
      thumbnail: review.thumbnail,
      genre: review.genre,
      rating: review.rating,
      userEmail: user.email,
      userName: user.displayName,
    };

    fetch("http://localhost:5000/watchlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(watchData),
    })
      .then((res) => res.json())
      .then(() => {
        Swal.fire("Added!", "This review is in your watchlist.", "success");
      });
  };

  return (
    <div className="max-w-4xl mx-auto mt-20 p-6 bg-white rounded-lg shadow-lg">
      <img
        src={review.thumbnail}
        alt={review.title}
        className="w-full h-64 object-cover rounded"
      />
      <h2 className="text-3xl font-bold mt-4">{review.title}</h2>
      <p className="mt-2 text-gray-700">{review.description}</p>
      <div className="mt-4 font-semibold text-xl space-y-1 text-gray-800">
        <p>Rating: {review.rating}/10</p>
        <p>Genre: {review.genre}</p>
        <p>Published: {review.year}</p>
        <p>Reviewer: {review.userName}</p>
        <p>Email: {review.userEmail}</p>
      </div>
      <button onClick={handleAddToWatchlist} className="btn btn-primary mt-6">
        Add to WatchList
      </button>
    </div>
  );
};

export default ReviewDetails;
