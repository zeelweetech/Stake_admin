
function Columns() {
  const columns = [
    {
      field: "userName",
      headerName: "User Name",
      width: 200,
      headerClassName: "column-header",
      cellClassName: "column-cell",
    },
    {
      field: "userId",
      headerName: "User Id",
      width: 200,
      headerClassName: "column-header",
      cellClassName: "column-cell",
    },
    {
      field: "performOn",
      headerName: "Perform",
      width: 200,
      headerClassName: "column-header",
      cellClassName: "column-cell",
    },
    {
      field: "actionType",
      headerName: "Action",
      width: 250,
      headerClassName: "column-header",
      cellClassName: "column-cell",
    },
    {
      field: "actionDescription",
      headerName: "Message",
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
