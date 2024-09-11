import React from "react";
// import { useParams } from "react-router-dom";

const LandingBanner = React.lazy(() => import("./views/lendingpage/index"));
const Users = React.lazy(() => import("./views/users"));
const Games = React.lazy(() => import("./views/GameDetail"));
const Crash = React.lazy(() => import("./views/GameDetail/Games"));

// const { gameName, gameId } = useParams();

const routes = [
  { path: "/dashboard", name: "Home", element: LandingBanner },
  { path: "/users", name: "Users", element: Users },
  { path: "/games", name: "Games", element: Games },
  { path: "/games/:gameName/:gameId", name: "Crash", element: Crash },
];

export default routes;
