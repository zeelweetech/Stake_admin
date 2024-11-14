// Column.js
import React from "react";

function Column(isPull) {
  if (isPull === "true") {
    return [
      {
        field: "pullId",
        headerName: "Pool Id",
        width: 200,
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
        headerName: "Total Pull Amount",
        width: 220,
        headerClassName: "column-header",
        cellClassName: "column-cell",
      },
      {
        field: "PullTime",
        headerName: "Pull Time",
        width: 214,
        headerClassName: "column-header",
        cellClassName: "column-cell",
      },
    ];
  } else {
    return [
      {
        field: "id",
        headerName: "ID",
        width: 250,
        headerClassName: "column-header",
        cellClassName: "column-cell",
      },
      {
        field: "betType",
        headerName: "Bet Type",
        width: 250,
        headerClassName: "column-header",
        cellClassName: "column-cell",
      },
      {
        field: "gameId",
        headerName: "Game ID",
        width: 220,
        headerClassName: "column-header",
        cellClassName: "column-cell",
      },
      {
        field: "betAmount",
        headerName: "Bet Amount",
        width: 220,
        headerClassName: "column-header",
        cellClassName: "column-cell",
      },
      {
        field: "multiplier",
        headerName: "Multiplier",
        width: 214,
        headerClassName: "column-header",
        cellClassName: "column-cell",
      },
      {
        field: "cashOutAt",
        headerName: "Cash Out At",
        width: 214,
        headerClassName: "column-header",
        cellClassName: "column-cell",
      },
      {
        field: "winAmount",
        headerName: "Win Amount",
        width: 214,
        headerClassName: "column-header",
        cellClassName: "column-cell",
      },
      {
        field: "betTime",
        headerName: "Bet Time",
        width: 214,
        headerClassName: "column-header",
        cellClassName: "column-cell",
      },
      {
        field: "userName",
        headerName: "User Name",
        width: 214,
        headerClassName: "column-header",
        cellClassName: "column-cell",
      },
      {
        field: "lossAmount",
        headerName: "Loss Amount",
        width: 214,
        headerClassName: "column-header",
        cellClassName: "column-cell",
      },
    ];
  }
}

export default Column;
