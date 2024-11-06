import React, { useEffect, useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, IconButton, InputLabel, MenuItem, Select, Switch, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Loader from "../../component/Loader";
import {
  AddDistribution,
  EditDistribution,
} from "../../../services/userServices";

const textFieldStyles = {
  color: "#b1bad3",
  ".MuiOutlinedInput-notchedOutline": {
    borderColor: "#2f4553",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "#2f4553",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#2f4553",
  },
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
};

export default function AddDistributions({
  distributionValue,
  setDistributionValue,
  open,
  setOpen,
  isEditing,
  setIsEditing,
  setUserDistributionData,
  selectedDistributionId,
  usersData,
  allGameData
}) {
  const { gameId } = useParams();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(false);

  useEffect(() => {
    if (isEditing) {
      setStatus(distributionValue?.status === "active");
    }
  }, [distributionValue, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDistributionValue({
      ...distributionValue,
      [name]: value,
    });
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.checked);
  };

  const handleAddDistribution = async () => {
    const { amount, userId, gameId } = distributionValue;
    let Errors = {};

    if (!userId) {
      Errors.userId = "User is required";
    }
    if (!gameId) {
      Errors.gameId = "Game is required";
    }
    if (!amount) {
      Errors.amount = "amount is required";
    } else if (amount <= 0) {
    Errors.amount = "Amount must be greater than zero";
  }

    if (Object.keys(Errors).length > 0) {
      setErrors(Errors);
      setLoading(false);
      return;
    }

    try {
      const body = {
        userId: distributionValue?.userId,
        gameId: distributionValue?.gameId,
        amount: distributionValue?.amount,
        status: status ? "active" : "inactive",
      };
      const response = await AddDistribution({ body: body });
      toast.success(response.message);

      setUserDistributionData((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          ...distributionValue,
          status: status ? "active" : "inactive",
          // userId: distributionValue?.userId,
          // gameId: distributionValue?.gameId,
          // amount: distributionValue.amount,
        },
      ]);

      setOpen(false);
      setErrors({});
      setDistributionValue({});
    } catch (error) {
      console.error("Add Distribution error ", error);
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  // console.log("selectedDistributionId **********", selectedDistributionId);

  const handleEditDistribution = async () => {
    try {
      const body = {
        userId: distributionValue?.userId,
        gameId: distributionValue?.gameId,
        amount: distributionValue?.amount,
        status: status ? "active" : "inactive",
      };
      const response = await EditDistribution({
        body: body,
        id: selectedDistributionId,
      });
      console.log("Edit distribution response : ", response);

      setUserDistributionData((prev) =>
        prev.map((distribution) =>
          distribution?.id === selectedDistributionId
            ? { ...distribution, ...distributionValue, status: status ? "active" : "inactive" }
            : distribution
        )
      );

      setOpen(false);
      setErrors({});
      setDistributionValue({});
      setIsEditing(false);
      setStatus(false);
    } catch (error) {
      console.error("Edit Commission error ", error);
    } finally {
      setLoading(false);
    }
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
            <p>{isEditing ? "Edit Distribution" : "Add Distribution"}</p>
            <IconButton>
              <CloseIcon
                onClick={() => setOpen(false)}
                className="text-[#b1bad3]"
              />
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mt: 1 }} error={!!errors.userId}>
            <InputLabel id="demo-simple-select-label" sx={{ color: "#b1bad3" }}>
              User
            </InputLabel>
            <Select
              labelId= "user-select-label"
              id= "user-select-label" 
              label="User"
              name="userId"
              value={distributionValue?.userId || ""}
              onChange={handleChange}
              sx={textFieldStyles}
              MenuProps={{
                PaperProps: {
                  sx: {
                    bgcolor: "#0f212e",
                    color: "#b1bad3",
                  },
                },
              }}
            >
              {usersData.map((Data) => (
                <MenuItem key={Data?.id} value={Data?.id}>
                   {Data?.userName}
                </MenuItem>
              ))}
            </Select>
            {errors.userId && <p className="text-red-500">{errors.userId}</p>}
          </FormControl>
          <FormControl fullWidth sx={{ my: 1.5 }} error={!!errors.gameId}>
            <InputLabel id="demo-simple-select-label" sx={{ color: "#b1bad3" }}>
              Game
            </InputLabel>
            <Select
              labelId="user-select-label"
              id="user-select-label"
              label="Game"
              name="gameId"
              value={distributionValue?.gameId || ""}
              sx={textFieldStyles}
              onChange={handleChange}
              MenuProps={{
                PaperProps: {
                  sx: {
                    bgcolor: "#0f212e",
                    color: "#b1bad3",
                  },
                },
              }}
            >
              {allGameData
                .filter((gameData) => !gameData.isPull) 
                .map((gameData) => (
                  <MenuItem key={gameData?.id} value={gameData?.id}>
                    {gameData?.gameName}
                  </MenuItem>
                ))}
            </Select>
            {errors.gameId && <p className="text-red-500">{errors.gameId}</p>}
          </FormControl>
          <TextField
            autoFocus
            placeholder="amount"
            name="amount"
            type="number"
            inputProps={{ min: 0 }}
            fullWidth
            value={distributionValue?.amount || ""}
            onChange={handleChange}
            error={!!errors.amount}
            helperText={errors.amount}
            sx={textFieldStyles}
          />
          {isEditing && (
            <FormControlLabel
              control={
                <Switch
                  checked={status}
                  onChange={handleStatusChange}
                  color="primary"
                />
              }
              label="Status"
              sx={{ color: "#b1bad3", marginTop: 2 }}
            />
          )}
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
            onClick={isEditing ? handleEditDistribution : handleAddDistribution}
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

