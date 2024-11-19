import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { getGameHistory } from "../../../services/GameServices";
import GameDetailFilter from "./GameDetailFilter";
import { setPullsData } from "../../../features/games/gameDetails";
import Column from "./Column";

function GameDetails() {
  const { gameId, isPull: isPullParam } = useParams();
  const dispatch = useDispatch();

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [expandedRowData, setExpandedRowData] = useState(null);
  const [isPanelVisible, setIsPanelVisible] =useState(false)

  const { searchTerm } = useSelector((state) => state?.gameDataFilter);
  const { pullsData } = useSelector((state) => state?.gameDetail);

  const isPull = isPullParam === "t";

  useEffect(() => {
    getAllUserdata();
  }, [paginationModel.page, paginationModel.pageSize, searchTerm]);

  const getAllUserdata = async () => {
    setLoading(true);
    try {
      const response = await getGameHistory({
        id: gameId,
        page: paginationModel?.page + 1,
        limit: paginationModel?.pageSize,
        ...searchTerm,
        pullIdOperator: searchTerm?.pullId && "=",
        crashPointOperator: searchTerm?.crashPoint && "=",
        playerCountOperator: searchTerm?.playerCount && "=",
        playerCountMin: searchTerm?.playerCountMin || 1,
        playerCountMax: searchTerm?.playerCountMax || 15,
        totalAmountOperator: searchTerm?.totalAmount && "=",
      });

      dispatch(setPullsData(response?.pulls));
      setTotalCount(response?.totalPulls || 0);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date)) return "-";
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;
    const formattedTime = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    return `${formattedDate} ${formattedTime}`;
  };

  const rows = pullsData?.map((data, index) => {
    if (isPull) {
      return {
        id: data.pulls?.pullId || index,
        pullId: data?.pullId || "-",
        crashPoint: data?.crashPoint || "-",
        playerCount: data?.playerCount || "-",
        totalPullAmount: data?.totalPullAmount || "-",
        pullTime: formatDateTime(data?.pullTime),
        players: data?.players || [],
      };
    } else {
      return {
        userName: data.user?.userName || "-",
        id: data.pulls?.betId || index,
        email: data.user?.email || "-",
        betType: data?.betType || "-",
        gameId: data?.gameId || "-",
        betAmount: data?.betAmount || "-",
        multiplier: data?.multiplier || "-",
        cashOutAt: data?.cashOutAt || "-",
        winAmount: data?.winAmount || "-",
        betTime: formatDateTime(data?.betTime),
        lossAmount: data?.lossAmount ?? "-",
      };
    }
  });

  const handleRowClick = (params) => {
    console.log("Row Clicked Data:", params.row);
    setExpandedRowData(params.row);
    setIsPanelVisible((prev) => !prev); 
  };

  return (
    <div className="flex-1 mt-10">
      <GameDetailFilter getAllUserdata={getAllUserdata} />
      <DataGrid
        autoHeight
        rows={rows.length > 0 ? rows : []}
        columns={Column(isPull)}
        getRowId={(row) => row.id}
        loading={loading}
        rowCount={totalCount}
        paginationModel={paginationModel}
        paginationMode="server"
        onPaginationModelChange={setPaginationModel}
        pageSizeOptions={[10, 20]}
        className="select-none mt-6"
        onRowClick={handleRowClick}
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? "row-dark" : "row-light"
        }
        sx={{
          border: "none",
          color: "#b1bad3",
          "& .MuiDataGrid-cell": { border: "none" },
          "& .MuiDataGrid-columnHeader": {
            borderBottom: "none",
            borderTop: "none",
          },
          "& .MuiDataGrid-footerContainer": { borderTop: "none", color: "white" },
          "& .MuiTablePagination-root, .MuiTablePagination-selectIcon": {
            color: "white",
          },
        }}
      />

      <div
        className={`fixed bottom-0 left-0 right-0 bg-[#213743] text-white p-0 mt-2 rounded-t-lg shadow-lg transition-transform duration-300 ${
          isPanelVisible ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          {/* <h3 className="text-2xl font-semibold">PLAYERS</h3> */}
          <Button onClick={() => setIsPanelVisible(false)} color="secondary">
            <CloseIcon />
          </Button>
        </div> 
        <div className="overflow-x-auto bg-[#0f212e] rounded-lg shadow-md p-4">
  {expandedRowData?.players?.length > 0 ? (
    <table className="min-w-full border-collapse border border-gray-700 text-gray-300">
      <thead>
        <tr className="bg-gray-800">
          <th className="p-3 border border-gray-700 text-left">Id</th>
          <th className="p-3 border border-gray-700 text-left">Username</th>
          <th className="p-3 border border-gray-700 text-left">Player Name</th>
          <th className="p-3 border border-gray-700 text-left">Amount</th>
          <th className="p-3 border border-gray-700 text-left">Cashout Multiplier</th>
          <th className="p-3 border border-gray-700 text-left">Win Amount</th>
          <th className="p-3 border border-gray-700 text-left">Loss Amount</th>
          <th className="p-3 border border-gray-700 text-left">Pull Time</th>
        </tr>
      </thead>
      <tbody>
        {expandedRowData.players.map((player, index) => (
          <tr
            key={index}
            className={`${index % 2 === 0 ? "bg-gray-900" : "bg-gray-800"} hover:bg-gray-700`}
          >
            <td className="p-3 border border-gray-700">{player?.id || "Unknown"}</td>
            <td className="p-3 border border-gray-700">{player?.users?.userName || "Unknown"}</td>
            <td className="p-3 border border-gray-700">{player?.playerName || "Unknown"}</td>
            <td className="p-3 border border-gray-700">{player?.amount || "0"}</td>
            <td className="p-3 border border-gray-700">
              {player?.cashoutMultiplier || "0"}
            </td>
            <td className="p-3 border border-gray-700">{player?.winAmount || "0"}</td>
            <td className="p-3 border border-gray-700">{player?.lossAmount || "0"}</td>
            <td className="p-3 border border-gray-700">
              {formatDateTime(player?.pullTime) || "-"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <p className="text-gray-400">No players data available.</p>
  )}
</div>

      </div>
    </div> 
  );
}

export default GameDetails;

