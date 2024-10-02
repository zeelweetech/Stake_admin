import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Loader from "../../../component/Loader";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import {
  AddCommission,
  EditCoommission,
} from "../../../../services/CommissionServices";

export default function AddCommissions({
  commissionForm,
  open,
  setOpen,
  isEditing,
  setCommissionForm,
  gameCommission,
  setGameCommission,
  setIsEditing,
  selectedCommissionId,
}) {
  const { gameId } = useParams();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCommissionForm({
      ...commissionForm,
      [name]: value,
    });
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleAddCommission = async () => {
    const {
      commissionPercentage,
      startTime,
      endTime,
      startCommissionDate,
      endCommissionDate,
    } = commissionForm;
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
    if (!startCommissionDate) {
      formErrors.startCommissionDate = "Start Commission Date is required";
    }
    if (!endCommissionDate) {
      formErrors.endCommissionDate = "End Commission Date is required";
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
        startCommissionDate: commissionForm?.startCommissionDate,
        endCommissionDate: commissionForm?.endCommissionDate,
      };
      const response = await AddCommission({ body: body });
      toast.success(response.message);

      setGameCommission((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          commissionPercentage: commissionForm.commissionPercentage,
          startTime: commissionForm.startTime,
          endTime: commissionForm.endTime,
          startCommissionDate: commissionForm?.startCommissionDate,
          endCommissionDate: commissionForm?.endCommissionDate,
        },
      ]);

      setOpen(false);
      setErrors({});
      setCommissionForm({});
    } catch (error) {
      console.error("Add Commission error ", error);
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEditCommission = async () => {
    try {
      const body = {
        commissionPercentage: commissionForm?.commissionPercentage,
        startTime: commissionForm.startTime,
        endTime: commissionForm.endTime,
        startCommissionDate: commissionForm?.startCommissionDate,
        endCommissionDate: commissionForm?.endCommissionDate,
      };
      const response = await EditCoommission({
        body: body,
        id: selectedCommissionId,
      });
      console.log("Edit Commission response : ", response);

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
      setIsEditing(false);
    } catch (error) {
      console.error("Edit Commission error ", error);
    } finally {
      setLoading(false);
    }
    console.log("loading", loading);
  };

  const formatToDateInput = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
        sx={{
          "& .MuiPaper-root": {
            borderRadius: "6px",
            backgroundColor: "#1a2c38",
            color: "#b1bad3",
          },
        }}
      >
        <DialogTitle>
          <div className="flex justify-between items-center">
            <p>{isEditing ? "Edit Commission" : "Add Commission"}</p>
            <IconButton>
              <CloseIcon
                onClick={() => setOpen(false)}
                className="text-[#b1bad3]"
              />
            </IconButton>
          </div>
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
                color: "#b1bad3",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#2f4553",
                },
                "&:hover fieldset": {
                  borderColor: "#2f4553",
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
                color: "#b1bad3",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#2f4553",
                },
                "&:hover fieldset": {
                  borderColor: "#2f4553",
                },
              },
              "& .MuiInputLabel-root": {
                color: "#b1bad3",
              },
              "& input[type='time']": {
                color: "#b1bad3",
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
                color: "#b1bad3",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#2f4553",
                },
                "&:hover fieldset": {
                  borderColor: "#2f4553",
                },
              },
              "& .MuiInputLabel-root": {
                color: "#b1bad3",
              },
              "& input[type='time']": {
                color: "#b1bad3",
              },
            }}
          />
          <TextField
            margin="dense"
            name="startCommissionDate"
            label="Start Commission Date"
            fullWidth
            variant="outlined"
            type="date"
            value={
              commissionForm?.startCommissionDate
                ? formatToDateInput(commissionForm?.startCommissionDate)
                : ""
            }
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            error={!!errors.startCommissionDate}
            helperText={errors.startCommissionDate}
            sx={{
              my: 1,
              input: {
                color: "#b1bad3",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#2f4553",
                },
                "&:hover fieldset": {
                  borderColor: "#2f4553",
                },
              },
              "& .MuiInputLabel-root": {
                color: "#b1bad3",
              },
              "& input[type='time']": {
                color: "#b1bad3",
              },
            }}
          />
          <TextField
            autoFocus
            variant="outlined"
            name="endCommissionDate"
            label="End Commission Date"
            margin="dense"
            type="date"
            fullWidth
            value={
              commissionForm?.endCommissionDate
                ? formatToDateInput(commissionForm?.endCommissionDate)
                : ""
            }
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            error={!!errors.endCommissionDate}
            helperText={errors.endCommissionDate}
            sx={{
              my: 1,
              input: {
                color: "#b1bad3",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#2f4553",
                },
                "&:hover fieldset": {
                  borderColor: "#2f4553",
                },
              },
              "& .MuiInputLabel-root": {
                color: "#b1bad3",
              },
              "& input[type='time']": {
                color: "#b1bad3",
              },
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpen(false)}
            sx={{
              backgroundColor: "#ff638433",
              px: "1rem",
              py: "0.5rem",
              color: "#b1bad3",
              border: "1px solid #ff6384",
            }}
          >
            Close
          </Button>
          <Button
            onClick={isEditing ? handleEditCommission : handleAddCommission}
            sx={{
              backgroundColor: "#4bc0c033",
              px: "1rem",
              py: "0.5rem",
              color: "#b1bad3",
              border: "1px solid #4bc0c0",
            }}
          >
            {loading ? <Loader /> : isEditing ? "Save" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
