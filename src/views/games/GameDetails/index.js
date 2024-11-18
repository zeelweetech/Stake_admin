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
  const [isPanelVisible, setIsPanelVisible] = useState(false);

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
        id: data.pulls?.betId || index,
        userName: data.user?.userName || "-",
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
    setIsPanelVisible((prev) => !prev); // Toggle visibility
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

      {/* Slide Toggle Panel */}
      <div
        className={`fixed bottom-0 left-0 right-0 bg-[#213743] text-white p-6 mt-4 rounded-t-lg shadow-lg transition-transform duration-300 ${
          isPanelVisible ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-semibold">PLAYERS</h3>
          <Button onClick={() => setIsPanelVisible(false)} color="secondary">
            <CloseIcon />
          </Button>
        </div>

        <div className="space-y-4">
          {expandedRowData?.players?.length > 0 ? (
            expandedRowData.players.map((player, index) => (
              <div key={index} className="p-4 bg-gray-700 rounded-lg shadow-md space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-300">Username:</span>
                  <span>{player?.users?.userName || "Unknown"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-300">Amount:</span>
                  <span>{player?.amount || "0"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-300">Cashout Multiplier:</span>
                  <span>{player?.cashoutMultiplier || "0"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-300">Win Amount:</span>
                  <span>{player?.winAmount || "0"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-300">Pull Time:</span>
                  <span>{formatDateTime(player?.pullTime) || "-"}</span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400">No players data available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default GameDetails;
