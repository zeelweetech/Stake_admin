import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getGameHistory } from "../../../../services/GameServices";
import Columns from "./columns";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import GameDetailPlayers from "./gameDetailPlayers";

function GameDetails() {
  const { gameId } = useParams();
  const [pullsData, setPullsData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 10,
  });
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedPullId, setSelectedPullId] = useState(null);
  const [alwaysOpen, setAlwaysOpen] = React.useState(true);

  useEffect(() => {
    getAllUserdata();
  }, [paginationModel?.page, paginationModel?.pageSize]);

  const getAllUserdata = async () => {
    setLoading(true);
    try {
      const response = await getGameHistory({
        id: gameId,
        page: paginationModel?.page + 1,
        pageSize: paginationModel?.pageSize,
      });
      console.log("response : ", response);
      setPullsData(response?.pulls);
      const allPlayers = response?.pulls?.flatMap((pull) => pull.players || []);
      setUserData(allPlayers);
      setTotalCount(response?.totalPulls);
      setLoading(false);
      console.log("userData", userData);
    } catch (error) {
      console.error("Failed to fetch users: ", error);
      setLoading(false);
    }
  };

  const rows = pullsData?.map((pullsData) => {
    return {
      pullId: pullsData.pullId,
      crashPoint: pullsData.crashPoint,
      playerCount: pullsData.playerCount,
      totalPullAmount: pullsData.totalPullAmount,
      pullTime: pullsData.pullTime,
    };
  });

  const filteredPlayers = userData?.filter(
    (player) => player.pullId === selectedPullId
  );
  const playerRows = filteredPlayers?.map((userData) => ({
    id: userData.id,
    amount: userData.amount,
    playerName: userData.playerName,
    Winner: userData.isWinner,
    lossAmount: userData.lossAmount,
    winAmount: userData.winAmount,
  }));

  const handleRowClick = (params) => {
    setSelectedPullId(params.row.pullId); 
  };

  return (
    <div className="flex-1 mt-10">
      <Accordion open={alwaysOpen}>
        <AccordionSummary>
          <DataGrid
            rows={rows}
            columns={Columns()}
            getRowId={(row) => row.pullId}
            loading={loading}
            rowCount={totalCount}
            paginationModel={paginationModel}
            paginationMode="server"
            onPaginationModelChange={setPaginationModel}
            pageSizeOptions={[10, 20]}
            onRowClick={handleRowClick}
            getRowClassName={(params) =>
              params.indexRelativeToCurrentPage % 2 === 0
                ? "row-dark"
                : "row-light"
            }
            className="select-none"
            sx={{
              border: "none",
              color: "#b1bad3",
              "& .MuiDataGrid-cell": {
                border: "none",
              },
              "& .MuiDataGrid-columnHeader": {
                borderBottom: "none",
                borderTop: "none",
              },
              "& .MuiDataGrid-footerContainer": {
                borderTop: "none",
                borderBottom: "none",
                color: "white",
              },
              "& .MuiTablePagination-root": {
                color: "white",
              },
              "& .MuiTablePagination-selectIcon": {
                color: "white",
              },
            }}
          />
        </AccordionSummary>
        <AccordionDetails>
          {selectedPullId && filteredPlayers.length > 0 && (
            <DataGrid
              rows={playerRows}
              columns={GameDetailPlayers()}
              getRowId={(row) => row.id}
              paginationMode="server"
              getRowClassName={(params) =>
                params.indexRelativeToCurrentPage % 2 === 0
                  ? "row-dark"
                  : "row-light"
              }
              className="select-none"
              sx={{
                border: "none",
                color: "#b1bad3",
                "& .MuiDataGrid-cell": {
                  border: "none",
                },
                "& .MuiDataGrid-columnHeader": {
                  borderBottom: "none",
                  borderTop: "none",
                },
                "& .MuiDataGrid-footerContainer": {
                  borderTop: "none",
                  borderBottom: "none",
                  color: "white",
                },
                "& .MuiTablePagination-root": {
                  color: "white",
                },
                "& .MuiTablePagination-selectIcon": {
                  color: "white",
                },
              }}
            />
          )}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default GameDetails;
