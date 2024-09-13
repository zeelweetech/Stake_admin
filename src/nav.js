import React from "react";
import InboxIcon from "@mui/icons-material/Inbox";
import EmailIcon from "@mui/icons-material/Email";
import GroupIcon from "@mui/icons-material/Group";
import cards from "./assets/img/card.png"

const nav = [
  {
    name: "Dashboard",
    to: "/dashboard",
    icon: <InboxIcon />,
    badge: {
      color: "info",
    },
  },
  {
    name: "Users",
    to: "/users",
    icon: <GroupIcon />,
    badge: {
      color: "info",
    },
  },
  {
    name: "Games",
    to: "/games",
    icon: <img src={cards} alt="Not Found" />,
    badge: {
      color: "info",
    },
  }
];

export default nav;