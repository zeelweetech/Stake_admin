import React, { useEffect, useState } from "react";
import "../../App.css";
import Loader from "../component/Loader";
import { getAllGame } from "../../services/GameServices";
import CrashGame from "./CrashGame";
import { useNavigate } from "react-router-dom";

export default function GameDetail() {
  const [loading, setLoading] = useState(false);
  const [gameData, setGameData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    GameAllData();
  }, []);

  console.log("gameData", gameData);

  const GameAllData = async () => {
    await getAllGame()
      .then((response) => {
        console.log("response 5489768975489", response);
        setGameData(response.games);
      })
      .catch((err) => {
        console.log("GameAllData error : ", err);
      });
  };

  const handleGameData = (name, id) => {
    console.log("&&&&&", name, id);
    navigate(`/games/${name}/${id}`);
    // if(name === )
  };

  return (
    <div className="bg-[#1a2c38] h-screen flex flex-col">
      {loading ? (
        <Loader />
      ) : (
        <div className="flex justify-center items-center h-screen">
          <div className="flex space-x-4">
            {gameData.map((data) => (
              <div>
                <img
                  src={data.gameImage}
                  className="xl:w-44 lg:w-36 lg:h-48 xl:h-56 rounded-md hover:cursor-pointer transition-transform duration-300 hover:translate-y-[-10px]"
                  alt="Not Found"
                  onClick={() => handleGameData(data?.gameName, data?.id)}
                />
                {console.log("data : ", data)}
                <p className="text-white text-center text-xl font-medium mt-2">
                  {data.gameName}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
