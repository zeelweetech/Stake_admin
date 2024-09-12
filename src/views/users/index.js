import React, { useEffect, useState } from "react";
import "../../App.css";
import { DataGrid } from "@mui/x-data-grid";
import { getAllUser, getUserStatus } from "../../services/userServices";
import Loader from "../component/Loader";
import { Switch } from "@mui/material";
import Columns from "./columns";

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

  const handleToggleStatus = async (userId, currentStatus) => {
    try {
      const updatedUserData = userData.map((user) =>
        user.id === userId ? { ...user, isActive: !currentStatus } : user
      );
      setUserData(updatedUserData);
      const body = {
        isActive: !currentStatus,
      };
      await getUserStatus({ body: body, userId: userId });
    } catch (error) {
      console.error("Failed to toggle user status: ", error);
      setUserData((prevData) =>
        prevData.map((user) =>
          user.id === userId ? { ...user, isActive: currentStatus } : user
        )
      );
    }
  };
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
                columns={Columns({ handleToggleStatus })}
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
