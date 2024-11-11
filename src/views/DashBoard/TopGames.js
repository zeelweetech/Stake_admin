import React from "react";
import { useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid"; // make sure to install this package if not already installed

const columns = [
  {
    field: "betCount",
    headerName: "Bet Count",
    width: 200,
    headerClassName: "column-header",
  },
  {
    field: "gameName",
    headerName: "Game Name",
    width: 200,
    headerClassName: "column-header",
  },
  {
    field: "gameType",
    headerName: "Game Type",
    width: 200,
    headerClassName: "column-header",
  },
  {
    field: "gameId",
    headerName: "Game Id",
    width: 200,
    headerClassName: "column-header",
  },
];

function TopGames() {
  const { dashboardData } = useSelector((state) => state?.dashBoard);

  const rows = dashboardData?.topGames?.map((log, index) => ({
    id: index,
    betCount: log.betCount,
    gameName: log.game?.gameName,
    gameType: log.game?.gameType,
    gameId: log.gameId,
  })) || [];

  return (
    <div style={{ height: 400, width: '100%' }}>
        <p className="text-xl font-bold text-center py-4 text-[#b1bad3]">
        Top Games
      </p>
      <DataGrid
        rows={rows}
        columns={columns}
        
        hideFooter
        getRowClassName={(params) =>  params.indexRelativeToCurrentPage % 2 === 0
            ? "row-dark"
            : "row-light"
    }
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
        overflowY: 'hidden',
    }}
      />
    </div>
  );
}

export default TopGames;
