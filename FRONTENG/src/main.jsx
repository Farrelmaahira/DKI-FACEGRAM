import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Register from "./pages/Register.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./bootstrap.css";
import "./style.css";
import ProtectedRoute from "./ProtectedRoute.jsx";
import Home from "./pages/Home.jsx";
import Navbar from "./components/Navbar.jsx";
import MyProfile from "./pages/MyProfile.jsx";
import Profile from "./pages/Profile.jsx";
import CreatePost from "./pages/CreatePost.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
      {
        path: "/register",
        element: <Register />,
      },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element : <Navbar/>
      },
      {
        path : '/home',
        element : <Home/>
      },
      {
        path : '/my-profile',
        element : <MyProfile/>
      },
      {
        path : '/user/:username',
        element : <Profile />
      },
      {
        path : '/create-post',
        element : <CreatePost/> 
      }
    ],
  },
    
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);
