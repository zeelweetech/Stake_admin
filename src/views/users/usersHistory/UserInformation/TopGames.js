import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import { useSelector } from "react-redux";

const Columns = [
  {
    field: "gameName",
    headerName: "Game Name",
    width: 190,
    headerClassName: "column-header",
    cellClassName: "column-cell",
    sortable: false,
    disableColumnMenu: true,
  },
  {
    field: "totalWinAmount",
    headerName: "Total Woi Amount",
    width: 150,
    headerClassName: "column-header",
    cellClassName: "column-cell",
    sortable: false,
    disableColumnMenu: true,
  },
  {
    field: "gameId",
    headerName: "Game Id",
    width: 150,
    headerClassName: "column-header",
    cellClassName: "column-cell",
    sortable: false,
    disableColumnMenu: true,
  },
];

function TopGames() {

    const { userInformation } = useSelector((state) => state?.userInformation);

    const rows = userInformation?.topGames?.map((item, index) => ({
    id: index,
    gameName: item?.game?.gameName,
    totalWinAmount: item?.totalWinAmount,
    gameId: item?.gameId,
  }));

  return (
    <div className="pb-3">
      <p className="text-xl font-bold text-center py-4 text-[#b1bad3]">
        Top Three Games
      </p>
      <div className="flex justify-center m-auto">
        {userInformation?.topGames?.length > 0 ? (
          <DataGrid
            rows={rows}
            columns={Columns}
            hideFooter
            getRowClassName={(params) =>
              params.indexRelativeToCurrentPage % 2 === 0
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
        ) : (
          "No Top Three Data Found"
        )}
      </div>
    </div>
  );
}

export default TopGames;