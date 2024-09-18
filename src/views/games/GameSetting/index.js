import React, { useState } from "react";
import { ChangeGameStatus } from "../../../services/GameServices";
import { useParams } from "react-router-dom";
import { getCommissionById } from "../../../services/CommissionServices";
import Commission from "./Commission";

export default function GameCommissions() {
  const { gameId } = useParams();
  const [gameMenu, setGameMenu] = useState();
  const [commissionData, setCommissionData] = useState(false);
  const [gameCommission, setGameCommission] = useState([]);
  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 10,
  });
  const [totalCount, setTotalCount] = useState(0);

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
        <div className="flex items-center space-x-20">
          <div className="flex space-x-2 items-center text-white mt-4">
            <p>Game status : </p>
            <div className="bg-[#0f212e] flex rounded-full p-[5px] flex-shrink-0 space-x-2 text-xs">
              <button
                className={`py-2 px-5 rounded-full flex justify-center text-base space-x-1.5 items-center ${
                  gameMenu === "Active"
                    ? "bg-[#4d718768] text-[#00ff00]"
                    : "hover:bg-[#4d718768]"
                }`}
                onClick={async () => {
                  setGameMenu("Active");
                  console.log("gameStatus", true);
                  const body = {
                    isActive: true,
                  };

                  await ChangeGameStatus({
                    gameId: gameId,
                    body: body,
                  });
                }}
              >
                <p>Active</p>
              </button>
              <button
                className={`py-2 px-5 rounded-full flex justify-center text-base space-x-1.5 items-center ${
                  gameMenu === "Inactive"
                    ? "bg-[#4d718768] text-[#ff0000]"
                    : "hover:bg-[#4d718768]"
                }`}
                onClick={async () => {
                  setGameMenu("Inactive");
                  console.log("gameStatus", false);
                  const body = {
                    isActive: false,
                  };

                  await ChangeGameStatus({
                    gameId: gameId,
                    body: body,
                  });
                }}
              >
                <p>Inactive</p>
              </button>
            </div>
          </div>
          <div className="flex items-center mt-5 space-x-2 text-white">
            <p>Game Commission : </p>
            <button
              className="w-36 py-2 font-medium text-white bg-[#213743]"
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
