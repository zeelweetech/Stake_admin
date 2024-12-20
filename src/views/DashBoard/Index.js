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

    <div className="bg-[#1a2c38] flex flex-col">
      <div className="text-white ml-[-0.1rem] bg-[#0f212e] border-y-4 border-r-4 border-[#2f4553] flex items-center justify-center space-x-4 w-64 md:w-72 lg:w-80 rounded-e-full mt-5 mx-auto px-4 md:px-6 lg:px-10">
        <Inbox size={25} className="text-white text-xl md:text-2xl lg:text-3xl" />
        <p className="text-lg md:text-xl lg:text-2xl pr-4 md:pr-6 lg:pr-10 py-2 md:py-3">
          Dashboard
        </p>
      </div>
      <div className="py-7 lg:py-7 flex justify-center ">
        <div className="flex xl:justify-around lg:justify-center xl:space-x-8 lg:space-x-5 space-x-5 pt-8">
          <div className="h-28 xl:w-60 lg:w-48 w-48 bg-[#4d718768] rounded-lg text-[#b1bad3] p-2 shadow-sm shadow-[#4d718768]">
            <p className="xl:text-xl lg:text-base text-xl font-semibold text-center">Total Users</p>
            <p className="text-2xl font-bold text-center mt-2">
              {dashboardData?.userStats?.totalUsers || 0}
            </p>
          </div>

          <div className="h-28 xl:w-60 lg:w-48 w-48 bg-[#4d718768] rounded-lg text-[#b1bad3] p-2 shadow-sm shadow-[#4d718768]">
            <p className="xl:text-xl lg:text-base text-xl font-semibold text-center">Active Users</p>
            <p className="text-2xl font-bold text-center mt-2">
              {dashboardData?.userStats?.activeUsers || 0}
            </p>
            {/* </div> */}
          </div>
          <div className="h-28 xl:w-60 lg:w-48 w-48 bg-[#4d718768] rounded-lg text-[#b1bad3] p-2 shadow-sm shadow-[#4d718768]">
            <p className="xl:text-xl lg:text-base text-xl font-semibold text-center">Inactive Users</p>
            <p className="text-2xl font-bold text-center mt-2">
              {dashboardData?.userStats?.inactiveUsers || 0}
            </p>
          </div>
          <div className="h-28 xl:w-60 lg:w-48 w-48 bg-[#4d718768] rounded-lg text-[#b1bad3] p-2 shadow-sm shadow-[#4d718768]">
            <p className="xl:text-xl lg:text-base text-xl font-semibold text-center">live Player Count</p>
            <p className="text-2xl font-bold text-center mt-2">
              {dashboardData?.livePlayerCount || 0}
            </p>
          </div>
        </div>
      </div>
      <div className="px-24 pt-10 flex">
        {/* "flex xl:gap-6 pt-14 pr-20 items-center -mt-2 md:w-52 xl:w-full w-32" */}
        <div className="flex-col flex">
          <div className="flex flex-auto space-x-6 px-2 lg:py-3 py-3">
            <div className="min-w-20 bg-[#0f212e] max-h-96 lg:max-h-96">
              <BetCount />
            </div>
            <div className="min-w-20 bg-[#0f212e] max-h-96 lg:max-h-96">
              <WalletStats />
            </div>
          </div>

          <div className="px-2 flex space-x-6 py-2">
            <div className="bg-[#0f212e] w-[550px] lg:w-[400px] xl:w-[550px] ">
              <WinLossRatio />
            </div>
            <div className="bg-[#0f212e] w-[600px] lg:w-[349px] xl:w-[532px] px-2 h-[300px] lg:h-[300px] xl:h-[300]">
              <TopGames />
            </div>
          </div>

          <div className="px-2 flex space-x-6 py-2">
            <div className="bg-[#0f212e] w-[550px] lg:w-[400px] xl:w-[620px] ">
              <TopUsers />
            </div>
            <div className="bg-[#0f212e] w-[500px] lg:w-[349px] xl:w-[460px] px-2 h-[300px] lg:h-[400px] xl:h-[400px] flex flex-col items-center justify-center">
              <FinancialTransaction />
            </div>
          </div>
          <div className="flex px-2 py-2 space-x-6">
            <div className="py-4 px-2 bg-[#0f212e] h-28 w-[620px] lg:w-[400px] xl:w-[620px]">
              <ul className="custom-list">
                <li className="text-lg lg:text-base xl:text-xl font-bold lg:font-bold text-[#b1bad3] highest-bet relative px-6">
                  averageCrashPoint :{" "}
                  <span className="text-red-400">
                    {dashboardData?.pullStats?.averageCrashPoint}
                  </span>
                </li>
                <li className="text-lg xl:text-xl lg:text-base font-bold text-[#b1bad3] p-2 lowest-bet relative px-6">
                  totalPulls :{" "}
                  <span className="text-green-400">
                    {dashboardData?.pullStats?.totalPulls}
                  </span>
                </li>
              </ul>
            </div>
            <div className="bg-[#0f212e] lg:w-[350px] xl:w-[460px] xl:px-6 lg:px-1 ">
            <CountsByCountry />
          </div> 
          </div>
           
        </div>
      </div>
    </div>
  )
}

export default Index;



// xl:mt-[-40px] lg:mt-[-10px] xl:w-[39rem] bg-[#0f212e] shadow-lg shadow-[#0f212e] py-4 px-4