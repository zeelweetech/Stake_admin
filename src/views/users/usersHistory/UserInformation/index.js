import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUserInformation } from "../../../../services/userServices";
import TopGames from "./TopGames";
import { useDispatch, useSelector } from "react-redux";
import { setUserInformation } from "../../../../features/users/userInformationSlice";
import WeeklyBetsAmount from "./WeeklyBetsAmount";
import UserRatio from "./UserRatio";

function UserInformation() {
  const { userId } = useParams();
  const { userInformation } = useSelector((state) => state?.userInformation);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchUserInformation();
  }, [userId]);

  const fetchUserInformation = async () => {
    try {
      const res = await getUserInformation({ id: userId });
      dispatch(setUserInformation(res));
    } catch (error) {
      console.error("Error fetching user information:", error);
    }
  };

  return (
    <div className="py-7 flex justify-center">
      <div>
        <div className="flex xl:justify-around lg:justify-center lg:space-x-8 pt-8">
          <div className="h-28 xl:w-80 lg:w-64 bg-[#4d718768] rounded-lg text-[#b1bad3] p-2 shadow-sm shadow-[#4d718768]">
            <p className="text-xl font-semibold text-center">Total Bets</p>
            <p className="text-2xl font-bold text-center mt-2">
              {userInformation?.totalBets}
            </p>
          </div>
          <div className="h-28 xl:w-80 lg:w-64 bg-[#4d718768] rounded-lg text-[#b1bad3] p-2 shadow-sm shadow-[#4d718768]">
            <p className="text-xl font-semibold text-center">
              Total Amount Spent
            </p>
            <p className="text-2xl font-bold text-center mt-2">
              {userInformation?.totalAmountSpent}
            </p>
          </div>
          <div className="h-28 xl:w-80 lg:w-64 bg-[#4d718768] rounded-lg text-[#b1bad3] p-2 shadow-sm shadow-[#4d718768]">
            <p className="text-xl font-semibold text-center">
              Total Wins Amount
            </p>
            <p className="text-2xl font-bold text-center mt-2">
              {userInformation?.totalWinsAmount}
            </p>
          </div>
        </div>

        <div className="flex xl:space-x-7 lg:space-x-3.5 pt-20 item-center">
          <div className="h-full xl:w-full lg:w-[28.5rem]">
            <div className="bg-[#0f212e] shadow-lg shadow-[#0f212e] p-3">
              <WeeklyBetsAmount />
            </div>
            <div className="xl:mt-8 lg:mt-3.5 bg-[#0f212e] shadow-lg shadow-[#0f212e] p-2">
              <UserRatio />
            </div>
          </div>
          <div className="h-full xl:w-[37rem] lg:w-96">
            <div className="xl:mt-8 lg:mt-3.5 bg-[#0f212e] shadow-lg shadow-[#0f212e] p-2">
              <TopGames />
            </div>
            <div className="xl:mt-8 lg:mt-3.5 bg-[#0f212e] shadow-lg shadow-[#0f212e] py-4 px-4">
              <ul className="custom-list">
                <li className="text-lg font-bold text-[#b1bad3] mt-2 highest-bet relative pl-6">
                  Highest Bet Amount:{" "}
                  <span className="text-red-400">
                    {userInformation?.highestBetAmount}
                  </span>
                </li>
                <li className="text-lg font-bold text-[#b1bad3] mt-2 lowest-bet relative pl-6">
                  Lowest Bet Amount:{" "}
                  <span className="text-green-400">
                    {userInformation?.lowestBetAmount}
                  </span>
                </li>
                <li className="text-lg font-bold text-[#b1bad3] mt-2 average-bet relative pl-6">
                  Average Bet Amount:{" "}
                  <span className="text-blue-400">
                    {userInformation?.averageBetAmount}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserInformation;