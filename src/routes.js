import React from "react";
// const LandingBanner = React.lazy(() => import("./views/lendingpage/index"));
const Users = React.lazy(() => import("./views/users"));
const Games = React.lazy(() => import("./views/games/index"));
const GameMenu = React.lazy(() => import("./views/games/GameMenu"));
// const Crash = React.lazy(() => import("./views/GameDetail/Games"));
const Logs = React.lazy(() => import("./views/logs"));
const User = React.lazy(() => import("./views/users/usersHistory"));
const userDistribution = React.lazy(() => import("./views/users/userDistribution"))
const UserStatus = React.lazy(() => import("./views/DashBoard/Index"))
// const { gameName, gameId } = useParams();

const routes = [
  { path: "/dashboard", name: "Home", element: UserStatus },
  { path: "/users", name: "Users", element: Users },
  { path: "/users/:userName/:userId", name: "User", element: User },
  { path: "/games", name: "Games", element: Games },
  { path: "/games/:gameName/:gameId", name: "GameMenu", element: GameMenu },
  { path: "/logs", name: "Logs", element: Logs },
  {
    path: "/userDistribution",
    name: "User Distribution",
    element: userDistribution,
  },
];

export default routes;
