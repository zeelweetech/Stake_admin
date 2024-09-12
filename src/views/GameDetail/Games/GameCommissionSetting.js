import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { FaArrowLeft } from "react-icons/fa6";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid } from "@mui/x-data-grid";
import { useParams } from "react-router-dom";
import {
  AddCommission,
  EditCoommission,
  getCommissionById,
} from "../../../services/GameServices";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";
import toast from "react-hot-toast";
import Loader from "../../component/Loader";

export default function GameCommissionSetting() {
  const { gameId } = useParams();
  const [commissionData, setCommissionData] = useState(false);
  const [gameCommission, setGameCommission] = useState([]);
  const [open, setOpen] = useState(false);
  const [commissionForm, setCommissionForm] = useState();
  const [errors, setErrors] = useState({});
  const [selectedCommissionId, setSelectedCommissionId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pageState, setPageState] = useState({
    total: 0,
    page: 1,
    pageSize: 10,
  });
  // console.log("commissionData", commissionData);
  console.log("selectedCommissionId", selectedCommissionId);

  useEffect(() => {
    // Fetch commission data when the component mounts
    // if (commissionData) {
    CommissionById();
    // }
  }, [pageState.page, pageState.pageSize]);

  const handleCommission = async (e) => {
    e.preventDefault();
    await CommissionById();
    setCommissionData(true);
  };

  // console.log("gameCommission **/-*-*-*-*-", gameCommission);

  const CommissionById = async () => {
    try {
      const response = await getCommissionById(
        gameId,
        pageState.page,
        pageState.pageSize
      );
      setGameCommission(response?.data);
      setPageState((old) => ({ ...old, total: response.totalPulls }));
    } catch (error) {
      console.error("Failed to fetch commission: ", error);
    }
  };

  const handleAddCommission = async () => {
    const { commissionPercentage, startTime, endTime } = commissionForm;
    let formErrors = {};

    if (!commissionPercentage) {
      formErrors.commissionPercentage = "Commission Percentage is required";
    }
    if (!startTime) {
      formErrors.startTime = "Start Time is required";
    }
    if (!endTime) {
      formErrors.endTime = "End Time is required";
    }

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      const body = {
        gameId: gameId,
        commissionPercentage: commissionForm?.commissionPercentage,
        startTime: commissionForm.startTime,
        endTime: commissionForm.endTime,
      };
      const response = await AddCommission({ body: body });
      console.log("response : ", response);
      toast.error(response?.response?.data?.message);

      setGameCommission((prev) => [
        ...prev,
        {
          id: prev.length + 1, // Use a unique ID, consider using UUID or server-generated IDs
          commissionPercentage: commissionForm.commissionPercentage,
          startTime: commissionForm.startTime,
          endTime: commissionForm.endTime,
        },
      ]);
      // await CommissionById();

      setOpen(false);
      setErrors({});
      setCommissionForm({});
    } catch (error) {
      console.error("Add Commission error ", error);
    } finally {
      setLoading(false); // Reset loading state regardless of success or failure
    }
    console.log("loading", loading);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCommissionForm({
      ...commissionForm,
      [name]: value,
    });
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleEditCommission = async () => {
    try {
      const body = {
        commissionPercentage: commissionForm?.commissionPercentage,
        startTime: commissionForm.startTime,
        endTime: commissionForm.endTime,
      };
      const response = await EditCoommission({
        body: body,
        id: selectedCommissionId, // Use selected row's ID
      });
      console.log("Edit Commission response : ", response);

      // Update the row in gameCommission array
      setGameCommission((prev) =>
        prev.map((commission) =>
          commission.id === selectedCommissionId
            ? { ...commission, ...commissionForm }
            : commission
        )
      );

      setOpen(false);
      setErrors({});
      setCommissionForm({});
      setIsEditing(false); // Reset edit mode
    } catch (error) {
      console.error("Edit Commission error ", error);
    } finally {
      setLoading(false); // Reset loading state regardless of success or failure
    }
    console.log("loading", loading);
  };

  const openEditDialog = (commission) => {
    setCommissionForm({
      commissionPercentage: commission.commissionPercentage,
      startTime: commission.startTime,
      endTime: commission.endTime,
    });
    setSelectedCommissionId(commission?.id); // Track the row's ID
    setIsEditing(true);
    setOpen(true);
  };

  const columns = [
    {
      field: "commissionPercentage",
      headerName: "Commission Percentage",
      width: 250,
      headerClassName: "column-header",
      cellClassName: "column-cell",
    },
    {
      field: "startTime",
      headerName: "Start Time",
      width: 160,
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
      field: "Edit",
      headerName: "Edit",
      width: 190,
      headerClassName: "column-header",
      cellClassName: "column-cell",
      renderCell: (params) => (
        <>
          {console.log("row", params)}
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
      width: 190,
      headerClassName: "column-header",
      cellClassName: "column-cell",
      renderCell: (params) => (
        <>
          {console.log("", params)}
          <button className="px-2 py-1">
            <DeleteIcon />
          </button>
        </>
      ),
    },
  ];

  const rows = gameCommission?.map((item, index) => ({
    id: item?.id,
    commissionPercentage: item.commissionPercentage,
    startTime: item.startTime,
    endTime: item.endTime,
  }));

  const handleBack = () => {
    setCommissionData(false);
  };

  return (
    <div className="mt-5 ml-3">
      {!commissionData ? (
        <div>
          <div className="flex space-x-2 items-center text-white">
            <p>Game status : </p>
            <button className="w-28 py-2 font-medium bg-[#213743] text-[#00ff00]">
              Active
            </button>
            <button className="w-28 py-2 font-medium bg-[#213743] text-[#ff0000]">
              Inactive
            </button>
          </div>
          <div className="flex items-center mt-5 space-x-2 text-white">
            <p>Game Commission : </p>
            <button
              className="w-36 py-2 font-medium text-white bg-[#213743]"
              onClick={(e) => handleCommission(e)}
            >
              Commission
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex items-center space-x-80">
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
          <div className="mt-8 w-[47.47rem]">
            <DataGrid
              autoHeight
              rows={rows}
              columns={columns}
              getRowId={(row) => row.id}
              initialState={{
                pagination: {
                  paginationModel: { page: 1, pageSize: 10 },
                },
              }}
              pagination
              page={pageState.page - 1}
              pageSize={pageState.pageSize}
              onPageChange={(newPage) =>
                setPageState((old) => ({ ...old, page: newPage + 1 }))
              }
              onPageSizeChange={(newPageSize) =>
                setPageState((old) => ({
                  ...old,
                  pageSize: newPageSize,
                  page: 1,
                }))
              }
              rowCount={pageState.total}
              paginationMode="server"
              pageSizeOptions={[10, 20, 30, 40]}
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
      )}

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
        sx={{
          "& .MuiPaper-root": {
            borderRadius: "6px",
            backgroundColor: "#1a2c38",
            color: "white",
          },
        }}
      >
        <DialogTitle>
          {isEditing ? "Edit Commission" : "Add Commission"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            placeholder="Commission Percentage"
            name="commissionPercentage"
            type="number"
            fullWidth
            value={commissionForm?.commissionPercentage || ""}
            onChange={handleChange}
            error={!!errors.commissionPercentage}
            helperText={errors.commissionPercentage}
            sx={{
              my: 1,
              input: {
                color: "white",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white",
                },
                "&:hover fieldset": {
                  borderColor: "white",
                },
              },
            }}
          />
          <TextField
            margin="dense"
            name="startTime"
            label="Start Time"
            type="time"
            fullWidth
            variant="outlined"
            value={commissionForm?.startTime || ""}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            error={!!errors.startTime}
            helperText={errors.startTime}
            sx={{
              my: 1,
              input: {
                color: "white",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white",
                },
                "&:hover fieldset": {
                  borderColor: "white",
                },
              },
              "& .MuiInputLabel-root": {
                color: "white",
              },
            }}
          />
          <TextField
            margin="dense"
            name="endTime"
            label="End Time"
            type="time"
            fullWidth
            variant="outlined"
            value={commissionForm?.endTime || ""}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            error={!!errors.endTime}
            helperText={errors.endTime}
            sx={{
              my: 1,
              input: {
                color: "white",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white",
                },
                "&:hover fieldset": {
                  borderColor: "white",
                },
              },
              "& .MuiInputLabel-root": {
                color: "white",
              },
              // "& input[type='time']": {
              //   color: "white",
              // },
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Close
          </Button>
          <Button
            onClick={isEditing ? handleEditCommission : handleAddCommission}
            color="primary"
            // disabled={loading}
          >
            {/* {isEditing ? "Save" : "Add"} */}
            {loading ? <Loader /> : isEditing ? "Save" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
