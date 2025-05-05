import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../providers/AuthProvider";

const Register = () => {
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photoURL = form.photoURL.value;
    const password = form.password.value;

    // Validation
    if (password.length < 6) {
      return Swal.fire(
        "Error",
        "Password must be at least 6 characters",
        "error"
      );
    }
    if (!/[A-Z]/.test(password)) {
      return Swal.fire(
        "Error",
        "Password must include at least one uppercase letter",
        "error"
      );
    }
    if (!/[a-z]/.test(password)) {
      return Swal.fire(
        "Error",
        "Password must include at least one lowercase letter",
        "error"
      );
    }

    createUser(email, password)
      .then((result) => {
        updateUserProfile(name, photoURL)
          .then(() => {
            Swal.fire("Success!", "User registered successfully", "success");
            navigate("/");
          })
          .catch(() => {
            Swal.fire("Error", "Profile update failed", "error");
          });

        const newUser = { name, email };
        // save new user info to the database
        fetch("http://localhost:5000/users", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(newUser),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("user created to db", data);
          });
      })
      .catch((err) => {
        Swal.fire("Error", err.message, "error");
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-full max-w-md shadow-2xl bg-base-100">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center mb-4">Register</h2>
          <form onSubmit={handleRegister} className="flex flex-col gap-4">
            <div className="form-control space-x-2">
              <label className="label">Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control space-x-2">
              <label className="label">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control space-x-2">
              <label className="label">Photo URL</label>
              <input
                type="text"
                name="photoURL"
                placeholder="Enter your photo URL"
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control space-x-2">
              <label className="label">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control mt-2">
              <button className="btn btn-primary w-full">Register</button>
            </div>
          </form>

          <p className="mt-4 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
