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
      toast.success(response.message);

      setGameCommission((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          commissionPercentage: commissionForm.commissionPercentage,
          startTime: commissionForm.startTime,
          endTime: commissionForm.endTime,
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
    console.log("loading", loading);
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
            color: "white",
          },
        }}
      >
        <DialogTitle>
          <div className="flex justify-between items-center">
            <p>{isEditing ? "Edit Commission" : "Add Commission"}</p>
            <IconButton>
              <CloseIcon
                onClick={() => setOpen(false)}
                className="text-white"
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
              "& input[type='time']": {
                color: "white",
              },
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
