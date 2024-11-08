import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import Home from "./pages/Home.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import TopRated from "./pages/TopRated.tsx";
import BookMark from "./pages/BookMark.tsx";
import Title from "./pages/Title.tsx";
import Profile from "./pages/Profile.tsx";
import Login from "./pages/Login.tsx";
import { Provider } from "react-redux";
import { store } from "./app_state/store.ts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <ErrorPage />, // Error page for login route errors
  },
  {
    path: "/app",
    element: <App />,
    errorElement: <ErrorPage />, // Global error page for all "/app" sub-routes
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "top-rated",
        element: <TopRated />,
      },
      {
        path: "bookmark",
        element: <BookMark />,
      },
      {
        path: "title",
        element: <Title />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "*", // Catch-all route for non-existing "/app/*" paths
        element: <ErrorPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
