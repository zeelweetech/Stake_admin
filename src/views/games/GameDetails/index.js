import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getGameHistory } from "../../../services/GameServices";
import Column from "./Column";
import { useDispatch, useSelector } from "react-redux";
import GameDetailFilter from "./GameDetailFilter";
import { setPullsData } from "../../../features/games/gameDetails";
import { DialogActions, Button, IconButton } from "@mui/material";
import Popup from "reactjs-popup";
import CloseIcon from "@mui/icons-material/Close";

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
        data: isPull,
        page: paginationModel?.page + 1,
        limit: paginationModel?.pageSize,
        ...searchTerm,
        pullIdOperator: searchTerm?.pullId && "=",
        crashPointOperator: searchTerm?.crashPoint && "=",
        playerCountOperator: searchTerm?.playerCount && "=",
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
    setExpandedRowData(params.row);  
  };

  const handleClosePopup = () => {
    setExpandedRowData(null);  
  };

  return (
    <div className="flex-1 mt-10">
      <GameDetailFilter getAllUserdata={getAllUserdata} />
      <DataGrid
        autoHeight
        rows={rows}
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
      <Popup open={expandedRowData !== null} onClose={handleClosePopup} modal>
        <div className="popup-content bg-[#213743] text-white p-6 rounded-lg shadow-lg max-w-lg mx-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-semibold">Row Details</h3>
            <div className="flex justify-end">
              <IconButton onClick={handleClosePopup}>
                <CloseIcon className="text-[#b1bad3]" />
              </IconButton>
            </div>
          </div>
          <div className="space-y-2">
            {expandedRowData && (
              <>
                {Object.keys(expandedRowData).map((key) => (
                  <div key={key} className="flex justify-between">
                    <span className="font-medium text-gray-300">{key}:</span>
                    <span>{expandedRowData[key]}</span>
                  </div>
                ))}
              </>
            )}
          </div>
          <DialogActions className="mt-4">
            <Button
              onClick={handleClosePopup}
              sx={{
                backgroundColor: "#ff638433",
                px: "1rem",
                py: "0.5rem",
                color: "#b1bad3",
                border: "1px solid #ff6384",
              }}
            >
              Close
            </Button>
          </DialogActions>
        </div>
      </Popup>

    </div>
  );
}

export default GameDetails;
