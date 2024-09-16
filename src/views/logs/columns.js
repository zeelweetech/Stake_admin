import React from "react";

function Columns() {
  const columns = [
    {
      field: "userName",
      headerName: "User Name",
      width: 250,
      headerClassName: "column-header",
      cellClassName: "column-cell",
    },
    {
      field: "userId",
      headerName: "User Id",
      width: 250,
      headerClassName: "column-header",
      cellClassName: "column-cell",
    },
    {
      field: "action",
      headerName: "Action",
      width: 250,
      headerClassName: "column-header",
      cellClassName: "column-cell",
    },
    {
      field: "logTime",
      headerName: "Log Time",
      width: 250,
      headerClassName: "column-header",
      cellClassName: "column-cell",
    },
  ];
  return columns;
}

export default Columns;
