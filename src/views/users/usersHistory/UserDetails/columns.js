import React from "react";

const Columns = () => {
  const columns = [
    {
      field: "firstName",
      headerName: "firstName",
      width: 250,
      headerClassName: "column-header",
      cellClassName: "column-cell",
    },
    {
      field: "lastName",
      headerName: "lastName",
      width: 250,
      headerClassName: "column-header",
      cellClassName: "column-cell",
    },
    {
      field: "userName",
      headerName: "userName",
      width: 250,
      headerClassName: "column-header",
      cellClassName: "column-cell",
    },
    {
      field: "email",
      headerName: "email",
      width: 220,
      headerClassName: "column-header",
      cellClassName: "column-cell",
    },
    {
      field: "mobileNumber",
      headerName: "mobileNumber",
      width: 180,
      headerClassName: "column-header",
      cellClassName: "column-cell",
      //   renderCell: () => (
      //     <button>
      //       <MdEdit />
      //     </button>
      //   ),
    },
    {
      field: "DOB",
      headerName: "DOB",
      width: 220,
      headerClassName: "column-header",
      cellClassName: "column-cell",
    },
    {
      field: "country",
      headerName: "country",
      width: 220,
      headerClassName: "column-header",
      cellClassName: "column-cell",
    },
    {
      field: "address",
      headerName: "address",
      width: 220,
      headerClassName: "column-header",
      cellClassName: "column-cell",
    },
    {
      field: "city",
      headerName: "city",
      width: 220,
      headerClassName: "column-header",
      cellClassName: "column-cell",
    },
    {
      field: "isActive",
      headerName: "isActive",
      width: 220,
      headerClassName: "column-header",
      cellClassName: "column-cell",
    },
    {
      field: "notes",
      headerName: "notes",
      width: 220,
      headerClassName: "column-header",
      cellClassName: "column-cell",
    },
  ];
  return columns;
};

export default Columns;
