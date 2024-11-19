import React, { useEffect, useState } from "react";
import {
    Button, Dialog, DialogActions, DialogContent, DialogTitle,
    FormControl, FormControlLabel, IconButton, Switch, TextField
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import toast from "react-hot-toast";
import Loader from "../component/Loader";
import { AddMedal, EditMedal } from "../../services/medalsService";

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
    medalValue,
    setMedalValue,
    open,
    setOpen,
    isEditing,
    setIsEditing,
    setUserMedalData,
    selectedMedalId,
    // medalsData = [],
    // allMedalData = []
}) {
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState(false);

    useEffect(() => {
        if (isEditing) {
            setStatus(medalValue?.status === "active");
        }
    }, [medalValue, isEditing]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMedalValue((prev) => ({
            ...prev,
            [name]: value,
        }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const handleStatusChange = (event) => {
        setStatus(event.target.checked);
    };

    const handleAddMedal = async () => {
        const { medalLevel, medalType, winAmount } = medalValue;
        let errors = {};

        if (!medalLevel) errors.medalLevel = "Medal level is required";
        if (!medalType) errors.medalType = "Medal type is required";
        if (!winAmount) {
            errors.winAmount = "Amount is required";
        } else if (winAmount <= 0) {
            errors.winAmount = "Amount must be greater than zero";
        }

        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            setLoading(false);
            return;
        }


        setLoading(true);
        try {
            const response = await AddMedal({ body: medalValue });
            toast.success(response.message);
            // console.log("handleAddMedal:::::::", response);


            setUserMedalData((prev) => [
                ...prev,
                {
                    id: response.data?.id || prev.length + 1,
                    ...medalValue,
                    status: status ? "active" : "inactive",
                },
            ]);

            setOpen(false);
            setErrors({});
            setMedalValue({});
        } catch (error) {
            console.error("Add Medal error: ", error);
            toast.error(error?.response?.data?.message || "Failed to add medal");
        } finally {
            setLoading(false);
        }
    };


    const handleEditMedals = async () => {
        try {
            const body = {
                medalLevel: medalValue?.medalLevel,
                medalType: medalValue?.medalType,
                winAmount: medalValue?.winAmount,
                status: status ? "active" : "inactive",
            };
            const response = await EditMedal({ body, id: selectedMedalId });
            console.log("Edit medal response: ", response);

            setUserMedalData((prev) =>
                prev.map((medal) =>
                    medal?.id === selectedMedalId
                        ? { ...medal, ...medalValue, status: status ? "active" : "inactive" }
                        : medal
                )
            );

            setOpen(false);
            setErrors({});
            setMedalValue({});
            setIsEditing(false);
            setStatus(false);
        } catch (error) {
            console.error("Edit Medal error: ", error);
            toast.error("Failed to edit medal");
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
                    <p>{isEditing ? "Edit Medal" : "Add Medal"}</p>
                    <IconButton onClick={() => setOpen(false)}>
                        <CloseIcon className="text-[#b1bad3]" />
                    </IconButton>
                </div>
            </DialogTitle>
            <DialogContent>
                <FormControl fullWidth sx={{ mt: 1 }} error={!!errors.medalLevel}>
                    <TextField
                        label="Medal Level"
                        name="medalLevel"
                        value={medalValue?.medalLevel || ""}
                        onChange={handleChange}
                        placeholder="Enter Medal Level"
                        sx={textFieldStyles}
                        InputLabelProps={{
                            style: { color: "#b1bad3" },
                        }}
                    />
                    {errors.medalLevel && <p className="text-red-500">{errors.medalLevel}</p>}
                </FormControl>

                <FormControl fullWidth sx={{ my: 1.5 }} error={!!errors.medalType}>
                    <TextField
                        label="Medal Type"
                        name="medalType"
                        value={medalValue?.medalType || ""}
                        onChange={handleChange}
                        placeholder="Enter Medal Type"
                        sx={textFieldStyles}
                        InputLabelProps={{
                            style: { color: "#b1bad3" },
                        }}
                    />
                    {errors.medalType && <p className="text-red-500">{errors.medalType}</p>}
                </FormControl>
                <TextField
                    label="Amount"
                    placeholder="Enter Amount"
                    name="winAmount"
                    type="number"
                    inputProps={{ min: 0 }}
                    fullWidth
                    value={medalValue?.winAmount || ""}
                    onChange={handleChange}
                    error={!!errors.winAmount}
                    helperText={errors.winAmount}
                    sx={textFieldStyles}
                    InputLabelProps={{
                        style: { color: "#b1bad3" },
                    }}
                />
                {isEditing && (
                    <FormControlLabel
                        control={
                            <Switch checked={status} onChange={handleStatusChange} color="primary" />
                        }
                        label="Status"
                        sx={{ color: "#b1bad3", mt: 2 }}
                    />
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpen(false)} sx={{ backgroundColor: "#ff638433", px: "1rem", py: "0.5rem", color: "#b1bad3", border: "1px solid #ff6384" }}>
                    Close
                </Button>
                <Button onClick={isEditing ? handleEditMedals : handleAddMedal} sx={{ backgroundColor: "#4bc0c033", px: "1rem", py: "0.5rem", color: "#b1bad3", border: "1px solid #4bc0c0" }}>
                    {loading ? <Loader /> : isEditing ? "Save" : "Add"}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

