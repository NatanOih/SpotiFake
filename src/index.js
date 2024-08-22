import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider as JotaiProvider } from "jotai";

import HomePage from "./pages/HomePage/HomePage";
import PlayListPage from "./pages/PlaylistPage/Page";
import FavoritePage from "./pages/FavoritePage/Page";
import Error from "./components/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <Error />,
  },
  {
    path: "/favorites",
    element: <FavoritePage />,
  },
  {
    path: "/playlists/:playlistid",
    element: <PlayListPage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <JotaiProvider>
    <RouterProvider router={router} />
  </JotaiProvider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
