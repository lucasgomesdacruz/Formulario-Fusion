import { createBrowserRouter } from "react-router-dom";

import Home from "./components/Form"
import Users from "./components/Users"
import Layout from "./components/RootLayout"

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { 
        path: "/", 
        element: <Home /> 
      },
      {
        path: "users",
        element: <Users />
      },
    ]
  }
])

export { router };