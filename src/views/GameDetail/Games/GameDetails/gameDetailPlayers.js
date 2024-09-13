import React from "react";

const GameDetailPlayers = () => {
  const columns = [
    {
      field: "amount",
      headerName: "Amount",
      width: 250,
      headerClassName: "column-header",
      cellClassName: "column-cell",
    },
    {
        field: "playerName",
        headerName: "Player Name",
        width: 250,
        headerClassName: "column-header",
        cellClassName: "column-cell",
    },
    {
      field: "Winner",
      headerName: "Winner",
      width: 250,
      headerClassName: "column-header",
      cellClassName: "column-cell",
    },
    {
      field: "lossAmount",
      headerName: "lossAmount",
      width: 250,
      headerClassName: "column-header",
      cellClassName: "column-cell",
    },
    {
      field: "winAmount",
      headerName: "winAmount",
      width: 250,
      headerClassName: "column-header",
      cellClassName: "column-cell",
    },
  ]
  return columns
};

export default GameDetailPlayers;
