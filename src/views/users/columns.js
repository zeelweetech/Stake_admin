import React from "react";
import { Switch } from "@mui/material";

function Columns({ handleToggleStatus }) {
  const columns = [
    {
      field: "userName",
      headerName: "User Name",
      width: 170,
      headerClassName: "column-header",
      cellClassName: "column-cell",
    },
    {
      field: "email",
      headerName: "Email",
      width: 150,
      headerClassName: "column-header",
      cellClassName: "column-cell",
    },
    {
      field: "firstName",
      headerName: "First Name",
      width: 150,
      headerClassName: "column-header",
      cellClassName: "column-cell",
    },
    {
      field: "lastName",
      headerName: "Last Name",
      width: 150,
      headerClassName: "column-header",
      cellClassName: "column-cell",
    },
    {
      field: "occupation",
      headerName: "Occupation",
      width: 120,
      headerClassName: "column-header",
      cellClassName: "column-cell",
    },
    {
      field: "mobileNumber",
      headerName: "Mobile Number",
      width: 150,
      headerClassName: "column-header",
      cellClassName: "column-cell",
    },
    {
      field: "country",
      headerName: "Country",
      width: 100,
      headerClassName: "column-header",
      cellClassName: "column-cell",
    },
    {
      field: "city",
      headerName: "City",
      width: 130,
      headerClassName: "column-header",
      cellClassName: "column-cell",
    },
    {
      field: "address",
      headerName: "Address",
      width: 130,
      headerClassName: "column-header",
      cellClassName: "column-cell",
    },
    {
      field: "DOB",
      headerName: "DOB",
      width: 120,
      headerClassName: "column-header",
      cellClassName: "column-cell",
    },
    {
      field: "EnableDisable",
      headerName: "Enable / Disable",
      width: 120,
      headerClassName: "column-header",
      cellClassName: "column-cell",
      renderCell: (params) => (
        <div>
          <Switch
            checked={params.row.isActive}
            onChange={() =>
              handleToggleStatus(params.row.id, params.row.isActive)
            }
            color="primary"
          />
          <span
            style={{
              color: params.row.isActive ? "green" : "red",
              fontWeight: "bold",
            }}
          >
            {params.row.isActive ? "Active" : "Inactive"}
          </span>
        </div>
      ),
    },
  ];

  return columns;
}

export default Columns;
