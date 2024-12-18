import React, { useEffect } from "react";
import { getDashboard } from "../../services/DashBoardServices";
import { Inbox } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setDashBoardData } from "../../features/DashBoard/DashBoardSlice";
import WalletStats from "./WalletStats";
import FinancialTransaction from "./FinancialTransaction";
import BetCount from "./BetCount";
import CountsByCountry from "./CountsByCountry";
import WinLossRatio from "./WinLossRatio";
import TopGames from "./TopGames";
import TopUsers from "./TopUsers";

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
            <div className="h-26 xl:w-60 lg:w-64 bg-[#4d718768] rounded-lg text-[#b1bad3] p-2 shadow-sm shadow-[#4d718768]">
              <p className="text-xl font-semibold text-center">Total Users</p>
              <p className="text-2xl font-bold text-center mt-2">
                {dashboardData?.userStats?.totalUsers || 0}
              </p>
            </div>
            <div className="h-28 xl:w-60 lg:w-64 bg-[#4d718768] rounded-lg text-[#b1bad3] p-2 shadow-sm shadow-[#4d718768]">
              <p className="text-xl font-semibold text-center">Active Users</p>
              <p className="text-2xl font-bold text-center mt-2">
                {dashboardData?.userStats?.activeUsers || 0}
              </p>
            </div>
            <div className="h-28 xl:w-60 lg:w-64 bg-[#4d718768] rounded-lg text-[#b1bad3] p-2 shadow-sm shadow-[#4d718768]">
              <p className="text-xl font-semibold text-center">Inactive Users</p>
              <p className="text-2xl font-bold text-center mt-2">
                {dashboardData?.userStats?.inactiveUsers || 0}
              </p>
            </div>
            <div className="h-28 xl:w-60 lg:w-64 bg-[#4d718768] rounded-lg text-[#b1bad3] p-2 shadow-sm shadow-[#4d718768]">
              <p className="text-xl font-semibold text-center">live Player Count</p>
              <p className="text-2xl font-bold text-center mt-2">
                {dashboardData?.livePlayerCount || 0}
              </p>
            </div>
          </div>
        </div>
        <div className="flex xl:gap-6 pt-14 pr-20 items-center w-full -mt-2">
          <div className="w-1/2 xl:w-1/2 lg:w-[28.5rem] bg-[#0f212e] shadow-lg shadow-[#0f212e] p-2 m-auto mt-[-0.5rem] p-[10px] ml-[40px]">
            <BetCount />
          </div>
          <div className="bg-[#0f212e] shadow-lg shadow-[#0f212e] p-2 h-full xl:w-[480px] -mt-2">
            <WalletStats />
          </div>
        </div>

        <div className="flex xl:gap-1 pt-14 pt-5.5 pr-20 items-center w-full -mt-1">
          <div className="w-1/2 xl:w-[616px]  xl:h-[340px]  bg-[#0f212e] shadow-lg shadow-[#0f212e] p-2 m-auto mt-[-1rem] mb-8">
            <WinLossRatio />
          </div>
          <div className="w-1/2 xl:w-[30rem] max-w-screen-md xl:h-[340px] me-px bg-[#0f212e] shadow-lg shadow-[#0f212e] p-1 m-auto mt-[-1rem] p-[10px] ml-auto">
            <TopGames />
          </div>
        </div>

        <div className="flex xl:gap-6 pt-14 pt-5.5 pr-20 items-center w-full -mt-1">
          <div className="w-1/2 xl:w-[616px]  xl:h-[340px]  bg-[#0f212e] shadow-lg shadow-[#0f212e] p-3 m-auto mt-[-1rem] mb-8">
            <TopUsers />

            <div className="xl:mt-[-40px] lg:mt-[-10px] xl:w-[39rem] bg-[#0f212e] shadow-lg shadow-[#0f212e] py-4 px-4">
              <ul className="custom-list">
                <li className="text-lg font-bold text-[#b1bad3] mt-2 highest-bet relative pl-6">
                  averageCrashPoint:{" "}
                  <span className="text-red-400">
                    {dashboardData?.pullStats?.averageCrashPoint}
                  </span>
                </li>
                <li className="text-lg font-bold text-[#b1bad3] mt-2 lowest-bet relative pl-6">
                  totalPulls:{" "}
                  <span className="text-green-400">
                    {dashboardData?.pullStats?.totalPulls}
                  </span>
                </li>
              </ul>
            </div>

          </div>

          <div className="w-1/2 xl:w-[30rem] max-w-screen-md xl:h-[340px] me-px bg-[#0f212e] shadow-lg shadow-[#0f212e] p-3 m-auto mt-[-1rem] p-[10px] ml-auto">
            <CountsByCountry />
          </div>
        </div>
        <div className="flex flex-col items-center px-64 w-full pt-10">
          <div >
            <FinancialTransaction />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
