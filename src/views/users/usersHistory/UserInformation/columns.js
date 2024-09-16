import React from "react";

const Columns = () => {
  const columns = [
    {
      field: "gameId",
      headerName: "gameId",
      width: 250,
      headerClassName: "column-header",
      cellClassName: "column-cell",
    },
    {
      field: "commission",
      headerName: "commission",
      width: 250,
      headerClassName: "column-header",
      cellClassName: "column-cell",
    },
    {
      field: "startTime",
      headerName: "startTime",
      width: 250,
      headerClassName: "column-header",
      cellClassName: "column-cell",
    },
    {
      field: "endTime",
      headerName: "endTime",
      width: 220,
      headerClassName: "column-header",
      cellClassName: "column-cell",
    },
    {
      field: "Edit",
      headerName: "Edit",
      width: 180,
      headerClassName: "column-header",
      cellClassName: "column-cell",
    //   renderCell: () => (
    //     <button>
    //       <MdEdit />
    //     </button>
    //   ),
    },
  ];
  return columns
};

export default Columns;
