import React from "react";

function Column() {
  const columns = [
    {
      field: "pullId",
      headerName: "Pool Id",
      width: 250,
      headerClassName: "column-header",
      cellClassName: "column-cell",
    },
    {
      field: "CrashPoint",
      headerName: "Crash Point",
      width: 250,
      headerClassName: "column-header",
      cellClassName: "column-cell",
    },
    {
      field: "PlayerCount",
      headerName: "Player Count",
      width: 220,
      headerClassName: "column-header",
      cellClassName: "column-cell",
    },
    {
      field: "TotalPullAmount",
      headerName: "Total Pool Amount",
      width: 220,
      headerClassName: "column-header",
      cellClassName: "column-cell",
    },
    {
      field: "PullTime",
      headerName: "Pool Time",
      width: 214,
      headerClassName: "column-header",
      cellClassName: "column-cell",
    },
  ];
  return columns;
}

export default Column;
