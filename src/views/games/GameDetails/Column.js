function Column(isPull) {
  // Ensure comparison is type-safe
  if (isPull === "true" || isPull === true) {
    return [
      {
        field: "pullId",
        headerName: "Pull Id",
        width: 200,
        headerClassName: "column-header",
        cellClassName: "column-cell",
      },
      {
        field: "crashPoint",
        headerName: "Crash Point",
        width: 250,
        headerClassName: "column-header",
        cellClassName: "column-cell",
      },
      {
        field: "playerCount",
        headerName: "Player Count",
        width: 220,
        headerClassName: "column-header",
        cellClassName: "column-cell",
      },
      {
        field: "totalPullAmount",
        headerName: "Total Pull Amount",
        width: 220,
        headerClassName: "column-header",
        cellClassName: "column-cell",
      },
      {
        field: "pullTime",
        headerName: "Pull Time",
        width: 214,
        headerClassName: "column-header",
        cellClassName: "column-cell",
      },
    ];
  } else if (isPull === "false" || isPull === false) {
    return [
      {
        field: "userName",
        headerName: "User Name",
        width: 214,
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
        field: "betType",
        headerName: "Bet Type",
        width: 250,
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
        field: "lossAmount",
        headerName: "Loss Amount",
        width: 214,
        headerClassName: "column-header",
        cellClassName: "column-cell",
      },
      {
        field: "email",
        headerName: "Email",
        width: 250,
        headerClassName: "column-header",
        cellClassName: "column-cell",
      },
    ];
  } else {
    throw new Error("Invalid value for isPull. Expected 'true' or 'false'.");
  }
}

export default Column;
