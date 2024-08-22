import React from "react";
const LandingBanner = React.lazy(() => import("./views/lendingpage/index"));
const Users = React.lazy(() => import("./views/users"));

const routes = [
  { path: "/dashboard", name: "Home", element: LandingBanner },
  { path: "/users", name: "Users", element: Users },
];

export default routes;
