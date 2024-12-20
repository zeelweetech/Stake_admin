import React from "react";
import { useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid"; // make sure to install this package if not already installed

const columns = [
  {
    field: "profit",
    headerName: "Profit",
    width: 200,
    headerClassName: "column-header",
  },
  {
    field: "firstName",
    headerName: "First Name",
    width: 200,
    headerClassName: "column-header",
  },
  {
    field: "lastName",
    headerName: "Last Name",
    width: 200,
    headerClassName: "column-header",
  },
  {
    field: "medalType",
    headerName: "Medal",
    width: 200,
    headerClassName: "column-header",
  },
  {
    field: "userId",
    headerName: "User Id",
    width: 200,
    headerClassName: "column-header",
  }
];

function TopUsers() {
  const { dashboardData } = useSelector((state) => state?.dashBoard);

  const rows = dashboardData?.topUsers?.map((log, index) => ({
    id: index,
    userId: log.userId,
    firstName: log.user?.firstName || "Unknown",
    lastName: log.user?.lastName || "N/A",
    profit: log.profit,
    medalType: log.user?.medal?.medalType,
  })) ;

  return (
    <div>
        <p className="text-xl font-bold text-center py-6 text-[#b1bad3]">
        Top Users
      </p>
      <div className="p-2">
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
        height:220,
        // overflowY: 'hidden',
    }}
      />
    </div>
    </div>
  );
}

export default TopUsers;
