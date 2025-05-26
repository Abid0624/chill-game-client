import { useLoaderData } from "react-router-dom";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { AuthContext } from "../providers/AuthProvider";

const UpdateReview = () => {
  const myReviews = useLoaderData();
  const { _id, thumbnail, title, description, rating, year, genre } = myReviews;
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleUpdateReview = (e) => {
    e.preventDefault();
    const form = e.target;

    const thumbnail = form.thumbnail.value;
    const title = form.title.value;
    const description = form.description.value;
    const rating = parseFloat(form.rating.value);
    const year = parseInt(form.year.value);
    const genre = form.genre.value;
    const email = user?.email;
    const name = user?.displayName;
    const updateReview = {
      thumbnail,
      title,
      description,
      rating,
      year,
      genre,
      email,
      name,
    };

    toast.success("Review submitted successfully!");

    form.reset();
    // navigate("/");

    // send data to server
    fetch(`http://localhost:5000/game/${_id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updateReview),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount > 0) {
          Swal.fire({
            title: "Success!",
            text: "Review updated successfully",
            icon: "success",
            confirmButtonText: "Cool",
          });
        }
      });
  };

  return (
    <div className="max-w-3xl mx-auto mt-24 p-6 bg-green-100 shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Update Review: {title}
      </h2>
      <form onSubmit={handleUpdateReview} className="space-y-4">
        <div>
          <label className="block mb-1 font-semibold">
            Game Cover Image URL
          </label>
          <input
            name="thumbnail"
            type="url"
            className="w-full border p-2 rounded"
            defaultValue={thumbnail}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Game Title</label>
          <input
            name="title"
            type="text"
            className="w-full border p-2 rounded"
            defaultValue={title}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Review Description</label>
          <textarea
            name="description"
            className="w-full border p-2 rounded h-24"
            defaultValue={description}
            required
          ></textarea>
        </div>

        <div>
          <label className="block mb-1 font-semibold">Rating</label>
          <input
            name="rating"
            className="w-full border p-2 rounded"
            defaultValue={rating}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Publishing Year</label>
          <input
            name="year"
            type="number"
            min="1980"
            max="2099"
            className="w-full border p-2 rounded"
            defaultValue={year}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Genre</label>
          <select
            name="genre"
            className="w-full border p-2 rounded"
            defaultValue={genre}
            required
          >
            <option value="">-- Select Genre --</option>
            <option value="Action">Action</option>
            <option value="RPG">RPG</option>
            <option value="Adventure">Adventure</option>
            <option value="Shooter">Shooter</option>
            <option value="Roguelike">Roguelike</option>
            <option value="Strategy">Strategy</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-semibold">User Email</label>
          <input
            type="email"
            value={user?.email || ""}
            readOnly
            className="w-full border p-2 rounded bg-gray-100"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">User Name</label>
          <input
            type="text"
            value={user?.displayName || ""}
            readOnly
            className="w-full border p-2 rounded bg-gray-100"
          />
        </div>

        <button type="submit" className="btn btn-accent w-full">
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default UpdateReview;
