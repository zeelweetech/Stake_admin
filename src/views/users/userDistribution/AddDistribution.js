import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
} from "@mui/material";
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
  userDistributionData,
  setUserDistributionData,
  selectedDistributionId,
}) {
  const { gameId } = useParams();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(false);

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
      };
      const response = await AddDistribution({ body: body });
      toast.success(response.message);

      setUserDistributionData((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          ...distributionValue,
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

  console.log("selectedDistributionId **********", selectedDistributionId);

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
              labelId="demo-simple-select-label"
              id="demo-simple-select"
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
              {userDistributionData.map((Data) => (
                <MenuItem key={Data?.user?.id} value={Data?.user?.id}>
                  {`UserId: ${Data?.user?.id} - ${Data?.user?.userName}`}
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
              labelId="demo-simple-select-label"
              id="demo-simple-select"
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
              {userDistributionData.map((gameData) => (
                <MenuItem key={gameData?.game?.id} value={gameData?.game?.id}>
                  {`GameId: ${gameData?.game?.id} - ${gameData?.game?.gameName}`}
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
