import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "@/layout/AppLayout";
import Home from "@/pages/Home";
import About from "@/pages/About";
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";

const AppRoutes = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "about",
          element: <About />,
        },
        {
          path: "sign-in",
          element: <SignIn />,
        },
        {
          path: "sign-up",
          element: <SignUp />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRoutes;
