
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
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);

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
          <div>
            {userData && (
              <div className="max-w-4xl bg-[#213743] mx-auto p-6 rounded-lg shadow-lg text-white">
                <h2 className="text-2xl text-center font-bold mb-4 border-b-2 border-[#0f212e] px-4 py-2 w-1/3">User  Information</h2>
                <table className="min-w-full divide-y divide-[#0f212e]">
                  <tbody className="bg-[#213743] divide-y divide-[#0f212e]">
                    <tr>
                      <td className="px-4 py-2 font-bold">User  Name:</td>
                      <td className="px-4 py-2">{userData.userName || "-"}</td>
                      <td className="px-4 py-2 font-bold">First Name:</td>
                      <td className="px-4 py-2">{userData.firstName || "-"}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-bold">Last Name:</td>
                      <td className="px-4 py-2">{userData.lastName || "-"}</td>
                      <td className="px-4 py-2 font-bold">Email:</td>
                      <td className="px-4 py-2">{userData.email || "-"}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-bold">Mobile Number:</td>
                      <td className="px-4 py-2">{userData.mobileNumber || "-"}</td>
                      <td className="px-4 py-2 font-bold">Country:</td>
                      <td className="px-4 py-2">{userData.country || "-"}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-bold">City:</td>
                      <td className="px-4 py-2">{userData.city || "-"}</td>
                      <td className="px-4 py-2 font-bold">Address:</td>
                      <td className="px-4 py-2">{userData.address || "-"}</td>
                    </tr>
                  </tbody>
                </table>
                <h2 className="text-2xl text-center font-bold mt-6 mb-4 border-b-2 px-4 py-2 border-[#0f212e] w-1/3">Financial Information</h2>
                <table className="min-w-full border-b border-[#0f212e] divide-y divide-[#0f212e]">
                  <tbody className="bg-[#213743] divide-y divide-[#0f212e]">
                    <tr>
                      <td className="px-4 py-2 font-bold">Total Amount Spent:</td>
                      <td className="px-4 py-2">{userData.totalAmountSpent || "-"}</td>
                      <td className="px-4 py-2 font-bold">Total Wins Amount:</td>
                      <td className="px-4 py-2">{userData.totalWinsAmount || "-"}</td>
                      <td className="px-4 py-2 font-bold">Total Losses Amount:</td>
                      <td className="px-4 py-2">{userData.totalLossesAmount || "-"}</td>
                    </tr>
                  </tbody>
                </table>
                <h2 className="text-2xl text-center font-bold mt-6 mb-4 border-b-2  px-4 py-2 border-[#0f212e] w-1/4">Medals</h2>
                <table className="min-w-full border-b border-[#0f212e] divide-y divide-[#0f212e]">
                  <tbody className="bg-[#213743] divide-y divide-[#0f212e]">
                    <tr>
                      <td className="px-4 py-2 font-bold">Medal Type:</td>
                      <td className="px-4 py-2">{userData.medals?.medalType || "-"}</td>
                      <td className="px-4 py-2 font-bold">Medal Level:</td>
                      <td className="px-4 py-2">{userData.medals?.medalLevel || "-"}</td>
                      <td className="px-4 py-2 font-bold">Win Amount:</td>
                      <td className="px-4 py-2">{userData.medals?.winAmount || "-"}</td>
                    </tr>
                  </tbody>
                </table>
                <h2 className="text-2xl text-center font-bold mt-6 mb-4 border-b-2 border-[#0f212e] px-4 py-2 w-1/3">Other Information</h2>
                <div className="flex items-center border-b border-[#0f212e] justify-start">
                  <p className="font-bold px-4 py-2">Created Date & Time:</p>
                  <p className="px-4 py-2">{new Date(userData.createdAt).toLocaleString()}</p>
                  <p className="font-bold px-4 py-2">Updated Date & Time:</p>
                  <p className="px-4 py-2">{new Date(userData.updatedAt).toLocaleString()}</p>
                </div>
                <div className="flex items-center border-b border-[#0f212e] justify-start mt-4">
                  <p className="font-bold px-4 py-2">Status:</p>
                  <p className={`${userData.isActive ? "text-green-500" : "text-red-500"} font-bold ml-2`}>
                    {userData.isActive ? "Active" : "Inactive"}
                  </p>
                  <div className="ml-6 flex items-center">
                    <p className="font-bold px-4 py-2">Notes:</p>
                    <span className="ml-2">{userData.notes || "-"}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-col flex-1 bg-[#1a2c38]">
            <div className="text-white bg-[#0f212e] border-y-4 border-r-4 -ml-44 border-[#2f4553] flex items-center justify-center space-x-4 w-80 rounded-e-full mt-5">
              <p className="text-2xl py-3">User Bets Details</p>
            </div>
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
                }}
              />
            </div>
          </div>
        </div>

      )}
    </div>
  );
};

export default UserDetails;
