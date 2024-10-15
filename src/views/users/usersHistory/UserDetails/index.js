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
          {userData && (
            <div>
              <div className="mb-4 ml-24 p-4 bg-[#213743] rounded shadow-md text-white border border-[#2f4553]">
                <div className="flex justify-between m-2 pb-4 bg-dark">
                  <div className="flex items-center">
                    <p className="font-bold text-lg pr-2">User Name : </p>{" "}
                    {userData.userName ? userData.userName : "-"}
                  </div>
                  <div className="flex items-center">
                    <p className="font-bold text-lg pr-2">First Name :</p>{" "}
                    {userData.firstName ? userData.firstName : "-"}
                  </div>
                  <div className="flex items-center">
                    <p className="font-bold text-lg pr-2">Last Name :</p>{" "}
                    {userData.lastName ? userData.lastName : "-"}
                  </div>
                </div>

                <div className="flex justify-between m-2">
                  <div className="flex items-center">
                    <p className="font-bold text-lg pr-2">Email :</p>{" "}
                    {userData.email ? userData.email : "-"}
                  </div>
                  <div className="flex items-center">
                    <p className="font-bold text-lg pr-2">Mobile Number : </p>
                    {userData.mobileNumber ? userData.mobileNumber : "-"}
                  </div>
                </div>

                <div className="flex justify-between m-2 py-4">
                  <div className="flex items-center">
                    <p className="font-bold text-lg pr-2">Country :</p>{" "}
                    {userData.country ? userData.country : "-"}
                  </div>
                  <div className="flex items-center">
                    <p className="font-bold text-lg pr-2">City :</p>{" "}
                    {userData.city ? userData.city : "-"}
                  </div>
                  <div className="flex items-center">
                    <p className="font-bold text-lg pr-2">Address :</p>{" "}
                    {userData.address ? userData.address : "-"}
                  </div>
                </div>

                <div className="flex justify-between m-2">
                  <div className="flex items-center">
                    <p className="font-bold text-lg pr-2">Date of Birth :</p>{" "}
                    {userData.DOB ? userData.DOB : "-"}
                  </div>
                  <div className="flex items-center">
                    <p className="font-bold text-lg pr-2">Occupation : </p>
                    {userData.occupation ? userData.occupation : "-"}
                  </div>
                  <div className="flex items-center">
                    <p className="font-bold text-lg pr-2">Status : </p>
                    <span
                      className={`${
                        userData.isActive ? "text-green-500" : "text-red-500"
                      } font-bold`}
                    >
                      {userData.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between m-2 py-4">
                  <div className="flex items-center">
                    <p className="font-bold text-lg pr-2">
                      Total Amount Spent :
                    </p>{" "}
                    {userData.totalAmountSpent
                      ? userData.totalAmountSpent
                      : "-"}
                  </div>
                  <div className="flex items-center">
                    <p className="font-bold text-lg pr-2">
                      Total Wins Amount :
                    </p>{" "}
                    {userData.totalWinsAmount ? userData.totalWinsAmount : "-"}
                  </div>
                  <div className="flex items-center">
                    <p className="font-bold text-lg pr-2">
                      Total Losses Amount :
                    </p>{" "}
                    {userData.totalLossesAmount
                      ? userData.totalLossesAmount
                      : "-"}
                  </div>
                </div>

                <div className="flex justify-between m-2">
                  <div className="flex items-center">
                    <p className="font-bold text-lg pr-2">
                      Created Date & Time :{" "}
                    </p>
                    {new Date(userData.createdAt).toLocaleString()}
                  </div>
                  <div className="flex items-center">
                    <p className="font-bold text-lg pr-2">
                      Updated Date & Time :{" "}
                    </p>
                    {new Date(userData.updatedAt).toLocaleString()}
                  </div>
                </div>

                <div className="m-2 py-4">
                  <div className="flex items-center">
                    <p className="font-bold text-lg pr-2">Notes : </p>
                    {userData.notes ? userData.notes : "-"}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div>
            <div className="text-white bg-[#0f212e] border-y-4 border-r-4 border-[#2f4553] flex items-center justify-center space-x-4 w-80 rounded-e-full mt-10">
              <p className=" text-2xl py-3">User Bets Details</p>
            </div>
            <div className="flex justify-center item-center ml-24 py-8">
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
              <div className="text-white bg-[#0f212e] border-y-4 border-r-4 border-[#2f4553] flex items-center justify-center space-x-4 w-80 rounded-e-full mt-5 mb-7">
                <p className=" text-2xl py-3">User Wallet Details</p>
              </div>
              <div className="mb-4 ml-24 p-4 bg-[#213743] border border-[#2f4553] rounded shadow  text-white">
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 m-2">
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
