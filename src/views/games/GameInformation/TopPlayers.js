import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import { useSelector } from "react-redux";

const Columns = [
  {
    field: "userName",
    headerName: "User Name",
    width: 190,
    headerClassName: "column-header",
    cellClassName: "column-cell",
    sortable: false,
    disableColumnMenu: true,
  },
  {
    field: "totalWon",
    headerName: "Total Won",
    width: 150,
    headerClassName: "column-header",
    cellClassName: "column-cell",
    sortable: false,
    disableColumnMenu: true,
  },
  {
    field: "totalSpent",
    headerName: "Total Spent",
    width: 150,
    headerClassName: "column-header",
    cellClassName: "column-cell",
    sortable: false,
    disableColumnMenu: true,
  },
  {
    field: "netGain",
    headerName: "Net Gain",
    width: 150,
    headerClassName: "column-header",
    cellClassName: "column-cell",
    sortable: false,
    disableColumnMenu: true,
  },
];

function TopPlayers() {
  const { gameInformation } = useSelector((state) => state?.crashGame);

  const rows = gameInformation?.topPlayers?.map((item, index) => ({
    id: index,
    userName: item?.userName,
    totalWon: item?.totalWon,
    totalSpent: item?.totalSpent,
    netGain: item?.netGain,
  }));

  return (
    <div className="pb-3">
      <p className="text-xl font-bold text-center py-4 text-[#b1bad3]">
        Top Three Players
      </p>
      <div className="flex justify-center m-auto">
        {gameInformation?.topPlayers?.length > 0 ? (
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

export default TopPlayers;
