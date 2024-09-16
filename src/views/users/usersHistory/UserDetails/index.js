import React, { useEffect, useState } from "react";
import Columns from "./columns";
import { DataGrid } from "@mui/x-data-grid";
import { getUserHistory } from "../../../../services/userServices";
import { useParams } from "react-router-dom";

const UserDetails = () => {
  const { userId } = useParams();
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [userData, setUserData] = useState([]);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  useEffect(() => {
    if (userId) {
      getAllUserdata();
    }
  }, [paginationModel?.page, paginationModel?.pageSize, userId]);

  const getAllUserdata = async () => {
    setLoading(true);
    try {
      const response = await getUserHistory({
        userId: userId,
        page: paginationModel?.page + 1,
        pageSize: paginationModel?.pageSize,
      });
      console.log("response : ", response);
      const userHistory = Array.isArray(response?.user) ? response.user : [];

      setUserData(userHistory);
      //   setUserData(response?.user);
      setTotalCount(response?.totalPulls);
      setLoading(false);
      console.log("userData", userData);
    } catch (error) {
      console.error("Failed to fetch users: ", error);
      setLoading(false);
    }
  };

  const rows = userData?.map((user) => {
    return {
      firstName: user.firstName ? user.firstName : "-",
      lastName: user.lastName ? user.lastName : "-",
      userName: user.userName ? user.userName : "-",
      email: user.email ? user.email : "-",
      mobileNumber: user.mobileNumber ? user.mobileNumber : "-",
      DOB: user.DOB ? user.DOB : "-",
      country: user.country ? user.country : "-",
      address: user.address ? user.address : "-",
      city: user.city ? user.city : "-",
      isActive: user.isActive ? user.isActive : "-",
      notes: user.notes ? user.notes : "-",
    };
  });
  return (
    <>
      <div className="flex-1 mt-10">
        {/* <p></p> */}
        <DataGrid
          rows={rows}
          columns={Columns()}
          getRowId={(row) => row.id}
          loading={loading}
          rowCount={totalCount}
          paginationModel={paginationModel}
          paginationMode="server"
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[10, 20]}
          getRowClassName={(params) =>
            params.indexRelativeToCurrentPage % 2 === 0
              ? "row-dark"
              : "row-light"
          }
          className="select-none"
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
    </>
  );
};

export default UserDetails;
