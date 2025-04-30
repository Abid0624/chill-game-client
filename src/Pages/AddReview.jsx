import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

const AddReview = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const thumbnail = form.thumbnail.value;
    const title = form.title.value;
    const description = form.description.value;
    const rating = parseFloat(form.rating.value);
    const year = parseInt(form.year.value);
    const genre = form.genre.value;

    const newGame = { thumbnail, title, description, rating, year, genre };

    toast.success("Review submitted successfully!");

    form.reset();
    // navigate("/");

    // send data to server
    fetch("http://localhost:5000/game", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newGame),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.insertedId) {
          Swal.fire({
            title: "Success!",
            text: "User addedd successfully",
            icon: "success",
            confirmButtonText: "Cool",
          });
        }
      });
  };

  return (
    <div className="max-w-3xl mx-auto mt-24 p-6 bg-green-100 shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-center">Add New Review</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-semibold">
            Game Cover Image URL
          </label>
          <input
            name="thumbnail"
            type="url"
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Game Title</label>
          <input
            name="title"
            type="text"
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Review Description</label>
          <textarea
            name="description"
            className="w-full border p-2 rounded h-24"
            required
          ></textarea>
        </div>

        <div>
          <label className="block mb-1 font-semibold">Rating</label>
          <input name="rating" className="w-full border p-2 rounded" required />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Publishing Year</label>
          <input
            name="year"
            type="number"
            min="1980"
            max="2099"
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Genre</label>
          <select name="genre" className="w-full border p-2 rounded" required>
            <option value="">-- Select Genre --</option>
            <option value="Action">Action</option>
            <option value="RPG">RPG</option>
            <option value="Adventure">Adventure</option>
            <option value="Shooter">Shooter</option>
            <option value="Shooter">Roguelike</option>
            <option value="Strategy">Strategy</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-semibold">User Email</label>
          <input
            type="email"
            // value={user?.email || ""}
            // readOnly
            className="w-full border p-2 rounded bg-gray-100"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">User Name</label>
          <input
            type="text"
            // value={user?.displayName || ""}
            // readOnly
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

export default AddReview;
