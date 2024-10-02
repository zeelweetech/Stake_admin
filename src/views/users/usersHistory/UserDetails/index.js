import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserHistory } from "../../../../services/userServices";
import Loader from "../../../component/Loader";
import { DataGrid } from "@mui/x-data-grid";
import Columns from "./columns";

const UserDetails = () => {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);
  const [betsData, setBetsData] = useState([]);
  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 10,
  });
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  console.log("paginationModel", paginationModel);

  useEffect(() => {
    getAllUserdata();
  }, [paginationModel?.page, paginationModel?.pageSize]);

  const getAllUserdata = async () => {
    setLoading(true);
    try {
      const response = await getUserHistory({
        userId: userId,
        page: paginationModel?.page + 1,
        pageSize: paginationModel?.pageSize,
      });
      console.log("getuser history", response);
      setUserData(response?.user);
      setBetsData(response?.user?.bets);
      setTotalCount(response?.user?.totalBets);
      console.log("totalCount", totalCount);

      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch user data: ", error);
      setLoading(false);
    }
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-US");

    const options = {
      hour: "numeric",

      minute: "numeric",
      hour12: true,
    };
    const formattedTime = date.toLocaleTimeString("en-US", options);
    return `${formattedDate} ${formattedTime}`;
  };

  const rows = betsData?.map((betsData) => {
    return {
      id: betsData?.id,
      betAmount: betsData?.betAmount ? betsData?.betAmount : "-",
      winAmount: betsData?.winAmount ? betsData?.winAmount : "-",
      cashOutAt: betsData?.cashOutAt ? betsData?.cashOutAt : "-",
      betTime: formatDateTime(betsData?.betTime)
        ? formatDateTime(betsData?.betTime)
        : "-",
    };
  });

  return (
    <div className="flex-1 mt-10">
      {loading ? (
        <div className="flex justify-center">
          <Loader />
        </div>
      ) : (
        <div>
          {userData && (
            <div>
              <p className="text-white bg-[#213743] text-2xl text-center mb-7 py-3 w-60">
                User Details
              </p>
              <div className="mb-4 p-4 bg-[#213743] rounded shadow text-white">
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 m-2 border-b border-gray-500 pb-4 bg-dark">
                  <div>
                    First Name: {userData.firstName ? userData.firstName : "-"}
                  </div>
                  <div>
                    Last Name: {userData.lastName ? userData.lastName : "-"}
                  </div>
                  <div>
                    User Name: {userData.userName ? userData.userName : "-"}
                  </div>
                </div>

                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 m-2 border-b border-gray-500 pb-4">
                  <div>Email: {userData.email ? userData.email : "-"}</div>
                  <div>
                    Mobile Number:{" "}
                    {userData.mobileNumber ? userData.mobileNumber : "-"}
                  </div>
                </div>

                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 m-2 border-b border-gray-500 pb-4">
                  <div>
                    Country: {userData.country ? userData.country : "-"}
                  </div>
                  <div>
                    Address: {userData.address ? userData.address : "-"}
                  </div>
                  <div>City: {userData.city ? userData.city : "-"}</div>
                </div>

                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 m-2 border-b border-gray-500 pb-4">
                  <div>Date of Birth: {userData.DOB ? userData.DOB : "-"}</div>
                  <div
                    className={`${
                      userData.isActive ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    Status: {userData.isActive ? "Active" : "Inactive"}
                  </div>
                </div>

                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 m-2 border-b border-gray-500 pb-4">
                  <div>
                    Created At: {new Date(userData.createdAt).toLocaleString()}
                  </div>
                  <div>
                    Updated At: {new Date(userData.updatedAt).toLocaleString()}
                  </div>
                </div>

                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 m-2 border-b border-gray-500 pb-4">
                  <div>
                    Occupation:{" "}
                    {userData.occupation ? userData.occupation : "-"}
                  </div>
                  <div>Notes: {userData.notes ? userData.notes : "-"}</div>
                </div>
              </div>
            </div>
          )}

          <div>
            <p className="text-white bg-[#213743] text-2xl text-center mt-9 py-3 w-60">
              User Bets Details
            </p>
            <div className="flex justify-center item-center py-8">
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

          {userData && userData.wallet && (
            <div>
              <p className="text-white bg-[#213743] text-2xl text-center mb-7 py-3 w-60">
                User Wallet Details
              </p>
              <div className="mb-4 p-4 bg-[#213743] rounded shadow text-white">
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 m-2 border-b border-gray-500 pb-4">
                  <div>
                    Current Amount:{" "}
                    {userData.wallet.currentAmount
                      ? userData.wallet.currentAmount
                      : "-"}
                  </div>
                  <div>
                    Total Amount:{" "}
                    {userData.wallet.totalAmount
                      ? userData.wallet.totalAmount
                      : "-"}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserDetails;
