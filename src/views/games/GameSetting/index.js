import React, { useEffect, useState } from "react";
import {
  ChangeGameStatus,
  getGameInformation,
} from "../../../services/GameServices";
import { useParams } from "react-router-dom";
import { getCommissionById } from "../../../services/CommissionServices";
import Commission from "./Commission";

export default function GameCommissions() {
  const { gameId } = useParams();
  const [gameMenu, setGameMenu] = useState();
  const [isActive, setIsActive] = useState(false);
  const [commissionData, setCommissionData] = useState(false);
  const [gameCommission, setGameCommission] = useState([]);
  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 10,
  });
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    fetchGameInformation();
  }, [gameId]);

  const fetchGameInformation = async () => {
    try {
      const response = await getGameInformation({ id: gameId });
      setIsActive(response?.isActive);
      setGameMenu(response?.isActive ? "Active" : "Inactive");
    } catch (error) {
      console.error("Failed to fetch game information: ", error);
    }
  };

  const fetchGameStatus = async (newStatus) => {
    if (gameMenu !== newStatus) {
      setGameMenu(newStatus);
      const body = {
        isActive: newStatus === "Active",
      };
      try {
        await ChangeGameStatus({
          gameId,
          body: body,
        });
      } catch (error) {
        console.error("Failed to change game status: ", error);
      }
    }
  };

  const handleCommission = async (e) => {
    e.preventDefault();
    await CommissionById();
    setCommissionData(true);
  };

  const CommissionById = async () => {
    try {
      const response = await getCommissionById({
        gameId,
        page: paginationModel?.page + 1,
        pageSize: paginationModel?.pageSize,
      });
      setGameCommission(response?.data);
      setTotalCount(response?.totalPulls);
    } catch (error) {
      console.error("Failed to fetch commission: ", error);
    }
  };

  return (
    <div className="mt-8">
      {!commissionData ? (
        <div className="flex items-center space-x-20 mt-5 justify-between">
          <div className="flex space-x-2 items-center text-white mt-4 ">
            <p>Game status : </p>
            <div className="bg-[#0f212e] flex rounded-full p-[5px] flex-shrink-0 space-x-2 text-xs">
              <button
                className={`py-2 px-5 rounded-full flex justify-center text-base space-x-1.5 items-center ${
                  gameMenu === "Active"
                    ? "bg-[#4d718768] text-[#00ff00]"
                    : "hover:bg-[#4d718768] text-white"
                }`}
                onClick={() => fetchGameStatus("Active")}
              >
                <p>Active</p>
              </button>
              <button
                className={`py-2 px-5 rounded-full flex justify-center text-base space-x-1.5 items-center ${
                  gameMenu === "Inactive"
                    ? "bg-[#4d718768] text-[#ff0000]"
                    : "hover:bg-[#4d718768] text-white"
                }`}
                onClick={() => fetchGameStatus("Inactive")}
              >
                <p>Inactive</p>
              </button>
            </div>
          </div>
          <div className="flex items-center mt-4 space-x-2 text-white">
            <p>Game Commission : </p>
            <button
              className="w-36 py-2 font-medium text-white bg-[#213743] hover:bg-[#405f70]"
              onClick={(e) => handleCommission(e)}
            >
              Commission
            </button>
          </div>
        </div>
      ) : (
        <Commission
          setCommissionData={setCommissionData}
          setGameCommission={setGameCommission}
          totalCount={totalCount}
          gameCommission={gameCommission}
          paginationModel={paginationModel}
          setPaginationModel={setPaginationModel}
        />
      )}
    </div>
  );
}
