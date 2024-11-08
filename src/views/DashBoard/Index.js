import React, { useEffect, useState } from "react";
import BetStatus from "./BetStatus";
import { getDashboard } from "../../services/DashBoardServices";
import UserStatus from "./UserStatus";
import { Inbox } from "@mui/icons-material";
// import LandingDetails from "./LandingDetails";
// import LandingBanner from "./LandingBanner";

function Index() {
  const [dashboardData, setDashboardData] = useState();

  useEffect(() => {
    GetDashboard();
  }, []);

  console.log("dashboardData", dashboardData);

  const GetDashboard = async () => {
    try {
      const response = await getDashboard();
      console.log("((((((((", response);
      setDashboardData(response)
    } catch (error) {
      console.error("Failed to fetch logs: ", error);
    }
  };

  return (
    <div>
      <div className="bg-[#1a2c38] flex flex-col">
        {/* <div className="flex flex-col flex-1 bg-[#1a2c38]"> */}
        <div className="text-white ml-[-0.1rem] bg-[#0f212e] border-y-4 border-r-4 border-[#2f4553] flex items-center justify-center space-x-4 w-80 rounded-e-full mt-5 mx-auto">
          <Inbox size={25} className="text-white text-3xl" />
          <p className="text-2xl pr-10 py-3">Dashboard</p>
        </div>

        <div className="py-7 flex justify-center">
          <div className="flex xl:justify-around lg:justify-center lg:space-x-8 pt-8">
            <div className="h-28 xl:w-80 lg:w-64 bg-[#4d718768] rounded-lg text-[#b1bad3] p-2 shadow-sm shadow-[#4d718768]">
              <p className="text-xl font-semibold text-center">Total Users</p>
              <p className="text-2xl font-bold text-center mt-2">
                {dashboardData?.userStats?.[0]?.totalUsers}
              </p>
            </div>
            <div className="h-28 xl:w-80 lg:w-64 bg-[#4d718768] rounded-lg text-[#b1bad3] p-2 shadow-sm shadow-[#4d718768]">
              <p className="text-xl font-semibold text-center">Active Users</p>
              <p className="text-2xl font-bold text-center mt-2">
                {dashboardData?.userStats?.[0]?.activeUsers}
              </p>
            </div>
            <div className="h-28 xl:w-80 lg:w-64 bg-[#4d718768] rounded-lg text-[#b1bad3] p-2 shadow-sm shadow-[#4d718768]">
              <p className="text-xl font-semibold text-center">Inactive Users</p>
              <p className="text-2xl font-bold text-center mt-2">
                {dashboardData?.userStats?.[0]?.inactiveUsers}
              </p>
            </div>
          </div>
        </div>
        {/* </div> */}
      </div>
      
     <div className="flex xl:space-x-7 lg:space-x-3.5 pt-14 pr-20 item-center w-full">
        <div className="w-1/2 justify-center xl:w-1/2 lg:w-[28.5rem] bg-[#0f212e] shadow-lg shadow-[#0f212e] p-2 m-auto ml-[-0.5rem] mt-[-0.5rem]">
          <BetStatus dashboardData={dashboardData} />
        </div>
        {/* <div className="xl:mt-8 lg:mt-3.5 bg-[#0f212e] pt-2 pr-20 xl:w-1/2 shadow-lg shadow-[#0f212e] ml-[-0.5rem] p-2">
              <BetStatus dashboardData={dashboardData}/>
            </div> */}
    </div>
    </div>

  )
}

export default Index;

