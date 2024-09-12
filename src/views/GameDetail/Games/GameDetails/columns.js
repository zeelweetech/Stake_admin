import React from "react";

function Columns() {
  const columns = [
    {
      field: "pullId",
      headerName: "pullId",
      width: 250,
      headerClassName: "column-header",
      cellClassName: "column-cell",
    },
    {
      field: "crashPoint",
      headerName: "crashPoint",
      width: 250,
      headerClassName: "column-header",
      cellClassName: "column-cell",
    },
    {
      field: "playerCount",
      headerName: "playerCount",
      width: 220,
      headerClassName: "column-header",
      cellClassName: "column-cell",
    },
    {
      field: "totalPullAmount",
      headerName: "totalPullAmount",
      width: 220,
      headerClassName: "column-header",
      cellClassName: "column-cell",
    },
    {
      field: "pullTime",
      headerName: "pullTime",
      width: 210,
      headerClassName: "column-header",
      cellClassName: "column-cell",
    },
  ];
  return columns;
}

export default Columns;
