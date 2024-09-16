import React from "react";

const GamePlayersColumn = () => {
  const columns = [
    {
      field: "amount",
      headerName: "Amount",
      width: 210,
      headerClassName: "column-header",
      cellClassName: "column-cell",
    },
    {
      field: "playerName",
      headerName: "Player Name",
      width: 210,
      headerClassName: "column-header",
      cellClassName: "column-cell",
    },
    {
      field: "Winner",
      headerName: "Winner",
      width: 202,
      headerClassName: "column-header",
      cellClassName: "column-cell",
    },
    {
      field: "winAmount",
      headerName: "Win Amount",
      width: 250,
      headerClassName: "column-header",
      cellClassName: "column-cell",
    },
    {
      field: "lossAmount",
      headerName: "Loss Amount",
      width: 250,
      headerClassName: "column-header",
      cellClassName: "column-cell",
    },
  ];
  return columns;
};

export default GamePlayersColumn;
