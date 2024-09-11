import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";
import { getCommissionList } from "../../../services/GameServices";

export default function GameInformation({ setLoading, commissionData, setCommissionData }) {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState();

  useEffect(() => {
    getAllUserdata();
  }, []);

  const getAllUserdata = async () => {
    try {
      const response = await getCommissionList(page, pageSize);
    //   console.log("response : ", response);
      setCommissionData(response?.data || []);
      // setLoading(false);
    } catch (error) {
      console.error("Failed to fetch users: ", error);
      setLoading(false);
    }
  };
//   console.log("commissionData *****", commissionData);

  const columns = [
    {
      field: "gameId",
      headerName: "gameId",
      width: 250,
      headerClassName: "column-header",
      cellClassName: "column-cell",
    },
    {
      field: "commission",
      headerName: "commission",
      width: 250,
      headerClassName: "column-header",
      cellClassName: "column-cell",
    },
    {
      field: "startTime",
      headerName: "startTime",
      width: 250,
      headerClassName: "column-header",
      cellClassName: "column-cell",
    },
    {
      field: "endTime",
      headerName: "endTime",
      width: 220,
      headerClassName: "column-header",
      cellClassName: "column-cell",
    },
    {
      field: "Edit",
      headerName: "Edit",
      width: 180,
      headerClassName: "column-header",
      cellClassName: "column-cell",
      renderCell: () => (
        <button>
          <MdEdit />
        </button>
      ),
    },
  ];

  const rows = commissionData.map((gameData) => {
    // console.log(gameData);
    return {
      id: gameData.id,
      gameId: gameData.gameId,
      commission: gameData.commissionPercentage,
      startTime: gameData.startTime,
      endTime: gameData.endTime,
      Edit: gameData.game.gameName,
    };
  });

  return (
    <div className="flex-1 mt-10">
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 1, pageSize: 10 },
          },
        }}
        page={page}
        pageSize={pageSize}
        onPageChange={(newPage) => setPage(newPage)}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        pageSizeOptions={[10, 20]}
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

