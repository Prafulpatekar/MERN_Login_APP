import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

/* Import all components*/
import Register from "./components/Register";
import Login from "./components/Login";
import PageNotFound from "./components/PageNotFound";
import Profile from "./components/Profile";
import Reset from "./components/Reset";
import Recovery from "./components/Recovery";
import Password from "./components/Password";

// Auth middleware
import { AuthorizeUser ,ProtectRoute} from "./middleware/auth";

// root routes
const router = createBrowserRouter([
    {
        path: '/',
        element: <Login></Login>
    },
    {
        path: '/register',
        element: <Register></Register>
    },
    {
        path: '/password',
        element: <ProtectRoute><Password/></ProtectRoute>
    },
    {
        path: '/recovery',
        element: <Recovery></Recovery>
    },
    {
        path: '/reset',
        element: <Reset></Reset>
    },
    {
        path: '/profile',
        element: <AuthorizeUser><Profile/></AuthorizeUser>
    },
    {
        path: '*',
        element: <PageNotFound></PageNotFound>
    },

])


export default function App(){
    return (
        <main>
            <RouterProvider router={router}></RouterProvider>
        </main>
    )
}