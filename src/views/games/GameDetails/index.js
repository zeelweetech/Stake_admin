import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
} from "@mui/material";
import { getGameHistory } from "../../../services/GameServices";
import Column from "./Column";
import GameDetailPlayers from "./GameDetailPlayer";

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
  const [expandedRow, setExpandedRow] = useState(null);

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
      setPullsData(response?.pulls);
      const allPlayers = response?.pulls?.flatMap((pull) => pull.players || []);
      setUserData(allPlayers);
      setTotalCount(response?.totalPulls);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch users: ", error);
      setLoading(false);
    }
  };

  const rows = pullsData?.map((pullsData) => {
    return {
      pullId: pullsData.pullId,
      CrashPoint: pullsData.crashPoint,
      PlayerCount: pullsData.playerCount,
      TotalPullAmount: pullsData.totalPullAmount,
      PullTime: pullsData.pullTime,
      expanded: expandedRow === pullsData.pullId,
    };
  });

  const rowsWithDetails = rows
    .flatMap((row) => [
      row,
      expandedRow === row.pullId
        ? {
            id: `details-${row.pullId}`,
            isDetailsRow: true,
            pullId: row.pullId,
            // pullsData.map((row) => (
            //   <div key={row?.pullId}>
            //     {expandedRow === row?.pullId && (
            //       <Accordion expanded={true} sx={{ background: "#1a2c38" }}>
            //         <AccordionSummary>
            //           Game Details for {row?.pullId}
            //         </AccordionSummary>
            //         <AccordionDetails>
            //           {/* <GamePlayersColumn pullId={row.pullId} /> */}
            //           <GameDetailPlayers
            //             pullId={row?.pullId}
            //             userData={userData.filter(
            //               (player) => player.pullId === row.pullId
            //             )}
            //           />
            //         </AccordionDetails>
            //       </Accordion>
            //     )}
            //   </div>
            // )),
          }
        : null,
    ])
    .filter(Boolean);

  const columnsWithDetails = [
    ...Column(),
    {
      field: "details",
      headerName: "Details",
      width: 200,
      renderCell: (params) =>
        params.row.isDetailsRow && (
          <Box sx={{ padding: 2 }}>
            <GameDetailPlayers pullId={params.row.pullId} userData={userData} />
          </Box>
        ),
    },
  ];

  const handleRowClick = (params) => {
    const clickedRowId = params.row.pullId;
    setExpandedRow((prev) => (prev === clickedRowId ? null : clickedRowId));
  };

  return (
    <div className="flex-1 mt-10">
      <DataGrid
        autoHeight
        // rows={rows}
        // columns={Column()}
        rows={rowsWithDetails}
        columns={columnsWithDetails}
        getRowId={(row) => row.pullId}
        loading={loading}
        rowCount={totalCount}
        paginationModel={paginationModel}
        paginationMode="server"
        onPaginationModelChange={setPaginationModel}
        pageSizeOptions={[10, 20]}
        onRowClick={handleRowClick}
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? "row-dark" : "row-light"
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
      {pullsData.map((row) => (
      <div key={row?.pullId}>
        {expandedRow === row?.pullId && (
          <Accordion expanded={true} sx={{ background: "#1a2c38" }}>
            <AccordionSummary>Game Details for {row?.pullId}</AccordionSummary>
            <AccordionDetails>
              {/* <GamePlayersColumn pullId={row.pullId} /> */}
              <GameDetailPlayers
                pullId={row?.pullId}
                userData={userData.filter(
                  (player) => player.pullId === row.pullId
                )}
              />
            </AccordionDetails>
          </Accordion>
        )}
      </div>
      ))}
    </div>
  );
}

export default GameDetails;

// pullsData.map((row) => (
//     <div key={row?.pullId}>
//       {expandedRow === row?.pullId && (
//         <Accordion expanded={true} sx={{ background: "#1a2c38" }}>
//           <AccordionSummary>
//             Game Details for {row?.pullId}
//           </AccordionSummary>
//           <AccordionDetails>
//             {/* <GamePlayersColumn pullId={row.pullId} /> */}
//             <GameDetailPlayers
//               pullId={row?.pullId}
//               userData={userData.filter(
//                 (player) => player.pullId === row.pullId
//               )}
//             />
//           </AccordionDetails>
//         </Accordion>
//       )}
//     </div>
//   )),
