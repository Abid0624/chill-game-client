import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen my-24 flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-9xl font-bold text-gray-800">404</h1>
      <p className="text-2xl text-gray-600 mt-4">Page Not Found</p>

      <p className="text-lg text-gray-600 mt-2 text-center">
        Oops! The page you're looking for doesn't exist.
      </p>

      <button onClick={() => navigate("/")} className="mt-8 btn btn-error">
        Go Back to Home
      </button>
    </div>
  );
};

export default ErrorPage;
