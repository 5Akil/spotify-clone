import { createBrowserRouter, redirect } from "react-router-dom";
import Login from "../Login";
import Player from "../Player";

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