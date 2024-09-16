import React from "react";
// import { useParams } from "react-router-dom";

const LandingBanner = React.lazy(() => import("./views/lendingpage/index"));
const Users = React.lazy(() => import("./views/users"));
const Games = React.lazy(() => import("./views/games/index"));
const GameMenu = React.lazy(() => import("./views/games/GameMenu"));

// const { gameName, gameId } = useParams();

const routes = [
  { path: "/dashboard", name: "Home", element: LandingBanner },
  { path: "/users", name: "Users", element: Users },
  { path: "/games", name: "Games", element: Games },
  { path: "/games/:gameName/:gameId", name: "GameMenu", element: GameMenu },
];

export default routes;
