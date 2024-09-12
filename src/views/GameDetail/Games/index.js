import React, { useEffect, useState } from "react";
import "../../../App.css";
import AddIcon from "@mui/icons-material/Add";
import { IoInformationCircleOutline } from "react-icons/io5";
import { BiDetail } from "react-icons/bi";
import { IoSettingsOutline } from "react-icons/io5";
import Loader from "../../component/Loader";
import GameInformation from "./GameInformation";
import GameCommissionSetting from "./GameCommissionSetting";
import GameDetails from "./GameDetails";

export default function Games() {
  const [commissionData, setCommissionData] = useState([]);
  const [gameMenu, setGameMenu] = useState("Information");
  const [loading, setLoading] = useState(false);

  const menuItems = [
    {
      label: "Information",
      icon: <IoInformationCircleOutline color="#b1bad3" size={25} />,
    },
    {
      label: "Details",
      icon: <BiDetail className="text-[#b1bad3]" size={22} />,
    },
    {
      label: "Setting",
      icon: <IoSettingsOutline className="text-[#b1bad3]" size={22} />,
    },
  ];

  return (
    <div className="bg-[#1a2c38] h-screen flex flex-col">
      {loading ? (
        <Loader />
      ) : (
        <div className="flex flex-col flex-1 bg-[#1a2c38]">
          <p className="text-white bg-[#213743] text-2xl text-center m-7 py-3 w-60">
            Game Details
          </p>
          <div className="flex flex-col flex-1 justify-center items-center pt-12">
            <div style={{ width: "74.24%" }} className="flex-1 flex flex-col">
              <div className="flex justify-between">
                <div className="flex overflow-x-auto overflow-y-hidden touch-scroll transform translate-z-0">
                  <div className="bg-[#0f212e] flex rounded-full p-[5px] flex-shrink-0 space-x-2 text-xs">
                    {menuItems.map((item) => (
                      <button
                        key={item.label}
                        className={`py-2 px-5 rounded-full flex justify-center space-x-1.5 items-center ${
                          gameMenu === item.label
                            ? "bg-[#4d718768]"
                            : "hover:bg-[#4d718768]"
                        }`}
                        onClick={() => setGameMenu(item.label)}
                      >
                        {item.icon}
                        <p className="text-[#b1bad3]">{item.label}</p>
                      </button>
                    ))}
                  </div>
                </div>
                {/* <button className="text-white bg-[#213743] font-medium px-4 rounded-sm flex items-center space-x-1">
                  <AddIcon />
                  <p>Add Commission</p>
                </button> */}
              </div>

              {gameMenu === "Information" ? (
                <GameInformation
                  setLoading={setLoading}
                  commissionData={commissionData}
                  setCommissionData={setCommissionData}
                />
              ) : gameMenu === "Details" ? (
                <GameDetails commissionData={commissionData} />
              ) : (
                <GameCommissionSetting />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
