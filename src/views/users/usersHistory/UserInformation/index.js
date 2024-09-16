import { DataGrid } from "@mui/x-data-grid";
import React, { useState } from "react";
import Columns from "./columns";

const UserInformation = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState();

  const rows = () => {};
  return (
    <>
      <div className="flex-1 mt-10">
        <DataGrid
          rows={rows}
          columns={Columns()}
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
      </div>
    </>
  );
};

export default UserInformation;
