import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import AddCommission from "./AddCommission";
import AddIcon from "@mui/icons-material/Add";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteCommission } from "../../../../services/CommissionServices";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Commission({
  setCommissionData,
  totalCount,
  setGameCommission,
  gameCommission,
  pageState,
  setPageState,
}) {
  const [commissionForm, setCommissionForm] = useState();
  const [loading, setLoading] = useState(false);
  const [selectedCommissionId, setSelectedCommissionId] = useState(null);
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const handleBack = () => {
    setCommissionData(false);
  };

  const openEditDialog = (commission) => {
    setCommissionForm({
      commissionPercentage: commission.commissionPercentage,
      startTime: commission.startTime,
      endTime: commission.endTime,
      commissionDate: commission?.commissionDate,
    });
    setSelectedCommissionId(commission?.id);
    setIsEditing(true);
    setOpen(true);
  };

  const handleDeleteCommission = async (row) => {
    try {
      await DeleteCommission({ id: row.id });

      setGameCommission((prev) =>
        prev.filter((commission) => commission.id !== row.id)
      );
    } catch (error) {
      console.error("Error deleting commission:", error);
    }
  };

  const columns = [
    {
      field: "commissionPercentage",
      headerName: "Commission Percentage",
      width: 200,
      headerClassName: "column-header",
      cellClassName: "column-cell",
    },
    {
      field: "startTime",
      headerName: "Start Time",
      width: 163,
      headerClassName: "column-header",
      cellClassName: "column-cell",
    },
    {
      field: "endTime",
      headerName: "End Time",
      width: 160,
      headerClassName: "column-header",
      cellClassName: "column-cell",
    },
    {
      field: "startCommissionDate",
      headerName: "start Commission Date",
      width: 180,
      headerClassName: "column-header",
      cellClassName: "column-cell",
    },
    {
      field: "endCommissionDate",
      headerName: "end Commission Date",
      width: 180,
      headerClassName: "column-header",
      cellClassName: "column-cell",
    },
    // {
    //   field: "commissionDate",
    //   headerName: "Commission Date",
    //   width: 280,
    //   headerClassName: "column-header",
    //   cellClassName: "column-cell",
    // },
    {
      field: "Edit",
      headerName: "Edit",
      width: 150,
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
      width: 120,
      headerClassName: "column-header",
      cellClassName: "column-cell",
      renderCell: (params) => (
        <>
          <button
            onClick={() => handleDeleteCommission(params.row)}
            className="px-2 py-1"
          >
            <DeleteIcon />
          </button>
        </>
      ),
    },
  ];

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-US");

    return `${formattedDate}`;
  };

  const rows = gameCommission?.map((item) => ({
    id: item?.id,
    commissionPercentage: item?.commissionPercentage
      ? item?.commissionPercentage
      : "-",
    startTime: item?.startTime ? item?.startTime : "-",
    endTime: item?.endTime ? item?.endTime : "-",
    startCommissionDate: formatDateTime(item?.startCommissionDate) ? formatDateTime(item?.startCommissionDate) : '-',
    endCommissionDate: formatDateTime(item?.endCommissionDate) ? formatDateTime(item?.endCommissionDate) : '-',
    // commissionDate: formatDateTime(item?.createdAt) ? formatDateTime(item?.createdAt) : "-",
  }));

  return (
    <div>
      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-5">
            <button className="py-3 px-3 bg-[#213743]">
              <FaArrowLeft color="white" onClick={handleBack} />
            </button>
            <p className="text-white text-xl">Game Commission</p>
          </div>
          <div>
            <button
              className="text-white bg-[#213743] font-medium px-4 py-2 rounded-sm flex items-center space-x-1"
              onClick={() => {
                setIsEditing(false);
                setOpen(true);
                setCommissionForm({});
              }}
            >
              <AddIcon />
              <p>Add Commission</p>
            </button>
          </div>
        </div>
        <div className="mt-8">
          <DataGrid
            rows={rows}
            columns={columns}
            getRowId={(row) => row.id}
            loading={loading}
            rowCount={totalCount}
            paginationModel={pageState}
            paginationMode="server"
            onPaginationModelChange={setPageState}
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
      </div>

      <AddCommission
        commissionForm={commissionForm}
        open={open}
        setOpen={setOpen}
        isEditing={isEditing}
        setGameCommission={setGameCommission}
        setCommissionForm={setCommissionForm}
        setIsEditing={setIsEditing}
        selectedCommissionId={selectedCommissionId}
        formatDateTime={formatDateTime}
      />
    </div>
  );
}
