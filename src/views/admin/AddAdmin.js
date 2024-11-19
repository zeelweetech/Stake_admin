
import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  IconButton,
  Switch,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import toast from "react-hot-toast";
import Loader from "../component/Loader";
import { CreateAdmin } from "../../services/AdminService";

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

export default function MedalsInfo({
  adminValue,
  setAdminValue,
  open,
  setOpen,
  isEditing,
  setIsEditing,
  setAdminData,
  selectedAdminId,
}) {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(false);

  useEffect(() => {
    if (isEditing) {
      setStatus(adminValue?.status === "active");
    }
  }, [adminValue, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdminValue((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.checked);
  };

  const handleAddAdmin = async () => {
    const { id, username, email, role } = adminValue;
    const newErrors = {};

    if (!id) newErrors.id = "Id is required";
    if (!username) newErrors.username = "Username is required";
    if (!email) newErrors.email = "Email is required";
    if (!role) newErrors.role = "Role is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const response = await CreateAdmin({ body: adminValue });
      toast.success(response.message);

      setAdminData((prev) => [
        ...prev,
        {
          id: response.data?.id || prev.length + 1,
          ...adminValue,
          status: status ? "active" : "inactive",
        },
      ]);

      setOpen(false);
      setErrors({});
      setAdminValue({});
    } catch (error) {
      console.error("Add Admin error: ", error);
      toast.error(error?.response?.data?.message || "Failed to add admin");
    } finally {
      setLoading(false);
    }
  };

  return (
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
          <p>{isEditing ? "Edit Admin" : "Add Admin"}</p>
          <IconButton onClick={() => setOpen(false)}>
            <CloseIcon className="text-[#b1bad3]" />
          </IconButton>
        </div>
      </DialogTitle>
      <DialogContent>
        <FormControl fullWidth sx={{ mt: 1 }} error={!!errors.id}>
          <TextField
            label="Id"
            name="id"
            value={adminValue?.id || ""}
            onChange={handleChange}
            placeholder="Enter Id"
            sx={textFieldStyles}
            InputLabelProps={{
              style: { color: "#b1bad3" },
            }}
          />
          {errors.id && <p className="text-red-500">{errors.id}</p>}
        </FormControl>

        <FormControl fullWidth sx={{ my: 1.5 }} error={!!errors.username}>
          <TextField
            label="Username"
            name="username"
            value={adminValue?.username || ""}
            onChange={handleChange}
            placeholder="Enter Username"
            sx={textFieldStyles}
            InputLabelProps={{
              style: { color: "#b1bad3" },
            }}
          />
          {errors.username && <p className="text-red-500">{errors.username}</p>}
        </FormControl>

        <FormControl fullWidth sx={{ my: 1.5 }} error={!!errors.email}>
          <TextField
            label="Email"
            name="email"
            value={adminValue?.email || ""}
            onChange={handleChange}
            placeholder="Enter Email"
            sx={textFieldStyles}
            InputLabelProps={{
              style: { color: "#b1bad3" },
            }}
          />
          {errors.email && <p className="text-red-500">{errors.email}</p>}
        </FormControl>

        <FormControl fullWidth sx={{ my: 1.5 }} error={!!errors.role}>
          <TextField
            label="Role"
            name="role"
            value={adminValue?.role || ""}
            onChange={handleChange}
            placeholder="Enter Role"
            sx={textFieldStyles}
            InputLabelProps={{
              style: { color: "#b1bad3" },
            }}
          />
          {errors.role && <p className="text-red-500">{errors.role}</p>}
        </FormControl>

        <FormControlLabel
          control={
            <Switch
              checked={status}
              onChange={handleStatusChange}
              color="primary"
            />
          }
          label="Status"
          sx={{ color: "#b1bad3", mt: 2 }}
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
          onClick={ handleAddAdmin}
          sx={{
            backgroundColor: "#4bc0c033",
            px: "1rem",
            py: "0.5rem",
            color: "#b1bad3",
            border: "1px solid #4bc0c0",
          }}
        >
          {/* {loading ? <Loader /> : isEditing ? "Save" : "Add"} */}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
