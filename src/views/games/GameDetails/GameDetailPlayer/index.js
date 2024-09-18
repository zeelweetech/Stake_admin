import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import React, { useState } from "react";
import GamePlayersColumn from "./Column";
import { DataGrid } from "@mui/x-data-grid";

export default function GameDetailPlayers({ userData }) {
  const [loading, setLoading] = useState(false);

  const playerRows = (userData || []).map((Data) => ({
    id: Data?.id,
    amount: Data?.amount,
    playerName: Data?.playerName,
    Winner: Data?.isWinner,
    lossAmount: Data?.lossAmount,
    winAmount: Data?.winAmount,
  }));
  return (
    <div>
      <DataGrid
        autoHeight
        rows={playerRows}
        columns={GamePlayersColumn()}
        getRowId={(row) => row?.id}
        loading={loading}
        // rowCount={totalCount}
        // paginationModel={paginationModel}
        // paginationMode="server"
        // onPaginationModelChange={setPaginationModel}
        // pageSizeOptions={[10, 20]}
        // onRowClick={handleRowClick}
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
    </div>
  );
}


// {pullsData.map((row) => (
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
// ))}
