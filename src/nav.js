import React from "react";
import InboxIcon from "@mui/icons-material/Inbox";
import { GiTriangleTarget } from "react-icons/gi";
import GroupIcon from "@mui/icons-material/Group";
import cards from "./assets/img/card.png"
import { TbLogs } from "react-icons/tb";
import EmojiEvents from '@mui/icons-material/EmojiEvents';
import  AdminPanelSettings  from "@mui/icons-material/AdminPanelSettings";

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
  },
  {
    name: "Logs",
    to: "/logs",
    icon: <TbLogs size={25}/>,
    badge: {
      color: "info",
    },
  },
  {
    name: "User Distribution",
    to: "/userDistribution",
    icon: <GiTriangleTarget size={25} />,
    badge: {
      color: "info",
    },
  },
  {
    name: "Medals",
    to: "/medals",
    icon:<EmojiEvents size={25}/>,
    badge: {
      color: "info",
    }
  },
  {
    name: "Admin",
    to: "/admin",
    icon:<AdminPanelSettings size={25}/>,
    badge: {
      color: "info",
    }
  },
];

export default nav;
