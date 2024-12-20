import React, { useState } from "react";
import stakeLogo from "../assets/img/stakeLogo.png";
import { Link, useNavigate } from "react-router-dom";
import Login from "../views/pages/login/Login";
import Register from "../views/pages/register/Register";
import ForgotPassword from "../views/pages/forgotpassword/ForgotPassword";
import VerifyTerm from "../views/pages/register/VerifyTerm";
import { IoPerson } from "react-icons/io5";
import { IconButton, Menu, MenuItem } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { removeCookie } from "../resources/utility";

function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    removeCookie("token");
    navigate("/");
    window.location.reload();
  };
  return (
    <div>
      <div className="bg-[#1a2c38] shadow-2xl border-b border-b-black">
        <div className="flex justify-around items-center space-x-[36rem]">
          {/* <img src={stakeLogo} className="w-16 h-16" alt="Not Found" onClick={() => navigate('/dashboard')}/> */}
          <span
            className="text-white text-4xl xl:text-5xl lg:text-4xl font-extrabold italic font-sans cursor-pointer"
            onClick={() => navigate("/")}
          >
            Listor
          </span>
          <div className="flex items-center space-x-3">
            {/* <button
              className="bg-[#1475e1] hover:bg-[#396ca8] text-white rounded-lg px-5 py-2.5"
              onClick={(e) => setAnchorEl(e.currentTarget)}
            >
              Profile
            </button> */}
            <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} data-menu-type="profile">
              <IoPerson color="white" size={16} />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleMenuClose} sx={{ width: "10rem" }}>
                <SettingsIcon className="mr-4" />
                Settings
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <LogoutIcon className="mr-4" />
                Logout
              </MenuItem>
            </Menu>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
