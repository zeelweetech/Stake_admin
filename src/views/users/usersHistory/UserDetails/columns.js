
const Columns = () => {
  const columns = [
    {
      field: "id",
      headerName: "id",
      width: 210,
      headerClassName: "column-header",
      cellClassName: "column-cell",
    },
    {
      field: "betAmount",
      headerName: "betAmount",
      width: 230,
      headerClassName: "column-header",
      cellClassName: "column-cell",
    },
    {
      field: "winAmount",
      headerName: "winAmount",
      width: 213.7,
      headerClassName: "column-header",
      cellClassName: "column-cell",
    },
    {
      field: "cashOutAt",
      headerName: "cashOutAt",
      width: 220,
      headerClassName: "column-header",
      cellClassName: "column-cell",
    },
    {
      field: "betTime",
      headerName: "betTime",
      width: 280,
      headerClassName: "column-header",
      cellClassName: "column-cell",
    },
  ]
  return columns
}

export default Columns