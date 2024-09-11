import React, { useEffect, useState } from "react";
import "../../App.css";
import { DataGrid } from "@mui/x-data-grid";
import { getAllUser, getUserStatus } from "../../services/userServices";
import Loader from "../component/Loader";
import { Switch } from "@mui/material";

export default function Users() {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    getAllUserdata();
  }, [page, pageSize]);

  const getAllUserdata = async () => {
    try {
      const response = await getAllUser(page, pageSize);
      setUserData(response?.UserList || []);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch users: ", error);
      setLoading(false);
    }
  };
  console.log("userData /-*/*-/-/*-/-*/-*/-*/ ", userData);

  // const handleToggleStatus = async (userId, currentStatus) => {
  //   console.log("userId : currentStatus : ", userId, currentStatus);
  //   try {
  //     setUserData((prevData) =>
  //       prevData.map((user) =>
  //         user.id === userId ? { ...user, isActive: !currentStatus } : user
  //       )
  //     );
  //     console.log("userData *****************", userData);
  //     const body = {
  //       isActive: currentStatus,
  //     };
  //     await getUserStatus({ body: body, userId: userId });
  //     // .then((response) => {
  //     //   console.log(" getUserStatus response *+-/", response);
  //     // })
  //     // .catch((error) => {
  //     //   console.log("getUserStatus */--/*-/*-/*-/*- error", error);
  //     // });
  //     // }
  //   } catch (error) {
  //     console.error("Failed to toggle user status: ", error);
  //   }
  // };

  const handleToggleStatus = async (userId, currentStatus) => {
    // console.log("User ID:", userId, "Current Status:", currentStatus);
  
    try {
      const updatedUserData = userData.map((user) =>
        user.id === userId ? { ...user, isActive: !currentStatus } : user
      );
      setUserData(updatedUserData);
  
      const body = {
        isActive: !currentStatus,
      };
      await getUserStatus({ body: body, userId: userId });
  
      console.log("Updated user status successfully", body.isActive);
    } catch (error) {
      console.error("Failed to toggle user status: ", error);
      setUserData((prevData) =>
        prevData.map((user) =>
          user.id === userId ? { ...user, isActive: currentStatus } : user
        )
      );
    }
  };
  
  
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
        // <button
        //   onClick={() => handleToggleStatus(params.row.id, params.row.isActive)}
        //   onMouseEnter={(e) => {
        //     e.target.style.backgroundColor = "#4d718768";
        //   }}
        //   onMouseLeave={(e) => {
        //     e.target.style.backgroundColor = "transparent";
        //   }}
        //   style={{
        //     color: params.row.isActive ? "#ff0000" : "#00ff00",
        //     border: "none",
        //     fontWeight: 'bold',
        //     // height: '1rem',
        //     borderRadius: "4px",
        //     cursor: "pointer",
        //   }}
        // >
        //   {params.row.isActive ? "Inactive" : "Active"}
        // </button>
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

  const label = { inputProps: { "aria-label": "Switch demo" } };

  const rows = userData.map((user, index) => ({
    id: user.id,
    userName: user.userName,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    occupation: user.occupation,
    mobileNumber: user.mobileNumber,
    country: user.country,
    city: user.city,
    address: user.address,
    DOB: user.DOB,
    isActive: user.isActive, // Ensure `user.isActive` exists
  }));

  return (
    <div className="bg-[#1a2c38] py-2 h-screen">
      {loading ? (
        <Loader />
      ) : (
        <div>
          <p className="text-white bg-[#213743] text-2xl pl-16 py-3">
            User Details
          </p>
          <div className="flex justify-center item-center py-8 h-[38rem]">
            <div style={{ width: "75%" }}>
              <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: { page: 1, pageSize: 10 },
                  },
                }}
                page={page}
                pageSize={pageSize}
                onPageChange={(newPage) => setPage(newPage)}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                pageSizeOptions={[10, 20]}
                getRowClassName={(params) =>
                  params.indexRelativeToCurrentPage % 2 === 0
                    ? "row-dark"
                    : "row-light"
                }
                sx={{
                  border: "none",
                  color: "#b1bad3",
                  "& .MuiDataGrid-cell": {
                    border: "none",
                  },
                  "& .MuiDataGrid-columnHeader": {
                    borderBottom: "none",
                    borderTop: "none",
                  },
                  "& .MuiDataGrid-footerContainer": {
                    borderTop: "none",
                    borderBottom: "none",
                    color: "white",
                  },
                  "& .MuiTablePagination-root": {
                    color: "white",
                  },
                  "& .MuiTablePagination-selectIcon": {
                    color: "white",
                  },
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
