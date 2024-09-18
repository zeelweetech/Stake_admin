import React, { useEffect } from "react";
import { getGameInformation } from "../../../services/GameServices";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setGameInformation } from "../../../features/games/crashSlice";
import BetDistribution from "./BetDistribution";
import WeeklyBetsAmount from "./WeeklyBetsAmount";
import TopPlayers from "./TopPlayers";
import GameRatio from "./GameRatio";

function GameInformation() {
  const { gameId } = useParams();
  const dispatch = useDispatch();
  const { gameInformation } = useSelector((state) => state?.crashGame);
  console.log("gameInformation", gameInformation);

  useEffect(() => {
    GameInformation();
  }, []);

  const GameInformation = async () => {
    await getGameInformation({ id: gameId })
      .then((res) => {
        dispatch(setGameInformation(res));
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  return (
    <div className="py-7 flex justify-center">
      <div>
        <div className="flex xl:justify-around lg:justify-center lg:space-x-8 pt-8">
          <div className="h-28 xl:w-80 lg:w-64 bg-[#4d718768] rounded-lg text-[#b1bad3] p-2 shadow-sm shadow-[#4d718768]">
            <p className="text-xl font-semibold text-center">Total Bets</p>
            <p className="text-2xl font-bold text-center mt-2">
              {gameInformation?.totalBets}
            </p>
          </div>
          <div className="h-28 xl:w-80 lg:w-64 bg-[#4d718768] rounded-lg text-[#b1bad3] p-2 shadow-sm shadow-[#4d718768]">
            <p className="text-xl font-semibold text-center">
              Total Amount Spent
            </p>
            <p className="text-2xl font-bold text-center mt-2">
              {gameInformation?.totalAmountSpent}
            </p>
          </div>
          <div className="h-28 xl:w-80 lg:w-64 bg-[#4d718768] rounded-lg text-[#b1bad3] p-2 shadow-sm shadow-[#4d718768]">
            <p className="text-xl font-semibold text-center">
              Total Wins Amount
            </p>
            <p className="text-2xl font-bold text-center mt-2">
              {gameInformation?.totalWinsAmount}
            </p>
          </div>
        </div>
        <div className="flex xl:space-x-7 lg:space-x-3.5 pt-20 item-center">
          <div className="h-full xl:w-full lg:w-[28.5rem]">
            <div className="bg-[#0f212e] shadow-lg shadow-[#0f212e] p-3">
              <WeeklyBetsAmount />
            </div>
            <div className="xl:mt-8 lg:mt-3.5 bg-[#0f212e] shadow-lg shadow-[#0f212e] p-2">
              <GameRatio />
            </div>
          </div>
          <div className="h-full xl:w-[37rem] lg:w-96">
            <div className="bg-[#0f212e] shadow-lg shadow-[#0f212e] p-2">
              <BetDistribution />
            </div>
            <div className="xl:mt-8 lg:mt-3.5 bg-[#0f212e] shadow-lg shadow-[#0f212e] p-2">
              <TopPlayers />
            </div>
            <div className="xl:mt-8 lg:mt-3.5 bg-[#0f212e] shadow-lg shadow-[#0f212e] py-4 px-4">
              <ul className="custom-list">
                <li className="text-lg font-bold text-[#b1bad3] mt-2 highest-bet relative pl-6">
                  Highest Bet Amount:{" "}
                  <span className="text-red-400">
                    {gameInformation?.highestBetAmount}
                  </span>
                </li>
                <li className="text-lg font-bold text-[#b1bad3] mt-2 lowest-bet relative pl-6">
                  Lowest Bet Amount:{" "}
                  <span className="text-green-400">
                    {gameInformation?.lowestBetAmount}
                  </span>
                </li>
                <li className="text-lg font-bold text-[#b1bad3] mt-2 average-bet relative pl-6">
                  Average Bet Amount :{" "}
                  <span className="text-blue-400">
                    {gameInformation?.averageBetAmount}
                  </span>
                </li>
              </ul>
            </div>
            <div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameInformation;
