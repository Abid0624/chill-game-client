import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { AuthContext } from "../providers/AuthProvider";

const AddReview = () => {
  const navigate = useNavigate();
  const { user, theme } = useContext(AuthContext);

  const handleSubmit = (e) => {
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

    const newGame = {
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

    fetch("http://localhost:5000/game", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newGame),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            title: "Success!",
            text: "User added successfully",
            icon: "success",
            confirmButtonText: "Cool",
          });
          // navigate("/");
        }
      });
  };

  return (
    <div
      className={`max-w-3xl mx-auto mt-24 p-6 shadow-lg rounded-lg ${
        theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-green-100 text-gray-800"
      }`}
    >
      <h2 className="text-3xl font-bold mb-6 text-center">Add New Review</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Thumbnail */}
        <div>
          <label className="block mb-1 font-semibold">
            Game Cover Image URL
          </label>
          <input
            name="thumbnail"
            type="url"
            className={`w-full border p-2 rounded ${
              theme === "dark" ? "bg-gray-800 border-gray-700 text-white" : ""
            }`}
            required
          />
        </div>

        {/* Title */}
        <div>
          <label className="block mb-1 font-semibold">Game Title</label>
          <input
            name="title"
            type="text"
            className={`w-full border p-2 rounded ${
              theme === "dark" ? "bg-gray-800 border-gray-700 text-white" : ""
            }`}
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-semibold">Review Description</label>
          <textarea
            name="description"
            className={`w-full border p-2 rounded h-24 ${
              theme === "dark" ? "bg-gray-800 border-gray-700 text-white" : ""
            }`}
            required
          ></textarea>
        </div>

        {/* Rating */}
        <div>
          <label className="block mb-1 font-semibold">Rating</label>
          <input
            name="rating"
            className={`w-full border p-2 rounded ${
              theme === "dark" ? "bg-gray-800 border-gray-700 text-white" : ""
            }`}
            required
          />
        </div>

        {/* Year */}
        <div>
          <label className="block mb-1 font-semibold">Publishing Year</label>
          <input
            name="year"
            type="number"
            min="1980"
            max="2099"
            className={`w-full border p-2 rounded ${
              theme === "dark" ? "bg-gray-800 border-gray-700 text-white" : ""
            }`}
            required
          />
        </div>

        {/* Genre */}
        <div>
          <label className="block mb-1 font-semibold">Genre</label>
          <select
            name="genre"
            className={`w-full border p-2 rounded ${
              theme === "dark" ? "bg-gray-800 border-gray-700 text-white" : ""
            }`}
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

        {/* Email */}
        <div>
          <label className="block mb-1 font-semibold">User Email</label>
          <input
            type="email"
            value={user?.email || ""}
            readOnly
            className={`w-full border p-2 rounded ${
              theme === "dark"
                ? "bg-gray-700 border-gray-700 text-white"
                : "bg-gray-100"
            }`}
          />
        </div>

        {/* Name */}
        <div>
          <label className="block mb-1 font-semibold">User Name</label>
          <input
            type="text"
            value={user?.displayName || ""}
            readOnly
            className={`w-full border p-2 rounded ${
              theme === "dark"
                ? "bg-gray-700 border-gray-700 text-white"
                : "bg-gray-100"
            }`}
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-accent w-full">
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default AddReview;
