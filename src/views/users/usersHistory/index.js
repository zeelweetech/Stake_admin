import React, { useState } from "react";
import Loader from "../../component/Loader";
import { IoInformationCircleOutline } from "react-icons/io5";
import { BiDetail } from "react-icons/bi";
import UserDetails from "./UserDetails";
import UserInformation from "./UserInformation";

const UsersHistory = () => {
  const [loading, setLoading] = useState(false);
  const [userMenu, setUserMenu] = useState("Information");
  const menuItems = [
    {
      label: "Information",
      icon: <IoInformationCircleOutline color="#b1bad3" size={25} />,
    },
    {
      label: "Details",
      icon: <BiDetail className="text-[#b1bad3]" size={22} />,
    },
  ];

  return (
    <>
      <div className="bg-[#1a2c38] h-screen flex flex-col">
        {loading ? (
          <Loader />
        ) : (
          <div className="flex flex-col flex-1 bg-[#1a2c38]">
            <p className="text-white bg-[#213743] text-2xl text-center m-7 py-3 w-60">
              User Details
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
                            userMenu === item.label
                              ? "bg-[#4d718768]"
                              : "hover:bg-[#4d718768]"
                          }`}
                          onClick={() => setUserMenu(item.label)}
                        >
                          {item.icon}
                          <p className="text-[#b1bad3]">{item.label}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                {userMenu === "Information" ? (
                    <UserInformation 
                    setLoading={setLoading}
                    />
                ): (
                   <UserDetails />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default UsersHistory;