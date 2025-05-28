import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home";
import Register from "../Pages/Register";
import Login from "../Pages/Login";
import AddReview from "../Pages/AddReview";
import ReviewDetails from "../Pages/ReviewDetails";
import AllReviews from "../Pages/AllReviews";
import PrivateRoute from "./PrivateRoute";
import MyReviews from "../Pages/MyReviews";
import UpdateReview from "../Components/UpdateReview";
import MyWatchlist from "../Pages/MyWatchlist";
import ErrorPage from "../Components/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
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
        element: (
          <PrivateRoute>
            <AddReview></AddReview>
          </PrivateRoute>
        ),
      },
      {
        path: "my-reviews",
        element: (
          <PrivateRoute>
            <MyReviews></MyReviews>
          </PrivateRoute>
        ),
      },
      {
        path: "updateReview/:id",
        element: <UpdateReview></UpdateReview>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/game/${params.id}`),
      },
      {
        path: "watchlist",
        element: (
          <PrivateRoute>
            <MyWatchlist></MyWatchlist>
          </PrivateRoute>
        ),
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
