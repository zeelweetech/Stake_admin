import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import {
  DeleteDistribution,
  getUserDistribution,
} from "../../../services/userServices";
import AddDistributions from "./AddDistribution";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { GiTriangleTarget } from "react-icons/gi";

function UserDistribution() {
  const [loading, setLoading] = useState(false);
  const [userDistributionData, setUserDistributionData] = useState([]);
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [distributionValue, setDistributionValue] = useState();
  const [selectedDistributionId, setSelectedDistributionId] = useState();
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    getDistributionData();
  }, [paginationModel?.page, paginationModel?.pageSize]);

  const getDistributionData = async () => {
    setLoading(true);
    try {
      const response = await getUserDistribution({
        page: paginationModel?.page + 1,
        pageSize: paginationModel?.pageSize,
      });
      // console.log("getUserDistribution response", response.data);
      setUserDistributionData(response?.data || []);
      setTotalCount(response?.totalPulls);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch users: ", error);
      setLoading(false);
    }
  };

  const openEditDialog = (distribution) => {
    // console.log('distribution =========,', distribution);

    setDistributionValue({
      userId: distribution?.userId,
      gameId: distribution?.gameId,
      amount: distribution?.amount,
      // status: distribution?.status,
    });
    setSelectedDistributionId(distribution?.id);
    setIsEditing(true);
    setOpen(true);
  };

  console.log(
    "selectedDistributionId 098i8890890,098iu9",
    selectedDistributionId
  );

  const handleDeletedistribution = async (row) => {
    try {
      await DeleteDistribution({ id: row?.id });

      setUserDistributionData((prev) =>
        prev.filter((distribution) => distribution.id !== row.id)
      );
    } catch (error) {
      console.error("Error deleting distribution:", error);
    }
  };

  const columns = [
    {
      field: "userName",
      headerName: "User Name",
      width: 220,
      headerClassName: "column-header",
      cellClassName: "column-cell",
    },
    {
      field: "gameName",
      headerName: "Game",
      width: 170,
      headerClassName: "column-header",
      cellClassName: "column-cell",
    },
    {
      field: "amount",
      headerName: "Amount",
      width: 180,
      headerClassName: "column-header",
      cellClassName: "column-cell",
    },
    {
      field: "status",
      headerName: "Status",
      width: 190,
      headerClassName: "column-header",
      cellClassName: "column-cell",
    },
    {
      field: "Edit",
      headerName: "Edit",
      width: 100,
      headerClassName: "column-header",
      cellClassName: "column-cell",
      renderCell: (params) => (
        <>
          <button
            onClick={() => openEditDialog(params.row)}
            className="px-2 py-1"
          >
            <EditIcon />
          </button>
        </>
      ),
    },
    {
      field: "Delete",
      headerName: "Delete",
      width: 100,
      headerClassName: "column-header",
      cellClassName: "column-cell",
      renderCell: (params) => (
        <>
          <button
            onClick={() => handleDeletedistribution(params.row)}
            className="px-2 py-1"
          >
            <DeleteIcon />
          </button>
        </>
      ),
    },
  ];

  const rows = userDistributionData.map((Data) => ({
    id: Data?.id,
    userName: Data?.user?.userName ? Data?.user?.userName : "-",
    userId: Data?.user?.id ? Data?.user?.id : "-",
    gameName: Data?.game?.gameName ? Data?.game?.gameName : "-",
    gameId: Data?.game?.id ? Data?.game?.id : "-",
    amount: Data?.amount ? Data?.amount : "0",
    status: Data?.status ? Data?.status : "-",
  }));

  return (
    <div>
      <div className="text-white bg-[#0f212e] border-y-4 border-r-4 border-[#2f4553] flex items-center justify-center space-x-4 w-80 rounded-e-full mt-5">
        <GiTriangleTarget size={25} />
        <p className=" text-2xl py-3">User Distribution</p>
      </div>
      <div className="flex justify-center py-16">
        <div>
          <div className="flex justify-end">
            <button
              className="text-white bg-[#213743] font-medium px-4 py-2 rounded-sm flex items-center space-x-1"
              onClick={() => {
                setIsEditing(false);
                setOpen(true);
                setDistributionValue({});
              }}
            >
              <AddIcon />
              <p>Add Distribution</p>
            </button>
          </div>
          <div className="flex justify-center item-center py-8">
            <div className="xl:w-[60rem] lg:w-[50rem]">
              <DataGrid
                autoHeight
                rows={rows}
                columns={columns}
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
                  overflowY: "hidden",
                }}
              />
            </div>
          </div>
          </div>
          <AddDistributions
            distributionValue={distributionValue}
            open={open}
            setOpen={setOpen}
            isEditing={isEditing}
            userDistributionData={userDistributionData}
            setUserDistributionData={setUserDistributionData}
            setDistributionValue={setDistributionValue}
            setIsEditing={setIsEditing}
            selectedDistributionId={selectedDistributionId}
          />
      </div>
    </div>
  );
}

export default UserDistribution;
