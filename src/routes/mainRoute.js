import { createBrowserRouter, redirect } from "react-router-dom";
import Login from "../components/Login";
import Player from "../components/Player";

export const MainRoutes = createBrowserRouter([
    {
        path: '/',
        element: <Login />
    },
    {
        path: '/player',
        element: <Player />
    }
])