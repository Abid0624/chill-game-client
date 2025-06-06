import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../providers/AuthProvider";

const Login = () => {
  const { signInUser, googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signInUser(email, password)
      .then((result) => {
        Swal.fire("Success", "Logged in successfully", "success");

        // update last login time
        const lastSignInTime = result?.user?.metadata?.lastSignInTime;
        const loginInfo = { email, lastSignInTime };
        fetch(`https://chill-game-server-zeta.vercel.app/users`, {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(loginInfo),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("sign in info updated in db", data);
          });

        navigate("/");
      })
      .catch((err) => {
        Swal.fire("Error", err.message, "error");
      });
  };

  const handleGoogleLogin = () => {
    googleLogin().then((result) => {
      const user = result.user;
      const userInfo = {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        lastSignInTime: user.metadata.lastSignInTime,
      };

      // Try updating first
      fetch("https://chill-game-server-zeta.vercel.app/users", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.modifiedCount === 0) {
            // If user not found then insert it to the db
            fetch("https://chill-game-server-zeta.vercel.app/users", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(userInfo),
            });
          }
        });

      Swal.fire("Success", "Logged in with Google", "success");
      navigate("/");
    });
  };

  return (
    <div className="min-h-screen mt-24 md:mt-0 flex items-center justify-center bg-base-200">
      <div className="card w-full max-w-md shadow-2xl bg-base-100">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
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
              <button className="btn btn-primary w-full">Login</button>
            </div>
          </form>

          <div className="text-center mt-4">
            <button
              onClick={handleGoogleLogin}
              className="btn btn-outline btn-secondary w-full"
            >
              Login with Google
            </button>
          </div>

          <p className="mt-4 text-center">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600 underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
