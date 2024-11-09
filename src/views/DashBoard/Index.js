import React, { useEffect } from "react";
import BetStatus from "./BetStatus";
import { getDashboard } from "../../services/DashBoardServices";
import { Dashboard, Inbox } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setDashBoardData } from "../../features/DashBoard/DashBoardSlice";
import GameStatus from "./GameStatus";
import PullPlayerStatus from "./PlayerStatus";
import WalletStats from "./WalletStats";

function Index() {
  const dispatch = useDispatch();
  const { dashboardData } = useSelector((state) => state?.dashBoard);


  useEffect(() => {
    GetDashboard();
  }, []);

  const GetDashboard = async () => {
    try {
      const response = await getDashboard();
      dispatch(setDashBoardData(response));

      console.log("response::::::", response);

    } catch (error) {
      console.error("Failed to fetch logs: ", error);
    }
  };

  return (
    <div>
      <div className="bg-[#1a2c38] flex flex-col">
        <div className="text-white ml-[-0.1rem] bg-[#0f212e] border-y-4 border-r-4 border-[#2f4553] flex items-center justify-center space-x-4 w-80 rounded-e-full mt-5 mx-auto">
          <Inbox size={25} className="text-white text-3xl" />
          <p className="text-2xl pr-10 py-3">Dashboard</p>
        </div>

        <div className="py-7 flex justify-center">
          <div className="flex xl:justify-around lg:justify-center lg:space-x-8 pt-8">
            <div className="h-28 xl:w-80 lg:w-64 bg-[#4d718768] rounded-lg text-[#b1bad3] p-2 shadow-sm shadow-[#4d718768]">
              <p className="text-xl font-semibold text-center">Total Users</p>
              <p className="text-2xl font-bold text-center mt-2">
                {dashboardData?.userStats?.[0]?.totalUsers || 0}
              </p>
            </div>
            <div className="h-28 xl:w-80 lg:w-64 bg-[#4d718768] rounded-lg text-[#b1bad3] p-2 shadow-sm shadow-[#4d718768]">
              <p className="text-xl font-semibold text-center">Active Users</p>
              <p className="text-2xl font-bold text-center mt-2">
                {dashboardData?.userStats?.[0]?.activeUsers || 0}
              </p>
            </div>
            <div className="h-28 xl:w-80 lg:w-64 bg-[#4d718768] rounded-lg text-[#b1bad3] p-2 shadow-sm shadow-[#4d718768]">
              <p className="text-xl font-semibold text-center">Inactive Users</p>
              <p className="text-2xl font-bold text-center mt-2">
                {dashboardData?.userStats?.[0]?.inactiveUsers || 0}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex xl:gap-6 pt-14 pr-20 items-center w-full">
        <div className="w-1/2 xl:w-1/2 lg:w-[28.5rem] bg-[#0f212e] shadow-lg shadow-[#0f212e] p-2 m-auto mt-[-0.5rem] p-[10px] ml-[40px]">
          <BetStatus />
        </div>
        <div className="w-1/2 xl:w-1/2 lg:w-[28.5rem] bg-[#0f212e] shadow-lg shadow-[#0f212e] p-2 m-auto mt-[-0.5rem] p-[10px] mr-[5px]">
          <GameStatus />
        </div>
      </div>
      <div className="flex xl:gap-6 pb-96 pb-25 pr-20 items-center w-full">
        <div className="w-1/2 xl:w-1/2 lg:w-[28.5rem] bg-[#0f212e] shadow-lg shadow-[#0f212e] p-2 m-auto -mt-2 p-[10px] ml-[40px]">
          <PullPlayerStatus />
        </div>
        <div className="h-full xl:w-[37rem] lg:w-96">
            <div className="bg-[#0f212e] shadow-lg shadow-[#0f212e] p-2">
              <WalletStats />
            </div>
            </div>
      </div>




    </div>


  //  </div>
  );
}

export default Index;
