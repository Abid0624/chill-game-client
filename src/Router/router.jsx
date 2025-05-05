import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home";
import Register from "../Pages/Register";
import Login from "../Pages/Login";
import AddReview from "../Pages/AddReview";
import ReviewDetails from "../Pages/ReviewDetails";
import AllReviews from "../Pages/AllReviews";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
        loader: () => fetch("http://localhost:5000/game"),
      },
      {
        path: "all-reviews",
        element: <AllReviews></AllReviews>,
        loader: () => fetch("http://localhost:5000/game"),
      },
      {
        path: "add-review",
        element: <AddReview></AddReview>,
      },
      {
        path: "review/:id",
        element: <ReviewDetails></ReviewDetails>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/game/${params.id}`),
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "register",
        element: <Register></Register>,
      },
    ],
  },
]);

export default router;
